// Name: When Saved
// ID: whensaved
// Description: Detect when the project is being saved.

(function (Scratch) {
  "use strict";

  const vm = Scratch.vm;

  const MAX_BEFORE_SAVE_MS = 3000;

  const beforeSave = () =>
    new Promise((resolve) => {
      const threads = vm.runtime.startHats("whensaved_beforeSave");

      if (threads.length === 0) {
        resolve();
        return;
      }

      const startTime = performance.now();
      const checkThreadStatus = () => {
        if (
          performance.now() - startTime > MAX_BEFORE_SAVE_MS ||
          threads.every((thread) => !vm.runtime.threads.includes(thread))
        ) {
          vm.runtime.off("AFTER_EXECUTE", checkThreadStatus);
          resolve();
        }
      };

      vm.runtime.on("AFTER_EXECUTE", checkThreadStatus);
    });

  const afterSave = () => {
    vm.runtime.startHats("whensaved_afterSave");
  };

  const originalSaveProjectSb3 = vm.saveProjectSb3;
  vm.saveProjectSb3 = async function (...args) {
    await beforeSave();
    const result = await originalSaveProjectSb3.apply(this, args);
    afterSave();
    return result;
  };

  const originalSaveProjectSb3Stream = vm.saveProjectSb3Stream;
  vm.saveProjectSb3Stream = function (...args) {
    // This is complicated because we need to return a stream object syncronously...

    let realStream = null;
    const queuedCalls = [];

    const whenStreamReady = (methodName, args) => {
      if (realStream) {
        return realStream[methodName].apply(realStream, args);
      } else {
        return new Promise((resolve) => {
          queuedCalls.push({
            resolve,
            methodName,
            args,
          });
        });
      }
    };

    const streamWrapper = {
      on: (...args) => void whenStreamReady("on", args),
      pause: (...args) => void whenStreamReady("pause", args),
      resume: (...args) => void whenStreamReady("resume", args),
      accumulate: (...args) => whenStreamReady("accumulate", args),
    };

    beforeSave().then(() => {
      realStream = originalSaveProjectSb3Stream.apply(this, args);

      realStream.on("end", () => {
        // Not sure how JSZip handles errors here, so we'll make sure not to break anything if
        // afterSave somehow throws
        try {
          afterSave();
        } catch (e) {
          console.error(e);
        }
      });

      for (const queued of queuedCalls) {
        queued.resolve(
          realStream[queued.methodName].apply(realStream, queued.args)
        );
      }
      queuedCalls.length = 0;
    });

    return streamWrapper;
  };

  class WhenSaved {
    getInfo() {
      return {
        id: "whensaved",
        name: "When Saved",
        blocks: [
          {
            blockType: Scratch.BlockType.EVENT,
            opcode: "beforeSave",
            text: "before project saves",
            shouldRestartExistingThreads: true,
            isEdgeActivated: false,
          },
          {
            blockType: Scratch.BlockType.EVENT,
            opcode: "afterSave",
            text: "after project saves",
            shouldRestartExistingThreads: true,
            isEdgeActivated: false,
          },
        ],
      };
    }
  }

  Scratch.extensions.register(new WhenSaved());
})(Scratch);
