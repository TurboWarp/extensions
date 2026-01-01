# BlockifyVR

## Table of contents
1. [What This Is](#description)
2. [How It Works](#how-it-works)
3. [The Blocks](#the-blocks)
3.1. [Utilities](#utilities)
3.2. [Transformations](#transformations)
3.3 [Controllers](#controllers)
4. [Transformations and Coordinate Systems](#coord-systems)
5. [Best Practices](#best-practices)
5.1 [Optimization & Performance](#optimization)
5.1 [Designing VR Experiences](#vr-design)
5.2 [Maintaining Cross-Platform Compatibility](#compatibility)
6. [Limitations](#limitations)
7. [Examples](#examples)
 
## What This Is <a name="description"></a>
__BlockifyVR__ is a cross-platform virtual reality extension designed to easily integrate into existing 3D projects. It targets modern <abbr title="six degrees of freedom; rotation and position" style="cursor: help; color: #2a7f62;">__6DOF__</abbr> virtual reality headsets with two 6DOF controllers. Its purpose is to provide a framework between virtual reality and Scratch for the creation of immersive games, experiences, animations, and more.

## How It Works <a name="how-it-works"></a>
BlockifyVR is a relatively simple extension that provides a layer of interaction between WebXR and Scratch that enables you to create VR experiences with ease. Its heart and foundation relies on [A-frame](https://aframe.io), a JavaScript library built on top of [Three.js](https://threejs.org) designed specifically for VR development on the web. These systems allow you to open your Scratch project into a immersive VR session that enable tracking, controller input, and more VR capabilities to be accessed by your project as input for your experiences.

<!--<details>
  <summary>Technical Details</summary>
  <p>Wanna know how the extension works on the inside? It uses a 2D unshaded plane that is fixed to the camera. This plane scales to match the aspect ratio of the Scratch Stage while filling the camera as much as possible. The Scratch Stage texture source requests an update every tick by a special component. No stage layers are added, and overlay components (such as variables and the "ask () and wait block" input) do not display in VR. Controller inputs are cross-platform, so one component references Oculus Touch Controls, HTC Vive Controls, and Windows Motion Controls and attaches to both controller entities. Button inputs are tracked using event listeners, and everything after that follows as expected.</p>
</details>-->

> [!TIP]
> Reading documentation isn't the best way to learn. For better documentation, see <a href="https://brackets-coder.github.io/BlockifyVR/documentation/">here</a> (external link). You can find interactive tutorials/sample projects there for you to work with. 

## The Blocks <a name="the-blocks"></a>
### Utilities <a name="utilities"></a>

```scratch
(enter v) VR mode :: #00a616
```
This block allows you to enter or exit a VR session. You should use it at the start of a project if a headset is present.

```scratch
<in vr? :: #00a616>
```
This block reports whether an VR session is presenting.

```scratch
<is headset connected? :: #00a616>
```
Checks if a VR headset is connected by looking for browser support of immersive-vr or immersive-ar WebXR session.

```scratch
(stage width :: #00a616)
```
Reports the width of the Scratch Stage in pixels.

```scratch
(stage height :: #00a616)
```
Reports the height of the Scratch Stage in pixels.

```scratch
(get camera [field of view v] :: #00a616)
```
Returns either the FOV, near clipping plane, or far clipping plane of the camera.

### Transformations <a name="transformations"></a>
```scratch
([x-position v] of [headset v] :: #00a616)
```
Returns the X, Y, or Z position of the headset, left controller, or right controller.

```scratch
([x-rotation v] of [headset v] :: #00a616)
```
Returns the X, Y, or Z rotation of the headset, left controller, or right controller.

```scratch
(item (1) of [combined v] matrix :: #00a616)
```
A block that returns various matrix transformations useful for injecting into 3D renderers. It accepts items from 1-16 (4x4 matrix) and can return projection, view, inverse view, and combined (projection multiplied by inverse view) matrices. For more information, see <a href="https://extensions.turbowarp.org/ar">here</a>.

### Controllers <a name="controllers"></a>

Controllers are more complicated because __some buttons are only available on certain platforms__. You can see the mappings in the dropdown below.

<details>
  <summary>Button Mappings</summary>
  <p><b>Oculus/Meta Touch Controls</b>: Trigger, Grip, Thumbstick, A, B, X, Y, Surface
  <br><b>HTC Vive</b>: Trigger, Grip, Trackpad, Menu, System
  <br><b>Windows Motion</b>: Trigger, Grip, Thumbstick, Trackpad, Menu
  </p>
</details>
<br>

```scratch
<is [left controller v] connected? :: #00a616>
```
Returns true if the specified left/right controller is connected. On the Oculus/Meta Horizon Browser, an odd system-level quirk causes the controllers to not connect until after pressing the Oculus/Meta button twice to pause and resume the experience.

```scratch
when [left controller v] [connected v] :: #00a616 hat
```
An event that executes when the specified controller has connected or disconnected.

```scratch
when [any v] pressed :: #00a616 hat
```
An event that executes when the specified button has been pressed. 

```scratch
when [any v] touched :: #00a616 hat
```
An event that executes when the specified button has been touched. __Only available on Oculus Touch Controllers__.

```scratch
<button [any v] pressed? :: #00a616>
```
A boolean that returns whether a button is currently being pressed.

```scratch
<button [any v] pressed? :: #00a616>
```
A boolean that returns whether a button is currently being touched. __Only available on Oculus Touch Controllers__.

```scratch
(last button pressed :: #00a616)
```
Returns the last button pressed.

```scratch
(last button touched :: #00a616)
```
Returns the last button touched.

```scratch
((left trigger v) value :: #00a616)
```
Returns a float from 0-1 of the analog value of the triggers or grips.

```scratch
((left thumbstick v) [direction v] :: #00a616)
```
Returns the direction in degrees, X value, or Y value of the left or right thumbstick or trackpad.

```scratch
<is [left thumbstick v] direction [up v]? :: #00a616>
```
Returns true if the left or right thumstick or trackpad direction is up, down, left, or right. It's great for locomotion controls!

## Transformations and Coordinate Systems <a name="coord-systems"></a>
WebXR and A-frame use right-handed coordinate system where the negative Z axis extends into the screen. Length is specified in meters and rotation is specified in degrees. Ensuring consistency with these standards will make VR development easier.

## Best Practices <a name="best-practices"></a>

### Optimization & Performance <a name="optimization"></a>

In VR, performance is critical to ensure user comfort. Low framerates and high latency can cause increased risk of motion sickness. Here are some tips for optimizing your experiences:

- Target 90 FPS or higher
- Reduce triangle count and draw call count
- Merge static geometry together for only one draw call (for example the map of your level should all be one mesh)
- Use baked lighting into textures instead of relying on real-time lighting
- Use instancing, LODs, backface and view frustum culling, etc.
- Remove triangles that won't be seen (such as those inside other opaque structures)
- Etc.

### Designing VR Experiences <a name="vr-design"></a>
Making VR experiences calls for specific design techniques. Here are some tips to ensure that your users have the best experience possible:

- __NEVER__ unexpectedly take control of the camera away from the user. 
  - If the user moves their head, the camera should move accordingly. This even means allowing the camera to pass through geometry instead of colliding. If necessary, allow a player hitbox to move with controls and offset the camera from the player to allow partial collision. 
- Use meter units; this ensures the expected accurate scale and improves immersion. Respect real-world physical scale. This may require some tweaking of your 3D renderer to use the matrix transformation and projection blocks provided by the extension.
- Use spatial UIs fixed in the world space, not fixed to the camera: this helps avoid disorientation and makes interacting with them more natural.
- Use raycast-based UI interaction rather than traditional thumbstick and button selection methods; this also helps make UI interaction more natural.
- Use snap turning as opposed to smooth yaw turning, which is less comfortable
- Prefer teleport controls over smooth locomotion to reduce motion sickness.
- Allow accessibility: text legibility (large fonts, high contrast etc.), preferred dominant hands, provide various comfort settings, etc.
- Avoid physical intensity or stretching like jumping, crawling, extended reaching, etc.

### Maintaining Cross-Platform Compatibilitiy <a name="compatibility"></a>

- Design cross-platform controls or target one platform
- Provide a desktop fallback

As BlockifyVR is cross-platform compatible, you should also account for the fact that your projects will target audiences from varying platforms. If possible, design control schemes accessible to all controller types and platforms supported by BlockifyVR. However, sometimes this isn't practical or logistical. For the best possible experience, target one form factor instead of all platforms supported by BlockifyVR and map controller input specifically for that controller type.
While many experiences will be created specifically for VR, if possible you should provide a fallback option for desktop devices. This allows the project to continue running as expected or gracefully fail if a headset connection could not be found. You may need to incorporate keyboard controls and design a screenspace UI for mouse interaction.

## Limitations <a name="limitations"></a>
This extension has certain limitations that may cause it to behave unexpectedly or even erroneously. 
First and foremost, while the extension is cross-platform compatible between most VR headsets and will open experiences on most WebXR compatible headsets, it currently only supports Oculus Touch Controllers, HTC Vive Controllers, and Windows Motion Controllers. More 6DOF controllers can be easily added at request; just ask me at <a href="https://scratch.mit.edu/users/-MasterMath-/#comments/">my profile comments</a>.

Using WebXR emulators on desktop devices is a good way to test the VR functionality of a project without the hassle of jumping between your computer to your headset and back over and over again. It may also help in scenarios where you temporarily don't have access to a VR headset. However, this extension was not designed for such emulators and using them may cause unexpected behaviors, especially during display plane scaling updates. So while they can be a helpful tool, they should be used with care. 