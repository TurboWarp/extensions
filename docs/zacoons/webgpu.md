# WebGPU

This provides WebGPU bindings for TurboWarp. As you would imagine from using Scatch blocks to code, there are some limitations. So if you actually want to write something useful just use JavaScript lol (or even better use CUDA or OpenCL). See the [Basic compute pipeline](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API#basic_compute_pipeline) on the MDN docs for a JavaScript example.

As of writing this, WebGPU is an experimental feature. See the [browser compatibility table](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API#browser_compatibility) to check if it's supported by your browser.

## An Overview

WebGPU has five steps to running code on the GPU.

1. Write shader code which will execute on each GPU thread you launch.
2. Setup layouts for describing how your shader module expects to receive data.
3. Create buffers with the data you want to pass into the shader module.
4. Bind those buffers to the shader module.
5. Take off!

## Example

> The best teacher is example
> — _Me, Just then_

As such, let's write some code to get the square root of each number in a list of 6,400,000 numbers.

### Writing the Shader Code

Providing a nice interface for writing shader code in Scratch was difficult. I came up with the best solution I could think of, but let me know if you have better ideas.

Shader code is written in comments and can be accessed using its name.

Any comment starting with `name: ...` is included as a shader module.

```
name: get sqrt

@group(0) @binding(0)
var<storage, read_write> strg: array<f32>;

@compute @workgroup_size(256)
fn main(
    @builtin(global_invocation_id)
    global_id: vec3u
) {
    strg[global_id.x] = sqrt(strg[global_id.x]);
}
```

### Initializing the GPU

We must start with this block before doing anything on the GPU.

```scratch
<🗲 init GPU :: #00cc77>
```

It will return whether or not our browser has WebGPU support, so let's wrap it in an `if-else` block.

```scratch
if <🗲 init GPU :: #00cc77> :: #ffac1c
else
    say [Your browser doesn't support WebGPU :(] :: #9866fe
```

### Creating the Layouts

If you look back at the shader code above you'll see that our `storage` array is decorated with `@group(0)` and `@binding(0)`.

Since we have no other variables, our pipeline will need a single bind group `@group(0)` with a single entry `@binding(0)`.

First let's make a layout for the bind group.

```scratch
🔗? new bind group layout :: #00cc77
🔗? add entry with type (storage v) to bind group layout :: #00cc77
set [bgl v] to (🔗? create bind group layout :: #00cc77) :: #ff8d1b
```

Then let's make a layout for the pipeline.

```scratch
||? new pipeline layout :: #00cc77
||? add bind group layout (bgl) to pipeline layout :: #00cc77
set [pl v] to (||? create pipeline layout :: #00cc77) :: #ff8d1b
```

Now we have a bind group layout which requires one entry `@binding(0)` and a pipeline layout which requires one bind group `@group(0)`.

### Creating the Storage Buffer

Before we create the actual bind group or pipeline, we need a buffer to bind to.

```scratch
set [storageBuf v] to (⋯ create buffer with bytesize [25600000] and usage () :: #00cc77) :: #ff8d1b
```

Since we are going to be using floats we want the bytesize to be `4 * length = 4 * 6,400,000 = 25,600,000`.

As for the usage of this buffer, it will be used for three things:

1. Storage, because it needs to store the output of the GPU;
2. The destination of a copy, because it needs to have input written to it; or
3. The source of a copy, because it needs to be copied to the output buffer.

```scratch
((⋯ usage (COPY_DST v) :: #00cc77) or ((⋯ usage (STORAGE v) :: #00cc77) or (⋯ usage (COPY_SRC v) :: #00cc77) :: #16cce6) :: #16cce6)
```

As you can see, I've used the [Bitwise](https://extensions.turbowarp.org/bitwise) extension for combining the usage flags. If you don't want to use that extension, you can put `140` for the usage instead.

See the [buffer usage table](https://developer.mozilla.org/en-US/docs/Web/API/GPUBuffer/usage) on the MDN docs for more info.

### Creating the Bind Group and Pipeline

Now that we have the layouts and the buffer, we can create the actual bind group and pipeline.

```scratch
🔗 new bind group with layout (bgl) :: #00cc77
🔗 add buffer (storageBuf) to bind group :: #00cc77
set [bg v] to (🔗 create bind group :: #00cc77) :: #ff8d1b

set [p v] to (|| create pipeline with layout (pl) and module (get sqrt v) :: #00cc77) :: #ff8d1b
```

### Creating the CPU Accessible Buffer

We still need a buffer which can be accessed by CPU so we can actually read the output. We do this with the `MAP_READ` usage flag.

We can't simply read from the storage buffer because the `MAP_READ` flag can only be combined with the `COPY_DST` flag. Again, please refer to the MDN docs.

```scratch
set [outputBuf v] to (⋯ create buffer with bytesize [25600000] and usage ((⋯ usage (MAP_READ v) :: #00cc77) or (⋯ usage (COPY_DST v) :: #00cc77) :: #16cce6) :: #00cc77) :: #ff8d1b
```

If you don't want to use the Bitwise extension, you can put `9` as the usage.

### Creating the Commad Buffer

Now we need to provide a series of steps to be run on the GPU.

```scratch
🗍 new command buffer :: #00cc77
🗍|| begin pipeline (p) :: #00cc77
🗍|| set bind group [0] to (bg) on pipeline :: #00cc77
```

In the shader code above you'll see that the `main` function is decorated with `@workgroup_size(256)`. So when we dispatch the pipeline next with

```scratch
🗍|| dispatch pipeline with dimensions [25000] [1] [1] :: #00cc77
```

we are telling it to dispatch 25,000 workgroups of 256 threads each, which is `25,000 * 256 = 6,400,000` threads. That's one thread for each item in our list.

Finally, we tell it to copy the internal storage buffer to the output buffer. Then we create the command buffer.

```scratch
🗍 copy buffer (storageBuf) to buffer (outputBuf) :: #00cc77
set [cmds v] to (🗍 create command buffer :: #00cc77) :: #ff8d1b
```

### Take Off!

We still haven't actually run any code on the GPU yet. But that's about to change.

Let's begin a queue on the GPU, write some data to our storage buffer, add the command buffer, then submit the queue for execution.

```scratch
≫ new queue :: #00cc77
≫ write list (input v) with type (Float32 v) to buffer (storageBuf) :: #00cc77
≫ add command buffer (cmds) to queue :: #00cc77
≫ submit queue :: #00cc77
```

BAM! You just run code on the GPU. Now you can check the results.

```scratch
⋯ read buffer (outputBuf) to list (output v) with type (Float32 v) :: #00cc77
```
