(function(Scratch) {
  'use strict';

  const deviceTransforms = {
    x:0,
    y:0,
    z:0,
    rotX:0,
    rotY:0,
    rotZ:0
  }

  function updateDeviceSpeed() {
    const acl = new Accelerometer({ frequency: 30 });
    acl.addEventListener("reading", () => {
      deviceTransforms.x = acl.x;
      deviceTransforms.y = acl.y;
      deviceTransforms.z = acl.z;
    });

    acl.start();
  }

  function updateDeviceRotation() {
    const gyro = new Gyroscope({ frequency: 30 });

    gyro.addEventListener("reading", (e) => {
      deviceTransforms.rotX = gyro.x;
      deviceTransforms.rotY = gyro.y;
      deviceTransforms.rotZ = gyro.z;
    });
    gyro.start();
  }

  function tryDeviceVelocityChecks() {
    //Accelerometer
    try {
      let accelerometer = null; //Accelorametor from MDN docs for fun.
      accelerometer = new Accelerometer({ referenceFrame: "device" });
      accelerometer.addEventListener("error", (event) => {
        // Handle runtime errors.
        if (event.error.name === "NotAllowedError") {
          // Branch to code for requesting permission.
        } else if (event.error.name === "NotReadableError") {
          console.log("Cannot connect to the sensor.");
        }
      });
      updateDeviceSpeed();
    } catch (error) {
      // Handle construction errors.
      if (error.name === "SecurityError") {
        // See the note above about permissions policy.
        console.log("Sensor construction was blocked by a permissions policy.");
      } else if (error.name === "ReferenceError") {
        console.log("Sensor is not supported by the User Agent.");
      } else {
        throw error;
      }
    }
    //Gyro
    try {
      let gyro = null; //Accelorametor from MDN docs for fun.
      gyro = new Gyroscope({ referenceFrame: "device" });
      gyro.addEventListener("error", (event) => {
        // Handle runtime errors.
        if (event.error.name === "NotAllowedError") {
          // Branch to code for requesting permission.
        } else if (event.error.name === "NotReadableError") {
          console.log("Cannot connect to the sensor.");
        }
      });
      updateDeviceRotation();
    } catch (error) {
      // Handle construction errors.
      if (error.name === "SecurityError") {
        // See the note above about permissions policy.
        console.log("Sensor construction was blocked by a permissions policy.");
      } else if (error.name === "ReferenceError") {
        console.log("Sensor is not supported by the User Agent.");
      } else {
        throw error;
      }
    }
  }


  tryDeviceVelocityChecks()
  if (!Scratch) {
      Scratch = {
        TargetType: {
          SPRITE: 'sprite',
          STAGE: 'stage',
        },
        BlockType: {
          COMMAND: 'command',
          REPORTER: 'reporter',
          BOOLEAN: 'Boolean',
          HAT: 'hat'
        },
        ArgumentType: {
          STRING: 'string',
          NUMBER: 'number',
          COLOR: 'color',
          ANGLE: 'angle',
          BOOLEAN: 'Boolean',
          MATRIX: 'matrix',
          NOTE: 'note'
        },
        vm: window.vm,
        extensions: {
          unsandboxed: true,
          register: (object) => {
            const serviceName = vm.extensionManager._registerInternalExtension(object);
            vm.extensionManager._loadedExtensions.set(object.getInfo().id, serviceName);
          }
        }
      };
      if (!Scratch.vm) {
        throw new Error('The VM does not exist');
      }
  }

  const vmSurfer = {
    sprites:{},
    refreshJSON(){
        const targets = Scratch.vm.runtime.targets;
        this.sprites = {};  //Refresh the JSON object so that we don't have to do redunant checks to see if a variable no longer exists.
        for (let index = 0; index < targets.length; index++) { // We start from 1 so we don't grab the stage.
            const target = targets[index];
            const sprite = target.sprite; //Don't put name so that we can do other stuff with the sprites if we want to.
            if(target.isOriginal && !target.isStage){
                this.sprites[target.id] = { //Declare the sprite to the JSON object for later use.
                    id:target.id,
                    name:sprite.name,
                    originalOBJ:target,
                    lists:{},
                    variables:{}
                };
                const vars = target.variables;
                const varKeys = Object.keys(vars);
                for (let V = 0; V < varKeys.length; V++) {
                    const variable = vars[varKeys[V]];
                    if(variable.type == "list"){
                      this.sprites[target.id].lists[variable.id] = variable; //Add the current "Variable" to the lists array;
                    }
                    else{
                      this.sprites[target.id].variables[variable.id] = variable; //Add the current "Variable" to the variables array;
                    }
                }
            }
        }
    }
  }

  const listDat = {};
  const objDat = {};

  let fingersDown = 0;

  const defaultPositions = []

  let fingerPositions = defaultPositions

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const canvas = runtime.renderer.canvas;

  function touchProcess(event) {
    event.preventDefault()
      const canvasPos = canvas.getBoundingClientRect();
      fingersDown = event.touches.length;
      fingerPositions = []
      for (let i = 0; i < event.touches.length; i++) {
        const curTouch = event.touches[i];
        fingerPositions.push([
          curTouch.clientX - canvasPos.left,
          curTouch.clientY - canvasPos.top
        ])
      }
  }

  function moveProcess(event) {
    event.preventDefault()
    const canvasPos = canvas.getBoundingClientRect();
      fingersDown = event.touches.length;
      for (let i = 0; i < event.touches.length; i++) {
        const curTouch = event.touches[i];
        fingerPositions[i][0] = curTouch.clientX - canvasPos.left;
        fingerPositions[i][1] = curTouch.clientY - canvasPos.top;
      }
  }

  const ico = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyOC44NjYwNyIgaGVpZ2h0PSIyOC44NjYwNyIgdmlld0JveD0iMCwwLDI4Ljg2NjA3LDI4Ljg2NjA3Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjI1LjA2Njk3LC0xNjUuMDY2OTcpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIyNS4wNjY5NywxNzkuNWMwLC03Ljk3MTE0IDYuNDYxODksLTE0LjQzMzAzIDE0LjQzMzAzLC0xNC40MzMwM2M3Ljk3MTE0LDAgMTQuNDMzMDMsNi40NjE4OSAxNC40MzMwMywxNC40MzMwM2MwLDcuOTcxMTQgLTYuNDYxODksMTQuNDMzMDMgLTE0LjQzMzAzLDE0LjQzMzAzYy03Ljk3MTE0LDAgLTE0LjQzMzAzLC02LjQ2MTg5IC0xNC40MzMwMywtMTQuNDMzMDN6IiBmaWxsPSIjNWNiMWQ2IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMjM0LjUsMTc1YzAsLTIuNDkgMi4wMSwtNC41IDQuNSwtNC41YzIuNDksMCA0LjUsMi4wMSA0LjUsNC41YzAsMS41NiAtMC43OSwyLjkzIC0yLDMuNzR2LTMuNzRjMCwtMS4zODA3MSAtMS4xMTkyOSwtMi41IC0yLjUsLTIuNWMtMS4zODA3MSwwIC0yLjUsMS4xMTkyOSAtMi41LDIuNXYzLjc0Yy0xLjIxLC0wLjgxIC0yLC0yLjE4IC0yLC0zLjc0ek0yNDcuMjUsMTg0Ljc1YzAsMC4wNiAtMC4wMSwwLjEzIC0wLjAyLDAuMmwtMC43NSw1LjI3Yy0wLjExLDAuNzMgLTAuNjksMS4yOCAtMS40NCwxLjI4aC02Ljc5Yy0wLjQxLDAgLTAuNzksLTAuMTcgLTEuMDYsLTAuNDRsLTQuOTQsLTQuOTRsMC43OSwtMC44YzAuMiwtMC4yIDAuNDgsLTAuMzMgMC43OSwtMC4zM2MwLjEzLDAgMC4wNywtMC4wMSAzLjY3LDAuNzV2LTEwLjc0YzAsLTAuODMgMC42NywtMS41IDEuNSwtMS41YzAuODMsMCAxLjUsMC42NyAxLjUsMS41djZoMC43NmMwLjE5LDAgMC4zNywwLjA0IDAuNTQsMC4xMWw0LjU0LDIuMjZjMC41MywwLjIyIDAuOTEsMC43NiAwLjkxLDEuMzh6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMjI3LjUsMTY3LjVoMjR2MjRoLTI0eiIgZmlsbC1vcGFjaXR5PSIwIiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiPjxwYXRoIGQ9Ik0yNDQuNTAyMTEsMTc4LjgyNzU5aDUuNDk1NzkiLz48cGF0aCBkPSJNMjQ3LjI1LDE4MS41NzU0OGwwLC01LjQ5NTc4Ii8+PC9nPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjE0LjkzMzAzNDcxNTI2MTk4MjoxNC45MzMwMzQ3MTUyNjE5NTQtLT4=";
  const touchIco = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyNi4yMDU1MSIgaGVpZ2h0PSIyNi45NjQ5IiB2aWV3Qm94PSIwLDAsMjYuMjA1NTEsMjYuOTY0OSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIyNi44OTcyNSwtMTY2LjEzNzg1KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yMzkuMzA5OTgsMTg5Ljc3OTdjLTAuMDQ4MjMsMC4wMzU2OSAtMC4xMTA0NSwwLjA2OTI5IC0wLjE3MjY3LDAuMTAyODlsLTQuNjgyNDEsMi41MzE4OGMtMC42NTIyNCwwLjM0NTggLTEuNDM5MzYsMC4yMDY3MyAtMS44ODU0OSwtMC4zOTYxNmwtNC4wMzg5MiwtNS40NTgxNGMtMC4yNDM4OCwtMC4zMjk1OCAtMC4zMzMyNiwtMC43MzYxNiAtMC4yNzY4MywtMS4xMTM4MWwxLjAzMjU0LC02LjkwOTQ5bDEuMTEzLDAuMTU5MTdjMC4yNzk3NCwwLjA0MTggMC41NTA3OSwwLjE4OTU1IDAuNzM1MTksMC40Mzg3NWMwLjA3NzMzLDAuMTA0NSAwLjA0OTY4LDAuMDUwMzIgMS41ODAxNSwzLjM5NjI1bDguNjMzMzQsLTYuMzg4NTFjMC42NjcxOSwtMC40OTM3MSAxLjYwNDMxLC0wLjM1MzY3IDIuMDk4MDIsMC4zMTM1MmMwLjQ5MzcxLDAuNjY3MTkgMC4zNTM2NywxLjYwNDMxIC0wLjMxMzUyLDIuMDk4MDJsLTQuODIzMSwzLjU2OWwwLjQ1MjA3LDAuNjEwOTNjMC4xMTMwMiwwLjE1MjczIDAuMTg3OTMsMC4zMjEyMiAwLjIzMjc5LDAuNDk5NTFsMC44ODM4NCw0Ljk5MzhjMC4xMzg0MSwwLjU1NjkgLTAuMDY5NjMsMS4xODM1OCAtMC41NjgwMSwxLjU1MjM3eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTIyOC43MzMyMiwxNjYuMTM3ODVoMjR2MjRoLTI0eiIgZmlsbC1vcGFjaXR5PSIwIiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMjQ0LjQ2NjgyLDE3NC44NzA0NGwyLjA3NDI4LC0yLjA3NDI4IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTIzNi44OTU5MSwxODIuNzMyNTJsMi4wNzQyOCwtMi4wNzQyOCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yMzkuODUzNDcsMTc0Ljk1Nzc1bC0yLjA3NDI4LC0yLjA3NDI4IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTI0Ni40NTM4LDE4MS41NTgwOGwtMi4wNzQyOCwtMi4wNzQyOCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yMjYuODk3MjUsMTkzLjEwMjc1di0yNi4yMDU1MWgyNi4yMDU1MXYyNi4yMDU1MXoiIGZpbGw9Im5vbmUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSJub25lIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjEzLjEwMjc1NDg1NDYyMTI4MToxMy44NjIxNDc1NDY3MTM3NDMtLT4=";
  const listIco = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBzdHlsZT0iLW1zLXRyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKTstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZykiPjxwYXRoIGQ9Im04MC4xODIgNjcuNDU3LTM1LjQtLjAwMXYuMDAxbC0uMDA5LS4wMDFhMi4yNyAyLjI3IDAgMCAwLTIuMjY5IDIuMjY5YzAgLjA0Mi4wMS4wOC4wMTIuMTIxVjgwLjE4aC4wMTFhMi4yNjggMi4yNjggMCAwIDAgMi4yNTQgMi4yNjh2LjAwMWgzNS40di0uMDAyYTIuMjY4IDIuMjY4IDAgMCAwIDIuMjU0LTIuMjY4VjY5LjgyNWMuMDAyLS4wMzQuMDEtLjA2Ny4wMS0uMTAxYTIuMjY3IDIuMjY3IDAgMCAwLTIuMjYzLTIuMjY3em0tNDkuOTA0LS4wMDNIMTkuODIyYTIuMjcgMi4yNyAwIDAgMC0yLjI2OSAyLjI2OXYxMC40NTRhMi4yNjkgMi4yNjkgMCAwIDAgMi4yNjggMi4yNjloMTAuNDU1YTIuMjcgMi4yNyAwIDAgMCAyLjI2OS0yLjI2OVY2OS43MjNhMi4yNjcgMi4yNjcgMCAwIDAtMi4yNjctMi4yNjl6bTQ5LjkwNC0yNC45ODctMzUuNC0uMDAxdi4wMDFsLS4wMDktLjAwMWEyLjI3IDIuMjcgMCAwIDAtMi4yNjkgMi4yNjljMCAuMDQyLjAxLjA4LjAxMi4xMjFWNTUuMTloLjAxMWEyLjI2OCAyLjI2OCAwIDAgMCAyLjI1NCAyLjI2OHYuMDAxaDM1LjR2LS4wMDJhMi4yNjggMi4yNjggMCAwIDAgMi4yNTQtMi4yNjhWNDQuODM1Yy4wMDItLjAzNC4wMS0uMDY3LjAxLS4xMDFhMi4yNjcgMi4yNjcgMCAwIDAtMi4yNjMtMi4yNjd6bS00OS45MDQtLjAwM0gxOS44MjJhMi4yNyAyLjI3IDAgMCAwLTIuMjY5IDIuMjY5djEwLjQ1NGEyLjI2OSAyLjI2OSAwIDAgMCAyLjI2OCAyLjI2OWgxMC40NTVhMi4yNyAyLjI3IDAgMCAwIDIuMjY5LTIuMjY5VjQ0LjczM2EyLjI2NyAyLjI2NyAwIDAgMC0yLjI2Ny0yLjI2OXptMTIuMjM4LTEyLjE4OGguMDExYTIuMjY4IDIuMjY4IDAgMCAwIDIuMjU0IDIuMjY4di4wMDFoMzUuNHYtLjAwMmEyLjI2OCAyLjI2OCAwIDAgMCAyLjI1NC0yLjI2OFYxOS45MjFjLjAwMi0uMDM0LjAxLS4wNjcuMDEtLjEwMWEyLjI2OSAyLjI2OSAwIDAgMC0yLjI2NC0yLjI2OHYtLjAwMWgtMzUuNHYuMDAxbC0uMDA5LS4wMDFhMi4yNyAyLjI3IDAgMCAwLTIuMjY5IDIuMjY5YzAgLjA0Mi4wMS4wOC4wMTIuMTIxdjEwLjMzNXpNMzAuMjc4IDE3LjU1MUgxOS44MjJhMi4yNyAyLjI3IDAgMCAwLTIuMjY5IDIuMjY5djEwLjQ1NGEyLjI2OSAyLjI2OSAwIDAgMCAyLjI2OCAyLjI2OWgxMC40NTVhMi4yNyAyLjI3IDAgMCAwIDIuMjY5LTIuMjY5VjE5LjgyYTIuMjY2IDIuMjY2IDAgMCAwLTIuMjY3LTIuMjY5eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGZpbGw9InJnYmEoMCwgMCwgMCwgMCkiIGQ9Ik0wIDBoMTAwdjEwMEgweiIvPjwvc3ZnPg==";
  const catIco = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI0Mi4wMzIzNSIgaGVpZ2h0PSI0Mi4wMzIzNSIgdmlld0JveD0iMCwwLDQyLjAzMjM1LDQyLjAzMjM1Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjE4Ljk4MzgyLC0xNTguOTgzODIpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxnIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTI0My40NzUsMTY1LjQ3NzIzYzAuMTUsLTAuMSAwLjQsLTAuMDUgMC40NSwwLjE1bDEuMyw1LjM1YzAsMCAzLjIsMi4zNSA0LjE1LDRjMS42LDIuNzUgMS42NSw1IDEuNjUsNWMwLDAgMy41NSwxLjA1IDQuMTUsMy45YzAuNiwyLjg1IC0xLjYsOC4yNSAtMTEsMTAuMWMtOS40LDEuODUgLTE2Ljk1LC0wLjcgLTIwLjUsLTYuNGMtMy41NSwtNS43IDIuMDUsLTEyLjUgMS43NSwtMTIuMWwtMS4wNSwtOC45NWMtMC4wNSwtMC4yIDAuMiwtMC4zNSAwLjQsLTAuMjVsNi4wNSwzLjk1YzAsMCAyLjI1LC0wLjg1IDQuNiwtMC45NWMxLjQsLTAuMSAyLjYsMCAzLjc1LDAuMnoiIGZpbGw9IiMzYmEyY2UiIHN0cm9rZT0iIzFiNTU2ZSIgc3Ryb2tlLXdpZHRoPSIxLjIiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PHBhdGggZD0iTTI1MC44NzUsMTgwLjE3NzIzYzAsMCAzLjQ1LDAuOSA0LjA1LDMuNzVjMC42LDIuODUgLTEuOCw4IC0xMS4xLDkuOGMtMTIuMSwyLjUgLTE3Ljg1LC00LjcgLTE0LjUsLTEwYzMuMzUsLTUuMzUgOS4xLC0wLjggMTMuMywtMS4xYzMuNiwtMC4yNSA0LC0zLjQgOC4yNSwtMi40NXoiIGZpbGw9IiNhN2UyZmIiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPjxwYXRoIGQ9Ik0yNjAuMDc1LDE4MC43MjcyM2MtMi4zNSwxLjkgLTUuOTUsMS45NSAtNS45NSwxLjk1IiBmaWxsPSJub25lIiBzdHJva2U9IiMxYjU1NmUiIHN0cm9rZS13aWR0aD0iMS4yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMjU5LjQyNSwxODYuMzI3MjNjLTMuMTUsMC4yNSAtNS4xLC0wLjcgLTUuMSwtMC43IiBmaWxsPSJub25lIiBzdHJva2U9IiMxYjU1NmUiIHN0cm9rZS13aWR0aD0iMS4yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMjQyLjQyNSwxODEuMzI3MjNjMS4wNSwwIDIuMTUsMC4xIDIuMiwwLjQ1YzAuMDUsMC43IC0wLjcsMi4xIC0xLjUsMi4xNWMtMC45LDAuMSAtMywtMS4xNSAtMywtMS45NWMtMC4wNSwtMC42IDEuMywtMC42NSAyLjMsLTAuNjV6IiBmaWxsPSIjMWI1NTZlIiBzdHJva2U9IiMxYjU1NmUiIHN0cm9rZS13aWR0aD0iMS4yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMjE5LjkyNSwxODAuNTc3MjNjMCwwIDQuMywxLjQgNi4wNSwyLjk1IiBmaWxsPSJub25lIiBzdHJva2U9IiMxYjU1NmUiIHN0cm9rZS13aWR0aD0iMS4yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMjI2LjEyNSwxODUuMjc3MjNjLTIuMTUsMC44NSAtNS44NSwwLjMgLTUuODUsMC4zIiBmaWxsPSJub25lIiBzdHJva2U9IiMxYjU1NmUiIHN0cm9rZS13aWR0aD0iMS4yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48ZyBmaWxsPSIjMWI1NTZlIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiPjxwYXRoIGQ9Ik0yNDguMTI1LDE3OC4zMjcyM2MwLDAuNTUgLTAuNCwxIC0wLjksMWMtMC41LDAgLTAuOSwtMC40NSAtMC45LC0xYzAsLTAuNTUgMC40LC0xIDAuOSwtMWMwLjUsMCAwLjksMC40NSAwLjksMSIvPjwvZz48ZyBmaWxsPSIjMWI1NTZlIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiPjxwYXRoIGQ9Ik0yMzUuNjI1LDE3OS43NzcyM2MwLDAuNTUgLTAuNCwxIC0wLjksMWMtMC41LDAgLTAuOSwtMC40NSAtMC45LC0xYzAsLTAuNTUgMC40LC0xIDAuOSwtMWMwLjUsMC4wNSAwLjksMC40NSAwLjksMSIvPjwvZz48L2c+PHBhdGggZD0iTTIxOC45ODM4MiwyMDEuMDE2MTh2LTQyLjAzMjM1aDQyLjAzMjM1djQyLjAzMjM1eiIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjoyMS4wMTYxNzY0NzA1ODgzNjM6MjEuMDE2MTc2NDcwNTg4MzktLT4=";
  const deviceVelIco = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI3Mi44NjY0OCIgaGVpZ2h0PSI2MC43NDUyNSIgdmlld0JveD0iMCwwLDcyLjg2NjQ4LDYwLjc0NTI1Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA0LjY0MTEzLC0xNDkuNjI3MzgpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yMjMuNTMwMDgsMTk4LjI2ODZjLTAuNzcxMDEsLTAuMjEzNCAtMS4zNjU2MiwtMC42ODkyNSAtMS43ODM4MywtMS40Mjc1NmMtMC40MTgyMSwtMC43MzgzMSAtMC41MjA2MSwtMS40OTI5NyAtMC4zMDcyMSwtMi4yNjM5OGwxMC4xMzY0OSwtMzYuNjIzMWMwLjIxMzQsLTAuNzcxMDEgMC42ODkyNSwtMS4zNjU2MiAxLjQyNzU2LC0xLjc4MzgzYzAuNzM4MzEsLTAuNDE4MjEgMS40OTI5NywtMC41MjA2MSAyLjI2Mzk4LC0wLjMwNzIxbDIxLjIwMjg1LDUuODY4NWMwLjc3MTAxLDAuMjEzNCAxLjM2NTYyLDAuNjg5MjUgMS43ODM4MywxLjQyNzU2YzAuNDE4MjEsMC43MzgzMSAwLjUyMDYxLDEuNDkyOTcgMC4zMDcyMSwyLjI2Mzk4bC0xMC4xMzY0OSwzNi42MjMxYy0wLjIxMzQsMC43NzEwMSAtMC42ODkyNSwxLjM2NTYyIC0xLjQyNzU2LDEuNzgzODNjLTAuNzM4MzEsMC40MTgyMSAtMS40OTI5NywwLjUyMDYxIC0yLjI2Mzk4LDAuMzA3MjF6TTIyNC43MzA0NSwxOTMuOTMxNjVsLTAuNDAwMTIsMS40NDU2NWwyMS4yMDI4NSw1Ljg2ODVsMC40MDAxMiwtMS40NDU2NXpNMjI1LjUzMDcsMTkxLjA0MDM2bDIxLjIwMjg1LDUuODY4NWw3LjczNTc1LC0yNy45NDkyMWwtMjEuMjAyODUsLTUuODY4NXpNMjM0LjA2NjcsMTYwLjE5OTg1bDIxLjIwMjg1LDUuODY4NWwwLjQwMDEyLC0xLjQ0NTY1bC0yMS4yMDI4NSwtNS44Njg1ek0yMzQuMDY2NywxNjAuMTk5ODVsMC40MDAxMiwtMS40NDU2NXpNMjI0LjczMDQ1LDE5My45MzE2NWwtMC40MDAxMiwxLjQ0NTY1eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNMjI2LjQ4NTU2LDE1NC40NzkwMWM0LjAzMjEsLTIuMTM5NiA4LjYzMTczLC0zLjM1MTYzIDEzLjUxNDQ0LC0zLjM1MTYzYzE1Ljk0NTkxLDAgMjguODcyNjIsMTIuOTI2NzEgMjguODcyNjIsMjguODcyNjJjMCwwLjg5Mjc3IC0wLjA0MDUyLDEuNzc2MDcgLTAuMTE5ODIsMi42NDgxNyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjMiLz48cGF0aCBkPSJNMjYwLjI2NzExLDIwMC41NjM4N2MtNS4yMTI3Myw1LjEzNzk3IC0xMi4zNjk2Myw4LjMwODc1IC0yMC4yNjcxMSw4LjMwODc1Yy0xNS45NDU5MSwwIC0yOC44NzI2MiwtMTIuOTI2NzEgLTI4Ljg3MjYyLC0yOC44NzI2MmMwLC0zLjgzOTY1IDAuNzQ5NSwtNy41MDQyNSAyLjExMDE5LC0xMC44NTU0NiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjMiLz48cGF0aCBkPSJNMjA0LjY0MTEzLDE2Ni4zNzdsMTEuNjQ1NjgsLTUuMzEyMDdsNS4zMTIwNywxMS42NDU2OHoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI3Ny41MDc2MSwxODIuNjQ0MDFsLTkuODAyNDMsOC4yMzExOGwtOC4yMzExOCwtOS44MDI0M3oiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwIi8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MzUuMzU4ODczODM5ODgwOTc6MzAuMzcyNjIzNTE2MTc0OTk3LS0+";
  const clipboardIco = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzNy41IiBoZWlnaHQ9IjQxLjUiIHZpZXdCb3g9IjAuNSwwLjUsMzcuNSw0MS41Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjIwLjc1LC0xNTguNzUpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yMjUsMjAwYy0wLjg2NjY3LDAgLTEuNTgzMzQsLTAuMjgzMzMgLTIuMTUsLTAuODVjLTAuNTY2NjcsLTAuNTY2NjcgLTAuODUsLTEuMjgzMzQgLTAuODUsLTIuMTV2LTMwYzAsLTAuODY2NjcgMC4yODMzMywtMS41ODMzNCAwLjg1LC0yLjE1YzAuNTY2NjcsLTAuNTY2NjcgMS4yODMzMywtMC44NSAyLjE1LC0wLjg1aDEwLjFjMC4yMzMzMywtMS4xNjY2NiAwLjgwODMzLC0yLjEyNSAxLjcyNSwtMi44NzVjMC45MTY2NiwtMC43NSAxLjk3NSwtMS4xMjUgMy4xNzUsLTEuMTI1YzEuMiwwIDIuMjU4MzMsMC4zNzUgMy4xNzUsMS4xMjVjMC45MTY2NiwwLjc1IDEuNDkxNjYsMS43MDgzMyAxLjcyNSwyLjg3NWgxMC4xYzAuODY2NjcsMCAxLjU4MzMzLDAuMjgzMzMgMi4xNSwwLjg1YzAuNTY2NjcsMC41NjY2NyAwLjg1LDEuMjgzMzMgMC44NSwyLjE1djMwYzAsMC44NjY2NyAtMC4yODMzNCwxLjU4MzM0IC0wLjg1LDIuMTVjLTAuNTY2NjcsMC41NjY2NyAtMS4yODMzMywwLjg1IC0yLjE1LDAuODV6TTIyNSwxOTdoMzB2LTMwaC0zdjQuNWgtMjR2LTQuNWgtM3pNMjQwLDE2N2MwLjU2NjY3LDAgMS4wNDE2NiwtMC4xOTE2NyAxLjQyNSwtMC41NzVjMC4zODMzMywtMC4zODMzMyAwLjU3NSwtMC44NTgzMyAwLjU3NSwtMS40MjVjMCwtMC41NjY2NyAtMC4xOTE2NywtMS4wNDE2NiAtMC41NzUsLTEuNDI1Yy0wLjM4MzM0LC0wLjM4MzMzIC0wLjg1ODM0LC0wLjU3NSAtMS40MjUsLTAuNTc1Yy0wLjU2NjY3LDAgLTEuMDQxNjcsMC4xOTE2NyAtMS40MjUsMC41NzVjLTAuMzgzMzMsMC4zODMzNCAtMC41NzUsMC44NTgzNCAtMC41NzUsMS40MjVjMCwwLjU2NjY3IDAuMTkxNjcsMS4wNDE2NiAwLjU3NSwxLjQyNWMwLjM4MzMzLDAuMzgzMzQgMC44NTgzNCwwLjU3NSAxLjQyNSwwLjU3NXoiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjoxOS4yNToyMS4yNDk5OTk5OTk5OTk5Ny0tPg==";

  canvas.addEventListener('touchstart', touchProcess, false);
  canvas.addEventListener("touchmove", moveProcess, false);
  canvas.addEventListener('touchcancel', touchProcess, false);
  canvas.addEventListener('touchend', touchProcess, false);

  class SensingPlus {
    getInfo () {
      return {
          menuIconURI:ico,
          color1:'#5cb1d6',
          color2:'#3ba2ce',
          color3:'#2e8eb8',
          id: 'sensingPlus',
          name: 'Sensing +',
          blocks: [
            {
              "opcode": "getFingersTouching",
              "blockType": Scratch.BlockType.REPORTER,
              "text": "# of fingers down",
              "blockIconURI":touchIco,
              "arguments": {}                 
            },
            {
                "opcode": "isFingerDown",
                "blockType": Scratch.BlockType.BOOLEAN,
                "text": "Is Finger [ID] down?",
                "blockIconURI":touchIco,
                "arguments": {
                    "ID":{
                        "type": Scratch.ArgumentType.NUMBER,
                        "menu":"fingerIDMenu"
                      },
                }                 
              },
            {
              "opcode": "touchingFinger",
              "blockType": Scratch.BlockType.BOOLEAN,
              "text": "Touching a finger?",
              "blockIconURI":touchIco,
              "filter": [Scratch.TargetType.SPRITE],
              "arguments": {}                 
            },
            {
              "opcode": "touchingSpecificFinger",
              "blockType": Scratch.BlockType.BOOLEAN,
              "text": "Touching finger [ID]?",
              "blockIconURI":touchIco,
              "filter": [Scratch.TargetType.SPRITE],
              "arguments": {
                "ID":{
                  "type": Scratch.ArgumentType.NUMBER,
                  "menu":"fingerIDMenu"
                },
              }                 
            },
            {
              "opcode": "getTouchingFingerID",
              "blockType": Scratch.BlockType.REPORTER,
              "disableMonitor":true,
              "text": "Current finger touching",
              "filter": [Scratch.TargetType.SPRITE],
              "blockIconURI":touchIco,
              "arguments": {}                 
            },
            {
              "opcode": "fingerPosition",
              "blockType": Scratch.BlockType.REPORTER,
              "text": "Finger [ID] [PositionType]",
              "blockIconURI":touchIco,
              "arguments": {
                "ID":{
                  "type": Scratch.ArgumentType.NUMBER,
                  "menu":"fingerIDMenu"
                },
                "PositionType":{
                  "type": Scratch.ArgumentType.STRING,
                  "menu":"coordmenu"
                }
              }                 
            },
            "---",
            {
              "opcode": "listInSprite",
              "blockType": Scratch.BlockType.REPORTER,
              "text": "Get index [index] of [List]",
              "blockIconURI":listIco,
              "arguments": {
                "index":{
                  "type": Scratch.ArgumentType.NUMBER,
                  "defaultValue":1
                },
                "List":{
                  "type": Scratch.ArgumentType.STRING,
                  "menu":"listMenu"
                },
              }                 
            },
            {
              "opcode": "lengthOfListInSprite",
              "blockType": Scratch.BlockType.REPORTER,
              "text": "Length of [List]",
              "blockIconURI":listIco,
              "disableMonitor":true,
              "arguments": {
                "List":{
                  "type": Scratch.ArgumentType.STRING,
                  "menu":"listMenu"
                },
              }                 
            },
            {
              "opcode": "listContains",
              "blockType": Scratch.BlockType.BOOLEAN,
              "text": "Does [List] contain [term]",
              "blockIconURI":listIco,
              "arguments": {
                "term":{
                  "type": Scratch.ArgumentType.STRING,
                  "defaultValue":"Dango"
                },
                "List":{
                  "type": Scratch.ArgumentType.STRING,
                  "menu":"listMenu"
                },
              }                 
            },
            {
              "opcode": "itemNumberInList",
              "blockType": Scratch.BlockType.REPORTER,
              "text": "Item # of [term] in [List]",
              "blockIconURI":listIco,
              "arguments": {
                "term":{
                  "type": Scratch.ArgumentType.STRING,
                  "defaultValue":"Dango"
                },
                "List":{
                  "type": Scratch.ArgumentType.STRING,
                  "menu":"listMenu"
                },
              }                 
            },
            "---",
            {
              "opcode": "touchingOriginal",
              "blockType": Scratch.BlockType.BOOLEAN,
              "text": "Touching the original [Sprite]?",
              "blockIconURI":catIco,
              "filter": [Scratch.TargetType.SPRITE],
              "arguments": {
                "Sprite":{
                  "type": Scratch.ArgumentType.STRING,
                  "menu":"spriteMenu"
                },
              }                 
            },
            {
              "opcode": "touchingClone",
              "blockType": Scratch.BlockType.BOOLEAN,
              "text": "Touching a clone of [Sprite]?",
              "blockIconURI":catIco,
              "filter": [Scratch.TargetType.SPRITE],
              "arguments": {
                "Sprite":{
                  "type": Scratch.ArgumentType.STRING,
                  "menu":"spriteMenu"
                },
              }                 
            },
            "---",
            {
              "opcode": "getClipBoard",
              "blockType": Scratch.BlockType.REPORTER,
              "text": "Copied Contents",
              "blockIconURI":clipboardIco,
              "filter": [Scratch.TargetType.SPRITE],
              "disableMonitor":true,
              "arguments": {
                "Sprite":{
                  "type": Scratch.ArgumentType.STRING,
                  "menu":"spriteMenu"
                },
              }                 
            },
            {
              "opcode": "getDeviceSpeed",
              "blockIconURI": deviceVelIco,
              "blockType": Scratch.BlockType.REPORTER,
              "text": "Get the [type] speed on the [axis] axis.",
              "filter": [Scratch.TargetType.SPRITE],
              "disableMonitor":true,
              "arguments": {
                "type":{
                  "type": Scratch.ArgumentType.STRING,
                  "menu":"velocitymenu"
                },
                "axis":{
                  "type": Scratch.ArgumentType.STRING,
                  "menu":"axismenu"
                },
              }                 
            },
          ],
          menus: {
            "fingerIDMenu":{
              acceptReporters: true,
              items:["1","2","3","4","5","6","7","8","9","10"]
            },
            "coordmenu":[
              "x","y"
            ],
            "axismenu":[
              "x","y","z"
            ],
            "velocitymenu":[
              "positional","rotational"
            ],
            "spriteMenu":{
              items:"getSprites"
            },
            "listMenu":{
                items:"getLists"
            }
          }
      };
    }

    getDeviceSpeed({type,axis}){
      if(type == "positional"){
        if(axis == "x"){
          return deviceTransforms.x;
        }
        else if(axis == "y"){
          return deviceTransforms.y;
        }
        else if(axis == "z"){
          return deviceTransforms.z;
        }
      }
      else if(type == "rotational"){
        if(axis == "x"){
          return deviceTransforms.rotX;
        }
        else if(axis == "y"){
          return deviceTransforms.rotY;
        }
        else if(axis == "z"){
          return deviceTransforms.rotZ;
        }
      }
      return 0;
    }

    getClipBoard(){
      return new Promise((resolve) => {
        resolve(navigator.clipboard.readText() || "");
      })
    }

    getFingersTouching(){
      return fingersDown;
    }

    getSprites(){
      let spriteNames = [];
      const targets = Scratch.vm.runtime.targets
      const myself = Scratch.vm.runtime._editingTarget.sprite.name
      for (let index = 0; index < targets.length; index++) { // We start from 1 so we don't grab the stage.
          const sprite = targets[index].sprite; //Don't put name so that we can do other stuff with the sprites if we want to.
          if(targets[index].isOriginal && !targets[index].isStage){
              spriteNames.push(sprite.name);
              objDat[sprite.name] = targets[index].id;
          }
      }
      if(spriteNames.length == 0){
        spriteNames.push({text:"No other sprites",value:null});
      }
      return spriteNames;
    }

    getLists(myID){
        vmSurfer.refreshJSON()
        const keynames = Object.keys(vmSurfer.sprites);

        let lists = []
        for (let currentSprite = 0; currentSprite < keynames.length; currentSprite++) {
          const sprite = vmSurfer.sprites[keynames[currentSprite]];
          if(myID != sprite.id){
            const listKeys = Object.keys(sprite.lists);
            for (let currentList = 0; currentList < listKeys.length; currentList++) {
              const list = sprite.lists[listKeys[currentList]];
              const objName = sprite.name + " : " + list.name;
              listDat[objName] = {text:sprite.name + " : " + list.name,value:JSON.stringify({sprID:currentSprite,listid:list.id})};
              lists.push(objName);
            }
          }
        }

        return (lists.length > 0) ? lists : ["No local lists exist"];  
    }

    touchingFinger(args,util){
      for (let index = 0; index < fingerPositions.length; index++) {
        const fingerPos = fingerPositions[index];
        if (fingerPos != null){
          const touching = util.target.isTouchingPoint(fingerPos[0],fingerPos[1]);
          if(touching){
            return touching;
          }
        }
      }
      return false;
    }

    touchingSpecificFinger({ID}, util){
      const fingerPos = fingerPositions[ID];
        if (fingerPos != null){
          const touching = util.target.isTouchingPoint(fingerPos[0],fingerPos[1]);
          return touching;
        }
        return false
    }

    getTouchingFingerID(args,util){
      for (let index = 0; index < fingerPositions.length; index++) {
        const fingerPos = fingerPositions[index];
        if (fingerPos != null){
          const touching = util.target.isTouchingPoint(fingerPos[0],fingerPos[1]);
          if(touching){
            return index+1;
          }
        }
      }
      return 0;
    }

    fingerPosition({ID,PositionType}){
      if (fingerPositions[parseInt(ID) - 1])
      {
        const positionIndex = (PositionType == "x") ? 0 : 1;
        const finger = [fingerPositions[parseInt(ID) - 1][0],fingerPositions[parseInt(ID) - 1][1]]
        let scratchCoords = finger;
        const runtime = Scratch.vm.runtime;

        const canvasRect = canvas.getBoundingClientRect();
        if(PositionType == "x"){
          const clientWidth = canvasRect.right - canvasRect.left;
          const toScratch = runtime.stageWidth / clientWidth
          scratchCoords[0] *= toScratch;
          scratchCoords[0] -= runtime.stageWidth/2
        }
        else{
          const clientheight = canvasRect.bottom - canvasRect.top;
          const toScratch = runtime.stageHeight / clientheight
          scratchCoords[1] *= toScratch;
          scratchCoords[1] = (runtime.stageHeight/2) - scratchCoords[1]
        }
        return scratchCoords[positionIndex];
      }
      return 0;
    }

    isFingerDown({ID}){
        if(fingerPositions[parseInt(ID)-1] != null){
            return true;
        }
        return false;
    }

    

    listInSprite({index,List}){
      if(List == "No local lists exist"){
        return "";
      }
      const DesiredList = JSON.parse(listDat[List].value);
      const SpriteID = DesiredList.sprID;
      const ListID = DesiredList.listid;
      const keys = Object.keys(vmSurfer.sprites);
      const variable = vmSurfer.sprites[keys[SpriteID]].lists[ListID];
      const items = variable.value;

      const itemNumber = Math.floor(Number(index));
      if(itemNumber < 1 || itemNumber > items.length || typeof itemNumber === "Number"){
        return "";
      }
      return items[itemNumber - 1];
    }

    listContains({term,List}){
      if(List == "No local lists exist"){
        return false;
      }
      const DesiredList = JSON.parse(listDat[List].value);
      const SpriteID = DesiredList.sprID;
      const ListID = DesiredList.listid;
      const keys = Object.keys(vmSurfer.sprites);
      const variable = vmSurfer.sprites[keys[SpriteID]].lists[ListID];
      const items = variable.value;

      return items.includes(term);
    }

    lengthOfListInSprite({List}){
      if(List == "No local lists exist"){
        return 0;
      }
      const DesiredList = JSON.parse(listDat[List].value);
      const SpriteID = DesiredList.sprID;
      const ListID = DesiredList.listid;
      const keys = Object.keys(vmSurfer.sprites);
      const variable = vmSurfer.sprites[keys[SpriteID]].lists[ListID];
      const items = variable.value;
      return items.length;
    }

    itemNumberInList({term,List}){
      if(List == "No local lists exist"){
        return ""
      }
      const DesiredList = JSON.parse(listDat[List].value);
      const SpriteID = DesiredList.sprID;
      const ListID = DesiredList.listid;
      const keys = Object.keys(vmSurfer.sprites);
      const variable = vmSurfer.sprites[keys[SpriteID]].lists[ListID];
      const items = variable.value;

      return (items.indexOf(term) == -1) ? "" : items.indexOf(term) + 1;
    }

    touchingOriginal({Sprite},util){
      const DesiredSprite = objDat[Sprite];
      return Scratch.vm.renderer.isTouchingDrawables(util.target.drawableID,[vmSurfer.sprites[DesiredSprite].originalOBJ.drawableID]);
    }

    touchingClone({Sprite},util){
      const DesiredSprite = objDat[Sprite];
      const DesieredClones = vmSurfer.sprites[DesiredSprite].originalOBJ.sprite.clones.filter(clone => !clone.isOriginal).map(clone => clone.drawableID);
      if(DesieredClones.length > 0){
        return Scratch.vm.renderer.isTouchingDrawables(util.target.drawableID,DesieredClones);
      }
      return false;
    }
  }
  Scratch.extensions.register(new SensingPlus());
})(window.Scratch);
