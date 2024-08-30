// Name: Upload
// ID: cfupload
// Description: Upload files to the Network, can also used with Files extension.
// By: Codefoxy <https://scratch.mit.edu/users/odavido123Daptoper/>
// License: MIT AND MPL-2.0
(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Upload extension must be run unsandboxed");
  }

  let apiurl = "";
  let apiformname = "";
  const formDataEntries = {};
  let statusCode = 0;
  let rawResponse = "";
  const pastebinKey = "zvRcx16j8TYvEDimPAgdYisrSbZqWMPo";
  const pinataJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NjIxMjYzOS1hMDUwLTQ3ZWMtYTlkNC0xOTQ1ODNjNmE5ODMiLCJlbWFpbCI6InBpbmF0YUBjb2RlZm94eS5saW5rIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjU2ZTVjYThlZTBhOGM1OGEzMWUwIiwic2NvcGVkS2V5U2VjcmV0IjoiMWRmNjkwNGI4NTkwMTFmNmE3MDg5OGUxNmY2OTcyY2I5YjY5NjdkZTRkOTg4ZWIwYmNkYzUxMjM5ZTExNmM2NCIsImlhdCI6MTcyNTAxNjAyOX0.SCmIf8VXW7jfgE87x6Ing7Y10wniN_j1aZRBFjUAUh4";
let process = ""; 
  let headersEntries = {};

  const isBase64 = (value) =>
    /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(value);

  const uploadFileToLink = (
    data,
    filename,
    link,
    formName,
    mimeType = "text/plain",
    base64 = "false"
  ) => {
    const formData = new FormData();
    let fileData = data;

    if (base64 === "true") {
      if (!isBase64(data)) {
        return Promise.reject("Base64 error: Invalid data");
      }
      try {
        fileData = atob(data);
      } catch (e) {
        return Promise.reject("Base64 error: Invalid data");
      }
    }

    const blob = new Blob([fileData], { type: mimeType });
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
      headers: headersEntries
    })
      .then((response) => {
        statusCode = response.status;
        headersEntries = {};
        return response.text();
      })
      .then((result) => {
        rawResponse = result;
        return result;
      });
  };

  class Upload {
    getInfo() {
      return {
        id: "cfupload",
        name: "Upload",
        color1: "#a69776",
        blocks: [
          {
            opcode: "addFormData",
            blockType: Scratch.BlockType.COMMAND,
            text: "Add formdata [key]: [value]",
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
            opcode: "addHeaders",
            blockType: Scratch.BlockType.COMMAND,
            text: "Add Header [key]: [value]",
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
            opcode: "uploadFileToLinkblock",
            blockType: Scratch.BlockType.REPORTER,
            text: "upload [data] as [filename] to [link] as [formName] MIME type [mimeType] is Base64 [base64]",
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
                defaultValue: "file",
              },
              mimeType: {
                type: Scratch.ArgumentType.STRING,
                menu: "MimeTypes",
                defaultValue: "text/plain",
              },
              base64: {
                type: Scratch.ArgumentType.STRING,
                menu: "tf",
                defaultValue: "false",
              },
            },
          },
          {
            opcode: "callapi",
            blockType: Scratch.BlockType.REPORTER,
            text: "Upload [data] to [Apis] as [name] MIME type [mimeType] Is base64? [base64]",
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
              mimeType: {
                type: Scratch.ArgumentType.STRING,
                menu: "MimeTypes",
              },
              base64: {
                type: Scratch.ArgumentType.STRING,
                menu: "tf",
                defaultValue: "false",
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
          {
            opcode: "getHeaders",
            blockType: Scratch.BlockType.REPORTER,
            text: "Headers",
          },
          {
            opcode: "getFormData",
            blockType: Scratch.BlockType.REPORTER,
            text: "Form Datas",
          },
        ],
        menus: {
          Apis: {
            acceptReporters: true,
            items: ["catbox.moe", "file.io", "0x0.st", "pastebin.com", "pinata.cloud"],
          },
          MimeTypes: {
            acceptReporters: true,
            items: [
              "text/plain",
              "text/html",
              "text/css",
              "text/javascript",
              "text/xml",
              "application/json",
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/svg+xml",
              "image/bmp",
              "audio/mpeg",
              "audio/wav",
              "audio/ogg",
              "audio/mp4",
              "video/mp4",
              "video/quicktime",
              "video/x-msvideo",
              "video/webm",
              "application/pdf",
              "application/msword",
              "application/vnd.ms-excel",
              "application/vnd.ms-powerpoint",
              "application/vnd.oasis.opendocument.text",
              "application/zip",
              "application/x-tar",
              "application/x-rar-compressed"
            ],
          },
          tf: {
            acceptReporters: true,
            items: ["true", "false"],
          },
        },
      };
    }
    
    callapi(args) {
      switch (args.Apis) {
        case "catbox.moe":
          apiurl = "https://catbox.moe/user/api.php";
          formDataEntries.reqtype = "fileupload";
          apiformname = "fileToUpload";
          break;
        case "file.io":
          apiurl = "https://file.io/?title=" + args.name;
          apiformname = "file";
          break;
        case "0x0.st":
          apiurl = "https://0x0.st";
          apiformname = "file";
          break;
        case "pastebin.com":
          apiurl = "https://pastebin.com/api/api_post.php";
          let fileData = args.data;

          if (args.base64 === "true") {
            if (!isBase64(args.data)) {
              return "Base64 error: Invalid data";
            }
            try {
              fileData = atob(args.data);
            } catch (e) {
              return "Base64 error: Invalid data";
            }
          }

          return Scratch.fetch(apiurl, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
              api_dev_key: pastebinKey,
              api_option: "paste",
              api_paste_code: fileData,
              api_paste_name: args.name,
            }),
          })
            .then((response) => response.text())
            .then((text) => {
              return text.replace("pastebin.com/", "pastebin.com/raw/");;
            })
            .catch((error) => {
              return error;
            });
        case "pinata.cloud":
          apiurl = "https://api.pinata.cloud/pinning/pinFileToIPFS";
          apiformname = "file";
          headersEntries.Authorization = "Bearer " + pinataJWT;
          break;
      }

      process =  uploadFileToLink(
        args.data,
        args.name,
        apiurl,
        apiformname,
        args.mimeType,
        args.base64
      );
      switch (args.Apis) {
        case "pinata.cloud":
          return "https://fuchsia-total-spider-341.mypinata.cloud/ipfs/" + JSON.parse(rawResponse).IpfsHash;
        case "file.io":
          return JSON.parse(rawResponse).link;
        case "catbox.moe":
        case "0x0.st":
          return process;
    }}

    addFormData(args) {
      formDataEntries[args.key] = args.value;
    }

    addHeaders(args) {
      headersEntries[args.key] = args.value;
    }

    getStatusCode() {
      return statusCode;
    }

    getRawRespond() {
      return rawResponse;
    }

    getHeaders() {
      return JSON.stringify(headersEntries);
    }

    getFormData() {
      return JSON.stringify(formDataEntries);
    }
    uploadFileToLinkblock(args) {
      return uploadFileToLink(
        args.data,
        args.name,
        args.link,
        args.formName,
        args.mimeType,
        args.base64)
    }
  }
  Scratch.extensions.register(new Upload());
})(Scratch);

