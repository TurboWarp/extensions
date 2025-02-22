// Name: SweetAlert2
// ID: sweetalert2
// Description: A better pop-up plugin
// By: Jeandongjun
// License: MIT
(function () {
  var script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
  document.head.appendChild(script);

  script.onload = function () {
    class SweetAlert2Extension {
      constructor(runtime) {
        this.runtime = runtime;
      }

      getInfo() {
        return {
          id: "sweetalert2",
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
        const buttons = [
          {
            text: args.BUTTON1TEXT,
            value: args.BUTTON1TEXT,
            visible: true,
            className: "swal-button--custom",
            style: args.BUTTON1COLOR
              ? `background-color: ${args.BUTTON1COLOR};`
              : "",
          },
        ];

        if (args.BUTTON2TEXT) {
          buttons.push({
            text: args.BUTTON2TEXT,
            value: args.BUTTON2TEXT,
            visible: true,
            className: "swal-button--custom",
            style: args.BUTTON2COLOR
              ? `background-color: ${args.BUTTON2COLOR};`
              : "",
          });
        }

        Swal.fire({
          icon: swalIcons[args.ICON],
          title: args.TITLE,
          text: args.SUBTITLE,
          confirmButtonText: args.BUTTON1TEXT,
          confirmButtonColor: args.BUTTON1COLOR,
          showCancelButton: args.BUTTON2TEXT !== "",
          cancelButtonText: args.BUTTON2TEXT,
          cancelButtonColor: args.BUTTON2COLOR,
          buttons: buttons,
        });
      }
    }

    Scratch.extensions.register(new SweetAlert2Extension());
  };
})();
