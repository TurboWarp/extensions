# Simple 3D

## Table of contents
1. [What is this](#description)
2. [How it works](#main-concepts)
3. [Drawing things](#simple-drawing)
4. [Setting up transformations](#transformations)
5. [Order in which different steps are performed](#step-order)
6. [Blocks](#blocks)
6.1. [Clearing](#blocks-clearing)
6.2. [Meshes](#blocks-meshes)
6.3. [Textures](#blocks-textures)
6.4. [Text measurement](#blocks-text-measurement)
6.5. [View transformations](#blocks-view-transformations)
6.6. [Manual transformations](#blocks-manual-transformations)
6.7. [Rendering into textures](#blocks-rendertargets)
6.8. [Tinting and fog](#blocks-tinting-fog)
6.9. [Resolution changes](#blocks-resolution)


## What is this <a name="description"></a>
**Simple 3D** is an extension by [Vadik1](https://scratch.mit.edu/users/Vadik1) meant to enable creation of GPU accelerated 3D projects. It's is not designed for making graphically complex 3D projects (for that, see upcoming Pen+ v7 and WebGL 2 extensions, both with programmable shaders) and instead it's main focus is allowing people to create 3D projects easily and quickly. Nevertheless, despite lack of programmable shaders, it is still quite powerful. It covers the wide range of usages from something as high level as making an AR project in less than 20 blocks with models loaded from OBJ files, to something more low level like doing all the calculations on CPU and streaming transformed polygons every frame (like [Pen+](https://extensions.turbowarp.org/obviousAlexC/penPlus.js)). And of course everything inbetween.

It could also be useful for making certain kinds of 2D projects, thanks to it's ability to render large quanities of similar objects with instansing (e.g particles), construct 2D meshes out of triangles, rendering into textures allowing multi-pass rendering and more advanced clipping than [Clipping &amp; Blending](https://extensions.turbowarp.org/Xeltalliv/clippingblending.js) extension. It can be used for 2D image processing that can for example later be used as costumes using [Skins](https://extensions.turbowarp.org/Lily/Skins.js) extension.

## How it works <a name="main-concepts"></a>
Scratch has a background layer, a video layer, a pen layer and a sprite layer. This extension adds another layer - simple3D between video and pen layers. High quality pen mode also affcts it.

The key concepts in this extension are the meshes and transformations.

Meshes store a 3D model data and can be drawn. They are kind of like costumes in stamp-based project. That is, if you want to make a project that draws many copies of some costume in different locations using stamps, you will only have 1 costume, store all the locations in a list in whatever format you consider appropriate, and every frame you will clear the screen and re-stamp that costume in all the locations from a list. 

It works the same way with this extension. If you have 10 identical 3D boxes, you will only create one mesh. Then every frame, first clear the screen, and after that loop over the list, for each box, setting up the correct transformation and drawing that one mesh.

So in short, **this extension doesn't have any kind of scenes, objects, cameras, etc**, you have to keep track of it yourself.

---

3D models consist of vertices which together form primitives (points, lines, triangles). Each vertex has either 2D (XY) or 3D (XYZ) location decribed with 2 or 3 numbers respectively. Before drawing the mesh, you would usually set up tranformation, which tells how to take those initial locations and transform them to correct location on your 2D screen. The typical way to do it, is to chain multiple simple transformations together. Simple transformations can be translation (ofsetting), rotation, scaling, mirroring, skewing, etc.

## Drawing things <a name="simple-drawing"></a>
For now let's not worry about transformations and just draw something as is.
First step would be to clear the screen:
```scratch
set clear color R: (0.5) G: (0.5) B: (0.5) A: (1) :: sensing
clear (color and depth v) :: sensing
```
After running that the screen should turn gray.
Now let's draw 2 triangles arranged into a rectange. First create a mesh:
```scratch
create mesh [my mesh] :: sensing
```
The create 2 lists `posX` and `posY`.
Fill `posX` with:
```
-0.9
0.9
-0.9
-0.9
0.9
0.9
```
Fill `posY` with:
```
-0.9
-0.9
0.9
0.9
-0.9
0.9
```
then set mesh's positions to it:
```scratch
set [my mesh] positions XY [posX v] [posY v] :: sensing
```
and finally draw it:
```scratch
draw [my mesh] :: sensing
```
The result should look something like this:
![white rectangle on gray background](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAloAAAHEAgMAAACcsWzXAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV/TSkUqImYQcchQnSyCiohTrUIRKoRaoVUH89EvaNKQpLg4Cq4FBz8Wqw4uzro6uAqC4AeIs4OToouU+L+k0CLGg+N+vLv3uHsHcI2KolmhOKDptplOJoRsblUIvyIEHv2YxbikWMacKKbgO77uEWDrXYxl+Z/7c/SqeUsBAgJxXDFMm3iDeHrTNhjvE/NKSVKJz4nHTLog8SPTZY/fGBdd5lgmb2bS88Q8sVDsYLmDlZKpEU8RR1VNp3wu67HKeIuxVqkprXuyF0by+soy02kOI4lFLEGEABk1lFGBjRitOikW0rSf8PEPuX6RXDK5ylDIsYAqNEiuH+wPfndrFSYnvKRIAuh6cZyPESC8CzTrjvN97DjNEyD4DFzpbX+1Acx8kl5va9EjoG8buLhua/IecLkDDD4Zkim5UpAmVygA72f0TTlg4BboWfN6a+3j9AHIUFepG+DgEBgtUva6z7u7O3v790yrvx8KVHLj7WPAsgAAAAlQTFRFNDQ0gICA////76SQuwAAAAlwSFlzAAAYTAAAGHQBn6hAIAAAAAd0SU1FB+gEFBIAAu2UQ3UAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABNUlEQVR42u3OUQkAIBAFsCthH0toR01pAX+FB24JVhWqjUTdy8vLy8vLy8vLy8vr99fcEZaXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5fX7RXGy8vLy8vLy8vLy8vr/SvUAWUTfy76T1mWAAAAAElFTkSuQmCC)
The screen coordinate system used by this extension isn't scratch's typical 480x360 (from -240 to 240 for X and from -180 to 180 for Y), but instead it is 2x2 (from -1 to 1 on both axis). It's the same as in WebGL and OpenGL.
Here we created triangles that have vertex coordinates at -0.9 and 0.9, which doesn't qiute reach the boundaries of the screen, even though it gets close.

Also, here we specified 6 vertices. Each tiangle has 3 vertices, so 6/3=2 it was treated as 2 triangles.
But specifying 3 vertices per each triangle is not the only way. In cases when some vertices are the same for multiple triangles, there are ways to specify once and reuse them rather than duplicating the data. There are 2 main ways to do it:

### List of indices
With this way, there is a way to create another list which will reference which vertices to use in which order. To add it to our example:
Fill `posX` with:
```
-0.9
0.9
-0.9
0.9
```
Fill `posY` with:
```
-0.9
-0.9
0.9
0.9
```
Create another list `indices` and fill it with:
```
1
2
3
3
2
4
```
Now reupload XY positions and upload the list of indices into the mesh, clear the screen and draw the mesh again. Result should look the same.
```scratch
set clear color R: (0.5) G: (0.5) B: (0.5) A: (1) :: sensing
clear (color and depth v) :: sensing
create mesh [my mesh] :: sensing
set [my mesh] positions XY [posX v] [posY v] :: sensing
set [my mesh] vertex indices [indices v] :: sensing
draw [my mesh] :: sensing
```

### Chained primitive types
Another way to do it is to switch mesh from using just "triangles" to using "triangle strips" or "triangle fans".
With triangle strip, the first 2 vertices are processed normally, and then each subsequent vertex get combined with the previous 2 into a triangle.
With triangle fan, the first 2 vertices are processed normally, and then each subsequent vertex get combined with the previous one and the first one into a triangle.
```scratch
set clear color R: (0.5) G: (0.5) B: (0.5) A: (1) :: sensing
clear (color and depth v) :: sensing
create mesh [my mesh] :: sensing
set [my mesh] positions XY [posX v] [posY v] :: sensing
set [my mesh] primitives (traingle strip v) :: sensing
draw [my mesh] :: sensing
```
Result should once again look the same.

### Primitive restart index
"triangle strips" and "triangle fans" are no doubt efficient, but when using it you only get 1 long continious thing of triangles, meaning that to draw many "strips" or "fans" you will have to call "draw mesh" many times, cancelling the efficiency.
However there is a solutions for it. You can use "triangle strips" and "triangle fans" together with list of indices. If you specify index 0 or below, it will interrupt the previous chain of triangles and restart a new one.

Same applies to "line strip" and "line loop".

## Setting up transformations <a name="transformations"></a>
The typical sequence of simple transformation for 3D project goes like this:
First you start off with having a 3D model in it's own coordinate system (model space), with all vertex positions stored relatively from it's origin. The first step would be to transform it to the world coordinate system. If the object has it's own rotation, rotate every vertex around it's origin (0,0,0) by correct amount of degrees. If it is scaled, scale them. Then once that is done, offset every vertex by object's world position. Now positions of all of the vertices are in the world coordinate system (world space).

The next step is to transfrorm them to the coordinate system relatively to the viewer, where viewer is at X:0, Y:0, Z:0 and is always facing negative Z. In 3D projects on normal scratch it is common for viewer to face positive Z, where the more Z something has, the further away it is in front of the viewer, but in case of this extension, it was designed like most software outside scratch - the **less** Z something has, the further it is in front of the viewer. To do this transformation, first subtract camera position from position of every vertex. That will place the camera in the origin of the world and make everything relatively to it, but rotation isn't taken into a count yet. To do it, rotate every point by negated/inverse camera rotation.

What you now have are 3D positions relatively to the camera. But your screen is 2D, so the last step is to do the projection. The general gist of it is that you divide all X and Y by Z, so that the further something is, the smaller it is and the closer it is to the center of the screen. And while doing that, clipping everything that goes offscreen or too close and behind you.

<details>
<summary>But in reality it's somewhat more complicated.</summary>
You first transform X, Y, Z into X, Y, Z and W of the clip space and then GPU automatically clips X, Y and Z to the rangle from -W to W, and then divides
X, Y, Z by W, so X, Y, Z end up in range from -1 to 1. Where W is the actual depth, while Z is depth converted to the correct range to be used with the
depth buffer (everything below -1 and above 1 gets clipped) (too far and too close).

If that sounded complicated, don't worry, Simple3D extension mostly handles it for you.
</details>

So let's recap:
```
when given vertex coordinates x, y, z in model space:

scale by object scale
rotate by object orientation
translate by object position

translate by negative camera position
rotate by negative camera orientation

convert to clip space

divide X,Y,Z by depth W (done by GPU, can't be controlled)
draw to the screen at X,Y. Use Z for depth check.
```

And now it's time to write some actual Simple3D scratch blocks code.
In Simple3D those transformations are combined into 1 big transformation, and all the steps have to be specified in reverse.
```scratch
start with perspective FOV (90) near (0.01) far (1000) :: sensing
rotate around [X v] by ((0) - (camRotX)) degrees :: sensing
rotate around [Y v] by ((0) - (camRotY)) degrees :: sensing
move X ((0) - (camX)) Y ((0) - (camY)) Z ((0) - (camZ)) :: sensing
move X (objectX) Y (objectY) Z (objectZ) :: sensing
rotate around [Y v] by (objectRotY) degrees :: sensing
rotate around [X v] by (objectRotX) degrees :: sensing
scale X (objectSizeX) Y (objectSizeY) Z (objectSizeZ) :: sensing
draw mesh [my mesh] :: sensing
```

Doing all of those steps again for every mesh you want to draw is inefficient. This is where doing steps in reverse becomes helpful. Combined with wrapper block, which saves the transformation when entering it, and restores it when exiting it, it is possible to do this:
```scratch
start with perspective FOV (90) near (0.01) far (1000) :: sensing
rotate around [X v] by ((0) - (camRotX)) degrees :: sensing
rotate around [Y v] by ((0) - (camRotY)) degrees :: sensing
move X ((0) - (camX)) Y ((0) - (camY)) Z ((0) - (camZ)) :: sensing
repeat (10)
wrapper {
...
move X (objectX) Y (objectY) Z (objectZ) :: sensing
rotate around [Y v] by (objectRotY) degrees :: sensing
rotate around [X v] by (objectRotX) degrees :: sensing
scale X (objectSizeX) Y (objectSizeY) Z (objectSizeZ) :: sensing
draw mesh [my mesh] :: sensing
} :: sensing
end
```
This will work and it is efficient, howerver this extension also provides advanced features like fog, instancing, billboarding, which need to intervine in some of the intermdeiate steps.
And when you create one large transformation by youself, it has no way of doing that. Which is why, currently the correct way to setup transformations is like this:
```scratch
configure [to projected from view space] transformation :: sensing
start with perspective FOV (90) near (0.01) far (1000) :: sensing

configure [to view space from world space] transformation :: sensing
rotate around [X v] by ((0) - (camRotX)) degrees :: sensing
rotate around [Y v] by ((0) - (camRotY)) degrees :: sensing
move X ((0) - (camX)) Y ((0) - (camY)) Z ((0) - (camZ)) :: sensing
repeat (10)
...
configure [to world space from model space] transformation :: sensing
move X (objectX) Y (objectY) Z (objectZ) :: sensing
rotate around [Y v] by (objectRotY) degrees :: sensing
rotate around [X v] by (objectRotX) degrees :: sensing
scale X (objectSizeX) Y (objectSizeY) Z (objectSizeZ) :: sensing
draw mesh [my mesh] :: sensing
end
```
The extension allows you to split your larget transformation into 3 separate transformations, which will be applied sequentially, allowing some of the features to do their thing inbetween.
It also allows you to easily got between different coordinate systems using those blocks:
```scratch
transform X (0) Y (0) Z (0) from [world space v] to [model space v] :: sensing
transform direction X (0) Y (0) Z (0) from [world space v] to [model space v] :: sensing
```

## Order in which different steps are performed <a name="step-order"></a>
### Vertex positions
For each vertex, the final position calculation goes as follows:
1. vertex position is read
2. skinning is applied
3. transformed from model space to world space
4. transformed by instance transform
5. transformed from world space to view space
6. transformed from veiw space to clip space
7. division of XYZ by W (performed automatically by the GPU)

When billboarding is enabled:
1. vertex position is read
2. skinning is applied
3. transformed from model space to world space
4. position is copied elsewhere, while original is replaced by (0,0,0)
5. transformed by instance transform
6. transformed from world space to view space
7. saved position is added to current position
8. transformed from veiw space to clip space
9. division of XYZ by W (performed automatically by the GPU)

### Vertex colors
1. vertex color is read, white if not provided
2. multipled by instance color

### Vertex UVs
For each vertex, the UV texture coordinates at it are calculated as follows:
1. vertex UVs are read
2. scaled by instance UV scale (3rd and 4th components)
3. added instance UV offset (1st and 2nd components)
4. mesh UV offset is applied

### Pixel Colors
For each pixel, the final color calculation goes as follows:
1. texture is read or white if texture isn't provided
2. multipled by interpolated vertex color RGBA
3. alpha threshold check is performed
4. make opaque is applied
5. multipled by global color multipler
6. added global color adder
7. fog is aplied


## Blocks <a name="blocks"></a>
### Clearing <a name="blocks-clearing"></a>
```scratch
reset everything :: sensing
```
Resets everything to the initial state as if the extension was freshly loaded. It also deletes meshes and shader cache.

---
```scratch
clear (color and depth v) :: sensing
```
Clears the color and/or depth of the selected render target

---
```scratch
set clear color R:(0.5) G:(0.5) B:(0.5) A:(1) :: sensing
```
Sets clear color to the specified Red, Green, Blue and Alpha (Opacity) values in range from 0 to 1.
Clear color is a global value.

---

```scratch
set depth test (closer v) write (on v) :: sensing
```
Before new pixel is drawn, it's depth is compared to the pixel already drawn on that location.
If it passes according to the check in the first argument of this block, it gets drawn. If it fails, it gets discarded, and whatever was there remains there.
The second argument controls when check passes whether only color should be updated or both color and depth value. Turning this off can be useful for drawing transparent things, which should react to already drawn opaque things, while not modifying depth to not interfer with one another.
**Depth test and write are values that are saved separately for each render target.**
All 6 sides of the cube texture share those values.

For stage, default values are "closer" and "on". **However, for textures used as render targets default values are "everything" and "off".** Memory for storing depth isn't even allocated until depth write is set to "on".


### Meshes <a name="blocks-meshes"></a>
```scratch
(all meshes :: sensing)
```
Lists all the mesh names separated by commas. Mainly meant to be used manually for debugging purposes.

---
```scratch
create mesh [my mesh] :: sensing
```
Creates an empty mesh with the specified name. If mesh with such name already exists, the old one gets fully deleted first.

---
```scratch
delete mesh [my mesh] :: sensing
```
Deletes mesh with the specified name.

---
```scratch
make mesh [my mesh 3] inherit from meshes [my mesh 1,my mesh 2] :: sensing
```
Sets up the first mesh to inherit any lists or properties from multiple other meshes. 
If multiple other meshes has the same property, the last one takes the priority.
If any of the specified meshes to inherit form a cyclic dependancy, the whole operation fails.
Names are provided in a comma separated list. Mesh names are trimmed from spaces on both ends. So `my mesh 1,my mesh 2`, `my mesh 1, my mesh 2`, and `    my mesh 1    ,   my mesh 2   ` will all behave the same.

This is the a key feature meant to avoid data duplication. When using it, nothing that could be expensive is duplicated.
**Use this instead of uploading the same lists or textures into multiple different meshes.**
You can even rapidly change what meshes are inherited while the project is running.

---
```scratch
(mesh [my mesh] [inherits from v] :: sensing)
```
Used to obtain properties of a mesh.

---
```scratch
set [my mesh] vertex indices [list v] :: sensing
```
An optional mesh list used to provide the order in which vertices are read and used to construct primitives.
Starts from 1. Specifying value 0 or below can be used to break up "triangle strip", "traingle fan", "line strip" and "line loop" into multiple ones.

---
```scratch
set [my mesh] positions XY [listX v] [listY v] :: sensing
set [my mesh] positions XYZ [listX v] [listY v] [listZ v] :: sensing
```
Used to upload vertex positions into the mesh.
**The only mandatory list for mesh to become drawable.**

---
```scratch
set [my mesh] colors RGB [listR v] [listG v] [listB v] :: sensing
set [my mesh] colors RGBA [listR v] [listG v] [listB v] [listA v] :: sensing
```
Used to upload vertex colors (as red, green, blue and alpha) into the mesh.
Values mush be integers in range between 0 and 255.

---
```scratch
set [my mesh] texture coordinates UV [listU v] [listV v] :: sensing
set [my mesh] texture coordinates UVW [listU v] [listV v] [listW v] :: sensing
```
Used to upload texture coordinates into the mesh.
The 2 component one is used for 2D textures. Specifies 2D coordinates on a texture, which go from 0 to 1. But values outside of those bounds are also valid and useful.
The 3 component one is used for cube textures (cubemaps). Specifies 3D direction from the center, which will be intersected with the cube around it.
If texture coordinates are specified, but texture isn't, the default texture is used.

---
```scratch
set [my mesh] texture () [clamp to edge v] [pixelated v] :: sensing
set [my mesh] cube texture [X+] () [clamp to edge v] [pixelated v] :: sensing
```
Used to upload texture into the mesh.
Calling this block depending on the type of texture used either uploads texture instantly (e.g. empty or text) or schedules texture to be uploaded into the mesh some time in the future (e.g. load from url or from costume).
**So if for example you upload texture from a costume and immediately try to draw this mesh once, you will not see it. It takes time to load!**

Use the block below to check if the texture has finished loading.
```scratch
(mesh [my mesh] [texture is loading v] :: sensing)
```

The 2nd(3rd) argument controls what happens when UV coordinates are out of 0..1 range:
 - `clamp to edge` - will find the closest point within allowed range and use color of that. This basically infinitely stretches edges of the texture.
 - `repeat` - the texture is repeated out of bounds. UV 1.5 0.6 is the same as 13.5 -0.4

The 3rd(4th) argument controls how each pixel obtains the color from the texture:
 - `pixelated` - rounds down UV to the coordinates the closest pixel and gets it's color
 - `blurred` - takes a weighted average between 4 pixels UV falls inbetween

The 1st argument in cube texture controls to which of 6 sides the texture should be uploaded. It must be square and the same size as all other sides.
Uploading non-matching size will cause all other sides to clear themselves.
Uploading non-square size texture will fail and do nothing.

The type of texture that the mesh will have can only be set once. If the mesh has cube texture, trying to replace it with the 2D texture will fail. If the mesh has 2D texture, trying to replace it with the cube texture will also fail.

---
```scratch
set [my mesh] texture mipmapping [off v] :: sensing
```
Used for enabling and disabling mipmapping.
When enabling, regenerates mipmaps.
When mipmapping is enabled, uploading textures regenerates mipmaps as well.

Mipmapping is a technique of having texture in multiple different resolutions (mipmaps) and whenever something is either far away or viewed at a steep angle, switching to using lower resolution version of the textures.
It help eliminate pixel shimmering and with high resolutions, can also improve performance (low resolution versions of textures can fit in GPU cache, allowing far away geometry to be drawn very quickly).

Default for mesh is "off".

---
```scratch
set [my mesh] texture anisotropic filtering (16 v) :: sensing
```
Used for setting anisotropic filtering.
1 is no anisotropic filtering.
16 is maximum.
**It isn't supported on all GPUs! Maximum value also varies depending on GPU.**
Always setting it to 16, regardless of whether it is supported or what values are supported is still totally fine. Performance on underpowered devices that support it will no be fine though. So adding a toggle is a good idea.

Default for mesh 1.

---
```scratch
set [my mesh] bone indices [listIndices v] weights [listWeights v] count per vertex (3) :: sensing
```
Used for setting bone indices and weights.
Count per vertex must be in range between 1 and 4.
Indices start from 1.
Weights aren't used when count per vertex is 1.
Length of supplied indices and weights lists have to match and be divisible by "count per vertex".

---
```scratch
set [my mesh] [original v] transforms [listTransforms v] :: sensing
```
Used for setting original and current transforms of each bone.
Transforms on how to get from original to current will be calculated and applied to vertices based on their bone indices and weights.
Supplied list of transforms must have length divisible by 16. If not, operation fails.
When setting one of the transforms, while the other one isn't defined or has different length, the one being set will be set to both.

---
```scratch
set [my mesh] instance [transfroms v] [list v] :: sensing
```
Used for setting data for instancing: drawing the same mesh many times (can be over a million) in multiple locations.

Only one in each of the following 3 catergories is allowed. Setting another one replaces the old one.

Positioning:
 - `transforms` - a list of transforms, with total length divisible by 16.
 - `XY positions` - a list of interleaved X and Y positions, with total length divisible by 2.
 - `XYZ positions` - a list of interleaved X, Y and Z positions, with total length divisible by 3.
 - `XYZ positions and sizes` - a list of interleaved X, Y, Z positions and sizes, with total length divisible by 4.

Colors:
 - `RGB colors` - a list of interleaved red, green and blue color components, with total length divisible by 3.
 - `RGBA colors` - a list of interleaved red, green, blue and alpha color components, with total length divisible by 4.

Texture coordinates:
 - `UV offsets` - a list of interleaved U and V texture coordinate offsets, with total length divisible by 2.
 - `UV offsets and sizes` - a list of interleaved U, V texture coordinate offsets and U, V texture coordinate scaling factors, with total length divisible by 4.

Setting positioning is required for instancing to activate.

All defined catergories have to have data for the same amount of instances. If the amount of instances inferred from the length of those lists do not match, mesh isn't valid for drawing and can't be drawn.

---
```scratch
set [my mesh] list update offset (1) :: sensing
```
Allows partially updating mesh data instead of fully reuploading.

Starts from 1.
Having it set to 1 or above enables partial update mode.
Having it set to 0 or below disables partial update mode and makes lists update fully.
In partial update mode you can only update existing data. If your new data is too long and goes out of bounds of what is already set for the mesh, the operation will fail.
**If you accidentally enabled it and want to disable it, set it to 0, not 1!**
That is because while both update list from the start, when you have it at 1, partial update mode is enabled and you can't resize the data. If you try to upload more it will fail. If you try to upload less, the end will remain unchanged.

**This is one of 2 properties that is not inherited.** This is done for performance reasons and to reduce chances of misuse.

**If you need to update data fully, don't use partial update mode at offset 1 to "save memory". It only makes things worse.** Only use it when you need to update only relatively a small section of data.

Default for mesh is 0.

---
```scratch
set [my mesh] optimize next uploaded lists for being [rarely v] updated :: sensing
```
Used for hinting GPU driver on how the data should be prepared. Different GPU drivers will handle it differently.

Usually you create mesh, set static data once, then toggle this to one of the frequent modes and start updating some that frequent data.
If you suddenly need to update static data again, don't forget to temporarily switch it to "rarely", before setting that data.

This only affects vertex related data. It doesn't affect uploading texture pixel data from a list.

**This is one of 2 properties that is not inherited.** This is done for performance reasons and to reduce chances of misuse.

Deafult for mesh is "rarely".

---
```scratch
set [my mesh] from [.obj .mtl v] [list v] :: sensing
```
Decodes a 3D model file and uploads it into a mesh. Block continues instantly, but the upload finishes with a delay using a separate thread.
File formats:
 - [obj](https://en.wikipedia.org/wiki/Wavefront_.obj_file) file format doesn't have a standartized way to do vertex colors. This block implements a non-standart way used in Blender.
 - [off](https://en.wikipedia.org/wiki/OFF_(file_format)) file format is quite neat for scratch as it supports both vertex and face colors and is even simpler than obj.

Imported model is affected by transformation set with:
```scratch
configure [importing from file v] transformation :: sensing
```

---
```scratch
set [my mesh] primitives (points v) :: sensing
```
Used for changing the way vertices are assembled into primitives.
- With triangles, vertices are grouped by 3 into triangles.
- With triangle strip, the first 2 vertices are processed without anything, and then each subsequent vertex get combined with the previous 2 into a triangle.
- With triangle fan, the first 2 vertices are processed without anything, and then each subsequent vertex get combined with the previous one and the first one into a triangle.
- With lines, vertices are grounded by 2 into lines.
- With line strip, the first vertiex is processed without anything, and then each subsequent vertex get combined with the previous one into a line.
- With line loop, the first vertiex is processed without anything, and then each subsequent vertex get combined with the previous one into a line and the last one gets also linked back to the first one.
- With points, each vertex turns into a point.

When using vertex indices, specifying vertex index 0 or below can be used to break up "triangle strip", "triangle fan", "line strip" and "line loop" into multiple ones.

Default for mesh is "triangles".

---
```scratch
set [my mesh] blending (default v) :: sensing
```

Used for setting how mesh will be blender with what is already drawn.

If your mesh is fully opaque, use "overwrite color (fastest for opaque)". If your mesh is transpartent instead, you can use it to draw transparent holes in an already opaque image.
Use invisible for drawing to the depth buffer.
Everything else is self-explanatory and the same as in [Clipping &amp; Blending](https://extensions.turbowarp.org/Xeltalliv/clippingblending.js) extension.

Default for mesh is "default".

---
```scratch
set [my mesh] cull (back faces v) :: sensing
```
Used for enabling/disabling backface/frontface culling. Basically making triangle visible only from one side, depening of whether their vertices appear on the screen in the clockwise or counter-clockwise order.

Deafult for mesh is "nothing".

---
```scratch
set [my mesh] discard pixels less opaque than (0.5), and for those that pass [make opaque v] :: sensing
```

Used for disacrding pixels that are below specific opacity threshold and optionally making everything opaque.

Useful for drawing text or textures of leaves, where the texture itself should be either fully opaque or fully transparent, with texture alpha being used for determining where the sharp cutoff edges should be.

Default for mesh is threshold:0 preserve opacity.

---
```scratch
set [my mesh] billboarding [on v] :: sensing
```
Used for enabling and disabling billboarding.
When billboarding is enabled, the mesh is always facing in the opposite direction to your look direction (behind you).
Note that it is not the same as turning towards your position.

Default for mesh is "off".

---
```scratch
set [my mesh] vertex draw range from (1) to (6) :: sensing
```
Used for drawing mesh partially by only drawing some range of the vertices.

Could be useful in cases where the mesh keeps changing (including amount of vertices and primitives).
For cases like that, prepare a lot of dummy vertex data in advance. Then only fill and start drawing the beginning of it.
Use partial updates to add any extra polygons after the range that is being drawn and then extend the range to include them.
To remove polygons, move the ones from the end of the drawing range to location of the remove one and then shring the drawing
range at the end.

Deafult for mesh is not set. Once set, can't be undone.

---
```scratch
set [my mesh] texture coordinate offset UV (0) (0) :: sensing
```
Used for offsetting texture UVs.
Combined with textures with "repeat" mode and timer block, this can be used to very easily create meshes with scrolling textures.

Default for mesh is 0,0.

---
```scratch
draw mesh [my mesh] :: sensing
```
Draws the specified mesh one or multiple (instancing) times, but only if it is valid.

Mesh is invalid and can't be drawn if:
 - vertex positions aren't set
 - lists that were uploaded to it imply mismatching amounts of vertices or instances

This block may cause stutter when drawing something for the first time, as it will need to generate and compile shaders.


### Textures <a name="blocks-textures"></a>
```scratch
(texture from URL [https://extensions.turbowarp.org/dango.png] :: sensing)
```
Creates texture from image at specified URL.
Will show a prompt if URL isn't approved.
🐢 Texture gets loaded with a delay.

---
```scratch
(texture from costume [costume1 v] :: sensing)
```
Creates texture from costume.
🐢 **Texture gets loaded with a delay. When doing image processing, don't attempt to load and instantly draw. It wouldn't show up!**

**Don't forget: bitmap costumes have 2x2 subpixels, which here are counted as pixels.** So don't be surprized when your seemingly 8x8 costume turns into 16x16 texture.

---
```scratch
(texture from text [Hello World!] font [italic bold 32px sans-serif] color (#ffff00) :: sensing)
(texture from text [Hello World!] font [italic bold 32px sans-serif] color (#ffff00) border (5) (#000000) :: sensing)
```
Creates texture with specified text.
⚡ Texture gets loaded instantly.
Border extends texture by it's value of pixels in all 4 directions.

---
```scratch
(texture from list [list v] at (1) of size (16) (16) :: sensing)
```
Creates texture from RGBA data in a list. Each pixel represented with list 4 elements, each in range between 0 and 255. Elements are: red, green, blue, alpha.
Note that it is not alpha, red, green, blue used by many pen projects on scratch.
⚡ Texture gets loaded instantly.

---
```scratch
(texture of size (16) (16) :: sensing)
```
Creates black texture of given size.
⚡ Texture gets loaded instantly.


### Text measurement <a name="blocks-text-measurement"></a>
```scratch
measure text [Hello World!] font [italic bold 32px sans-serif] :: sensing
(measure [up v] size ::sensing)
```
Used for measuring how the text texture was or will be generated.
Outputs 4 sizes. Sizes can be negative.


### View transformations <a name="blocks-view-transformations"></a>
```scratch
configure [to projected from view space] transformation :: sensing
```
Used for switching between which of the few transformations is currently active for editing.
Transformations `to world space from model space`, `to view space from world space`, `to projected from view space` are 3 sequential transformation used for drawing, explained at the top of this page.
Transformation `importing from file` affects how the block below works:
```scratch
set [my mesh] from [.obj .mtl v] [list v] :: sensing
```
Transformation `custom` doesn't affect anything. Use it for your own calculations.

---
```scratch
start with perspective FOV (90) near (0.01) far (1000) :: sensing
```
Overwrites currently active transformation with the viewspace to clipspace conversion transformation for perspective projection.
**Camera is assumed to be facing negative Z.**
FOV is verical field of view and it is measured in degrees.
Anything closer than "near" or further than "far" will be clipped.

Something to keep in mind is that depth buffer has limited precision.
The whole range between "near" and "far" get mapped to the whole range of depth buffer.
So, setting near and far to be close to one another makes depth more precise.
Setting near and far to vastly different value will cause Z-fighting issues caused by lack of precision.

**Another thing to keep in mind is that this block requires aspect ratio.** To not bother it's users, it was decided to make it take aspect ratio of the currently active rendering target. Most projects don't change aspect ratio while running, but if you plan to support that, recalculate this every time after getting:
```scratch
when resolution changes :: sensing hat
```

---
```scratch
start with orthographic near (0.01) far (1000) :: sensing
```
Overwrites currently active transformation with the viewspace to clipspace conversion transformation for orthographic projection.
**Camera is assumed to be facing negative Z.**
Same regarding "near", "far", and aspect ratios as the block described above.

---
```scratch
start with no transformation :: sensing
```
Overwrites currently active transformation with transformation that does nothing and keeps everything as is.

---
```scratch
start with [external source v] :: sensing
```
Overwrites currently active transformation with transformation obtained from the external source. Hidden by default. External sources can be provided by other extensions.

---
```scratch
start with saved in [list v] at (1) :: sensing
```
Overwrites currently active transformation with transformation from the list. Reads 16 values starting from the index specified by the second argument.

---
```scratch
move X (0) Y (0) Z (0) :: sensing
rotate around [X v] by (0) degrees :: sensing
scale X (1) Y (1) Z (1) :: sensing
```
Applies change to currently selected transformation

---
```scratch
wrapper {
} :: sensing
```
Saves all 5 transformations (not just currently selected) when entering, restores when exiting. For technical reasons doesn't currently restore, if the script inside called:
```
stop [this script v]
```

---
```scratch
save into [list v] at (1) :: sensing
```
Overwites 16 elements in list starting from the specified item, with the numbers representing currently selected transformation.

---
```scratch
reset transformation's [offset/rotation] :: sensing
```
Resets offset or rotation of the transformation.

Rotation without offset can be useful for transforming directions.
Offset without rotation can be useful for positioning something at the end of the long chain of transformations, but rotating it independently afterwards relatively to the world.


### Manual transformations <a name="blocks-manual-transformations"></a>
```scratch
transform X (0) Y (0) Z (0) :: sensing
```
Transforms point using currently selected transformation. It is the fastest way to transform coordinates, especially if there are a lot of them.

---
```scratch
transform X (0) Y (0) Z (0) from [world space] to [model space] :: sensing
transform direction X (0) Y (0) Z (0) from [world space] to [model space] :: sensing
```
Transforms point from specified coordinate system to another. Convenient, but slower.
Transform direction only applies rotations and doesn't apply offsets.

"projected" is pre-division clip-space coordinates.
"projected (scratch units)" does division by W and scaling to current stage size (e.g. 480x360). It can be used to determine where some point will end up on the screen with the current transformation to position sprite over it or draw something with pen.


### Rendering into textures <a name="blocks-rendertargets"></a>
```scratch
render to stage :: sensing
```
Selects simple3D layer as an active render target.

---
```scratch
render to texture of [my mesh] :: sensing
```
Selects 2D texture of specified mesh as an active render target.
Fails if there is no texture or texture isn't 2D.

---

```scratch
render to cube texture (X+ v) of [my mesh] :: sensing
```
Selects side of cube texture of specified mesh as an active render target.
Fails if there is no texture, texture isn't cube or side isn't valid.

---
```scratch
read current render target into [list v] :: sensing
```
Reads the pixel data of the current render target into the list.
There are 4 values per pixels: red, greeen, blue, alpha.
Values should be in range between 0 and 255.

Internally extension stores everything with premultiplied alpha. When reading this, it divides by alpha to restore directly respreseted colors.

---
```scratch
(render target [width v] :: sensing)
```
Allows reading properties of the current render target.


### Tinting and fog <a name="blocks-tinting-fog"></a>
```scratch
set global color [multiplier v] to R: (1) G:(1) B:(1) A:(1) :: sensing
set global color [adder v] to R: (0) G:(0) B:(0) A:(0) :: sensing
```
Allows setting up linear transformation to color.
Input color RGBA is multiplied by "multiplier" and then the "adder" values are added.
Here 0 is fully dark and 1 is full brightness. Values above 1 or below 0 will get clamped.
This is a global value. It is okay to change it many times per frame.

Deafult multiplier is R:1 G:1 B:1 A:1.
Deafult adder is R:0 G:0 B:0 A:0.

---
```scratch
turn fog (on v) :: sensing
```
Used for toggling fog on or off. Accepts a boolean argument (true or false).
This is a global value. It is okay to change it many times per frame.
Default is off.

---
```scratch
set fog color R:(1) G:(1) B:(1) :: sensing
```
Sets fog color.
Default is R:1 G:1 B:1.

---
```scratch
set fog distance near: (10) far: (100) :: sensing
```

Sets fog distance.
`Near` sets the distance at which mesh starts transition into the fog color.
`Far` sets the distance at which mesh fully finishes transitioning into the fog color.

Setting `near` to value greater than `far` results is a fog that starts close, and fades off with a distance.
Setting both arguments to the same value results in division by 0 and leads to undefined results, so avoid doing it.

Default is near:10 far:100.

---
```scratch
set fog [view space v] origin at X: (0) Y: (0) Z: (0) :: sensing
```
Specifies the center point around which the fog will be drawn.
Default is X:0 Y:0 Z:0 in view space.

### Resolution changes <a name="blocks-resolution"></a>
```scratch
when resultion changes :: sensing hat
(stage width :: sensing)
(stage height :: sensing)
```
simple3D layer automatically always matches the resolution of the pen layer (or what resolution pen layer would have if it was present, even when pen layer is missing).
That means that by default, at default stage size it is locked to 480x360, but with "High quality pen" enabled or non-default stage sizes, it can become something different.
Hat block gets triggered when that resoltion changes.
Reporter blocks report current resolution.

Technically those blocks could be workarounded by contantly checking with blocks listed below.
```scratch
render to stage :: sensing
(render target [width v] :: sensing)
(render target [height v] :: sensing)
```