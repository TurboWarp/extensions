// Name: File System Access API
// ID: fsaapi98396
// Description: Access and modify files and folders using FSA-API.
// By: Rocky the Protogen
// License: GNU-GPL3

/*
WARNING!
This version of the extension contains serious bugs that could hinder your project!
DO NOT use this version. It *will* break, and *will* fail.
This file is here for historical purposes.
*/

/**
 * Major thanks to kindpump! <https://github.com/kindpump>
 * Credits:
 *  Basics in JS: https://www.w3schools.com/Js/
 *  How to add commits to pull rq: https://stackoverflow.com/questions/10147445/github-adding-commits-to-existing-pull-request
 *  File size conversion: https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
 *  Original files by GarboMuffin: https://github.com/TurboWarp/extensions/blob/master/extensions/files.js
 *  MDN web docs: https://developer.mozilla.org/en-US/docs/Web/API/Window/
 *  LMS Utils (Labels, Buttons): https://github.com/TurboWarp/extensions/blob/master/extensions/Lily/lmsutils.js
 *  Fixes and proper cleanup (from @kindpump): https://github.com/TurboWarp/extensions/pull/1594#issuecomment-2214487201
 *  Assets.js (for Extension check): https://github.com/TurboWarp/extensions/blob/master/extensions/Lily/Assets.js
 */

/**
 * Just in case you want to make it easy for yourself.
 * VSCode Extensions Installed:
 *  mgmcdermott.vscode-language-babel
 *  jeff-hykin.better-js-syntax
 *  moshfeu.compare-folders
 *  dbaeumer.vscode-eslint
 *  xabikos.JavaScriptSnippets
 *  ms-vscode.vscode-typescript-next
 *  sburg.vscode-javascript-booster
 *  cmstead.js-codeformer
 *  ms-edgedevtools.vscode-edge-devtools
 *  esbenp.prettier-vscode
 *  bysabi.prettier-vscode-standard
 *  rvest.vs-code-prettier-eslint
 *  numso.prettier-standard-vscode
 *  svipas.prettier-plus
 *  standard.vscode-standard
 *  lihui.vs-color-picker
 */

(function (Scratch) {
  "use strict";
  const app = {
    hasFSAccess:
      "chooseFileSystemEntries" in window || "showOpenFilePicker" in window,
  };

  //Unfortunately, the URI is currently unknown.
  const DocumentataionURI = "";

  let fileHandle1,
    fileHandle2,
    fileHandle3,
    fileHandle4,
    fileHandle5,
    folderHandle,
    storefd1,
    storefd2,
    storefd3,
    storefd4,
    storefd5,
    writeFail = false,
    FolderData = "",
    output1,
    output2,
    output3,
    output4,
    output5,
    unsupportedBrowser = false,
    mayOpenFilePicker = false,
    mayOpenFolderPicker = false,
    NoBlankFileType,
    isdevbranch = false;

  //Slot Mappings
  const handleSlotMapping = {
    "Slot 1": fileHandle1,
    "Slot 2": fileHandle2,
    "Slot 3": fileHandle3,
    "Slot 4": fileHandle4,
    "Slot 5": fileHandle5,
  };
  const outputSlotMapping = {
    "Slot 1": output1,
    "Slot 2": output2,
    "Slot 3": output3,
    "Slot 4": output4,
    "Slot 5": output5,
  };
  const storefdSlotMapping = {
    "Slot 1": storefd1,
    "Slot 2": storefd2,
    "Slot 3": storefd3,
    "Slot 4": storefd4,
    "Slot 5": storefd5,
  };
  /* Useable ways to store via mappings:
      outputSlotMapping[args.NAME] = output;
      storefdSlotMapping[args.NAME] = storefd;
      handleSlotMapping[args.NAME] = fileHandle;
  */

  // initIcon
  const FolderIcon =
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIgImh0dHA6Ly93d3cudzMub3JnL1RSLzIwMDEvUkVDLVNWRy0yMDAxMDkwNC9EVEQvc3ZnMTAuZHRkIj4KPCEtLSBDcmVhdGVkIHVzaW5nIEtyaXRhOiBodHRwczovL2tyaXRhLm9yZyAtLT4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIAogICAgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiCiAgICB4bWxuczprcml0YT0iaHR0cDovL2tyaXRhLm9yZy9uYW1lc3BhY2VzL3N2Zy9rcml0YSIKICAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgIHdpZHRoPSIxNS4zNnB0IgogICAgaGVpZ2h0PSIxNS4zNnB0IgogICAgdmlld0JveD0iMCAwIDE1LjM2IDE1LjM2Ij4KPGRlZnMvPgo8cmVjdCBpZD0ic2hhcGUwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyLjYyNTAwMDAwMDk4MjU0LCAxLjMwNDk5OTkzMDIzOTMxKSIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMC40OTkyIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbGluZWpvaW49ImJldmVsIiB3aWR0aD0iNy4yIiBoZWlnaHQ9IjEwLjMyIi8+PHJlY3QgaWQ9InNoYXBlMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMS4wNDE0ODQ3NDgzMjUwNywgNS43MTIzMTQzMjQwMTYzOCkiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2VkZjAwMCIgc3Ryb2tlLXdpZHRoPSIwLjQ5OTIiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1saW5lam9pbj0iYmV2ZWwiIHdpZHRoPSIxMi41MTg1MTQ1MTM2NTc3IiBoZWlnaHQ9IjcuNjUyNjg0OTIwMTkyMTYiIHJ4PSIwLjY1NzE4OTM3MDExMDkwNCIgcnk9IjAuNTUyNTQ0ODMwODY1MDEiLz48cmVjdCBpZD0ic2hhcGUyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMC41NiwgNC4wOCkiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2VkZjAwMCIgc3Ryb2tlLXdpZHRoPSIwLjQ5OTIiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1saW5lam9pbj0iYmV2ZWwiIHdpZHRoPSIzLjEyIiBoZWlnaHQ9IjEuNjgiIHJ4PSIwLjQ2NTAwMDg2NTYyMjE2NCIgcnk9IjAuNDY1MDAwODY1NjIyMTY0Ii8+PHJlY3QgaWQ9InNoYXBlMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMS4yLCA1Ljc2KSIgZmlsbD0iI2VkZjAwMCIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiNlZGYwMDAiIHN0cm9rZS13aWR0aD0iMC40OTkyIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbGluZWpvaW49ImJldmVsIiB3aWR0aD0iMTIuMjQiIGhlaWdodD0iNy40NCIvPjxyZWN0IGlkPSJzaGFwZTQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwLjgsIDQuMDgpIiBmaWxsPSIjZWRmMDAwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0iI2VkZjAwMCIgc3Ryb2tlLXdpZHRoPSIwLjQ5OTIiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1saW5lam9pbj0iYmV2ZWwiIHdpZHRoPSIyLjY0IiBoZWlnaHQ9IjEuNDQiLz48cmVjdCBpZD0ic2hhcGU1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMy4yLCA1LjUyKSIgZmlsbD0iI2VkZjAwMCIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiNlZGYwMDAiIHN0cm9rZS13aWR0aD0iMC40OTkyIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbGluZWpvaW49ImJldmVsIiB3aWR0aD0iMC40OCIgaGVpZ2h0PSIwLjcyIi8+PHJlY3QgaWQ9InNoYXBlNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOC44OCwgNC4wOCkiIGZpbGw9IiNlZGYwMDAiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjZWRmMDAwIiBzdHJva2Utd2lkdGg9IjAuNDk5MiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLWxpbmVqb2luPSJiZXZlbCIgd2lkdGg9IjIuNCIgaGVpZ2h0PSIxLjQ0IiByeD0iMC40ODAwMDAwNjM3MDIxOTgiIHJ5PSIwLjQ4MDAwMDA2MzcwMjE5OCIvPjxwYXRoIGlkPSJzaGFwZTciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuMTE5OTk5Nzk1NjMwNjYsIDIuMzM5OTk5ODQ2NzIyOTkpIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMC40OTkyIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMiIgZD0iTTAgMC4wM0w1LjI4IDAiIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2MiLz48cGF0aCBpZD0ic2hhcGU4IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzLjI1NDk5OTc4Njc4Nzc2LCAzLjM4OTk5OTc3Nzk0NDg1KSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAuNDk5MiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIGQ9Ik0wIDAuMDQ1TDUuMDEgMCIgc29kaXBvZGk6bm9kZXR5cGVzPSJjYyIvPjxwYXRoIGlkPSJzaGFwZTkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuMTc5OTk5NzkxNzAwNDgsIDQuNzg0OTk5Njg2NTY4MTgpIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMC40OTkyIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMiIgZD0iTTAgMC4wM0w0Ljk1IDAiIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2MiLz4KPC9zdmc+Cg==";
  const FileIcon =
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIgImh0dHA6Ly93d3cudzMub3JnL1RSLzIwMDEvUkVDLVNWRy0yMDAxMDkwNC9EVEQvc3ZnMTAuZHRkIj4KPCEtLSBDcmVhdGVkIHVzaW5nIEtyaXRhOiBodHRwczovL2tyaXRhLm9yZyAtLT4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIAogICAgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiCiAgICB4bWxuczprcml0YT0iaHR0cDovL2tyaXRhLm9yZy9uYW1lc3BhY2VzL3N2Zy9rcml0YSIKICAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgIHdpZHRoPSIxNS4zNnB0IgogICAgaGVpZ2h0PSIxNS4zNnB0IgogICAgdmlld0JveD0iMCAwIDE1LjM2IDE1LjM2Ij4KPGRlZnMvPgo8cmVjdCBpZD0ic2hhcGUwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzLjM2LCAxLjQ0KSIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMC40OTkyIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbGluZWpvaW49ImJldmVsIiB3aWR0aD0iOS4xMiIgaGVpZ2h0PSIxMi40OCIvPjxwYXRoIGlkPSJzaGFwZTEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQuNDU0OTk5ODQwOTUzNTQsIDIuMjk0OTk5OTE4MDY2OTcpIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMC40OTkyIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMiIgZD0iTTAgMEw1LjU1NzkxIDAiIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2MiLz48cGF0aCBpZD0ic2hhcGUyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LjQ1NDk5OTg0MDk1MzU0LCAzLjc3OTk5OTg2NTA1MTQ4KSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAuNDk5MiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIGQ9Ik0wIDEuNzc2MzZlLTE1TDcuMTU1MTQgMCIgc29kaXBvZGk6bm9kZXR5cGVzPSJjYyIvPjxwYXRoIGlkPSJzaGFwZTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUuMzc3NDk5ODA4MDE5NjcsIDUuMjY0OTk5ODEyMDM2KSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAuNDk5MiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIGQ9Ik0wIDEuNzc2MzZlLTE1TDYuMzAyNTcgMCIgc29kaXBvZGk6bm9kZXR5cGVzPSJjYyIvPjxwYXRoIGlkPSJzaGFwZTQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQuMTYyNDk5ODUxMzk1OTgsIDYuNDEyNDk5NzcxMDY5NDkpIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMC40OTkyIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMiIgZD0iTTAgMEw2LjUyNSAwIiBzb2RpcG9kaTpub2RldHlwZXM9ImNjIi8+PHBhdGggaWQ9InNoYXBlNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNC40OTk5OTk4MzkzNDcwMSwgNy42OCkiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwLjQ5OTIiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIyIiBkPSJNMCAwTDMuMjY5NzQgMCIgc29kaXBvZGk6bm9kZXR5cGVzPSJjYyIvPjxwYXRoIGlkPSJzaGFwZTYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguODg3NDk5NjgyNzEwMzQsIDcuNjgpIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMC40OTkyIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMiIgZD0iTTAgMEwzLjIyMDk5IDAiIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2MiLz48cGF0aCBpZD0ic2hhcGU3IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LjU0NDk5OTgzNzc0MDQ4LCA4LjY2MjQ5OTY5MDc0Mjk5KSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAuNDk5MiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIGQ9Ik0wIDBMMy4xMzUgMCIgc29kaXBvZGk6bm9kZXR5cGVzPSJjYyIvPjxwYXRoIGlkPSJzaGFwZTgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguMzAyNDk5NzAzNTk1MjMsIDguNjM5OTk5NjkxNTQ2MjUpIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMC40OTkyIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMiIgZD0iTTAgMC4wMjI1TDMuODAyNSAwIiBzb2RpcG9kaTpub2RldHlwZXM9ImNjIi8+PHBhdGggaWQ9InNoYXBlOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNC4yNzQ5OTk4NDczNzk2NiwgOS45Njc0OTk2NDQxNTM2MikiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwLjQ5OTIiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIyIiBkPSJNMCAwTDMuMjQxMjUgMCIgc29kaXBvZGk6bm9kZXR5cGVzPSJjYyIvPjxwYXRoIGlkPSJzaGFwZTEwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4LjgxOTk5OTY4NTEyMDE0LCA5Ljg3NzQ5OTY0NzM2NjY4KSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAuNDk5MiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIGQ9Ik0wIDBMMi45OTI1IDAiIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2MiLz48cGF0aCBpZD0ic2hhcGUxMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOC4xNDQ5OTk3MDkyMTgwOCwgNi45MDc0OTk3NTMzOTc2NikiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwLjQ5OTIiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIyIiBkPSJNMCAwTDAgNS4yNjUiIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2MiLz48cGF0aCBpZD0ic2hhcGUxMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNS44OTQ5OTk3ODk1NDQ1OCwgMTIuMzk3NDk5NTU3NDAxKSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAuNDk5MiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIGQ9Ik0wIDEuNzc2MzZlLTE1TDUuNTEzNjUgMCIgc29kaXBvZGk6bm9kZXR5cGVzPSJjYyIvPgo8L3N2Zz4K";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error(
      "File System Access API cannot run on sandboxed mode.\nPlease disable the sandbox when loading the extension."
    );
  }
  if (app.hasFSAccess) {
    if (isdevbranch) {
      alert(
        "🛠️   This extension is in development   🛠️\n" +
          "To prevent data loss, avoid using this on personal files or folders."
      );
    }

    console.log("Browser supports FSAAPI.");
  } else {
    unsupportedBrowser = true;
    let QuitLoadingExt = confirm(
      "Your current browser does not support File System Access API!" +
        "This extension will not function here.\n\n" +
        "Known browsers that support this:\n" +
        "Chrome (v86+)\n" +
        "Edge (v86+)\n" +
        "Opera (v72+)\n\n" +
        'For more information, click "Supported Browsers" in the palette. ' +
        "Would you like to continue?"
    );
    if (!QuitLoadingExt) throw new Error("User cancelled extension loading.");
  }
  let LoadedExtensions = JSON.stringify(
    Array.from(Scratch.vm.extensionManager._loadedExtensions.keys())
  );
  if (!LoadedExtensions.includes("skyhigh173JSON"))
    if (
      confirm(
        "Import JSON extension by Skyhigh173?\nThis tool will be crucial to get file data."
      )
    )
      Scratch.vm.extensionManager
        .loadExtensionURL("https://extensions.turbowarp.org/Skyhigh173/json.js")
        .then(() => {
          alert("Imported JSON extension by Skyhigh173.");
        });
  class fsaapi98396 {
    /**
     * Imported code for later use.
     */
    humanFileSize(bytes, si = false, dp = 1) {
      const thresh = si ? 1000 : 1024;
      if (Math.abs(bytes) < thresh) {
        return bytes + " B";
      }
      const units = si
        ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
        : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
      let u = -1;
      const r = 10 ** dp;
      do {
        bytes /= thresh;
        ++u;
      } while (
        Math.round(Math.abs(bytes) * r) / r >= thresh &&
        u < units.length - 1
      );
      return bytes.toFixed(dp) + " " + units[u];
    }
    /**
     * End of Imports
     */

    //// Extension Details ////
    getInfo() {
      return {
        id: "fsaapi98396",
        name: "File System Access API",
        color1: "#1565c0",
        color2: "#9964b9",
        color3: "#ffc107",
        docsURI: DocumentataionURI,
        blocks: [
          {
            func: "getSupportedBrowsers",
            blockType: Scratch.BlockType.BUTTON,
            text: "Supported Browsers",
            hideFromPalette: !unsupportedBrowser,
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Permission Management",
          },
          {
            opcode: "getUserPermissionFiP",
            blockType: Scratch.BlockType.COMMAND,
            text: "Request file picker permission",
            blockIconURI: FileIcon,
          },
          {
            opcode: "getUserPermissionFoP",
            blockType: Scratch.BlockType.COMMAND,
            text: "Request folder picker permission",
            blockIconURI: FolderIcon,
          },
          {
            opcode: "getPermissions",
            blockType: Scratch.BlockType.REPORTER,
            text: "Check permissions",
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Single File",
          },
          {
            opcode: "rqFilePicker",
            blockType: Scratch.BlockType.COMMAND,
            text: "Open a file starting in [LOC] with slot [NAME]",
            blockIconURI: FileIcon,
            arguments: {
              LOC: {
                type: Scratch.ArgumentType.STRING,
                menu: "LOCATIONS",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: "FILESAVES",
              },
            },
          },
          {
            opcode: "writeAccessFailCheck",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Access denied?",
            blockIconURI: FileIcon,
          },
          {
            opcode: "outputCheck",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Is [NAME] occupied?",
            blockIconURI: FileIcon,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: "FILESAVES",
              },
            },
          },
          {
            opcode: "getFileHandles",
            blockType: Scratch.BlockType.REPORTER,
            text: "Get information JSON for [NAME]",
            blockIconURI: FileIcon,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: "FILESAVES",
              },
            },
          },
          {
            opcode: "getOpenedFileData",
            blockType: Scratch.BlockType.REPORTER,
            text: "Read file [NAME] using [TYPE]",
            blockIconURI: FileIcon,
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "TYPES",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: "FILESAVES",
              },
            },
          },
          {
            opcode: "writeSingleFile",
            blockType: Scratch.BlockType.COMMAND,
            text: "Write string [IN] to open file in [NAME]",
            blockIconURI: FileIcon,
            arguments: {
              IN: {
                type: Scratch.ArgumentType.STRING,
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: "FILESAVES",
              },
            },
          },
          {
            opcode: "closeSingleFile",
            blockType: Scratch.BlockType.COMMAND,
            text: "Empty slot [NAME]",
            blockIconURI: FileIcon,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: "FILESAVES",
              },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Folders",
          },
          {
            opcode: "dirMultiFileOpen",
            blockType: Scratch.BlockType.COMMAND,
            text: "Open a Directory starting in [LOC]",
            blockIconURI: FolderIcon,
            arguments: {
              LOC: {
                type: Scratch.ArgumentType.STRING,
                menu: "LOCATIONS",
              },
            },
          },
          {
            opcode: "isFolderDataBlank",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Is folder open?",
            blockIconURI: FolderIcon,
          },
          {
            opcode: "getFolderContentsJSON",
            blockType: Scratch.BlockType.REPORTER,
            text: "Folder contents JSON",
            blockIconURI: FolderIcon,
          },
          {
            opcode: "readFileFromPath",
            blockType: Scratch.BlockType.REPORTER,
            text: "Read file path [PATH] using [TYPE]",
            blockIconURI: FolderIcon,
            arguments: {
              PATH: {
                type: Scratch.ArgumentType.STRING,
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "TYPES",
              },
            },
          },
          {
            opcode: "writeToFilePath",
            blockType: Scratch.BlockType.COMMAND,
            text: "Write [DATA] to file path [PATH]",
            blockIconURI: FolderIcon,
            arguments: {
              PATH: {
                type: Scratch.ArgumentType.STRING,
              },
              DATA: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "folderCreate",
            blockType: Scratch.BlockType.COMMAND,
            text: "[ACTION] [KIND] with path [NAME] and [INDX]",
            blockIconURI: FolderIcon,
            arguments: {
              ACTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "ACTIONS",
              },
              KIND: {
                type: Scratch.ArgumentType.STRING,
                menu: "KINDS",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
              },
              INDX: {
                type: Scratch.ArgumentType.STRING,
                menu: "INDEX",
              },
            },
          },
        ],
        menus: {
          INDEX: {
            acceptReporters: true,
            items: ["index", "keep"],
          },
          ACTIONS: {
            acceptReporters: true,
            items: ["Create", "Delete"],
          },
          KINDS: {
            acceptReporters: true,
            items: ["File", "Folder"],
          },
          TYPES: {
            acceptReporters: true,
            items: ["stream", "text", "arrayBuffer"],
          },
          LOCATIONS: {
            acceptReporters: true,
            items: [
              "desktop",
              "documents",
              "downloads",
              "music",
              "pictures",
              "videos",
            ],
          },
          FILESAVES: {
            acceptReporters: true,
            items: ["Slot 1", "Slot 2", "Slot 3", "Slot 4", "Slot 5"],
          },
        },
      };
    }
    //// Extension Details End ////

    //// Unsupported Browser ////
    getSupportedBrowsers() {
      Scratch.openWindow(
        "https://developer.mozilla.org/en-US/docs/Web/API/Window/showOpenFilePicker#browser_compatibility"
      );
    }
    //// Unsupported Browser End ////

    //// Permissions ////
    getUserPermissionFiP() {
      //Remove folder picker permission when file picker permission is requested
      mayOpenFolderPicker = false;
      if (!mayOpenFilePicker) {
        mayOpenFilePicker = confirm(
          `Do you allow the following site to open your file picker?\n"${window.location.href}"`
        );
        if (!mayOpenFilePicker) console.error("Permission denied");
      }
    }
    getUserPermissionFoP() {
      //vice-versa.
      mayOpenFilePicker = false;
      if (!mayOpenFolderPicker) {
        mayOpenFolderPicker = confirm(
          `Do you allow the following site to open your directory picker?\n"${window.location.href}"`
        );
        if (!mayOpenFolderPicker) console.error("Permission denied");
      }
    }
    getPermissions() {
      if (mayOpenFilePicker) {
        return "Files";
      } else if (mayOpenFolderPicker) {
        return "Folders";
      } else {
        return "None";
      }
    }
    //// Permissions End ////

    //// Single File ////
    async rqFilePicker(args) {
      try {
        let output;
        let storefd;
        let fileHandle;
        output = outputSlotMapping[args.NAME];
        //Set current slot
        writeFail = false;
        console.log(output);
        if ((output === undefined || output == "") && mayOpenFilePicker) {
          [fileHandle] = await window.showOpenFilePicker({
            multiple: false,
            startIn: args.LOC,
            mode: "readwrite",
          });
          handleSlotMapping[args.NAME] = fileHandle;
          const file = await fileHandle.getFile();
          if (file.type === "") {
            NoBlankFileType = "unknown";
          } else {
            NoBlankFileType = file.type;
          }
          const FileTypeUnblank = NoBlankFileType;
          output = JSON.stringify({
            type: FileTypeUnblank,
            name: file.name,
            size: file.size,
            lastModified: file.lastModified,
          });
          if (file.size >= 25000000) {
            if (
              !confirm(
                `This file is quite large (${this.humanFileSize(
                  file.size,
                  true
                )}). It could cause the site to freeze or crash! Continue anyway?`
              )
            ) {
              console.error("Large file import aborted by user");
            }
          }
          storefd = file;
          outputSlotMapping[args.NAME] = output;
          storefdSlotMapping[args.NAME] = storefd;
        }
      } catch (error) {
        writeFail = true;
        console.error("Error opening file:", error);
      }
    }
    async getOpenedFileData(args) {
      let fileHandle;
      let storefd;
      storefd = storefdSlotMapping[args.NAME];
      fileHandle = handleSlotMapping[args.NAME];
      if (!storefd) return "";
      try {
        const file = await fileHandle.getFile(); // Re-acquire the file after writing
        storefd = file;
        storefdSlotMapping[args.NAME] = storefd;
        if (args.TYPE === "arrayBuffer") {
          const arrayBuffer = await file.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);
          return "[" + Array.from(uint8Array).toString() + "]";
        } else if (args.TYPE === "text") {
          return await file.text();
        } else if (args.TYPE === "stream") {
          const streamReader = file.stream().getReader();
          const decoder = new TextDecoder();
          let StreamOutResult = "";
          const chunkSize = 1024;
          async function readChunks() {
            while (true) {
              const { done, value } = await streamReader.read();
              if (done) {
                console.log("Stream reading complete.");
                return StreamOutResult;
              }
              StreamOutResult += decoder.decode(value, { stream: true });
              if (value.length >= chunkSize) {
                await new Promise((resolve) => setTimeout(resolve, 5));
              }
            }
          }
          return await readChunks();
        } else {
          console.error("Invalid type specified");
        }
      } catch (error) {
        console.error("Error reading file:", error);
        console.error("Error reading file");
      }
    } //arch btw
    getFileHandles(args) {
      let output;
      output = outputSlotMapping[args.NAME];
      return output;
    }
    outputCheck(args) {
      let output;
      output = outputSlotMapping[args.NAME];
      console.log(output);
      return output !== "";
    }
    async writeSingleFile(args) {
      let fileHandle, storefd; //L e a r n i n g
      storefd = storefdSlotMapping[args.NAME];
      fileHandle = handleSlotMapping[args.NAME];
      if (fileHandle) {
        try {
          const writable = await fileHandle.createWritable();
          await writable.write(args.IN);
          await writable.close();
          console.log("File written successfully");
          storefd = await fileHandle.getFile(); // Re-acquire the file handle after writing
          storefdSlotMapping[args.NAME] = storefd;
        } catch (error) {
          console.error("Error writing to file:", error);
          console.error("Error writing to file");
        }
      } else {
        console.error("No file to write to!");
      }
    }
    closeSingleFile(args) {
      outputSlotMapping[args.NAME] = "";
      storefdSlotMapping[args.NAME] = "";
      handleSlotMapping[args.NAME] = "";
    }
    writeAccessFailCheck() {
      return writeFail;
    }
    //// Single File End ////

    //// Folders ////
    async dirMultiFileOpen(args) {
      if (mayOpenFolderPicker) {
        try {
          folderHandle = await window.showDirectoryPicker({
            multiple: false,
            startIn: args.LOC,
            mode: "readwrite",
          });
          FolderData = await this.internalGetFolderContents(folderHandle);
        } catch (error) {
          console.error(error);
        }
      } else {
        return "Access denied.";
      }
    }
    isFolderDataBlank() {
      return FolderData !== "";
    }
    getFolderContentsJSON() {
      return FolderData;
    }
    async internalGetFolderContents(internalDirHandle) {
      const dirHandle = internalDirHandle;

      async function collectDirectoryStructure(handle) {
        const structure = {};

        for await (const entry of handle.values()) {
          if (entry.kind === "directory") {
            const subDirHandle = await handle.getDirectoryHandle(entry.name);
            structure[entry.name] =
              await collectDirectoryStructure(subDirHandle);
          } else {
            if (!structure[".files"]) {
              structure[".files"] = [];
            }
            const fileHandle = await handle.getFileHandle(entry.name);
            const file = await fileHandle.getFile();
            if (file.type === "") {
              NoBlankFileType = "unknown";
            } else {
              NoBlankFileType = file.type;
            }
            structure[".files"].push({
              type: NoBlankFileType,
              name: entry.name,
              size: file.size,
              lastModified: file.lastModified,
            });
          }
        }

        return structure;
      }

      const directoryStructure = await collectDirectoryStructure(dirHandle);
      return JSON.stringify(directoryStructure, null, 2);
    }
    async readFileFromPath(args) {
      const parts = args.PATH.split("/").filter((part) => part);
      let currentHandle = folderHandle;

      for (let i = 0; i < parts.length - 1; i++) {
        currentHandle = await currentHandle.getDirectoryHandle(parts[i]);
      }
      const fileHandle = await currentHandle.getFileHandle(
        parts[parts.length - 1]
      );

      const contents = await this.getFileDataFromFolder(fileHandle, args.TYPE);
      return contents;
    }
    async getFileDataFromFolder(fileHandle, method) {
      if (!fileHandle) return "";
      try {
        const file = await fileHandle.getFile();
        if (method === "arrayBuffer") {
          const arrayBuffer = await file.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);
          return "[" + Array.from(uint8Array).toString() + "]";
        } else if (method === "text") {
          return await file.text();
        } else if (method === "stream") {
          const streamReader = file.stream().getReader();
          const decoder = new TextDecoder();
          let StreamOutResult = "";
          const chunkSize = 1024;

          async function readChunks() {
            while (true) {
              const { done, value } = await streamReader.read();
              if (done) {
                console.log("Stream reading complete.");
                return StreamOutResult;
              }
              StreamOutResult += decoder.decode(value, { stream: true });
              if (value.length >= chunkSize) {
                await new Promise((resolve) => setTimeout(resolve, 5));
              }
            }
          }

          return await readChunks();
        } else {
          console.error("Invalid type specified");
        }
      } catch (error) {
        console.error("Error reading file:", error);
        console.error("Error reading file");
      }
    }
    async writeToFilePath(args) {
      const parts = args.PATH.split("/").filter((part) => part);
      let currentHandle = folderHandle;

      for (let i = 0; i < parts.length - 1; i++) {
        currentHandle = await currentHandle.getDirectoryHandle(parts[i]);
      }
      const fileHandle = await currentHandle.getFileHandle(
        parts[parts.length - 1]
      );

      const contents = await this.setFileDataFromFolder(fileHandle);
      return contents;
    }
    async setFileDataFromFolder(fileHandle, string) {
      if (fileHandle) {
        try {
          const writable = await fileHandle.createWritable();
          await writable.write(string);
          await writable.close();
          console.log("File written successfully");
        } catch (error) {
          console.error("Error writing to file:", error);
          console.error("Error writing to file");
        }
      } else {
        console.error("No file to write to!");
      }
    }
    async folderCreate(args) {
      if ((args.ACTION == "Create") & (args.KIND == "File")) {
        await this.internalFolderCreateFile(args.NAME);
        if (args.INDX == "index")
          await this.internalGetFolderContents(folderHandle);
      } else if ((args.ACTION == "Delete") & (args.KIND == "File")) {
        await this.internalFolderDeleteFile(args.NAME);
        if (args.INDX == "index")
          await this.internalGetFolderContents(folderHandle);
      } else if ((args.ACTION == "Create") & (args.KIND == "Folder")) {
        await this.internalFolderCreateFolder(args.NAME);
        if (args.INDX == "index")
          await this.internalGetFolderContents(folderHandle);
      } else if ((args.ACTION == "Delete") & (args.KIND == "Folder")) {
        await this.internalFolderDeleteFolder(args.NAME);
        if (args.INDX == "index")
          await this.internalGetFolderContents(folderHandle);
      }
    }
    async internalFolderCreateFile(filename, fh) {
      const parts = filename.split("/").filter((part) => part);
      let currentHandle = folderHandle;

      for (let i = 0; i < parts.length - 1; i++) {
        currentHandle = await currentHandle.getDirectoryHandle(parts[i]);
      }
      await currentHandle.getFileHandle(parts[parts.length - 1], {
        create: true,
      });
      console.log("Created.");
    }
    async internalFolderDeleteFile(filename, fh) {
      const parts = filename.split("/").filter((part) => part);
      let currentHandle = folderHandle;

      for (let i = 0; i < parts.length - 1; i++) {
        currentHandle = await currentHandle.getDirectoryHandle(parts[i]);
      }
      await currentHandle.removeEntry(parts[parts.length - 1]);
      console.log("Deleted.");
    }
    async internalFolderCreateFolder(foldername, fh) {
      const parts = foldername.split("/").filter((part) => part);
      let currentHandle = folderHandle;

      for (let i = 0; i < parts.length - 1; i++) {
        currentHandle = await currentHandle.getDirectoryHandle(parts[i]);
      }
      await currentHandle.getDirectoryHandle(parts[parts.length - 1], {
        create: true,
      });
      console.log("Created.");
    }
    async internalFolderDeleteFolder(foldername, fh) {
      const parts = foldername.split("/").filter((part) => part);
      let currentHandle = folderHandle;

      for (let i = 0; i < parts.length - 1; i++) {
        currentHandle = await currentHandle.getDirectoryHandle(parts[i]);
      }
      await currentHandle.removeEntry(parts[parts.length - 1], {
        recursive: true,
      });
      console.log("Deleted.");
    }
    //// Folders End ////
  }
  Scratch.extensions
    .register(new fsaapi98396())
    .then(console.log("File System Access API successfully registered."));
})(Scratch);
