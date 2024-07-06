// Name: Upload
// ID: cfupload
// Description: Upload files to the Network, can also used with Files extension.
// By: Codefoxy <https://scratch.mit.edu/users/odavido123Daptoper/>
// Original: Codefoxy
// License: MIT AND MPL-2.0
(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("files extension must be run unsandboxed");
  }
  const extensionicon = 
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgdmVyc2lvbj0iMS4xIgogICB3aWR0aD0iODAuNDU0NTQiCiAgIGhlaWdodD0iODAuNDU0NTQiCiAgIHZpZXdCb3g9IjAsMCw4MC40NTQ1NCw4MC40NTQ1NCIKICAgaWQ9InN2ZzEwIgogICBzb2RpcG9kaTpkb2NuYW1lPSLkuIvovIkuc3ZnIgogICB4bWw6c3BhY2U9InByZXNlcnZlIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIxLjIuMiAoNzMyYTAxZGE2MywgMjAyMi0xMi0wOSkiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnMKICAgICBpZD0iZGVmczE0IiAvPjxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpZD0ibmFtZWR2aWV3MTIiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjMDAwMDAwIgogICAgIGJvcmRlcm9wYWNpdHk9IjAuMjUiCiAgICAgaW5rc2NhcGU6c2hvd3BhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgICBpbmtzY2FwZTpwYWdlY2hlY2tlcmJvYXJkPSIwIgogICAgIGlua3NjYXBlOmRlc2tjb2xvcj0iI2QxZDFkMSIKICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgaW5rc2NhcGU6em9vbT0iMy42NDI5OTg2IgogICAgIGlua3NjYXBlOmN4PSItNTUuNzIzMzI3IgogICAgIGlua3NjYXBlOmN5PSI1OC4zMzEwNjkiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxNDMzIgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjEwMzIiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii02MyIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iNjIiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMCIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJzdmcxMCIgLz48ZwogICAgIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIKICAgICBmaWxsLXJ1bGU9Im5vbnplcm8iCiAgICAgc3Ryb2tlPSJub25lIgogICAgIHN0cm9rZS1saW5lY2FwPSJidXR0IgogICAgIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiCiAgICAgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIgogICAgIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiCiAgICAgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiCiAgICAgc3R5bGU9Im1peC1ibGVuZC1tb2RlOm5vcm1hbDtmaWxsOiNhYWFkNjg7ZmlsbC1vcGFjaXR5OjEiCiAgICAgaWQ9Imc2IgogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xOTkuNzcyNzIsLTEzOS43NzI3MikiPjxwYXRoCiAgICAgICBkPSJtIDE5OS43NzI3MywxODAgYyAwLC0yMi4yMTY5IDE4LjAxMDM3LC00MC4yMjcyNyA0MC4yMjcyNywtNDAuMjI3MjcgMjIuMjE2OSwwIDQwLjIyNzI3LDE4LjAxMDM3IDQwLjIyNzI3LDQwLjIyNzI3IDAsMjIuMjE2OSAtMTguMDEwMzcsNDAuMjI3MjcgLTQwLjIyNzI3LDQwLjIyNzI3IC0yMi4yMTY5LDAgLTQwLjIyNzI3LC0xOC4wMTAzNyAtNDAuMjI3MjcsLTQwLjIyNzI3IHoiCiAgICAgICBmaWxsPSIjMDA4MDgwIgogICAgICAgc3Ryb2tlLXdpZHRoPSIwIgogICAgICAgaWQ9InBhdGgyIgogICAgICAgc3R5bGU9ImZpbGw6I2FhYWQ2ODtmaWxsLW9wYWNpdHk6MSIgLz48cGF0aAogICAgICAgc3R5bGU9ImZpbGw6I2FhYWQ2ODtzdHJva2Utd2lkdGg6MC41O2ZpbGwtb3BhY2l0eToxIgogICAgICAgaWQ9InBhdGg4OTkiCiAgICAgICBkPSIiIC8+PC9nPjxnCiAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmMjtmaWxsLW9wYWNpdHk6MSIKICAgICBpZD0iZzIwMDYiCiAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMC4wNTY4MTY5NSwwLDAsMC4wNTY4MTY5NSwxMy4zNTM3MzksNjQuMzU0NDczKSI+PHBhdGgKICAgICAgIGQ9Im0gMjYwLC0xNjAgcSAtOTEsMCAtMTU1LjUsLTYzIFEgNDAsLTI4NiA0MCwtMzc3IHEgMCwtNzggNDcsLTEzOSA0NywtNjEgMTIzLC03OCAyNSwtOTIgMTAwLC0xNDkgNzUsLTU3IDE3MCwtNTcgMTE3LDAgMTk4LjUsODEuNSA4MS41LDgxLjUgODEuNSwxOTguNSA2OSw4IDExNC41LDU5LjUgNDUuNSw1MS41IDQ1LjUsMTIwLjUgMCw3NSAtNTIuNSwxMjcuNSBRIDgxNSwtMTYwIDc0MCwtMTYwIEggNTIwIHEgLTMzLDAgLTU2LjUsLTIzLjUgUSA0NDAsLTIwNyA0NDAsLTI0MCB2IC0yMDYgbCAtNjQsNjIgLTU2LC01NiAxNjAsLTE2MCAxNjAsMTYwIC01Niw1NiAtNjQsLTYyIHYgMjA2IGggMjIwIHEgNDIsMCA3MSwtMjkgMjksLTI5IDI5LC03MSAwLC00MiAtMjksLTcxIC0yOSwtMjkgLTcxLC0yOSBoIC02MCB2IC04MCBxIDAsLTgzIC01OC41LC0xNDEuNSBRIDU2MywtNzIwIDQ4MCwtNzIwIDM5NywtNzIwIDMzOC41LC02NjEuNSAyODAsLTYwMyAyODAsLTUyMCBoIC0yMCBxIC01OCwwIC05OSw0MSAtNDEsNDEgLTQxLDk5IDAsNTggNDEsOTkgNDEsNDEgOTksNDEgaCAxMDAgdiA4MCB6IG0gMjIwLC0yODAgeiIKICAgICAgIGlkPSJwYXRoMTk5NyIKICAgICAgIHN0eWxlPSJmaWxsOiNmZmZmZjI7ZmlsbC1vcGFjaXR5OjEiIC8+PC9nPjwvc3ZnPgo=";
  let a = {};
  let apiurl = "";
  let apiformname = "";
  const formDataEntries = {};
  let StatusCode = 0; // Variable to hold status code
  let RawRespond = ""; // Variable to hold raw Respond or scratch will crash
  /**
   * @param {string} data Data to upload
   * @param {string} filename Name of the file
   * @param {string} link URL to upload to
   * @param {string} formName Form name for the file
   * @returns {Promise<string>} A promise that resolves to the server response data
   */
  const uploadFileToLink = (data, filename, link, formName) => {
    const formData = new FormData();
    const blob = new Blob([data], { type: "text/plain" });
    formData.append(formName, blob, filename);

    // Add additional form data entries
    for (const key in formDataEntries) {
      if (Object.prototype.hasOwnProperty.call(formDataEntries, key)) {
        formData.append(key, formDataEntries[key]);
      }
    }

    return Scratch.fetch(link, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        // Set StatusCode based on response status
        StatusCode = response.status;
        return response.text(); // Assuming the response is text
      })
      .then((result) => {
        try {
          RawRespond = result;
          return JSON.stringify(result);
        } catch (error) {
          return result;
        }
      });
  };

  class Upload {
    getInfo() {
      return {
        id: "cfupload",
        name: "Upload",
        blockIconURI: extensionicon,
        color1: "#fcb103",
        blocks: [
          {
            opcode: "addFormData",
            blockType: Scratch.BlockType.COMMAND,
            text: "add formdata [key]: [value]",
            arguments: {
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "key",
              },
              value: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "value",
              },
            },
          },
          {
            opcode: "uploadFileToLink",
            blockType: Scratch.BlockType.REPORTER,
            text: "upload [data] as [filename] to [link] as [formName]",
            arguments: {
              data: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello, world!",
              },
              filename: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "file.txt",
              },
              link: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://example.com/upload",
              },
              formName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "fileToUpload",
              },
            },
          },

          {
            opcode: "callapi",
            blockType: Scratch.BlockType.REPORTER,
            text: "Upload [data] to [Apis] as [name]",
            arguments: {
              data: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello, World!",
              },
              name: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "file.txt",
              },
              Apis: {
                type: Scratch.ArgumentType.STRING,
                menu: "Apis",
              },
            },
          },
          {
            opcode: "getStatusCode",
            blockType: Scratch.BlockType.REPORTER,
            text: "status code",
          },
          {
            opcode: "getRawRespond",
            blockType: Scratch.BlockType.REPORTER,
            text: "Raw Respond",
          },
        ],
        menus: {
          Apis: {
            acceptReporters: true,
            items: ["Catbox.moe", "file.io"],
          },
        },
      };
    }
    /**
     * @param {string} data Data to upload
     * @param {string} Apis apis menu
     * @param {string} name Name of the file
     * @returns {Promise<string>} Respond url
     */
    callapi(args) {
      switch (args.Apis) {
        case "Catbox.moe":
          apiurl = "https://catbox.moe/user/api.php";
          formDataEntries.reqtype = "fileupload";
          apiformname = "fileToUpload";
          break;
        case "file.io":
          apiurl = "https://file.io/?title=" + args.name;
          apiformname = "file";
          break;
      }
      return uploadFileToLink(args.data, args.name, apiurl, apiformname).then(
        (response) => {
          try {
            a = JSON.parse(response); // Assuming response is JSON
            return a;
          } catch (error) {
            console.error("Error parsing response as JSON:", error);
            return response;
          }
        }
      );
    }

    uploadFileToLink(args) {
      return uploadFileToLink(
        args.data,
        args.filename,
        args.link,
        args.formName
      ).then((response) => {
        try {
          return JSON.parse(response); // Assuming response is JSON
        } catch (error) {
          console.error("Error parsing response as JSON:", error);
          return response;
        }
      });
    }

    addFormData(args) {
      formDataEntries[args.key] = args.value;
    }

    getStatusCode() {
      return StatusCode; // Return the stored status code
    }
    getRawRespond() {
      return RawRespond;
    }
  }

  Scratch.extensions.register(new Upload());
})(Scratch);
