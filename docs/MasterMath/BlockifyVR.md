# BlockifyVR

## Table of Contents
1. [Introduction](#Introduction)
2. [Requirements](#Requirements)
3. [Best Practices](#Best-practices)
4. [Blocks](#blocks)
4.1 [Utilities](#Utilities)
4.2 [Transformations](#Transformations)
4.3 [Controllers](#Controllers)
5. [Wrapping Up](#Wrapping-up)
6. [Other Resoruces](#Other-resources)
## Introduction <a name="Introduction"></a>
This is a cross-platform Virtual Reality extension. It is designed to target experiences supporting modern 6DOF (six degrees of freedom, position and rotation in all three axes) headsets with two 6DOF controllers. 
This extension is simply a framework for adding virtual reality interaction to your projects. It does not provide any systems for 3D transformations or rendering. It is not a 3D engine, but it keeps track of the states of the headset and controllers for you so you don't have to.

## Requirements <a name="Requirements></a>
This extension requires a compatible virtual reality headset to function. It's also _highly_ recommended that you have one available frequently during development for testing to ensure proper functionality and scene scale. However, it is designed to allow editing and programming on computers without a required headset.
This extension is designed to be able to run with any 3D renderer or engine, but it works best with a 3D renderer or engine that uses compatible SI units. This means meters for length and degrees for rotation. However, if your 3D systems don't have this, don't worry, we'll fix it when we get to [Transformations](#Transformations). Because of this, this extension requires that all scenes used for VR experiences be designed on the meter scale to make sure everything looks just right.

# Best Practices <a name="Best-practices"></a>
- 90 FPS or higher (anything below 60 is generally not standard)
   - More notes here
   - and here
   - about how to optimize
- Reduce Motion Sickness
   - Notes here about how to do that
   - etc. etc.
