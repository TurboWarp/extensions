// Name: BackLayer 3D
// ID: backlayer3d
// Description: 3D objects rendered behind every Scratch sprite.
// By: nofileteams
// License: MIT
// Version: 1.3.0

(async function (Scratch) {
  'use strict';
  if (!Scratch.extensions.unsandboxed) throw new Error('BackLayer 3D must run unsandboxed');

  const { BlockType, ArgumentType, Cast } = Scratch;
  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const renderer = vm.renderer;
  const THREE = await import('https://esm.sh/three@0.160.0');
  const [{ OBJLoader }, { GLTFLoader }] = await Promise.all([
    import('https://esm.sh/three@0.160.0/examples/jsm/loaders/OBJLoader.js'),
    import('https://esm.sh/three@0.160.0/examples/jsm/loaders/GLTFLoader.js'),
  ]);

  const canvas = document.createElement('canvas');
  canvas.width = 480;
  canvas.height = 360;
  const glRenderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    preserveDrawingBuffer: true,
    powerPreference: 'high-performance',
  });
  glRenderer.setPixelRatio(1);
  glRenderer.setSize(480, 360, false);
  glRenderer.outputColorSpace = THREE.SRGBColorSpace;
  glRenderer.shadowMap.enabled = true;
  glRenderer.shadowMap.type = THREE.PCFShadowMap;
  glRenderer.setClearColor(0x000000, 0);
  glRenderer.autoClear = true;

  let contextLost = false;
  canvas.addEventListener(
    'webglcontextlost',
    (e) => {
      e.preventDefault();
      contextLost = true;
      drawing = false;
    },
    false
  );
  canvas.addEventListener('webglcontextrestored', () => {
    contextLost = false;
    installBackLayer();
    startRenderLoop();
  }, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 4 / 3, 0.1, 10000);
  camera.position.set(0, 0, 10);
  const ambient = new THREE.AmbientLight(0xffffff, 0.65);
  scene.add(ambient);
  const objects = new Map();
  const lights = new Map();
  let drawing = false;
  let loopRunning = false;
  let frame = 0;
  let fogDistance = 100;
  let fogColor = '#ffffff';
  let fogEnabled = false;
  let cameraObject = null;
  let drawableId = null;
  let skinId = null;
  let rtxShadows = false;

  // [FIX] Reusable scratch objects to avoid per-call allocation
  const _localAxisX = new THREE.Vector3(1, 0, 0);
  const _localAxisY = new THREE.Vector3(0, 1, 0);
  const _localAxisZ = new THREE.Vector3(0, 0, 1);
  const _deltaQuat = new THREE.Quaternion();
  const _physicsClock = new THREE.Clock();
  const GRAVITY = -9.8;

  class CanvasSkin extends renderer.exports.Skin {
    constructor(id) {
      super(id, renderer);
      const gl = renderer.gl;
      this._texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, this._texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      this._nativeSize = renderer.getNativeSize();
      this._rotationCenter = [this._nativeSize[0] / 2, this._nativeSize[1] / 2];
    }

    get size() {
      return this._nativeSize;
    }

    getTexture() {
      return this._texture || super.getTexture();
    }

    update() {
      const gl = renderer.gl;
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.bindTexture(gl.TEXTURE_2D, this._texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      this._silhouette.update(canvas);
      this.emitWasAltered();
    }

    dispose() {
      if (this._texture) renderer.gl.deleteTexture(this._texture);
      this._texture = null;
      super.dispose();
    }
  }

  function clearSkin() {
    glRenderer.setRenderTarget(null);
    glRenderer.clear();
    const skin = renderer._allSkins[skinId];
    if (skin) skin.update();
    runtime.requestRedraw();
  }

  function installBackLayer() {
    if (!renderer._layerGroups.backlayer3d) {
      const videoIndex = Math.max(0, renderer._groupOrdering.indexOf('video'));
      renderer._groupOrdering.splice(videoIndex + 1, 0, 'backlayer3d');
      const videoGroup = renderer._layerGroups.video || { drawListOffset: 0 };
      renderer._layerGroups.backlayer3d = { groupIndex: 0, drawListOffset: videoGroup.drawListOffset };
      renderer._groupOrdering.forEach((n, index) => (renderer._layerGroups[n].groupIndex = index));
    }
    if (!renderer._allSkins[skinId] || !renderer._allDrawables[drawableId]) {
      skinId = renderer._nextSkinId++;
      const skin = new CanvasSkin(skinId);
      renderer._allSkins[skinId] = skin;
      drawableId = renderer.createDrawable('backlayer3d');
      renderer.updateDrawableSkinId(drawableId, skinId);
      if (renderer.markDrawableAsNoninteractive) renderer.markDrawableAsNoninteractive(drawableId);
    }
    clearSkin();
  }
  installBackLayer();

  const num = (value) => Cast.toNumber(value);
  const name = (value) => Cast.toString(value);
  const color = (value) => {
    const s = Cast.toString(value).trim();
    return /^#[0-9a-f]{3,8}$/i.test(s) ? s : '#ffffff';
  };
  const object = (value) => objects.get(name(value));
  const allMeshes = (root) => {
    const result = [];
    root.traverse((child) => {
      if (child.isMesh) result.push(child);
    });
    return result;
  };
  const setMaterial = (root, fn) =>
    allMeshes(root).forEach((mesh) => {
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach(fn);
    });
  const applyRTXToObject = (root) =>
    allMeshes(root).forEach((m) => {
      m.castShadow = rtxShadows;
      m.receiveShadow = rtxShadows;
    });
  const applyRTXToAll = () => {
    for (const o of objects.values()) applyRTXToObject(o);
    for (const l of lights.values()) l.castShadow = rtxShadows;
  };
  const makeObject = (n) => {
    const old = objects.get(n);
    if (old) {
      scene.remove(old);
      disposeObject(old);
    }
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    mesh.name = n;
    mesh.userData.passThrough = false;
    mesh.userData.physics = false;
    mesh.userData.velocityY = 0;
    mesh.castShadow = rtxShadows;
    mesh.receiveShadow = rtxShadows;
    scene.add(mesh);
    objects.set(n, mesh);
    return mesh;
  };
  const replaceObject = (n, next) => {
    const old = objects.get(n);
    if (!old) return;
    next.name = n;
    next.position.copy(old.position);
    next.rotation.copy(old.rotation);
    next.scale.copy(old.scale);
    next.userData.passThrough = old.userData.passThrough;
    next.userData.physics = old.userData.physics || false;
    next.userData.velocityY = old.userData.velocityY || 0;
    applyRTXToObject(next);
    scene.remove(old);
    disposeObject(old);
    scene.add(next);
    objects.set(n, next);
  };
  const disposeObject = (root) => {
    root.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) (Array.isArray(child.material) ? child.material : [child.material]).forEach((m) => m.dispose());
    });
  };
  const listValue = (listName, util) => {
    const variable = util.target.lookupVariableByNameAndType(name(listName), 'list');
    return variable ? variable.value : [];
  };
  const updateFog = () => (scene.fog = fogEnabled ? new THREE.Fog(fogColor, 1, Math.max(1, fogDistance)) : null);
  const box = (root) => new THREE.Box3().setFromObject(root);
  const touching = (a, b) => a && b && !a.userData.passThrough && !b.userData.passThrough && box(a).intersectsBox(box(b));
  const pointToward = (from, target) => {
    const p = target instanceof THREE.Vector3 ? target : target.position;
    const savedPos = from.position.clone();
    const worldPos = new THREE.Vector3();
    from.getWorldPosition(worldPos);
    const m = new THREE.Matrix4();
    if (cameraObject && from === objects.get(cameraObject)) {
      m.lookAt(worldPos, p, from.up);
    } else {
      m.lookAt(p, worldPos, from.up);
    }
    from.quaternion.setFromRotationMatrix(m);
    from.rotation.setFromQuaternion(from.quaternion);
    from.position.copy(savedPos);
  };

  function updatePhysics(delta) {
    if (delta <= 0) return;
    for (const moving of objects.values()) {
      if (!moving.userData.physics) continue;
      moving.userData.velocityY = (moving.userData.velocityY || 0) + GRAVITY * delta;
      moving.position.y += moving.userData.velocityY * delta;
      if (moving.userData.passThrough) continue;
      let movingBox = box(moving);
      for (const other of objects.values()) {
        if (other === moving || other.userData.passThrough) continue;
        const otherBox = box(other);
        if (!movingBox.intersectsBox(otherBox)) continue;
        if (moving.userData.velocityY <= 0) moving.position.y += otherBox.max.y - movingBox.min.y;
        else moving.position.y -= movingBox.max.y - otherBox.min.y;
        moving.userData.velocityY = 0;
        movingBox = box(moving);
      }
    }
  }

  function startRenderLoop() {
    if (loopRunning) return;
    loopRunning = true;
    renderLoop();
  }

  function renderLoop() {
    if (!loopRunning) return;
    frame = requestAnimationFrame(renderLoop);
    if (!drawing) return;
    if (contextLost) return;
    updatePhysics(Math.min(_physicsClock.getDelta(), 0.05));
    const size = renderer.getNativeSize();
    if (canvas.width !== size[0] || canvas.height !== size[1]) {
      glRenderer.setSize(size[0], size[1], false);
      camera.aspect = size[0] / size[1];
      camera.updateProjectionMatrix();
      const skin = renderer._allSkins[skinId];
      if (skin) {
        skin._nativeSize = size;
        skin._rotationCenter = [size[0] / 2, size[1] / 2];
      }
    }
    if (cameraObject && objects.has(cameraObject)) {
      const sourceObject = objects.get(cameraObject);
      sourceObject.getWorldPosition(camera.position);
      sourceObject.getWorldQuaternion(camera.quaternion);
    }
    for (const [lightName, light] of lights) {
      const sourceObject = objects.get(lightName);
      if (sourceObject) sourceObject.getWorldPosition(light.position);
    }
    glRenderer.render(scene, camera);
    const skin = renderer._allSkins[skinId];
    if (skin) skin.update();
    runtime.requestRedraw();
  }
  startRenderLoop();

  class BackLayer3D {
    getInfo() {
      const S = ArgumentType.STRING,
        N = ArgumentType.NUMBER,
        C = ArgumentType.COLOR;
      const onoff = { acceptReporters: true, items: [Scratch.translate('on'), Scratch.translate('off')] };
      return {
        id: 'backlayer3d',
        name: 'BackLayer 3D',
        color1: '#5B5FEF',
        color2: '#4549C4',
        blocks: [
          { opcode: 'reset', blockType: BlockType.COMMAND, text: Scratch.translate('reset all') },
          { opcode: 'create', blockType: BlockType.COMMAND, text: Scratch.translate('Create object [NAME]'), arguments: { NAME: { type: S, defaultValue: 'box' } } },
          { opcode: 'textureCostume', blockType: BlockType.COMMAND, text: Scratch.translate('Set texture of object [NAME] to [COSTUME]'), arguments: { NAME: { type: S, defaultValue: 'box' }, COSTUME: { type: S, defaultValue: 'costume1' } } },
          { opcode: 'textureURL', blockType: BlockType.COMMAND, text: Scratch.translate('Load texture for object [NAME] from URL [URL]'), arguments: { NAME: { type: S, defaultValue: 'box' }, URL: { type: S, defaultValue: 'https://example.com/test.png' } } },
          { opcode: 'modelList', blockType: BlockType.COMMAND, text: Scratch.translate('Set model of object [NAME] from list [LIST]'), arguments: { NAME: { type: S, defaultValue: 'box' }, LIST: { type: S, defaultValue: 'list1' } } },
          { opcode: 'remove', blockType: BlockType.COMMAND, text: Scratch.translate('Remove object [NAME]'), arguments: { NAME: { type: S, defaultValue: 'box' } } },
          '---',
          { opcode: 'setPosition', blockType: BlockType.COMMAND, text: Scratch.translate('Set position of object [NAME] to x [X] y [Y] z [Z]'), arguments: { NAME: { type: S, defaultValue: 'box' }, X: { type: N, defaultValue: 0 }, Y: { type: N, defaultValue: 0 }, Z: { type: N, defaultValue: 0 } } },
          { opcode: 'setPositionX', blockType: BlockType.COMMAND, text: Scratch.translate('Set x position of object [NAME] to [VALUE]'), arguments: { NAME: { type: S, defaultValue: 'box' }, VALUE: { type: N, defaultValue: 0 } } },
          { opcode: 'setPositionY', blockType: BlockType.COMMAND, text: Scratch.translate('Set y position of object [NAME] to [VALUE]'), arguments: { NAME: { type: S, defaultValue: 'box' }, VALUE: { type: N, defaultValue: 0 } } },
          { opcode: 'setPositionZ', blockType: BlockType.COMMAND, text: Scratch.translate('Set z position of object [NAME] to [VALUE]'), arguments: { NAME: { type: S, defaultValue: 'box' }, VALUE: { type: N, defaultValue: 0 } } },
          { opcode: 'changePositionX', blockType: BlockType.COMMAND, text: Scratch.translate('Change x position of object [NAME] by [VALUE]'), arguments: { NAME: { type: S, defaultValue: 'box' }, VALUE: { type: N, defaultValue: 1 } } },
          { opcode: 'changePositionY', blockType: BlockType.COMMAND, text: Scratch.translate('Change y position of object [NAME] by [VALUE]'), arguments: { NAME: { type: S, defaultValue: 'box' }, VALUE: { type: N, defaultValue: 1 } } },
          { opcode: 'changePositionZ', blockType: BlockType.COMMAND, text: Scratch.translate('Change z position of object [NAME] by [VALUE]'), arguments: { NAME: { type: S, defaultValue: 'box' }, VALUE: { type: N, defaultValue: 1 } } },
          { opcode: 'setRotation', blockType: BlockType.COMMAND, text: Scratch.translate('Set rotation of object [NAME] to x [X] y [Y] z [Z]'), arguments: { NAME: { type: S, defaultValue: 'box' }, X: { type: N, defaultValue: 0 }, Y: { type: N, defaultValue: 0 }, Z: { type: N, defaultValue: 0 } } },
          { opcode: 'setRotationX', blockType: BlockType.COMMAND, text: Scratch.translate('Set x rotation of object [NAME] to [VALUE]'), arguments: { NAME: { type: S, defaultValue: 'box' }, VALUE: { type: N, defaultValue: 0 } } },
          { opcode: 'setRotationY', blockType: BlockType.COMMAND, text: Scratch.translate('Set y rotation of object [NAME] to [VALUE]'), arguments: { NAME: { type: S, defaultValue: 'box' }, VALUE: { type: N, defaultValue: 0 } } },
          { opcode: 'setRotationZ', blockType: BlockType.COMMAND, text: Scratch.translate('Set z rotation of object [NAME] to [VALUE]'), arguments: { NAME: { type: S, defaultValue: 'box' }, VALUE: { type: N, defaultValue: 0 } } },
          { opcode: 'changeRotationX', blockType: BlockType.COMMAND, text: Scratch.translate('Rotate object [NAME] around its local x axis by [VALUE] degrees'), arguments: { NAME: { type: S, defaultValue: 'box' }, VALUE: { type: N, defaultValue: 1 } } },
          { opcode: 'changeRotationY', blockType: BlockType.COMMAND, text: Scratch.translate('Rotate object [NAME] around its local y axis by [VALUE] degrees'), arguments: { NAME: { type: S, defaultValue: 'box' }, VALUE: { type: N, defaultValue: 1 } } },
          { opcode: 'changeRotationZ', blockType: BlockType.COMMAND, text: Scratch.translate('Rotate object [NAME] around its local z axis by [VALUE] degrees'), arguments: { NAME: { type: S, defaultValue: 'box' }, VALUE: { type: N, defaultValue: 1 } } },
          { opcode: 'changeRotationXWorld', blockType: BlockType.COMMAND, text: Scratch.translate('Rotate object [NAME] around world x axis by [VALUE] degrees (not relative to object orientation)'), arguments: { NAME: { type: S, defaultValue: 'box' }, VALUE: { type: N, defaultValue: 1 } } },
          { opcode: 'changeRotationYWorld', blockType: BlockType.COMMAND, text: Scratch.translate('Rotate object [NAME] around world y axis by [VALUE] degrees (not relative to object orientation)'), arguments: { NAME: { type: S, defaultValue: 'box' }, VALUE: { type: N, defaultValue: 1 } } },
          { opcode: 'changeRotationZWorld', blockType: BlockType.COMMAND, text: Scratch.translate('Rotate object [NAME] around world z axis by [VALUE] degrees (not relative to object orientation)'), arguments: { NAME: { type: S, defaultValue: 'box' }, VALUE: { type: N, defaultValue: 1 } } },
          { opcode: 'setScale', blockType: BlockType.COMMAND, text: Scratch.translate('Set scale of object [NAME] to x [X] y [Y] z [Z] (%)'), arguments: { NAME: { type: S, defaultValue: 'box' }, X: { type: N, defaultValue: 100 }, Y: { type: N, defaultValue: 100 }, Z: { type: N, defaultValue: 100 } } },
          { opcode: 'setScaleX', blockType: BlockType.COMMAND, text: Scratch.translate('Set x scale of object [NAME] to [VALUE] (%)'), arguments: { NAME: { type: S, defaultValue: 'box' }, VALUE: { type: N, defaultValue: 100 } } },
          { opcode: 'setScaleY', blockType: BlockType.COMMAND, text: Scratch.translate('Set y scale of object [NAME] to [VALUE] (%)'), arguments: { NAME: { type: S, defaultValue: 'box' }, VALUE: { type: N, defaultValue: 100 } } },
          { opcode: 'setScaleZ', blockType: BlockType.COMMAND, text: Scratch.translate('Set z scale of object [NAME] to [VALUE] (%)'), arguments: { NAME: { type: S, defaultValue: 'box' }, VALUE: { type: N, defaultValue: 100 } } },
          { opcode: 'changeScaleX', blockType: BlockType.COMMAND, text: Scratch.translate('Change x scale of object [NAME] by [VALUE] (%)'), arguments: { NAME: { type: S, defaultValue: 'box' }, VALUE: { type: N, defaultValue: 10 } } },
          { opcode: 'changeScaleY', blockType: BlockType.COMMAND, text: Scratch.translate('Change y scale of object [NAME] by [VALUE] (%)'), arguments: { NAME: { type: S, defaultValue: 'box' }, VALUE: { type: N, defaultValue: 10 } } },
          { opcode: 'changeScaleZ', blockType: BlockType.COMMAND, text: Scratch.translate('Change z scale of object [NAME] by [VALUE] (%)'), arguments: { NAME: { type: S, defaultValue: 'box' }, VALUE: { type: N, defaultValue: 10 } } },
          { opcode: 'moveSteps', blockType: BlockType.COMMAND, text: Scratch.translate('Move object [NAME] forward by [STEPS] steps'), arguments: { NAME: { type: S, defaultValue: 'box' }, STEPS: { type: N, defaultValue: 10 } } },
          { opcode: 'moveToward', blockType: BlockType.COMMAND, text: Scratch.translate('Move object [NAME] toward x [X] y [Y] z [Z] by [STEPS] steps'), arguments: { NAME: { type: S, defaultValue: 'box' }, X: { type: N, defaultValue: 0 }, Y: { type: N, defaultValue: 0 }, Z: { type: N, defaultValue: 0 }, STEPS: { type: N, defaultValue: 10 } } },
          { opcode: 'pointObject', blockType: BlockType.COMMAND, text: Scratch.translate('Point object [NAME] toward object [TARGET]'), arguments: { NAME: { type: S, defaultValue: 'box' }, TARGET: { type: S, defaultValue: 'target' } } },
          { opcode: 'pointXYZ', blockType: BlockType.COMMAND, text: Scratch.translate('Point object [NAME] toward x [X] y [Y] z [Z]'), arguments: { NAME: { type: S, defaultValue: 'box' }, X: { type: N, defaultValue: 0 }, Y: { type: N, defaultValue: 0 }, Z: { type: N, defaultValue: 0 } } },
          { opcode: 'glide', blockType: BlockType.COMMAND, text: Scratch.translate('Glide object [NAME] to x [X] y [Y] z [Z] in [SECONDS] seconds'), arguments: { NAME: { type: S, defaultValue: 'box' }, SECONDS: { type: N, defaultValue: 1 }, X: { type: N, defaultValue: 0 }, Y: { type: N, defaultValue: 0 }, Z: { type: N, defaultValue: 0 } } },
          '---',
          { opcode: 'useCamera', blockType: BlockType.COMMAND, text: Scratch.translate('Make object [NAME] the view camera'), arguments: { NAME: { type: S, defaultValue: 'box' } } },
          { opcode: 'setColor', blockType: BlockType.COMMAND, text: Scratch.translate('Set color of object [NAME] to [COLOR]'), arguments: { NAME: { type: S, defaultValue: 'box' }, COLOR: { type: C, defaultValue: '#ffffff' } } },
          { opcode: 'setOpacity', blockType: BlockType.COMMAND, text: Scratch.translate('Set opacity of object [NAME] to [VALUE] %'), arguments: { NAME: { type: S, defaultValue: 'box' }, VALUE: { type: N, defaultValue: 0 } } },
          { opcode: 'setPassThrough', blockType: BlockType.COMMAND, text: Scratch.translate('Set pass-through of object [NAME] to [STATE]'), arguments: { NAME: { type: S, defaultValue: 'box' }, STATE: { type: S, menu: 'onoff' } } },
          { opcode: 'setPhysics', blockType: BlockType.COMMAND, text: Scratch.translate('Set physics of object [NAME] to [STATE]'), arguments: { NAME: { type: S, defaultValue: 'box' }, STATE: { type: S, menu: 'onoff' } } },
          { opcode: 'bounce', blockType: BlockType.COMMAND, text: Scratch.translate('Bounce object [NAME] if it touches another object'), arguments: { NAME: { type: S, defaultValue: 'box' } } },
          { opcode: 'isTouching', blockType: BlockType.BOOLEAN, text: Scratch.translate('Object [NAME] is touching object [TARGET]'), arguments: { NAME: { type: S, defaultValue: 'box' }, TARGET: { type: S, defaultValue: 'target' } } },
          '---',
          { opcode: 'start', blockType: BlockType.COMMAND, text: Scratch.translate('Start drawing') },
          { opcode: 'stop', blockType: BlockType.COMMAND, text: Scratch.translate('Stop drawing') },
          { opcode: 'isDrawing', blockType: BlockType.BOOLEAN, text: Scratch.translate('Is drawing now?') },
          { opcode: 'setFogDistance', blockType: BlockType.COMMAND, text: Scratch.translate('Set fog distance to [VALUE]'), arguments: { VALUE: { type: N, defaultValue: 100 } } },
          { opcode: 'setFogColor', blockType: BlockType.COMMAND, text: Scratch.translate('Set fog color to [COLOR]'), arguments: { COLOR: { type: C, defaultValue: '#ffffff' } } },
          { opcode: 'setFog', blockType: BlockType.COMMAND, text: Scratch.translate('Set fog to [STATE]'), arguments: { STATE: { type: S, menu: 'onoff' } } },
          '---',
          { opcode: 'setLight', blockType: BlockType.COMMAND, text: Scratch.translate('Set object [NAME] as a light [STATE]'), arguments: { NAME: { type: S, defaultValue: 'light' }, STATE: { type: S, menu: 'onoff' } } },
          { opcode: 'setLightIntensity', blockType: BlockType.COMMAND, text: Scratch.translate('Set light intensity of object [NAME] to [VALUE]'), arguments: { NAME: { type: S, defaultValue: 'light' }, VALUE: { type: N, defaultValue: 10 } } },
          { opcode: 'setLightColor', blockType: BlockType.COMMAND, text: Scratch.translate('Set light color of object [NAME] to [COLOR]'), arguments: { NAME: { type: S, defaultValue: 'light' }, COLOR: { type: C, defaultValue: '#ffffff' } } },
          { opcode: 'setReflectivity', blockType: BlockType.COMMAND, text: Scratch.translate('Set reflectivity of object [NAME] to [VALUE]'), arguments: { NAME: { type: S, defaultValue: 'box' }, VALUE: { type: N, defaultValue: 1 } } },
          { opcode: 'setRTXShadows', blockType: BlockType.COMMAND, text: Scratch.translate('Set RTX shadows to [STATE]'), arguments: { STATE: { type: S, menu: 'onoff' } } },
          '---',
          { opcode: 'getPositionX', blockType: BlockType.REPORTER, text: Scratch.translate('Object [NAME] x position'), arguments: { NAME: { type: S, defaultValue: 'box' } } },
          { opcode: 'getPositionY', blockType: BlockType.REPORTER, text: Scratch.translate('Object [NAME] y position'), arguments: { NAME: { type: S, defaultValue: 'box' } } },
          { opcode: 'getPositionZ', blockType: BlockType.REPORTER, text: Scratch.translate('Object [NAME] z position'), arguments: { NAME: { type: S, defaultValue: 'box' } } },
          { opcode: 'getRotationX', blockType: BlockType.REPORTER, text: Scratch.translate('Object [NAME] x rotation'), arguments: { NAME: { type: S, defaultValue: 'box' } } },
          { opcode: 'getRotationY', blockType: BlockType.REPORTER, text: Scratch.translate('Object [NAME] y rotation'), arguments: { NAME: { type: S, defaultValue: 'box' } } },
          { opcode: 'getRotationZ', blockType: BlockType.REPORTER, text: Scratch.translate('Object [NAME] z rotation'), arguments: { NAME: { type: S, defaultValue: 'box' } } },
          { opcode: 'getScaleX', blockType: BlockType.REPORTER, text: Scratch.translate('Object [NAME] x scale (%)'), arguments: { NAME: { type: S, defaultValue: 'box' } } },
          { opcode: 'getScaleY', blockType: BlockType.REPORTER, text: Scratch.translate('Object [NAME] y scale (%)'), arguments: { NAME: { type: S, defaultValue: 'box' } } },
          { opcode: 'getScaleZ', blockType: BlockType.REPORTER, text: Scratch.translate('Object [NAME] z scale (%)'), arguments: { NAME: { type: S, defaultValue: 'box' } } },
          { opcode: 'distance', blockType: BlockType.REPORTER, text: Scratch.translate('Distance from object [NAME] to object [TARGET]'), arguments: { NAME: { type: S, defaultValue: 'box' }, TARGET: { type: S, defaultValue: 'target' } } },
        ],
        menus: { axis: { acceptReporters: true, items: [Scratch.translate('x'), Scratch.translate('y'), Scratch.translate('z')] }, onoff },
      };
    }

    reset() {
      for (const o of objects.values()) {
        scene.remove(o);
        disposeObject(o);
      }
      objects.clear();
      for (const l of lights.values()) scene.remove(l);
      lights.clear();
      cameraObject = null;
      rtxShadows = false;
      glRenderer.shadowMap.type = THREE.PCFShadowMap;
      camera.position.set(0, 0, 10);
      camera.rotation.set(0, 0, 0);
    }

    create(a) {
      makeObject(name(a.NAME));
    }

    remove(a) {
      const n = name(a.NAME);
      const o = objects.get(n);
      if (o) {
        scene.remove(o);
        disposeObject(o);
        objects.delete(n);
      }
      const l = lights.get(n);
      if (l) {
        scene.remove(l);
        lights.delete(n);
      }
    }

    setPosition(a) {
      const o = object(a.NAME);
      if (o) o.position.set(num(a.X), num(a.Y), num(a.Z));
    }

    setPositionX(a) {
      const o = object(a.NAME);
      if (o) o.position.x = num(a.VALUE);
    }

    setPositionY(a) {
      const o = object(a.NAME);
      if (o) o.position.y = num(a.VALUE);
    }

    setPositionZ(a) {
      const o = object(a.NAME);
      if (o) o.position.z = num(a.VALUE);
    }

    changePositionX(a) {
      const o = object(a.NAME);
      if (o) o.position.x += num(a.VALUE);
    }

    changePositionY(a) {
      const o = object(a.NAME);
      if (o) o.position.y += num(a.VALUE);
    }

    changePositionZ(a) {
      const o = object(a.NAME);
      if (o) o.position.z += num(a.VALUE);
    }

    setRotation(a) {
      const o = object(a.NAME);
      if (o) o.rotation.set(THREE.MathUtils.degToRad(num(a.X)), THREE.MathUtils.degToRad(num(a.Y)), THREE.MathUtils.degToRad(num(a.Z)));
    }

    setRotationX(a) {
      const o = object(a.NAME);
      if (o) o.rotation.x = THREE.MathUtils.degToRad(num(a.VALUE));
    }

    setRotationY(a) {
      const o = object(a.NAME);
      if (o) o.rotation.y = THREE.MathUtils.degToRad(num(a.VALUE));
    }

    setRotationZ(a) {
      const o = object(a.NAME);
      if (o) o.rotation.z = THREE.MathUtils.degToRad(num(a.VALUE));
    }

    // [FIX v1.2.1] Local-axis rotation: rotate around the object's local axes
    //   Before: o.rotation.x += deg (Euler rotation on world axes → independent of object's facing)
    //   After:  quaternion.multiply(deltaQuat on local axis) → rotation applied on the object's local axis
    changeRotationX(a) {
      const o = object(a.NAME);
      if (o) {
        _deltaQuat.setFromAxisAngle(_localAxisX, THREE.MathUtils.degToRad(num(a.VALUE)));
        o.quaternion.multiply(_deltaQuat);
        o.rotation.setFromQuaternion(o.quaternion);
      }
    }

    changeRotationY(a) {
      const o = object(a.NAME);
      if (o) {
        _deltaQuat.setFromAxisAngle(_localAxisY, THREE.MathUtils.degToRad(num(a.VALUE)));
        o.quaternion.multiply(_deltaQuat);
        o.rotation.setFromQuaternion(o.quaternion);
      }
    }

    changeRotationZ(a) {
      const o = object(a.NAME);
      if (o) {
        _deltaQuat.setFromAxisAngle(_localAxisZ, THREE.MathUtils.degToRad(num(a.VALUE)));
        o.quaternion.multiply(_deltaQuat);
        o.rotation.setFromQuaternion(o.quaternion);
      }
    }

    // World-axis rotation (not affected by the object's own orientation)
    changeRotationXWorld(a) {
      const o = object(a.NAME);
      if (o) {
        _deltaQuat.setFromAxisAngle(_localAxisX, THREE.MathUtils.degToRad(num(a.VALUE)));
        o.quaternion.premultiply(_deltaQuat);
        o.rotation.setFromQuaternion(o.quaternion);
      }
    }

    changeRotationYWorld(a) {
      const o = object(a.NAME);
      if (o) {
        _deltaQuat.setFromAxisAngle(_localAxisY, THREE.MathUtils.degToRad(num(a.VALUE)));
        o.quaternion.premultiply(_deltaQuat);
        o.rotation.setFromQuaternion(o.quaternion);
      }
    }

    changeRotationZWorld(a) {
      const o = object(a.NAME);
      if (o) {
        _deltaQuat.setFromAxisAngle(_localAxisZ, THREE.MathUtils.degToRad(num(a.VALUE)));
        o.quaternion.premultiply(_deltaQuat);
        o.rotation.setFromQuaternion(o.quaternion);
      }
    }

    setScale(a) {
      const o = object(a.NAME);
      if (o) o.scale.set(num(a.X) / 100, num(a.Y) / 100, num(a.Z) / 100);
    }

    setScaleX(a) {
      const o = object(a.NAME);
      if (o) o.scale.x = num(a.VALUE) / 100;
    }

    setScaleY(a) {
      const o = object(a.NAME);
      if (o) o.scale.y = num(a.VALUE) / 100;
    }

    setScaleZ(a) {
      const o = object(a.NAME);
      if (o) o.scale.z = num(a.VALUE) / 100;
    }

    changeScaleX(a) {
      const o = object(a.NAME);
      if (o) o.scale.x += num(a.VALUE) / 100;
    }

    changeScaleY(a) {
      const o = object(a.NAME);
      if (o) o.scale.y += num(a.VALUE) / 100;
    }

    changeScaleZ(a) {
      const o = object(a.NAME);
      if (o) o.scale.z += num(a.VALUE) / 100;
    }

    moveSteps(a) {
      const o = object(a.NAME);
      if (o) {
        const d = new THREE.Vector3(0, 0, -1).applyQuaternion(o.quaternion);
        o.position.addScaledVector(d, num(a.STEPS) / 10);
      }
    }

    moveToward(a) {
      const o = object(a.NAME);
      if (o) {
        const d = new THREE.Vector3(num(a.X), num(a.Y), num(a.Z)).sub(o.position).normalize();
        o.position.addScaledVector(d, num(a.STEPS) / 10);
      }
    }

    pointObject(a) {
      const o = object(a.NAME),
        t = object(a.TARGET);
      if (o && t) pointToward(o, t);
    }

    pointXYZ(a) {
      const o = object(a.NAME);
      if (o) pointToward(o, new THREE.Vector3(num(a.X), num(a.Y), num(a.Z)));
    }

    glide(a, util) {
      const o = object(a.NAME);
      if (!o) return;
      const seconds = Math.max(0, num(a.SECONDS));
      if (seconds === 0) {
        o.position.set(num(a.X), num(a.Y), num(a.Z));
        return;
      }
      if (!util.stackFrame.start) {
        util.stackFrame.start = performance.now();
        util.stackFrame.from = o.position.clone();
      }
      const t = Math.min(1, (performance.now() - util.stackFrame.start) / (seconds * 1000));
      o.position.lerpVectors(util.stackFrame.from, new THREE.Vector3(num(a.X), num(a.Y), num(a.Z)), t);
      if (t < 1) util.yield();
    }

    useCamera(a) {
      const n = name(a.NAME),
        o = objects.get(n);
      if (o) {
        cameraObject = n;
        o.getWorldPosition(camera.position);
        o.getWorldQuaternion(camera.quaternion);
      }
    }

    setColor(a) {
      const o = object(a.NAME);
      if (o) setMaterial(o, (m) => m.color && m.color.set(color(a.COLOR)));
    }

    setOpacity(a) {
      const o = object(a.NAME),
        opacity = THREE.MathUtils.clamp(1 - num(a.VALUE) / 100, 0, 1);
      if (o)
        setMaterial(o, (m) => {
          m.transparent = opacity < 1;
          m.opacity = opacity;
          m.needsUpdate = true;
        });
    }

    setPassThrough(a) {
      const o = object(a.NAME);
      if (o) o.userData.passThrough = name(a.STATE) === 'on';
    }

    setPhysics(a) {
      const o = object(a.NAME);
      if (o) {
        o.userData.physics = name(a.STATE) === 'on';
        if (!o.userData.physics) o.userData.velocityY = 0;
      }
    }

    isTouching(a) {
      return touching(object(a.NAME), object(a.TARGET));
    }

    bounce(a) {
      const o = object(a.NAME);
      if (!o || o.userData.passThrough) return;
      for (const other of objects.values()) {
        if (other !== o && touching(o, other)) {
          const delta = o.position.clone().sub(other.position);
          if (Math.abs(delta.x) >= Math.abs(delta.y) && Math.abs(delta.x) >= Math.abs(delta.z)) o.position.x += Math.sign(delta.x || 1) * 0.2;
          else if (Math.abs(delta.y) >= Math.abs(delta.z)) o.position.y += Math.sign(delta.y || 1) * 0.2;
          else o.position.z += Math.sign(delta.z || 1) * 0.2;
          break;
        }
      }
    }

    start() {
      drawing = true;
    }

    stop() {
      drawing = false;
      clearSkin();
    }

    isDrawing() {
      return drawing;
    }

    setFogDistance(a) {
      fogDistance = num(a.VALUE);
      updateFog();
    }

    setFogColor(a) {
      fogColor = color(a.COLOR);
      updateFog();
    }

    setFog(a) {
      fogEnabled = name(a.STATE) === 'on';
      updateFog();
    }

    setLight(a) {
      const n = name(a.NAME),
        o = objects.get(n);
      if (!o) return;
      if (name(a.STATE) === 'on') {
        let l = lights.get(n);
        if (!l) {
          l = new THREE.PointLight(0xffffff, 10, 100);
          lights.set(n, l);
          scene.add(l);
        }
        l.castShadow = rtxShadows;
        o.getWorldPosition(l.position);
      } else {
        const l = lights.get(n);
        if (l) {
          scene.remove(l);
          lights.delete(n);
        }
      }
    }

    setLightIntensity(a) {
      const l = lights.get(name(a.NAME));
      if (l) l.intensity = num(a.VALUE);
    }

    setLightColor(a) {
      const l = lights.get(name(a.NAME));
      if (l) l.color.set(color(a.COLOR));
    }

    setReflectivity(a) {
      const o = object(a.NAME),
        v = THREE.MathUtils.clamp(num(a.VALUE), 0, 1);
      if (o)
        setMaterial(o, (m) => {
          if ('metalness' in m) m.metalness = v;
          if ('roughness' in m) m.roughness = 1 - v;
          m.needsUpdate = true;
        });
    }

    setRTXShadows(a) {
      rtxShadows = name(a.STATE) === 'on';
      glRenderer.shadowMap.type = rtxShadows ? THREE.PCFSoftShadowMap : THREE.PCFShadowMap;
      glRenderer.shadowMap.needsUpdate = true;
      applyRTXToAll();
    }

    getPositionX(a) {
      const o = object(a.NAME);
      return o ? o.position.x : 0;
    }

    getPositionY(a) {
      const o = object(a.NAME);
      return o ? o.position.y : 0;
    }

    getPositionZ(a) {
      const o = object(a.NAME);
      return o ? o.position.z : 0;
    }

    getRotationX(a) {
      const o = object(a.NAME);
      return o ? THREE.MathUtils.radToDeg(o.rotation.x) : 0;
    }

    getRotationY(a) {
      const o = object(a.NAME);
      return o ? THREE.MathUtils.radToDeg(o.rotation.y) : 0;
    }

    getRotationZ(a) {
      const o = object(a.NAME);
      return o ? THREE.MathUtils.radToDeg(o.rotation.z) : 0;
    }

    getScaleX(a) {
      const o = object(a.NAME);
      return o ? o.scale.x * 100 : 0;
    }

    getScaleY(a) {
      const o = object(a.NAME);
      return o ? o.scale.y * 100 : 0;
    }

    getScaleZ(a) {
      const o = object(a.NAME);
      return o ? o.scale.z * 100 : 0;
    }

    distance(a) {
      const o = object(a.NAME),
        t = object(a.TARGET);
      return o && t ? o.position.distanceTo(t.position) : 0;
    }

    async textureCostume(a, util) {
      const o = object(a.NAME);
      if (!o) return;
      const costume = util.target.sprite.costumes.find((c) => c.name === name(a.COSTUME));
      if (!costume || !costume.asset) return;
      const texture = await new THREE.TextureLoader().loadAsync(costume.asset.encodeDataURI());
      texture.colorSpace = THREE.SRGBColorSpace;
      setMaterial(o, (m) => {
        m.map = texture;
        m.transparent = true;
        m.depthWrite = false;
        m.needsUpdate = true;
      });
    }

    async textureURL(a) {
      const o = object(a.NAME);
      if (!o) return;
      const url = name(a.URL);
      if (!(await Scratch.canFetch(url))) return;
      const response = await Scratch.fetch(url);
      const blob = await response.blob();
      const local = URL.createObjectURL(blob);
      try {
        const texture = await new THREE.TextureLoader().loadAsync(local);
        texture.colorSpace = THREE.SRGBColorSpace;
        setMaterial(o, (m) => {
          m.map = texture;
          m.transparent = true;
          m.depthWrite = false;
          m.needsUpdate = true;
        });
      } finally {
        URL.revokeObjectURL(local);
      }
    }

    async modelList(a, util) {
      const n = name(a.NAME),
        items = listValue(a.LIST, util);
      if (!objects.has(n) || !items.length) return;
      let root;
      if (items.every((v) => Number.isFinite(Number(v)) && Number(v) >= 0 && Number(v) <= 255)) {
        const bytes = new Uint8Array(items.map(Number));
        const gltf = await new Promise((resolve, reject) => new GLTFLoader().parse(bytes.buffer, '', resolve, reject));
        root = gltf.scene;
      } else {
        const text = items.join('\n').trim();
        if (text.startsWith('{') || text.startsWith('[')) {
          const gltf = await new Promise((resolve, reject) => new GLTFLoader().parse(text, '', resolve, reject));
          root = gltf.scene;
        } else root = new OBJLoader().parse(text);
      }
      replaceObject(n, root);
    }
  }

  runtime.on('PROJECT_STOP_ALL', () => {
    drawing = false;
    clearSkin();
  });

  runtime.on('PROJECT_LOADED', () => {
    drawing = false;
    installBackLayer();
    startRenderLoop();
  });

  runtime.on('RUNTIME_DISPOSED', () => {
    drawing = false;
    clearSkin();
  });

  Scratch.extensions.register(new BackLayer3D());
})(Scratch);
