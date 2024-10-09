// Name: Mouse Speed
// ID: hammouda101010mousespeed
// Description: Get The Speed of the Mouse.
// By: Hammouda101010 <https://scratch.mit.edu/users/hammouda101010/>
// License: MIT

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This Hello World example must run unsandboxed");
  }
  // Block Icon
  const blockIconURI =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMzkuNjk1NDQiIGhlaWdodD0iMTM5LjY5NTQ0IiB2aWV3Qm94PSIwLDAsMTM5LjY5NTQ0LDEzOS42OTU0NCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3MC4xNTIyOCwtMTEwLjE1MjI4KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMTc1LjE1MjI4LDE4MGMwLC0zNS44MTQ0MSAyOS4wMzMzMSwtNjQuODQ3NzIgNjQuODQ3NzIsLTY0Ljg0NzcyYzM1LjgxNDQxLDAgNjQuODQ3NzIsMjkuMDMzMzEgNjQuODQ3NzIsNjQuODQ3NzJjMCwzNS44MTQ0MSAtMjkuMDMzMzEsNjQuODQ3NzIgLTY0Ljg0NzcyLDY0Ljg0NzcyYy0zNS44MTQ0MSwwIC02NC44NDc3MiwtMjkuMDMzMzEgLTY0Ljg0NzcyLC02NC44NDc3MnoiIGZpbGw9IiMwMGUwZmYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxnPjxwYXRoIGQ9Ik0yMzMuMTc2NjQsMTc5LjkyMjA5bC04LjU4OTA5LC0zOC41NzcyMWwxMi4yMjk0Niw1LjAxMDgxbDE3LjY1MzQ5LDMzLjU2NjM5bC0xNy40MTk5MywzNC42MTY3NGwtMTIuNDYzMDIsMy45NjA0NnoiIGZpbGw9IiMwMGE0ZmYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI1Ny4zNTE5NiwxODEuMzExNWwtOC41ODkwOSwtMzguNTc3MjFsMTIuMjI5NDYsNS4wMTA4MWwxNy42NTM1LDMzLjU2NjM5bC0xNy40MTk5MywzNC42MTY3NGwtMTIuNDYzMDIsMy45NjA0NnoiIGZpbGw9IiMwMGE0ZmYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTIwOS45NDMyNywxODAuNTI0OTJsLTguNTg5MDksLTM4LjU3NzJsMTIuMjI5NDYsNS4wMTA4MWwxNy42NTM1LDMzLjU2NjM5bC0xNy40MTk5MywzNC42MTY3NGwtMTIuNDYzMDIsMy45NjA0NnoiIGZpbGw9IiMwMGE0ZmYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI1MS42MDMyMiwyMTcuOTU3NmwtMTEuMTgzLC0yMC4xNjMzbC0xOC4wMTI3LDExLjMzMjVsLTAuNzgzNywtNjkuMDE1NWw0Ny42NjYxLDQ4LjM1MzhsLTE2LjY1NzIsMy43MDc3bDEwLjMzNTksMTguOTc3M2MwLDAgMS4zMjU4LDQuNTI1NCAtMi44MjUxLDcuMTEzMmMtNC45NTY3LDMuMDkwMyAtOC41NDAzLC0wLjMwNTcgLTguNTQwMywtMC4zMDU3eiIgZmlsbD0iIzAwZTBmZiIgc3Ryb2tlPSIjMDA2YWEyIiBzdHJva2Utd2lkdGg9IjQuNSIvPjwvZz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjo2OS44NDc3MjExODc2MzE4Mzo2OS44NDc3MjExODc2MzIwMi0tPg==";
  const menuIconURI =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMzkuNjk1NDQiIGhlaWdodD0iMTM5LjY5NTQ0IiB2aWV3Qm94PSIwLDAsMTM5LjY5NTQ0LDEzOS42OTU0NCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3MC4xNTIyOCwtMTEwLjE1MjI4KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMTc1LjE1MjI4LDE4MGMwLC0zNS44MTQ0MSAyOS4wMzMzMSwtNjQuODQ3NzIgNjQuODQ3NzIsLTY0Ljg0NzcyYzM1LjgxNDQxLDAgNjQuODQ3NzIsMjkuMDMzMzEgNjQuODQ3NzIsNjQuODQ3NzJjMCwzNS44MTQ0MSAtMjkuMDMzMzEsNjQuODQ3NzIgLTY0Ljg0NzcyLDY0Ljg0NzcyYy0zNS44MTQ0MSwwIC02NC44NDc3MiwtMjkuMDMzMzEgLTY0Ljg0NzcyLC02NC44NDc3MnoiIGZpbGw9IiMwMGUwZmYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxnPjxwYXRoIGQ9Ik0yMzMuMTc2NjQsMTc5LjkyMjA5bC04LjU4OTA5LC0zOC41NzcyMWwxMi4yMjk0Niw1LjAxMDgxbDE3LjY1MzQ5LDMzLjU2NjM5bC0xNy40MTk5MywzNC42MTY3NGwtMTIuNDYzMDIsMy45NjA0NnoiIGZpbGw9IiMwMGE0ZmYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI1Ny4zNTE5NiwxODEuMzExNWwtOC41ODkwOSwtMzguNTc3MjFsMTIuMjI5NDYsNS4wMTA4MWwxNy42NTM1LDMzLjU2NjM5bC0xNy40MTk5MywzNC42MTY3NGwtMTIuNDYzMDIsMy45NjA0NnoiIGZpbGw9IiMwMGE0ZmYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTIwOS45NDMyNywxODAuNTI0OTJsLTguNTg5MDksLTM4LjU3NzJsMTIuMjI5NDYsNS4wMTA4MWwxNy42NTM1LDMzLjU2NjM5bC0xNy40MTk5MywzNC42MTY3NGwtMTIuNDYzMDIsMy45NjA0NnoiIGZpbGw9IiMwMGE0ZmYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI1MS42MDMyMiwyMTcuOTU3NmwtMTEuMTgzLC0yMC4xNjMzbC0xOC4wMTI3LDExLjMzMjVsLTAuNzgzNywtNjkuMDE1NWw0Ny42NjYxLDQ4LjM1MzhsLTE2LjY1NzIsMy43MDc3bDEwLjMzNTksMTguOTc3M2MwLDAgMS4zMjU4LDQuNTI1NCAtMi44MjUxLDcuMTEzMmMtNC45NTY3LDMuMDkwMyAtOC41NDAzLC0wLjMwNTcgLTguNTQwMywtMC4zMDU3eiIgZmlsbD0iIzAwZTBmZiIgc3Ryb2tlPSIjMDA2YWEyIiBzdHJva2Utd2lkdGg9IjQuNSIvPjwvZz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjo2OS44NDc3MjExODc2MzE4Mzo2OS44NDc3MjExODc2MzIwMi0tPg==";

  // Scratch's VM
  const vm = Scratch.vm;
  let tolerence = 50 // Tolerence of the mouse's speed

  class MouseSpeed {
    constructor() {
      this.mouseX = 0; // Current mouse X position
      this.mouseY = 0; // Current mouse Y position
      this.lastX = 0; // Previous mouse X position
      this.lastY = 0; // Previous mouse Y position
      this.lastTime = performance.now(); // Last time the mouse was updated
      this.speed = 0; // Speed of the mouse

      // Bind this to the event listener to track mouse movement
      vm.renderer.canvas.addEventListener(
        "mousemove",
        this.handleMouseMove.bind(this)
      );

      // Start a continuous update interval to constantly track mouse speed
      setInterval(() => this.updateMouseSpeed(), 50); // Updates every 50ms
    }

    getInfo() {
      return {
        id: "mousespeed",
        name: "Mouse Speed",
        menuIconURI: menuIconURI,
        blockIconURI: blockIconURI,
        docsURI: "https://extensions.turbowarp.org/Hammouda101010/mousespeed",
        color1: "#38C3E5",
        color2: "#33A5C1",
        blocks: [
          {
            opcode: "getMouseSpeed",
            blockType: Scratch.BlockType.REPORTER,
            text: "mouse speed",
          },
          {
            opcode: "mouseFaster",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is mouse faster than [SPEED]?",
            arguments: {
              SPEED: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50
              },
            },
          },
          {
            opcode: "mouseTolerence",
            blockType: Scratch.BlockType.COMMAND,
            text: "set mouse tolerence to [TOLERENCE]",
            arguments:{
              TOLERENCE: {
                type: Scratch.ArgumentType.NUMBER,
                deafultValue: 50
              }
            }
          }
        ],
      };
    }

    // Handles Mouse Speed
    handleMouseMove(event) {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    }

    //Updates Mouse Speed:
    updateMouseSpeed() {
      const currentTime = performance.now();
      const timeElapsed = (currentTime - this.lastTime) / 1000; // Time in seconds

      if (timeElapsed > 0) {
        const dx = this.mouseX - this.lastX;
        const dy = this.mouseY - this.lastY;

        // Calculate the distance traveled by the mouse
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Calculate speed in pixels per second
        this.speed = distance / timeElapsed;
      }

      // Update the last known mouse position and time
      this.lastX = this.mouseX;
      this.lastY = this.mouseY;
      this.lastTime = currentTime;
    }

    getMouseSpeed() {
      //Gets Mouse Speed
      return Math.round(this.speed / tolerence); // Return the rounded speed
    }
    mouseFaster(args) {
      // Checks if mouse speed is greater than the SPEED arg
      return this.getMouseSpeed() > args.SPEED;
    }
    mouseTolerence(args) {
      //sets the mouse's tolerence
      tolerence = args.TOLERENCE
    }
  }
  Scratch.extensions.register(new MouseSpeed());
})(Scratch);
