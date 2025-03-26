# BlockifyVR

## Table of Contents
1. [Introduction](#Introduction)
2. [Requirements](#Requirements)
3. [Best Practices](#Best-practices)
4. [Blocks](#blocks)
4a. [Utilities](#Utilities)
4b. [Transformations](#Transformations)
4c. [Controllers](#Controllers)
5. [Wrapping Up](#Wrapping-up)
6. [Other Resoruces](#Other-resources)
## Introduction <a name="Introduction"></a>
This is a cross-platform Virtual Reality extension. It is designed to target experiences supporting modern 6DOF (six degrees of freedom, position and rotation in all three axes) headsets with two 6DOF controllers. 
This extension is simply a framework for adding virtual reality interaction to your projects. It does not provide any systems for 3D transformations or rendering. It is not a 3D engine, but it keeps track of the states of the headset and controllers for you so you don't have to.

## Requirements <a name="Requirements></a>
This extension requires a compatible virtual reality headset to function. It's also _highly_ recommended that you have one available frequently during development for testing to ensure proper functionality and scene scale. However, it is designed to allow editing and programming on computers without a required headset.
This extension is designed to be able to run with any 3D renderer or engine, but it works best with a 3D renderer or engine that uses compatible SI units. This means meters for length and degrees for rotation. However, if your 3D systems don't have this, don't worry, we'll fix it when we get to [Transformations](#Transformations). Because of this, this extension requires that all scenes used for VR experiences be designed on the meter scale to make sure everything looks just right. This extension is considered cross-platform compatible, but as of right now it only supports:

- Oculus Quest 1, 2, 3, and Quest Pro
- Most HTC Vive headsets
- Most Windows Mixed Reality headsets.

If you have suggestions for more features or headsets to support, please let me know. The best way to do this is on my [Scratch Profile comments](http://scratch.mit.edu/users/-MasterMath-/#comments).

# Best Practices <a name="Best-practices"></a>
Developing Virtual Reality experiences requires use of strict best practices to ensure the ideal experience for the user. As a general rule the following list is a good set of guidelines:
- Aim for 90 FPS or higher to reduce motion sickness. BlockifyVR supports 120Hz refresh rate on supporting browsers. Some ways to optimize your experiences are:
   - Reducing draw count. You can do this by:
     - Joining all static (non-moving) meshes together into one mesh for one draw call
     - Instancing large quantities of similar elements, such as particles or bullets in an FPS game
     - Occlusion and Frustum culling: skip rendering of faces behind other faces and skip rendering of faces outside the camera's FOV
   - Reducing triangle count:
     - Have a budget for the maximum number of triangles you should have in a given frame and try your best to stay under the budget
     - Use distance-based Level-Of-Detail (LOD) systems to progressively reduce the quality of meshes that are farther away from the camera
     - Remove faces and triangles that will never be seen by the user, such as those that are intersecting with other static objects in the enviroment.
     - etc.
   - Etc.

Aside from optimization, there are other best practices for Virtual Reality design that should be incorporated as well to ensure the best possible experience.
