// Name: WebGPU
// ID: webgpu
// Description: WebGPU bindings for TurboWarp.
// By: zacoons
// License: CC0-1.0

// todo
// - add sample project after release
// - add support for writing to MAP_WRITE buffers

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed)
    throw new Error("WebGPU extension must be run unsandboxed.");

  function label(text) {
    return {
      blockType: Scratch.BlockType.LABEL,
      text: text,
    };
  }

  class GPUExtension {
    constructor() {
      Scratch.vm.on("PROJECT_RUN_STOP", () => {
        this._resetAttrs();
      });
      this._resetAttrs();

      this.types = {
        Int8: Int8Array,
        Uint8: Uint8Array,
        Int16: Int16Array,
        Uint16: Uint16Array,
        Int32: Int32Array,
        Uint32: Uint32Array,
        Float32: Float32Array,
        Float64: Float64Array,
        Int64: BigInt64Array,
        Uint64: BigUint64Array,
      };
    }

    getInfo() {
      return {
        id: "webgpu",
        name: "WebGPU",
        color1: "#00cc77",
        docsURI: "https://extensions.turbowarp.org/webgpu",
        blocks: [
          {
            opcode: "init",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "🗲 init GPU",
            disableMonitor: true,
          },

          label("Bind Group Layouts"),
          {
            opcode: "newBindGroupLayout",
            blockType: Scratch.BlockType.COMMAND,
            text: "🔗? new bind group layout",
          },
          {
            opcode: "addEntryToBindGroupLayout",
            blockType: Scratch.BlockType.COMMAND,
            text: "🔗? add entry with type [TYPE] to bind group layout",
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "bindGroupLayoutEntryTypes",
              },
            },
          },
          {
            opcode: "createBindGroupLayout",
            blockType: Scratch.BlockType.REPORTER,
            text: "🔗? create bind group layout",
            disableMonitor: true,
          },

          label("Pipeline Layouts"),
          {
            opcode: "newPipelineLayout",
            blockType: Scratch.BlockType.COMMAND,
            text: "||? new pipeline layout",
          },
          {
            opcode: "addBindGroupLayoutToPipelineLayout",
            blockType: Scratch.BlockType.COMMAND,
            text: "||? add bind group layout [BIND_GROUP_LAYOUT] to pipeline layout",
            arguments: {
              BIND_GROUP_LAYOUT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "createPipelineLayout",
            blockType: Scratch.BlockType.REPORTER,
            text: "||? create pipeline layout",
            disableMonitor: true,
          },

          label("Buffers"),
          {
            opcode: "createBuffer",
            blockType: Scratch.BlockType.REPORTER,
            text: "⋯ create buffer with bytesize [SIZE] and usage [USAGE]",
            arguments: {
              SIZE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 4,
              },
              USAGE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 140,
              },
            },
            disableMonitor: true,
          },
          {
            opcode: "bufferUsage",
            blockType: Scratch.BlockType.REPORTER,
            text: "⋯ usage [USAGE]",
            arguments: {
              USAGE: {
                type: Scratch.ArgumentType.NUMBER,
                menu: "bufferUsages",
              },
            },
            disableMonitor: true,
          },
          {
            opcode: "readBufferToList",
            blockType: Scratch.BlockType.COMMAND,
            text: "⋯ read buffer [BUFFER] to list [LIST_ID] with type [TYPE]",
            arguments: {
              BUFFER: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              LIST_ID: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists",
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "types",
              },
            },
          },

          label("Bind Groups"),
          // https://developer.mozilla.org/en-US/docs/Web/API/GPUDevice/createBindGroup
          {
            opcode: "newBindGroup",
            blockType: Scratch.BlockType.COMMAND,
            text: "🔗 new bind group with layout [LAYOUT]",
            arguments: {
              LAYOUT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "addBufferToBindGroup",
            blockType: Scratch.BlockType.COMMAND,
            text: "🔗 add buffer [BUFFER] to bind group",
            arguments: {
              BUFFER: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "createBindGroup",
            blockType: Scratch.BlockType.REPORTER,
            text: "🔗 create bind group",
            disableMonitor: true,
          },

          label("Pipelines"),
          // https://developer.mozilla.org/en-US/docs/Web/API/GPUDevice/createComputePipeline
          {
            opcode: "createComputePipeline",
            blockType: Scratch.BlockType.REPORTER,
            text: "|| create pipeline with layout [LAYOUT] and module [MODULE_NAME]",
            arguments: {
              LAYOUT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              MODULE_NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: "modules",
              },
            },
            disableMonitor: true,
          },

          label("Command Buffers"),
          // https://developer.mozilla.org/en-US/docs/Web/API/GPUDevice/createCommandEncoder
          // https://developer.mozilla.org/en-US/docs/Web/API/GPUCommandEncoder/finish
          {
            opcode: "newCommandBuffer",
            blockType: Scratch.BlockType.COMMAND,
            text: "🗍 new command buffer",
          },
          // https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API#running_a_compute_pass
          {
            opcode: "beginComputePass",
            blockType: Scratch.BlockType.COMMAND,
            text: "🗍|| begin pipeline [PIPELINE]",
            arguments: {
              PIPELINE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "setComputePassBindGroup",
            blockType: Scratch.BlockType.COMMAND,
            text: "🗍|| set bind group [BIND_GROUP_IDX] to [BIND_GROUP] on pipeline",
            arguments: {
              BIND_GROUP_IDX: {
                type: Scratch.ArgumentType.NUMBER,
              },
              BIND_GROUP: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "dispatchComputePass",
            blockType: Scratch.BlockType.COMMAND,
            text: "🗍|| dispatch pipeline with dimensions [X] [Y] [Z]",
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              Z: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "copyBufferToBuffer",
            blockType: Scratch.BlockType.COMMAND,
            text: "🗍 copy buffer [SRC] to buffer [DST]",
            arguments: {
              SRC: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              DST: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "createCommandBuffer",
            blockType: Scratch.BlockType.REPORTER,
            text: "🗍 create command buffer",
            disableMonitor: true,
          },

          label("Device Queues"),
          {
            opcode: "newQueue",
            blockType: Scratch.BlockType.COMMAND,
            text: "≫ new queue",
          },
          {
            opcode: "writeListToBuffer",
            blockType: Scratch.BlockType.COMMAND,
            text: "≫ write list [LIST_ID] with type [TYPE] to buffer [BUFFER]",
            arguments: {
              LIST_ID: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists",
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "types",
              },
              BUFFER: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "addCommandBufferToQueue",
            blockType: Scratch.BlockType.COMMAND,
            text: "≫ add command buffer [COMMAND_BUFFER] to queue",
            arguments: {
              COMMAND_BUFFER: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "submitQueue",
            blockType: Scratch.BlockType.COMMAND,
            text: "≫ submit queue",
          },
        ],
        menus: {
          bindGroupLayoutEntryTypes: {
            acceptReporters: true,
            items: ["uniform", "read-only-storage", "storage"],
          },
          bufferUsages: {
            acceptReporters: true,
            items: [
              "COPY_SRC",
              "COPY_DST",
              "INDEX",
              "INDIRECT",
              "MAP_READ",
              "MAP_WRITE",
              "QUERY_RESOLVE",
              "STORAGE",
              "UNIFORM",
              "VERTEX",
            ],
          },
          modules: {
            acceptReporters: true,
            items: "_getModuleNames",
          },
          lists: {
            acceptReporters: true,
            items: "_getLists",
          },
          types: {
            acceptReporters: true,
            items: Object.keys(this.types),
          },
        },
      };
    }

    init() {
      this._resetAttrs();

      if (!navigator.gpu) return false;

      return navigator.gpu.requestAdapter().then(async (adapter) => {
        this.dev = await adapter.requestDevice();
        this._createModules();
        return true;
      });
    }
    _createModules() {
      for (const commentName in Scratch.vm.editingTarget.comments) {
        const c = Scratch.vm.editingTarget.comments[commentName];
        if (c.text.startsWith("name:")) {
          const firstLineEndIdx = c.text.indexOf("\n");
          const name = c.text.slice(5, firstLineEndIdx).trim();
          const code = c.text.slice(firstLineEndIdx, c.text.length).trim();
          this.modules[name] = this.dev.createShaderModule({
            code: code,
          });
        }
      }
    }

    // bind group layouts
    newBindGroupLayout() {
      this.tmp = {
        entries: [],
      };
    }
    addEntryToBindGroupLayout({ TYPE }) {
      this.tmp.entries.push({
        binding: this.tmp.entries.length,
        visibility: GPUShaderStage.COMPUTE,
        buffer: {
          type: TYPE,
        },
      });
    }
    createBindGroupLayout() {
      this.bindGroupLayouts.push(this.dev.createBindGroupLayout(this.tmp));
      return this.bindGroupLayouts.length - 1;
    }

    // pipeline layouts
    newPipelineLayout() {
      this.tmp = {
        bindGroupLayouts: [],
      };
    }
    addBindGroupLayoutToPipelineLayout({ BIND_GROUP_LAYOUT }) {
      this.tmp.bindGroupLayouts.push(this.bindGroupLayouts[BIND_GROUP_LAYOUT]);
    }
    createPipelineLayout() {
      this.pipelineLayouts.push(this.dev.createPipelineLayout(this.tmp));
      return this.pipelineLayouts.length - 1;
    }

    // buffers
    createBuffer({ SIZE, USAGE }) {
      const buf = this.dev.createBuffer({
        size: SIZE,
        usage: USAGE,
      });
      this.buffers.push(buf);
      return this.buffers.length - 1;
    }
    bufferUsage({ USAGE }) {
      switch (USAGE) {
        case "COPY_SRC":
          return GPUBufferUsage.COPY_SRC;
        case "COPY_DST":
          return GPUBufferUsage.COPY_DST;
        case "INDEX":
          return GPUBufferUsage.INDEX;
        case "INDIRECT":
          return GPUBufferUsage.INDIRECT;
        case "MAP_READ":
          return GPUBufferUsage.MAP_READ;
        case "MAP_WRITE":
          return GPUBufferUsage.MAP_WRITE;
        case "QUERY_RESOLVE":
          return GPUBufferUsage.QUERY_RESOLVE;
        case "STORAGE":
          return GPUBufferUsage.STORAGE;
        case "UNIFORM":
          return GPUBufferUsage.UNIFORM;
        case "VERTEX":
          return GPUBufferUsage.VERTEX;
        default:
          return 0;
      }
    }
    readBufferToList({ BUFFER, LIST_ID, TYPE }) {
      const buf = this.buffers[BUFFER];
      return buf.mapAsync(GPUMapMode.READ).then(() => {
        const arrayBuffer = buf.getMappedRange();
        this._setList(LIST_ID, Array.from(new this.types[TYPE](arrayBuffer)));
        buf.unmap();
      });
    }

    // bind groups
    newBindGroup({ LAYOUT }) {
      this.tmp = {
        layout: this.bindGroupLayouts[LAYOUT],
        entries: [],
      };
    }
    addBufferToBindGroup({ BUFFER }) {
      this.tmp.entries.push({
        binding: this.tmp.entries.length,
        resource: {
          buffer: this.buffers[BUFFER],
        },
      });
    }
    createBindGroup() {
      this.bindGroups.push(this.dev.createBindGroup(this.tmp));
      return this.bindGroups.length - 1;
    }

    // compute pipelines
    createComputePipeline({ LAYOUT, MODULE_NAME }) {
      this.pipelines.push(
        this.dev.createComputePipeline({
          layout: this.pipelineLayouts[LAYOUT],
          compute: {
            module: this.modules[MODULE_NAME],
            entryPoint: "main",
          },
        })
      );
      return this.pipelines.length - 1;
    }

    // command buffers
    newCommandBuffer() {
      this.tmp = {};
      this.tmp.commandEncoder = this.dev.createCommandEncoder();
    }
    beginComputePass({ PIPELINE }) {
      this.tmp.computePass = this.tmp.commandEncoder.beginComputePass();
      this.tmp.pipeline = this.pipelines[PIPELINE];
      this.tmp.computePass.setPipeline(this.tmp.pipeline);
    }
    setComputePassBindGroup({ BIND_GROUP_IDX, BIND_GROUP }) {
      this.tmp.computePass.setBindGroup(
        BIND_GROUP_IDX,
        this.bindGroups[BIND_GROUP]
      );
    }
    dispatchComputePass({ X, Y, Z }) {
      this.tmp.computePass.dispatchWorkgroups(X, Y, Z);
      this.tmp.computePass.end();
    }
    copyBufferToBuffer({ SRC, DST }) {
      const src = this.buffers[SRC];
      this.tmp.commandEncoder.copyBufferToBuffer(
        src,
        0,
        this.buffers[DST],
        0,
        src.size
      );
    }
    createCommandBuffer() {
      this.commandBuffers.push(this.tmp.commandEncoder.finish());
      return this.commandBuffers.length - 1;
    }

    // queues
    newQueue() {
      this.tmp = [];
    }
    writeListToBuffer({ LIST_ID, TYPE, BUFFER }) {
      this.dev.queue.writeBuffer(
        this.buffers[BUFFER],
        0,
        this.types[TYPE].from(this._getList(LIST_ID))
      );
    }
    addCommandBufferToQueue({ COMMAND_BUFFER }) {
      this.tmp.push(this.commandBuffers[COMMAND_BUFFER]);
    }
    submitQueue() {
      this.dev.queue.submit(this.tmp);
    }

    // helpers
    _resetAttrs() {
      this.dev?.destroy();
      this.dev = undefined;
      for (const b of this.buffers || []) b.destroy();

      this.modules = {};
      this.bindGroupLayouts = [];
      this.pipelineLayouts = [];
      this.buffers = [];
      this.bindGroups = [];
      this.pipelines = [];
      this.commandBuffers = [];

      /** @type {any} */
      this.tmp = undefined;
    }
    _getModuleNames() {
      const names = [];
      for (const commentName in Scratch.vm.editingTarget.comments) {
        const c = Scratch.vm.editingTarget.comments[commentName];
        if (c.text.startsWith("name:")) {
          const firstLineEndIdx = c.text.indexOf("\n");
          names.push(c.text.slice(5, firstLineEndIdx).trim());
        }
      }
      return names.length ? names : [""];
    }
    _getLists() {
      const names = [];

      const globalVars = Object.entries(
        Scratch.vm.runtime.targets[0].variables
      );
      const localVars = Object.entries(Scratch.vm.editingTarget.variables);
      for (const [varId, varObj] of globalVars.concat(localVars)) {
        if (varObj.type === "list")
          names.push({
            text: varObj.name,
            value: varId,
          });
      }

      return names.length ? names : [""];
    }
    _getList(listId) {
      for (const t of Scratch.vm.runtime.targets) {
        for (const varId in t.variables) {
          const varObj = t.variables[varId];
          if (varId === listId && varObj.type === "list") {
            return varObj.value;
          }
        }
      }
    }
    _setList(listId, val) {
      for (const t of Scratch.vm.runtime.targets) {
        for (const varId in t.variables) {
          const varObj = t.variables[varId];
          if (varId === listId && varObj.type === "list") {
            varObj.value = val;
            return;
          }
        }
      }
    }
  }

  Scratch.extensions.register(new GPUExtension());
})(Scratch);
