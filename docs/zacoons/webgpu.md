# Web GPU

This extension allows you to access Web GPU functionality. As you would imagine from Scratch, there are some limitations. So if you actually want to write something useful just use JavaScript lol. (Or even better, use CUDA or OpenCL) See the MDN docs' [Basic compute pipeline](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API#basic_compute_pipeline) for a JavaScript example.

As of writing this, Web GPU is an experimental feature. See the [browser compatibility table](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API#browser_compatibility) to see if it is supported by your browser.

## Blocks

```scratch
<🗲 init GPU :: #00cc77>
```

Gets access to the GPU device and compiles the shader modules. This block must come before you do anything with the GPU.

Returns whether Web GPU is supported on the browser or not.

### Bind Group Layouts

Bind group layouts describe how data will be given to a bind group. See the section on bind groups for more information.

---

```scratch
🔗? new bind group layout :: #00cc77
```

Opens a new bind group layout for configuration.

---

```scratch
🔗? add entry with type (uniform v) to bind group layout :: #00cc77
```

Adds an input slot to the bind group layout with the given type.

---

```scratch
(🔗? create bind group layout :: #00cc77)
```

Once you're done with configuration use this block to create the bind group layout and return it as a variable.

### Pipeline Layouts

Similar to bind group layouts, pipeline layouts describe how data will be given to a pipeline. See the section on pipelines for more information.

---

```scratch
||? new pipeline layout :: #00cc77
```

Opens a new pipeline layout for configuration.

---

```scratch
||? add bind group layout (my bind group layout) to pipeline layout :: #00cc77
```

Adds an input slot to the pipeline layout.

---

```scratch
(||? create pipeline layout :: #00cc77)
```

Once you're done with configuration use this block to create the pipeline layout and return it as a variable.

### Buffers

```scratch
(⋯ create buffer with size [4] and usage (⋯ usage (UNIFORM v) :: #00cc77) :: #00cc77)
```

Creates a buffer with the specified size in bytes and usage.

Currently this extension only supports float32 buffers. Since a single float32 is 4 bytes, the size should be `4 * length_of_array`.

See the [GPUBuffer usage table](https://developer.mozilla.org/en-US/docs/Web/API/GPUBuffer/usage#value) for more information on the usage input.

---

```scratch
(⋯ read buffer (my buffer) to list (my list v) :: #00cc77)
```

Dumps the contents of the GPU buffer into a Scratch list.

### Bind Groups

```scratch
🔗 new bind group with layout (my bind group layout) :: #00cc77
```

Opens a new bind group for configuration with the specified layout.

A bind group allows you to bind data to the GPU.

---

```scratch
🔗 add buffer (my buffer) to bind group :: #00cc77
```

Adds a buffer to the bind group for access by the GPU.

---

```scratch
(🔗 create bind group :: #00cc77)
```

Once you're done with configuration use this block to create the bind group and return it as a variable.

### Pipelines

```scratch
(|| create compute pipeline with layout (my pipeline layout) and module (my module v) :: #00cc77)
```

Creates a pipeline with the specified pipeline layout and module.

A pipeline describes the series of `layout <-> module` ties which the GPU will execute when it calls this pipeline.

### Modules

A module is the shader code which the GPU will run on each thread. Providing a nice interface for writing this code in Scratch is difficult, but I did the best I could.

Modules are written in comments like so and can be accessed using their names:

```
 ________________________
|name: my module        |
|                       |
|fn main(){             |
|  // ...               |
|}                      |
|_______________________|
```

Any comment starting with `name: ...` is included as a module.

### Command Buffers

```scratch
🗍 new command buffer :: #00cc77
```

Opens a new command buffer for configuration.

A command buffer is the series of steps the GPU will execute when it runs the command buffer.

---

```scratch
🗍 begin compute pipeline (my pipeline) :: #00cc77
```

Opens a new pipeline step on the command buffer for configuration.

---

```scratch
🗍 set bind group [0] to (my bind group) on compute pipeline :: #00cc77
```

Adds an actual bind group to the active pipeline at the specified bind group index.

---

```scratch
🗍 dispatch compute pipeline with dimensions [1] [1] [1] :: #00cc77
```

Once you're done with configuration use this block to finish the pipeline step and add it to the command buffer.

Dimensions specifies the number of workgroups the GPU will run. This can be up to three dimensions which is useful for something like matrix multiplication where you need to index a two dimensional array.

---

```scratch
🗍 copy buffer (my buffer 1) to buffer (my buffer 2) :: #00cc77
```

Copies one GPU buffer to another. This is required for getting data from the GPU because you need an internal storage buffer which data is written to on the GPU, and then another buffer which can be read from the CPU.

---

```scratch
🗍 create command buffer :: #00cc77
```

Once you're done with configuration use this block to create the command buffer and return it as variable.

### Device Queues

A device queue is the final step in running code on the GPU. It is responsible for launching command buffers.