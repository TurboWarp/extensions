(function(Scratch) {
  'use strict';

  /* globals NDEFReader */

  const blocksIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMCIgd2lkdGg9IjE2MDAuMDAwMDAwcHQiIGhlaWdodD0iMTYwMC4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDE2MDAuMDAwMDAwIDE2MDAuMDAwMDAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0Ij4KPG1ldGFkYXRhIGZpbGw9IiNmZmZmZmYiPgpDcmVhdGVkIGJ5IHBvdHJhY2UgMS4xNSwgd3JpdHRlbiBieSBQZXRlciBTZWxpbmdlciAyMDAxLTIwMTcKPC9tZXRhZGF0YT4KPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsMTYwMC4wMDAwMDApIHNjYWxlKDAuMTAwMDAwLC0wLjEwMDAwMCkiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0ibm9uZSI+CjxwYXRoIGQ9Ik0yNjk3IDE1OTg5IGMtNTY1IC01MCAtMTEwOCAtMjY0IC0xNTY3IC02MTkgLTExNCAtODggLTM5MSAtMzYyIC00ODQgLTQ4MCAtMTY0IC0yMDYgLTM0MCAtNTA5IC00MzQgLTc0NSAtODQgLTIxMSAtMTQzIC00MzAgLTE4NCAtNjgwIGwtMjMgLTE0MCAtMyAtNTEwNSBjLTIgLTM3MDkgMCAtNTE0NSA4IC01MjUwIDcwIC05MDUgNTQ5IC0xNzI0IDEzMDQgLTIyMjkgMzU3IC0yMzkgNzc4IC00MDIgMTIwMyAtNDY2IDIwOSAtMzIgNDA0IC0zNiAxNDM4IC0zMyBsMTAzMCAzIC01MCAyOSBjLTQ3MyAyNzIgLTkwMCA5ODAgLTExMzUgMTg4MCAtMTM2IDUyMSAtMjAwIDk1MiAtMjYyIDE3NjYgLTkgMTE2IC0xMyAxNTYzIC0xNSA1NzE5IGwtMyA1NTY0IDU5IC01NCBjMzMgLTMwIDE0NTAgLTE0MzMgMzE1MCAtMzExOSBsMzA5MSAtMzA2NSAwIC05NjAgMCAtOTYwIC0xNjcgMTY2IGMtMjc2IDI3MiAtMzY2MiAzNjM3IC00Mjg4IDQyNjEgbC01ODAgNTc4IC0zIC0zMDI4IGMtMyAtMzA1NiAwIC0zMzg3IDM0IC0zOTU3IDc2IC0xMjg5IDI1NyAtMjI1MSA1NTggLTI5NjggNTggLTEzOCAxOTUgLTQwNCAyNzEgLTUyNyAxNTYgLTI1MSA0MzQgLTU2MCA2NDggLTcxOSAzNTcgLTI2NiA3NzkgLTQ0OSAxMzIwIC01NzEgbDE3NyAtNDEgMjYzMyA0IGMyODk0IDMgMjY2NyAtMiAyOTgzIDYyIDk2MSAxOTQgMTc4NyA4OTMgMjE0OCAxODE2IDg2IDIyMSAxNDAgNDMwIDE4MyA3MDkgMTYgMTA4IDE4IDQxMyAyMSA1MTg1IDIgMzQ1NCAwIDUxMTcgLTggNTIxNyAtMTkgMjc4IC02MSA0OTAgLTE0NCA3NDMgLTM3NCAxMTI2IC0xMzc3IDE5MTQgLTI1NjEgMjAxNSAtNzIgNiAtNTU1IDEwIC0xMjAwIDEwIGwtMTA4MCAwIDU4IC0zMyBjMTAwIC01NiAxNzkgLTExOSAyOTcgLTIzNyA0NjUgLTQ2MyA4MDggLTEyNzMgOTc5IC0yMzEwIDU0IC0zMjkgODkgLTY1NCAxMjMgLTExNDUgOCAtMTI1IDEyIC0xNjI3IDE1IC01NzA0IGw0IC01NTMzIC0zOSAzMyBjLTIyIDE5IC0xMDc0IDEwNjAgLTIzMzggMjMxNCAtMTI2NCAxMjU0IC0yNjY1IDI2NDIgLTMxMTEgMzA4NSBsLTgxMyA4MDUgMCA5NjQgMCA5NjMgMTg1MyAtMTg0MyBjMTAxOCAtMTAxNCAyMTUyIC0yMTQzIDI1MjAgLTI1MDggbDY2NyAtNjY1IDAgMzAyNSBjMCAxNzQ5IC00IDMxNTMgLTEwIDMzMjkgLTU3IDE3OTQgLTI3NCAyOTkyIC02OTUgMzgzOCAtMTUzIDMwOCAtMzExIDUzNiAtNTI1IDc1NiAtMjIxIDIyNyAtNDQxIDM4NiAtNzM1IDUzMSAtMjY2IDEzMSAtNTM2IDIyMyAtODgzIDMwMSBsLTE1NCAzNCAtMjU5NiAtMSBjLTE0MjkgLTEgLTI2MzYgLTUgLTI2ODUgLTEweiIgZmlsbD0iI2ZmZmZmZiIvPgo8L2c+Cjwvc3ZnPg==';

  class NFCWarp {
    getInfo() {
      return {
        id: 'alestorenfc',
        name: 'NFCWarp',
        color1: '#ff0000',
        color2: '#800000',
        color3: '#990033',
        menuIconURI: blocksIcon,
        blockIconURI: blocksIcon,
        blocks: [
          {
            opcode: 'nfcRead',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Read NFC Tag',
            disableMonitor: true
          }
        ]
      };
    }

    nfcRead() {
      if (typeof NDEFReader === 'undefined') {
        return '';
      }
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line
        const ndef = new NDEFReader();
        ndef.scan()
          .then(() => {
            ndef.onreadingerror = err => {
              console.log('Reading error', err);
              reject(err);
            };
            ndef.onreading = evt => {
              const decoder = new TextDecoder();
              let record = evt.message.records[0];
              console.log('Record type: ' + record.recordType);
              console.log('Record encoding: ' + record.encoding);
              console.log('Record data: ' + decoder.decode(record.data));
              resolve(decoder.decode(record.data));
            };
          })
          .catch(err => {
            console.log('Scan error' + err.message);
            reject(err);
          });
      });
    }
  }

  Scratch.extensions.register(new NFCWarp());
})(Scratch);
