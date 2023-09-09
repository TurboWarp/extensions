// Name: Frames
// ID: truefantomframes
// Description: Various blocks for working with frames and delta timing.
// By: TrueFantom <https://scratch.mit.edu/users/TrueFantom/>
// Original: XeroName <https://scratch.mit.edu/users/plant2014/>

(Scratch => {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Frames Extension must be run Unsandboxed!");
  }

  const icon_uri = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMjUuMzU0OCIgaGVpZ2h0PSIyMjUuMzU0OCIgdmlld0JveD0iMCwwLDIyNS4zNTQ4LDIyNS4zNTQ4Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTI3LjMyMzA1LC02Ny4zMjI2KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0xMjcuMzIzMDYsMTgwYzAsLTYyLjIzMDAxIDUwLjQ0NzM5LC0xMTIuNjc3NCAxMTIuNjc3NCwtMTEyLjY3NzRjNjIuMjMwMDEsMCAxMTIuNjc3NCw1MC40NDczOSAxMTIuNjc3NCwxMTIuNjc3NGMwLDYyLjIzMDAxIC01MC40NDczOSwxMTIuNjc3NCAtMTEyLjY3NzQsMTEyLjY3NzRjLTYyLjIzMDAxLDAgLTExMi42Nzc0LC01MC40NDczOSAtMTEyLjY3NzQsLTExMi42Nzc0eiIgZmlsbD0iI2FmNTVkZCIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI5OS4yMTcyNywxMTMuMzgwNThjOC4xNzY0MiwwIDE0LjgwNDMxLDYuNjI4MTIgMTQuODA0MzEsMTQuODA0MzJ2MTAzLjYzMDJjMCw4LjE3NjQyIC02LjYyNzg5LDE0LjgwNDMyIC0xNC44MDQzMSwxNC44MDQzMmgtMTE4LjQzNDUyYy04LjE3NjIsMCAtMTQuODA0MzIsLTYuNjI3OSAtMTQuODA0MzIsLTE0LjgwNDMydi0xMDMuNjMwMmMwLC04LjE3NjIgNi42MjgxMiwtMTQuODA0MzIgMTQuODA0MzIsLTE0LjgwNDMyeiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0yNjUuMTA0MiwyMzEuODE1MWgtNTAuMjA4MjV2LTEwMy42MzAyaDUwLjIwODI1eiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiNhZjU1ZGQiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0yMDAuMDkxNywxNTIuODU4NzZoLTE5LjMwODgydi0yNC42NzM4NmgxOS4zMDg4MnoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjYWY1NWRkIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNMjAwLjA5MTcsMjMxLjgxNTExaC0xOS4zMDg4MnYtMjQuNjczODZoMTkuMzA4ODJ6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0iI2FmNTVkZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTIwMC4wOTE3LDE5Mi4zMzY5M2gtMTkuMzA4ODJ2LTI0LjY3Mzg1aDE5LjMwODgyeiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiNhZjU1ZGQiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0yNzkuOTA4NDQsMTI4LjE4NDloMTkuMzA4ODJ2MjQuNjczODZoLTE5LjMwODgyeiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiNhZjU1ZGQiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0yNzkuOTA4NDQsMjA3LjE0MTI1aDE5LjMwODgydjI0LjY3Mzg2aC0xOS4zMDg4MnoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjYWY1NWRkIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNMjc5LjkwODQ0LDE2Ny42NjMwOGgxOS4zMDg4MnYyNC42NzM4NWgtMTkuMzA4ODJ6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0iI2FmNTVkZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvZz48L3N2Zz4=";

  const vm = Scratch.vm;
  const cast = Scratch.Cast;

  let fps = 0;
  let frame_timer = 0;

  let last_frame_time = performance.now();

  vm.runtime.on("BEFORE_EXECUTE", () => {
    const this_frame_time = performance.now();
    fps = 1000 / (this_frame_time - last_frame_time);
    frame_timer++;
    vm.runtime.startHats("truefantomframes_everyFrame");
    last_frame_time = this_frame_time;
  });

  vm.on("PROJECT_START", () => {
    frame_timer = 0;
  });

  class Frames {
    getInfo() {
      return {

        id: "truefantomframes",
        name: "Frames",
        color1: "#af55dd",
        menuIconURI: icon_uri,

        blocks: [
          {
            opcode: "everyFrame",
            blockType: Scratch.BlockType.EVENT,
            isEdgeActivated: false,
            text: "every frame",
          },
          {
            opcode: "getFps",
            blockType: Scratch.BlockType.REPORTER,
            text: "fps",
          },
          {
            opcode: "getDt",
            blockType: Scratch.BlockType.REPORTER,
            text: "Δt",
          },
          "---",
          {
            opcode: "getFrameTimer",
            blockType: Scratch.BlockType.REPORTER,
            text: "frame timer",
          },
          {
            opcode: "resetFrameTimer",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset frame timer",
          },
          "---",
          {
            opcode: "waitFrames",
            blockType: Scratch.BlockType.COMMAND,
            text: "wait [FRAMES] frames",
            arguments: {
              FRAMES: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
        ],
      };
    }

    getFps() {
      return fps;
    }

    getDt() {
      return this._infinityToZero(1 / fps);
    }
    _infinityToZero(num) {
      return num === Infinity ? 0 : num;
    }

    getFrameTimer() {
      return frame_timer;
    }

    resetFrameTimer() {
      frame_timer = 0;
    }

    waitFrames(args, util) {
      const times = Math.round(cast.toNumber(args.FRAMES));
      if (typeof util.stackFrame.loopCounter === "undefined") {
        util.stackFrame.loopCounter = times;
      }
      util.stackFrame.loopCounter--;
      if (util.stackFrame.loopCounter >= 0) {
        util.yieldTick();
      }
    }
  }

  Scratch.extensions.register(new Frames());
})(Scratch);
