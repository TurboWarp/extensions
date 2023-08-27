// Name: Clipboard
// ID: clipboard
// Description: Read and write from the system clipboard.

/*!
 * Copyright 2023 tomyo-code + AdamMady
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Clipboard must run unsandboxed");
  }

  const extensionicon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4MC40NTQ1NCIgaGVpZ2h0PSI4MC40NTQ1NCIgdmlld0JveD0iMCwwLDgwLjQ1NDU0LDgwLjQ1NDU0Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTk5Ljc3MjcyLC0xMzkuNzcyNzIpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTE5OS43NzI3MywxODBjMCwtMjIuMjE2OSAxOC4wMTAzNywtNDAuMjI3MjcgNDAuMjI3MjcsLTQwLjIyNzI3YzIyLjIxNjksMCA0MC4yMjcyNywxOC4wMTAzNyA0MC4yMjcyNyw0MC4yMjcyN2MwLDIyLjIxNjkgLTE4LjAxMDM3LDQwLjIyNzI3IC00MC4yMjcyNyw0MC4yMjcyN2MtMjIuMjE2OSwwIC00MC4yMjcyNywtMTguMDEwMzcgLTQwLjIyNzI3LC00MC4yMjcyN3oiIGZpbGw9IiMwMDgwODAiIHN0cm9rZS13aWR0aD0iMCIvPjxpbWFnZSB4PSI0MzQiIHk9IjMwMCIgdHJhbnNmb3JtPSJzY2FsZSgwLjUsMC41KSIgd2lkdGg9Ijk0IiBoZWlnaHQ9IjExOCIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFGNEFBQUIyQ0FZQUFBQkJMU1ExQUFBQUFYTlNSMElBcnM0YzZRQUFCckpKUkVGVWVGN3RuVnZJYmtNWXgyZTJuTUlPeVNHbDVCQjJTWExNc1lRTFo5cHNaMEl1aEhKQmlkeTZJaUVrNTFPT0VYZkVqZHk0c0pPemN0Z1hLRGtrNStTdmI3Ny9zMzNmM3U5YTYxbnZtdlhNdk85KzNwdXA5VDd6UERPLythOVpzMmF0bVJWRDVUOEFlN0tJMXpNOWx1bTJUTDlqK2dyVGV4ZlNHT09mTlZjdDFseTRoYkk1ZU9NV0FuQXpROTdLZEN0bEVlUU1XRTNsdjYzTVoycFdyZUlkdktrT1V0ZHlHME5LT3EwNHBJOVAxNFFZNDd2R1ZXa05OMjJsUnF1RGd4OE43V1RIQVBibFB4OHczVHhURVQ2bm4vMm8vSDh6K1Iza3BockZiN0xnQVd6QkpyeUo2UWxNdHh6VXRQOW5mcHFLdTN1U1B3Q1A4dmlsSGZIKzR2OC9NZDJaNllxR2ZPRHhreG4vOVliNGovRzRuSGxEcXkzbGU0SnhuMW5xY0wzaUhUeHN3UVBZbmkwaFYvMjloeloxUS80MzJQSW5OaWp1TXg3ZnB5SC9iengrTVAwa2V3RFg4TGljU1UzZFovby94bmhkUS94ZmVIeTd6UFdYTSs0cHhyODRwUTUrRVRNQWMvRFM5NnpKM05JYnVudVZMWDU2ZytLKzVmRmRHOHFSenNnWTQyRU4rZi9nOGFZNzNPZVkvN3lHL0QvdytJNGpjemhWRk8vZ0Z4VnZEcjVMS2JrRWNCa1ZKeGV4Wlg0QnlCekxMZzBCcFp4SDBjOTc3Q0p1cFAzdFRKdjYrT2VaNzl3R3hiL0c0NmZrcW5DRG4zV2llQWUvcUhoejhITFY3V3JvZjJnZzQrZ3VlMm5RQjZpMFc5b3lBT2pxNHlXN2xFTXVoanQwS0YzeWRmWHhLMm1ZN0VJSVJ6TGRyS09pY29adHJTeEhNbHNZMVRqNFJjVlhCLzVIdHVReFREL3Bram9WM210T0JNRDM5THVUeHY4VU51a0pWWXp4ekQ1NUFUVGRFWXNiK2Y4U0huaVFhV3MramVJZGZIdExqUVkrRFRkampCZjBVWXJXRnNCcHRIMVpveFN0M3dsMklxQzlXSitmQi9ocXpLbzljeldLZC9BOVdpZ24rTWVwa0s1WlExWHhBSnhFdzZ1WW5zRTAxL3g3Vnpua1J1bGhHcVpaMFJqalIxMFpOZjhyN2tlU0c0M2lIYnlHT0cxeWduK1Npa2l6YW4xL0FPUk84SDdtM1oxcExROWg1TDVBWm1mUFlYM2x2cUpYbFIyOEh0ZDhnUWR3Tk92K3BuRWZya2MrMlRMTnBZUVFWbEg1di9aeFdGenhEajQwVGZhcEw2NVQ5ZkVBWkpTd2Z4L0ZWR1I3SnhWL1E1OHkxYUI0QjkvU1lwcmhaQy9GQXppQThkNW4yalc3MTBkUWxyYmZVUEV5Q2xQRkxxWjRCOS81UUdlY1BuN0pVLzk3VkJLcDEwaUdtWHYwR2RlWFZMeThidUhnQy9YeHZlYTlLeFMrUEVGN2lJcVhKMTZ0UlMycGVMbTRPbmhMeFZlb1hOTWlGVk84YVMwckRPYmdDeldLZzNmd2hRZ1VDdXVLbjNmd0FPVFo2ZVhHZGIyTDQrdG5qZVBXTVk1MzhNdmJ3YXlyQVpEZWV3OGhwUGUrRFgvcHJlTVlZM29MdVphZmd5L1VFcGJnWlUyUjlQVldWYjZEaW4vRUtxQW1qb1BYVUJyQnhnejhDR1dmYVpjT3ZsRHo1UVF2NnpNdktsU1htUXJyNEFzMWw0TjM4SVVJRkFwcnBuZ0FCN0tPRTFkY0Y2cC9qckN5dzlOTHZGLzRYZVBVd1dzb3RkdFVELzVGbHYvczRYV3R5b01zUTVYZFF0WnFTcWRkcjZ0NWhhOTFPQW5Bd1M5cEVVdndhZVYyQ01GNlBsNGp3Q0UyZnkrOWRtblhTRG40SWNnWDgxWVBYdmI0emIyejBYQjB3enpJeXZTMDRqekdxRnFwYnFsNEIxK2lqeDhtcXZuTGJhYjQrVU0zckVZT2ZoaS9xWE03K0tuUkRjdG9CbjdKUnFHeVUrdXdrbytYTzYzd0dQdExDZzUrNHdhY08vQ3l3K21WNDRrMWkrY1BxZmhEc25ocmNHS3BlQWRmWWh3UElNMVhoeERPR2xOSkdYeW5mUzFqakx0bDhOWG93bEx4RHI2UTRnOW4zT1BHVkZJRzMxOVE4UzlrOEZXRjRoMThDY1dQcVo1WjlHM1d4ODhpbkRITDdPREhwTnZpMjhIUEFmaFJOL3dzeEdlMHNEa1Y3K0I3TkpNWmVBQlhzMXhWclVWU3NQcUs0L3J6RmJacUV3ZmZqV3Jtd1pkYTlkZU50dDBpdmFJWFk1UXZIUXoxbC9KYkt0N0JqM1RuMm5weEJYQXQ0MTZSUlRKMlRyNms0clBPcWxvcTNzR1hVTHlkUUdjamtwbmlad09IWFNrZHZCM3JaWkVjdklNdlJLQlFXRmY4dklNSGNCRHJlRVNodWtyWVR6a3VmNnRrT2N3VTcrQ1hON01sK0ZvV24zMU14Y3NXdTBXRTcrQ0xZTGVkSkx1dmtybWFkNmo0NHdzeE41K2RkUEFsNW1vQXlGZmhaUkZhS2NISi9IcXY3emJsTHF4bEgrL2dTeWcrdDJKbTNaK1o0bWNkVk83eU8vamNSSlgrSEx3U1ZHNHpCNSticU5LZmcxZUN5bTJXRTN6YW56M0d1Q1ozSWVmUlg4NDl5Ung4RDRYa0JKLzJhd2toSEVybGY5MmpISnVNS1lEVnJHeDZEeW1FMFBwVlQ4MmVaQTVlSVo4eHdFdFkyU3BLdm9HbktFNVZKbkdrMG9qZmJlaC9oU2FPUnZFT3ZwM2sxT0JGd1RMWnBXa3d0NW1ld0xwMHJRVGc0S2VIT0UzTzllRFRON2xEQ0JkTzQ4WHpxQW5JenEzcDYwRUxpbmZ3YW5hREREY0N2NUx1MGpQTEVNS3FRZTQ5ODRZRUJMaDhDVGw5UFdoQjhRNStYTEZNQlA4ZjVqR04yQ3N0cTkwQUFBQUFTVVZPUks1Q1lJST0iIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9nPjwvZz48L3N2Zz4=";

  let lastPastedText = "";

  window.addEventListener("copy", (event) => {
    Scratch.vm.runtime.startHats("clipboard_whenCopied");
  });
  window.addEventListener("paste", (event) => {
    Scratch.vm.runtime.startHats("clipboard_whenPasted");
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedText = clipboardData.getData("Text");
    lastPastedText = pastedText;
  });

  class Clipboard {
    getInfo() {
      return {
        id: "clipboard",
        name: "Clipboard",
        blockIconURI: extensionicon,
        color1: "#008080",
        color2: "#006666",
        blocks: [
          {
            opcode: "whenCopied",
            blockType: Scratch.BlockType.EVENT,
            text: "when something is copied",
            isEdgeActivated: false,
          },
          {
            opcode: "whenPasted",
            blockType: Scratch.BlockType.EVENT,
            text: "when something is pasted",
            isEdgeActivated: false,
          },
          "---",
          {
            opcode: "setClipboard",
            blockType: Scratch.BlockType.COMMAND,
            text: "copy to clipboard: [TEXT]",
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "resetClipboard",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset clipboard",
          },
          "---",
          {
            opcode: "clipboard",
            blockType: Scratch.BlockType.REPORTER,
            text: "clipboard",
            disableMonitor: true,
          },
          {
            opcode: "getLastPastedText",
            blockType: Scratch.BlockType.REPORTER,
            text: "last pasted text",
            disableMonitor: true,
          },
        ],
      };
    }

    setClipboard(args) {
      navigator.clipboard.writeText(args.TEXT);
    }

    resetClipboard() {
      navigator.clipboard.writeText("");
    }

    clipboard() {
      if (navigator.clipboard && navigator.clipboard.readText) {
        return Scratch.canReadClipboard().then((allowed) => {
          if (allowed) {
            return navigator.clipboard.readText();
          }
          return "";
        });
      }
      return "";
    }

    getLastPastedText() {
      return lastPastedText;
    }
  }

  Scratch.extensions.register(new Clipboard());
})(Scratch);
