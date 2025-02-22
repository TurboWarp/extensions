// Name: SweetAlert2
// ID: sweet2
// Description: A better pop-up plugin
// By: Jeandongjun
// License: MIT
(function () {
  var script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
  script.onload = function () {
    class SweetAlert2Extension {
      constructor(runtime) {
        this.runtime = runtime;
      }

      getInfo() {
        return {
          id: "sweet2",
          name: "SweetAlert2",
          blocks: [
            {
              opcode: "showAlert",
              blockType: Scratch.BlockType.COMMAND,
              text: "显示 [ICON] 提示框 标题 [TITLE] 内容 [SUBTITLE] 按钮一 [BUTTON1TEXT] 颜色 [BUTTON1COLOR] 按钮二 [BUTTON2TEXT] 颜色 [BUTTON2COLOR]",
              arguments: {
                ICON: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "iconMenu",
                  defaultValue: "info",
                },
                TITLE: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "标题",
                },
                SUBTITLE: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "内容",
                },
                BUTTON1TEXT: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "确定",
                },
                BUTTON1COLOR: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "", // No default color
                },
                BUTTON2TEXT: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "",
                },
                BUTTON2COLOR: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "", // No default color
                },
              },
            },
          ],
          menus: {
            iconMenu: {
              acceptReporters: false,
              items: ["warning", "error", "success", "info", "question"],
            },
          },
        };
      }

      showAlert(args) {
        const swalIcons = {
          warning: "warning",
          error: "error",
          success: "success",
          info: "info",
          question: "question",
        };

        // Check if Swal is defined before calling Swal.fire
        if (typeof Swal !== "undefined") {
          Swal.fire({
            icon: swalIcons[args.ICON],
            title: args.TITLE,
            text: args.SUBTITLE,
            confirmButtonText: args.BUTTON1TEXT,
            confirmButtonColor: args.BUTTON1COLOR,
            showCancelButton: args.BUTTON2TEXT !== "",
            cancelButtonText: args.BUTTON2TEXT,
            cancelButtonColor: args.BUTTON2COLOR,
          });
        } else {
          console.error(
            "SweetAlert2 is not defined. Did you forget to include the library?"
          );
        }
      }
    }

    Scratch.extensions.register(new SweetAlert2Extension());
  };
  document.head.appendChild(script);
})();
