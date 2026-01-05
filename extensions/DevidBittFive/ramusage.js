// Name: RAM Monitor
// ID: bitterRamUsage
// Description: Monitors current RAM usage and percentage.
// By: DevidBittFive <https://scratch.mit.edu/users/Bitter_160/>
// License: EPL-2.0

/**!
 * @license EPL-2.0
 * All code contained in this extension is licensed exclusively under the Eclipse Public License v2.0.
 *
 * If you have not received a copy of this license, you may access it
 * at the following link: https://www.eclipse.org/legal/epl-2.0/
 */

(function (Scratch) {
  "use strict";

  // Cache once outside the class
  const mem =
    globalThis.performance && globalThis.performance.memory
      ? globalThis.performance.memory
      : null;

  class RamUsageExtension {
    getInfo() {
      return {
        id: "bitterRamUsage",
        name: Scratch.translate("RAM Monitor"),
        blocks: [
          {
            blockType: Scratch.BlockType.XML,
            xml: mem
              ? ""
              : `
                                      <sep gap="-12" />
                                      <label text="${Scratch.translate("Your browser does not")}" /><sep gap="-12" />
                                      <label text="${Scratch.translate("support the &quot;performance.memory&quot;")}" /><sep gap="-12" />
                                      <label text="${Scratch.translate("API")}" />
                                  `,
          },
          {
            opcode: "getRamUsageMB",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get RAM usage in MB"),
          },
          {
            opcode: "getRamUsagePercent",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get RAM usage percent"),
          },
        ],
      };
    }

    getRamUsageMB() {
      // Check the cached mem variable directly
      if (!mem) return NaN;

      return mem.usedJSHeapSize / 1024 / 1024;
    }

    getRamUsagePercent() {
      // Simplified check
      if (!mem) return NaN;

      // Calculate percentage as a raw number
      return (mem.usedJSHeapSize / mem.jsHeapSizeLimit) * 100;
    }
  }

  Scratch.extensions.register(new RamUsageExtension());
})(Scratch);
