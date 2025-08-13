// Name: Audio Recording
// ID: samuelloufaudiorecording
// Description: Record, download and play an audio recording.
// By: SamuelLouf <https://scratch.mit.edu/users/samuellouf/>

(function(Scratch) {
  'use strict';

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const renderer = vm.renderer;

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

  // Audio Recording

  localStorage.setItem('audioBlobs', '[]');
  localStorage.setItem('audioBlobsNames', '[]');
  
  function blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  var isrecording = false;
  
  var audioRecorder = {
      
    audioBlobs: [],
    mediaRecorder: null, 
    streamBeingCaptured: null, 
    /** Start recording the audio 
     * @returns {Promise} - returns a promise that resolves if audio recording successfully started
     */
      start: function () {
        //Feature Detection
        if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
          //Feature is not supported in browser
          //return a custom error
          return Promise.reject(new Error('mediaDevices API or getUserMedia method is not supported in this browser.'));
        } else {
          //Feature is supported in browser
          //create an audio stream
          return navigator.mediaDevices.getUserMedia({ audio: true }/*of type MediaStreamConstraints*/)
            //returns a promise that resolves to the audio stream
            .then(stream /*of type MediaStream*/ => {
              //save the reference of the stream to be able to stop it when necessary
              audioRecorder.streamBeingCaptured = stream;
              //create a media recorder instance by passing that stream into the MediaRecorder constructor
              audioRecorder.mediaRecorder = new MediaRecorder(stream); /*the MediaRecorder interface of the MediaStream Recording
              API provides functionality to easily record media*/
              //clear previously saved audio Blobs, if any
              audioRecorder.audioBlobs = [];
              //add a dataavailable event listener in order to store the audio data Blobs when recording
              audioRecorder.mediaRecorder.addEventListener("dataavailable", event => {
                //store audio Blob object
                audioRecorder.audioBlobs.push(event.data);
              });
  
              //start the recording by calling the start method on the media recorder
              audioRecorder.mediaRecorder.start();
            });
          }
      },
  
      /** Stop audio recording */
      stop: function () {
        //return a promise that would return the blob or URL of the recording
        return new Promise(resolve => {
          //save audio type to pass to set the Blob type
          let mimeType = audioRecorder.mediaRecorder.mimeType;
          //listen to the stop event in order to create & return a single Blob object
          audioRecorder.mediaRecorder.addEventListener("stop", () => {
            //create a single blob object, as we might have gathered a few Blob objects that needs to be joined as one
            let audioBlob = new Blob(audioRecorder.audioBlobs, { type: mimeType });
            //resolve promise with the single audio blob representing the recorded audio
            resolve(audioBlob);
          });
          audioRecorder.cancel();
        });
      },
    
      /** Cancel audio recording*/
      cancel: function () {
        //stop the recording feature
        audioRecorder.mediaRecorder.stop();
        //stop all the tracks on the active stream in order to stop the stream
        audioRecorder.stopStream();
        //reset API properties for next recording
        audioRecorder.resetRecordingProperties();
      },
    
      stopStream: function () {
        //stopping the capturing request by stopping all the tracks on the active stream
        audioRecorder.streamBeingCaptured.getTracks() //get all tracks from the stream
          .forEach(track /*of type MediaStreamTrack*/ => track.stop()); //stop each one
      },
      /** Reset all the recording properties including the media recorder and stream being captured*/
      resetRecordingProperties: function () {
        audioRecorder.mediaRecorder = null;
        audioRecorder.streamBeingCaptured = null;
      }
  }
  
  /** Starts the audio recording*/
  function startAudioRecording() {
      //start recording using the audio recording API
      audioRecorder.start()
          .catch(error => { //on error
              //No Browser Support Error
              if (error.message.includes("mediaDevices API or getUserMedia method is not supported in this browser.")) {
                  console.log("To record audio, use browsers like Chrome and Firefox.");
              }
  
              //Error handling structure
              switch (error.name) {
                  default:
                      console.log("An error occured with the error name " + error.name);
              }
          });
  }
  /** Stop the currently started audio recording */
  
  function clearAudioBlobs() {
    localStorage.setItem('audioBlobs', '[]');
    localStorage.setItem('audioBlobsNames', '[]');
  }
  
  async function saveBlob(blob, as = null) {
    var audio_base64 = await blobToBase64(blob);
    
    if (localStorage.getItem('audioBlobs') == null) {
      localStorage.setItem('audioBlobs', '[]');
    }
    
    if (localStorage.getItem('audioBlobsNames') == null) {
      localStorage.setItem('audioBlobsNames', '[]');
    }
  
    var audioBlobs = JSON.parse(localStorage.getItem('audioBlobs'));
    audioBlobs.push(audio_base64);
    
    localStorage.setItem('audioBlobs', JSON.stringify(audioBlobs));
  
    var audioBlobsNames = JSON.parse(localStorage.getItem('audioBlobsNames'));
    audioBlobsNames.push(as);
    
    localStorage.setItem('audioBlobsNames', JSON.stringify(audioBlobsNames));
  }
  
  function stopAudioRecording(nameas = null) {
  
      audioRecorder.stop()
          .then(audioAsblob => {
              //Play recorder audio
              saveBlob(audioAsblob, nameas);
          })
          .catch(error => {
              //Error handling structure
              switch (error.name) {
                  default:
                      console.log("An error occured with the error name " + error.name);
              }
          });
  }
  
  /** Cancel the currently started audio recording */
  function cancelAudioRecording() {
    audioRecorder.cancel();
  }

  function getLastestRecording() {
    var audioBlobs = JSON.parse(localStorage.getItem('audioBlobs'));
    return audioBlobs[(audioBlobs.length - 1)];
  }

  function getRecordingByNumber(number) {
    var audioBlobs = JSON.parse(localStorage.getItem('audioBlobs'));
    return audioBlobs[(number - 1)];
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
          },
          '---',
          {
            opcode: 'play_pause_resume_stop_recording',
            blockType: Scratch.BlockType.COMMAND,
            text: '[action] recording',
            arguments: {
              action: {
                type: Scratch.ArgumentType.STRING,
                menu: 'act'
              }
            }
          },
          {
            opcode: 'is_recording',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is recording?'
          },
          {
            opcode: 'import_recording',
            blockType: Scratch.BlockType.COMMAND,
            text: 'import recording as [name]',
            arguments: {
              name: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Recording'
              }
            }
          },
          {
            opcode: 'recording_base',
            blockType: Scratch.BlockType.REPORTER,
            text: 'recording base64'
          }
        ],
        menus: {
          // Menus
          act: {
            acceptReporters: true,
            items: ['start', 'cancel', 'stop']
          }
        }
      };
    }

    // Functions
    can_record_sound () {
      return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }

    play_pause_resume_stop_recording (args) {
      switch (args.action) {
        case 'start':
          startAudioRecording();
          isrecording = true;
          break;
        case 'cancel':
          cancelAudioRecording();
          isrecording = false;
          break;
        case 'stop':
          stopAudioRecording();
          isrecording = false;
          break;
        default:
          break;
      }
    }

    is_recording () {
      return isrecording;
    }

    importSound({ TEXT, NAME }) {
      Scratch.fetch(TEXT)
        .then((r) => r.arrayBuffer())
        .then((arrayBuffer) => {
          const storage = vm.runtime.storage;
          const asset = new storage.Asset(
            storage.AssetType.Sound,
            null,
            storage.DataFormat.MP3,
            new Uint8Array(arrayBuffer),
            true
          );
          vm.addSound({
            md5: asset.assetId + "." + asset.dataFormat,
            asset: asset,
            name: NAME + "",
          });
        });
    }

    import_recording (args) {
      var recording = getLastestRecording();
      this.importSound({TEXT: recording, NAME: args.name});
    }

    recording_base () {
      if (localStorage.getItem('audioBlobs') == '[]'){
        return "There are no recordings";
      } else {
        return getLastestRecording();
      }
    }
  }
  Scratch.extensions.register(new AudioRecording());
})(Scratch);
