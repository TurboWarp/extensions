// Name: Captchas
// ID: SPcaptcha
// Description: Captchas to Check if Users are Human or not
// By: SharkPool

// Version V.1.0.2

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Captchas Extension must run unsandboxed!");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMzUuMTM4NjUiIGhlaWdodD0iMTM1LjEzODY1IiB2aWV3Qm94PSIwLDAsMTM1LjEzODY1LDEzNS4xMzg2NSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3Mi40MzA2NywtMTEyLjQzMDY3KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMTc1LjkzMDY3LDE4MGMwLC0zNS4zODQ1MSAyOC42ODQ4MSwtNjQuMDY5MzMgNjQuMDY5MzMsLTY0LjA2OTMzYzM1LjM4NDUxLDAgNjQuMDY5MzMsMjguNjg0ODEgNjQuMDY5MzMsNjQuMDY5MzNjMCwzNS4zODQ1MSAtMjguNjg0ODEsNjQuMDY5MzMgLTY0LjA2OTMzLDY0LjA2OTMzYy0zNS4zODQ1MSwwIC02NC4wNjkzMywtMjguNjg0ODEgLTY0LjA2OTMzLC02NC4wNjkzM3oiIGZpbGw9IiM2MDZlOTAiIHN0cm9rZT0iIzMzM2E0ZCIgc3Ryb2tlLXdpZHRoPSI3Ii8+PHBhdGggZD0iTTI4MS45OTg1NSwxNzkuOTM4NThjLTYuNDE0LC0wLjA5MyAtMjIuMDE1LC0wLjA2MTIgLTM1LjgyNSwtMC4wMDdsMTAuOTAzLC0xMC45MDNjLTMuMzMzLC01LjIzMDkgLTguOTkzNiwtOC44MzQ4NyAtMTUuNTI0LC05LjM1MDNjLTAuMzYxMSwtMC4xNDAxOCAtMC44NTI1NiwtMC4yMTQ1OCAtMS40ODkzLC0wLjIxNDU4Yy01LjI3MDcsMCAtOS4wODA5LDEuNzE1OCAtMTEuNzcsMy44MTQzYy0yLjU4NTYsMS44MTEgLTQuNzMsNC4yMDg4IC02LjIzOTUsNy4wMDA1bC0xNS40MDMsLTE1LjU2NWM3LjY1OSwtMTAuMDgxMyAxOS43NzUsLTE2LjU5MSAzMy40MTMsLTE2LjU5MWMxMy4xMDUsMCAyNC44MDUsNi4wMTI5IDMyLjQ5NiwxNS40MjdsOS4zOTcxLC05LjM5NzF2MzMuOTkxYzAuMDI3LDAuNTk2MiAwLjA0MDksMS4xOTUyOCAwLjA0MjksMS43OTc2IiBmaWxsPSIjMWMzYWE5IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0yMzkuODE2MzMsMTM4LjEyNTJjLTAuMDkzMSw2LjQxNCAtMC4wNjEyLDIyLjAxNSAtMC4wMDcsMzUuODI1bC0xMC45MDMsLTEwLjkwM2MtNS4yMzA5LDMuMzMzIC04LjgzNDg3LDguOTkzNiAtOS4zNTAzLDE1LjUyNGMtMC4xNDAxOCwwLjM2MTEgLTAuMjE0NTgsMC44NTI1NiAtMC4yMTQ1OCwxLjQ4OTNjMCw1LjI3MDcgMS43MTU5LDkuMDgwOSAzLjgxNDMsMTEuNzdjMS44MTEsMi41ODU2IDQuMjA4OCw0LjczIDcuMDAwNSw2LjIzOTVsLTE1LjU2NSwxNS40MDNjLTEwLjA4MTIsLTcuNjU5IC0xNi41OTEsLTE5Ljc3NSAtMTYuNTkxLC0zMy40MTNjMCwtMTMuMTA1IDYuMDEyOSwtMjQuODA1IDE1LjQyNywtMzIuNDk2bC05LjM5NzEsLTkuMzk3MWgzMy45OTFjMC41OTYyLC0wLjAyNyAxLjE5NTI4LC0wLjA0MDkgMS43OTc2LC0wLjA0MjkiIGZpbGw9IiM0Mjg1ZjQiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTE5OC4wMDI5NSwxODAuMDYxNDJjNi40MTQsMC4wOTMgMjIuMDE1LDAuMDYxMiAzNS44MjUsMC4wMDdsLTEwLjkwMywxMC45MDNjMy4zMzMsNS4yMzA5IDguOTkzNiw4LjgzNDg3IDE1LjUyNCw5LjM1MDNjMC4zNjExLDAuMTQwMTggMC44NTI1NiwwLjIxNDU4IDEuNDg5MywwLjIxNDU4YzUuMjcwNywwIDkuMDgwOSwtMS43MTU4IDExLjc3LC0zLjgxNDNjMi41ODU2LC0xLjgxMSA0LjczLC00LjIwODggNi4yMzk1LC03LjAwMDVsMTUuNDAzLDE1LjU2NWMtNy42NTksMTAuMDgxMyAtMTkuNzc1LDE2LjU5MSAtMzMuNDEzLDE2LjU5MWMtMTMuMTA1LDAgLTI0LjgwNSwtNi4wMTI5IC0zMi40OTYsLTE1LjQyN2wtOS4zOTcxLDkuMzk3MXYtMzMuOTkxYy0wLjAyNywtMC41OTYyIC0wLjA0MDksLTEuMTk1MjggLTAuMDQyOSwtMS43OTc2IiBmaWxsPSIjYWJhYmFiIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L2c+PC9zdmc+";

  const blockIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMTcuNTE0MDkiIGhlaWdodD0iMTE3LjUxNDA5IiB2aWV3Qm94PSIwLDAsMTE3LjUxNDA5LDExNy41MTQwOSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4MS4yNDI5NSwtMTIxLjI0Mjk1KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0xODEuMjQyOTUsMjM4Ljc1NzA1di0xMTcuNTE0MDloMTE3LjUxNDA5djExNy41MTQwOXoiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yODEuOTk4NTUsMTc5LjkzODU4Yy02LjQxNCwtMC4wOTMgLTIyLjAxNSwtMC4wNjEyIC0zNS44MjUsLTAuMDA3bDEwLjkwMywtMTAuOTAzYy0zLjMzMywtNS4yMzA5IC04Ljk5MzYsLTguODM0ODcgLTE1LjUyNCwtOS4zNTAzYy0wLjM2MTEsLTAuMTQwMTggLTAuODUyNTYsLTAuMjE0NTggLTEuNDg5MywtMC4yMTQ1OGMtNS4yNzA3LDAgLTkuMDgwOSwxLjcxNTggLTExLjc3LDMuODE0M2MtMi41ODU2LDEuODExIC00LjczLDQuMjA4OCAtNi4yMzk1LDcuMDAwNWwtMTUuNDAzLC0xNS41NjVjNy42NTksLTEwLjA4MTMgMTkuNzc1LC0xNi41OTEgMzMuNDEzLC0xNi41OTFjMTMuMTA1LDAgMjQuODA1LDYuMDEyOSAzMi40OTYsMTUuNDI3bDkuMzk3MSwtOS4zOTcxdjMzLjk5MWMwLjAyNywwLjU5NjIgMC4wNDA5LDEuMTk1MjggMC4wNDI5LDEuNzk3NiIgZmlsbD0iIzFjM2FhOSIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTIzOS44MTYzMywxMzguMTI1MmMtMC4wOTMxLDYuNDE0IC0wLjA2MTIsMjIuMDE1IC0wLjAwNywzNS44MjVsLTEwLjkwMywtMTAuOTAzYy01LjIzMDksMy4zMzMgLTguODM0ODcsOC45OTM2IC05LjM1MDMsMTUuNTI0Yy0wLjE0MDE4LDAuMzYxMSAtMC4yMTQ1OCwwLjg1MjU2IC0wLjIxNDU4LDEuNDg5M2MwLDUuMjcwNyAxLjcxNTksOS4wODA5IDMuODE0MywxMS43N2MxLjgxMSwyLjU4NTYgNC4yMDg4LDQuNzMgNy4wMDA1LDYuMjM5NWwtMTUuNTY1LDE1LjQwM2MtMTAuMDgxMiwtNy42NTkgLTE2LjU5MSwtMTkuNzc1IC0xNi41OTEsLTMzLjQxM2MwLC0xMy4xMDUgNi4wMTI5LC0yNC44MDUgMTUuNDI3LC0zMi40OTZsLTkuMzk3MSwtOS4zOTcxaDMzLjk5MWMwLjU5NjIsLTAuMDI3IDEuMTk1MjgsLTAuMDQwOSAxLjc5NzYsLTAuMDQyOSIgZmlsbD0iIzQyODVmNCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTE5OC4wMDI5NSwxODAuMDYxNDJjNi40MTQsMC4wOTMgMjIuMDE1LDAuMDYxMiAzNS44MjUsMC4wMDdsLTEwLjkwMywxMC45MDNjMy4zMzMsNS4yMzA5IDguOTkzNiw4LjgzNDg3IDE1LjUyNCw5LjM1MDNjMC4zNjExLDAuMTQwMTggMC44NTI1NiwwLjIxNDU4IDEuNDg5MywwLjIxNDU4YzUuMjcwNywwIDkuMDgwOSwtMS43MTU4IDExLjc3LC0zLjgxNDNjMi41ODU2LC0xLjgxMSA0LjczLC00LjIwODggNi4yMzk1LC03LjAwMDVsMTUuNDAzLDE1LjU2NWMtNy42NTksMTAuMDgxMyAtMTkuNzc1LDE2LjU5MSAtMzMuNDEzLDE2LjU5MWMtMTMuMTA1LDAgLTI0LjgwNSwtNi4wMTI5IC0zMi40OTYsLTE1LjQyN2wtOS4zOTcxLDkuMzk3MXYtMzMuOTkxYy0wLjAyNywtMC41OTYyIC0wLjA0MDksLTEuMTk1MjggLTAuMDQyOSwtMS43OTc2IiBmaWxsPSIjYWJhYmFiIiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9nPjwvc3ZnPg==";

  const vm = Scratch.vm;
  const render = vm.renderer;

  const fontMenu = [
    "Sans Serif", "Serif", "Handwriting",
    "Marker", "Curly", "Pixel"
  ];

  const allElements = [
    "image frame", "image background",
    "input frame", "input background", "input text",
    "button frame", "button background (hover)", "button background (normal)", "button text"
  ];

  const xmlEscape = function (unsafe) {
    unsafe = String(unsafe);
    return unsafe.replace(/[<>&'"]/g, c => {
      switch (c) {
        case "<": return "&lt;";
        case ">": return "&gt;";
        case "&": return "&amp;";
        case "'": return "&apos;";
        case "\"": return "&quot;";
      }
    });
  };

  // Security Stuff
  let internalUserPass, internalUserAnswer, internalAnswer;

  let currentCaptcha = null;
  let captchaInfo = {
    passed: false, difficulty: "easy",
    answer: "", userAnswer: "",
    lastImg: ""
  };
  let visSetting = {
    // Functions
    autoClose: true, focusMode: true,

    // Visuals
    font: "Inherit",
    "image frame" : "#cccccc", "image background" : "#000000",
    "input frame" : "#cccccc", "input background" : "linear-gradient(#ffffff, #b3b3b3)", "input text" : "#000000",
    "button frame" : "#cccccc", "button text" : "#000000",
    "button background (hover)" : "linear-gradient(#b3b3b3, #ffffff)", "button background (normal)" : "linear-gradient(#ffffff, #b3b3b3)",

    // Effects: Item 0: value, Item 1, HTML unit
    blur: [0, "px"], brightness: [0, ""],
    contrast: [0, ""], "hue-rotate": [0, "deg"],
    invert: [0, ""], opacity: [0, ""],
    saturate: [100, ""], sepia: [0, ""],
    scale: [100, "", 100, ""],  rotate: [90, "deg"],
    skewX: [0, "deg"], skewY: [0, "deg"]
  };

  function generateCaptchaText(DIFF) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captchaText = "";
    for (let i = 0; i < 4 + ((DIFF - 1) * 2); i++) {
      captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captchaText;
  }

  function randomHex(DIFF) {
    const rngCom = () => Math.floor(Math.random() * 256);
    let darkAmt = 35 * (DIFF - 1);
    const color = { r: rngCom(), g: rngCom(), b: rngCom() };
    if (color.r < 80 && color.g < 80 && color.b < 80) darkAmt += 80;
    color.r = Math.max(50, color.r - darkAmt);
    color.g = Math.max(50, color.g - darkAmt);
    color.b = Math.max(50, color.b - darkAmt);
    return RGBA2hex(color);
  }
  function RGBA2hex(rgb) {
    const alphaHex = rgb.a !== undefined ? Math.round(rgb.a).toString(16).padStart(2, '0') : '';
    return `#${(1 << 24 | rgb.r << 16 | rgb.g << 8 | rgb.b).toString(16).slice(1)}${alphaHex}`;
  }

  function drawCaptcha() {
    captchaInfo.userAnswer = "";
    // Easy to Read/Distinguishable Fonts
    const fonts = [
      "Arial", "Helvetica", "Verdana",
      "Georgia", "Palatino", "Comic Sans MS", "Arial Black", "Impact",
      "Sans Serif", "Serif", "Handwriting", "Marker", "Curly", "Pixel"
    ];

    const container = document.createElement("div");
    container.style.cssText = `width: 100%; height: 100%; background-color: rgba(0, 0, 0, ${visSetting.focusMode ? 0.5 : 0});`;
    container.id = "SPcaptchaBox";
    container.style.position = "fixed";
    container.style.transform = "translate(-50%, -50%)";
    container.style.pointerEvents = "auto";
    container.style.fontFamily = visSetting.font;

    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 100;
    const ctx = canvas.getContext("2d");
    const capTxt = generateCaptchaText(captchaInfo.difficulty);

    // Draw Lines
    for (let l = 0; l < captchaInfo.difficulty * 3; l++) {
      ctx.strokeStyle = randomHex(6 - captchaInfo.difficulty);
      ctx.lineWidth = Math.random() * 1.5 + 1;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // Draw Letters
    const startX = 100 - (capTxt.length * 10);
    const startY = canvas.height / 2;
    const spacing = (80 - (capTxt.length * 5)) / 2;
    for (let i = 0; i < capTxt.length; i++) {
      const convertDiff = captchaInfo.difficulty * 20;
      const xPos = startX + i * spacing + Math.random() * 10 - 5;
      const yPos = startY + Math.random() * convertDiff - (convertDiff / 2);
    
      const fontSize = Math.floor(Math.random() * 20) + 20;
      const font = fonts[Math.floor(Math.random() * fonts.length)];
      ctx.font = `${fontSize}px ${font}`;
      ctx.fillStyle = randomHex(captchaInfo.difficulty);
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.save();
      ctx.translate(xPos, yPos);
      const diffRange = { 1: Math.PI / 8, 2: Math.PI / 6, 3: Math.PI / 5 };
      const rotRange = diffRange[captchaInfo.difficulty];
      ctx.rotate(Math.random() * rotRange * 2 - rotRange);
      ctx.fillText(capTxt[i], 0, 0);
      ctx.restore();
    }

    const imgContain = document.createElement("div");
    imgContain.style.position = "absolute";
    imgContain.style.top = "40%";
    imgContain.style.left = "50%";
    imgContain.style.transform = "translate(-50%, -60%)";
    imgContain.style.backgroundColor = visSetting["image background"];
    imgContain.style.zIndex = "3";
    imgContain.style.border = `5px solid ${visSetting["image frame"]}`;
    imgContain.style.borderRadius = "15px";

    const captchaImage = document.createElement("img");
    const captchaURI = canvas.toDataURL();
    captchaInfo.lastImg = captchaURI;
    captchaImage.src = captchaURI;
    captchaImage.style.userDrag = "none";
    captchaImage.style.webkitUserDrag = "none";
    captchaImage.style.userSelect = "none";
    captchaImage.style.mozUserSelect = "none";
    captchaImage.style.webkitUserSelect = "none";
    captchaImage.style.msUserSelect = "none";
    imgContain.appendChild(captchaImage);
    container.appendChild(imgContain);

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter CAPTCHA";
    input.style.position = "absolute";
    input.style.top = "60%";
    input.style.left = "50%";
    input.style.transform = "translate(-50%, -50%)";
    input.style.width = "200px";
    input.style.zIndex = "2";
    input.style.textAlign = "center";
    input.style.borderRadius = "10px";
    input.style.padding = "5px 15px";
    input.style.border = `5px solid ${visSetting["input frame"]}`;
    input.style.background = visSetting["input background"];
    input.style.color = visSetting["input text"];
    container.appendChild(input);

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.style.position = "absolute";
    submitButton.style.top = "70%";
    submitButton.style.left = "50%";
    submitButton.style.transform = "translate(-50%, -20%)";
    submitButton.style.background = visSetting["button background (normal)"];
    submitButton.style.border = `5px solid ${visSetting["button frame"]}`;
    submitButton.style.zIndex = "2";
    submitButton.style.borderRadius = "10px";
    submitButton.style.padding = "5px 15px";
    submitButton.style.fontWeight = "600";
    submitButton.style.color = visSetting["button text"];
    container.appendChild(submitButton);
  
    function handleSubmit() {
      container.style.pointerEvents = "none";
      captchaInfo.userAnswer = input.value;
      captchaInfo.passed = input.value === capTxt;
      if (visSetting.autoClose) {
        render.removeOverlay(container);
        captchaInfo.answer = capTxt;
        currentCaptcha = null;
      }
      vm.runtime.startHats("SPcaptcha_whenAnswered");
    }
    submitButton.addEventListener("click", handleSubmit);
    submitButton.addEventListener("mouseenter", function() { submitButton.style.background = visSetting["button background (hover)"] });
    submitButton.addEventListener("mouseleave", function() { submitButton.style.background = visSetting["button background (normal)"] });
    input.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSubmit();
      }
    });
    render.addOverlay(container, "scale-centered");
    input.focus();
    currentCaptcha = container;
  }

  class SPcaptcha {
    constructor() {
      vm.runtime.on("PROJECT_START", () => { this.closeCaptcha() });
      vm.runtime.on("PROJECT_STOP_ALL", () => { this.closeCaptcha() });

      // Helper Function to Prevent Users from auto-passing Captchas
      // Of course, theyre might be other workarounds but :/
      vm.runtime.on("BEFORE_EXECUTE", () => {
        // Currently I just reset the function, perhaps we could stop the project, but whatever
        const openUserPass = vm.runtime._primitives.SPcaptcha_userPassed.toString();
        if (internalUserPass && openUserPass !== internalUserPass.toString()) {
          vm.runtime._primitives.SPcaptcha_userPassed = eval(internalUserPass.toString());
        }

        const openAnswer = vm.runtime._primitives.SPcaptcha_getAnswer.toString();
        if (internalAnswer && openAnswer !== internalAnswer.toString()) {
          vm.runtime._primitives.SPcaptcha_getAnswer = eval(internalAnswer.toString());
        }

        const openUserAnswer = vm.runtime._primitives.SPcaptcha_getResponse.toString();
        if (internalUserAnswer && openUserAnswer !== internalUserAnswer.toString()) {
          vm.runtime._primitives.SPcaptcha_getResponse = eval(internalUserAnswer.toString());
        }
      });
    }
    getInfo() {
      return {
        id: "SPcaptcha",
        name: "Captchas",
        color1: "#606E90",
        menuIconURI,
        blockIconURI,
        blocks: [
          {
            opcode: "openCaptcha",
            blockType: Scratch.BlockType.COMMAND,
            text: "open [DIFF] Captcha",
            arguments: {
              DIFF: { type: Scratch.ArgumentType.STRING, menu: "DIFFICULTY" }
            },
          },
          {
            opcode: "openCaptchaWait",
            blockType: Scratch.BlockType.COMMAND,
            text: "open [DIFF] Captcha and wait",
            arguments: {
              DIFF: { type: Scratch.ArgumentType.STRING, menu: "DIFFICULTY" }
            },
          },
          {
            opcode: "closeCaptcha",
            blockType: Scratch.BlockType.COMMAND,
            text: "close Captchas"
          },
          {
            opcode: "whenAnswered",
            blockType: Scratch.BlockType.EVENT,
            isEdgeActivated: false,
            text: "when Captcha answered"
          },
          {
            opcode: "captchaOpen",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is Captcha open?"
          },
          "---",
          {
            opcode: "userPassed",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "last Captcha passed?"
          },
          {
            opcode: "getAnswer",
            blockType: Scratch.BlockType.REPORTER,
            text: "last Captcha answer"
          },
          {
            opcode: "getResponse",
            blockType: Scratch.BlockType.REPORTER,
            text: "last Submitted answer"
          },
          {
            opcode: "getDiff",
            blockType: Scratch.BlockType.REPORTER,
            text: "current Captcha difficulty"
          },
          {
            opcode: "lastImage",
            blockType: Scratch.BlockType.REPORTER,
            text: "last Captcha image"
          },
          { blockType: Scratch.BlockType.LABEL, text: "Visuals and Colors" },
          {
            opcode: "toggleFunction",
            blockType: Scratch.BlockType.COMMAND,
            text: "toggle [FUNC] [SETTING]",
            arguments: {
              FUNC: { type: Scratch.ArgumentType.STRING, menu: "FUNCTIONS" },
              SETTING: { type: Scratch.ArgumentType.STRING, menu: "TOGGLE" }
            },
          },
          "---",
          {
            opcode: "resetColors",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset Captcha visuals"
          },
          {
            opcode: "setFont",
            blockType: Scratch.BlockType.COMMAND,
            text: "set Captcha font to [FONT]",
            arguments: {
              FONT: { type: Scratch.ArgumentType.STRING, menu: "FONTS" }
            },
          },
          {
            opcode: "setColor",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [THING] to [COLOR]",
            arguments: {
              THING: { type: Scratch.ArgumentType.STRING, menu: "ELEMENTS" },
              COLOR: { type: Scratch.ArgumentType.COLOR }
            },
          },
          "---",
          {
            opcode: "resetEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset Captcha effects"
          },
          {
            opcode: "setEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [EFFECT] of Captcha to [VALUE]",
            arguments: {
              VALUE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "EFFECTS" }
            },
          },
          {
            opcode: "getEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "current [EFFECT]",
            arguments: {
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "EFFECTS" }
            },
          },
        ],
        menus: {
          FONTS: {
            acceptReporters: true,
            items: "allFonts"
          },
          DIFFICULTY: {
            acceptReporters: true,
            items: ["easy", "medium", "hard"]
          },
          TOGGLE: {
            acceptReporters: true,
            items: ["on", "off"]
          },
          FUNCTIONS: {
            acceptReporters: true,
            items: ["focus mode", "auto close"]
          },
          ELEMENTS: {
            acceptReporters: true,
            items: allElements
          },
          EFFECTS: {
            acceptReporters: true,
            items: [
              "blur", "saturation", "contrast", "brightness",
              "hue", "opacity", "sepia", "invert", "direction",
              "scale x", "scale y", "skew x", "skew y"
            ]
          }
        }
      };
    }

    allFonts() {
      const customFonts = Scratch.vm.runtime.fontManager ? Scratch.vm.runtime.fontManager.getFonts().map((i) => ({ text: i.name, value: i.family })) : [];
      return [...fontMenu, ...customFonts];
    }

    openCaptcha(args, util) {
      // remove any existing Captchas
      render.removeOverlay(currentCaptcha);
      currentCaptcha = "pending"; // Immediately Do this to Yield the Block
      captchaInfo.difficulty = args.DIFF === "easy" ? 1 : args.DIFF === "medium" ? 2 : 3;
      drawCaptcha();
    }

    openCaptchaWait(args, util) {
      if (typeof util.stackFrame.captchaWait === "undefined") {
        // remove any existing Captchas
        render.removeOverlay(currentCaptcha);
        util.stackFrame.captchaWait = true;
        currentCaptcha = "pending"; // Immediately Do this to Yield the Block
        captchaInfo.difficulty = args.DIFF === "easy" ? 1 : args.DIFF === "medium" ? 2 : 3;
        drawCaptcha();
      }
      if (currentCaptcha) util.yield();
    }

    closeCaptcha() {
      captchaInfo = { ...captchaInfo, passed: false };
      render.removeOverlay(currentCaptcha);
      currentCaptcha = null;
    }

    userPassed() { return captchaInfo.passed }
    getAnswer() { return captchaInfo.answer }
    getResponse() { return captchaInfo.userAnswer }
    getDiff() {
      const diff = captchaInfo.difficulty;
      return diff === 1 ? "easy" : diff === 2 ? "medium" : "hard";
    }
    captchaOpen() { return Scratch.Cast.toBoolean(currentCaptcha) }
    lastImage() { return captchaInfo.lastImg }

    toggleFunction(args) {
      const con = args.SETTING === "on";
      switch (args.FUNC) {
        case "focus mode": { visSetting.focusMode = con; break }
        case "auto close": { visSetting.autoClose = con; break }
        default: /* prolly will add more later */ break;
      }
      if (currentCaptcha) this.updateCaptchaHtml();
    }

    resetEffect(args) {
      visSetting = {
        ...visSetting,
        blur: [0, "px"], brightness: [0, ""],
        contrast: [0, ""], "hue-rotate": [0, "deg"],
        invert: [0, ""], opacity: [0, ""],
        saturate: [100, ""], sepia: [0, ""],
        scale: [100, "", 100, ""],  rotate: [90, "deg"],
        skewX: [0, "deg"], skewY: [0, "deg"]
      };
      if (!currentCaptcha) return;
      currentCaptcha.style.transform = this.callVisUpdate("transform");
      currentCaptcha.style.filter = this.callVisUpdate("filter");
    }

    setEffect(args) {
      if (!currentCaptcha) return;
      let effect = args.EFFECT;
      if (effect === "direction") effect = "rotate";
      if (effect === "saturation") effect = "saturate";
      if (effect === "skew x") effect = "skewX";
      if (effect === "skew y") effect = "skewY";
      if (effect.startsWith("scale")) effect = "scale";
      const key = visSetting[effect];
      if (key !== undefined) {
        key[args.EFFECT === "scale y" ? 2 : 0] = Scratch.Cast.toNumber(args.VALUE)
        currentCaptcha.style.transform = this.callVisUpdate("transform");
        currentCaptcha.style.filter = this.callVisUpdate("filter");
      }
    }

    resetColors(args) {
      visSetting = {
        ...visSetting,
        "image frame" : "#cccccc", "image background" : "#000000",
        "input frame" : "#cccccc", "input background" : "linear-gradient(#ffffff, #b3b3b3)", "input text" : "#000000",
        "button frame" : "#cccccc", "button text" : "#000000",
        "button background (hover)" : "linear-gradient(#b3b3b3, #ffffff)", "button background (normal)" : "linear-gradient(#ffffff, #b3b3b3)"
      };
      if (currentCaptcha) this.updateCaptchaHtml();
    }

    setFont(args) {
      visSetting.font = xmlEscape(args.FONT);
      if (currentCaptcha) this.updateCaptchaHtml();
    }

    setColor(args) {
      if (allElements.indexOf(args.THING) === -1) return;
      visSetting[args.THING] = xmlEscape(args.COLOR);
      if (currentCaptcha) this.updateCaptchaHtml();
    }

    // Helper function to update visuals/colors
    updateCaptchaHtml() {
      currentCaptcha.style.fontFamily = visSetting.font;
      currentCaptcha.style.backgroundColor = `rgba(0, 0, 0, ${visSetting.focusMode ? 0.5 : 0})`;
      const children = currentCaptcha.childNodes;
      // Image
      children[0].style.backgroundColor = visSetting["image background"];
      children[0].style.border = `5px solid ${visSetting["image frame"]}`;
      // Input
      children[1].style.border = `5px solid ${visSetting["input frame"]}`;
      children[1].style.background = visSetting["input background"];
      children[1].style.color = visSetting["input text"];
      // Submit
      children[2].style.background = visSetting["button background (normal)"];
      children[2].style.border = `5px solid ${visSetting["button frame"]}`;
      children[2].style.color = visSetting["button text"];
    }

    // Helper function to write the Effects as a HTML string
    callVisUpdate(type) {
      let array = [];
      let string = "";
      if (type === "transform") {
        array = ["scale", "rotate", "skewX", "skewY"];
        string += "translate(-50%, -50%) ";
      } else { array = ["blur", "brightness", "contrast", "hue-rotate", "invert", "opacity", "saturate", "sepia"] }
      for (var i = 0; i < array.length; i++) {
        const name = array[i];
        const key = visSetting[name];

        let value = key[0];
        if (name === "opacity") value = 1 - (value / 100);
        if (name === "saturate" || name === "invert" || name === "sepia") value = value / 100;
        if (name === "contrast" || name === "brightness") value = (value + 100) / 100;
        if (name === "rotate") value = value - 90;
        if (name === "scale") value = `${value / 100}, ${key[2] / 100}`;
        string += `${name}(${value}${key[1]}) `;
      }
      return string;
    }

    getEffect(args) {
      let effect = args.EFFECT;
      if (effect === "direction") effect = "rotate";
      if (effect === "saturation") effect = "saturate";
      if (effect === "skew x") effect = "skewX";
      if (effect === "skew y") effect = "skewY";
      if (effect.startsWith("scale")) effect = "scale";
      return visSetting[effect][args.EFFECT === "scale y" ? 2 : 0] ?? "";
    }
  }

  Scratch.extensions.register(new SPcaptcha());

  // Security Feature Enabler
  function checkPrimitives() {
    internalUserPass = vm.runtime._primitives.SPcaptcha_userPassed;
    internalUserAnswer = vm.runtime._primitives.SPcaptcha_getResponse;
    internalAnswer = vm.runtime._primitives.SPcaptcha_getAnswer;
    if (internalUserPass === undefined || internalUserAnswer === undefined || internalAnswer === undefined) {
      setTimeout(checkPrimitives, 10);
    }
  }
  checkPrimitives();
})(Scratch);
