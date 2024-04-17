// Name: Question Popup menu
// ID: QAPopup
// Description: Sends popups asking questions
// By: HatKid

(function (Scratch) {
  "use strict";

  class QAPopup {
    getInfo() {
      return {
        id: "QAPopup",
        name: "QAPopup",
        color1: "#2A3439",
        color3: "#708090",
        blocks: [
          {
            opcode: "twoAnswersReporter",
            blockType: Scratch.BlockType.REPORTER,
            text: "Send popup with question [A] and answers [B] and [C]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
              },
              B: {
                type: Scratch.ArgumentType.STRING,
              },
              C: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "threeAnswersReporter",
            blockType: Scratch.BlockType.REPORTER,
            text:
              "Send popup with question [A] and answers [B], [C] and [D]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
              },
              B: {
                type: Scratch.ArgumentType.STRING,
              },
              C: {
                type: Scratch.ArgumentType.STRING,
              },
              D: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "fourAnswersReporter",
            blockType: Scratch.BlockType.REPORTER,
            text:
              "Send popup with question [A] and answers [B], [C], [D] and [E]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
              },
              B: {
                type: Scratch.ArgumentType.STRING,
              },
              C: {
                type: Scratch.ArgumentType.STRING,
              },
              D: {
                type: Scratch.ArgumentType.STRING,
              },
              E: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
        ],
      };
    }

    twoAnswersReporter(args, util) {
      // Create a new Promise that will resolve with the user's selection
      return new Promise((resolve) => {
        // Combine all of the choices into a single array
        const choices = [args.B, args.C];

        // Show the multiple choice dialog
        showMultipleChoiceDialog(args.A, choices).then((selection) => {
          // Resolve the Promise with the user's selection
          resolve(selection);
        });
      });
    }

    threeAnswersReporter(args, util) {
      // Create a new Promise that will resolve with the user's selection
      return new Promise((resolve) => {
        // Combine all of the choices into a single array
        const choices = [args.B, args.C, args.D];

        // Show the multiple choice dialog
        showMultipleChoiceDialog(args.A, choices).then((selection) => {
          // Resolve the Promise with the user's selection
          resolve(selection);
        });
      });
    }

    fourAnswersReporter(args, util) {
      // Create a new Promise that will resolve with the user's selection
      return new Promise((resolve) => {
        // Combine all of the choices into a single array
        const choices = [args.B, args.C, args.D, args.E];

        // Show the multiple choice dialog
        showMultipleChoiceDialog(args.A, choices).then((selection) => {
          // Resolve the Promise with the user's selection
          resolve(selection);
        });
      });
    }
  }

  function showMultipleChoiceDialog(question, choices) {
    // Create a new Promise that will resolve with the user's selection
    return new Promise((resolve) => {
      // Create the modal container
      const modalContainer = document.createElement("div");
      modalContainer.style.position = "fixed";
      modalContainer.style.top = "0";
      modalContainer.style.left = "0";
      modalContainer.style.width = "100%";
      modalContainer.style.height = "100%";
      modalContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      modalContainer.style.zIndex = "9999";

      // Create the modal content
      const modalContent = document.createElement("div");
      modalContent.style.position = "absolute";
      modalContent.style.top = "50%";
      modalContent.style.left = "50%";
      modalContent.style.transform = "translate(-50%, -50%)";
      modalContent.style.backgroundColor = "#2A3439";
      modalContent.style.padding = "20px";
      modalContent.style.borderRadius = "10px";
      modalContent.style.textAlign = "center";

      // Create the question element
      const questionElement = document.createElement("p");
      questionElement.textContent = question;
      questionElement.style.marginBottom = "20px";
      questionElement.style.fontSize = "24px"; // Larger font size for the question text
      questionElement.style.fontWeight = "bold";
      modalContent.appendChild(questionElement);

      // Create the choices elements
      for (const choice of choices) {
        const choiceElement = document.createElement("button");
        choiceElement.textContent = choice;
        choiceElement.style.display = "block";
        choiceElement.style.marginBottom = "10px";
        choiceElement.style.marginLeft = "auto"; // Center the button horizontally
        choiceElement.style.marginRight = "auto"; // Center the button horizontally
        choiceElement.addEventListener("click", () => {
          // Resolve the Promise with the selected choice
          resolve(choice);

          // Remove the modal from the document
          document.body.removeChild(modalContainer);
        });
        modalContent.appendChild(choiceElement);
      }

      // Append the modal content to the modal container
      modalContainer.appendChild(modalContent);

      // Append the modal container to the document body
      document.body.appendChild(modalContainer);
    });
  }

  Scratch.extensions.register(new QAPopup());
})(Scratch);
```

**Output:**
<!-- prettier-ignore -->
```jsx
// Name: Question Popup menu
// ID: QAPopup
// Description: Sends popups asking questions
// By: HatKid

(function (Scratch) {
  "use strict";

  class QAPopup {
    getInfo() {
      return {
        id: "QAPopup",
        name: "QAPopup",
        color1: "#2A3439",
        color3: "#708090",
        blocks: [
          {
            opcode: "twoAnswersReporter",
            blockType: Scratch.BlockType.REPORTER,
            text: "Send popup with question [A] and answers [B] and [C]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
              },
              B: {
                type: Scratch.ArgumentType.STRING,
              },
              C: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "threeAnswersReporter",
            blockType: Scratch.BlockType.REPORTER,
            text: "Send popup with question [A] and answers [B], [C] and [D]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
              },
              B: {
                type: Scratch.ArgumentType.STRING,
              },
              C: {
                type: Scratch.ArgumentType.STRING,
              },
              D: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "fourAnswersReporter",
            blockType: Scratch.BlockType.REPORTER,
            text: "Send popup with question [A] and answers [B], [C], [D] and [E]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
              },
              B: {
                type: Scratch.ArgumentType.STRING,
              },
              C: {
                type: Scratch.ArgumentType.STRING,
              },
              D: {
                type: Scratch.ArgumentType.STRING,
              },
              E: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
        ],
      };
    }

    twoAnswersReporter(args, util) {
      // Create a new Promise that will resolve with the user's selection
      return new Promise((resolve) => {
        // Combine all of the choices into a single array
        const choices = [args.B, args.C];

        // Show the multiple choice dialog
        showMultipleChoiceDialog(args.A, choices).then((selection) => {
          // Resolve the Promise with the user's selection
          resolve(selection);
        });
      });
    }

    threeAnswersReporter(args, util) {
      // Create a new Promise that will resolve with the user's selection
      return new Promise((resolve) => {
        // Combine all of the choices into a single array
        const choices = [args.B, args.C, args.D];

        // Show the multiple choice dialog
        showMultipleChoiceDialog(args.A, choices).then((selection) => {
          // Resolve the Promise with the user's selection
          resolve(selection);
        });
      });
    }

    fourAnswersReporter(args, util) {
      // Create a new Promise that will resolve with the user's selection
      return new Promise((resolve) => {
        // Combine all of the choices into a single array
        const choices = [args.B, args.C, args.D, args.E];

        // Show the multiple choice dialog
        showMultipleChoiceDialog(args.A, choices).then((selection) => {
          // Resolve the Promise with the user's selection
          resolve(selection);
        });
      });
    }
  }

  function showMultipleChoiceDialog(question, choices) {
    // Create a new Promise that will resolve with the user's selection
    return new Promise((resolve) => {
      // Create the modal container
      const modalContainer = document.createElement("div");
      modalContainer.style.position = "fixed";
      modalContainer.style.top = "0";
      modalContainer.style.left = "0";
      modalContainer.style.width = "100%";
      modalContainer.style.height = "100%";
      modalContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      modalContainer.style.zIndex = "9999";

      // Create the modal content
      const modalContent = document.createElement("div");
      modalContent.style.position = "absolute";
      modalContent.style.top = "50%";
      modalContent.style.left = "50%";
      modalContent.style.transform = "translate(-50%, -50%)";
      modalContent.style.backgroundColor = "#2A3439";
      modalContent.style.padding = "20px";
      modalContent.style.borderRadius = "10px";
      modalContent.style.textAlign = "center";

      // Create the question element
      const questionElement = document.createElement("p");
      questionElement.textContent = question;
      questionElement.style.marginBottom = "20px";
      questionElement.style.fontSize = "24px"; // Larger font size for the question text
      questionElement.style.fontWeight = "bold";
      modalContent.appendChild(questionElement);

      // Create the choices elements
      for (const choice of choices) {
        const choiceElement = document.createElement("button");
        choiceElement.textContent = choice;
        choiceElement.style.display = "block";
        choiceElement.style.marginBottom = "10px";
        choiceElement.style.marginLeft = "auto"; // Center the button horizontally
        choiceElement.style.marginRight = "auto"; // Center the button horizontally
        choiceElement.addEventListener("click", () => {
          // Resolve the Promise with the selected choice
          resolve(choice);

          // Remove the modal from the document
          document.body.removeChild(modalContainer);
        });
        modalContent.appendChild(choiceElement);
      }

      // Append the modal content to the modal container
      modalContainer.appendChild(modalContent);

      // Append the modal container to the document body
      document.body.appendChild(modalContainer);
    });
  }

  Scratch.extensions.register(new QAPopup());
})(Scratch);
