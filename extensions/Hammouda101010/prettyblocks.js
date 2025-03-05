// Name: Pretty Blocks
// ID: HamPrettyBlocks
// Description: Add formating to your projects for more readability. Based of Prettier.
// By: hammouda101010 <https://scratch.mit.edu/users/hammouda101010/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Pretty Blocks extension must run unsandboxed");
  }

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const Cast = Scratch.Cast;
  /**Checks if the extension is in "penguinmod.com".*/
  // @ts-ignore
  const _isPM = Scratch.extensions.isPenguinMod;
  /**Checks if the extension is in "unsandboxed.org".*/
  const isUnSandBoxed =
    JSON.parse(vm.toJSON()).meta.platform.url === "https://unsandboxed.org/";
  /**Checks if the extension is inside the editor.*/
  const isEditor = typeof scaffolding === "undefined";

  function formatError(errors, logToConsole = false) {
    let msg = [];
    for (const error of errors) {
      switch (error.level) {
        case "warn":
          if (logToConsole) console.warn(error.msg);
          msg.push(
            Scratch.translate(
              `(⚠️ warning) "${error.type}" [${error.subject}]: ${error.msg}`
            )
          );
          break;
        case "error":
          if (logToConsole) console.error(error.msg);
          msg.push(
            Scratch.translate(
              `(❌ error) "${error.type}" [${error.subject}]: ${error.msg}`
            )
          );
          break;
      }
    }

    return msg.join("\n").trim();
  }

  /**!
   * altered modal code from
   * @link https://gist.github.com/yuri-kiss/345ab1e729bd5d0a87506156635d0c83
   * @license MIT
   *
   */
  const errorModal = (titleName = "Alert", error = []) => {
    //@ts-ignore
    // run prompt to get a GUI to modify
    ScratchBlocks.prompt();

    // get the portal/modal and its header
    const portal = document.querySelector("div.ReactModalPortal");
    const header = portal.querySelector(
      'div[class*="modal_header-item-title_"]'
    );

    // add our own custom title
    header.textContent = Cast.toString(titleName);
    // get the portal/modal body
    const portalBody = portal.querySelector('div[class^="prompt_body_"]');
    const portalHolder = portalBody.parentElement.parentElement;

    // set a custom modal height
    portalHolder.style.width = "650px";

    const errorString = formatError(error, true);

    const errorHTML = `<!-- Text area for the errors -->
    <textarea class="data-url_code_1o8oS"style="display:inline-block;width:100%;height:12rem;border:1px solid var(--ui-black-transparent);border-radius:0.25rem;margin:0.5rem;" readonly="" spellcheck="false" autocomplete="off">
    ${errorString}
    </textarea>`;
    const contentHTML = `<!-- Wrapper div for the content --><div style="display:inline-block;width:-webkit-fill-available;height:calc(100% - 2.75rem);"><p>${Scratch.translate("Errors found in project:")} </p>${errorHTML}<p>${Scratch.translate('Make sure to fix these manually or with the "Format project" button.')}</p></div>`;
    const promptButtonPos = `<!-- Wrapper div for the prompt buttom positioning --><div style="display:inline;box-sizing:content-box;">${portalBody.querySelector("div[class^=prompt_button-row_]").outerHTML}</div>`;

    portalBody.innerHTML = `${contentHTML}${promptButtonPos}`;
    const textarea = portalBody.querySelector(
      'textarea[class^="data-url_code_1o8oS"]'
    );

    //@ts-expect-error
    textarea.value = textarea.value.trim();

    // creating our OK button
    const okButton = portalBody.querySelector(
      `button[class^="prompt_ok-button_"]`
    );
    okButton.previousElementSibling.remove();
    okButton.parentElement.style.display = "block";
    okButton.parentElement.style.verticalAlign = "bottom";

    okButton.addEventListener("click", () => {
      //@ts-expect-error - included in modal
      portal.querySelector("div[class^=close-button_close-button_]").click();
    });
  };

  /**!
   * altered modal code from @yuri-kiss
   * @link https://gist.github.com/yuri-kiss/345ab1e729bd5d0a87506156635d0c83
   * @license MIT
   *
   * some code was also borrowed from SharkPool's Rigidbodies extension
   * @link https://github.com/SharkPool-SP/SharkPools-Extensions/blob/main/extension-code/Rigidbodies.js
   * @license MIT
   */
  const newRuleModal = (
    titleName = "Alert",
    vals = [],
    deleteRule,
    func = (name, regex, func, scope) => {}
  ) => {
    let name;
    let regex;
    let funcType = vals[0];
    let scope = ["all"];
    // in a Button Context, ScratchBlocks always exists
    // @ts-ignore
    ScratchBlocks.prompt(
      !deleteRule ? titleName : "test",
      "",
      !deleteRule ? () => func(name, regex, funcType, scope) : () => func(name),
      "Format Rules Manager",
      "broadcast_msg"
    );

    if (deleteRule) {
      const input = document.querySelector(
        `div[class="ReactModalPortal"] input`
      );

      const delLabel = input.parentNode.previousSibling.cloneNode(true);
      delLabel.textContent = titleName;
      const selector = document.createElement("select");
      selector.setAttribute("class", input.getAttribute("class"));
      selector.addEventListener("input", (e) => {
        // @ts-ignore
        name = e.target.value;
      });
      vals.forEach((option) => {
        let opt = document.createElement("option");
        opt.value = option;
        opt.text = option;
        selector.appendChild(opt);
      });

      input.parentNode.append(delLabel, selector);
      input.parentNode.previousSibling.remove();
      input.remove();
    } else {
      const portal = document.querySelector("div.ReactModalPortal");
      const portalBody = portal.querySelector('div[class^="prompt_body_"]');
      const portalHolder = portalBody.parentElement.parentElement;

      // set a custom modal height
      portalHolder.style.height = "65%";

      // set the modal HTML
      portalBody.parentElement.style.height = "100%";
      //@ts-ignore
      portalBody.style.height = "calc(100% - 3.125rem)";
      //@ts-ignore
      portalBody.style.wordBreak = "break-all";
      //@ts-ignore
      portalBody.style.position = "relative";
      //@ts-ignore
      portalBody.style.overflowY = "auto";

      const input = document.querySelector(
        `div[class="ReactModalPortal"] input`
      );
      input.addEventListener("input", (e) => {
        // @ts-ignore
        name = e.target.value;
      });

      const regexLabel = input.parentNode.previousSibling.cloneNode(true);
      regexLabel.textContent = "Regular Expression:";

      const regexInput = document.createElement("input");
      regexInput.setAttribute("class", input.getAttribute("class"));
      regexInput.addEventListener("input", (e) => {
        // @ts-ignore
        regex = e.target.value;
      });

      // Format Function (The funtction to use when formatting the project.)
      const funcTypeLabel = input.parentNode.previousSibling.cloneNode(true);
      funcTypeLabel.textContent = "Format Function:";
      const selector = document.createElement("select");
      selector.setAttribute("class", input.getAttribute("class"));
      selector.addEventListener("input", (e) => {
        // @ts-ignore
        funcType = e.target.value;
      });
      vals.forEach((option) => {
        let opt = document.createElement("option");
        opt.value = option.value;
        opt.text = option.text;
        selector.appendChild(opt);
      });

      // Rule Scopes (What types of objects the rule is allowed to access.)
      const scopeLabel = input.parentNode.previousSibling.cloneNode(true);
      scopeLabel.textContent = "Scopes:";

      const scopeInput = document.createElement("input");
      scopeInput.setAttribute("class", input.getAttribute("class"));
      scopeInput.addEventListener("input", (e) => {
        // @ts-ignore
        scope = Cast.toString(e.target.value).split(" ");
      });

      input.parentNode.append(regexLabel, regexInput);
      input.parentNode.append(funcTypeLabel, selector);
      input.parentNode.append(scopeLabel, scopeInput);
    }

    runtime.stopAll();
  };

  /**Opens a Turbowarp-based Modal. Will Only Work on The Editor. */
  function openModal(type, titleName, msg, func = undefined) {
    // Check if we are in the editor
    if (typeof scaffolding === "undefined") {
      if (type === "error") {
        errorModal(titleName, msg);
      } else if (type === "prompt") {
        //@ts-ignore
        ScratchBlocks.prompt(
          titleName,
          "",
          (value) => func(value),
          Scratch.translate("Pretty Blocks"),
          "broadcast_msg"
        );
      }
      runtime.stopAll();
    }
  }

  let ignoreList;

  // Function Types for Custom Rules.
  const funcTypes = [
    { text: Scratch.translate("to uppercase"), value: "uppercase" },
    { text: Scratch.translate("to lowercase"), value: "lowercase" },
    { text: Scratch.translate("regex validation"), value: "regex_validation" },
    { text: Scratch.translate("to lowercase"), value: "lowercase" },
    { text: Scratch.translate("to camelCase"), value: "camelcase" },
    { text: Scratch.translate("to snake_case"), value: "snakecase" },
    { text: Scratch.translate("to PascalCase"), value: "pascal_case" },
    { text: Scratch.translate("space trimming"), value: "trim" },
  ];

  let customRules = {};
  let rules = {
    camelCaseOnly: {
      enabled: false,
      level: "error",
      msg: `"{val}" should be in camelCase.`,
      regex: "/^[a-z]+(?:[A-Z][a-z]*)*$/",
    },
    griffpatchStyle: {
      enabled: true,
      level: "error",
      msg: `"{val}" should be entirely in {isGlobal}. just as griffpatch intened it.`,
      regex: "if <isGlobal> /^[^a-z]+/ else /^[^A-Z]+/",
    },
    customNoCapitalized: {
      enabled: false,
      level: "error",
      msg: `"{val}" should not be capitalized in a custom block.`,
      regex: "/^[A-Z]/",
    },
    ...customRules,
  };

  // Turbowarp's extension storage
  runtime.on("PROJECT_LOADED", () => {
    vm.extensionManager.refreshBlocks();
    try {
      // @ts-ignore
      const storage = JSON.parse(runtime.extensionStorage["HamPrettyBlocks"]);

      if (storage) {
        ignoreList = storage.ignoreList ? JSON.parse(storage.ignoreList) : [];

        rules = storage.rules ? JSON.parse(storage.rules) : rules;
        customRules = storage.customRules
          ? JSON.parse(storage.customRules)
          : customRules;
      }
    } catch (e) {
      console.error(e);
    }
  });

  class HamPrettyBlocks {
    constructor() {
      this.formatErrors = [];
    }

    getInfo() {
      return {
        id: "HamPrettyBlocks",
        name: Scratch.translate("Pretty Blocks"),
        docsURI: "http://localhost:8000/Hammouda101010/prettyblocks", // https://extensions.turbowarp.org/Hammouda101010/prettyblocks
        blocks: [
          {
            func: "checkFormatting",
            blockType: Scratch.BlockType.BUTTON,
            text: Scratch.translate("Check Project Formatting"),
          },
          "---",
          {
            func: "newFormatRule",
            blockType: Scratch.BlockType.BUTTON,
            text: Scratch.translate("Add Format Rule"),
          },
          {
            func: "delFormatRule",
            blockType: Scratch.BlockType.BUTTON,
            text: Scratch.translate("Delete Format Rule"),
          },
          {
            opcode: "ignoreVariable",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("ignore variable named [VAR_MENU]"),
            arguments: {
              VAR_MENU: {
                type: Scratch.ArgumentType.STRING,
                menu: "PRETTYBLOCKS_VARIABLES",
              },
            },
          },
          {
            opcode: "ignoreCustomBlock",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("ignore custom block named [BLOCK_MENU]"),
            arguments: {
              BLOCK_MENU: {
                type: Scratch.ArgumentType.STRING,
                menu: "PRETTYBLOCKS_CUSTOM_BLOCKS",
              },
            },
          },
          {
            opcode: "formatErrorsReporter",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("format errors"),
          },
          {
            opcode: "fancyFormatErrors",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("fancify format errors [FORMAT_ERROR]"),
            arguments: {
              FORMAT_ERROR: {},
            },
          },
        ],
        menus: {
          PRETTYBLOCKS_CUSTOM_BLOCKS: {
            acceptReporters: true,
            items: "_getCustomBlocksMenu",
          },
          PRETTYBLOCKS_VARIABLES: {
            acceptReporters: true,
            items: "_getVariablesMenu",
          },
        },
      };
    }
    // Class Utilities
    getLogic(str, opts) {
      let codeLine = Cast.toString(str);
      const logicCodeLineArray = codeLine.split(" ");
      let boolResult = false;
      let result = null;

      // Check for each spaces
      for (const line of logicCodeLineArray) {
        // if it's a boolean
        if (/<.*>/.test(line)) {
          // is it a primitive value?
          if (line === "<true>") {
            boolResult = true;
          } else if (line === "<false>") {
            boolResult = false;
            // otherwise, it's an argument
          } else {
            const optsArray = Object.values(opts).map((value) =>
              Cast.toBoolean(value)
            );
            const boolArgs = codeLine.match(/<([^<>]+)>/g);
            for (const boolVal of boolArgs) {
              if (
                Cast.toBoolean(
                  Object.keys(opts).indexOf(boolVal.replace(/[<>]/g, "")) ===
                    boolArgs.indexOf(boolVal)
                )
              ) {
                boolResult = optsArray[boolArgs.indexOf(boolVal)];
              }
            }
          }
        } else {
          if (line === "if") {
            continue;
          } else if (line === "else") {
            if (!boolResult) {
              result = logicCodeLineArray
                .slice(logicCodeLineArray.indexOf(line) + 1)
                .join(" ");
              console.log(`second operator: ${result}`);
              break;
            }
          } else if (boolResult === undefined) {
            continue;
          } else if (boolResult) {
            result = line;
            console.log(`first operator: ${result}`);
            break;
          }
        }
      }

      return result;
    }
    getCustomBlocks() {
      const targets = runtime.targets;
      const customBlocks = [];

      for (const target of targets) {
        const blocks = target.blocks._blocks;
        for (const blockId in blocks) {
          const block = blocks[blockId];
          if (block.opcode === "procedures_prototype") {
            customBlocks.push(this.formatCustomBlock(block));
          }
        }
      }

      return customBlocks.length > 0 ? customBlocks : [];
    }
    getVariables() {
      const stage = runtime.getTargetForStage();
      const targets = runtime.targets;

      // Sort the variables
      const globalVars = Object.values(stage.variables)
        .filter((v) => v.type !== "list")
        .map((v) => v.name);

      const allVars = targets
        .filter((t) => t.isOriginal)
        .map((t) => t.variables);
      const localVars = allVars
        .map((v) => Object.values(v))
        .map((v) =>
          v
            .filter((v) => v.type !== "list" && !globalVars.includes(v.name))
            .map((v) => v.name)
        )
        .flat(1);

      const variables = {
        local: localVars,
        global: globalVars,
      };

      return variables;
    }

    checkFormatRule(rule, val, type, opts = {}) {
      if (rules[rule].enabled) {
        let str = Cast.toString(rules[rule].regex);
        if (str.startsWith("if")) {
          str = this.getLogic(str, opts);
        }

        const regex = new RegExp(str.split("/")[1], str.split("/")[2]);
        console.log(regex);
        console.log(regex.test(val));
        console.log(regex.test(val));

        switch (rule) {
          case "griffpatchStyle":
            if (!regex.test(val)) {
              this.formatErrors.push({
                type: type,
                level: rules[rule].level,
                subject: val,
                msg: Scratch.translate(
                  Cast.toString(rules[rule].msg).replace(
                    /\{([^}]+)\}/g,
                    (e) => {
                      console.log(e);
                      if (e === "{isGlobal}") {
                        return opts.isGlobal ? "UPPERCASE" : "lowercase";
                      } else {
                        return val;
                      }
                    }
                  )
                ),
              });
            }
            break;
          default:
            if (!rules[rule].check(val)) {
              this.formatErrors.push({
                type: type,
                level: rules[rule].level,
                subject: val,
                msg: Scratch.translate(rules[rule].msg),
              });
            }
            break;
        }
      }
    }

    checkCustomFormatRules(val, type) {
      for (const rule in customRules) {
        if (
          (customRules[rule].enabled &&
            customRules[rule].scopes.includes(type)) ||
          customRules[rule].scopes.includes("all")
        ) {
          if (!customRules[rule].check(val)) {
            this.formatErrors.push({
              type: type,
              level: customRules[rule].level,
              subject: val,
              msg: Scratch.translate(customRules[rule].msg(val)),
            });
          }
        }
      }
    }

    _checkSpriteFormatting() {
      const targets = runtime.targets;
      for (const target of targets) {
        if (target.isSprite()) {
          // Format check
          this.checkFormatRule("camelCaseOnly", target.sprite.name, "sprite");
          this.checkCustomFormatRules(target.sprite.name, "sprite");
        }
      }
    }
    formatCustomBlock(block) {
      const mutation = block.mutation;
      const args = JSON.parse(mutation.argumentnames);

      console.log(args);

      let i = 0;
      const name = mutation.proccode.replace(/%[snb]/g, (match) => {
        let value = args[i++];
        if (match === "%s") return isUnSandBoxed ? `[${value}]` : `(${value})`;
        if (match === "%n" && isUnSandBoxed) return `(${value})`;
        if (match === "%b") return `<${value}>`;
        return match;
      });
      return name;
    }

    _checkCustomBlockFormatting() {
      const blocks = !(this.getCustomBlocks().length > 0)
        ? []
        : this.getCustomBlocks();

      for (const block of blocks) {
        this.checkFormatRule("customNoCapitalized", block, "custom_block");
        this.checkFormatRule("camelCaseOnly", block, "custom_block");
        this.checkCustomFormatRules(block, "custom_block");
      }
    }

    _checkVariableFormatting() {
      const variables = this.getVariables();

      // Local variable check
      console.log("checking local variables");
      for (const variable of variables.local) {
        this.checkFormatRule("griffpatchStyle", variable, "variable", {
          isGlobal: false,
        });
        this.checkFormatRule("camelCaseOnly", variable, "variable");
        this.checkCustomFormatRules(variable, "variable");
      }

      // Global variable check
      console.log("checking global variables");
      for (const variable of variables.global) {
        this.checkFormatRule("griffpatchStyle", variable, "variable", {
          isGlobal: true,
        });
        this.checkFormatRule("camelCaseOnly", variable, "custom_block");
        this.checkCustomFormatRules(variable, "variable");
      }
    }

    checkFormatting() {
      if (!isEditor) return;
      this.formatErrors = [];

      this._checkSpriteFormatting();
      this._checkVariableFormatting();
      this._checkCustomBlockFormatting();

      if (this.formatErrors.length !== 0) {
        openModal("error", "Format Error", this.formatErrors);
      } else {
        alert("No format errors found!");
      }

      console.log(formatError(this.formatErrors));
    }
    newFormatRule() {
      if (!isEditor) return; // return if we aren't in the editor
      newRuleModal(
        Scratch.translate("New Rule:"),
        funcTypes,
        false,
        (ruleName, regex, func, scopes) => {
          if (!ruleName || !regex)
            return alert(Scratch.translate("Missing inputs"));
          try {
            new RegExp(regex.split("/")[1], regex.split("/")[2]);
          } catch {
            alert(Scratch.translate("Invalid Regular Expression"));
            return;
          }

          customRules[ruleName] = {
            funcType: func.value,
            enabled: true,
            level: "warn",
            scopes: scopes,
            msg: `"{str}" isn't following the custom rule named {str}`,
            regex: regex,
          };

          console.log(customRules);
        }
      );
    }

    delFormatRule() {
      if (!isEditor) return; // return if we aren't in the editor
      const customRulesList = Object.keys(customRules);
      if (customRulesList.length < 1) return alert("There are no Custom Rules");

      newRuleModal(
        Scratch.translate("Delete Rule:"),
        customRulesList,
        true,
        (name) => {
          console.log(name);
          delete customRules[name];

          console.log(customRules);
        }
      );
    }

    formatErrorsReporter() {
      return JSON.stringify(this.formatErrors);
    }
    fancyFormatErrors(args) {
      try {
        return formatError(JSON.parse(args.FORMAT_ERROR));
      } catch {
        return "";
      }
    }

    // Dynamic Menus
    _getVariablesMenu() {
      const stage = runtime.getTargetForStage();
      const targets = runtime.targets;

      const globalVars = Object.values(stage.variables)
        .filter((v) => v.type !== "list")
        .map((v) => v.name);

      const allVars = targets
        .filter((t) => t.isOriginal)
        .map((t) => t.variables);
      const localVars = allVars
        .map((v) => Object.values(v))
        .map((v) =>
          v
            .filter((v) => v.type !== "list" && !globalVars.includes(v.name))
            .map((v) => v.name)
        )
        .flat(1);

      return localVars.concat(globalVars);
    }

    _getCustomBlocksMenu() {
      const targets = runtime.targets;
      const customBlocks = [];

      for (const target of targets) {
        const blocks = target.blocks._blocks;
        for (const blockId in blocks) {
          const block = blocks[blockId];
          if (block.opcode === "procedures_prototype") {
            customBlocks.push(this.formatCustomBlock(block));
          }
        }
      }

      return customBlocks.length > 0
        ? customBlocks
        : ["no custom blocks found"];
    }
  }

  if (isEditor) {
    vm.on("EXTENSION_ADDED", () => {
      runtime.extensionStorage["HamPrettyBlocks"] = JSON.stringify({
        rules: JSON.stringify(rules),
        customRules: JSON.stringify(customRules),
        ignore: JSON.stringify(ignoreList),
      });
    });
    vm.on("BLOCKSINFO_UPDATE", () => {
      runtime.extensionStorage["HamPrettyBlocks"] = JSON.stringify({
        rules: JSON.stringify(rules),
        customRules: JSON.stringify(customRules),
        ignore: JSON.stringify(ignoreList),
      });
    });
  }

  // @ts-ignore
  Scratch.extensions.register(new HamPrettyBlocks());
})(Scratch);
