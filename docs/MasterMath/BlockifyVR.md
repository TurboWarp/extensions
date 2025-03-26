# BlockifyVR

## Table of Contents
1. [Introduction](#Introduction)
2. [Requirements](#Requirements)
3. [Best Practices](#Best-practices)
4. [Technical Details](#Technical-details)
5. [Blocks](#blocks)
5a. [Utilities](#Utilities)
5b. [Transformations](#Transformations)
5c. [Controllers](#Controllers)
6. [Wrapping Up](#Wrapping-up)
7. [Other Resoruces](#Other-resources)

## Introduction <a name="Introduction"></a>
This is a cross-platform Virtual Reality extension. It is designed to target experiences supporting modern 6DOF (six degrees of freedom, position and rotation in all three axes) headsets with two 6DOF controllers. 
This extension is simply a framework for adding virtual reality interaction to your projects. It does not provide any systems for 3D computations or rendering. It is not a 3D engine, but it keeps track of the states of the headset and controllers for you so you don't have to.

## Requirements <a name="Requirements"></a>
This extension requires a compatible virtual reality headset to function. It's also _highly_ recommended that you have one available frequently during development for testing to ensure proper functionality and scene scale. However, it is designed to allow editing and programming on computers without a required headset.
This extension is designed to be able to function with any 3D renderer or engine, but it works best with a 3D renderer or engine that uses compatible SI units. This means meters for length and degrees for rotation. However, if your 3D systems don't have this, don't worry, we'll fix it when we get to [Transformations](#Transformations). Because of this, this extension requires that all scenes used for VR experiences be designed on the meter scale to make sure everything looks just right. This extension is considered cross-platform compatible, but as of right now it only supports:

- Oculus Quest 1, 2, 3, and Quest Pro
- Most HTC Vive headsets
- Most Windows Mixed Reality headsets.

This extension does not yet support hand tracking. This extension technically _can_ support 3DOF headsets, but both of these features are not planned unless there is enough user demand.

If you have suggestions for more features or headsets to support, please let me know. The best way to do this is on my [Scratch Profile comments](http://scratch.mit.edu/users/-MasterMath-/#comments).

## Best Practices <a name="Best-practices"></a>
Developing Virtual Reality experiences requires use of strict best practices to ensure the ideal experience for the user. As a general rule, the following list is a good set of guidelines **for optimization**:
- **Aim for 90 FPS** or higher to reduce motion sickness. BlockifyVR supports 120Hz refresh rate on supporting browsers like the Oculus Browser. 
- **Reduce draw count**:
  - Joining all static (non-moving) meshes together into one mesh for one draw call
  - Instancing large quantities of similar elements, such as particles or bullets in an FPS game
  - etc.
- **Reduce triangle count**:
  - Have a budget for the maximum number of triangles you should have in a given frame and try your best to stay under the budget.
  - Use distance-based Level-Of-Detail (LOD) systems to progressively reduce the quality of meshes that are farther away from the camera
  - Remove faces and triangles that will never be seen by the user, such as those that are intersecting with other static objects in the enviroment.
  - etc.
- **Occlusion and Frustum culling**: skip rendering of faces behind other faces and skip rendering of faces outside the camera's FOV
- Reduce complexity of shaders and effects (where applicable)
- Reduce rendering resolution / actual stage size
- **Texture management**: optimize your textures well. Merge textures of merged static meshes, and try to only load textures once. For animated textures, use UV offsets instead of setting from multiple different textures
- Foveated rendering: Reduce rendering resolution in peripheral vision. This is a technique exclusive to VR, and BlockifyVR manages this automatically internally. //TODO: This cannot be modified yet.
- Use baked (static) lighting and avoid dynamic shading as much as possible
- Try to use GPU-accelerated rendering techniques like Pen+ V7 or Simple3D as much as possible instead of traditional CPU-limited Scratch-based rasterization methods.
- Manage memory usage and try to avoid garbage collection. This is a tricky area and depends on your application.

---
**Aside from optimization**, there are some best practices for gameplay design to ensure the best possible experience for the user:

---

- DO NOT **EVER** take unexpected control of the camera against the user's will. This can cause motion sickness in some individuals. Things like cutscenes in which the user moves with the camera shouldn't happen.
- Avoid flashing lights that may cause epileptic seizures or migraine headaches in a small percentage of individuals. Provide a warning at the start of the experience if these things are present (e.g., a flashing light show in Beatsaber).

- Avoid motion-sickness inducing gameplay. This includes things like:
  - Vehicular activity
    - Flying
    - Driving
  - Poorly designed locomotive controls
    - When you can, try to use "teleport" controls instead
    - If you must use locomotion controls, avoid smooth rotation and snap turning left or right to a fixed interval, like 30º. This technique is found in many VR experiences.
    - Try to avoid strafe controls

This doesn't mean you can't do these things at all, but if they are a central part of the experience, they should be designed with the user's best interest in mind.

## Techncial Details
TODO: some nerdy details about the specifics of the internals of the extension


# Blocks <a name="Blocks"></a>
## Utilities <a name="Utilities"></a>

```scratch
[enter v] VR mode :: #00a616
```
This block can enter or exit VR mode, also known as an Immersive Web Experience. On desktop devices, this may simply open the window in fullscreen when no WebXR compatible headset is present. Generally, VR experiences should be designed to support both desktops and VR headsets, or only support VR headsets and provide a warning if the project was attempted to be run with no headset present.

---

```scratch
<in VR? :: #00a616>
```
This block detects whether or not the user is in VR mode. False by default.

---

```scratch
<is headset connected? :: #00a616>
```
This block can detect if a headset is present by looking to see if the browser supports `immsersive-vr` or `immersive-ar` WebXR sessions, but note that it is not a guarantee that every time this returns `true` a headset is present. Headset presence can be mimicked with the use of WebXR emulator browser extensions on desktops and some mobile devices may return `true` as well.

---

```scratch
(stage [width v] :: #00a616)
```
A miscellaneous utility that reports either the stage's width or height. Can be used for 3D transformations / projection in some scenarios.

---

```scratch
(get camera [field of view v] :: #00a616)
```
A miscellaneous utility that reports either the camera's field of view (FOV), near clipping plane, or far clipping plane. All of these properties should be inserted into your 3D renderer to provide the best experience.

---
## Transformations <a name="Transformations"></a>