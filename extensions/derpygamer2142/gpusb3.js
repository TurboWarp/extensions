// Name: GPU.sb3
// ID: gpusb3
// Description: Use WebGPU compute shaders to accelerate your projects.
// By: derpygamer2142 <https://scratch.mit.edu/users/insanetaco2000/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  const vm = Scratch.vm;
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This extension must run unsandboxed.");
  }

  let buffersExt;
  // let penPlus;
  // penPlus = Scratch.vm.runtime.ext_obviousalexc_penPlus
  // load exposed extension stuff
  Scratch.vm.runtime.on("EXTENSION_ADDED", () => {
    buffersExt = Scratch.vm.runtime.ext_0znzwBuffers;
  });
  let shaders = {};
  let error = {};
  let resources = {
    buffers: {},
    bindGroups: {},
    bindGroupLayouts: {},
    bufferRefs: {}, // deprecated, not used anywhere anymore
    arrayBuffers: {},
    views: {},
    textures: {}, // webgpu texture objects, actual images will be yoinked from ~~the pen+ costume library(if available)~~(scrapped idea, too complicated) and costume list
    samplers: {},
  };
  let currentBindGroup = "";
  let currentBindGroupLayout = "";

  class GPUSb3 {
    getInfo() {
      this.init();
      return {
        id: "gpusb3",
        name: "GPU.sb3",

        color1: "#4287f5",
        color2: "#166af2",
        color3: "#032966",
        docsURI: "https://extensions.derpygamer2142.com/docs/gpusb3",
        blocks: [
          {
            opcode: "compileHat",
            blockType: Scratch.BlockType.EVENT,
            text: "Define shader [NAME] using bind group layout [BGL]",
            isEdgeActivated: false,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myShader",
              },
              BGL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myBindGroupLayout",
              },
            },
          },

          {
            opcode: "compileStart",
            blockType: Scratch.BlockType.COMMAND,
            text: "compile shaders ",
          },

          {
            opcode: "onError",
            blockType: Scratch.BlockType.EVENT,
            text: "when error thrown",
            isEdgeActivated: false,
          },

          {
            opcode: "clearError",
            blockType: Scratch.BlockType.COMMAND,
            text: "clear current error",
          },

          {
            opcode: "error",
            blockType: Scratch.BlockType.REPORTER,
            text: "Error",
          },

          {
            opcode: "init",
            blockType: Scratch.BlockType.COMMAND,
            text: "Reconnect to GPU",
          },

          {
            opcode: "runGPU",
            blockType: Scratch.BlockType.COMMAND,
            text: "Run shader [GPUFUNC] using bind group [BINDGROUP] dimensions x: [X] y: [Y] z: [Z]",
            arguments: {
              GPUFUNC: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myShader",
              },
              BINDGROUP: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myBindGroup",
              },
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
            blockType: "label",
            text: "Data input blocks",
          },

          {
            opcode: "createBindGroupLayout",
            blockType: Scratch.BlockType.CONDITIONAL,
            text: "Create bind group layout called [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myBindGroupLayout",
              },
            },
          },

          {
            opcode: "bindGroupLayoutEntry",
            blockType: Scratch.BlockType.COMMAND,
            text: "Add bind group layout entry with binding [BINDING] for type [TYPE] and descriptor [DESC]",
            arguments: {
              BINDING: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "BGLENTRYTYPES",
                defaultValue: "buffer",
              },
              DESC: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },

          {
            opcode: "bufferEntryDescriptor",
            blockType: Scratch.BlockType.REPORTER,
            // note to self: this text is correct, there's a different descriptor for each type
            text: "Buffer layout entry descriptor with usage type [TYPE]",
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "BUFFERENTRYTYPE",
              },
            },
          },

          {
            opcode: "textureEntryDescriptor",
            blockType: Scratch.BlockType.REPORTER,
            // note to self: this text is correct, there's a different descriptor for each type
            text: "Texture layout entry descriptor with usage type [TYPE] and format [FORMAT]",
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "TEXTUREENTRYTYPE",
              },
              FORMAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "TEXTURECOLORFORMATS",
              },
            },
          },

          {
            hideFromPalette: true,
            opcode: "samplerEntryDescriptor",
            blockType: Scratch.BlockType.REPORTER,
            // note to self: this text is correct, there's a different descriptor for each type
            text: "Sampler layout entry descriptor with sample type [TYPE]",
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "SAMPLERENTRYTYPE",
              },
            },
          },

          {
            opcode: "createBindGroup",
            blockType: Scratch.BlockType.CONDITIONAL,
            text: "Create bind group called [NAME] using layout [LAYOUT]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myBindGroup",
              },
              LAYOUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myBindGroupLayout",
              },
            },
          },

          {
            opcode: "bindGroupEntry",
            blockType: Scratch.BlockType.COMMAND,
            text: "Add bind group entry with binding [BINDING] of type [TYPE] using resource named [RESOURCE]",
            arguments: {
              BINDING: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "BGLENTRYTYPES", // this is named badly ig?
                defaultValue: "buffer",
              },
              RESOURCE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myBuffer",
              },
            },
          },

          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: "createBuffer",
            text: "Create buffer called [NAME] with size(in bytes) [SIZE] and usage flags [USAGE]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myBuffer",
              },
              SIZE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 8,
              },
              USAGE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 140, // GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST
              },
            },
          },

          {
            // https://www.w3.org/TR/webgpu/#buffer-usage
            opcode: "bufferUsage",
            blockType: Scratch.BlockType.REPORTER,
            text: "Buffer usage [USAGE]",
            arguments: {
              USAGE: {
                type: Scratch.ArgumentType.STRING,
                menu: "BUFFERUSAGE",
                defaultValue: "STORAGE",
              },
            },
          },

          {
            opcode: "createTexture",
            blockType: Scratch.BlockType.COMMAND,
            text: "Create texture called [NAME] width dimensions [WIDTH] [HEIGHT], color format [FORMAT] and usage [USAGE]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myTexture",
              },
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 150,
              },
              HEIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 150,
              },
              FORMAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "TEXTURECOLORFORMATS",
              },
              USAGE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 6,
              },
            },
          },

          {
            // https://www.w3.org/TR/webgpu/#buffer-usage
            opcode: "textureUsage",
            blockType: Scratch.BlockType.REPORTER,
            text: "Texture usage [USAGE]",
            arguments: {
              USAGE: {
                type: Scratch.ArgumentType.STRING,
                menu: "TEXTUREUSAGE",
                defaultValue: "STORAGE_BINDING",
              },
            },
          },

          {
            // I found out after implementing this that texture samplers don't work in compute shaders :,)
            hideFromPalette: true,
            opcode: "createSampler",
            blockType: Scratch.BlockType.COMMAND,
            text: "Create texture sampler called [NAME] with U address mode [UMODE] and v address mode [VMODE] and mag filter [MAGFILTER]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "mySampler",
              },
              UMODE: {
                menu: "ADDRESSMODES",
              },
              VMODE: {
                menu: "ADDRESSMODES",
              },
              MAGFILTER: {
                menu: "FILTERMODES",
              },
            },
          },

          {
            blockType: Scratch.BlockType.REPORTER,
            opcode: "binaryOr",
            text: "Usage [A] | [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 128,
              },
              B: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 4,
              },
            },
          },

          {
            // todo: add more typed arrays and maybe arbitrary data or something idk man
            // https://webidl.spec.whatwg.org/#AllowSharedBufferSource
            opcode: "genF32",
            blockType: Scratch.BlockType.REPORTER,
            hideFromPalette: true,
            text: "F32 array from array [ARRAY]",
            arguments: {
              ARRAY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: JSON.stringify([1, 2, 3]),
              },
            },
          },

          {
            opcode: "copyTextureToBuffer",
            blockType: Scratch.BlockType.COMMAND,
            text: "Copy texture [TEXTURE] to buffer [BUFFER] with dimensions [WIDTH] [HEIGHT]",
            arguments: {
              TEXTURE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myTexture",
              },
              BUFFER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myBuffer",
              },
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 15,
              },
              HEIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 15,
              },
            },
          },

          {
            opcode: "writeBuffer",
            blockType: Scratch.BlockType.COMMAND,
            text: "Write [SIZE] elements of data from arraybuffer [ARRAY] to buffer [BUFFER] from offset [OFF1] to offset [OFF2]",
            arguments: {
              SIZE: {
                // https://www.w3.org/TR/webgpu/#dom-gpuqueue-writebuffer
                // in elements for typesarrays and bytes otherwise
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 3,
              },
              ARRAY: {
                type: Scratch.ArgumentType.STRING,
              },
              BUFFER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myBuffer",
              },
              OFF1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              OFF2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },

          {
            //hideFromPalette: true,
            opcode: "copyBufferToBuffer",
            blockType: Scratch.BlockType.COMMAND,
            text: "Copy [NUMBYTES] bytes of data from buffer [BUF1] from  position [BUF1OFF] to buffer [BUF2] at position [BUF2OFF]",
            arguments: {
              NUMBYTES: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 256,
              },
              BUF1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myBuffer1",
              },
              BUF1OFF: {
                // IMPORTANT: THIS IS IN BYTES!!!!!!!!!
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              BUF2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myBuffer2",
              },
              BUF2OFF: {
                // IMPORTANT: THIS IS IN BYTES!!!!!!!!!
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },

          {
            hideFromPalette: true,
            opcode: "clearBuffer",
            blockType: Scratch.BlockType.COMMAND,
            text: "Clear [NUMBYTES] bytes(-1 for all) of buffer [BUFFER] from offset [OFFSET]",
            arguments: {
              NUMBYTES: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 128,
              },
              BUFFER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myBuffer",
              },
              OFFSET: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 128,
              },
            },
          },

          {
            opcode: "readBuffer",
            blockType: Scratch.BlockType.COMMAND,
            text: "Read buffer [BUFFER] to arraybuffer [ARRAYBUFFER]", // todo: add an output type here, not just f32s
            arguments: {
              BUFFER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myBuffer",
              },
              ARRAYBUFFER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myArrayBuffer",
              },
            },
          },

          {
            opcode: "writeTexture",
            blockType: Scratch.BlockType.COMMAND,
            text: "Write texture data from [IMAGE] to texture [TEXTURE]",
            arguments: {
              IMAGE: {
                type: Scratch.ArgumentType.STRING,
                menu: "IMAGELIST",
              },
              TEXTURE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myTexture",
              },
            },
          },

          {
            blockType: "label",
            text: "ArrayBuffer blocks",
          },

          {
            opcode: "listABs",
            blockType: Scratch.BlockType.REPORTER,
            text: "List arraybuffers",
          },

          {
            opcode: "createAB",
            blockType: Scratch.BlockType.COMMAND,
            text: "Create arraybuffer called [ARRAYBUFFER] with length [LENGTH]",
            arguments: {
              ARRAYBUFFER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myArrayBuffer",
              },

              LENGTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 16,
              },
            },
          },

          {
            opcode: "createABFromArray",
            blockType: Scratch.BlockType.COMMAND,
            text: "Create arraybuffer and view called [ARRAYBUFFER] from array [ARRAY] of type [TYPE] ",
            arguments: {
              ARRAYBUFFER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myArrayBuffer",
              },
              ARRAY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "[1,2,3]",
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "TYPEDARRAYTYPES",
              },
            },
          },

          {
            opcode: "deleteAB",
            blockType: Scratch.BlockType.COMMAND,
            text: "Delete arraybuffer [ARRAYBUFFER]",
            arguments: {
              ARRAYBUFFER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myArrayBuffer",
              },
            },
          },

          {
            opcode: "resizeAB",
            blockType: Scratch.BlockType.COMMAND,
            text: "Resize arraybuffer [ARRAYBUFFER] to [SIZE] bytes",
            arguments: {
              ARRAYBUFFER: {
                type: Scratch.ArgumentType.STRING,
                menu: "ARRAYBUFFERS",
              },
              SIZE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 16,
              },
            },
          },

          {
            opcode: "listViews",
            blockType: Scratch.BlockType.REPORTER,
            text: "List views",
          },

          {
            opcode: "createABView",
            blockType: Scratch.BlockType.COMMAND,
            text: "View arraybuffer [ARRAYBUFFER] as [TYPE] called [NAME]",
            arguments: {
              ARRAYBUFFER: {
                type: Scratch.ArgumentType.STRING,
                menu: "ARRAYBUFFERS",
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "TYPEDARRAYTYPES",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myView",
              },
            },
          },

          {
            opcode: "deleteView",
            blockType: Scratch.BlockType.COMMAND,
            text: "Delete view [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myView",
              },
            },
          },

          {
            opcode: "setItemInView",
            blockType: Scratch.BlockType.COMMAND,
            text: "Set item [INDEX] of view [VIEW] to [VALUE]",
            arguments: {
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              VIEW: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myView",
              },
              VALUE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 255,
              },
            },
          },

          {
            opcode: "setView",
            blockType: Scratch.BlockType.COMMAND,
            text: "Copy data from array [ARRAY] to view [VIEW] from index [INDEX]",
            arguments: {
              ARRAY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "[1,2,3]",
              },
              VIEW: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myView",
              },
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },

          {
            opcode: "fillView",
            blockType: Scratch.BlockType.COMMAND,
            text: "Fill items [START] to [END] of view [VIEW] with [VALUE]",
            arguments: {
              START: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              END: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5,
              },
              VIEW: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myView",
              },
              VALUE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 3,
              },
            },
          },

          {
            opcode: "itemOfView",
            blockType: Scratch.BlockType.REPORTER,
            text: "Item [INDEX] of arraybuffer view [VIEW]",
            arguments: {
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              VIEW: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myView",
              },
            },
          },

          {
            opcode: "sliceView",
            blockType: Scratch.BlockType.REPORTER,
            text: "Items [START] to [END] of view [VIEW]",
            arguments: {
              START: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              END: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 3,
              },
              VIEW: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myView",
              },
            },
          },

          {
            opcode: "viewToArray",
            blockType: Scratch.BlockType.REPORTER,
            text: "Get view [VIEW] as array",
            arguments: {
              VIEW: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myView",
              },
            },
          },

          {
            opcode: "propFromView",
            blockType: Scratch.BlockType.REPORTER,
            text: "[PROP] of view [VIEW]",
            arguments: {
              PROP: {
                type: Scratch.ArgumentType.STRING,
                menu: "TYPEDARRAYPROPS",
              },
              VIEW: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myView",
              },
            },
          },

          {
            blockType: "label",
            text: "WGSL Blocks",
          },

          {
            opcode: "declareVar",
            blockType: Scratch.BlockType.COMMAND,
            text: "declare [VARTYPE] variable as [NAME] with value [VALUE]: [TYPE]",
            arguments: {
              VARTYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "VARTYPES",
                defaultValue: "var",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "someVariable",
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 12,
              },

              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "TYPES",
                defaultValue: "auto",
              },
            },
          },

          {
            opcode: "bindInput",
            blockType: Scratch.BlockType.COMMAND,
            text: "Bind shader resource # [BINDNUM] to variable [VARNAME] with settings [SETTINGS] type [INPUTTYPE]",
            arguments: {
              BINDNUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              VARNAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "data",
              },
              SETTINGS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "storage, read_write",
              },
              INPUTTYPE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "array<f32>",
              },
            },
          },

          {
            opcode: "variableUsage",
            blockType: Scratch.BlockType.REPORTER,
            text: "Variable usage [USAGE] next [NEXT]",
            arguments: {
              USAGE: {
                type: Scratch.ArgumentType.STRING,
                menu: "VARUSAGE",
                defaultValue: "read_write",
              },
              NEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },

          {
            opcode: "varOp",
            blockType: Scratch.BlockType.COMMAND,
            text: "Variable [VARNAME] [VAROP]  [INPUT]",
            arguments: {
              VARNAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "someVariable",
              },
              VAROP: {
                type: Scratch.ArgumentType.STRING,
                menu: "VAROPS",
                defaultValue: "+=",
              },
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "8",
              },
            },
          },

          {
            opcode: "getVar",
            blockType: Scratch.BlockType.REPORTER,
            text: "Get variable [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "someVariable",
              },
            },
          },

          {
            blockType: "label",
            text: "      ",
          },

          {
            opcode: "variablePointer",
            blockType: Scratch.BlockType.REPORTER,
            text: "Pointer to variable [VAR]",
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myVariable",
              },
            },
          },

          {
            opcode: "indexObject",
            blockType: Scratch.BlockType.REPORTER,
            text: "In object [ARRAY] get index [INDEX]",
            arguments: {
              ARRAY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "someArray",
              },
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },

          {
            opcode: "getProp",
            blockType: Scratch.BlockType.REPORTER,
            text: "In object [OBJECT] get property [PROP]",
            arguments: {
              OBJECT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "someObject",
              },
              PROP: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },

          {
            opcode: "constructFromType",
            blockType: Scratch.BlockType.REPORTER,
            text: "Construct type [TYPE] with values [VALUES]",
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "RAWTYPES",
                defaultValue: "f32",
              },
              VALUES: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },

          {
            opcode: "typeConstructor",
            blockType: Scratch.BlockType.REPORTER,
            text: "Create type [TYPE] of [SUBTYPE], length(array only!) [LENGTH]",
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "CONSTRUCTABLETYPES",
                defaultValue: "vec3",
              },
              SUBTYPE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              LENGTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
          },

          {
            opcode: "matrixType",
            blockType: Scratch.BlockType.REPORTER,
            text: "Matrix type with [COLUMNS] columns and [ROWS] rows",
            arguments: {
              COLUMNS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2,
              },
              ROWS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2,
              },
            },
          },

          {
            opcode: "textureType",
            blockType: Scratch.BlockType.REPORTER,
            text: "Texture type of [TYPE] with access [ACCESS]",
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "TEXTURECOLORFORMATS",
              },
              ACCESS: {
                type: Scratch.ArgumentType.STRING,
                menu: "VARIABLEACCESSTYPES",
              },
            },
          },

          {
            opcode: "declareStruct",
            blockType: Scratch.BlockType.CONDITIONAL,
            text: "Declare struct called [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "MyStruct",
              },
            },
          },

          {
            opcode: "structProperty",
            blockType: Scratch.BlockType.COMMAND,
            text: "Add property called [PROPERTY] with type [TYPE] to struct",
            arguments: {
              PROPERTY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "someProperty",
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "f32",
                menu: "RAWTYPES",
              },
            },
          },

          {
            opcode: "structType",
            blockType: Scratch.BlockType.REPORTER,
            text: "Type of struct [STRUCT]",
            arguments: {
              STRUCT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "MyStruct",
              },
            },
          },

          {
            hideFromPalette: true, // this doesn't work with compute shaders, but if i decide to get freaky and somehow add other shader types(i probably won't) why redo code
            opcode: "samplerType",
            blockType: Scratch.BlockType.REPORTER,
            text: "Sampler type",
          },

          {
            opcode: "rootType",
            blockType: Scratch.BlockType.REPORTER,
            text: "Base type [TYPE]",
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "RAWTYPES",
                defaultValue: "f32",
              },
            },
          },

          {
            blockType: "label",
            text: "      ",
          },

          {
            opcode: "wgslFunc",
            blockType: Scratch.BlockType.REPORTER,
            text: "WGSL builtin [OPERATION] with args [VALUE]",
            arguments: {
              OPERATION: {
                type: Scratch.ArgumentType.STRING,
                menu: "WGSLFUNCS",
                defaultValue: "trunc",
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "12.345",
              },
            },
          },
          {
            opcode: "funcArgs",
            blockType: Scratch.BlockType.REPORTER,
            text: "Func arg input [ARG], next [NEXT]",
            arguments: {
              ARG: {
                // yee haw i'm a pirate
                type: Scratch.ArgumentType.STRING,
                defaultValue: "15",
              },
              NEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },

          {
            opcode: "computeFunc",
            blockType: Scratch.BlockType.CONDITIONAL,
            text: "Computer shader with workgroup size [WGSIZE]",
            arguments: {
              WGSIZE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: JSON.stringify([1]),
              },
            },
            branchCount: 1,
          },

          {
            opcode: "wgslForLoop",
            blockType: Scratch.BlockType.CONDITIONAL, // this isn't a conditional :trol:
            text: "For [VARNAME] in range [START], [END]",
            arguments: {
              VARNAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "i",
              },
              START: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              END: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10,
              },
            },
            branchCount: 1,
          },

          {
            opcode: "wgslWhileLoop",
            blockType: Scratch.BlockType.CONDITIONAL, // this isn't a conditional :trol:
            text: "While [COND]",
            arguments: {
              COND: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
            branchCount: 1,
          },

          {
            opcode: "break",
            blockType: Scratch.BlockType.COMMAND,
            isTerminal: true,
            text: "break",
          },

          {
            opcode: "continue",
            blockType: Scratch.BlockType.COMMAND,
            isTerminal: true,
            text: "continue",
          },

          {
            opcode: "defFunc",
            blockType: Scratch.BlockType.CONDITIONAL,
            text: "Def function [FUNCNAME] that returns type [TYPE] with args [ARGS]",
            arguments: {
              FUNCNAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myFunc",
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "FUNCTYPES",
                defaultValue: "void",
              } /*,
                            ARGS: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ""
                            }*/,
            },
          },

          {
            opcode: "defFuncArgs",
            blockType: Scratch.BlockType.REPORTER,
            text: "Def arg [ARGNAME]: [ARGTYPE], next [NEXTARG]",
            arguments: {
              ARGNAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "someArg",
              },
              ARGTYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "RAWTYPES",
                defaultValue: "i32",
              },
              NEXTARG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },

          {
            opcode: "getFuncArg",
            blockType: Scratch.BlockType.REPORTER,
            text: "Get function arg [ARGNAME]",
            arguments: {
              ARGNAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "someArg",
              },
            },
          },

          {
            opcode: "funcReturn",
            blockType: Scratch.BlockType.COMMAND,
            isTerminal: true,
            text: "Return [TORETURN]",
            arguments: {
              TORETURN: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },

          {
            opcode: "c_runFunc",
            blockType: Scratch.BlockType.COMMAND,
            text: "Run function [FUNCNAME] with args [ARGS]",
            arguments: {
              FUNCNAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myFunc",
              },
              ARGS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },

          {
            opcode: "r_runFunc",
            blockType: Scratch.BlockType.REPORTER,
            text: "Run function [FUNCNAME] with args [ARGS]",
            arguments: {
              FUNCNAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myFunc",
              },
              ARGS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },

          {
            blockType: "label",
            text: "Thread safety",
          },

          {
            opcode: "atomicType",
            blockType: Scratch.BlockType.REPORTER,
            text: "Create atomic of type [BASE]",
            arguments: {
              BASE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "i32",
                menu: "ATOMICBASES",
              },
            },
          },

          {
            opcode: "atomicLoad",
            blockType: Scratch.BlockType.REPORTER,
            text: "Load atomic [ATOMIC]",
            arguments: {
              ATOMIC: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myAtomic",
              },
            },
          },

          {
            opcode: "c_atomicFunc",
            blockType: Scratch.BlockType.COMMAND,
            text: "Perform operation [OP] on atomic [ATOMIC] with value [VALUE]",
            arguments: {
              OP: {
                type: Scratch.ArgumentType.STRING,
                menu: "ATOMICFUNCTIONS",
                defaultValue: "atomicStore",
              },
              ATOMIC: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myAtomic",
              },
              VALUE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 15,
              },
            },
          },

          {
            opcode: "r_atomicFunc",
            blockType: Scratch.BlockType.REPORTER,
            text: "Perform operation [OP] on atomic [ATOMIC] with value [VALUE]",
            arguments: {
              OP: {
                type: Scratch.ArgumentType.STRING,
                menu: "ATOMICFUNCTIONS",
                defaultValue: "atomicStore",
              },
              ATOMIC: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myAtomic",
              },
              VALUE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 15,
              },
            },
          },

          {
            opcode: "barrier",
            blockType: Scratch.BlockType.COMMAND,
            text: "Barrier [TYPE]",
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "BARRIERFUNCTIONS",
              },
            },
          },

          {
            blockType: "label",
            text: "      ",
          },

          {
            opcode: "c_arbitraryWGSL",
            blockType: Scratch.BlockType.COMMAND,
            text: "Arbitrary WGSL [TEXT]",
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },

          {
            opcode: "r_arbitraryWGSL",
            blockType: Scratch.BlockType.REPORTER,
            text: "Arbitrary WGSL [TEXT]",
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
        ],
        menus: {
          TYPES: {
            acceptReporters: true, // i don't like this, but with acceptReporters as false it shows up in fields and not inputs.
            items: [
              "i32",
              "u32",
              "f32",
              "bool",
              "auto",
              // f16?
            ],
          },
          VARTYPES: {
            acceptReporters: true,
            items: ["var", "let", "const"],
          },

          VAROPS: {
            acceptReporters: true,
            items: [
              "=",
              "+=",
              "-=",
              "*=",
              "/=",
              "%=",
              "&=",
              "|=",
              "^=",
              ">>=",
              "<<=",
            ],
          },

          WGSLFUNCS: {
            // every WGSL builtin function
            acceptReporters: true,
            items: [
              "all",
              "any",
              "arrayLength",
              "asinh", // screw atomics, i can add them later
              "bitcast",
              "bool",
              "cosh",
              "countLeadingZeros",
              "countOneBits",
              "countTrailingZeros",
              "degrees",
              "determinant",
              /*"dpdx",
                            "dpdxCoarse",
                            "dpdxFine",
                            "dpdy",
                            "dpdyCoarse",
                            "dpdyFine",*/
              "exp",
              "exp2",
              "f32",
              "firstLeadingBit",
              "firstTrailingBit",
              "fract",
              "frexp",
              "i32",
              "inverseSqrt",
              "length",
              "log",
              "log2",
              "modf",
              "normalize",
              "pack2x16float",
              "pack2x16snorm",
              "pack2x16unorm",
              "pack4x8snorm",
              "pack4x8unorm",
              "quantizeToF16",
              "radians",
              "reverseBits",
              "saturate",
              "sign",
              "sinh",
              "tanh",
              "textureDimensions",
              "textureLoad",
              "textureStore",
              //"textureSample",
              // "textureSampleBaseClampToEdge"
              // "textureSampleBias"
              // "textureSampleCompare"
              // "textureSampleCompareLevel"
              "textureNumLayers",
              "textureNumLevels",
              "textureNumSamples",
              "transpose",
              "trunc",
              "u32",
              "unpack2x16float",
              "unpack2x16snorm",
              "unpack2x16unorm",
              "unpack4x8snorm",
              "unpack4x8unorm",
            ],
          },

          FUNCTYPES: {
            acceptReporters: true,
            items: ["i32", "u32", "f32", "bool", "void"],
          },
          RAWTYPES: {
            acceptReporters: true,
            items: ["i32", "u32", "f32", "bool"],
          },
          BGLENTRYTYPES: {
            acceptReporters: true,
            items: [
              "buffer",
              "storageTexture",
              //"sampler"
            ],
          },
          CONSTRUCTABLETYPES: {
            acceptReporters: true,
            items: ["vec2", "vec3", "vec4", "array"],
          },
          BUFFERUSAGE: {
            acceptReporters: true,
            items: [
              "COPY_SRC",
              "COPY_DST",
              "MAP_READ",
              "MAP_WRITE",
              "QUERY_RESOLVE",
              "STORAGE",
              "UNIFORM",
            ],
          },
          BUFFERENTRYTYPE: {
            // why does one buffer need so much data man
            acceptReporters: true,
            items: ["read-only-storage", "storage", "uniform"],
          },
          VARUSAGE: {
            acceptReporters: true,
            // https://www.w3.org/TR/WGSL/#var-and-value
            // https://www.w3.org/TR/WGSL/#enumerant
            // i hate this documentation so much
            // it took me 20 minutes to find any explanations of what these enumerators do
            // even then they're pretty bad and don't give a concrete answer for each one
            // some of these are just here in case someone wants them
            // who understands how they work better than i do
            items: [
              "read",
              "write",
              "read_write",
              "function",
              "private",
              "workgroup",
              "uniform",
              "storage",
            ],
          },
          ATOMICBASES: {
            acceptReporters: true,
            items: ["i32", "u32"],
          },
          ATOMICFUNCTIONS: {
            acceptReporters: true,
            items: [
              //https://www.w3.org/TR/WGSL/#atomic-builtin-functions
              "atomicStore",
              "atomicAdd",
              "atomicSub",
              "atomicMax",
              "atomicMin",
              "atomicAnd",
              "atomicOr",
              "atomicXor",
              "atomicExchange",
              "atomicCompareExchangeWeak",
            ],
          },

          BARRIERFUNCTIONS: {
            acceptReporters: true,
            items: ["storageBarrier", "workgroupBarrier", "textureBarrier"],
          },

          TYPEDARRAYTYPES: {
            acceptReporters: true,
            items: [
              "Int32Array",
              "Uint32Array",
              "Float32Array",
              // webgpu doesn't support types below this comment, but people may want to access them using those types anyways
              "Int8Array",
              "Uint8Array",
              "Uint8ClampedArray",
              "Int16Array",
              "Uint16Array",
              // "Float16Array",
              // float16array is only available in firefox
              "BigInt64Array",
              "BigUint64Array",
              "Float64Array",
            ],
          },

          ARRAYBUFFERS: {
            acceptReporters: true,
            items: "getArrayBuffersMenu",
          },

          TYPEDARRAYPROPS: {
            acceptReporters: true,
            items: ["BYTES_PER_ELEMENT", "byteLength", "length"],
          },

          TEXTURECOLORFORMATS: {
            // https://www.w3.org/TR/webgpu/#enumdef-gputextureformat
            // some formats aren't supported(i think?), and depth textures aren't usable in compute shaders
            acceptReporters: true,
            items: [
              // 8-bit formats
              "r8unorm",
              "r8snorm",
              "r8uint",
              "r8sint",

              // 16-bit formats
              "r16uint",
              "r16sint",
              "r16float",
              "rg8unorm",
              "rg8snorm",
              "rg8uint",
              "rg8sint",

              // 32-bit formats
              "r32uint",
              "r32sint",
              "r32float",
              "rg16uint",
              "rg16sint",
              "rg16float",
              "rgba8unorm",
              //"rgba8unorm-srgb",
              "rgba8snorm",
              "rgba8uint",
              "rgba8sint",
              "bgra8unorm",
              "bgra8unorm-srgb",
              // Packed 32-bit formats
              // "rgb9e5ufloat",
              // "rgb10a2uint",
              // "rgb10a2unorm",
              // "rg11b10ufloat",

              // 64-bit formats
              "rg32uint",
              "rg32sint",
              "rg32float",
              "rgba16uint",
              "rgba16sint",
              "rgba16float",

              // 128-bit formats
              "rgba32uint",
              "rgba32sint",
              "rgba32float",
            ],
          },
          TEXTUREUSAGE: {
            // https://www.w3.org/TR/webgpu/#dom-gputextureusage-storage_binding
            acceptReporters: true,
            items: [
              "COPY_SRC",
              "COPY_DST",
              "TEXTURE_BINDING",
              "STORAGE_BINDING",
              // RENDER_ATTACHMENT intentionally excluded
            ],
          },

          IMAGELIST: {
            acceptReporters: true,
            items: "getImageList",
          },

          ADDRESSMODES: {
            acceptReporters: true,
            items: ["clamp-to-edge", "repeat", "mirror-repeat"],
          },

          FILTERMODES: {
            acceptReporters: true,
            items: ["nearest", "filter"],
          },

          TEXTUREENTRYTYPE: {
            acceptReporters: true,
            items: ["write-only", "read-only", "read-write"],
          },

          SAMPLERENTRYTYPE: {
            acceptReporters: true,
            items: ["float", "unfilterable-float", "sint", "uint"],
          },

          TEXTUREBASETYPES: {
            acceptReporters: true,
            items: ["f32", "i32", "u32"],
          },

          VARIABLEACCESSTYPES: {
            acceptReporters: true,
            items: ["read", "write", "read_write"],
          },
        },
      };
    }

    throwError(errorname, errorbody, errorsource, full, util) {
      error = {
        name: errorname ?? "Undefined. This is an error, please report it!",
        body: errorbody ?? "Undefined. This is an error, please report it!",
        source: errorsource ?? "Undefined. This is an error, please report it!",
        full: full ?? "Undefined. This is an error, please report it!",
      };
      console.error(error);
      if (util) {
        util.startHats("gpusb3_onError");
      } else {
        Scratch.vm.runtime.startHats("gpusb3_onError");
      }
    }

    async init(args, util) {
      // @ts-ignore
      if (!navigator.gpu) {
        // why angry red lines >: (
        alert("WebGPU is not supported.");
        throw new Error("WebGPU is not supported.");
      }
      // @ts-ignore
      this.adapter = await navigator.gpu.requestAdapter();
      if (!this.adapter) {
        alert("Failed to get WebGPU adapter.");
        throw Error("Failed to get WebGPU adapter.");
      }
      this.device = await this.adapter.requestDevice();
      this.device.lost.then((info) => {
        this.throwError("DeviceLost", info.message, "wgpu", info, util);
      });

      // note to self: uncomment this on release
      /*this.device.addEventListener("uncapturederror",(event) => {
                this.throwError("UnclassifiedError",event.error.message,"Unknown",event.error)
            })*/
    }

    textFromOp(util, blob, unsafe) {
      // i can't remember if blocks is _blocks, so i'm just getting it again
      const _blocks = util.thread.blockContainer._blocks;
      switch (blob.block) {
        case "text": {
          //console.log(_blocks[blob.id])
          return _blocks[blob.id].fields.TEXT.value;
        }
        case "math_number": {
          return _blocks[blob.id].fields.NUM.value;
        }
        case "gpusb3_menu_VARTYPES": {
          return _blocks[blob.id].fields.VARTYPES.value;
        }
        case "gpusb3_menu_VAROPS": {
          return _blocks[blob.id].fields.VAROPS.value;
        }
        case "gpusb3_menu_TYPES": {
          return _blocks[blob.id].fields.TYPES.value;
        }
        case "gpusb3_menu_WGSLFUNCS": {
          return _blocks[blob.id].fields.WGSLFUNCS.value;
        }
        case "gpusb3_menu_FUNCTYPES": {
          return _blocks[blob.id].fields.FUNCTYPES.value;
        }
        case "gpusb3_menu_RAWTYPES": {
          return _blocks[blob.id].fields.RAWTYPES.value;
        }

        case "gpusb3_menu_BGLENTRYTYPES": {
          return _blocks[blob.id].fields.BGLENTRYTYPES.value;
        }

        case "gpusb3_menu_CONSTRUCTABLETYPES": {
          return _blocks[blob.id].fields.CONSTRUCTABLETYPES.value;
        }

        case "gpusb3_menu_BUFFERUSAGE": {
          return _blocks[blob.id].fields.BUFFERUSAGE.value;
        }

        case "gpusb3_menu_BUFFERENTRYTYPE": {
          return _blocks[blob.id].fields.BUFFERENTRYTYPE.value;
        }

        case "gpusb3_menu_VARUSAGE": {
          return _blocks[blob.id].fields.VARUSAGE.value;
        }

        case "gpusb3_menu_ATOMICBASES": {
          return _blocks[blob.id].fields.ATOMICBASES.value;
        }

        case "gpusb3_menu_ATOMICFUNCTIONS": {
          return _blocks[blob.id].fields.ATOMICFUNCTIONS.value;
        }

        case "gpusb3_menu_BARRIERFUNCTIONS": {
          return _blocks[blob.id].fields.BARRIERFUNCTIONS.value;
        }

        case "gpusb3_menu_TEXTUREBASETYPES": {
          return _blocks[blob.id].fields.TEXTUREBASETYPES.value;
        }

        case "gpusb3_samplerType": {
          return "sampler"; // the codesmell here is crazy but this should work well enough
        }

        case "gpusb3_menu_VARIABLEACCESSTYPES": {
          return _blocks[blob.id].fields.VARIABLEACCESSTYPES.value;
        }

        case "gpusb3_menu_TEXTURECOLORFORMATS": {
          return _blocks[blob.id].fields.TEXTURECOLORFORMATS.value;
        }

        default: {
          if (unsafe) {
            return false;
          }
          this.throwError(
            "MissingOp",
            "Input type not found, did you forget to add a menu?",
            "textFromOp",
            "Input type not found, did you forget to add a menu?",
            util
          );
          console.log(blob);

          // note to self: might need to check for raw inputs or fix that because if a block has no inputs the array compiler doesn't make it an array
          return "Input type not found!";
        }
      }
    }

    findType(input) {
      switch (typeof input) {
        case "string": {
          if (Number.isNaN(Number.parseFloat(input))) {
            if (
              input.toLowerCase() === "true" ||
              input.toLowerCase() === "false"
            ) {
              return "boolean";
            } else if (input.toLowerCase() === "undefined") {
              return "undefined";
            } else if (input.toLowerCase() === "null") {
              return "null";
            } else {
              return "Error!";
            }
          } else {
            return this.findType(Number.parseFloat(input));
          }
        }
        case "number": {
          if (Number.isInteger(input)) {
            return "integer";
          } else if (Number.isNaN(input)) {
            return "NaN";
          } else if (!Number.isFinite(input)) {
            return "infinity";
          } else {
            return "float";
          }
        }
        case "boolean": {
          return "boolean";
        }
        case "undefined": {
          return "undefined";
        }
        case "object": {
          if (input === null) {
            return "null";
          }
        }
      }
    }

    resolveInput(util, block) {
      return Array.isArray(block)
        ? this.genWGSL(util, block, 0)
        : this.textFromOp(util, block, false);
    }

    isStringified(text) {
      try {
        JSON.parse(text);
        return true;
      } catch {
        return false;
      }
    }

    genWGSL(util, blocks, recursionDepth) {
      // for those wondering about isGeneratingArgumentsBecauseTheOtherThingITriedDidntWork, see https://github.com/derpygamer2142/example-extensions-fork/commit/bed128377314a95f6cf2775ed4771cf08d3f3e7e
      let code = "";
      for (let i = 0; i < blocks.length; i++) {
        //console.log(code)
        let b = blocks[i];
        if (Array.isArray(b)) {
          code = code.concat(this.genWGSL(util, blocks[i], recursionDepth + 1));
        } else {
          if (typeof b === "object") {
            //const op = b.block
            switch (b.block) {
              case "operator_equals": {
                code = code.concat(" (");
                code = code.concat(this.resolveInput(util, blocks[i + 1]));
                code = code.concat(" == "); // temp
                code = code.concat(this.resolveInput(util, blocks[i + 2]));
                code = code.concat(") ");
                i += 2;
                break;
              }

              case "operator_lt": {
                code = code.concat(" (");
                code = code.concat(
                  Array.isArray(blocks[i + 1])
                    ? this.genWGSL(util, blocks[i + 1], recursionDepth + 1)
                    : this.textFromOp(util, blocks[i + 1], false)
                );
                code = code.concat(" < ");
                code = code.concat(this.resolveInput(util, blocks[i + 2]));
                code = code.concat(") ");
                i += 2;
                break;
              }

              case "operator_gt": {
                code = code.concat(" (");
                code = code.concat(
                  Array.isArray(blocks[i + 1])
                    ? this.genWGSL(util, blocks[i + 1], recursionDepth + 1)
                    : this.textFromOp(util, blocks[i + 1], false)
                );
                code = code.concat(" > ");
                code = code.concat(this.resolveInput(util, blocks[i + 2]));
                code = code.concat(") ");
                i += 2;
                break;
              }

              case "operator_and": {
                code = code.concat(" (");
                code = code.concat(
                  Array.isArray(blocks[i + 1])
                    ? this.genWGSL(util, blocks[i + 1], recursionDepth + 1)
                    : this.textFromOp(util, blocks[i + 1], false)
                );
                code = code.concat(" && ");
                code = code.concat(this.resolveInput(util, blocks[i + 2]));
                code = code.concat(") ");
                i += 2;
                break;
              }

              case "operator_or": {
                code = code.concat(" (");
                code = code.concat(
                  Array.isArray(blocks[i + 1])
                    ? this.genWGSL(util, blocks[i + 1], recursionDepth + 1)
                    : this.textFromOp(util, blocks[i + 1], false)
                );
                code = code.concat(" || ");
                code = code.concat(this.resolveInput(util, blocks[i + 2]));
                code = code.concat(") ");
                i += 2;
                break;
              }

              case "operator_add": {
                code = code.concat(" (");
                code = code.concat(
                  Array.isArray(blocks[i + 1])
                    ? this.genWGSL(util, blocks[i + 1], recursionDepth + 1)
                    : this.textFromOp(util, blocks[i + 1], false)
                );
                code = code.concat(" + ");
                code = code.concat(this.resolveInput(util, blocks[i + 2]));
                code = code.concat(") ");
                i += 2;
                break;
              }

              case "operator_subtract": {
                code = code.concat(" (");
                code = code.concat(
                  Array.isArray(blocks[i + 1])
                    ? this.genWGSL(util, blocks[i + 1], recursionDepth + 1)
                    : this.textFromOp(util, blocks[i + 1], false)
                );
                code = code.concat(" - ");
                code = code.concat(this.resolveInput(util, blocks[i + 2]));
                code = code.concat(") ");
                i += 2;
                break;
              }

              case "operator_multiply": {
                code = code.concat(" (");
                code = code.concat(
                  Array.isArray(blocks[i + 1])
                    ? this.genWGSL(util, blocks[i + 1], recursionDepth + 1)
                    : this.textFromOp(util, blocks[i + 1], false)
                );
                code = code.concat(" * ");
                code = code.concat(this.resolveInput(util, blocks[i + 2]));
                code = code.concat(") ");
                i += 2;
                break;
              }

              case "operator_divide": {
                code = code.concat(" (");
                code = code.concat(
                  Array.isArray(blocks[i + 1])
                    ? this.genWGSL(util, blocks[i + 1], recursionDepth + 1)
                    : this.textFromOp(util, blocks[i + 1], false)
                );
                code = code.concat(" / ");
                code = code.concat(this.resolveInput(util, blocks[i + 2]));
                code = code.concat(") ");
                i += 2;
                break;
              }

              case "operator_mod": {
                code = code.concat(" (");
                code = code.concat(this.resolveInput(util, blocks[i + 1]));
                code = code.concat(" % ");
                code = code.concat(this.resolveInput(util, blocks[i + 2]));
                code = code.concat(") ");
                i += 2;
                break;
              }

              case "operator_mathop": {
                /*
                                from https://github.com/TurboWarp/scratch-vm/blob/11eec6604d766dc75fc5eb223b7bd31f167fee88/src/blocks/scratch3_operators.js

                                case 'abs': return Math.abs(n);
                                case 'floor': return Math.floor(n);
                                case 'ceiling': return Math.ceil(n);
                                case 'sqrt': return Math.sqrt(n);
                                case 'sin': return Math.round(Math.sin((Math.PI * n) / 180) * 1e10) / 1e10;
                                case 'cos': return Math.round(Math.cos((Math.PI * n) / 180) * 1e10) / 1e10;
                                case 'tan': return MathUtil.tan(n);
                                case 'asin': return (Math.asin(n) * 180) / Math.PI;
                                case 'acos': return (Math.acos(n) * 180) / Math.PI;
                                case 'atan': return (Math.atan(n) * 180) / Math.PI;
                                case 'ln': return Math.log(n);
                                case 'log': return Math.log(n) / Math.LN10;
                                case 'e ^': return Math.exp(n);
                                case '10 ^': return Math.pow(10, n);
                                */
                let op = "How do you mess up this badly?";
                let actualop =
                  util.thread.blockContainer._blocks[b.id].fields.OPERATOR
                    .value;
                switch (actualop) {
                  case "abs": {
                    op = "abs";
                    break;
                  }

                  case "floor": {
                    op = "floor";
                    break;
                  }

                  case "ceiling": {
                    op = "ceil";
                    break;
                  }

                  case "sqrt": {
                    op = "sqrt";
                    break;
                  }

                  case "sin": {
                    op = "sin";
                    break;
                  }

                  case "cos": {
                    op = "cos";
                    break;
                  }

                  case "tan": {
                    op = "tan";
                    break;
                  }

                  case "asin": {
                    op = "asin";
                    break;
                  }

                  case "acos": {
                    op = "acos";
                    break;
                  }

                  case "atan": {
                    op = "atan";
                    break;
                  }

                  case "ln": {
                    op = "log"; // confusing
                    break;
                  }

                  case "log": {
                    op = "log"; // special behavior below
                    break;
                  }

                  case "e ^": {
                    op = "exp";
                    break;
                  }

                  case "10 ^": {
                    op = "pow";
                    break;
                  }
                }
                code = code.concat(op);
                code = code.concat(op === "pow" ? "(10.0, " : "(");
                code = code.concat(
                  Array.isArray(blocks[i + 1])
                    ? this.genWGSL(util, blocks[i + 1], recursionDepth + 1)
                    : this.textFromOp(util, blocks[i + 1], false)
                );
                code = code.concat(
                  actualop === "log"
                    ? ") / " + Scratch.Cast.toString(Math.LN10)
                    : ")"
                );
                i += 2;
                break;
              }

              case "gpusb3_wgslFunc": {
                if (Array.isArray(blocks[i + 1])) {
                  console.error("Function should not have an input!");
                  return "Unexpected input in function input!";
                }
                code = code.concat(
                  Array.isArray(blocks[i + 1])
                    ? "error!"
                    : this.textFromOp(util, blocks[i + 1], false)
                );
                code = code.concat("(");
                /*if (this.textFromOp(util,blocks[i+1],false) === "arrayLength") {
                                    code = code.concat("&") // idk why you need this
                                }*/
                code = code.concat(
                  Array.isArray(blocks[i + 2])
                    ? this.genWGSL(util, blocks[i + 2], recursionDepth + 1)
                    : this.textFromOp(util, blocks[i + 2], false)
                );
                code = code.concat(")");
                i += 2;
                break;
              }

              case "gpusb3_funcArgs": {
                code = code.concat(
                  Array.isArray(blocks[i + 1])
                    ? this.genWGSL(util, blocks[i + 1], recursionDepth + 1)
                    : this.textFromOp(util, blocks[i + 1], false)
                );

                if (Array.isArray(blocks[i + 2])) {
                  code = code.concat(", ");
                  code = code.concat(
                    this.genWGSL(util, blocks[i + 2], recursionDepth + 1)
                  );
                } else if (this.textFromOp(util, blocks[i + 2], false) !== "") {
                  code = code.concat(", ");
                  code = code.concat(
                    this.textFromOp(util, blocks[i + 2], false)
                  );
                }
                i += 2;
                break;
              }

              case "gpusb3_getVar": {
                code = code.concat(
                  Array.isArray(blocks[i + 1])
                    ? "_"
                    : this.textFromOp(util, blocks[i + 1], false)
                ); // if your variable name is invalid it's your own fault
                i += 1;
                break;
              }
              case "gpusb3_constructFromType": {
                code = code.concat(
                  `${Array.isArray(blocks[i + 1]) ? this.genWGSL(util, blocks[i + 1], recursionDepth + 1) : this.textFromOp(util, blocks[i + 1], false)}(${Array.isArray(blocks[i + 2]) ? this.genWGSL(util, blocks[i + 2], recursionDepth + 1) : this.textFromOp(util, blocks[i + 2], false)})`
                );
                i += 2;
                break;
              }

              case "gpusb3_getProp": {
                if (Array.isArray(blocks[i + 2])) {
                  this.throwError(
                    "UnexpectedInput",
                    "Unexpected input in block input!",
                    "GetPropertyBlock",
                    "Unexpected input in Get Property block!",
                    util
                  );
                  return code + "Error! - compilation stopped";
                }
                code = code.concat(
                  `${Array.isArray(blocks[i + 1]) ? this.genWGSL(util, blocks[i + 1], recursionDepth + 1) : this.textFromOp(util, blocks[i + 1], false)}.${this.textFromOp(util, blocks[i + 2], false)}`
                );
                i += 2;
                break;
              }

              case "gpusb3_indexObject": {
                // https://www.w3.org/TR/WGSL/#matrix-access-expr
                code = code.concat(
                  `${Array.isArray(blocks[i + 1]) ? this.genWGSL(util, blocks[i + 1], recursionDepth + 1) : this.textFromOp(util, blocks[i + 1], false)}[${Array.isArray(blocks[i + 2]) ? this.genWGSL(util, blocks[i + 2], recursionDepth + 1) : this.textFromOp(util, blocks[i + 2], false)}]`
                );
                i += 2;
                break;
              }

              case "gpusb3_typeConstructor": {
                code = code.concat(
                  `${Array.isArray(blocks[i + 1]) ? this.genWGSL(util, blocks[i + 1], recursionDepth + 1) : this.textFromOp(util, blocks[i + 1], false)}<${Array.isArray(blocks[i + 2]) ? this.genWGSL(util, blocks[i + 2], recursionDepth + 1) : this.textFromOp(util, blocks[i + 2], false)}`
                );
                if (Array.isArray(blocks[i + 3])) {
                  code = code.concat(
                    `, ${this.genWGSL(util, blocks[i + 3], recursionDepth + 1)}`
                  );
                } else if (
                  Scratch.Cast.toString(
                    this.textFromOp(util, blocks[i + 3], false)
                  ) !== ""
                ) {
                  code = code.concat(
                    `, ${this.textFromOp(util, blocks[i + 3], false)}`
                  );
                }
                code = code.concat(">");
                i += 3;
                break;
              }

              case "gpusb3_rootType": {
                if (Array.isArray(blocks[i + 1])) {
                  this.throwError(
                    "UnexpectedInput",
                    "Unexpected input in block input!",
                    "RootTypeBlock",
                    "Unexpected input in Root type block!",
                    util
                  );
                  return code + "Error! - compilation stopped";
                }
                code = code.concat(this.textFromOp(util, blocks[i + 1], false));
                i += 1;
                break;
              }

              case "gpusb3_matrixType": {
                if (
                  Array.isArray(blocks[i + 1]) ||
                  Array.isArray(blocks[i + 2])
                ) {
                  this.throwError(
                    "UnexpectedInput",
                    "Unexpected input in block input!",
                    "MatrixTypeBlock",
                    "Unexpected input in Root type block!",
                    util
                  );
                  return code + "Error! - compilation stopped";
                }
                code = code.concat(
                  `mat${this.textFromOp(util, blocks[i + 1], false)}x${this.textFromOp(util, blocks[i + 2], false)}`
                );
                i += 2;
                break;
              }

              case "gpusb3_defFuncArgs": {
                if (Array.isArray(blocks[i + 1])) {
                  this.throwError(
                    "UnexpectedInput",
                    "Unexpected input in block input!",
                    "DefFuncArgsBlock",
                    "Unexpected input in Def func args block!",
                    util
                  );
                  return code + "Error! - compilation stopped";
                }

                code = code.concat(
                  `${this.textFromOp(util, blocks[i + 1], false)}: ${Array.isArray(blocks[i + 2]) ? this.genWGSL(util, blocks[i + 2], recursionDepth + 1) : this.textFromOp(util, blocks[i + 2], false)}`
                );
                if (Array.isArray(blocks[i + 3])) {
                  code = code.concat(
                    `, ${this.genWGSL(util, blocks[i + 3], recursionDepth + 1)}`
                  );
                }
                i += 3;
                break;
              }

              case "gpusb3_getFuncArg": {
                if (Array.isArray(blocks[i + 1])) {
                  this.throwError(
                    "UnexpectedInput",
                    "Unexpected input in block input!",
                    "GetFuncArgBlock",
                    "Unexpected input in Get func arg block!",
                    util
                  );
                  return code + "Error! - compilation stopped";
                }
                code = code.concat(this.textFromOp(util, blocks[i + 1], false));
                i += 1;
                break;
              }

              case "gpusb3_r_runFunc": {
                if (Array.isArray(blocks[i + 1])) {
                  this.throwError(
                    "UnexpectedInput",
                    "Unexpected input in block input!",
                    "RunFuncBlock",
                    "Unexpected input in Run func block!",
                    util
                  );
                  return code + "Error! - compilation stopped";
                }
                code = code.concat(this.textFromOp(util, blocks[i + 1], false));
                code = code.concat(
                  `(${Array.isArray(blocks[i + 2]) ? this.genWGSL(util, blocks[i + 2], recursionDepth + 1) : this.textFromOp(util, blocks[i + 2], false)})`
                );
                i += 2;
                break;
              }

              case "gpusb3_variableUsage": {
                if (Array.isArray(blocks[i + 1])) {
                  this.throwError(
                    "UnexpectedInput",
                    "Unexpected input in block input!",
                    "VariableUsageBlock",
                    "Unexpected input in Variable block!",
                    util
                  );
                  return "Unexpected input in variable usage!";
                }
                code = code.concat(this.textFromOp(util, blocks[i + 1], false));

                if (Array.isArray(blocks[i + 2])) {
                  code = code.concat(", ");
                  code = code.concat(
                    this.genWGSL(util, blocks[i + 2], recursionDepth + 1)
                  );
                }
                i += 2;
                break;
              }

              case "gpusb3_atomicLoad": {
                code = code.concat(
                  "atomicLoad(" +
                    (Array.isArray(blocks[i + 1])
                      ? this.genWGSL(util, blocks[i + 1])
                      : this.textFromOp(util, blocks[i + 1], false)) +
                    ")"
                );

                i += 1;
                break;
              }

              case "gpusb3_atomicType": {
                if (Array.isArray(blocks[i + 1])) {
                  this.throwError(
                    "UnexpectedInput",
                    "Unexpected input in block input!",
                    "AtomicTypeBlock",
                    "Unexpected input in Variable block!",
                    util
                  );
                  return "Unexpected input in variable usage!";
                }
                code = code.concat(
                  "atomic<" + this.textFromOp(util, blocks[i + 1], false) + ">"
                );

                i += 1;
                break;
              }

              case "gpusb3_r_atomicFunc": {
                if (Array.isArray(blocks[i + 1])) {
                  this.throwError(
                    "UnexpectedInput",
                    "Unexpected input in block input!",
                    "AtomicFunctionBlock",
                    "Unexpected input in Variable block!",
                    util
                  );
                  return "Unexpected input in atomic function!";
                }
                code = code.concat(
                  `${this.textFromOp(util, blocks[i + 1], false)}(${Array.isArray(blocks[i + 2]) ? this.genWGSL(util, blocks[i + 2]) : this.textFromOp(util, blocks[i + 2], false)}, ${Array.isArray(blocks[i + 3]) ? this.genWGSL(util, blocks[i + 3]) : this.textFromOp(util, blocks[i + 3], false)} )`
                );

                i += 3;
                break;
              }

              case "gpusb3_variablePointer": {
                code = code.concat(
                  "&" +
                    (Array.isArray(blocks[i + 1])
                      ? this.genWGSL(util, blocks[i + 1], recursionDepth + 1)
                      : this.textFromOp(util, blocks[i + 1], false))
                );

                i += 1;
                break;
              }

              case "gpusb3_textureType": {
                code = code.concat(
                  `texture_storage_2d<${Array.isArray(blocks[i + 1]) ? this.genWGSL(util, blocks[i + 1], recursionDepth + 1) : this.textFromOp(util, blocks[i + 1], false)}, ${Array.isArray(blocks[i + 2]) ? this.genWGSL(util, blocks[i + 2], recursionDepth + 1) : this.textFromOp(util, blocks[i + 2], false)}>`
                );

                i += 2;
                break;
              }

              case "gpusb3_samplerType": {
                code = code.concat("sampler"); // probably one of the simplest blocks here

                break;
              }

              case "gpusb3_structType": {
                if (Array.isArray(blocks[i + 1])) {
                  this.throwError(
                    "UnexpectedInput",
                    "Unexpected input in block input!",
                    "StructTypeBlock",
                    "Unexpected input in struct type block!",
                    util
                  );
                  return "Unexpected input in struct type";
                }

                code = code.concat(this.textFromOp(util, blocks[i + 1], false)); // this is the same as some other blocks, but for simplicity reasons there are multiple

                i += 1;
                break;
              }

              default: {
                this.throwError(
                  "InvalidBlock",
                  "Invalid block!",
                  "genWGSL",
                  "Invalid operator type block!",
                  util
                );
                console.error(
                  "Invalid operator! Did you forget the i += (# of inputs)?",
                  blocks.slice(i, i + 5)
                ); // this is to idiot proof it from myself, me am big smort
                return code + "Error! - compilation stopped";
              }
            }
          } else {
            switch (b) {
              case "control_if": {
                code = code.concat("if (");
                code = code.concat(
                  blocks[i + 1].length > 0
                    ? this.genWGSL(util, blocks[i + 1], recursionDepth + 1)
                    : "true"
                );
                if (blocks[i + 1].length <= 0) {
                  this.throwError(
                    "MissingInput",
                    "If statement missing condition!",
                    "IfBlock",
                    "If statement missing condition, defaulting to true!",
                    util
                  );
                }
                code = code.concat(") {\n");
                if (blocks[i + 2].length > 0) {
                  code = code.concat(
                    this.genWGSL(util, blocks[i + 2], recursionDepth + 1)
                  );
                }

                code = code.concat("\n}"); // newlines for some semblance of readability
                i += 2;
                break;
                // did i spell that right
              }

              case "control_if_else": {
                code = code.concat("if (");
                code = code.concat(
                  blocks[i + 1].length > 0
                    ? this.genWGSL(util, blocks[i + 1], recursionDepth + 1)
                    : "true"
                );
                if (blocks[i + 1].length <= 0) {
                  this.throwError(
                    "MissingInput",
                    "If statement missing condition!",
                    "IfBlock",
                    "If statement missing condition, defaulting to true!",
                    util
                  );
                }
                code = code.concat(") {\n");
                if (blocks[i + 2].length > 0) {
                  code = code.concat(
                    this.genWGSL(util, blocks[i + 2], recursionDepth + 1)
                  );
                }

                code = code.concat("\n}\nelse {\n"); // newlines for some semblance of readability
                if (blocks[i + 3].length > 0) {
                  code = code.concat(
                    this.genWGSL(util, blocks[i + 3], recursionDepth + 1)
                  );
                }
                code = code.concat("\n}\n");
                i += 3;
                break;
              }

              case "gpusb3_declareVar": {
                code = code.concat(
                  Array.isArray(blocks[i + 1])
                    ? `var<${this.genWGSL(util, blocks[i + 1], recursionDepth + 1)}>`
                    : this.textFromOp(util, blocks[i + 1], false)
                );
                code = code.concat(" ");
                code = code.concat(
                  Array.isArray(blocks[i + 2])
                    ? "_"
                    : this.textFromOp(util, blocks[i + 2], false)
                );
                const t = Array.isArray(blocks[i + 4])
                  ? this.genWGSL(util, blocks[i + 4], recursionDepth + 1)
                  : this.textFromOp(util, blocks[i + 4], false);
                if (t !== "auto") {
                  code = code.concat(": ");
                  code = code.concat(t);
                }
                if (!Array.isArray(blocks[i + 3])) {
                  const t = this.textFromOp(util, blocks[i + 3], false);
                  //console.log(JSON.stringify(t), t == "")
                  if (t != "") {
                    code = code.concat(" = ");
                    code = code.concat(t);
                  }
                } else {
                  code = code.concat(" = ");
                  code = code.concat(
                    this.genWGSL(util, blocks[i + 3], recursionDepth + 1)
                  );
                }

                code = code.concat(";\n");
                i += 4;
                break;
              }

              case "gpusb3_varOp": {
                if (Array.isArray(blocks[i + 2])) {
                  this.throwError(
                    "UnexpectedInput",
                    "Unexpected input for block input!",
                    "VarOpBlock",
                    "Unexpected input in Variable operation block!",
                    util
                  );
                  return code + "Error! - compilation stopped";
                }
                code = code.concat(
                  Array.isArray(blocks[i + 1])
                    ? this.genWGSL(util, blocks[i + 1], recursionDepth + 1)
                    : this.textFromOp(util, blocks[i + 1], false)
                );
                code = code.concat(
                  ` ${this.textFromOp(util, blocks[i + 2], false)} ${Array.isArray(blocks[i + 3]) ? this.genWGSL(util, blocks[i + 3], recursionDepth + 1) : this.textFromOp(util, blocks[i + 3], false)};\n`
                );

                i += 3;
                break;
              }

              case "gpusb3_computeFunc": {
                // @group(0) @binding(0) var<storage, read_write> data: array<f32>;
                code = code.concat(`

@compute @workgroup_size(${Array.isArray(blocks[i + 1]) ? "64" : this.isStringified(this.textFromOp(util, blocks[i + 1], false)) ? JSON.parse(this.textFromOp(util, blocks[i + 1], false)) : "64"}) fn computeShader(

@builtin(workgroup_id) workgroup_id : vec3<u32>,
@builtin(local_invocation_id) local_invocation_id : vec3<u32>,
@builtin(global_invocation_id) global_invocation_id : vec3<u32>,
@builtin(local_invocation_index) local_invocation_index: u32,
@builtin(num_workgroups) num_workgroups: vec3<u32>

                                ) {\n\n`);
                if (blocks[i + 2].length > 0) {
                  code = code.concat(
                    this.genWGSL(util, blocks[i + 2], recursionDepth + 1)
                  );
                } else {
                  code = code.concat("return;\n");
                }

                code = code.concat("}\n");
                i += 2;
                break;
              }

              case "gpusb3_wgslForLoop": {
                if (Array.isArray(blocks[i + 1])) {
                  this.throwError(
                    "UnexpectedInput",
                    "Unexpected input for block input!",
                    "ForLoopBlock",
                    "Unexpected input in For loop block!",
                    util
                  );
                  return code + "Error! - compilation stopped";
                }
                code = code.concat(`
var ${this.textFromOp(util, blocks[i + 1], false)} = ${this.resolveInput(util, blocks[i + 2])};
loop {
if (${this.textFromOp(util, blocks[i + 1], false)} > ${this.resolveInput(util, blocks[i + 3])}) {
break;
};

`); // GOD FUCKING DAMN IT "break if (condition)" IS IN THE OFFICIAL SPEC WHY THE HELL IS IT INVALID THIS IS BULLSHIT
                // I HAD TO GO OUT OF MY WAY AND SPEND 15 SECONDS CHANGING THIS CODE
                if (blocks[i + 4].length > 0) {
                  code = code.concat(
                    this.genWGSL(util, blocks[i + 4], recursionDepth + 1)
                  );
                } else {
                  code = code.concat("break;\n");
                }

                code = code.concat(
                  `${Array.isArray(blocks[i + 1]) ? "Error!" : this.textFromOp(util, blocks[i + 1], false)}++;}\n`
                ); // newlines for some semblance of readability
                i += 4;
                break;
              }

              case "gpusb3_wgslWhileLoop": {
                code = code.concat(`
while (${Array.isArray(blocks[i + 1]) ? this.genWGSL(util, blocks[i + 1], recursionDepth + 1) : this.textFromOp(util, blocks[i + 1], false)}) {

`);
                if (blocks[i + 4].length > 0) {
                  code = code.concat(
                    this.genWGSL(util, blocks[i + 2], recursionDepth + 1)
                  );
                } else {
                  code = code.concat("break;\n");
                }

                code = code.concat(`}\n`); // newlines for some semblance of readability
                i += 2;
                break;
              }
              // probably the 2 most simple blocks
              case "gpusb3_break": {
                code = code.concat("break;\n");

                break;
              }

              case "gpusb3_continue": {
                code = code.concat("continue;\n");
                break;
              }

              case "gpusb3_bindInput": {
                if (
                  Array.isArray(blocks[i + 1]) ||
                  Array.isArray(blocks[i + 2])
                ) {
                  this.throwError(
                    "UnexpectedInput",
                    "Unexpected input for block input!",
                    "BindResourceBlock",
                    "Unexpected input in Bind resource block!",
                    util
                  );
                  return code + "Error! - compilation stopped";
                }
                if (!Array.isArray(blocks[i + 3])) {
                  const t = this.textFromOp(util, blocks[i + 3], false);
                  if (t == "") {
                    code = code.concat(
                      `@group(0) @binding(${this.textFromOp(util, blocks[i + 1], false)}) var ${this.textFromOp(util, blocks[i + 2])}: ${Array.isArray(blocks[i + 4]) ? this.genWGSL(util, blocks[i + 4], recursionDepth + 1) : this.textFromOp(util, blocks[i + 4], false)};\n`
                    );
                  } else {
                    code = code.concat(
                      `@group(0) @binding(${this.textFromOp(util, blocks[i + 1], false)}) var<${t}> ${this.textFromOp(util, blocks[i + 2])}: ${Array.isArray(blocks[i + 4]) ? this.genWGSL(util, blocks[i + 4], recursionDepth + 1) : this.textFromOp(util, blocks[i + 4], false)};\n`
                    );
                  }
                } else {
                  code = code.concat(
                    `@group(0) @binding(${this.textFromOp(util, blocks[i + 1], false)}) var<${this.genWGSL(util, blocks[i + 3], recursionDepth + 1)}> ${this.textFromOp(util, blocks[i + 2])}: ${Array.isArray(blocks[i + 4]) ? this.genWGSL(util, blocks[i + 4], recursionDepth + 1) : this.textFromOp(util, blocks[i + 4], false)};\n`
                  );
                }

                i += 4;
                break;
              }

              case "gpusb3_defFunc": {
                if (Array.isArray(blocks[i + 1])) {
                  this.throwError(
                    "UnexpectedInput",
                    "Unexpected input for block input!",
                    "VarOpBlock",
                    "Unexpected input in Function definition block!",
                    util
                  );
                  return code + "Error! - compilation stopped";
                }
                code = code.concat(
                  `fn ${this.textFromOp(util, blocks[i + 1], false)}(`
                );
                if (blocks[i + 3] !== null) {
                  if (Array.isArray(blocks[i + 3])) {
                    code = code.concat(
                      this.genWGSL(util, blocks[i + 3], recursionDepth + 1)
                    );
                  } else {
                    code = code.concat(
                      this.textFromOp(util, blocks[i + 3], false)
                    );
                  }
                }
                if (Array.isArray(blocks[i + 2])) {
                  code = code.concat(
                    `) -> ${this.genWGSL(util, blocks[i + 2], recursionDepth + 1)}`
                  );
                } else {
                  code = code.concat(
                    this.textFromOp(util, blocks[i + 2], false) === "void"
                      ? ") {\n"
                      : `) -> ${this.textFromOp(util, blocks[i + 2], false)} {\n`
                  );
                }
                if (blocks[i + 4].length > 0) {
                  code = code.concat(
                    this.genWGSL(util, blocks[i + 4], recursionDepth + 1)
                  );
                } else {
                  code = code.concat(
                    `return ${this.textFromOp(util, blocks[i + 2], false) === "void" ? "" : Array.isArray(blocks[i + 2]) ? this.genWGSL(util, blocks[i + 2], recursionDepth + 1) : this.textFromOp(util, blocks[i + 2], false)}();\n`
                  ); // return a constructor for whatever type it should return
                }

                code = code.concat("}\n"); // newlines for some semblance of readability
                i += 4;
                break;
              }

              case "gpusb3_funcReturn": {
                code = code.concat(`return`);
                if (Array.isArray(blocks[i + 1])) {
                  code = code.concat(" ");
                  code = code.concat(
                    this.genWGSL(util, blocks[i + 1], recursionDepth + 1)
                  );
                } else if (this.textFromOp(util, blocks[i + 1], false) !== "") {
                  code = code.concat(" ");
                  code = code.concat(
                    this.textFromOp(util, blocks[i + 1], false)
                  );
                }
                code = code.concat(";\n");
                i += 1;
                break;
              }

              case "gpusb3_c_runFunc": {
                if (Array.isArray(blocks[i + 1])) {
                  this.throwError(
                    "UnexpectedInput",
                    "Unexpected input for block input!",
                    "RunFuncBlock",
                    "Unexpected input in Run function block!",
                    util
                  );
                  return code + "Error! - compilation stopped";
                }
                code = code.concat(this.textFromOp(util, blocks[i + 1], false));
                code = code.concat(
                  `(${Array.isArray(blocks[i + 2]) ? this.genWGSL(util, blocks[i + 2], recursionDepth + 1) : this.textFromOp(util, blocks[i + 2], false)});\n`
                );
                i += 2;
                break;
              }

              case "gpusb3_c_arbitraryWGSL": {
                code = code.concat(
                  Array.isArray(blocks[i + 1])
                    ? this.genWGSL(util, blocks[i + 1], recursionDepth + 1)
                    : this.textFromOp(util, blocks[i + 1], false)
                );
                i += 1;
                break;
              }

              case "gpusb3_r_arbitraryWGSL": {
                code = code.concat(
                  Array.isArray(blocks[i + 1])
                    ? this.genWGSL(util, blocks[i + 1], recursionDepth + 1)
                    : this.textFromOp(util, blocks[i + 1], false)
                );
                i += 1;
                break;
              }

              case "gpusb3_c_atomicFunc": {
                if (Array.isArray(blocks[i + 1])) {
                  this.throwError(
                    "UnexpectedInput",
                    "Unexpected input in block input!",
                    "AtomicFunctionBlock",
                    "Unexpected input in Variable block!",
                    util
                  );
                  return "Unexpected input in atomic function!";
                }
                code = code.concat(
                  `${this.textFromOp(util, blocks[i + 1], false)}(${Array.isArray(blocks[i + 2]) ? this.genWGSL(util, blocks[i + 2]) : this.textFromOp(util, blocks[i + 2], false)}, ${Array.isArray(blocks[i + 3]) ? this.genWGSL(util, blocks[i + 3]) : this.textFromOp(util, blocks[i + 3], false)} );\n`
                );

                i += 3;
                break;
              }

              case "gpusb3_barrier": {
                if (Array.isArray(blocks[i + 1])) {
                  // barrier block minecraft??????
                  this.throwError(
                    "UnexpectedInput",
                    "Unexpected input in block input!",
                    "BarrierBlock",
                    "Unexpected input in Barrier block!",
                    util
                  );
                  return "Unexpected input in barrier!";
                }
                code = code.concat(
                  this.textFromOp(util, blocks[i + 1], false) + "();\n"
                );

                i += 1;
                break;
              }

              case "gpusb3_declareStruct": {
                if (Array.isArray(blocks[i + 1])) {
                  this.throwError(
                    "UnexpectedInput",
                    "Unexpected input in block input!",
                    "DeclareStructBlock",
                    "Unexpected input in struct declaration block!",
                    util
                  );
                  return "Unexpected input in struct declaration";
                }

                code =
                  code.concat(`struct ${this.textFromOp(util, blocks[i + 1], false)} {
${blocks[i + 2].length > 0 ? this.genWGSL(util, blocks[i + 2], recursionDepth + 1) : ""}
};\n`); // this looks ugly but it formats the code correctly

                i += 2;
                break;
              }

              case "gpusb3_structProperty": {
                if (Array.isArray(blocks[i + 1])) {
                  this.throwError(
                    "UnexpectedInput",
                    "Unexpected input in block input!",
                    "StructPropertyBlock",
                    "Unexpected input in struct property block!",
                    util
                  );
                  return "Unexpected input in struct property name";
                }

                code = code.concat(
                  `${this.textFromOp(util, blocks[i + 1], false)}: ${Array.isArray(blocks[i + 2]) ? this.genWGSL(util, blocks[i + 2], recursionDepth + 1) : this.textFromOp(util, blocks[i + 2], false)},\n`
                );

                i += 2;
                break;
              }

              default: {
                this.throwError(
                  "InvalidBlock",
                  "Invalid block!",
                  "genWGSL",
                  "Invalid block, WGSL generation failed!",
                  util
                );
                console.error(
                  "Invalid block! Did you forget the i += (# of inputs)?",
                  blocks.slice(i, i + 5)
                );
                return code + "Error! - compilation stopped";
              }
            }
          }
        }
      }

      return code;
    }

    getBlockId(util) {
      // this function is by CST1229
      if (util.thread.isCompiled) {
        return util.thread.peekStack();
      } else {
        return util.thread.peekStackFrame().op.id;
      }
    }

    genInputTree(util, thread, blocks, check, addCheck) {
      if (JSON.stringify(blocks[check].inputs) === JSON.stringify({})) {
        // i wrote this code like 2 months ago. i think it checks if all inputs are resolved and if it's a text block or something, but i can't remember
        return {
          block: blocks[check].opcode,
          id: blocks[check].id,
          isRaw: blocks[check].fields != {},
        };
        // isRaw is whether it's a math_number or whatever
      } else {
        let finalinputs = [];
        if (addCheck) {
          finalinputs.push({
            block: blocks[check].opcode,
            id: blocks[check].id,
            isRaw: blocks[check].fields != {},
          });
        }

        let inputs = Object.getOwnPropertyNames(blocks[check].inputs);
        //finalinputs.push(inputs.length)
        for (let i = 0; i < inputs.length; i++) {
          finalinputs.push(
            this.genInputTree(
              util,
              thread,
              blocks,
              blocks[check].inputs[inputs[i]].block,
              true
            )
          );
        }
        return finalinputs;
      }
    }

    genBlock(util, thread, blocks, block) {
      let output = [];
      if (["text", "math_number"].includes(blocks[block].opcode)) {
        return {
          block: blocks[block].opcode,
          id: blocks[block].id,
          isRaw: blocks[block].fields != {}, // i can't remember if this does anything. i don't think it does, but just i added it just in case
        };
      }
      if (!Object.prototype.hasOwnProperty.call(blocks[block], "inputs")) {
        return "";
      }
      let heldInputs = structuredClone(blocks[block].inputs);
      output.push(blocks[block].opcode);
      if (Object.prototype.hasOwnProperty.call(heldInputs, "SUBSTACK")) {
        delete heldInputs.SUBSTACK; // this is a quick fix and probably won't play well with other extensions.
      }
      if (Object.prototype.hasOwnProperty.call(heldInputs, "SUBSTACK2")) {
        delete heldInputs.SUBSTACK2;
      }
      if (JSON.stringify(heldInputs) != JSON.stringify({})) {
        // if the block takes inputs excluding SUBSTACK and SUBSTACK2, generate an input tree for it
        //output.push(Object.getOwnPropertyNames(heldInputs).length)
        for (
          let i = 0;
          i < Object.getOwnPropertyNames(heldInputs).length;
          i++
        ) {
          output.push(
            this.genInputTree(
              util,
              thread,
              blocks,
              heldInputs[Object.getOwnPropertyNames(heldInputs)[i]].block,
              true
            )
          );
        }

        if (
          block.opcode === "gpusb3_defFunc" &&
          !Object.prototype.hasOwnProperty.call(heldInputs, "ARGS")
        ) {
          output.push(null);
        }
      }
      if (
        Object.prototype.hasOwnProperty.call(blocks[block].inputs, "SUBSTACK")
      ) {
        output.push(
          this.compile(
            util,
            thread,
            blocks,
            blocks[block].inputs.SUBSTACK.block,
            true
          )
        );
      }
      if (
        Object.prototype.hasOwnProperty.call(blocks[block].inputs, "SUBSTACK2")
      ) {
        // support for n-number of branches is cringe and we don't need that kind of negativity in here
        // also no extensions in my pristine compiled hats
        if (
          !Object.prototype.hasOwnProperty.call(
            blocks[block].inputs,
            "SUBSTACK"
          )
        ) {
          output.push([]);
        }
        output.push(
          this.compile(
            util,
            thread,
            blocks,
            blocks[block].inputs.SUBSTACK2.block,
            true
          )
        );
      }
      return output;
    }

    compile(util, thread, blocks, firstblock, addStart) {
      let output = [];
      let held = firstblock;
      if (addStart) {
        output = output.concat(this.genBlock(util, thread, blocks, held));
      }
      let next = blocks[held].next;
      while (next != null) {
        held = next;
        next = blocks[held].next;
        output.push(blocks[held].opcode);
        let heldInputs = structuredClone(blocks[held].inputs);
        //output.push(gpusb3Info.blocks.find((v) => v.info.opcode == blocks[held].opcode)?.info?.blockType === "reporter" && Object.getOwnPropertyNames(heldInputs).length < 1 ? [blocks[held].opcode] : blocks[held].opcode)
        if (Object.prototype.hasOwnProperty.call(heldInputs, "SUBSTACK")) {
          delete heldInputs.SUBSTACK; // this is a quick fix and probably won't play well with other extensions.
          // i will make a custom math/block system later
        }
        if (Object.prototype.hasOwnProperty.call(heldInputs, "SUBSTACK2")) {
          delete heldInputs.SUBSTACK2; // see previous comment
        }
        if (
          JSON.stringify(heldInputs) != JSON.stringify({}) ||
          blocks[held].opcode === "control_if" ||
          blocks[held].opcode === "control_if_else" ||
          blocks[held].opcode === "gpusb3_computeFunc"
        ) {
          // if the block takes inputs excluding SUBSTACK and SUBSTACK2, generate an input tree for it
          //output.push(Object.getOwnPropertyNames(heldInputs).length)
          if (Object.getOwnPropertyNames(heldInputs).length === 0) {
            output.push([]);
          } else {
            const props = Object.getOwnPropertyNames(heldInputs);
            for (let i = 0; i < props.length; i++) {
              output.push(
                this.genInputTree(
                  util,
                  thread,
                  blocks,
                  heldInputs[Object.getOwnPropertyNames(heldInputs)[i]].block,
                  true
                )
              );
            }

            // here

            if (
              blocks[held].opcode === "gpusb3_defFunc" &&
              !Object.prototype.hasOwnProperty.call(heldInputs, "ARGS")
            ) {
              output.push(null);
            }
          }
        }
        if (
          Object.prototype.hasOwnProperty.call(
            blocks[held].inputs,
            "SUBSTACK"
          ) ||
          blocks[held].opcode === "control_if" ||
          blocks[held].opcode === "control_if_else" ||
          blocks[held].opcode === "gpusb3_computeFunc" ||
          blocks[held].opcode === "gpusb3_defFunc"
        ) {
          if (
            (blocks[held].opcode === "control_if" ||
              blocks[held].opcode === "gpusb3_computeFunc" ||
              blocks[held].opcode === "gpusb3_defFunc" ||
              blocks[held].opcode === "control_if_else") &&
            !Object.prototype.hasOwnProperty.call(
              blocks[held].inputs,
              "SUBSTACK"
            )
          ) {
            output.push([]);
          } else {
            output.push(
              this.compile(
                util,
                thread,
                blocks,
                blocks[held].inputs.SUBSTACK.block,
                true
              )
            );
          }
        }
        if (
          Object.prototype.hasOwnProperty.call(
            blocks[held].inputs,
            "SUBSTACK2"
          ) ||
          blocks[held].opcode === "control_if_else"
        ) {
          // support for n-number of branches is cringe and we don't need that kind of negativity in here
          // also no extensions in my pristine compiled hats
          if (
            blocks[held].opcode === "control_if_else" &&
            !Object.prototype.hasOwnProperty.call(
              blocks[held].inputs,
              "SUBSTACK2"
            )
          ) {
            output.push([]);
          } else {
            output.push(
              this.compile(
                util,
                thread,
                blocks,
                blocks[held].inputs.SUBSTACK2.block,
                true
              )
            );
          }
        }
      }
      return output;
    }

    compileStart(args, util) {
      console.log(util);
      // helpful error site: https://toji.dev/webgpu-best-practices/error-handling.html
      // seems to be one of the only places to explain this in human readable terms
      let threads = util.startHats("gpusb3_compileHat"); // NOTE TO SELF: THIS DOESN'T START THE HATS(why is it named that then. this is stupid and i don't like it, i am going to complain on my twitter dot com (just kidding twitter is for nerds and i don't use it. also as of writing this comment for some it reason allows weird stuff now, what were they even thinking. twitter was bad to begin with but elon musk's midlife crisis ran it so far into the ground that it burned alive, also i'm not calling it x)), thanks sharkpool
      let newthreads = [];
      vm.runtime.threads.forEach((i) => {
        //console.log(i.topBlock)
        if (
          Object.prototype.hasOwnProperty.call(
            util.thread.blockContainer._blocks,
            i.topBlock
          )
        ) {
          if (
            util.thread.blockContainer._blocks[i.topBlock].opcode ===
            "gpusb3_compileHat"
          ) {
            newthreads.push(i);
          }
        }
      });
      threads = newthreads;
      //threads = vm.runtime.threads.filter((i) => util.thread.blockContainer._blocks[i.topBlock].opcode === "gpusb3_compileHat")
      //console.log(threads)
      if (threads.length > 0) {
        threads.forEach(async (t) => {
          t.tryCompile(); // this doesn't do anything =D

          const arraycompiled = this.compile(
            util,
            threads[0],
            threads[0].blockContainer._blocks,
            threads[0].topBlock,
            false
          );
          console.log(arraycompiled);
          const compiled = this.genWGSL(util, arraycompiled, 0);
          console.log(compiled);
          //let idkman = this.genInputTree(util, t, t.blockContainer._blocks, t.topBlock, true)
          let bglInput =
            t.blockContainer._blocks[
              t.blockContainer._blocks[t.topBlock].inputs.BGL.block
            ];
          let nameInput =
            t.blockContainer._blocks[
              t.blockContainer._blocks[t.topBlock].inputs.NAME.block
            ];
          if (nameInput.opcode != "text" || bglInput.opcode != "text") {
            this.throwError(
              "UnexpectedInput",
              "Unexpected input for block input!",
              "ShaderDefinition",
              "Shader name and bind group layout cannot have inputs!",
              util
            );
          } else if (
            !Object.prototype.hasOwnProperty.call(
              resources.bindGroupLayouts,
              bglInput.fields.TEXT.value
            )
          ) {
            this.throwError(
              "BindGroupLayoutNotFound",
              "Bind group layout not found!",
              `Shader "${nameInput.fields.TEXT.value}"`,
              `Couldn't find bind group layout"${bglInput.fields.TEXT.value}", make sure to define it before compiling!`,
              util
            );
          } else {
            let funcname = nameInput.fields.TEXT.value;

            this.device.pushErrorScope("internal");
            this.device.pushErrorScope("validation");
            const shaderModule = this.device.createShaderModule({
              label: `Shader "${funcname}"`,
              code: compiled,
            });
            this.device.popErrorScope().then((error) => {
              if (error)
                this.throwError(
                  "ShaderCreationError",
                  error.message,
                  "ShaderModuleCreation",
                  error,
                  util
                );
            });
            this.device.popErrorScope().then((error) => {
              if (error)
                this.throwError(
                  "ShaderCreationError",
                  error.message,
                  "ShaderModuleCreation",
                  error,
                  util
                );
            });

            const compilationinfo = await shaderModule.getCompilationInfo();
            console.log(compilationinfo);

            for (const message of compilationinfo.messages) {
              this.throwError(
                "WGSLError",
                message.message,
                `ShaderCreation`,
                `Error parsing WGSL in shader "${funcname}": ${message.message} - Line ${message.lineNum}:${message.linePos} ${compiled.substring(Math.max(0, message.offset - 15), message.offset)}**${compiled.substring(message.offset, message.offset + message.length)}**${compiled.substring(message.offset + message.length, Math.min(compiled.length, message.offset + message.length + 15))}`
              );
            }

            shaders[funcname] = {
              name: funcname,
            };
            let shader = shaders[funcname];

            this.device.pushErrorScope("validation");
            this.device.pushErrorScope("internal");
            shader.computePipeline = this.device.createComputePipeline({
              layout: this.device.createPipelineLayout({
                bindGroupLayouts: [
                  resources.bindGroupLayouts[bglInput.fields.TEXT.value],
                ],
              }),
              compute: {
                module: shaderModule,
                entryPoint: "computeShader",
              },
            });
            this.device.popErrorScope().then((error) => {
              if (error)
                this.throwError(
                  "ComputePipelineError",
                  error.message,
                  "ComputePipelineCreation",
                  error,
                  util
                );
            });
            this.device.popErrorScope().then((error) => {
              if (error)
                this.throwError(
                  "ComputePipelineError",
                  error.message,
                  "ComputePipelineCreation",
                  error,
                  util
                );
            });
          }
        });

        console.log(util);
        //console.log(threads)
        // const e = this.compile(util,threads[0],threads[0].blockContainer._blocks,threads[0].topBlock,false)
        // const compiled = this.genWGSL(util, e, false, 0)

        // console.log(e)
        // console.log(compiled)
      }
    }
    /*
        compute shader reference implementation
        https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API#basic_compute_pipeline

            notes:
            
            most of this can stay the same across multiple modules, the only things that might change
            are the different input buffers and their usage, but that can probably be generated
            fairly easily

            this documentation is horrible, i'm fairly sure the writer forgot they were writing about
            compute shaders halfway through and then just decided to talk about render shaders

            


        */

    runGPU(args, util) {
      if (!Object.prototype.hasOwnProperty.call(shaders, args.GPUFUNC)) {
        this.throwError(
          "ShaderNotFound",
          "Couldn't find specified shader!",
          "RunShaderBlock",
          "Couldn't find shader \"" +
            Scratch.Cast.toString(args.GPUFUNC) +
            '"!',
          util
        );
        return;
      }
      if (
        !Object.prototype.hasOwnProperty.call(
          resources.bindGroups,
          Scratch.Cast.toString(args.BINDGROUP)
        )
      ) {
        this.throwError(
          "BindGroupNotFound",
          "Couldn't find specified bind group!",
          "RunShaderBlock",
          "Couldn't find bind group \"" +
            Scratch.Cast.toString(args.BINDGROUP) +
            '"!',
          util
        );
        return;
      }
      let shader = shaders[args.GPUFUNC];

      this.device.pushErrorScope("validation");
      this.device.pushErrorScope("internal");
      this.device.pushErrorScope("out-of-memory");
      const commandEncoder = this.device.createCommandEncoder();

      const passEncoder = commandEncoder.beginComputePass();
      passEncoder.setPipeline(shader.computePipeline);
      passEncoder.setBindGroup(
        0,
        resources.bindGroups[Scratch.Cast.toString(args.BINDGROUP)]
      );
      passEncoder.dispatchWorkgroups(
        Scratch.Cast.toNumber(args.X),
        Scratch.Cast.toNumber(args.Y),
        Scratch.Cast.toNumber(args.Z)
      );
      passEncoder.end();
      this.device.queue.submit([commandEncoder.finish()]);

      this.device.popErrorScope().then((error) => {
        if (error)
          this.throwError(
            "UnclassifiedRuntimeErrorOOM",
            error.message,
            "RunShaderBlock",
            error,
            util
          );
      });
      this.device.popErrorScope().then((error) => {
        if (error)
          this.throwError(
            "UnclassifiedRuntimeError",
            error.message,
            "RunShaderBlock",
            error,
            util
          );
      });
      this.device.popErrorScope().then((error) => {
        if (error)
          this.throwError(
            "UnclassifiedRuntimeError",
            error.message,
            "RunShaderBlock",
            error,
            util
          );
      });
      //console.log("yay the function ran without errors =D")
    }

    compileHat(args, util) {}

    getVar(args, util) {
      return "This block lets you get variables in your shader.";
    }

    declareVar(args, util) {}

    varOp(args, util) {}

    wgslFunc(args, util) {
      return "This block has a bunch of WGSL builtin functions.";
    }

    funcArgs(args, util) {
      return "Chain multiple of this block together to create function inputs.";
    }

    computeFunc(args, util) {}

    wgslForLoop(args, util) {}

    defFunc(args, util) {}

    defFuncArgs(args, util) {
      return "This is used to add arguments to your functions.";
    }

    getFuncArg(args, util) {
      return "Use this block to get the value of an argument you defined using the def function arg block.";
    }

    funcReturn(args, util) {}

    c_runFunc(args, util) {}

    r_runFunc(args, util) {
      return "This block will run a given function and return the output.";
    }

    gpuFuncArgDef(args, util) {
      return "This is used to add input arguments to your shaders.";
    }

    bindInput(args, util) {}

    typeConstructor(args, util) {
      return "This block lets you constructor types. You can put this block inside of itself(with a base type at the end) to create complex types, for example an array of vec2s of f32.";
    }

    rootType(args, util) {
      return "This can be used with the above block for a root type.";
    }

    matrixType() {
      return "This block creates a type for a matrix with the dimensions specified.";
    }

    bufferUsage(args, util) {
      /* eslint-disable-next-line --
       * Eslint doesn't like WebGPU, there's a type module for this.
       */
      return GPUBufferUsage[Scratch.Cast.toString(args.USAGE)] ?? 1;
      //return "This is used by the def shader arg block to define inputs. It's different from the usage in the bind input block."
    }

    variableUsage(args, util) {
      return "This block can be used in the special variable declaration block or the buffer binding usage block to describe how the variable will be used.";
    }

    indexObject(args, util) {
      return 'This block can be used to index into an array. You can modify the returned value by putting it as the variable value in the "variable (operation) (value)" block';
    }

    getProp(args, util) {
      return "This can be used to get a component from a struct, or swizzle a vector.";
    }

    constructFromType(args, util) {
      return "This block is used to create something out of whatever type you defined.";
    }

    createBuffer(args, util) {
      this.device.pushErrorScope("validation");
      this.device.pushErrorScope("internal");
      this.device.pushErrorScope("out-of-memory");
      // currentBindGroupLayout =
      resources.buffers[Scratch.Cast.toString(args.NAME)] =
        this.device.createBuffer({
          label: Scratch.Cast.toString(args.NAME),
          size: Scratch.Cast.toNumber(args.SIZE),
          usage: Scratch.Cast.toNumber(args.USAGE),
        });
      this.device.popErrorScope().then((error) => {
        if (error)
          this.throwError(
            "BufferCreationErrorOOM",
            error.message,
            "BufferCreation",
            error,
            util
          );
      });
      this.device.popErrorScope().then((error) => {
        if (error)
          this.throwError(
            "BufferCreationError",
            error.message,
            "BufferCreation",
            error,
            util
          );
      });
      this.device.popErrorScope().then((error) => {
        if (error)
          this.throwError(
            "BufferCreationError",
            error.message,
            "BufferCreation",
            error,
            util
          );
      });
    }

    createBindGroupLayout(args, util) {
      // thanks to cst1229 for this section <3
      if (util.stackFrame.blockRanOnce) {
        this.device.pushErrorScope("validation");
        this.device.pushErrorScope("internal");
        this.device.pushErrorScope("out-of-memory");
        resources.bindGroupLayouts[Scratch.Cast.toString(args.NAME)] =
          this.device.createBindGroupLayout({
            entries:
              resources.bindGroupLayouts[Scratch.Cast.toString(args.NAME)],
            label: Scratch.Cast.toString(args.NAME),
          });
        this.device.popErrorScope().then((error) => {
          if (error)
            this.throwError(
              "BindGroupLayoutCreationErrorOOM",
              error.message,
              "BindGroupLayoutCreation",
              error,
              util
            );
        });
        this.device.popErrorScope().then((error) => {
          if (error)
            this.throwError(
              "BindGroupLayoutCreationError",
              error.message,
              "BindGroupLayoutCreation",
              error,
              util
            );
        });
        this.device.popErrorScope().then((error) => {
          if (error)
            this.throwError(
              "BindGroupLayoutCreationError",
              error.message,
              "BindGroupLayoutCreation",
              error,
              util
            );
        });
        return;
      }

      currentBindGroupLayout = Scratch.Cast.toString(args.NAME);
      resources.bindGroupLayouts[Scratch.Cast.toString(args.NAME)] = []; // temporarily store a list of entries here, things will be added to it via the bindGroupLayoutEntry block
      util.startBranch(1, true);
      util.stackFrame.blockRanOnce = true;
    }

    bindGroupLayoutEntry(args, util) {
      let parsed;
      try {
        parsed = JSON.parse(args.DESC);
        // if (!Object.prototype.hasOwnProperty.call(parsed,"type")) throw new Error("skibidi toilet ohio grimace shake rizz")
      } catch {
        this.throwError(
          "InvalidEntryDescriptor",
          "Invalid bind group layout entry descriptor!",
          "BindGroupLayoutEntryBlock",
          "The recieved descriptor for the bind group layout entry block is invalid, did you use the wrong block?",
          util
        );
        return;
      }
      let o = {
        binding: Scratch.Cast.toNumber(args.BINDING),
        // this extension only has compute shaders
        /* eslint-disable-next-line --
         * Eslint doesn't like WebGPU, there's a type module for this.
         */
        visibility: GPUShaderStage.COMPUTE,
      };
      o[args.TYPE] = parsed;
      resources.bindGroupLayouts[currentBindGroupLayout].push(o);
    }

    createBindGroup(args, util) {
      // thanks to cst1229 for this section <3

      if (util.stackFrame.blockRanOnce) {
        this.device.pushErrorScope("validation");
        this.device.pushErrorScope("internal");
        this.device.pushErrorScope("out-of-memory");
        resources.bindGroups[Scratch.Cast.toString(args.NAME)] =
          this.device.createBindGroup({
            layout:
              resources.bindGroupLayouts[Scratch.Cast.toString(args.LAYOUT)],
            entries: resources.bindGroups[Scratch.Cast.toString(args.NAME)],
            label: Scratch.Cast.toString(args.NAME),
          });
        this.device.popErrorScope().then((error) => {
          if (error)
            this.throwError(
              "BindGroupCreationErrorOOM",
              error.message,
              "BindGroupCreation",
              error,
              util
            );
        });
        this.device.popErrorScope().then((error) => {
          if (error)
            this.throwError(
              "BindGroupCreationError",
              error.message,
              "BindGroupCreation",
              error,
              util
            );
        });
        this.device.popErrorScope().then((error) => {
          if (error)
            this.throwError(
              "BindGroupCreationError",
              error.message,
              "BindGroupCreation",
              error,
              util
            );
        });
        return;
      }

      currentBindGroup = Scratch.Cast.toString(args.NAME);
      resources.bindGroups[Scratch.Cast.toString(args.NAME)] = []; // temporarily store a list of entries here, things will be added to it via the bindGroupLayoutEntry block
      util.startBranch(1, true);
      util.stackFrame.blockRanOnce = true;
    }

    bindGroupEntry(args, util) {
      const kv = {
        buffer: "buffers",
        storageTexture: "textures",
        sampler: "samplers",
      }; // bind group entry type -> resources key

      // the object to bind to that slot. buffers are freaky and need a special object
      let o;
      const type = kv[args.TYPE] ?? "buffers";
      if (
        !Object.prototype.hasOwnProperty.call(
          resources[type],
          Scratch.Cast.toString(args.RESOURCE)
        )
      ) {
        this.throwError(
          "ResourceNotFound",
          "The specified resource doesn't exist",
          "BindGroupEntryBlock",
          `Either the resource type is invalid or the provided resource name doesn't exist.`,
          util
        );
        return;
      }
      if (type == "buffers") {
        o = {
          buffer: resources.buffers[args.RESOURCE],
        };
        //console.log(o)
      } else {
        o = resources[type][args.RESOURCE];
        if (type == "textures") o = o.createView();
      }

      resources.bindGroups[currentBindGroup].push({
        binding: Scratch.Cast.toNumber(args.BINDING),
        resource: o,
      });
    }

    bufferEntryDescriptor(args, util) {
      return JSON.stringify({
        type: args.TYPE,
      });
    }

    binaryOr(args, util) {
      return Scratch.Cast.toNumber(args.A) | Scratch.Cast.toNumber(args.B);
    }

    genF32(args, util) {
      let array;
      try {
        array = JSON.parse(args.ARRAY);
      } catch {
        array = [];
      }
      resources.bufferRefs[this.getBlockId(util)] = new Float32Array(array);
      return this.getBlockId(util);
    }

    wgslWhileLoop(args, util) {}

    break(args, util) {}

    continue(args, util) {}

    writeBuffer(args, util) {
      // todo: more input types here
      if (
        !Object.prototype.hasOwnProperty.call(
          resources.buffers,
          Scratch.Cast.toString(args.BUFFER)
        )
      ) {
        this.throwError(
          "BufferNotFound",
          "The provided buffer doesn't exist",
          "ClearBuffer",
          `The buffer "${Scratch.Cast.toString(args.BUFFER)}" doesn't exist`,
          util
        );
      }
      if (
        !Object.prototype.hasOwnProperty.call(
          resources.arrayBuffers,
          Scratch.Cast.toString(args.ARRAY)
        )
      ) {
        this.throwError(
          "ArrayNotFound",
          "The provided array doesn't exist",
          "ClearBuffer",
          `The array "${Scratch.Cast.toString(args.ARRAY)}" doesn't exist`,
          util
        );
      }
      this.device.queue.writeBuffer(
        resources.buffers[Scratch.Cast.toString(args.BUFFER)],
        Scratch.Cast.toNumber(args.OFF2),
        resources.arrayBuffers[Scratch.Cast.toString(args.ARRAY)],
        Scratch.Cast.toNumber(args.OFF1),
        Scratch.Cast.toNumber(args.SIZE)
      );
    }

    copyBufferToBuffer(args, util) {
      if (
        Scratch.Cast.toNumber(args.NUMBYTES) <= 0 ||
        args.BUF1 === args.BUF2 ||
        !Object.prototype.hasOwnProperty.call(resources.buffers, args.BUF1) ||
        !Object.prototype.hasOwnProperty.call(resources.buffers, args.BUF1)
      ) {
        this.throwError(
          "InvalidInput",
          "Invalid input recieved when trying to copy data",
          "CopyDataBlock",
          "Failed to copy data between buffers, check that the buffers exist, buffer 1 isn't the same as buffer 2, and the number of bytes is more than or equal to 0",
          util
        );
        return;
      }
      const commandEncoder = this.device.createCommandEncoder({
        label: "copyBuffer encoder",
      });

      this.device.pushErrorScope("validation");
      this.device.pushErrorScope("internal");
      commandEncoder.copyBufferToBuffer(
        resources.buffers[args.BUF1],
        Scratch.Cast.toNumber(args.BUF1OFF),
        resources.buffers[args.BUF2],
        Scratch.Cast.toNumber(args.BUF2OFF),
        Scratch.Cast.toNumber(args.NUMBYTES)
      );
      this.device.popErrorScope().then((error) => {
        if (error)
          this.throwError(
            "CopyBufferToBufferError",
            error.message,
            "CopyingBufferToBuffer",
            error,
            util
          );
      });
      this.device.popErrorScope().then((error) => {
        if (error)
          this.throwError(
            "CopyBufferToBufferError",
            error.message,
            "CopyingBufferToBuffer",
            error,
            util
          );
      });
      this.device.queue.submit([commandEncoder.finish()]);
    }

    clearBuffer(args, util) {
      if (
        Scratch.Cast.toNumber(args.NUMBYTES) <= 0 &&
        Scratch.Cast.toNumber(args.NUMBYTES) !== -1
      ) {
        this.throwError(
          "InvalidInput",
          "Invalid number of bytes to clear",
          "ClearBuffer",
          `The provided number of bytes to clear, ${Scratch.Cast.toNumber(args.NUMBYTES)}, is invalid. Must be more than 0, or -1 to clear all.`
        );
      }
      if (
        !Object.prototype.hasOwnProperty.call(
          resources.buffers,
          Scratch.Cast.toString(args.BUFFER)
        )
      ) {
        this.throwError(
          "BufferNotFound",
          "The provided buffer doesn't exist",
          "ClearBuffer",
          `The buffer "${Scratch.Cast.toString(args.BUFFER)}" doesn't exist`,
          util
        );
      }
      const commandEncoder = this.device.createCommandEncoder({
        label: "clearBuffer encoder",
      });
      if (Scratch.Cast.toNumber(args.NUMBYTES) === -1) {
        commandEncoder.clearBuffer(
          resources.buffers[Scratch.Cast.toString(args.BUFFER)]
        );
      } else {
        commandEncoder.clearBuffer(
          resources.buffers[Scratch.Cast.toString(args.BUFFER)],
          Scratch.Cast.toNumber(args.OFFSET),
          Scratch.Cast.toNumber(args.NUMBYTES)
        );
      }
    }

    async readBuffer(args, util) {
      // WARNING:
      // MAY CONTAIN BAD IDEA JUICE
      // GPUMapMode.READ assumes no writing will be done
      if (
        !Object.prototype.hasOwnProperty.call(resources.buffers, args.BUFFER)
      ) {
        this.throwError(
          "BufferNotFound",
          "The buffer provided doesn't exist",
          "ReadBuffer",
          `Buffer "${args.BUFFER}" doesn't exist.`,
          util
        );
        return;
      }

      // let data = ["you done messed up"]
      this.device.pushErrorScope("validation");
      this.device.pushErrorScope("internal");
      await resources.buffers[args.BUFFER].mapAsync(
        /* eslint-disable-next-line --
         * Eslint doesn't like WebGPU, there's a type module for this.
         */
        GPUMapMode.READ
        // 0,
        // shaders[args.SHADER].inputs[Scratch.Cast.toNumber(args.BINDING)].input.size,
      );

      const copyArrayBuffer = resources.buffers[args.BUFFER]
        .getMappedRange(/*0, shaders[args.SHADER].inputs[Scratch.Cast.toNumber(args.BINDING)].input.size*/)
        .slice();
      console.log(copyArrayBuffer);
      resources.views.testview = new Float32Array(copyArrayBuffer);
      resources.buffers[args.BUFFER].unmap();
      this.device.popErrorScope().then((error) => {
        if (error)
          this.throwError(
            "BufferReadError",
            error.message,
            "ReadBuffer",
            error,
            util
          );
      });
      this.device.popErrorScope().then((error) => {
        if (error)
          this.throwError(
            "BufferReadError",
            error.message,
            "ReadBuffer",
            error,
            util
          );
      });
      resources.arrayBuffers[Scratch.Cast.toString(args.ARRAYBUFFER)] =
        copyArrayBuffer; // todo: error handling here
      // @ts-ignore
      //return JSON.stringify(Array.from(new Float32Array(data)));
    }

    error(args, util) {
      return JSON.stringify(error);
    }

    clearError() {
      error = {};
    }

    c_arbitraryWGSL() {}

    r_arbitraryWGSL() {
      return "This block allows you to add custom WGSL to your shaders.";
    }

    atomicType() {
      return "This block returns a type that can be used to declare an atomic variable.";
    }

    atomicLoad() {
      return "This block gets an atomic function";
    }

    c_atomicFunc() {}

    r_atomicFunc() {
      return "This block performs a thread safe operation on an atomic variable.";
    }

    barrier() {}

    variablePointer() {
      return "This block converts a variable to a pointer. Equivilant to *someVar in c.";
    }

    createAB(args, util) {
      resources.arrayBuffers[Scratch.Cast.toString(args.ARRAYBUFFER)] =
        new ArrayBuffer(Scratch.Cast.toNumber(args.LENGTH));
    }

    getArrayBuffers() {
      // note to self: the buffer object on view is views[key]
      // this code is bad and i hate it
      return Array.from((buffersExt?.views ?? new Map()).keys()).concat(
        Object.keys(resources.arrayBuffers)
      );
    }

    getArrayBuffersMenu() {
      // note to self: the buffer object on view is views[key]
      // this code is bad and i hate it
      const a = Array.from((buffersExt?.views ?? new Map()).keys()).concat(
        Object.keys(resources.arrayBuffers)
      );
      return a.length < 1 ? a.concat("Choose a buffer") : a;
    }

    createABView(args, util) {
      /*if (!Object.prototype.hasOwnProperty.call(resources.arrayBuffers,Scratch.Cast.toString(args.ARRAYBUFFER))) {
                this.throwError("ArrayBufferNotFound", "Couldn't find array buffer", "CreateArrayBufferView", "The specified array buffer to view doesn't exist")
            }*/
      if (Scratch.Cast.toString(args.NAME) == "") return; // this looks weird in the list
      resources.views[Scratch.Cast.toString(args.NAME)] =
        this.typedArrayFromType(
          Scratch.Cast.toString(args.TYPE),
          resources.arrayBuffers[Scratch.Cast.toString(args.ARRAYBUFFER)]
        );
    }

    typedArrayFromType(type, data) {
      const t = {
        Int32Array: Int32Array,
        Uint32Array: Uint32Array,
        Float32Array: Float32Array,
        Int8Array: Int8Array,
        Uint8Array: Uint8Array,
        Uint8ClampedArray: Uint8ClampedArray,
        Int16Array: Int16Array,
        Uint16Array: Uint16Array,
        BigInt64Array: BigInt64Array,
        BigUint64Array: BigUint64Array,
        Float64Array: Float64Array,
      };
      if (!Object.prototype.hasOwnProperty.call(t, type)) type = "Int32Array";
      if (data) return new t[type](data);
      return new t[type]();
    }

    listABs() {
      return JSON.stringify(this.getArrayBuffers());
    }

    listViews() {
      return JSON.stringify(
        Array.from((buffersExt?.views ?? new Map()).keys()).concat(
          Object.keys(resources.views)
        )
      );
    }

    createABFromArray(args, util) {
      if (Scratch.Cast.toString(args.NAME) == "") return; // this looks weird in the list
      let j;
      try {
        j = JSON.parse(args.ARRAY);
        if (!Array.isArray(j)) throw new Error("skibidi toilet ohio rizz");
      } catch {
        this.throwError(
          "InvalidArray",
          "The provided array is invalid",
          "CreateArrayBufferFromArrayBlock",
          "The provided array is invalid, or isn't an array.",
          util
        );
      }
      const ta = this.typedArrayFromType(Scratch.Cast.toString(args.TYPE), j);
      resources.arrayBuffers[Scratch.Cast.toString(args.ARRAYBUFFER)] =
        ta.buffer;
      resources.views[Scratch.Cast.toString(args.ARRAYBUFFER)] = ta;
    }

    deleteAB(args, util) {
      if (
        Object.prototype.hasOwnProperty.call(
          resources.arrayBuffers,
          Scratch.Cast.toString(args.ARRAYBUFFER)
        )
      ) {
        delete resources.arrayBuffers[Scratch.Cast.toString(args.ARRAYBUFFER)];
      } else {
        this.throwError(
          "ArrayBufferNotFound",
          "Array buffer not found",
          "DeleteArrayBufferBlock",
          "The specified array buffer doesn't exist",
          util
        );
      }
    }

    resizeAB(args, util) {
      if (
        Object.prototype.hasOwnProperty.call(
          resources.arrayBuffers,
          Scratch.Cast.toString(args.ARRAYBUFFER)
        )
      ) {
        resources.arrayBuffers[Scratch.Cast.toString(args.ARRAYBUFFER)].resize(
          Scratch.Cast.toNumber(args.SIZE)
        );
      } else {
        this.throwError(
          "ArrayBufferNotFound",
          "Array buffer not found",
          "ResizeArrayBufferBlock",
          "The specified array buffer doesn't exist",
          util
        );
      }
    }

    deleteView(args, util) {
      if (
        Object.prototype.hasOwnProperty.call(
          resources.views,
          Scratch.Cast.toString(args.VIEW)
        )
      ) {
        delete resources.views[Scratch.Cast.toString(args.VIEW)];
      } else {
        this.throwError(
          "ViewNotFound",
          "View not found",
          "DeleteViewBlock",
          "The specified view doesn't exist",
          util
        );
      }
    }

    setItemInView(args, util) {
      if (
        Object.prototype.hasOwnProperty.call(
          resources.views,
          Scratch.Cast.toString(args.VIEW)
        )
      ) {
        resources.views[Scratch.Cast.toString(args.VIEW)][
          Scratch.Cast.toNumber(args.INDEX)
        ] = Scratch.Cast.toNumber(args.VALUE);
      } else {
        console.log("aaaaa");
        this.throwError(
          "ViewNotFound",
          "View not found",
          "SetItemInViewBlock",
          "The specified view doesn't exist",
          util
        );
      }
    }

    setView(args, util) {
      let j;
      try {
        j = JSON.parse(args.ARRAY);
        if (!Array.isArray(j))
          throw new Error("balkan rage winter arc jonkler trollge phonk");
      } catch {
        this.throwError(
          "InvalidArray",
          "The provided array is invalid",
          "SetViewBlock",
          "The provided array is invalid, or isn't an array.",
          util
        );
      }

      if (
        Object.prototype.hasOwnProperty.call(
          resources.views,
          Scratch.Cast.toString(args.VIEW)
        )
      ) {
        resources.views[Scratch.Cast.toString(args.VIEW)].set(
          j,
          Scratch.Cast.toNumber(args.INDEX)
        );
      } else {
        this.throwError(
          "ViewNotFound",
          "View not found",
          "SetViewBlock",
          "The specified view doesn't exist",
          util
        );
      }
    }

    fillView(args, util) {
      if (
        Object.prototype.hasOwnProperty.call(
          resources.views,
          Scratch.Cast.toString(args.VIEW)
        )
      ) {
        resources.views[Scratch.Cast.toString(args.VIEW)].fill(
          Scratch.Cast.toNumber(args.VALUE),
          Scratch.Cast.toNumber(args.START),
          Scratch.Cast.toNumber(args.END)
        );
      } else {
        this.throwError(
          "ViewNotFound",
          "View not found",
          "FillViewBlock",
          "The specified view doesn't exist",
          util
        );
      }
    }

    itemOfView(args, util) {
      if (
        Object.prototype.hasOwnProperty.call(
          resources.views,
          Scratch.Cast.toString(args.VIEW)
        )
      ) {
        return resources.views[Scratch.Cast.toString(args.VIEW)][
          Scratch.Cast.toNumber(args.INDEX)
        ];
      } else {
        return "";
      }
    }

    sliceView(args, util) {
      if (
        Object.prototype.hasOwnProperty.call(
          resources.views,
          Scratch.Cast.toString(args.VIEW)
        )
      ) {
        const a = Array.from(
          resources.views[Scratch.Cast.toString(args.VIEW)].slice(
            Scratch.Cast.toNumber(args.START),
            Scratch.Cast.toNumber(args.END)
          )
        );
        console.log(a);
        return JSON.stringify(a);
      } else {
        return "";
      }
    }

    viewToArray(args, util) {
      if (
        Object.prototype.hasOwnProperty.call(
          resources.views,
          Scratch.Cast.toString(args.VIEW)
        )
      ) {
        return JSON.stringify(
          Array.from(resources.views[Scratch.Cast.toString(args.VIEW)])
        );
      } else {
        return "";
      }
    }

    propFromView(args, util) {
      if (
        Object.prototype.hasOwnProperty.call(
          resources.views,
          Scratch.Cast.toString(args.VIEW)
        )
      ) {
        return resources.views[Scratch.Cast.toString(args.VIEW)][
          Scratch.Cast.toString(args.PROP)
        ];
      } else {
        return "";
      }
    }

    createTexture(args, util) {
      resources.textures[Scratch.Cast.toString(args.NAME)] =
        this.device.createTexture({
          size: [
            Scratch.Cast.toNumber(args.WIDTH),
            Scratch.Cast.toNumber(args.HEIGHT),
          ],
          // @ts-expect-error
          format: Scratch.Cast.toString(args.FORMAT),
          usage: Scratch.Cast.toNumber(args.USAGE),
          label: Scratch.Cast.toString(args.NAME),
        });
    }

    textureUsage(args, util) {
      /* eslint-disable-next-line --
       * Eslint doesn't like WebGPU, there's a type module for this.
       */
      return GPUTextureUsage[Scratch.Cast.toString(args.USAGE)];
    }

    /**
     *
     * @param {import("scratch-render").SVGSkin | import("scratch-render").BitmapSkin} skin
     */
    skinToArray(skin) {
      // https://stackoverflow.com/a/18804153/20805087
      // i was going to add support for the pen+ texture library but
      skin.updateSilhouette();
      console.log(skin._silhouette._colorData);
      return skin._silhouette._colorData;
    }

    /**
     *
     * @param {*} args
     * @param {import("scratch-vm").BlockUtility} util
     */
    writeTexture(args, util) {
      let textureData;
      // if (penPlus) {
      //  todo: error handling here and adding pen+ costume library support
      // }
      const i = util.target.getCostumeIndexByName(
        Scratch.Cast.toString(args.IMAGE)
      );
      if (i !== -1) {
        // not using the properties that are causing stupid errors so who cares

        textureData = this.skinToArray(
          // @ts-ignore
          vm.renderer._allSkins[util.target.sprite.costumes[i].skinId]
        );
        //textureData = util.target.sprite.costumes[i].asset.data
        //console.log(util.target.sprite.costumes[i].asset.data)
      } else {
        throw new Error("Texture missing - " + args.IMAGE);
      }
      const t = resources.textures[Scratch.Cast.toString(args.TEXTURE)];
      console.log(
        {
          texture: t,
        },
        textureData,
        { bytesPerRow: this.bytesFromFormat(t.format) * t.width }, // get the number of bytes per pixel, multiplied by the width of the row.
        { width: t.width, height: t.height }
      );
      this.device.queue.writeTexture(
        {
          texture: t,
        },
        textureData,
        { bytesPerRow: this.bytesFromFormat(t.format) * t.width }, // get the number of bytes per pixel, multiplied by the width of the row.
        { width: t.width, height: t.height }
      );
    }

    getImageList() {
      return vm.editingTarget.sprite.costumes.map((v) => v.name);
    }

    createSampler(args, util) {
      resources.samplers[Scratch.Cast.toString(args.NAME)] =
        this.device.createSampler({
          // @ts-expect-error
          addressModeU: Scratch.Cast.toString(args.UMODE),
          // @ts-expect-error
          addressModeV: Scratch.Cast.toString(args.VMODE),
          // @ts-expect-error
          magFilter: Scratch.Cast.toString(args.MAGFILTER),
        });
    }

    bytesFromFormat(format) {
      // returns the bytes per pixel of a given format
      return {
        r8unorm: 1,
        r8norm: 1,
        r8uint: 1,
        r8int: 1,
        r16uint: 2,
        r16sint: 2,
        r16float: 2,
        rg8unorm: 2,
        rg8snorm: 2,
        rg8uint: 2,
        rg8sint: 2,
        r32uint: 4,
        r32sint: 4,
        r32float: 4,
        rg16uint: 4,
        rg16sint: 4,
        rg16float: 4,
        rgba8unorm: 4,
        "rgba8unorm-srgb": 4,
        rgba8snorm: 4,
        rgba8uint: 4,
        bgra8unorm: 4,
        "bgra8unorm-srgb": 4,
        rgba10a2unorm: 4,
        rg11b10ufloat: 4,
        rgba9e5ufloat: 4,
        rg32uint: 8,
        rg32sint: 8,
        rg32float: 8,
        rgba16uint: 8,
        rgba16sint: 8,
        rgba16float: 8,
        rgba32uint: 16,
        rgba32sint: 16,
        rgba32float: 16,
      }[format];
    }

    textureType() {
      return "This block allows you to add texture types to your shaders";
    }

    samplerType() {
      return "This block allows you to add sampler types to your shaders";
    }

    textureEntryDescriptor(args, util) {
      return JSON.stringify({
        access: Scratch.Cast.toString(args.TYPE),
        format: Scratch.Cast.toString(args.FORMAT),
      });
    }

    samplerEntryDescriptor(args, util) {
      return JSON.stringify({
        samplerType: Scratch.Cast.toString(args.TYPE),
      });
    }

    copyTextureToBuffer(args, util) {
      const commandEncoder = this.device.createCommandEncoder({
        label: "copyTextureToBuffer encoder",
      });

      commandEncoder.copyTextureToBuffer(
        {
          texture: resources.textures[Scratch.Cast.toString(args.TEXTURE)],
          // todo: origin here
        },
        {
          buffer: resources.buffers[Scratch.Cast.toString(args.BUFFER)],
        },
        {
          width: Scratch.Cast.toNumber(args.WIDTH),
          height: Scratch.Cast.toNumber(args.HEIGHT),
        }
      );

      this.device.queue.submit([commandEncoder.finish()]);
    }

    declareStruct() {
      return;
    }
    structProperty() {
      return;
    }
    structType() {
      return "This block lets you use a struct as a type.";
    }
  }
  // @ts-ignore
  Scratch.extensions.register(new GPUSb3());
})(Scratch);
