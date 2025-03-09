// Name: Pretty Blocks
// ID: HamPrettyBlocks
// Description: Add formating to your projects for more readability. Based of Prettier.
// By: hammouda101010 <https://scratch.mit.edu/users/hammouda101010/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Pretty Blocks must run unsandboxed");
  }

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const Cast = Scratch.Cast;
  const workspace = ScratchBlocks.getMainWorkspace();
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
    ScratchBlocks.prompt(
      "test",
      "",
      () => {},
      Cast.toString(titleName),
      "broadcast_msg"
    );

    // get the portal/modal and its header
    const portal = document.querySelector("div.ReactModalPortal");
    // get the portal/modal body
    const portalBody = portal.querySelector('div[class^="prompt_body_"]');
    const portalHolder = portalBody.parentElement.parentElement;

    // set a custom modal height
    portalHolder.style.width = "650px";

    const errorString = formatError(error, true);

    // Create the custom modal elements
    const labelA = document.createElement("p");
    labelA.textContent = Scratch.translate(
      "The extension has found errors in your project:"
    );

    // The error text area
    const errorTextArea = document.createElement("textarea");

    errorTextArea.setAttribute("class", "data-url_code_1o8oS");
    errorTextArea.setAttribute("readonly", "true");
    errorTextArea.setAttribute("spellcheck", "false");
    errorTextArea.setAttribute("autocomplete", "false");

    errorTextArea.style.display = "inline-block";
    errorTextArea.style.width = "100%";
    errorTextArea.style.height = "12rem";
    errorTextArea.value = errorString;

    const labelB = document.createElement("p");
    labelB.textContent = Scratch.translate(
      'Make sure to fix them manualy or with the "Format Project" button.'
    );

    // Wrap them inside a div
    const div = document.createElement("div");
    div.setAttribute(
      "style",
      "display:inline-block;width:-webkit-fill-available;height:calc(100% - 2.75rem);"
    );
    div.setAttribute("class", "error_list_1o85");
    div.append(labelA, errorTextArea, labelB);

    const input = document.querySelector(`div[class="ReactModalPortal"] input`);
    input.parentNode.append(div);
    input.parentNode.previousSibling.remove();
    input.remove();

    errorTextArea.value = errorTextArea.value.trim();

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
      Scratch.translate("Format Rules Manager"),
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
      regexLabel.textContent = Scratch.translate("Regular Expression:");

      const regexInput = document.createElement("input");
      regexInput.setAttribute("class", input.getAttribute("class"));
      regexInput.addEventListener("input", (e) => {
        // @ts-ignore
        regex = e.target.value;
      });

      // Format Function (The funtction to use when formatting the project.)
      const funcTypeLabel = input.parentNode.previousSibling.cloneNode(true);
      funcTypeLabel.textContent = Scratch.translate("Format Function:");
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

  const squareInputBlocks = ["HamPrettyBlocks_fancyFormatErrors"];

  // Custom Square Block Shapes
  const ogConverter = runtime._convertBlockForScratchBlocks.bind(runtime);
  runtime._convertBlockForScratchBlocks = function (blockInfo, categoryInfo) {
    const res = ogConverter(blockInfo, categoryInfo);
    if (blockInfo.outputShape) res.json.outputShape = blockInfo.outputShape;
    return res;
  };

  if (Scratch.gui)
    Scratch.gui.getBlockly().then((SB) => {
      // Custom Square Input Shape
      const makeShape = (width, height) => {
        width -= 10;
        // prettier-ignore
        height -= 8
        return `
        m 0 4 
        A 4 4 0 0 1 4 0 H ${width} 
        a 4 4 0 0 1 4 4 
        v ${height} 
        a 4 4 0 0 1 -4 4 
        H 4 
        a 4 4 0 0 1 -4 -4 
        z`
          .replaceAll("\n", "")
          .trim();
      };

      const ogRender = SB.BlockSvg.prototype.render;
      SB.BlockSvg.prototype.render = function (...args) {
        const data = ogRender.call(this, ...args);
        if (this.svgPath_ && squareInputBlocks.includes(this.type)) {
          this.inputList.forEach((input) => {
            if (input.name.startsWith("ARRAY")) {
              const block = input.connection.targetBlock();
              if (
                block &&
                block.type === "text" &&
                block.svgPath_ &&
                block.type.startsWith("HamPrettyBlocks_menu_")
              ) {
                block.svgPath_.setAttribute(
                  "transform",
                  `scale(1, ${block.height / 33})`
                );
                block.svgPath_.setAttribute(
                  "d",
                  makeShape(block.width, block.height)
                );
              } else if (input.outlinePath) {
                input.outlinePath.setAttribute("d", makeShape(46, 32));
              }
            }
          });
        }
        return data;
      };
    });

  let ignoreList = new Set();

  // Function Types for Custom Rules.
  const funcTypes = [
    { text: Scratch.translate("to uppercase"), value: "uppercase" },
    { text: Scratch.translate("to lowercase"), value: "lowercase" },
    { text: Scratch.translate("regex validation"), value: "regex_validation" },
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
    // @ts-ignore
    const storage = runtime.extensionStorage["HamPrettyBlocks"];

    if (storage) {
      // ignoreList = new Set(JSON.parse(storage.ignoreList))
      rules = JSON.parse(storage.rules);
      customRules = JSON.parse(storage.customRules);
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
        color1: "#0071b0",
        color2: "#006095",
        blocks: [
          {
            func: "checkFormatting",
            blockType: Scratch.BlockType.BUTTON,
            text: Scratch.translate("Check Project Formatting"),
          },
          {
            func: "formatProject",
            blockType: Scratch.BlockType.BUTTON,
            text: Scratch.translate("Format Project"),
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
            opcode: "ignoreList",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("ignore list"),
            color1: "#848484",
          },
          {
            opcode: "ignoreVariable",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("ignore variable named [VAR_MENU]"),
            color1: "#848484",
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
            color1: "#848484",
            arguments: {
              BLOCK_MENU: {
                type: Scratch.ArgumentType.STRING,
                menu: "PRETTYBLOCKS_CUSTOM_BLOCKS",
              },
            },
          },
          "---",
          {
            opcode: "resetIgnoreList",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("reset ignore list"),
            color1: "#848484",
          },
          "---",
          {
            opcode: "checkFormatttingBlock",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("check project formatting"),
          },
          "---",
          {
            opcode: "formatErrorsReporter",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("format errors"), // format errors
            disableMonitor: true,
            outputShape: 3,
          },
          {
            opcode: "fancyFormatErrors",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "fancify format errors [ARRAY_FORMAT_ERROR]"
            ),
            arguments: {
              ARRAY_FORMAT_ERROR: {},
            },
          },
        ],
        menus: {
          PRETTYBLOCKS_CUSTOM_BLOCKS: {
            acceptReporters: false,
            items: "_getCustomBlocksMenu",
          },
          PRETTYBLOCKS_VARIABLES: {
            acceptReporters: false,
            items: "_getVariablesMenu",
          },
        },
      };
    }
    // Class Utilities
    refreshBlocks() {
      vm.refreshWorkspace();
      vm.extensionManager.refreshBlocks();
      runtime.extensionStorage["HamPrettyBlocks"] = {
        rules: JSON.stringify(rules),
        customRules: JSON.stringify(customRules),
        ignore: ignoreList ? JSON.stringify([...ignoreList]) : "[]",
      };
    }
    getLogic(str, opts) {
      let codeLine = Cast.toString(str);
      const logicCodeLineArray = codeLine.split(" ");
      let boolResult = false;
      let result = null;

      // Check for each spaces
      for (const line of logicCodeLineArray) {
        // Check if it's a boolean
        if (/<([^>]+)>/g.test(line)) {
          // Is it a primitive boolean value?
          if (line === "<true>") {
            boolResult = true;
          } else if (line === "<false>") {
            boolResult = false;
            // Otherwise, it's an argument/option
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
          // Tenary operator logic
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
            customBlocks.push({
              text: this.formatCustomBlock(block),
              value: block.id,
            });
          }
        }
      }

      return customBlocks.length > 0 ? customBlocks : [];
    }
    getVariables() {
      const stage = runtime.getTargetForStage();
      const targets = runtime.targets;

      const globalVars = Object.values(stage.variables)
        .filter((v) => v.type !== "list")
        .map((v) => ({ text: v.name, value: v.id }));

      const allVars = targets
        .filter((t) => t.isOriginal)
        .map((t) => t.variables);
      const localVars = allVars
        .map((v) => Object.values(v))
        .map((v) =>
          // prettier-ignore
          v.filter(
              (v) =>
                v.type !== "list" && !globalVars.map((obj) => obj.text).includes(v.name)
            ).map((v) => ({ text: v.name, value: v.id }))
        )
        .flat(1);

      const variables = {
        local: localVars,
        global: globalVars,
      };

      return variables;
    }

    checkFormatRule(rule, val, type, opts = {}) {
      if (ignoreList.has(val.value)) return;
      if (rules[rule].enabled) {
        let str = Cast.toString(rules[rule].regex);
        if (str.startsWith("if")) {
          str = this.getLogic(str, opts);
        }

        const regex = new RegExp(str.split("/")[1], str.split("/")[2]);

        switch (rule) {
          case "griffpatchStyle":
            if (!regex.test(val.text)) {
              this.formatErrors.push({
                type: type,
                level: rules[rule].level,
                subject: val.text,
                msg: Scratch.translate(
                  Cast.toString(rules[rule].msg).replace(
                    /\{([^}]+)\}/g,
                    (e) => {
                      console.log(e);
                      if (e === "{isGlobal}") {
                        return opts.isGlobal ? "UPPERCASE" : "lowercase";
                      } else {
                        return val.text;
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
                subject: val.text,
                msg: Scratch.translate(
                  Cast.toString(rules[rule].msg).replace(/\{([^}]+)\}/g, val)
                ),
              });
            }
            break;
        }
      }
    }

    /**
     * Formats a variable using a rule.
     * @param {string} rule The rule used to format the variable name.
     * @param { {name: string, id: string}} targetVariable The target variable to format the name of.
     * @param {object} opts Optional options.
     */
    _formatVariable(rule, targetVariable, opts) {
      const targets = runtime.targets;
      const stage = runtime.getTargetForStage();
      if (opts.isGlobal) {
        for (const variable of Object.values(stage.variables)) {
          if (variable.id === targetVariable.id)
            workspace.renameVariableById(
              variable.id,
              this.formatRule(rule, variable.name, opts)
            );
        }
      } else {
        for (const target of targets) {
          if (target.isSprite()) {
            const variable = target.lookupOrCreateVariable(
              targetVariable.id,
              targetVariable.name
            );
            if (variable.id in stage.variables) return;
            // @ts-ignore
            if (variable.type !== "list")
              workspace.renameVariableById(
                variable.id,
                this.formatRule(
                  rule,
                  targetVariable.name,
                  targetVariable.id,
                  opts
                )
              );
          }
        }
      }
    }

    _formatVariables() {
      const variables = this.getVariables();
      for (const variable of variables.local) {
        const variableData = { name: variable.text, id: variable.value };
        this._formatVariable("griffpatchStyle", variableData, {
          isGlobal: false,
        });
      }
      for (const variable of variables.global) {
        const variableData = { name: variable.text, id: variable.value };
        this._formatVariable("griffpatchStyle", variableData, {
          isGlobal: true,
        });
      }
    }

    formatRule(rule, val, valID, opts = {}) {
      if (ignoreList.has(valID)) return;
      if (rules[rule].enabled) {
        switch (rule) {
          case "griffpatchStyle":
            const { isGlobal } = opts;
            return isGlobal ? val.toUpperCase() : val.toLowerCase();
          case "camelCaseOnly":
            // prettier-ignore
            return val.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
          case "customNoCapitalized":
            // prettier-ignore
            return val.charAt(0).toLowerCase() + val.slice(1);
        }
      } else {
        return val;
      }
    }

    checkCustomFormatRules(val, type) {
      if (ignoreList.has(val.value)) return;
      for (const rule in customRules) {
        if (
          (customRules[rule].enabled &&
            customRules[rule].scopes.includes(type)) ||
          customRules[rule].scopes.includes("all")
        ) {
          let str = Cast.toString(rules[rule].regex);

          const regex = new RegExp(str.split("/")[1], str.split("/")[2]);
          if (!regex.test(val.text)) {
            this.formatErrors.push({
              type: type,
              level: customRules[rule].level,
              subject: val.text,
              msg: Scratch.translate(
                Cast.toString(rules[rule].msg).replace(/\{([^}]+)\}/g, val)
              ),
            });
          }
        }
      }
    }

    _checkSpriteFormatting() {
      const targets = runtime.targets
        .filter((t) => t.isSprite())
        .map((t) => ({ text: t.sprite.name, value: t.id }));
      console.log("checking sprites");
      for (const target of targets) {
        // Format check
        this.checkFormatRule("camelCaseOnly", target, "sprite");
        this.checkCustomFormatRules(target, "sprite");
      }
    }
    formatCustomBlock(block) {
      const mutation = block.mutation;
      const args = JSON.parse(mutation.argumentnames);

      let i = 0;
      const name = mutation.proccode.replace(/%[snb]/g, (match) => {
        let value = args[i++];
        if (match === "%s") return `[${value}]`;
        if (match === "%n") return `(${value})`;
        if (match === "%b") return `<${value}>`;
        return match;
      });
      return name;
    }

    _checkCustomBlockFormatting() {
      const blocks = !(this.getCustomBlocks().length > 0)
        ? []
        : this.getCustomBlocks();

      console.log("checking custom blocks");
      for (const block in blocks) {
        if (!ignoreList.has(blocks[block].value)) {
          // prettier-ignore
          this.checkFormatRule("customNoCapitalized", blocks[block].text, "custom_block");
          // prettier-ignore
          this.checkFormatRule("camelCaseOnly", blocks[block].text, "custom_block");
          this.checkCustomFormatRules(blocks[block].text, "custom_block");
        }
      }
    }

    _checkVariableFormatting() {
      const variables = this.getVariables();

      // Local variable format check
      console.log("checking local variables");
      for (const variable of variables.local) {
        this.checkFormatRule("griffpatchStyle", variable, "variable", {
          isGlobal: false,
        });
        this.checkFormatRule("camelCaseOnly", variable, "variable");
        this.checkCustomFormatRules(variable, "variable");
      }

      // Global variable format check
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
        console.log(formatError(this.formatErrors));
        openModal("error", "Format Error", this.formatErrors);
      } else {
        alert("No format errors found!");
      }
    }

    formatProject() {
      if (!isEditor) return;
      // prettier-ignore
      if (confirm("!~~~WARNING~~~! \n\n This will format the entire project according to the enabled rules. \n\n This process is irreversible and might break the entire project. \n Do you want to proceed?")){
        console.log("formatting project...")
        this._formatVariables()
        console.info("formatting completed")
      }
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

          this.refreshBlocks();
          console.log(customRules);
        }
      );
    }

    delFormatRule() {
      if (!isEditor) return; // return if we aren't in the editor
      const customRulesList = Object.keys(customRules);
      if (customRulesList.length < 1)
        return alert("There Are No Custom Rules Left.");

      newRuleModal(
        Scratch.translate("Delete Rule:"),
        customRulesList,
        true,
        (name) => {
          console.log(name);
          delete customRules[name];
          this.refreshBlocks();

          console.log(customRules);
        }
      );
    }
    ignoreList() {
      return JSON.stringify([...ignoreList]);
    }

    ignoreVariable(args) {
      if (Cast.toBoolean(args.VAR_MENU)) {
        ignoreList.add(args.VAR_MENU);
        this.refreshBlocks();
      }
      console.log(ignoreList);
    }
    ignoreCustomBlock(args) {
      if (Cast.toBoolean(args.BLOCK_MENU)) {
        ignoreList.add(args.BLOCK_MENU);
        this.refreshBlocks();
      }
      console.log(ignoreList);
    }

    resetIgnoreList() {
      ignoreList = new Set();
      this.refreshBlocks;
    }

    checkFormatttingBlock() {
      if (!isEditor) return;
      this.formatErrors = [];

      this._checkSpriteFormatting();
      this._checkVariableFormatting();
      this._checkCustomBlockFormatting();
    }

    formatErrorsReporter() {
      return JSON.stringify(this.formatErrors);
    }
    fancyFormatErrors(args) {
      try {
        return formatError(JSON.parse(args.ARRAY_FORMAT_ERROR));
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
        .map((v) => ({ text: v.name, value: v.id }));

      const allVars = targets
        .filter((t) => t.isOriginal)
        .map((t) => ({ spriteName: t.sprite.name, variables: t.variables }));

      const localVars = allVars
        .map((t) => ({
          spriteName: t.spriteName,
          vars: Object.values(t.variables),
        }))
        .map((v) =>
          v.vars
            .filter(
              (variable) =>
                variable.type !== "list" &&
                !globalVars.map((obj) => obj.text).includes(variable.name)
            )
            .map((variable) => ({
              text: `${v.spriteName}: ${variable.name}`,
              value: variable.id,
            }))
        )
        .flat(1);

      return localVars.concat(globalVars)
        ? localVars.concat(globalVars)
        : [{ text: Scratch.translate("no variables found"), value: false }];
    }

    _getCustomBlocksMenu() {
      const targets = runtime.targets;
      const customBlocks = [];

      for (const target of targets) {
        const blocks = target.blocks._blocks;
        for (const blockId in blocks) {
          const block = blocks[blockId];
          if (block.opcode === "procedures_prototype") {
            customBlocks.push({
              text: `${target.sprite.name}: ${this.formatCustomBlock(block)}`,
              value: block.id,
            });
          }
        }
      }

      return customBlocks.length > 0
        ? customBlocks
        : [{ text: Scratch.translate("no custom blocks found"), value: false }];
    }
  }

  // @ts-ignore
  Scratch.extensions.register(new HamPrettyBlocks());
})(Scratch);
