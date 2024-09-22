// Name: Sweet Alert
// ID: sweetalert
// Description: It allows you to send modern alerts using the Sweet Alert library. 'https://cdn.jsdelivr.net/npm/sweetalert2@11'
// By: XmerOriginals <https://scratch.mit.edu/users/XmerOriginals/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  class SweetAlert {
    getInfo() {
      return {
        id: 'sweetalert',
        name: 'Sweet Alert',
        color1: '#425436',
        blocks: [
          {
            opcode: 'showAlert',
            blockType: Scratch.BlockType.COMMAND,
            text: 'show sweet alert with title [TITLE] and text [TEXT] of type [TYPE] button text [BTEXT]',
            arguments: {
              TITLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Title',
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'This is a modern alert!',
              },
			  BTEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'OK',
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'alertTypes',
                defaultValue: 'success',
              },
            },
          },
          {
            opcode: 'showInputAlert',
            blockType: Scratch.BlockType.REPORTER,
            text: 'ask [QUESTION] with default [DEFAULT_TEXT] of type [TYPE] empty text warn [EMTEXT]',
            arguments: {
              QUESTION: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'What is your name?',
              },
              DEFAULT_TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Enter your name here...',
              },
			  EMTEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'You need to enter something!',
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'alertTypes',
                defaultValue: 'question',
              },
            },
          },
        ],
        menus: {
          alertTypes: {
            acceptReporters: true,
            items: ['success', 'error', 'warning', 'info', 'question'],
          },
        },
      };
    }

    showAlert(args) {
      const title = args.TITLE;
      const text = args.TEXT;
	  const btext = args.BTEXT;
      const type = args.TYPE;

      Swal.fire({
        title: title,
        text: text,
        icon: type,
        confirmButtonText: btext,
      });
    }

    showInputAlert(args) {
      const question = args.QUESTION;
      const defaultText = args.DEFAULT_TEXT;
	  const emtext = args.EMTEXT;
      const type = args.TYPE;

      return new Promise((resolve) => {
        Swal.fire({
          title: question,
          input: 'text',
          inputPlaceholder: defaultText,
          icon: type,
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return emtext;
            }
          },
        }).then((result) => {
          if (result.isConfirmed && result.value) {
            resolve(result.value);
          } else {
            resolve(null);
          }
        });
      });
    }
  }

  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
  script.onload = () => {
    Scratch.extensions.register(new SweetAlert());
  };
  document.head.appendChild(script);

})(Scratch);
