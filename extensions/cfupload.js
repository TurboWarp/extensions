// Name: Upload
// ID: cfupload
// Description: Upload files to the Network, can also used with Files extension.
// By: Codefoxy <https://scratch.mit.edu/users/odavido123Daptoper/>
// License: MIT AND MPL-2.0
(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("files extension must be run unsandboxed");
  }
  const extensionicon =
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgdmVyc2lvbj0iMS4xIgogICB3aWR0aD0iODAuNDU0NTQiCiAgIGhlaWdodD0iODAuNDU0NTQiCiAgIHZpZXdCb3g9IjAsMCw4MC40NTQ1NCw4MC40NTQ1NCIKICAgaWQ9InN2ZzEwIgogICBzb2RpcG9kaTpkb2NuYW1lPSLkuIvovIkuc3ZnIgogICB4bWw6c3BhY2U9InByZXNlcnZlIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIxLjIuMiAoNzMyYTAxZGE2MywgMjAyMi0xMi0wOSkiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnMKICAgICBpZD0iZGVmczE0IiAvPjxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpZD0ibmFtZWR2aWV3MTIiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjMDAwMDAwIgogICAgIGJvcmRlcm9wYWNpdHk9IjAuMjUiCiAgICAgaW5rc2NhcGU6c2hvd3BhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgICBpbmtzY2FwZTpwYWdlY2hlY2tlcmJvYXJkPSIwIgogICAgIGlua3NjYXBlOmRlc2tjb2xvcj0iI2QxZDFkMSIKICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgaW5rc2NhcGU6em9vbT0iMy42NDI5OTg2IgogICAgIGlua3NjYXBlOmN4PSItNTUuNTg2MDc3IgogICAgIGlua3NjYXBlOmN5PSI1OC40NjgzMTgiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxOTIwIgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjEwMDkiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii04IgogICAgIGlua3NjYXBlOndpbmRvdy15PSItOCIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9InN2ZzEwIiAvPjxnCiAgICAgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IgogICAgIGZpbGwtcnVsZT0ibm9uemVybyIKICAgICBzdHJva2U9Im5vbmUiCiAgICAgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiCiAgICAgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIKICAgICBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiCiAgICAgc3Ryb2tlLWRhc2hhcnJheT0ibm9uZSIKICAgICBzdHJva2UtZGFzaG9mZnNldD0iMCIKICAgICBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6bm9ybWFsO2ZpbGw6IzU5NWEzNjtmaWxsLW9wYWNpdHk6MSIKICAgICBpZD0iZzYiCiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5OS43NzI3MiwtMTM5Ljc3MjcyKSI+PHBhdGgKICAgICAgIGQ9Im0gMTk5Ljc3MjczLDE4MCBjIDAsLTIyLjIxNjkgMTguMDEwMzcsLTQwLjIyNzI3IDQwLjIyNzI3LC00MC4yMjcyNyAyMi4yMTY5LDAgNDAuMjI3MjcsMTguMDEwMzcgNDAuMjI3MjcsNDAuMjI3MjcgMCwyMi4yMTY5IC0xOC4wMTAzNyw0MC4yMjcyNyAtNDAuMjI3MjcsNDAuMjI3MjcgLTIyLjIxNjksMCAtNDAuMjI3MjcsLTE4LjAxMDM3IC00MC4yMjcyNywtNDAuMjI3MjcgeiIKICAgICAgIGZpbGw9IiMwMDgwODAiCiAgICAgICBzdHJva2Utd2lkdGg9IjAiCiAgICAgICBpZD0icGF0aDIiCiAgICAgICBzdHlsZT0iZmlsbDojNTk1YTM2O2ZpbGwtb3BhY2l0eToxIiAvPjxwYXRoCiAgICAgICBzdHlsZT0iZmlsbDojNTk1YTM2O3N0cm9rZS13aWR0aDowLjU7ZmlsbC1vcGFjaXR5OjEiCiAgICAgICBpZD0icGF0aDg5OSIKICAgICAgIGQ9IiIgLz48L2c+PGcKICAgICBzdHlsZT0iZmlsbDojZmZmZmYyO2ZpbGwtb3BhY2l0eToxIgogICAgIGlkPSJnMjAwNiIKICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLjA2ODk4MjI1LDAsMCwwLjA2ODk4MjI1LDcuMTAyNjQ0OSw3Mi45ODg3MTgpIj48cGF0aAogICAgICAgZD0ibSAyNjAsLTE2MCBxIC05MSwwIC0xNTUuNSwtNjMgUSA0MCwtMjg2IDQwLC0zNzcgcSAwLC03OCA0NywtMTM5IDQ3LC02MSAxMjMsLTc4IDI1LC05MiAxMDAsLTE0OSA3NSwtNTcgMTcwLC01NyAxMTcsMCAxOTguNSw4MS41IDgxLjUsODEuNSA4MS41LDE5OC41IDY5LDggMTE0LjUsNTkuNSA0NS41LDUxLjUgNDUuNSwxMjAuNSAwLDc1IC01Mi41LDEyNy41IFEgODE1LC0xNjAgNzQwLC0xNjAgSCA1MjAgcSAtMzMsMCAtNTYuNSwtMjMuNSBRIDQ0MCwtMjA3IDQ0MCwtMjQwIHYgLTIwNiBsIC02NCw2MiAtNTYsLTU2IDE2MCwtMTYwIDE2MCwxNjAgLTU2LDU2IC02NCwtNjIgdiAyMDYgaCAyMjAgcSA0MiwwIDcxLC0yOSAyOSwtMjkgMjksLTcxIDAsLTQyIC0yOSwtNzEgLTI5LC0yOSAtNzEsLTI5IGggLTYwIHYgLTgwIHEgMCwtODMgLTU4LjUsLTE0MS41IFEgNTYzLC03MjAgNDgwLC03MjAgMzk3LC03MjAgMzM4LjUsLTY2MS41IDI4MCwtNjAzIDI4MCwtNTIwIGggLTIwIHEgLTU4LDAgLTk5LDQxIC00MSw0MSAtNDEsOTkgMCw1OCA0MSw5OSA0MSw0MSA5OSw0MSBoIDEwMCB2IDgwIHogbSAyMjAsLTI4MCB6IgogICAgICAgaWQ9InBhdGgxOTk3IgogICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmMjtmaWxsLW9wYWNpdHk6MSIgLz48L2c+PC9zdmc+Cg==";
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
