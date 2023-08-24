// Name: NFCWarp
// ID: alestorenfc
// Description: Allows reading data from NFC (NDEF) devices. Only works in Chrome on Android.
// By: Alestore Games <https://scratch.mit.edu/users/aleb2005/>

(function (Scratch) {
  "use strict";

  /* globals NDEFReader */

  const extIcon =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAACN0lEQVR4nK2WzW7TQBDHDRIVHCr6CYV+PUG5hENvlpKdfyxX6q0SanmVqo+AkKqqPAG8CAVE1RJaKYn6cSiiIO70RBnYydi4ttcJjiPtIbsz/59nPZ4Zz9MfEz1nog8MXDHAhYvoGxPtMDAvvrXaHQZeJ2ysxnsGNiL9HgR4lRK6YOB8AOAPNmZJNJaX76lf2m73XyTZwwM2ZoGBswFgLfa8W6q16bBb9zTEDEgjnWei074wgMTemKeOh9nzHO9EQOIcBHNMdNInqheJ67vOOf/pOZxjkAjU67MMdAtAe4mkusyzKQTx6uooAxN6LY+ZqOMAXSYSq/v/oDBclMRoNCblf7P5iInaOaBrm+IKOiwLskKf2Pen9GoeMHCU8THmvoIOyoMGgdXrD6sBRd+MC2bMwvAg+y0RHcewIJjW1J+OsywMF6uIaF9Egc8Ka3MYzqjwfqWgRAStGGazsFKQvZ6b19XS/eO4Hg4F6hXWaO/IJoDs+/6UZGHSZ8iIZlJZ17EVQs5WVsYZ+FgNqCfGTpjvj8WwkqBDcVpbG2Hgdw6sbRNBbBqNSREvBSLqJIrkd5cNR5EBE7YAl4noawKU1xhZV9e2kNRY4ARlGx/RL/b9u+r4sgDE0hSDYK4QpI3vnUOkpineLARBS1Q0EeWD3tqDDYfzpjhubd2OS0/xOtPvLg/0LAp3N+fwi50BtBo8kdGqP+w8M3IR7aRnu3Xb+2+8M6I3cee0Qwqw7ZoJUutKtKJI/gr8AfOqgU5hKhA4AAAAAElFTkSuQmCC";
  const blocksIcon =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMCIgd2lkdGg9IjE2MDAuMDAwMDAwcHQiIGhlaWdodD0iMTYwMC4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDE2MDAuMDAwMDAwIDE2MDAuMDAwMDAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0Ij4KPG1ldGFkYXRhIGZpbGw9IiNmZmZmZmYiPgpDcmVhdGVkIGJ5IHBvdHJhY2UgMS4xNSwgd3JpdHRlbiBieSBQZXRlciBTZWxpbmdlciAyMDAxLTIwMTcKPC9tZXRhZGF0YT4KPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsMTYwMC4wMDAwMDApIHNjYWxlKDAuMTAwMDAwLC0wLjEwMDAwMCkiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0ibm9uZSI+CjxwYXRoIGQ9Ik0yNjk3IDE1OTg5IGMtNTY1IC01MCAtMTEwOCAtMjY0IC0xNTY3IC02MTkgLTExNCAtODggLTM5MSAtMzYyIC00ODQgLTQ4MCAtMTY0IC0yMDYgLTM0MCAtNTA5IC00MzQgLTc0NSAtODQgLTIxMSAtMTQzIC00MzAgLTE4NCAtNjgwIGwtMjMgLTE0MCAtMyAtNTEwNSBjLTIgLTM3MDkgMCAtNTE0NSA4IC01MjUwIDcwIC05MDUgNTQ5IC0xNzI0IDEzMDQgLTIyMjkgMzU3IC0yMzkgNzc4IC00MDIgMTIwMyAtNDY2IDIwOSAtMzIgNDA0IC0zNiAxNDM4IC0zMyBsMTAzMCAzIC01MCAyOSBjLTQ3MyAyNzIgLTkwMCA5ODAgLTExMzUgMTg4MCAtMTM2IDUyMSAtMjAwIDk1MiAtMjYyIDE3NjYgLTkgMTE2IC0xMyAxNTYzIC0xNSA1NzE5IGwtMyA1NTY0IDU5IC01NCBjMzMgLTMwIDE0NTAgLTE0MzMgMzE1MCAtMzExOSBsMzA5MSAtMzA2NSAwIC05NjAgMCAtOTYwIC0xNjcgMTY2IGMtMjc2IDI3MiAtMzY2MiAzNjM3IC00Mjg4IDQyNjEgbC01ODAgNTc4IC0zIC0zMDI4IGMtMyAtMzA1NiAwIC0zMzg3IDM0IC0zOTU3IDc2IC0xMjg5IDI1NyAtMjI1MSA1NTggLTI5NjggNTggLTEzOCAxOTUgLTQwNCAyNzEgLTUyNyAxNTYgLTI1MSA0MzQgLTU2MCA2NDggLTcxOSAzNTcgLTI2NiA3NzkgLTQ0OSAxMzIwIC01NzEgbDE3NyAtNDEgMjYzMyA0IGMyODk0IDMgMjY2NyAtMiAyOTgzIDYyIDk2MSAxOTQgMTc4NyA4OTMgMjE0OCAxODE2IDg2IDIyMSAxNDAgNDMwIDE4MyA3MDkgMTYgMTA4IDE4IDQxMyAyMSA1MTg1IDIgMzQ1NCAwIDUxMTcgLTggNTIxNyAtMTkgMjc4IC02MSA0OTAgLTE0NCA3NDMgLTM3NCAxMTI2IC0xMzc3IDE5MTQgLTI1NjEgMjAxNSAtNzIgNiAtNTU1IDEwIC0xMjAwIDEwIGwtMTA4MCAwIDU4IC0zMyBjMTAwIC01NiAxNzkgLTExOSAyOTcgLTIzNyA0NjUgLTQ2MyA4MDggLTEyNzMgOTc5IC0yMzEwIDU0IC0zMjkgODkgLTY1NCAxMjMgLTExNDUgOCAtMTI1IDEyIC0xNjI3IDE1IC01NzA0IGw0IC01NTMzIC0zOSAzMyBjLTIyIDE5IC0xMDc0IDEwNjAgLTIzMzggMjMxNCAtMTI2NCAxMjU0IC0yNjY1IDI2NDIgLTMxMTEgMzA4NSBsLTgxMyA4MDUgMCA5NjQgMCA5NjMgMTg1MyAtMTg0MyBjMTAxOCAtMTAxNCAyMTUyIC0yMTQzIDI1MjAgLTI1MDggbDY2NyAtNjY1IDAgMzAyNSBjMCAxNzQ5IC00IDMxNTMgLTEwIDMzMjkgLTU3IDE3OTQgLTI3NCAyOTkyIC02OTUgMzgzOCAtMTUzIDMwOCAtMzExIDUzNiAtNTI1IDc1NiAtMjIxIDIyNyAtNDQxIDM4NiAtNzM1IDUzMSAtMjY2IDEzMSAtNTM2IDIyMyAtODgzIDMwMSBsLTE1NCAzNCAtMjU5NiAtMSBjLTE0MjkgLTEgLTI2MzYgLTUgLTI2ODUgLTEweiIgZmlsbD0iI2ZmZmZmZiIvPgo8L2c+Cjwvc3ZnPg==";

  class NFCWarp {
    getInfo() {
      return {
        id: "alestorenfc",
        name: "NFCWarp",
        color1: "#FF4646",
        color2: "#FF0000",
        color3: "#990033",
        menuIconURI: extIcon,
        blockIconURI: blocksIcon,
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Only works in Chrome on Android",
          },
          {
            opcode: "supported",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "NFC supported?",
          },
          {
            opcode: "nfcRead",
            blockType: Scratch.BlockType.REPORTER,
            text: "read NFC tag",
            disableMonitor: true,
          },
        ],
      };
    }

    supported() {
      return typeof NDEFReader !== "undefined";
    }

    nfcRead() {
      if (!this.supported()) {
        return "NFC not supported";
      }
      return new Promise((resolve, reject) => {
        const ndef = new NDEFReader();
        ndef
          .scan()
          .then(() => {
            ndef.onreadingerror = (event) => {
              console.log("Reading error", event);
              resolve("Tag not supported");
            };
            ndef.onreading = (evt) => {
              const decoder = new TextDecoder();
              const record = evt.message.records[0];
              console.log("Record type: " + record.recordType);
              console.log("Record encoding: " + record.encoding);
              console.log("Record data: " + decoder.decode(record.data));
              resolve(decoder.decode(record.data));
            };
          })
          .catch((error) => {
            console.log("Scan error", error);
            resolve(`Error: ${error}`);
          });
      });
    }
  }

  Scratch.extensions.register(new NFCWarp());
})(Scratch);
