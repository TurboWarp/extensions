// Name: Audio Recording
// ID: samuelloufaudiorecording
// Description: Record, download and play an audio recording.
// By: SamuelLouf <https://scratch.mit.edu/users/samuellouf/>

(function(Scratch) {
  'use strict';

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Audio Recording must run unsandboxed');
  }

  const icon = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzNTkuMzU4ODYiIGhlaWdodD0iMzU5LjM1ODg2IiB2aWV3Qm94PSIwLDAsMzU5LjM1ODg2LDM1OS4zNTg4NiI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTYwLjMyMDU3LC0wLjMyMDU3KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0xNzIuNjkwNjMsMTgwdi0xMTIuMTgyM2MwLC0zNy4xNzQ0MSAzMC4xMzQ5NywtNjcuMzA5MzggNjcuMzA5MzgsLTY3LjMwOTM4YzM3LjE3NDQxLDAgNjcuMzA5MzgsMzAuMTM0OTcgNjcuMzA5MzgsNjcuMzA5Mzh2MTEyLjE4MjNjMCwzNy4xNzQ0MSAtMzAuMTM0OTcsNjcuMzA5MzggLTY3LjMwOTM4LDY3LjMwOTM4Yy0zNy4xNzQ0MSwwIC02Ny4zMDkzOCwtMzAuMTM0OTcgLTY3LjMwOTM4LC02Ny4zMDkzOHpNMzYzLjQwMDUzLDE0Ni4zNDUzMXYzMy42NTQ2OWMwLDYyLjMzMTI5IC00Ni40Nzg1MywxMTMuOTE0MTEgLTEwNi41NzMxOCwxMjIuMTU5NTF2MjMuNjc3NDhoMzkuMjYzOGM2LjE5ODA3LDAgMTEuMjE4MjMsNS4wMjAxNiAxMS4yMTgyMywxMS4yMTgyM3YxMS4yMTgyM2MwLDYuMTk4MDcgLTUuMDIwMTYsMTEuMjE4MjMgLTExLjIxODIzLDExLjIxODIzaC0xMTIuMTgyM2MtNi4xOTgwNywwIC0xMS4yMTgyMywtNS4wMjAxNiAtMTEuMjE4MjMsLTExLjIxODIzdi0xMS4yMTgyM2MwLC02LjE5ODA3IDUuMDIwMTYsLTExLjIxODIzIDExLjIxODIzLC0xMS4yMTgyM2gzOS4yNjM4di0yMy45NDM5MWMtNjEuNzIxMywtOC41MTE4MyAtMTA2LjU3MzE4LC02NC41Mzk4OCAtMTA2LjU3MzE4LC0xMjcuMzkwMDF2LTI4LjE1Nzc2YzAsLTYuMTk4MDcgNS4wMjAxNiwtMTEuMjE4MjMgMTEuMjE4MjMsLTExLjIxODIzaDExLjIxODIzYzYuMTk4MDcsMCAxMS4yMTgyMyw1LjAyMDE2IDExLjIxODIzLDExLjIxODIzdjI5LjY1ODE5YzAsNDYuODQzMTIgMzQuMTUyNSw4OC43NTcyMyA4MC43NzgyNiw5My4zMDc2MmM1My40OTY5Myw1LjIxNjQ4IDk4LjcxMzQxLC0zNi44NjU5MSA5OC43MTM0MSwtODkuMzExMTN2LTMzLjY1NDY5YzAsLTYuMTk4MDcgNS4wMjAxNiwtMTEuMjE4MjMgMTEuMjE4MjMsLTExLjIxODIzaDExLjIxODIzYzYuMTk4MDcsMCAxMS4yMTgyMyw1LjAyMDE2IDExLjIxODIzLDExLjIxODIzeiIgZmlsbD0iI2JkNDJiZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTM2Ny41OTI2MywyNDAuMDU2MzFjMCwyNy4zNDQxOSAtMjIuMTc0MTEsNDkuNTE4MyAtNDkuNTE4Myw0OS41MTgzYy0yNy4zNDM5MSwwIC00OS41MTA4LC0yMi4xNzQzOSAtNDkuNTEwOCwtNDkuNTE4M2MwLC0yNy4zNDM5MSAyMi4xNjY4OSwtNDkuNTEwOCA0OS41MTA4LC00OS41MTA4YzI3LjM0NDE5LDAgNDkuNTE4MywyMi4xNzQ0IDQ5LjUxODMsNDkuNTEwOHoiIGZpbGw9IiNmZjAwMDAiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik02MC4zMjA1NywzNTkuNjc5NDN2LTM1OS4zNTg4NmgzNTkuMzU4ODZ2MzU5LjM1ODg2eiIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTc5LjY3OTQyOTQyOTQyOTM4OjE3OS42Nzk0Mjk0Mjk0MjkzMi0tPg==';

  const hasOwn = (obj, property) =>
    Object.prototype.hasOwnProperty.call(obj, property);

  function json_array_filter( key, json ) {
    try {
      json = JSON.parse(json);
      return JSON.stringify(
        json.map((x) => {
          if (hasOwn(x, key)) {
            return x[key];
          }
          return null;
        })
      );
    } catch (e) {
      return '';
    }
  }

  const if_then_else = (condition, then_return, else_return) => {
    if (condition){
      return then_return;
    } else {
      return else_return;
    }
  }                                                                                                  

  class AudioRecording {
    getInfo() {
      return {
        id: 'samuelloufaudiorecording',
        color1: '#bd42bd',
        color2: '#cf63cf',
        name: 'Audio Recording',
        menuIconURI: icon,
        blocks: [
          // Blocks
          {
            opcode: 'can_record_sound',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'can record sound?'
          }
        ],
        menus: {
          // Menus
        }
      };
    }

    // Functions
    can_record_sound() {
      return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }
    
  }
  Scratch.extensions.register(new AudioRecording());
})(Scratch);
