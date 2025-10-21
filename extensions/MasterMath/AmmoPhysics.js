// Name: Ammo Physics
// ID: masterMathAmmoPhysics
// Description: Advanced three dimensional rigid body physics and collision detection.
// By: -MasterMath- <https://scratch.mit.edu/users/-MasterMath-/>
// License: MPL-2.0 and MIT

// V0.9.5

// Development using Cannon.js started December 14, 2024 - discontinued.
// Development using Ammo.js started January 30, 2025.

// ChatGPT and AI LLMs were used to assist in the learning of Ammo.js due to the apparent lack of documentation. It did not write all of the code for me.

(async function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This extension must run unsandboxed!");
  }

  const Ammo = await Scratch.external.evalAndReturn(
    "https://raw.githubusercontent.com/Brackets-Coder/AmmoPhysics/refs/heads/main/dependencies/ammo.min.js",
    "Ammo"
  );
  const Quaternion = await Scratch.external.evalAndReturn(
    "https://raw.githubusercontent.com/Brackets-Coder/AmmoPhysics/refs/heads/main/dependencies/quaternion.min.js",
    "Quaternion"
  );

  Ammo()
    .then(function (Ammo) {
      const Cast = Scratch.Cast;

      function quaternionToEuler(q) {
        const quaternion = new Quaternion(q.w(), q.x(), q.y(), q.z());
        const euler = quaternion.toEuler("XYZ");
        return {
          x: euler[0] * (180 / Math.PI),
          y: euler[1] * (180 / Math.PI),
          z: euler[2] * (180 / Math.PI),
        };
      }

      function eulerToQuaternion(x, y, z) {
        let quaternion = Quaternion.fromEuler(
          x * (Math.PI / 180),
          y * (Math.PI / 180),
          z * (Math.PI / 180),
          "XYZ"
        );
        return {
          x: quaternion.x,
          y: quaternion.y,
          z: quaternion.z,
          w: quaternion.w,
        };
      }

      function createShapeBody(shape, mass, name) {
        mass = Cast.toNumber(mass);
        name = Cast.toString(name);
        if (bodies[name]) {
          const body = bodies[name];
          if (body) {
            world.removeRigidBody(body);
            world.removeCollisionObject(body);
            Ammo.destroy(body.getMotionState());
            Ammo.destroy(body.getCollisionShape());
            Ammo.destroy(body);
            delete bodies[name];
          }
        }
        const localInertia = new Ammo.btVector3(0, 0, 0);
        shape.calculateLocalInertia(mass, localInertia);

        const transform = new Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin(new Ammo.btVector3(0, 0, 0));

        const motionState = new Ammo.btDefaultMotionState(transform);
        const rbInfo = new Ammo.btRigidBodyConstructionInfo(
          mass,
          motionState,
          shape,
          localInertia
        );
        const body = new Ammo.btRigidBody(rbInfo);
        body.userData = name;
        world.addRigidBody(body);
        bodies[name] = body;
        bodies[name].collisions = [];
      }

      function addCompoundShape(name, shape, x1, y1, z1, x2, y2, z2) {
        name = Cast.toString(name);
        const transform = new Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin(
          new Ammo.btVector3(
            Cast.toNumber(x1),
            Cast.toNumber(y1),
            Cast.toNumber(z1)
          )
        );
        let quaternion = eulerToQuaternion(
          Cast.toNumber(x2),
          Cast.toNumber(y2),
          Cast.toNumber(z2)
        );
        quaternion = new Ammo.btQuaternion(
          quaternion.x,
          quaternion.y,
          quaternion.z,
          quaternion.w
        );
        transform.setRotation(quaternion);

        compoundShapes[name].addChildShape(transform, shape);
      }

      function shapeWarning(target, name) {
        console.warn(
          `Attempted to add child shape to nonexistent compound body "${name}" in ${target.isStage ? "Stage" : 'Sprite "' + target.sprite.name}"`
        );
      }

      function processVertices(list) {
        const points = [];
        const array = list;
        if (array) {
          for (let i = 0; i < array.length; i++) {
            if (array[i] != "") {
              const item = array[i].split(" ");
              if (item.length !== 3) {
                return;
              }
              points.push(
                new Ammo.btVector3(
                  Cast.toNumber(item[0]),
                  Cast.toNumber(item[1]),
                  Cast.toNumber(item[2])
                )
              );
            }
          }
        } else {
          console.warn(
            `Attempted to process nonexistent vertex list "${list}"`
          );
        }
        return points;
      }

      function createTriangleMesh(points, faceList) {
        const mesh = new Ammo.btTriangleMesh();

        if (faceList) {
          for (let i = 0; i < faceList.length; i++) {
            if (faceList[i] != "") {
              const indices = faceList[i]
                ?.split(" ")
                ?.map((n) => Cast.toNumber(n) - 1);
              // * validate triangulated mesh
              if (indices.length !== 3) {
                console.warn(
                  `Attempted to process non-triangulated face list "${faceList}"`
                );
                return;
              }

              // TODO: this doesn't validate the points list, only the vertex list.
              const a = points[indices[0]];
              const b = points[indices[1]];
              const c = points[indices[2]];

              if (a && b && c) {
                mesh.addTriangle(
                  new Ammo.btVector3(a.x(), a.y(), a.z()),
                  new Ammo.btVector3(b.x(), b.y(), b.z()),
                  new Ammo.btVector3(c.x(), c.y(), c.z()),
                  true
                );
              }
            }
          }
        }
        return mesh;
      }

      function processOBJ(objList) {
        let vertices = objList.filter((line) => line.startsWith("v "));
        if (vertices) vertices = vertices.map((line) => line.split("v ")[1]);

        let faces = objList.filter((line) => line.startsWith("f "));
        if (faces) faces = faces.map((line) => line.split("f ")[1]);

        // handle slash notation if present
        if (faces)
          faces = faces.map((line) =>
            line
              .split(" ")
              .map((part) => (part.includes("/") ? part.split("/")[0] : part))
              .join(" ")
          );

        if (
          vertices.every((item) => item.split(" ").length == 3) &&
          faces.every((item) => item.split(" ").length == 3)
        ) {
          return { vertices, faces };
        } else if (
          vertices.every((item) => item.split(" ").length == 3) &&
          !faces.every((item) => item.split(" ").length == 3)
        ) {
          return vertices;
        } else {
          return;
        }
      }

      let collisionConfig = new Ammo.btDefaultCollisionConfiguration();
      let dispatcher = new Ammo.btCollisionDispatcher(collisionConfig);
      Ammo.btGImpactCollisionAlgorithm.prototype.registerAlgorithm(dispatcher);
      let broadphase = new Ammo.btDbvtBroadphase();
      let solver = new Ammo.btSequentialImpulseConstraintSolver();
      let world = new Ammo.btDiscreteDynamicsWorld(
        dispatcher,
        broadphase,
        solver,
        collisionConfig
      );
      let maxSubSteps = 10;
      world.setGravity(new Ammo.btVector3(0, -9.81, 0));

      let bodies = {};
      let compoundShapes = {};
      let rays = {};

      const vm = Scratch.vm;
      const runtime = vm.runtime;

      //* from delta time extension
      let deltaTime = 0;
      let previousTime = 0;

      runtime.on("BEFORE_EXECUTE", () => {
        const now = performance.now();

        if (previousTime === 0) {
          deltaTime = 1 / runtime.frameLoop.framerate;
        } else {
          deltaTime = (now - previousTime) / 1000;
        }
        previousTime = now;
      });
      //* ------------

      runtime.on("PROJECT_START", () => {
        world.setGravity(new Ammo.btVector3(0, -9.81, 0));
        for (const key in bodies) {
          if (Object.prototype.hasOwnProperty.call(bodies, key)) {
            const body = bodies[key];
            if (body) {
              world.removeRigidBody(body);
              if (body.getMotionState()) Ammo.destroy(body.getMotionState());
              if (body.getCollisionShape())
                Ammo.destroy(body.getCollisionShape());
              Ammo.destroy(body);

              delete bodies[key];
            }
          }
        }
        bodies = {};

        for (const key in rays) {
          if (Object.prototype.hasOwnProperty.call(rays, key)) {
            const ray = rays[key];
            if (ray) {
              if (ray.endpoint) Ammo.destroy(ray.endpoint);
              Ammo.destroy(ray);
              delete rays[key];
            }
          }
        }
        rays = {};
      });

      // These SVG Icons from Blender source code: https://github.com/blender/blender/tree/main/release/datafiles/icons_svg
      const sphereIcon =
        "data:image/svg+xml;base64,PHN2ZyBpZD0ic3ZnMyIgaGVpZ2h0PSIxNjAwIiB2aWV3Qm94PSIwIDAgMTYwMCAxNjAwIiB3aWR0aD0iMTYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIj48c29kaXBvZGk6bmFtZWR2aWV3IHBhZ2Vjb2xvcj0iIzMwMzAzMCIgc2hvd2dyaWQ9InRydWUiPjxpbmtzY2FwZTpncmlkIGlkPSJncmlkNSIgdW5pdHM9InB4IiBzcGFjaW5neD0iMTAwIiBzcGFjaW5neT0iMTAwIiBjb2xvcj0iIzQ3NzJiMyIgb3BhY2l0eT0iMC4yIiB2aXNpYmxlPSJ0cnVlIiAvPjwvc29kaXBvZGk6bmFtZWR2aWV3PjxnIGZpbGw9IiNmZmYiPjxwYXRoIGlkPSJwYXRoMiIgZD0ibTM5MSAzMzBjLTEuODQ2OTIgMC0zLjUxOTU3LjI4MjYxLTQuNzc1MzkuNzY1NjItLjYyNzkxLjI0MTUxLTEuMTU0NzguNTMwNTItMS41NTA3OC44OTA2M3MtLjY3MzgzLjgyMjkyLS42NzM4MyAxLjM0Mzc1YS41MDAwNS41MDAwNSAwIDEgMCAxIDBjMC0uMTY5NTUuMDg1OC0uMzY1NDEuMzQ3NjYtLjYwMzUyLjI2MTg0LS4yMzgxLjY4Nzk1LS40ODYzNCAxLjIzNjMyLS42OTcyNiAxLjA5Njc2LS40MjE4NCAyLjY3MzA0LS42OTkyMiA0LjQxNjAyLS42OTkyMnMzLjMxOTI2LjI3NzM4IDQuNDE2MDIuNjk5MjJjLjU0ODM3LjIxMDkyLjk3NDQ4LjQ1OTE2IDEuMjM2MzIuNjk3MjYuMjYxODUuMjM4MTEuMzQ3NjYuNDMzOTcuMzQ3NjYuNjAzNTJhLjUwMDA1LjUwMDA1IDAgMSAwIDEgMGMwLS41MjA4My0uMjc3ODMtLjk4MzY0LS42NzM4My0xLjM0Mzc1cy0uOTIyODctLjY0OTEyLTEuNTUwNzgtLjg5MDYzYy0xLjI1NTgyLS40ODMwMS0yLjkyODQ3LS43NjU2Mi00Ljc3NTM5LS43NjU2MnoiIG9wYWNpdHk9Ii41IiB0cmFuc2Zvcm09Im1hdHJpeCgxMDAgMCAwIDEwMCAtMzgzMDAgLTMyNTAwKSIvPjxwYXRoIGlkPSJwYXRoMSIgZD0ibTM5MSAzODljLTMuODM4MzYtLjAwMDAxLTYuOTYwOTcgMy4xMDUzNC02Ljk5NjA5IDYuOTM1NTVhLjUwMDA1LjUwMDA1IDAgMCAwIC0uMDAzOTEuMDY0NDVjMCAzLjg2MDEyIDMuMTM5ODggNy4wMDAwMSA3IDcgLjAxNzEgMCAuMDMzNy0uMDAyLjA1MDgtLjAwMmEuNTAwMDUuNTAwMDUgMCAwIDAgLjAxLS4wMDJjMy44MzE3Ni0uMDMyOTIgNi45MzkyLTMuMTU2MzIgNi45MzkyLTYuOTk2IDAtLjAxNzEtLjAwMi0uMDMzNy0uMDAyLS4wNTA4YS41MDAwNS41MDAwNSAwIDAgMCAtLjAwMi0uMDFjLS4wMzI4LTMuODEwOTUtMy4xMjI4OS02LjkwMTY2LTYuOTMzNTktNi45MzU1NGEuNTAwMDUuNTAwMDUgMCAwIDAgLS4wNjI0MS0uMDAzNjZ6bTAgMWMzLjMxOTY4IDAgNiAyLjY4MDMyIDYgNiAwIC4xNjk1NS0uMDg1OC4zNjU0MS0uMzQ3NjYuNjAzNTItLjI2MTg0LjIzODEtLjY4Nzk1LjQ4NjM0LTEuMjM2MzIuNjk3MjYtMS4wOTY3Ni40MjE4NC0yLjY3MzA0LjY5OTIyLTQuNDE2MDIuNjk5MjItLjY1OTM5IDAtMS4yODIyMS0uMDUwOS0xLjg3Njk1LS4xMjMwNS0uMDcyMi0uNTk0NzQtLjEyMzA1LTEuMjE3NTYtLjEyMzA1LTEuODc2OTUgMC0xLjc0Mjk4LjI3NzM4LTMuMzE5MjYuNjk5MjItNC40MTYwMi4yMTA5Mi0uNTQ4MzcuNDU5MTYtLjk3NDQ4LjY5NzI2LTEuMjM2MzIuMjM4MTEtLjI2MTg1LjQzMzk3LS4zNDc2Ni42MDM1Mi0uMzQ3NjZ6bS0xLjc2MzY3LjI2MzY3Yy0uMTczMzcuMjg3MTktLjMzMjc0LjYwMjI0LS40NzA3MS45NjA5NC0uNDgzMDEgMS4yNTU4Mi0uNzY1NjIgMi45Mjg0Ny0uNzY1NjIgNC43NzUzOSAwIC41OTQ4Ni4wMzc5IDEuMTYyMjkuMDkzNyAxLjcxMjg5LS41NTg5Ny0uMTEzLTEuMDc5NTEtLjI0NjYyLTEuNTA5NzctLjQxMjExLS41NDgzNy0uMjEwOTItLjk3NDQ4LS40NTkxNi0xLjIzNjMyLS42OTcyNi0uMjYxOC0uMjM4MTEtLjM0NzYxLS40MzM5Ny0uMzQ3NjEtLjYwMzUyIDAtMi43MDU2NyAxLjc4MDM0LTQuOTg1MTIgNC4yMzYzMy01LjczNjMzem0tMy45NzI2NiA3LjVjLjI4NzE5LjE3MzM3LjYwMjI0LjMzMjc0Ljk2MDk0LjQ3MDcxLjU4NTI0LjIyNTA5IDEuMjY4MDIuNDAxNTMgMi4wMDk3Ny41MzEyNC4xMjk3Mi43NDE3NC4zMDYxNiAxLjQyNDUzLjUzMTI0IDIuMDA5NzcuMTM3OTcuMzU4Ny4yOTczNC42NzM3NS40NzA3MS45NjA5NC0xLjg5ODYzLS41ODA3NC0zLjM5MTkyLTIuMDc0MDItMy45NzI2Ni0zLjk3MjY2em0xMS40NzI2NiAwYy0uNzUxMjIgMi40NTU5OS0zLjAzMDY3IDQuMjM2MzMtNS43MzYzMyA0LjIzNjMzLS4xNjk1NSAwLS4zNjU0MS0uMDg1OC0uNjAzNTItLjM0NzY2LS4yMzgxLS4yNjE4NC0uNDg2MzQtLjY4Nzk1LS42OTcyNi0xLjIzNjMyLS4xNjU0OS0uNDMwMjYtLjI5OTExLS45NTA4LS40MTIxMS0xLjUwOTc3LjU1MDYuMDU1OSAxLjExODAzLjA5MzcgMS43MTI4OS4wOTM3IDEuODQ2OTIgMCAzLjUxOTU3LS4yODI2MiA0Ljc3NTM5LS43NjU2Mi4zNTg3LS4xMzc5Ny42NzM3NS0uMjk3MzQuOTYwOTQtLjQ3MDcxeiIgdHJhbnNmb3JtPSJtYXRyaXgoMTAwIDAgMCAxMDAgLTM4MzAwIC0zODgwMCkiLz48L2c+PC9zdmc+";
      const cubeIcon =
        "data:image/svg+xml;base64,PHN2ZyBpZD0ic3ZnMyIgaGVpZ2h0PSIxNjAwIiB2aWV3Qm94PSIwIDAgMTYwMCAxNjAwIiB3aWR0aD0iMTYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIj48c29kaXBvZGk6bmFtZWR2aWV3IHBhZ2Vjb2xvcj0iIzMwMzAzMCIgc2hvd2dyaWQ9InRydWUiPjxpbmtzY2FwZTpncmlkIGlkPSJncmlkNSIgdW5pdHM9InB4IiBzcGFjaW5neD0iMTAwIiBzcGFjaW5neT0iMTAwIiBjb2xvcj0iIzQ3NzJiMyIgb3BhY2l0eT0iMC4yIiB2aXNpYmxlPSJ0cnVlIiAvPjwvc29kaXBvZGk6bmFtZWR2aWV3PjxnIGZpbGw9IiNmZmYiPjxwYXRoIGlkPSJwYXRoMSIgZD0ibTM2Ni41IDM4OWEuNTAwMDUuNTAwMDUgMCAwIDAgLS4zNTM1Mi4xNDY0OGwtMyAzYS41MDAwNS41MDAwNSAwIDAgMCAtLjE0NjQ4LjM1MzUydjEwYS41MDAwNS41MDAwNSAwIDAgMCAuNS41aDEwYS41MDAwNS41MDAwNSAwIDAgMCAuMzUzNTItLjE0NjQ4bDMtM2EuNTAwMDUuNTAwMDUgMCAwIDAgLjE0NjQ4LS4zNTM1MnYtMTBhLjUwMDA1LjUwMDA1IDAgMCAwIC0uNS0uNXptLjIwNzAzIDFoOC41ODAwOGwtMS45OTQxNCAyaC04LjU4NTk0em05LjI5Mjk3LjcwMTE3djguNTkxOGwtMiAydi04LjU4Nzg5em0tMTIgMi4yOTg4M2g5djloLTl6IiB0cmFuc2Zvcm09Im1hdHJpeCgxMDAgMCAwIDEwMCAtMzYxOTkuMzYyIC0zODgwMC4yMzQpIi8+PHBhdGggaWQ9InBhdGgyIiBkPSJtODcwLjQ5MjE5IDIyMC45OTIxOWEuNTAwMDUuNTAwMDUgMCAwIDAgLS40OTIxOS41MDc4MXY5Ljc5Mjk3bC0yLjg1MzUyIDIuODYxMzNhLjUwMDA1LjUwMDA1IDAgMSAwIC43MDcwNC43MDUwOGwyLjg1MzUxLTIuODU5MzhoOS43OTI5N2EuNTAwMDUuNTAwMDUgMCAxIDAgMC0xaC05LjV2LTkuNWEuNTAwMDUuNTAwMDUgMCAwIDAgLS41MDc4MS0uNTA3ODF6IiBvcGFjaXR5PSIuNSIgdHJhbnNmb3JtPSJtYXRyaXgoMTAwIDAgMCAxMDAgLTg2NTk5LjM2MiAtMjIwMDAuOTQ2KSIvPjwvZz48L3N2Zz4=";
      const cylinderIcon =
        "data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE2MDAiIHZpZXdCb3g9IjAgMCAxNDAwIDE2MDAiIHdpZHRoPSIxNDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIiB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiPjxzb2RpcG9kaTpuYW1lZHZpZXcgcGFnZWNvbG9yPSIjMzAzMDMwIiBzaG93Z3JpZD0idHJ1ZSI+PGlua3NjYXBlOmdyaWQgaWQ9ImdyaWQ1IiB1bml0cz0icHgiIHNwYWNpbmd4PSIxMDAiIHNwYWNpbmd5PSIxMDAiIGNvbG9yPSIjNDc3MmIzIiBvcGFjaXR5PSIwLjIiIHZpc2libGU9InRydWUiIC8+PC9zb2RpcG9kaTpuYW1lZHZpZXc+PGcgZmlsbD0iI2ZmZiI+PGcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyIgdHJhbnNmb3JtPSJtYXRyaXgoMTAwIDAgMCAxMDAgLTE1MzAwIC0zODgwMCkiPjxwYXRoIGQ9Im0xNTYuNDk2MDkgMzkzLjI0NjA5YS41MDAwNS41MDAwNSAwIDAgMCAtLjI3MzQzLjkxOTkzYy45MjcuNjE4IDIuMzc3MTMuODMzOTggMy43NzczNC44MzM5OCAxLjM5NzA4IDAgMi44NDk3OC0uMjE1NjEgMy43NzczNC0uODMzOThhLjUwMDA1LjUwMDA1IDAgMSAwIC0uNTU0NjgtLjgzMjA0Yy0uNTcyNDQuMzgxNjMtMS45NTA0Ni42NjYwMi0zLjIyMjY2LjY2NjAyLTEuMjc1NjMgMC0yLjY0OTY2LS4yODQwMi0zLjIyMjY2LS42NjYwMmEuNTAwMDUuNTAwMDUgMCAwIDAgLS4yODEyNS0uMDg3OXoiIG9wYWNpdHk9Ii44Ii8+PHBhdGggZD0ibTE2MCAzODljLTEuNTgwMiAwLTMuMDEzMTguMjg1MjktNC4wOTU3Ljc3NzM0LS41NDEyNi4yNDYwMy0uOTk3Ny41NDI2MS0xLjMzNzg5LjkwODIxLS4zNDAyLjM2NTYtLjU2NjQxLjgyMDY1LS41NjY0MSAxLjMxNDQ1djMgNWMwIC40OTM4LjIyNjIxLjk0ODg1LjU2NjQxIDEuMzE0NDUuMzQwMTkuMzY1Ni43OTY2My42NjIxOCAxLjMzNzg5LjkwODIxIDEuMDgyNTIuNDkyMDUgMi41MTU1Ljc3NzM0IDQuMDk1Ny43NzczNHMzLjAxMzE4LS4yODUyOSA0LjA5NTctLjc3NzM0Yy41NDEyNi0uMjQ2MDMuOTk3Ny0uNTQyNjEgMS4zMzc4OS0uOTA4MjEuMzQwMi0uMzY1Ni41NjY0MS0uODIwNjUuNTY2NDEtMS4zMTQ0NXYtNS0zYzAtLjQ5MzgtLjIyNjIxLS45NDg4NS0uNTY2NDEtMS4zMTQ0NS0uMzQwMTktLjM2NTYtLjc5NjYzLS42NjIxOC0xLjMzNzg5LS45MDgyMS0xLjA4MjUyLS40OTIwNS0yLjUxNTUtLjc3NzM0LTQuMDk1Ny0uNzc3MzR6bTAgMWMxLjQ1NzM3IDAgMi43NzM1Ni4yNzQ3MyAzLjY4MTY0LjY4NzUuNDU0MDQuMjA2MzguODAzMS40NDcxIDEuMDE5NTMuNjc5NjlzLjI5ODgzLjQzNjI1LjI5ODgzLjYzMjgxdjMgNWMwIC4xOTY1Ni0uMDgyNC40MDAyMi0uMjk4ODMuNjMyODFzLS41NjU0OS40NzMzMS0xLjAxOTUzLjY3OTY5Yy0uOTA4MDguNDEyNzctMi4yMjQyNy42ODc1LTMuNjgxNjQuNjg3NXMtMi43NzM1Ni0uMjc0NzMtMy42ODE2NC0uNjg3NWMtLjQ1NDA0LS4yMDYzOC0uODAzMS0uNDQ3MS0xLjAxOTUzLS42Nzk2OXMtLjI5ODgzLS40MzYyNS0uMjk4ODMtLjYzMjgxdi01LTNjMC0uMTk2NTYuMDgyNC0uNDAwMjIuMjk4ODMtLjYzMjgxcy41NjU0OS0uNDczMzEgMS4wMTk1My0uNjc5NjljLjkwODA4LS40MTI3NyAyLjIyNDI3LS42ODc1IDMuNjgxNjQtLjY4NzV6Ii8+PC9nPjwvZz48L3N2Zz4=";
      const coneIcon =
        "data:image/svg+xml;base64,PHN2ZyBpZD0ic3ZnMyIgaGVpZ2h0PSIxNjAwIiB2aWV3Qm94PSIwIDAgMTYwMCAxNjAwIiB3aWR0aD0iMTYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIj48c29kaXBvZGk6bmFtZWR2aWV3IHBhZ2Vjb2xvcj0iIzMwMzAzMCIgc2hvd2dyaWQ9InRydWUiPjxpbmtzY2FwZTpncmlkIGlkPSJncmlkNSIgdW5pdHM9InB4IiBzcGFjaW5neD0iMTAwIiBzcGFjaW5neT0iMTAwIiBjb2xvcj0iIzQ3NzJiMyIgb3BhY2l0eT0iMC4yIiB2aXNpYmxlPSJ0cnVlIiAvPjwvc29kaXBvZGk6bmFtZWR2aWV3PjxnIGZpbGw9IiNmZmYiIHRyYW5zZm9ybT0ibWF0cml4KDEwMCAwIDAgMTAwIC03NTIwMCA5MDAwKSI+PHBhdGggaWQ9InBhdGgyIiBkPSJtNzYwLTgyYy0xLjg1ODQyIDAtMy41NDAyLjM0ODU0LTQuNzk2ODguODk4NDM4LS42MjgzMy4yNzQ5NDgtMS4xNTI3NC41OTk4MDQtMS41NDI5Ni45ODI0MjEtLjM5MDIzLjM4MjYxNy0uNjYwMTYuODQ4MjQ4LS42NjAxNiAxLjM2OTE0MWEuNTAwMDUuNTAwMDUgMCAxIDAgMSAwYzAtLjE2OTc0Mi4wOTM3LS4zOTM4NDQuMzYxMzMtLjY1NjI1LjI2NzYyLS4yNjI0MDYuNjk0MjUtLjUzOTUzMiAxLjI0MjE5LS43NzkyOTcgMS4wOTU4Ny0uNDc5NTMgMi42NjUxLS44MTQ0NTMgNC4zOTY0OC0uODE0NDUzczMuMzAwNjEuMzM0OTIzIDQuMzk2NDguODE0NDUzYy41NDc5NC4yMzk3NjUuOTc0NTcuNTE2ODkxIDEuMjQyMTkuNzc5Mjk3cy4zNjEzMy40ODY1MDguMzYxMzMuNjU2MjVhLjUwMDA1LjUwMDA1IDAgMSAwIDEgMGMwLS41MjA4OTMtLjI2OTkzLS45ODY1MjQtLjY2MDE2LTEuMzY5MTQxLS4zOTAyMi0uMzgyNjE3LS45MTQ2My0uNzA3NDczLTEuNTQyOTYtLjk4MjQyMS0xLjI1NjY4LS41NDk4OTgtMi45Mzg0Ni0uODk4NDM4LTQuNzk2ODgtLjg5ODQzOHoiIG9wYWNpdHk9Ii41Ii8+PHBhdGggaWQ9InBhdGgxIiBkPSJtNzU5LjUtODlhLjUwMDA1LjUwMDA1IDAgMCAwIC0uNDE0MDYuMjIwNzAzbC01Ljc1IDguNWEuNTAwMDUuNTAwMDUgMCAwIDAgLS4wMjU0LjA0MTAyYy0uMjEyNTYuMzkwNjQzLS4zMTA1NC44MTgxNTktLjMxMDU0IDEuMjM4Mjc3IDAgMS4yMTc0MjMuODk2MjcgMi4yMzIzMSAyLjE2NjAyIDIuOTE2MDE2IDEuMjY5NzQuNjgzNzA2IDIuOTY2MzMgMS4wODM5ODQgNC44MzM5OCAxLjA4Mzk4NHMzLjU2NDI0LS40MDAyNzggNC44MzM5OC0xLjA4Mzk4NGMxLjI2OTc1LS42ODM3MDYgMi4xNjYwMi0xLjY5ODU5MyAyLjE2NjAyLTIuOTE2MDE2IDAtLjQxOTc0OS0uMDk2OC0uODQ3MTk1LS4zMTI1LTEuMjQwMjM0YS41MDAwNS41MDAwNSAwIDAgMCAtLjAyMzQtLjAzOTA2bC01Ljc1LTguNWEuNTAwMDUuNTAwMDUgMCAwIDAgLS40MTQxLS4yMjA3MDZ6bS4yNjU2MiAxaC40Njg3Nmw1LjU4MDA3IDguMjQ4MDQ3Yy4xMjc0OC4yMzUyMTMuMTg1NTUuNDgzNTkyLjE4NTU1Ljc1MTk1MyAwIC43MTU1NzctLjU1NzgyIDEuNDUyMTEyLTEuNjQwNjIgMi4wMzUxNTYtMS4wODI4MS41ODMwNDQtMi42MzcyMy45NjQ4NDQtNC4zNTkzOC45NjQ4NDRzLTMuMjc2NTctLjM4MTgtNC4zNTkzOC0uOTY0ODQ0Yy0xLjA4MjgtLjU4MzA0NC0xLjY0MDYyLTEuMzE5NTc5LTEuNjQwNjItMi4wMzUxNTYgMC0uMjYyNjg1LjA2MTctLjUyMjM2MS4xODc1LS43NTU4NTl6Ii8+PC9nPjwvc3ZnPg==";
      const capsuleIcon =
        "data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE2MDAiIHZpZXdCb3g9IjAgMCAxNjAwIDE2MDAiIHdpZHRoPSIxNjAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIiB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiPjxzb2RpcG9kaTpuYW1lZHZpZXcgcGFnZWNvbG9yPSIjMzAzMDMwIiBzaG93Z3JpZD0idHJ1ZSI+PGlua3NjYXBlOmdyaWQgaWQ9ImdyaWQ1IiB1bml0cz0icHgiIHNwYWNpbmd4PSIxMDAiIHNwYWNpbmd5PSIxMDAiIGNvbG9yPSIjNDc3MmIzIiBvcGFjaXR5PSIwLjIiIHZpc2libGU9InRydWUiIC8+PC9zb2RpcG9kaTpuYW1lZHZpZXc+PGcgZmlsbD0iI2ZmZiI+PGcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyIgdHJhbnNmb3JtPSJtYXRyaXgoMTAwIDAgMCAxMDAgLTUwODk5Ljk5OTk5OTk5OTk5IC0zODgwMCkiPjxwYXRoIGQ9Im01MTkuMDI1MzkgMzg5LjA1NjY0Yy0xLjIzMDE0LjA2NDUtMi40MjM1Ni42MzQ1LTMuMzc4OTEgMS41ODk4NGwtNCA0Yy0uOTU1MzQuOTU1MzUtMS41MzAwMSAyLjE1MTQ2LTEuNTk3NjUgMy4zODQ3Ny0uMDY3NiAxLjIzMzMxLjM4Nzg2IDIuNDk1NzEgMS40MTQwNiAzLjUwOTc3IDEuMDIzOTIgMS4wMTE4IDIuMjgxNTggMS40NjY4NiAzLjUxMTcyIDEuNDAyMzQgMS4yMzAxNC0uMDY0NSAyLjQyMzU2LS42MzQ1IDMuMzc4OTEtMS41ODk4NGw0LTRjLjk1NTM0LS45NTUzNSAxLjUzMDAxLTIuMTUxNDYgMS41OTc2NS0zLjM4NDc3LjA2NzYtMS4yMzMzMS0uMzg3ODYtMi40OTU3LTEuNDE0MDYtMy41MDk3Ny0xLjAyMzkyLTEuMDExOC0yLjI4MTU4LTEuNDY2ODYtMy41MTE3Mi0xLjQwMjM0em0uMDUyNy45OTgwNWMuOTU2MTctLjA1MDIgMS45MTE5OS4yODEzNCAyLjc1NTg2IDEuMTE1MjMuODQxNi44MzE2NSAxLjE3MTcxIDEuNzg1NjIgMS4xMTkxNCAyLjc0NDE0LS4wNTI2Ljk1ODUzLS41MDQ2MiAxLjkzMDQyLTEuMzA2NjQgMi43MzI0MmwtNCA0Yy0uODAyMDEuODAyMDItMS43Njg0NCAxLjI0ODY4LTIuNzI0NiAxLjI5ODgzLS45NTYxNy4wNTAyLTEuOTExOTktLjI4MTM0LTIuNzU1ODYtMS4xMTUyMy0uODQxNi0uODMxNjQtMS4xNzE3MS0xLjc4NTYyLTEuMTE5MTQtMi43NDQxNC4wNTI2LS45NTg1My41MDQ2Mi0xLjkzMDQxIDEuMzA2NjQtMi43MzI0Mmw0LTRjLjgwMjAxLS44MDIwMiAxLjc2ODQ0LTEuMjQ4NjggMi43MjQ2LTEuMjk4ODN6Ii8+PHBhdGggZD0ibTUxNy40NzI2NiAzOTEuOTk0MTRhLjUwMDA1LjUwMDA1IDAgMCAwIC0uNDU4OTkuNjIzMDVjLjE4NjY4Ljc3NjQyLjI4NDkxIDEuNDI0OTQgMS4xNDA2MyAyLjI0NDE0LjgxNS43ODAyMiAxLjM5MjgyLjk0MzEyIDIuMjQwMjMgMS4xMjY5NWEuNTAwMDUuNTAwMDUgMCAxIDAgLjIxMDk0LS45NzY1NmMtLjg0OTMxLS4xODQyNS0xLjAzODQ5LS4xODI1NS0xLjc1OTc3LS44NzMwNS0uNzIyMTgtLjY5MTM2LS42NTY2NS0uOTEyNjgtLjg1OTM3LTEuNzU1ODZhLjUwMDA1LjUwMDA1IDAgMCAwIC0uNTEzNjctLjM4ODY3eiIgZmlsbC1ydWxlPSJldmVub2RkIiBvcGFjaXR5PSIuOCIvPjwvZz48L2c+PC9zdmc+";
      const meshIcon =
        "data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE2MDAiIHZpZXdCb3g9IjAgMCAxODAwIDE2MDAiIHdpZHRoPSIxODAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIiB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiPjxzb2RpcG9kaTpuYW1lZHZpZXcgcGFnZWNvbG9yPSIjMzAzMDMwIiBzaG93Z3JpZD0idHJ1ZSI+PGlua3NjYXBlOmdyaWQgaWQ9ImdyaWQ1IiB1bml0cz0icHgiIHNwYWNpbmd4PSIxMDAiIHNwYWNpbmd5PSIxMDAiIGNvbG9yPSIjNDc3MmIzIiBvcGFjaXR5PSIwLjIiIHZpc2libGU9InRydWUiIC8+PC9zb2RpcG9kaTpuYW1lZHZpZXc+PGcgZmlsbD0iI2ZmZiI+PGcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyIgdHJhbnNmb3JtPSJtYXRyaXgoMTAwIDAgMCAxMDAgLTEzMDAwIC0zODc5OS45OTk5KSI+PHBhdGggZD0ibTEzNS41IDM4OWEuNTAwMDQ5OTcuNTAwMDQ5OTcgMCAwIDAgLS4zMzAwOC4xMjMwNWwtMiAxLjc1YS41MDAwNDk5Ny41MDAwNDk5NyAwIDAgMCAtLjE2OTkyLjM3Njk1djEuNzVoLTEuNWEuNTAwMDQ5OTcuNTAwMDQ5OTcgMCAwIDAgLS41LjV2MS41YzAgLjk4NjExLjc0MDU0IDEuNjg4OSAxLjU2ODM2IDEuOTE5OTIuNzE1MjUuMTk5NjEgMS41MTQyMS4wNDgyIDIuMTgzNTktLjM4NDc2bDEuMjQ4MDUgMS40MDQyOXYyLjMxMDU1YzAgLjg4ODg5LjM5NDE5IDEuNjE4NDguOTY4NzUgMi4wNzgxMi41NzQ1Ni40NTk2NSAxLjMwNjI1LjY3MTg4IDIuMDMxMjUuNjcxODhzMS40NTY2OS0uMjEyMjMgMi4wMzEyNS0uNjcxODhjLjU3NDU2LS40NTk2NC45Njg3NS0xLjE4OTIzLjk2ODc1LTIuMDc4MTJ2LTIuMzEwNTVsMS4yNDgwNS0xLjQwNDI5Yy42NjkzOC40MzI5OCAxLjQ2ODM0LjU4NDM3IDIuMTgzNTkuMzg0NzYuODI3ODItLjIzMTAyIDEuNTY4MzYtLjkzMzgxIDEuNTY4MzYtMS45MTk5MnYtMS41YS41MDAwNDk5Ny41MDAwNDk5NyAwIDAgMCAtLjUtLjVoLTEuNXYtMS43NWEuNTAwMDQ5OTcuNTAwMDQ5OTcgMCAwIDAgLS4xNjk5Mi0uMzc2OTVsLTItMS43NWEuNTAwMDQ5OTcuNTAwMDQ5OTcgMCAwIDAgLS4zMzAwOC0uMTIzMDVoLTJhLjUwMDA0OTk3LjUwMDA0OTk3IDAgMCAwIC0uMzUzNTIuMTQ2NDhsLS44NTM1MS44NTM1MmgtLjU4NTk0bC0uODUzNTEtLjg1MzUyYS41MDAwNDk5Ny41MDAwNDk5NyAwIDAgMCAtLjM1MzUyLS4xNDY0OHptLjE4NzUgMWgxLjYwNTQ3bC44NTM1MS44NTM1MmEuNTAwMDQ5OTcuNTAwMDQ5OTcgMCAwIDAgLjM1MzUyLjE0NjQ4aDFhLjUwMDA0OTk3LjUwMDA0OTk3IDAgMCAwIC4zNTM1Mi0uMTQ2NDhsLjg1MzUxLS44NTM1MmgxLjYwNTQ3bDEuNjg3NSAxLjQ3ODUydjIuMDIxNDhhLjUwMDA0OTk3LjUwMDA0OTk3IDAgMCAwIC41LjVoMS41djFjMCAuNTEzODktLjMyMTk2LjgxMTEtLjgzNzg5Ljk1NTA4LS4zOTQwOC4xMDk5Ny0uODIxMi0uMDYyOS0xLjIwNzAzLS4yNWEuNTAwMDQ5OTcuNTAwMDQ5OTcgMCAwIDAgLS44MjgxMy0uNTM3MTFsLTIgMi4yNWEuNTAwMDQ5OTcuNTAwMDQ5OTcgMCAwIDAgLS4xMjY5NS4zMzIwM3YyLjVjMCAuNjExMTEtLjIzMDgxIDEuMDA2NTItLjU5Mzc1IDEuMjk2ODgtLjM2Mjk0LjI5MDM1LS44ODEyNS40NTMxMi0xLjQwNjI1LjQ1MzEycy0xLjA0MzMxLS4xNjI3Ny0xLjQwNjI1LS40NTMxMmMtLjM2Mjk0LS4yOTAzNi0uNTkzNzUtLjY4NTc3LS41OTM3NS0xLjI5Njg4di0yLjVhLjUwMDA0OTk3LjUwMDA0OTk3IDAgMCAwIC0uMTI2OTUtLjMzMjAzbC0yLTIuMjVhLjUwMDA0OTk3LjUwMDA0OTk3IDAgMCAwIC0uODI4MTMuNTM3MTFjLS4zODU4My4xODcwNy0uODEyOTUuMzU5OTctMS4yMDcwMy4yNS0uNTE1OTMtLjE0Mzk4LS44Mzc4OS0uNDQxMTktLjgzNzg5LS45NTUwOHYtMWgxLjVhLjUwMDA0OTk3LjUwMDA0OTk3IDAgMCAwIC41LS41di0yLjAyMzQ0eiIvPjxwYXRoIGQ9Im0xMzcgMzkyYS41MDAwNS41MDAwNSAwIDAgMCAtLjM1MzUyLjE0NjQ4bC0uNS41YS41MDAwNS41MDAwNSAwIDAgMCAtLjE0NjQ4LjM1MzUydi41YS41MDAwNS41MDAwNSAwIDEgMCAxIDB2LS4yOTI5N2wuMjA3MDMtLjIwNzAzaC4yOTI5N2EuNTAwMDUuNTAwMDUgMCAxIDAgMC0xem00IDBhLjUwMDA1LjUwMDA1IDAgMCAwIC0uMzUzNTIuMTQ2NDhsLS41LjVhLjUwMDA1LjUwMDA1IDAgMCAwIC0uMTQ2NDguMzUzNTJ2LjVhLjUwMDA1LjUwMDA1IDAgMSAwIDEgMHYtLjI5Mjk3bC4yMDcwMy0uMjA3MDNoLjI5Mjk3YS41MDAwNS41MDAwNSAwIDEgMCAwLTF6bS0yLjUgM2EuNTAwMDUuNTAwMDUgMCAxIDAgMCAxaDFhLjUwMDA1LjUwMDA1IDAgMSAwIDAtMXoiIG9wYWNpdHk9Ii44Ii8+PC9nPjwvZz48L3N2Zz4=";
      // compound icon made by me, combining Blender's icons into one
      const compoundIcon =
        "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMzQ4Ljg4NzA5IiBoZWlnaHQ9IjEyMTMuNzc3NDIiIHZpZXdCb3g9IjAsMCwxMzQ4Ljg4NzA5LDEyMTMuNzc3NDIiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQ2Ny42ODk1Miw0MTUuNDAyMzIpIj48ZyBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0iTTg0MC41NDkzNiwtNDEzLjk5MzIyYzIyLjQ0ODQ2LDAuMDAyMjUgNDAuNjQ2LDE4LjE5OTc1IDQwLjY0ODIxLDQwLjY0ODIxdjgxMi45NjQ1NWMtMC4wMDE5LDEwLjc3OTk0IC00LjI4NTMyLDIxLjExNzc1IC0xMS45MDgyOSwyOC43Mzk5MmwtNDcuOTE2MDYsNDcuOTE2MDZjLTAuNzM5MDksLTguMDAwNDEgLTIuNTAzMTYsLTE1Ljk3MjggLTMuMjAzNTIsLTIzLjk4NTg5Yy0xLjc5NTYsLTIwLjU0MzY4IC0yLjUxMTI0LC02Mi43NzIyIC0xOC4yNjg1NiwtODUuNjg3MjN2LTY4Mi4yOTY2bC0xNjIuNTkyOTIsMTYyLjkxMDgxdjMzNy4xOTU3MWMtNC44ODQ0MiwtNC4yNDk0NCAtMTEuMDgyODYsLTcuMDI3NDggLTE3LjkwNSwtNy42NDM2N2MtMS4wMDE4LC0wLjAyOTczIC0xLjk3NTI0LC0wLjA2MjY5IC0yLjg4NzgyLC0wLjEyOTc5Yy0xMS45MTUxNywtMC44NzYzMyAtMjMuODk5NTksMC4zNDEyMSAtMzUuODQyMDQsMGMtOC42NzA5NSwtMC4yNDc3NSAtMTYuODUwODQsLTEuNzE5OTggLTI0LjY2MTYsLTIuNDQ4Njh2LTMwMi45OTc1OWgtNzMxLjY2ODA5djI3OC4xNjk0N2MtOS45NDA4OCwzLjk4Njg5IC0xNy4zOTI3NCwxMi44NjQ5MyAtMTkuMzc4MDUsMjMuNjU2NTljLTAuMzQ0MjYsMS44NzEyOCAtMC41MjQxNSwzLjgwMDA5IC0wLjUyNDE1LDUuNzcwOTJjLTIuMjA0OTUsMTEuMzE5OTYgLTcuNzkxOTMsMjAuNzI5MjggLTE0LjM3NjMzLDMwLjM3MTk1Yy0xMi4xNDIyNSwxNy43ODE5NyAtMzIuNjEyOTQsMjYuODkzNzEgLTQ3LjAxNzg5LDQxLjY0NTJ2LTQyMC4yNjI0MmMwLjAwMTksLTEwLjc3OTk0IDQuMjg1MzIsLTIxLjExNzc1IDExLjkwODI5LC0yOC43Mzk5MmwyNDMuODg5MzUsLTI0My44ODkzNWM3LjYyMjE4LC03LjYyMjk3IDE3Ljk1OTk5LC0xMS45MDY0MiAyOC43Mzk5MiwtMTEuOTA4Mjl6TS0xMTguMTc3MzEsLTE3MC4xMDM4N2g2OTguMDA2NDdsMTYyLjExNjUxLC0xNjIuNTkyOTJoLTY5Ny41MzAwOXoiLz48cGF0aCBkPSJNMTAzLjc2NjQ2LDcyNC4xNTcxMWM0LjY3ODE2LC0zLjIxMDY5IDkuMTE1MjksLTYuNDY2ODUgMTMuMjUwNDUsLTkuNjk5NzZjOS44NDI4OCwtNy42OTUzIDE0LjM5ODk5LC0yMS41MjQzMSAyMy4wODAwMiwtMzAuMzYwOTJjMTEuMDMwMDksLTExLjIyNzczIDI3LjE0NDk4LC0yNC45Njg2NCAzMi41Nzk0MSwtNDEuMjM1NzVoMTY4Ljg5MTQ4YzMuOTYxMjgsNi41ODg0OSA5LjE5NDgxLDEyLjM3NDA2IDEzLjUxMDk3LDE4LjMwMTcxYzE5LjgxNDc5LDI3LjIxMzAyIDQ2LjE1NDcyLDQ4Ljg3MzQ5IDc2LjQ4MTE5LDYyLjk5NDcyeiIvPjxwYXRoIGQ9IiIvPjxwYXRoIGQ9IiIvPjxwYXRoIGQ9IiIvPjxwYXRoIGQ9Ik01Ni44NTA3NSwtNDAzLjQ5NTYxYzcuNzc5NzMsNy43Nzk3MyAxMi4wNzM4OSwxOC4zODA1MyAxMS45MDE3OSwyOS4zODEzNHY3NzIuMzE2MzRoMjM2LjY4Nzc1Yy0wLjMxMTgsMS4zMDg2NiAtMC41NDI0NCwyLjY0ODc2IC0wLjY4NjI5LDQuMDE0NzVjLTEuMDQ0ODQsMy4zOTk0NSAtMy43MzIwMSw2LjA1NTEyIC01LjYxNjg5LDkuMDcwOTVjLTEzLjMzOTEsMjEuMzQyNTggLTE4LjEzMzU0LDQzLjI0MzYzIC0xNi45MTYxOSw2OC4yMTA3NWgtMTU3LjQ4NTk1Yy0xLjY0MTI1LC03LjA3MjA0IC03Ljg2NDIyLC0xMy41NTM5MiAtMTAuMzg3MzgsLTE5LjY0NTM2Yy05LjQxNzgxLC0yMi43MzY2MiAtMzIuMzg0NSwtNDQuMjA5ODEgLTQ4LjI5Njc2LC02MS40Mjk5NWMtNy45NzA5NywtOC42MjYxNCAtMjMuMjkzODksLTE4LjM2MTk2IC0zMC4xNDI3MSwtMjguMzk1MjNjLTQuMjg5NTQsLTYuMjg0MDEgLTguNDY1MzUsLTE2LjIwNjYgLTEzLjAxNzg1LC0yMS41MTc4NWMtMy41MzQyOCwtNC4xMjMzMyAtOC44NzgyNiwtNy44NjM4MSAtMTEuMjY0MjgsLTEyLjUxNTQ0Yy0wLjA4MjAyLC0wLjE1OTg5IC0wLjE1OTU4LC0wLjMyMjk5IC0wLjIzMjk4LC0wLjQ4OTA2YzAuMTUzODEsLTEuMjY1OTcgMC4yMzI5OCwtMi41NTQ5NSAwLjIzMjk4LC0zLjg2MjRjMCwtNC42MzE5OCAtMC45OTM2NiwtOS4wMzE5MSAtMi43Nzk0NiwtMTIuOTk4MmMtMC4yOTQ3MiwtMC45OTUyNyAtMC42Nzc1OCwtMS45NTE0NCAtMS4xODIyMywtMi44NDg1OWMtMC42OTA3LC0xLjIyNzkgLTEuNTIyMzcsLTIuMzE1ODUgLTIuNDY2OTYsLTMuMjkxNTdjLTQuMzMyOTIsLTUuNzExMDkgLTEwLjU1Nzg2LC05LjkwNzkyIC0xNy43NDEyMSwtMTEuNjU2OHYtNjc0Ljk2MjI5Yy0wLjE2ODY0LC0xMC43ODA2NiAzLjk1MjM4LC0yMS4xODY3MSAxMS40NTYzNywtMjguOTI4ODVjNy41MDM5OSwtNy43NDIxNCAxNy43NzYyOSwtMTIuMTg2MTUgMjguNTU2OTMsLTEyLjM1NDI4YzExLjAwMDg0LC0wLjE3MjA2IDIxLjYwMTY0LDQuMTIyMSAyOS4zODEzNCwxMS45MDE3OXoiIG9wYWNpdHk9IjAuNSIvPjxwYXRoIGQ9IiIgb3BhY2l0eT0iMC41Ii8+PHBhdGggZD0iTTExMC4yODc1MSw0OTkuNDM2MWMzMC43ODQzMiwxMy40NzA3NSA1Ni40NzcxOSwyOS4zODY3IDc1LjU5NTU1LDQ4LjEzMjU5YzE5LjExODg2LDE4Ljc0NTg2IDMyLjM0Mzc3LDQxLjU1ODkzIDMyLjM0Mzc3LDY3LjA3OTQ4YzAuMTI0OTQsOC44MzQ0OSAtNC41MTY2MiwxNy4wNTE4NyAtMTIuMTQ3MzYsMjEuNTA1NTVjLTcuNjMwNzQsNC40NTM3MSAtMTcuMDY4MzgsNC40NTM3MSAtMjQuNjk5MTIsMGMtNy42MzA3NCwtNC40NTM3MSAtMTIuMjcyMzIsLTEyLjY3MTA5IC0xMi4xNDczNiwtMjEuNTA1NTVjMCwtOC4zMTYzIC00LjU5MTE5LC0xOS4yOTU5NCAtMTcuNzAyOTUsLTMyLjE1MjIxYy0xMy4xMTE3MywtMTIuODU2MjggLTM0LjAxMzk5LC0yNi40MzM3NCAtNjAuODU5NjgsLTM4LjE4MDc0Yy01My42OTA4OCwtMjMuNDk0IC0xMzAuNTczNTQsLTM5LjkwMzE5IC0yMTUuNDAwNDcsLTM5LjkwMzE5Yy04NC44MjY5NywwIC0xNjEuNzA5NTksMTYuNDA5MTkgLTIxNS40MDA0NywzOS45MDMxOWMtMjYuODQ1NjksMTEuNzQ3MDMgLTQ3Ljc0NzkyLDI1LjMyNDQ3IC02MC44NTk2OCwzOC4xODA3NGMtMTMuMTEyMiwxMi44NTYyOCAtMTcuNzAyOTUsMjMuODM1OTEgLTE3LjcwMjk1LDMyLjE1MjIxYzAuMTI0OTQsOC44MzQ0OSAtNC41MTY2MiwxNy4wNTE4NyAtMTIuMTQ3MzYsMjEuNTA1NTVjLTcuNjMwNzQsNC40NTM3MSAtMTcuMDY4MzgsNC40NTM3MSAtMjQuNjk5MTIsMGMtNy42MzA3NCwtNC40NTM3MSAtMTIuMjcyMjksLTEyLjY3MTA5IC0xMi4xNDczNiwtMjEuNTA1NTVjMCwtMjUuNTIwNTUgMTMuMjI0OTEsLTQ4LjMzMzYyIDMyLjM0Mzc3LC02Ny4wNzk0OGMxOS4xMTgzOSwtMTguNzQ1ODYgNDQuODExMjYsLTM0LjY2MTg0IDc1LjU5NTU1LC00OC4xMzI1OWM2MS41Njk1OSwtMjYuOTQxNjMgMTQzLjk2NjQ4LC00NC4wMTc5NCAyMzUuMDE3NjIsLTQ0LjAxNzk0YzkxLjA1MTE0LDAgMTczLjQ0ODA0LDE3LjA3NjMxIDIzNS4wMTc2Miw0NC4wMTc5NHoiIG9wYWNpdHk9IjAuNSIvPjxwYXRoIGQ9Ik0tMTAwLjIzMzE3LDExMi40NjEyMmM4LjEzOTEsMC4wMTA1OSAxNS43NDE2LDQuMDYyNTUgMjAuMjg4MzYsMTAuODEzMjVsMjgxLjcxNDYyLDQxNi40NDc3MmMwLjQxMSwwLjYyMDE1IDAuNzkzNTgsMS4yNTg3NCAxLjE0NjQ1LDEuOTEzNjljMTAuNTY3OTcsMTkuMjU2NTEgMTUuMzEwNTYsNDAuMTk4NzQgMTUuMzEwNTYsNjAuNzYzODRjMCw1OS42NDYyMyAtNDMuOTExNywxMDkuMzY5NDYgLTEwNi4xMjE2NiwxNDIuODY2ODRjLTYyLjIwOTQ1LDMzLjQ5NzM4IC0xNDUuMzMxOTQsNTMuMTA4NTQgLTIzNi44MzUyOCw1My4xMDg1NGMtOTEuNTAzMzUsMCAtMTc0LjYyNTg2LC0xOS42MTExNiAtMjM2LjgzNTI4LC01My4xMDg1NGMtNjIuMjA5OTIsLTMzLjQ5NzM4IC0xMDYuMTIxNjYsLTgzLjIyMDYxIC0xMDYuMTIxNjYsLTE0Mi44NjY4NGMwLC0yMC41ODMyIDQuODAwNDQsLTQxLjUyODg1IDE1LjIxNDUzLC02MC42Njc5N2MwLjM4MjIyLC0wLjY4OTU2IDAuNzk3NTQsLTEuMzYwMjIgMS4yNDQ0NSwtMi4wMDk3MmwyODEuNzE0NjIsLTQxNi40NDc3MmM0LjU0NjQxLC02Ljc1MDA3IDEyLjE0ODAyLC0xMC44MDE5IDIwLjI4NjM5LC0xMC44MTMwOXpNLTQwOS41MDY4OCw1NjUuMzY3MjZjLTYuMTYzNDIsMTEuNDM5OTUgLTkuMTg2MzUsMjQuMTYyNDggLTkuMTg2MzUsMzcuMDMyNDVjMCwzNS4wNTg4NiAyNy4zMjk3NSw3MS4xNDQ1NyA4MC4zODAzLDk5LjcxMDExYzUzLjA1MTA1LDI4LjU2NTU4IDEyOS4yMDgwNSw0Ny4yNzE0MSAyMTMuNTgyODIsNDcuMjcxNDFjODQuMzc0NzYsMCAxNjAuNTMxNzksLTE4LjcwNTg3IDIxMy41ODI4MiwtNDcuMjcxNDFjNTMuMDUwNTQsLTI4LjU2NTU4IDgwLjM4MDMsLTY0LjY1MTI1IDgwLjM4MDMsLTk5LjcxMDExYzAsLTEzLjE0ODA1IC0yLjg0NTA3LC0yNS4zMTcwOCAtOS4wOTA4MywtMzYuODQxMDZsLTI3My4zODkxLC00MDQuMTAzNThoLTIyLjk2NjM3eiIvPjxwYXRoIGQ9Ik03NTAuODQwODUsMzkyLjQyMzAyYzI1LjM3NTg0LDkuNzYwMiA0Ni42NjgzOCwyMS40NDAwNCA2Mi42NzIwMiwzNS45OTMyMmMxNi4wMDM2NCwxNC41NTMxOCAyNy4yMzE2MywzMy4yNTY4MyAyNy4yMzE2Myw1NC4zMDUyM2MwLjEwMzA0LDcuMjg3MjQgLTMuNzI1NTgsMTQuMDY1NDUgLTEwLjAxOTg5LDE3LjczOTE1Yy02LjI5NDMxLDMuNjczNyAtMTQuMDc5MDgsMy42NzM3IC0yMC4zNzM0MiwwYy02LjI5NDMxLC0zLjY3MzcgLTEwLjEyMjk2LC0xMC40NTE5MSAtMTAuMDE5OTIsLTE3LjczOTE1YzAsLTYuODUyMDYgLTMuNDY3ODUsLTE0Ljc2NzM3IC0xNC4wNTAwOCwtMjQuMzkwMTdjLTEwLjU4MTc5LC05LjYyMjM5IC0yNy44MDIyNywtMTkuNjU0NTggLTQ5Ljk2MzY1LC0yOC4xNzg1Yy00NC4zMjM1OSwtMTcuMDQ3OTEgLTEwOC4wMjYxNiwtMjguMjU3NzQgLTE3OC40NjU1NywtMjguMjU3NzRjLTcwLjQzOTQyLDAgLTEzNC4xNDE5NSwxMS4yMDk4MyAtMTc4LjQ2NTU0LDI4LjI1Nzc0Yy0yMi4xNjEzOCw4LjUyMzk2IC0zOS4zODE4NywxOC41NTYxMSAtNDkuOTYzNjksMjguMTc4NWMtMTAuNTgyNTgsOS42MjI4IC0xNC4wNTAwOCwxNy41MzgxMiAtMTQuMDUwMDgsMjQuMzkwMTdjMC4xMDMwNCw3LjI4NzI0IC0zLjcyNTYxLDE0LjA2NTQ1IC0xMC4wMTk5MiwxNy43MzkxNWMtNi4yOTQzMSwzLjY3MzcgLTE0LjA3OTExLDMuNjczNyAtMjAuMzczNDIsMGMtNi4yOTQzMSwtMy42NzM3IC0xMC4xMjI5NiwtMTAuNDUxOTEgLTEwLjAxOTkyLC0xNy43MzkxNWMwLC0yMS4wNDg0MyAxMS4yMjgwMiwtMzkuNzUyMDUgMjcuMjMxNjMsLTU0LjMwNTIzYzE2LjAwMzY0LC0xNC41NTMxOCAzNy4yOTYxOCwtMjYuMjMzMDMgNjIuNjcyMDIsLTM1Ljk5MzIyYzUwLjc1MTc1LC0xOS41MTk5OCAxMTguMzQ4ODgsLTMwLjk0MTE3IDE5Mi45ODg4NywtMzAuOTQxMTdjNzQuNjM5OTksMCAxNDIuMjM3MTIsMTEuNDIxMTYgMTkyLjk4ODg3LDMwLjk0MTE3eiIgb3BhY2l0eT0iMC41Ii8+PHBhdGggZD0iTTU2MC4zNzIyMiwxOTkuOTc2OTRjMTU0LjAwMjYzLDEuMzY5MTkgMjc4Ljg4MzEyLDEyNi4yNzQ3MiAyODAuMjA4NjQsMjgwLjI4NzQ2YzAuMDI4MzMsMC4xMzQ0NCAwLjA1NTI3LDAuMjY5MTcgMC4wODA4NSwwLjQwNDEyYzAsMC42OTEwOCAwLjA4MDgyLDEuMzYxOSAwLjA4MDgyLDIuMDUyOThjMCwxNTUuMTczODEgLTEyNS41ODE2NCwyODEuNDAwNDQgLTI4MC40MzUzNywyODIuNzMwODRjLTAuMTM0NDQsMC4wMjgzMyAtMC4yNjkxNCwwLjA1NTI3IC0wLjQwNDEyLDAuMDgwODVjLTAuNjkxMDgsMCAtMS4zNjE5NCwwLjA4MDg1IC0yLjA1MzAxLDAuMDgwODVjLTE1NS45OTk4NywwLjAwMDQxIC0yODIuODkyNDgsLTEyNi44OTI2OCAtMjgyLjg5MjQ4LC0yODIuODkyNTFjLTAuMDAzNDksLTAuODcwNzIgMC4wNDkyOCwtMS43NDA3MSAwLjE1Nzk5LC0yLjYwNDYxYzEuNDE5MywtMTU0Ljc5MTExIDEyNy42MTQwMiwtMjgwLjI4ODI4IDI4Mi43MzQ0OSwtMjgwLjI4Nzg3YzAuODQyOTksLTAuMDAzMzYgMS42ODUzNywwLjA0NjA1IDIuNTIyMjEsMC4xNDc5MXpNNTMzLjQ1OTg4LDI1NC4yOTIyOGMtOS42MjIzOSwxMC41ODE4MiAtMTkuNjU0NTgsMjcuODAyMjcgLTI4LjE3ODU0LDQ5Ljk2MzY5Yy0xNy4wNDc5MSw0NC4zMjM1OSAtMjguMjU3NzQsMTA4LjAyNjEzIC0yOC4yNTc3NCwxNzguNDY1NTRjMCwyNi42NDgwNSAyLjA1NTAxLDUxLjgxODI0IDQuOTcyODUsNzUuODUzNmMyNC4wMzUzNiwyLjkxNTg0IDQ5LjIwNTUxLDQuOTcyODUgNzUuODUzNTcsNC45NzI4NWM3MC40Mzk0MiwwIDEzNC4xNDE5OCwtMTEuMjA5ODMgMTc4LjQ2NTU3LC0yOC4yNTc3NGMyMi4xNjEzOCwtOC41MjM5NiAzOS4zODE4NywtMTguNTU2MTEgNDkuOTYzNjksLTI4LjE3ODVjMTAuNTgyNjEsLTkuNjIyOCAxNC4wNTAwNSwtMTcuNTM4MTUgMTQuMDUwMDUsLTI0LjM5MDJjMCwtMTM0LjE1ODk0IC0xMDguMzIwMzcsLTI0Mi40NzkyNyAtMjQyLjQ3OTMxLC0yNDIuNDc5MjdjLTYuODUyMDYsMCAtMTQuNzY3MzcsMy40Njc4NSAtMjQuMzkwMTcsMTQuMDUwMDV6TTMxNS4zNzA3Nyw0ODIuNzIxNTFjMCw2Ljg1MjA2IDMuNDY3ODUsMTQuNzY3NCAxNC4wNDgwNSwyNC4zOTAyYzEwLjU4MTgyLDkuNjIyMzkgMjcuODAyMjcsMTkuNjU0NTggNDkuOTYzNjksMjguMTc4NWMxNy4zODgxNyw2LjY4ODAxIDM4LjQyNDg4LDEyLjA4Nzk5IDYxLjAxNDY3LDE2LjY1NDY5Yy0yLjI1NTA2LC0yMi4yNTE1MiAtMy43ODY3MiwtNDUuMTgzMTkgLTMuNzg2NzIsLTY5LjIyMzRjMCwtNzQuNjM5OTkgMTEuNDIxMTksLTE0Mi4yMzcxMiAzMC45NDEyLC0xOTIuOTg4ODRjNS41NzU4MiwtMTQuNDk2MjMgMTIuMDE2NDYsLTI3LjIyODQzIDE5LjAyMjksLTM4LjgzNDY4Yy05OS4yNTQ0NSwzMC4zNTg4IC0xNzEuMjAzNzIsMTIyLjQ3ODcxIC0xNzEuMjAzNzIsMjMxLjgyMzU1ek00ODYuNTc0NDYsNzE0LjU0NTA1Yy03LjAwNjQ0LC0xMS42MDYyNSAtMTMuNDQ3MDgsLTI0LjMzODQ1IC0xOS4wMjI5LC0zOC44MzQ2OGMtOS4wOTYyMSwtMjMuNjUxNDMgLTE2LjIyNjczLC01MS4yNDUxOCAtMjEuNDY5MTMsLTgxLjIyMTI4Yy0yOS45NzY1MSwtNS4yNDIwMiAtNTcuNTY5ODMsLTEyLjM3MjU0IC04MS4yMjEyNSwtMjEuNDY5MWMtMTQuNDk2MjMsLTUuNTc1ODIgLTI3LjIyODQzLC0xMi4wMTY0NiAtMzguODM0NjgsLTE5LjAyMjkzYzIzLjQ2OTU3LDc2LjczMDE1IDgzLjgxODIyLDEzNy4wNzg0MiAxNjAuNTQ3OTYsMTYwLjU0Nzk5ek03ODkuNjczNTksNTUzLjk5NTA3Yy0xMS42MDYyOCw3LjAwNjQ0IC0yNC4zMzg0NSwxMy40NDcwOCAtMzguODM0NjgsMTkuMDIyOWMtNTAuNzUxNzUsMTkuNTE5NTcgLTExOC4zNDg4OCwzMC45NDExNyAtMTkyLjk4ODg3LDMwLjk0MTE3Yy0yNC4wNDAyMSwwIC00Ni45NzE4OCwtMS41Mjc2IC02OS4yMjMzNiwtMy43ODY3MmM0LjU2NjcsMjIuNTg5NzUgOS45NjY3MSw0My42MjY0OSAxNi42NTQ2OSw2MS4wMTQ2N2M4LjUyMzk2LDIyLjE2MTM4IDE4LjU1NjE0LDM5LjM4MTg3IDI4LjE3ODU0LDQ5Ljk2MzY5YzkuNjIyOCwxMC41ODI2MSAxNy41MzgxMiwxNC4wNTAwNSAyNC4zOTAxNywxNC4wNTAwNWMxMDkuMzQ0NDIsMCAyMDEuNDY0MzMsLTcxLjk0OTI3IDIzMS44MjM1NSwtMTcxLjIwMzcyeiIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjcwNy42ODk1MTY5NjIzNDM0OjU5NS40MDIzMjIzNjY5Njg1LS0+";
      // Raycast icon by me in Turbowarp SVG editor
      const raycastIcon =
        "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzNjAiIGhlaWdodD0iMzYwIiB2aWV3Qm94PSIwLDAsMzYwLDM2MCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTYwLDApIj48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNMTM4LjA3NjUxLDMwOS4yMjQxOGwtMjcuMzAwNjksLTI3LjMwMDY5bDI0Ni4yNjkzMywtMjQ2LjI2OTMzbDI3LjMwMDY5LDI3LjMwMDY5eiIgZmlsbC1vcGFjaXR5PSIwLjUwMTk2IiBmaWxsPSIjZmZmZmZmIi8+PHBhdGggZD0iTTM1Ny4wNDUxNiw2Mi45NTQ4NGMtNy41Mzg4NywtNy41Mzg4NyAtNy41Mzg4NywtMTkuNzYxODIgMCwtMjcuMzAwNjljNy41Mzg4NywtNy41Mzg4NyAxOS43NjE4MSwtNy41Mzg4NyAyNy4zMDA2OCwwLjAwMDAxYzcuNTM4ODcsNy41Mzg4NyA3LjUzODg4LDE5Ljc2MTgxIDAuMDAwMDEsMjcuMzAwNjhjLTcuNTM4ODcsNy41Mzg4NyAtMTkuNzYxODIsNy41Mzg4NyAtMjcuMzAwNjksMHoiIGZpbGw9IiNmZmZmZmYiLz48cGF0aCBkPSJNMTAwLjA4MzE5LDMxOS45MTY4MWMtMTMuNDQ0MjUsLTEzLjQ0NDI1IC0xMy40NDQyNSwtMzUuMjQxNyAwLC00OC42ODU5NWMxMy40NDQyNSwtMTMuNDQ0MjUgMzUuMjQxNjksLTEzLjQ0NDI0IDQ4LjY4NTk0LDAuMDAwMDFjMTMuNDQ0MjUsMTMuNDQ0MjUgMTMuNDQ0MjYsMzUuMjQxNjkgMC4wMDAwMSw0OC42ODU5NGMtMTMuNDQ0MjUsMTMuNDQ0MjUgLTM1LjI0MTcsMTMuNDQ0MjUgLTQ4LjY4NTk1LDB6IiBmaWxsPSIjZmZmZmZmIi8+PHBhdGggZD0iTTI0MCw2OC42MDl2LTM4LjYwOWgxMzAuNjk1NXYzOC42MDl6IiBmaWxsPSIjZmZmZmZmIi8+PHBhdGggZD0iTTM1MS4zOTEsNDkuMzA0NWgzOC42MDl2MTMwLjY5NTVoLTM4LjYwOXoiIGZpbGw9IiNmZmZmZmYiLz48cGF0aCBkPSJNMjI2LjM0OTY2LDYyLjk1NDg0Yy03LjUzODg3LC03LjUzODg3IC03LjUzODg3LC0xOS43NjE4MiAwLC0yNy4zMDA2OWM3LjUzODg3LC03LjUzODg3IDE5Ljc2MTgxLC03LjUzODg3IDI3LjMwMDY4LDAuMDAwMDFjNy41Mzg4Nyw3LjUzODg3IDcuNTM4ODgsMTkuNzYxODEgMC4wMDAwMSwyNy4zMDA2OGMtNy41Mzg4Nyw3LjUzODg3IC0xOS43NjE4Miw3LjUzODg3IC0yNy4zMDA2OSwweiIgZmlsbD0iI2ZmZmZmZiIvPjxwYXRoIGQ9Ik0zNTcuMDQ1MTYsMTkzLjY1MDM0Yy03LjUzODg3LC03LjUzODg3IC03LjUzODg3LC0xOS43NjE4MiAwLC0yNy4zMDA2OWM3LjUzODg3LC03LjUzODg3IDE5Ljc2MTgxLC03LjUzODg3IDI3LjMwMDY4LDAuMDAwMDFjNy41Mzg4Nyw3LjUzODg3IDcuNTM4ODgsMTkuNzYxODEgMC4wMDAwMSwyNy4zMDA2OGMtNy41Mzg4Nyw3LjUzODg3IC0xOS43NjE4Miw3LjUzODg3IC0yNy4zMDA2OSwweiIgZmlsbD0iI2ZmZmZmZiIvPjxwYXRoIGQ9Ik02MCwzNjB2LTM2MGgzNjB2MzYweiIgZmlsbD0ibm9uZSIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjE4MDoxODAtLT4=";

      class AmmoPhysics {
        getInfo() {
          return {
            id: "masterMathAmmoPhysics",
            name: Scratch.translate("Ammo Physics"),
            docsURI: "https://extensions.turbowarp.org/MasterMath/AmmoPhysics",
            blocks: [
              {
                blockType: "label",
                text: Scratch.translate("Simulation Control"),
              },
              {
                opcode: "reset",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate("reset world"),
              },
              {
                opcode: "step",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate("step simulation"),
              },
              {
                opcode: "stepWith",
                type: Scratch.BlockType.COMMAND,
                text: Scratch.translate(
                  "step simulation with delta time: [dt] max substeps: [maxSubsteps] fixed time step: [fixedTimeStep]"
                ),
                arguments: {
                  dt: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0.016,
                  },
                  maxSubsteps: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 10,
                  },
                  fixedTimeStep: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0.016,
                  },
                },
              },
              {
                opcode: "setMaxSubSteps",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate("set max substeps to [value]"),
                arguments: {
                  value: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 10,
                  },
                },
              },
              {
                opcode: "setGravity",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate("set gravity to x: [x] y: [y] z: [z]"),
                arguments: {
                  x: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  y: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: -9.81,
                  },
                  z: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                },
              },
              {
                opcode: "getGravity",
                blockType: Scratch.BlockType.REPORTER,
                text: Scratch.translate("gravity [xyz]"),
                arguments: {
                  xyz: {
                    type: Scratch.ArgumentType.STRING,
                    menu: "xyzMenu",
                  },
                },
              },
              {
                opcode: "getMaxSubSteps",
                blockType: Scratch.BlockType.REPORTER,
                text: Scratch.translate("max substeps"),
              },
              "---",
              {
                blockType: "label",
                text: Scratch.translate("Bodies"),
              },
              {
                opcode: "allBodies",
                blockType: Scratch.BlockType.REPORTER,
                text: Scratch.translate("all bodies"),
              },
              {
                opcode: "createBoxBody",
                blockType: Scratch.BlockType.COMMAND,
                // TODO: FIX THE MESS PRETTIER CREATED
                text: Scratch.translate(
                  "create box body with name: [name] mass: [mass] size: [x] [y] [z]"
                ),
                blockIconURI: cubeIcon,
                arguments: {
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                  mass: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 5,
                  },
                  x: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 1,
                  },
                  y: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 1,
                  },
                  z: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 1,
                  },
                },
              },
              {
                opcode: "createSphereBody",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate(
                  "create sphere body with name: [name] mass: [mass] radius: [radius]"
                ),
                blockIconURI: sphereIcon,
                arguments: {
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                  mass: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 5,
                  },
                  radius: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0.5,
                  },
                },
              },
              {
                opcode: "createCylinderBody",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate(
                  "create cylinder body with name: [name] mass: [mass] radius: [radius] height: [height]"
                ),
                blockIconURI: cylinderIcon,
                arguments: {
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                  mass: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 5,
                  },
                  radius: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0.5,
                  },
                  height: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 1,
                  },
                },
              },
              {
                opcode: "createConeBody",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate(
                  "create cone body with name: [name] mass: [mass] radius: [radius] height: [height]"
                ),
                blockIconURI: coneIcon,
                arguments: {
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                  mass: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 5,
                  },
                  radius: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0.5,
                  },
                  height: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 1,
                  },
                },
              },
              {
                opcode: "createCapsuleBody",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate(
                  "create capsule body with name: [name] mass: [mass] radius: [radius] height: [height]"
                ),
                blockIconURI: capsuleIcon,
                arguments: {
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                  mass: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 5,
                  },
                  radius: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0.5,
                  },
                  height: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 1,
                  },
                },
              },
              {
                opcode: "createHullBody",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate(
                  "create convex hull body with name: [name] mass: [mass] from vertices: [vertices]"
                ),
                blockIconURI: meshIcon,
                arguments: {
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                  mass: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 5,
                  },
                  vertices: {
                    type: Scratch.ArgumentType.STRING,
                    menu: "lists",
                  },
                },
              },
              {
                opcode: "createMeshBody",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate(
                  "create [type] mesh body with name: [name] mass: [mass] from vertices: [vertices] faces: [faces]"
                ),
                blockIconURI: meshIcon,
                arguments: {
                  type: {
                    type: Scratch.ArgumentType.STRING,
                    menu: "meshMenu",
                  },
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                  mass: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 5,
                  },
                  vertices: {
                    type: Scratch.ArgumentType.STRING,
                    menu: "lists",
                  },
                  faces: {
                    type: Scratch.ArgumentType.STRING,
                    menu: "lists",
                  },
                },
              },
              {
                opcode: "createOBJBody",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate(
                  "create [type] mesh body with name: [name] mass: [mass] from OBJ: [obj]"
                ),
                blockIconURI: meshIcon,
                arguments: {
                  type: {
                    type: Scratch.ArgumentType.STRING,
                    menu: "objMeshMenu",
                  },
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                  mass: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 5,
                  },
                  obj: {
                    type: Scratch.ArgumentType.STRING,
                    menu: "lists",
                  },
                },
              },
              "---",
              {
                opcode: "createCompoundShape",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate(
                  "create compound shape with name: [name]"
                ),
                blockIconURI: compoundIcon,
                arguments: {
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "shape",
                  },
                },
              },
              {
                opcode: "compBodyAddBox",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate(
                  "[IMAGE] add box shape with size: [x] [y] [z] to compound shape [name] at x: [x1] y: [y1] z: [z1] with rotation x: [x2] y: [y2] z: [z2]"
                ),
                blockIconURI: compoundIcon,
                arguments: {
                  IMAGE: {
                    type: Scratch.ArgumentType.IMAGE,
                    dataURI: cubeIcon,
                  },
                  x: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 1,
                  },
                  y: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 1,
                  },
                  z: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 1,
                  },
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                  x1: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  y1: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  z1: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  x2: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  y2: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  z2: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                },
              },
              {
                opcode: "compBodyAddSphere",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate(
                  "[IMAGE] add sphere shape with radius: [radius] to compound shape [name] at x: [x1] y: [y1] z: [z1] with rotation x: [x2] y: [y2] z: [z2]"
                ),
                blockIconURI: compoundIcon,
                arguments: {
                  IMAGE: {
                    type: Scratch.ArgumentType.IMAGE,
                    dataURI: sphereIcon,
                  },
                  radius: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0.5,
                  },
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                  x1: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  y1: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  z1: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  x2: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  y2: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  z2: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                },
              },
              {
                opcode: "compBodyAddCylinder",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate(
                  "[IMAGE] add cylinder shape with radius: [radius] and height: [height] to compound shape [name] at x: [x1] y: [y1] z: [z1] with rotation x: [x2] y: [y2] z: [z2]"
                ),
                blockIconURI: compoundIcon,
                arguments: {
                  IMAGE: {
                    type: Scratch.ArgumentType.IMAGE,
                    dataURI: cylinderIcon,
                  },
                  radius: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0.5,
                  },
                  height: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 1,
                  },
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                  x1: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  y1: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  z1: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  x2: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  y2: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  z2: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                },
              },
              {
                opcode: "compBodyAddCone",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate(
                  "[IMAGE] add cone shape with radius: [radius] and height: [height] to compound shape [name] at x: [x1] y: [y1] z: [z1] with rotation x: [x2] y: [y2] z: [z2]"
                ),
                blockIconURI: compoundIcon,
                arguments: {
                  IMAGE: {
                    type: Scratch.ArgumentType.IMAGE,
                    dataURI: coneIcon,
                  },
                  radius: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0.5,
                  },
                  height: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 1,
                  },
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                  x1: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  y1: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  z1: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  x2: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  y2: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  z2: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                },
              },
              {
                opcode: "compBodyAddCapsule",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate(
                  "[IMAGE] add capsule shape with radius: [radius] and height: [height] to compound shape [name] at x: [x1] y: [y1] z: [z1] with rotation x: [x2] y: [y2] z: [z2]"
                ),
                blockIconURI: compoundIcon,
                arguments: {
                  IMAGE: {
                    type: Scratch.ArgumentType.IMAGE,
                    dataURI: capsuleIcon,
                  },
                  radius: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0.5,
                  },
                  height: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 1,
                  },
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                  x1: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  y1: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  z1: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  x2: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  y2: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  z2: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                },
              },
              // TODO: compound body meshes here?
              {
                opcode: "createCompoundBody",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate(
                  "create rigid body from compound shape [name] with mass [mass]"
                ),
                blockIconURI: compoundIcon,
                arguments: {
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "compound shape",
                  },
                  mass: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: "5",
                  },
                },
              },
              {
                opcode: "setPhysicalMaterial",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate(
                  "set [property] of body [name] to [value]"
                ),
                arguments: {
                  property: {
                    type: Scratch.ArgumentType.STRING,
                    menu: "materialProperties",
                  },
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                  value: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0.5,
                  },
                },
              },
              {
                opcode: "setBodyGravity",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate(
                  "set gravity of [body] to x: [x] y: [y] z: [z]"
                ),
                arguments: {
                  body: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                  x: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  y: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  z: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                },
              },
              {
                opcode: "bodyActive",
                blockType: Scratch.BlockType.BOOLEAN,
                text: Scratch.translate("is body [name] active?"),
                arguments: {
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                },
              },
              {
                opcode: "anyBodyActive",
                blockType: Scratch.BlockType.BOOLEAN,
                text: Scratch.translate("is any body active?"),
              },
              {
                opcode: "deleteBody",
                text: Scratch.translate("delete body [name]"),
                arguments: {
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                },
              },
              "---",
              {
                blockType: "label",
                text: Scratch.translate("Transformations"),
              },
              {
                opcode: "setBodyTransformation",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate(
                  "set [transform] of body [name] to x: [x] y: [y] z: [z]"
                ),
                arguments: {
                  transform: {
                    type: Scratch.ArgumentType.STRING,
                    menu: "transform",
                  },
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                  x: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  y: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  z: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                },
              },
              {
                opcode: "changeBodyTransformation",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate(
                  "change [transform] of body [name] by x: [x] y: [y] z: [z]"
                ),
                arguments: {
                  transform: {
                    type: Scratch.ArgumentType.STRING,
                    menu: "transform",
                  },
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                  x: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  y: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  z: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                },
              },
              {
                opcode: "bodyTransformation",
                blockType: Scratch.BlockType.REPORTER,
                text: Scratch.translate("[xyz] [transform] of body [name]"),
                arguments: {
                  xyz: {
                    type: Scratch.ArgumentType.STRING,
                    menu: "xyz",
                  },
                  transform: {
                    type: Scratch.ArgumentType.STRING,
                    menu: "transform",
                  },
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                },
              },
              "---",
              {
                blockType: "label",
                text: Scratch.translate("Collisions"),
              },
              {
                opcode: "toggleCollisionResponse",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate(
                  "[toggle] collision response for body [name]"
                ),
                arguments: {
                  toggle: {
                    type: Scratch.ArgumentType.STRING,
                    menu: "toggleMenu",
                  },
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                },
              },
              {
                opcode: "bodyTouchingBody",
                blockType: Scratch.BlockType.BOOLEAN,
                text: Scratch.translate(
                  "is body [body] touching body [body2]?"
                ),
                arguments: {
                  body: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                  body2: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: Scratch.translate("body 2"),
                  },
                },
              },
              {
                opcode: "bodyTouchingAny",
                blockType: Scratch.BlockType.BOOLEAN,
                text: Scratch.translate("is body [body] touching any body?"),
                arguments: {
                  body: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                },
              },
              {
                opcode: "allBodiesTouchingBody",
                blockType: Scratch.BlockType.REPORTER,
                text: Scratch.translate("get all bodies touching body [body]"),
                arguments: {
                  body: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                },
              },
              "---",
              {
                blockType: "label",
                text: Scratch.translate("Raycasting"),
              },
              {
                opcode: "rayCast",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate(
                  "cast ray with name [name] from x: [x] y: [y] z: [z] to x: [x2] y: [y2] z: [z2]"
                ),
                blockIconURI: raycastIcon,
                arguments: {
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "ray",
                  },
                  x: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  y: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  z: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  x2: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 7,
                  },
                  y2: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 15,
                  },
                  z2: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 12,
                  },
                },
              },
              {
                opcode: "rayCastDirection",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate(
                  "cast ray with name [name] from x: [x] y: [y] z: [z] with rotation x: [rotX] y: [rotY] z: [rotZ] distance: [distance]"
                ),
                blockIconURI: raycastIcon,
                arguments: {
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "ray",
                  },
                  x: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  y: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  z: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  rotX: {
                    type: Scratch.ArgumentType.ANGLE,
                    defaultValue: 7,
                  },
                  rotY: {
                    type: Scratch.ArgumentType.ANGLE,
                    defaultValue: 15,
                  },
                  rotZ: {
                    type: Scratch.ArgumentType.ANGLE,
                    defaultValue: 12,
                  },
                  distance: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 5,
                  },
                },
              },
              {
                opcode: "rayCastTowards",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate(
                  "cast ray with name [name] from x: [x] y: [y] z: [z] towards coordinate x: [x2] y: [y2] z: [z2] distance: [distance]"
                ),
                blockIconURI: raycastIcon,
                arguments: {
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "ray",
                  },
                  x: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  y: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  z: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  x2: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 7,
                  },
                  y2: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 15,
                  },
                  z2: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 12,
                  },
                  distance: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 5,
                  },
                },
              },
              {
                opcode: "getRay",
                blockType: Scratch.BlockType.REPORTER,
                text: Scratch.translate("hit [xyz] [property] of ray [name]"),
                blockIconURI: raycastIcon,
                arguments: {
                  index: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 1,
                  },
                  xyz: {
                    type: Scratch.ArgumentType.STRING,
                    menu: "xyz",
                  },
                  property: {
                    type: Scratch.ArgumentType.STRING,
                    menu: "rayMenu",
                  },
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "ray",
                  },
                },
              },
              {
                opcode: "getRayTouching",
                blockType: Scratch.BlockType.BOOLEAN,
                text: Scratch.translate("ray [name] is touching body [body]?"),
                blockIconURI: raycastIcon,
                arguments: {
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "ray",
                  },
                  body: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                },
              },
              {
                opcode: "deleteRay",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate("delete ray [name]"),
                blockIconURI: raycastIcon,
                arguments: {
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "ray",
                  },
                },
              },
              "---",
              {
                blockType: "label",
                text: Scratch.translate("Forces"),
              },
              {
                opcode: "pushForce",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate(
                  "push body [name] with [force] x: [x] y: [y] z: [z] newtons with offset x: [x2] y: [y2] z: [z2] meters"
                ),
                arguments: {
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                  force: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "force",
                    menu: "forceMenu",
                  },
                  x: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 1,
                  },
                  y: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 1,
                  },
                  z: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 1,
                  },
                  x2: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                  y2: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0.25,
                  },
                  z2: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
                },
              },
              {
                opcode: "pushCentralForce",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate(
                  "push body [name] with central [force] force x: [x] y: [y] z: [z] newtons"
                ),
                arguments: {
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                  force: {
                    type: Scratch.ArgumentType.STRING,
                    menu: "centralForceMenu",
                  },
                  x: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 1,
                  },
                  y: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 1,
                  },
                  z: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 1,
                  },
                },
              },
              {
                opcode: "pushTorque",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate(
                  "push body [name] with [torque] x: [x] y: [y] z: [z]"
                ),
                arguments: {
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                  torque: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "applyTorque",
                    menu: "torqueMenu",
                  },
                  x: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 1,
                  },
                  y: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 1,
                  },
                  z: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 1,
                  },
                },
              },
              {
                opcode: "clearForces",
                blockType: Scratch.BlockType.COMMAND,
                text: Scratch.translate("stop pushing [name]"),
                arguments: {
                  name: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "body",
                  },
                },
              },
            ],
            menus: {
              xyzMenu: {
                items: [
                  {
                    text: Scratch.translate("x"),
                    value: "x",
                  },
                  {
                    text: Scratch.translate("y"),
                    value: "y",
                  },
                  {
                    text: Scratch.translate("z"),
                    value: "z",
                  },
                ],
              },
              meshMenu: {
                items: [
                  {
                    text: Scratch.translate("static"),
                    value: "btBvhTriangleMeshShape",
                  },
                  {
                    text: Scratch.translate("dynamic"),
                    value: "btGImpactMeshShape",
                  },
                ],
              },
              objMeshMenu: {
                items: [
                  {
                    text: Scratch.translate("convex hull"),
                    value: "btConvexHullShape",
                  },
                  {
                    text: Scratch.translate("static"),
                    value: "btBvhTriangleMeshShape",
                  },
                  {
                    text: Scratch.translate("dynamic"),
                    value: "btGImpactMeshShape",
                  },
                ],
              },
              materialProperties: {
                items: [
                  {
                    text: Scratch.translate("friction"),
                    value: "setFriction",
                  },
                  {
                    text: Scratch.translate("bounciness"),
                    value: "setRestitution",
                  },
                ],
              },
              transform: {
                items: [
                  {
                    text: Scratch.translate("position"),
                    value: "position",
                  },
                  {
                    text: Scratch.translate("rotation"),
                    value: "rotation",
                  },
                ],
              },
              xyz: {
                items: [
                  {
                    text: Scratch.translate("x"),
                    value: "x",
                  },
                  {
                    text: Scratch.translate("y"),
                    value: "y",
                  },
                  {
                    text: Scratch.translate("z"),
                    value: "z",
                  },
                ],
              },
              rayMenu: {
                items: [
                  {
                    text: Scratch.translate("position"),
                    value: "position",
                  },
                  {
                    text: Scratch.translate("normal"),
                    value: "normal",
                  },
                ],
              },
              toggleMenu: {
                items: [
                  {
                    text: Scratch.translate("enable"),
                    value: "enable",
                  },
                  {
                    text: Scratch.translate("disable"),
                    value: "disable",
                  },
                ],
              },
              forceMenu: {
                acceptReporters: false,
                items: [
                  {
                    text: Scratch.translate("force"),
                    value: "applyForce",
                  },
                  {
                    text: Scratch.translate("impulse"),
                    value: "applyImpulse",
                  },
                ],
              },
              centralForceMenu: {
                acceptReporters: false,
                items: [
                  {
                    text: Scratch.translate("force"),
                    value: "applyCentralForce",
                  },
                  {
                    text: Scratch.translate("impulse"),
                    value: "applyCentralImpulse",
                  },
                ],
              },
              torqueMenu: {
                acceptReporters: false,
                items: [
                  {
                    text: Scratch.translate("torque"),
                    value: "applyTorque",
                  },
                  {
                    text: Scratch.translate("torque impulse"),
                    value: "applyTorqueImpulse",
                  },
                ],
              },
              lists: {
                acceptReporters: false,
                items: "listsMenu",
              },
            },
          };
        }

        //* From Simple3D extension
        listsMenu() {
          const stage = vm.runtime.getTargetForStage();
          const editingTarget =
            vm.editingTarget !== stage ? vm.editingTarget : null;
          const local = editingTarget
            ? Object.values(editingTarget.variables)
                .filter((v) => v.type == "list")
                .map((v) => v.name)
            : [];
          const global = stage
            ? Object.values(stage.variables)
                .filter((v) => v.type == "list")
                .map((v) => v.name)
            : [];
          const all = [...local, ...global];
          all.sort();
          if (all.length == 0) return ["select a list"];
          return all;
        }
        //* -----------------------

        reset() {
          world.setGravity(new Ammo.btVector3(0, -9.81, 0));
          for (const key in bodies) {
            if (Object.prototype.hasOwnProperty.call(bodies, key)) {
              const body = bodies[key];
              if (body) {
                world.removeRigidBody(body);

                Ammo.destroy(body.getMotionState());
                Ammo.destroy(body.getCollisionShape());
                Ammo.destroy(body);

                delete bodies[key];
              }
            }
          }
          bodies = {};

          for (const key in rays) {
            if (Object.prototype.hasOwnProperty.call(rays, key)) {
              const ray = rays[key];
              if (ray) {
                Ammo.destroy(ray);
                delete rays[key];
              }
            }
          }
          rays = {};
        }

        step() {
          for (const key in bodies) {
            bodies[key].collisions = [];
          }

          if (runtime.frameLoop.framerate === 0) {
            world.stepSimulation(deltaTime, maxSubSteps);
          } else {
            world.stepSimulation(
              deltaTime,
              maxSubSteps,
              1 / runtime.frameLoop.framerate
            );
          }

          const dispatcher = world.getDispatcher();
          const numManifolds = dispatcher.getNumManifolds();

          for (let i = 0; i < numManifolds; i++) {
            const contactManifold = dispatcher.getManifoldByIndexInternal(i);
            const body0 = Ammo.castObject(
              contactManifold.getBody0(),
              Ammo.btRigidBody
            );
            const body1 = Ammo.castObject(
              contactManifold.getBody1(),
              Ammo.btRigidBody
            );

            if (contactManifold.getNumContacts() > 0) {
              const name0 = body0.userData;
              const name1 = body1.userData;
              if (bodies[name0] && bodies[name1]) {
                bodies[name0].collisions.push(name1);
                bodies[name1].collisions.push(name0);
              }
            }
          }
        }

        stepWith({ dt, maxSubSteps, fixedTimeStep }) {
          for (const key in bodies) {
            bodies[key].collisions = [];
          }

          if (!dt === 0 && !fixedTimeStep === 0) {
            world.stepSimulation(dt, maxSubSteps, fixedTimeStep);
          } else {
            if (!runtime.frameLoop.framerate === 0) {
              world.stepSimulation(
                deltaTime,
                maxSubSteps,
                1 / runtime.frameLoop.framerate
              );
            } else {
              world.stepSimulation(deltaTime, maxSubSteps);
            }
          }

          const dispatcher = world.getDispatcher();
          const numManifolds = dispatcher.getNumManifolds();

          for (let i = 0; i < numManifolds; i++) {
            const contactManifold = dispatcher.getManifoldByIndexInternal(i);
            const body0 = Ammo.castObject(
              contactManifold.getBody0(),
              Ammo.btRigidBody
            );
            const body1 = Ammo.castObject(
              contactManifold.getBody1(),
              Ammo.btRigidBody
            );

            if (contactManifold.getNumContacts() > 0) {
              const name0 = body0.userData;
              const name1 = body1.userData;
              if (bodies[name0] && bodies[name1]) {
                bodies[name0].collisions.push(name1);
                bodies[name1].collisions.push(name0);
              }
            }
          }
        }

        setMaxSubSteps({ value }) {
          maxSubSteps = Cast.toNumber(value);
        }

        setGravity({ x, y, z }) {
          world.setGravity(new Ammo.btVector3(x, y, z));
        }

        getGravity({ xyz }) {
          return world.getGravity()[xyz]();
        }

        getMaxSubSteps() {
          return maxSubSteps;
        }

        allBodies() {
          return Cast.toString(Object.keys(bodies));
        }

        createBoxBody({ name, mass, x, y, z }) {
          createShapeBody(
            new Ammo.btBoxShape(new Ammo.btVector3(x / 2, y / 2, z / 2)),
            mass,
            name
          );
        }

        createSphereBody({ name, mass, radius }) {
          createShapeBody(new Ammo.btSphereShape(radius), mass, name);
        }

        createCylinderBody({ name, mass, radius, height }) {
          createShapeBody(
            new Ammo.btCylinderShape(
              new Ammo.btVector3(radius, height / 2, radius)
            ),
            mass,
            name
          );
        }

        createConeBody({ name, mass, radius, height }) {
          createShapeBody(new Ammo.btConeShape(radius, height), mass, name);
        }

        createCapsuleBody({ name, mass, radius, height }) {
          createShapeBody(
            new Ammo.btCapsuleShape(radius, height + 2 * radius),
            mass,
            name
          );
        }

        createHullBody({ name, mass, vertices }, { target }) {
          name = Cast.toString(name);
          mass = Cast.toNumber(mass);
          if (bodies[name]) {
            const body = bodies[name];
            if (body) {
              world.removeRigidBody(body);
              world.removeCollisionObject(body);
              Ammo.destroy(body.getMotionState());
              Ammo.destroy(body.getCollisionShape());
              Ammo.destroy(body);
              delete bodies[name];
            }
          }

          let list;
          if (target.lookupVariableByNameAndType(vertices, "list")) {
            list = processVertices(
              target.lookupVariableByNameAndType(vertices, "list").value
            );
          } else {
            console.warn(
              `Attempted to create convex hull body from nonexistent list "${vertices}"`
            );
            return;
          }

          if (list) {
            const shape = new Ammo.btConvexHullShape();
            list.forEach((i) => shape.addPoint(i, true));

            const localInertia = new Ammo.btVector3(0, 0, 0);
            if (mass > 0) shape.calculateLocalInertia(mass, localInertia);

            const transform = new Ammo.btTransform();
            transform.setIdentity();
            transform.setOrigin(new Ammo.btVector3(0, 0, 0));

            const motionState = new Ammo.btDefaultMotionState(transform);
            const rbInfo = new Ammo.btRigidBodyConstructionInfo(
              mass,
              motionState,
              shape,
              localInertia
            );
            const body = new Ammo.btRigidBody(rbInfo);
            body.userData = name;
            world.addRigidBody(body);
            bodies[name] = body;
            bodies[name].collisions = [];
          } else {
            console.warn(
              `Attempted to create convex hull body from invalid vertex list ${vertices}`
            );
          }
        }

        createMeshBody({ type, name, mass, vertices, faces }, { target }) {
          type = Cast.toString(type);
          name = Cast.toString(name);
          mass = Cast.toNumber(mass);

          if (bodies[name]) {
            const body = bodies[name];
            if (body) {
              world.removeRigidBody(body);
              world.removeCollisionObject(body);
              Ammo.destroy(body.getMotionState());
              Ammo.destroy(body.getCollisionShape());
              Ammo.destroy(body);
              delete bodies[name];
            }
          }
          // get the vertices from the list
          const points = processVertices(
            target.lookupVariableByNameAndType(vertices, "list")?.value
          );

          if (!points) {
            console.warn(
              `Attempted to create mesh body from invalid vertex list "${vertices}"`
            );
            return;
          }

          let shape;
          const faceList = target.lookupVariableByNameAndType(
            faces,
            "list"
          )?.value;
          const mesh = createTriangleMesh(points, faceList);

          if (!mesh) {
            console.warn(
              `Attempted to create mesh body from non-triangulated face list "${faces}"`
            );
            return;
          }

          if (type == "btBvhTriangleMeshShape") {
            shape = new Ammo[type](mesh, true); // useQuantizedAabbCompression true
          } else {
            shape = new Ammo[type](mesh); // ordinary btGImpactMeshShape
            shape.updateBound();
          }

          const transform = new Ammo.btTransform();
          transform.setIdentity();
          transform.setOrigin(new Ammo.btVector3(0, 0, 0));
          const motionState = new Ammo.btDefaultMotionState(transform);
          const localInertia = new Ammo.btVector3(0, 0, 0);

          if (mass != 0 && type == "btBvhTriangleMeshShape") mass = 0; // ensure static body with BVH accelerated meshes.

          if (mass > 0 && shape.calculateLocalInertia) {
            // only for GImpactMeshes
            shape.calculateLocalInertia(mass, localInertia);
          }

          const rbInfo = new Ammo.btRigidBodyConstructionInfo(
            mass,
            motionState,
            shape,
            localInertia
          );
          const body = new Ammo.btRigidBody(rbInfo);

          body.userData = name;
          world.addRigidBody(body);
          bodies[name] = body;
          bodies[name].collisions = [];
        }

        createOBJBody({ type, name, mass, obj }, { target }) {
          type = Cast.toString(type);
          name = Cast.toString(name);
          mass = Cast.toNumber(mass);

          if (bodies[name]) {
            const body = bodies[name];
            if (body) {
              world.removeRigidBody(body);
              world.removeCollisionObject(body);
              Ammo.destroy(body.getMotionState());
              Ammo.destroy(body.getCollisionShape());
              Ammo.destroy(body);
              delete bodies[name];
            }
          }

          if (!target.lookupVariableByNameAndType(obj, "list")) {
            console.warn(
              `Attempted to create OBJ body from nonexistent list "${obj}"`
            );
            return;
          }

          const objFile = processOBJ(
            target.lookupVariableByNameAndType(obj, "list").value
          );

          if (type == "btConvexHullShape") {
            const points = processVertices(objFile.vertices);
            const shape = new Ammo.btConvexHullShape();
            points.forEach((i) => shape.addPoint(i, true));

            const localInertia = new Ammo.btVector3(0, 0, 0);
            if (mass > 0) shape.calculateLocalInertia(mass, localInertia);

            const transform = new Ammo.btTransform();
            transform.setIdentity();
            transform.setOrigin(new Ammo.btVector3(0, 0, 0));

            const motionState = new Ammo.btDefaultMotionState(transform);
            const rbInfo = new Ammo.btRigidBodyConstructionInfo(
              mass,
              motionState,
              shape,
              localInertia
            );
            const body = new Ammo.btRigidBody(rbInfo);
            body.userData = name;
            world.addRigidBody(body);
            bodies[name] = body;
            bodies[name].collisions = [];
          } else {
            const points = processVertices(objFile.vertices);

            if (!points) {
              console.warn(
                `Attempted to create mesh body from invalid OBJ file "${obj}"`
              );
              return;
            }

            if (!objFile.faces) {
              console.warn(
                `Attempted to create mesh body from non-triangulated OBJ file "${obj}"`
              );
              return;
            }

            let shape;
            const mesh = createTriangleMesh(points, objFile.faces);

            if (type == "btBvhTriangleMeshShape") {
              shape = new Ammo[type](mesh, true); // useQuantizedAabbCompression true
            } else {
              shape = new Ammo[type](mesh); // ordinary btGImpactMeshShape
              shape.updateBound();
            }

            const transform = new Ammo.btTransform();
            transform.setIdentity();
            transform.setOrigin(new Ammo.btVector3(0, 0, 0));
            const motionState = new Ammo.btDefaultMotionState(transform);
            const localInertia = new Ammo.btVector3(0, 0, 0);

            if (mass != 0 && type == "btBvhTriangleMeshShape") mass = 0; // ensure static body with BVH accelerated meshes.

            if (mass > 0 && shape.calculateLocalInertia) {
              // only for GImpactMeshes
              shape.calculateLocalInertia(mass, localInertia);
            }

            const rbInfo = new Ammo.btRigidBodyConstructionInfo(
              mass,
              motionState,
              shape,
              localInertia
            );
            const body = new Ammo.btRigidBody(rbInfo);

            body.userData = name;
            world.addRigidBody(body);
            bodies[name] = body;
            bodies[name].collisions = [];
          }
        }

        createCompoundShape(name) {
          name = Cast.toString(name);
          if (compoundShapes[name]) {
            Ammo.destory(compoundShapes[name]);
            delete compoundShapes[name];
          }
          if (bodies[name]) {
            const body = bodies[name];
            if (body) {
              world.removeRigidBody(body);
              world.removeCollisionObject(body);
              Ammo.destroy(body.getMotionState());
              Ammo.destroy(body.getCollisionShape());
              Ammo.destroy(body);
              delete bodies[name];
            }
          }
          compoundShapes[name] = new Ammo.btCompoundShape();
        }

        compBodyAddBox({ x, y, z, name, x1, y1, z1, x2, y2, z2 }, { target }) {
          if (compoundShapes[name]) {
            addCompoundShape(
              name,
              new Ammo.btBoxShape(new Ammo.btVector3(x / 2, y / 2, z / 2)),
              x1,
              y1,
              z1,
              x2,
              y2,
              z2
            );
          } else {
            shapeWarning(target, name);
          }
        }

        compBodyAddSphere(
          { radius, name, x1, y1, z1, x2, y2, z2 },
          { target }
        ) {
          if (compoundShapes[name]) {
            addCompoundShape(
              name,
              new Ammo.btSphereShape(radius),
              x1,
              y1,
              z1,
              x2,
              y2,
              z2
            );
          } else {
            shapeWarning(target, name);
          }
        }

        compBodyAddCylinder(
          { radius, height, name, x1, y1, z1, x2, y2, z2 },
          { target }
        ) {
          if (compoundShapes[name]) {
            addCompoundShape(
              name,
              new Ammo.btCylinderShape(
                new Ammo.btVector3(radius, height / 2, radius)
              ),
              x1,
              y1,
              z1,
              x2,
              y2,
              z2
            );
          } else {
            shapeWarning(target, name);
          }
        }

        compBodyAddCone(
          { radius, height, name, x1, y1, z1, x2, y2, z2 },
          { target }
        ) {
          if (compoundShapes[name]) {
            addCompoundShape(
              name,
              new Ammo.btConeShape(radius, height),
              x1,
              y1,
              z1,
              x2,
              y2,
              z2
            );
          } else {
            shapeWarning(target, name);
          }
        }

        compBodyAddCapsule(
          { radius, height, name, x1, y1, z1, x2, y2, z2 },
          { target }
        ) {
          if (compoundShapes[name]) {
            addCompoundShape(
              name,
              new Ammo.btCapsuleShape(radius, height + 2 * radius),
              x1,
              y1,
              z1,
              x2,
              y2,
              z2
            );
          } else {
            shapeWarning(target, name);
          }
        }

        //* Compound bodies technically support meshes via btGImpactCompoundShape but I haven't added this

        createCompoundBody({ name, mass }, { target }) {
          name = Cast.toString(name);
          mass = Cast.toNumber(mass);
          if (compoundShapes[name]) {
            const localInertia = new Ammo.btVector3(0, 0, 0);
            compoundShapes[name].calculateLocalInertia(mass, localInertia);

            const startTransform = new Ammo.btTransform();
            startTransform.setIdentity();

            const motionState = new Ammo.btDefaultMotionState(startTransform);
            const rbInfo = new Ammo.btRigidBodyConstructionInfo(
              mass,
              motionState,
              compoundShapes[name],
              localInertia
            );
            const body = new Ammo.btRigidBody(rbInfo);
            body.userData = name;
            world.addRigidBody(body);
            bodies[name] = body;
            bodies[name].collisions = [];

            delete compoundShapes[name];
            Ammo.destroy(localInertia);
            Ammo.destroy(startTransform);
          } else {
            console.warn(
              `Attempted to realize nonexistent compound body "${name}" in ${target.isStage ? "Stage" : 'Sprite "' + target.sprite.name}"`
            );
          }
        }

        setPhysicalMaterial({ property, name, value }, { target }) {
          name = Cast.toString(name);
          if (bodies[name]) {
            // property can only be "setFriction" or "setRestitution", matching function names
            bodies[name][Cast.toString(property)](Cast.toNumber(value));
          } else {
            console.warn(
              `Attempted to set material of nonexistent body "${name}" in ${target.isStage ? "Stage" : 'Sprite "' + target.sprite.name}"`
            );
          }
        }

        setBodyGravity({ body, x, y, z }, { target }) {
          body = Cast.toString(body);
          if (bodies[body]) {
            const gravity = new Ammo.btVector3(
              Cast.toNumber(x),
              Cast.toNumber(y),
              Cast.toNumber(z)
            );
            bodies[body].setGravity(gravity);
            Ammo.destroy(gravity);
          } else {
            console.warn(
              `Attempted to set gravity of nonexistent body "${body}" in ${target.isStage ? "Stage" : 'Sprite "' + target.sprite.name}"`
            );
          }
        }

        bodyActive({ name }, { target }) {
          if (bodies[Cast.toString(name)]) {
            return bodies[Cast.toString(name)].isActive();
          } else {
            console.warn(
              `Attempted to get activity of nonexistent body "${name}" in ${target.isStage ? "Stage" : 'Sprite "' + target.sprite.name}"`
            );
            return false;
          }
        }

        anyBodyActive() {
          for (const key in bodies) {
            if (bodies[key]?.isActive()) return true;
          }
          return false;
        }

        deleteBody({ name }, { target }) {
          name = Cast.toString(name);
          if (bodies[name]) {
            const body = bodies[name];
            if (body) {
              world.removeRigidBody(body);
              world.removeCollisionObject(body);
              Ammo.destroy(body.getMotionState());
              Ammo.destroy(body.getCollisionShape());
              Ammo.destroy(body);
              delete bodies[name];
            }
          } else {
            console.warn(
              `Attempted to delete nonexistent body "${name}" in ${target.isStage ? "Stage" : 'Sprite "' + target.sprite.name}"`
            );
          }
        }

        setBodyTransformation({ transform, name, x, y, z }, { target }) {
          name = Cast.toString(name);
          x = Cast.toNumber(x);
          y = Cast.toNumber(y);
          z = Cast.toNumber(z);
          if (bodies[name]) {
            const tempTransform = new Ammo.btTransform();
            bodies[name].getMotionState().getWorldTransform(tempTransform);
            const quaternion = eulerToQuaternion(x, y, z);

            switch (Cast.toString(transform)) {
              case "position":
                tempTransform.setOrigin(new Ammo.btVector3(x, y, z));
                break;
              case "rotation":
                tempTransform.setRotation(
                  new Ammo.btQuaternion(
                    quaternion.x,
                    quaternion.y,
                    quaternion.z,
                    quaternion.w
                  )
                );
                break;
            }

            bodies[name].setWorldTransform(tempTransform);
            bodies[name].getMotionState().setWorldTransform(tempTransform);
            Ammo.destroy(tempTransform);
          } else {
            console.warn(
              `Attempted to set transformation of nonexistent body "${name}" in ${target.isStage ? "Stage" : 'Sprite "' + target.sprite.name}"`
            );
          }
        }

        changeBodyTransformation({ transform, name, x, y, z }, { target }) {
          name = Cast.toString(name);
          x = Cast.toNumber(x);
          y = Cast.toNumber(y);
          z = Cast.toNumber(z);
          if (bodies[name]) {
            const tempTransform = new Ammo.btTransform();
            bodies[name].getMotionState().getWorldTransform(tempTransform);
            const position = tempTransform.getOrigin();
            const newPos = new Ammo.btVector3(
              position.x() + x,
              position.y() + y,
              position.z() + z
            );
            const rotation = quaternionToEuler(tempTransform.getRotation());

            switch (Cast.toString(transform)) {
              case "position":
                tempTransform.setOrigin(newPos);
                break;
              case "rotation": {
                const newRotation = {
                  x: rotation.x + x,
                  y: rotation.y + y,
                  z: rotation.z + z,
                };
                let newQuaternion = eulerToQuaternion(
                  newRotation.x,
                  newRotation.y,
                  newRotation.z
                );
                tempTransform.setRotation(
                  new Ammo.btQuaternion(
                    newQuaternion.x,
                    newQuaternion.y,
                    newQuaternion.z,
                    newQuaternion.w
                  )
                );
                break;
              }
            }

            bodies[name].setWorldTransform(tempTransform);
            bodies[name].getMotionState().setWorldTransform(tempTransform);

            Ammo.destroy(tempTransform);
            Ammo.destory(newPos);
          } else {
            console.warn(
              `Attempted to change transformation of nonexistent body "${name}" in ${target.isStage ? "Stage" : 'Sprite "' + target.sprite.name}"`
            );
          }
        }

        bodyTransformation({ xyz, transform, name }, { target }) {
          name = Cast.toString(name);
          if (bodies[name]) {
            const newTransform = new Ammo.btTransform();
            bodies[name].getMotionState().getWorldTransform(newTransform);

            const position = newTransform.getOrigin();
            const rotation = newTransform.getRotation();

            switch (Cast.toString(transform)) {
              case "position":
                return position[xyz]();
              case "rotation":
                return quaternionToEuler(rotation)[xyz];
            }

            Ammo.destroy(newTransform);
          } else {
            console.warn(
              `Attempted to get transformation of nonexistent body "${name}" in ${target.isStage ? "Stage" : 'Sprite "' + target.sprite.name}"`
            );
          }
        }

        toggleCollisionResponse({ toggle, name }, { target }) {
          name = Cast.toString(name);
          if (bodies[name]) {
            if (Cast.toString(toggle) == "enable") {
              bodies[name].setCollisionFlags(
                bodies[name].getCollisionFlags() & ~4
              );
            } else {
              bodies[name].setCollisionFlags(
                bodies[name].getCollisionFlags() | 4
              );
            }
            bodies[name].forceActivationState(1);
            bodies[name].activate(true);
          } else {
            console.warn(
              `Attempted to toggle collision response of nonexistent body "${name}" in ${target.isStage ? "Stage" : 'Sprite "' + target.sprite.name}"`
            );
          }
        }

        bodyTouchingBody({ body, body2 }) {
          return bodies[Cast.toString(body)]?.collisions.includes(
            Cast.toString(body2)
          );
        }

        bodyTouchingAny({ body }) {
          return bodies[Cast.toString(body)]?.collisions.length > 0;
        }

        allBodiesTouchingBody({ body }) {
          return bodies[Cast.toString(body)]?.collisions;
        }

        rayCast({ name, x, y, z, x2, y2, z2 }) {
          name = Cast.toString(name);
          x = Cast.toNumber(x);
          y = Cast.toNumber(y);
          z = Cast.toNumber(z);
          x2 = Cast.toNumber(x2);
          y2 = Cast.toNumber(y2);
          z2 = Cast.toNumber(z2);
          if (rays[name]) {
            Ammo.destroy(rays[name]);
            delete rays[name];
          }
          const from = new Ammo.btVector3(x, y, z);
          const to = new Ammo.btVector3(x2, y2, z2);
          const rayCallback = new Ammo.ClosestRayResultCallback(from, to); //* use AllHitsRayResultCallback for testing multiple intersection points along one ray; most use cases only require the first hit
          world.rayTest(from, to, rayCallback);
          rays[name] = rayCallback;
          rays[name].endpoint = to;
        }

        // TODO: rotZ never used...
        rayCastDirection({ name, x, y, z, rotX, rotY, rotZ, distance }) {
          name = Cast.toString(name);
          if (rays[name]) {
            Ammo.destroy(rays[name]);
            delete rays[name];
          }
          const pitch = (Cast.toNumber(rotX) * Math.PI) / 180;
          const yaw = (Cast.toNumber(rotY) * Math.PI) / 180;
          const dir = new Ammo.btVector3(
            Math.cos(yaw) * Math.cos(pitch),
            Math.sin(pitch),
            Math.sin(yaw) * Math.cos(pitch)
          );
          dir.op_mul(distance);

          const from = new Ammo.btVector3(
            Cast.toNumber(x),
            Cast.toNumber(y),
            Cast.toNumber(z)
          );
          const to = new Ammo.btVector3(
            from.x() + dir.x(),
            from.y() + dir.y(),
            from.z() + dir.z()
          );

          const rayCallback = new Ammo.AllHitsRayResultCallback(from, to);
          world.rayTest(from, to, rayCallback);
          rays[name] = rayCallback;
          rays[name].endpoint = to;
        }

        rayCastTowards({ name, x, y, z, x2, y2, z2, distance }) {
          name = Cast.toString(name);
          x = Cast.toNumber(x);
          y = Cast.toNumber(y);
          z = Cast.toNumber(z);
          x2 = Cast.toNumber(x2);
          y2 = Cast.toNumber(y2);
          z2 = Cast.toNumber(z2);
          if (rays[name]) {
            Ammo.destroy(rays[name]);
            delete rays[name];
          }
          const from = new Ammo.btVector3(x, y, z);
          const dir = new Ammo.btVector3(x2 - x, y2 - y, z2 - z);
          dir.normalize();
          dir.op_mul(distance);
          const to = new Ammo.btVector3(
            from.x() + dir.x(),
            from.y() + dir.y(),
            from.z() + dir.z()
          );

          const rayCallback = new Ammo.AllHitsRayResultCallback(from, to);
          world.rayTest(from, to, rayCallback);
          rays[name] = rayCallback;
          rays[name].endpoint = to;
        }

        getRay({ xyz, property, name }, { target }) {
          name = Cast.toString(name);
          if (rays[name]) {
            const callback = rays[name];
            if (callback) {
              switch (Cast.toString(property)) {
                case "position":
                  return callback.hasHit()
                    ? callback.get_m_hitPointWorld()[xyz]()
                    : rays[name].endpoint[xyz];
                case "normal":
                  return callback.hasHit()
                    ? callback.get_m_hitNormalWorld()[xyz]()
                    : null;
              }
            }
            return null;
          } else {
            console.warn(
              `Attempted to get properties of nonexistent ray "${name}" in ${target.isStage ? "Stage" : 'Sprite "' + target.sprite.name}"`
            );
          }
        }

        getRayTouching({ name, body }, { target }) {
          name = Cast.toString(name);
          body = Cast.toString(body);
          if (rays[name]) {
            if (bodies[body]) {
              return bodies[body]?.includes(
                Ammo.castObject(
                  rays[name]?.get_m_collisionObject(),
                  Ammo.btRigidBody
                ).userData
              );
            } else {
              console.warn(
                `Attempted to detect if nonexistent body "${body}" was touching ray "${name}" in ${target.isStage ? "Stage" : 'Sprite "' + target.sprite.name}"`
              );
            }
          } else {
            console.warn(
              `Attempted to get body touching nonexistent ray "${name}" in ${target.isStage ? "Stage" : 'Sprite "' + target.sprite.name}"`
            );
          }
        }

        deleteRay({ name }, { target }) {
          name = Cast.toString(name);
          if (rays[name]) {
            Ammo.destroy(rays[name]);
            delete rays[name];
          } else {
            console.warn(
              `Attempted to delete nonexistent ray "${name}" in ${target.isStage ? "Stage" : `Sprite "${target.sprite.name}"`}`
            );
          }
        }

        // TODO: include blocks that can apply forces based on direction and magnitude
        // TODO: do I want to support local transformation possibilities? e.g., push (body) forward (x) amount in the direction it's facing
        pushForce({ name, force, x, y, z, x2, y2, z2 }, { target }) {
          name = Cast.toString(name);
          x = Cast.toNumber(x);
          y = Cast.toNumber(y);
          z = Cast.toNumber(z);
          x2 = Cast.toNumber(x2);
          y2 = Cast.toNumber(y2);
          z2 = Cast.toNumber(z2);
          if (bodies[name]) {
            const forceVector = new Ammo.btVector3(x, y, z);
            const offset = new Ammo.btVector3(x2, y2, z2);
            bodies[name][force](forceVector, offset);
            bodies[name].activate(true);
            Ammo.destroy(forceVector);
            Ammo.destroy(offset);
          } else {
            console.warn(
              `Attempted to apply force on nonexistent body "${name}" in ${target.isStage ? "Stage" : `Sprite "${target.sprite.name}"`}`
            );
          }
        }

        pushCentralForce({ name, force, x, y, z }, { target }) {
          name = Cast.toString(name);
          x = Cast.toNumber(x);
          y = Cast.toNumber(y);
          z = Cast.toNumber(z);
          if (bodies[name]) {
            const forceVector = new Ammo.btVector3(x, y, z);
            bodies[name][force](forceVector);
            bodies[name].activate(true);
            Ammo.destroy(forceVector);
          } else {
            console.warn(
              `Attempted to apply force on nonexistent body "${name}" in ${target.isStage ? "Stage" : `Sprite "${target.sprite.name}"`}`
            );
          }
        }

        pushTorque({ name, torque, x, y, z }, { target }) {
          name = Cast.toString(name);
          x = Cast.toNumber(x);
          y = Cast.toNumber(y);
          z = Cast.toNumber(z);
          if (bodies[name]) {
            const torqueVector = new Ammo.btVector3(x, y, z);
            bodies[name][torque](torqueVector);
            bodies[name].activate(true);
            Ammo.destroy(torqueVector);
          } else {
            console.warn(
              `Attempted to apply force on nonexistent body "${name}" in ${target.isStage ? "Stage" : `Sprite "${target.sprite.name}"`}`
            );
          }
        }

        clearForces({ name }, { target }) {
          name = Cast.toString(name);
          if (bodies[name]) {
            bodies[name].clearForces();
            bodies[name].activate(true);
          } else {
            console.warn(
              `Attempted to clear forces of nonexistent body "${name}" in ${target.isStage ? "Stage" : `Sprite "${target.sprite.name}"`}`
            );
          }
        }
      }
      Scratch.extensions.register(new AmmoPhysics());
    })
    .catch((error) => {
      console.error("Ammo.js physics failed to initialize: ", error);
    });
})(Scratch);
