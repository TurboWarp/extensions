// Name: Battery
// ID: battery
// Description: Access information about the battery of phones or laptops. May not work on all devices and browsers.

(function (Scratch) {
  "use strict";

  /** @type {Promise<BatteryManager>|null} */
  let getBatteryPromise = null;
  /** @type {BatteryManager|null} */
  let cachedBattery = null;
  /** @type {boolean} */
  let batteryError = false;
  const withBattery = (callback) => {
    // Getting the BatteryManager is async the first time. Usually it's very fast, but we shouldn't assume that it is.
    // All the logic here lets us return values immediately when we have already got the battery instead of forcing
    // a delay by returning a promise.
    if (!navigator.getBattery || batteryError) {
      return callback(null);
    }
    if (cachedBattery) {
      return callback(cachedBattery);
    }
    if (!getBatteryPromise) {
      getBatteryPromise = navigator
        .getBattery()
        .then((battery) => {
          getBatteryPromise = null;
          cachedBattery = battery;

          cachedBattery.addEventListener("chargingchange", () => {
            Scratch.vm.runtime.startHats("battery_chargingChanged");
          });
          cachedBattery.addEventListener("levelchange", () => {
            Scratch.vm.runtime.startHats("battery_levelChanged");
          });
          cachedBattery.addEventListener("chargingtimechange", () => {
            Scratch.vm.runtime.startHats("battery_chargeTimeChanged");
          });
          cachedBattery.addEventListener("dischargingtimechange", () => {
            Scratch.vm.runtime.startHats("battery_dischargeTimeChanged");
          });

          return cachedBattery;
        })
        .catch((error) => {
          getBatteryPromise = null;
          console.error("Could not get battery", error);
          batteryError = true;
          return null;
        });
    }
    return getBatteryPromise.then((battery) => {
      return callback(battery);
    });
  };

  // Try to get the battery immediately so that event blocks work.
  withBattery(() => {});

  class BatteryExtension {
    getInfo() {
      return {
        name: "Battery",
        id: "battery",
        blocks: [
          {
            opcode: "charging",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "charging?",
          },
          {
            opcode: "level",
            blockType: Scratch.BlockType.REPORTER,
            text: "battery level",
          },
          {
            opcode: "chargeTime",
            blockType: Scratch.BlockType.REPORTER,
            text: "seconds until charged",
          },
          {
            opcode: "dischargeTime",
            blockType: Scratch.BlockType.REPORTER,
            text: "seconds until empty",
          },
          {
            opcode: "chargingChanged",
            blockType: Scratch.BlockType.EVENT,
            text: "when charging changed",
            isEdgeActivated: false,
          },
          {
            opcode: "levelChanged",
            blockType: Scratch.BlockType.EVENT,
            text: "when battery level changed",
            isEdgeActivated: false,
          },
          {
            opcode: "chargeTimeChanged",
            blockType: Scratch.BlockType.EVENT,
            text: "when time until charged changed",
            isEdgeActivated: false,
          },
          {
            opcode: "dischargeTimeChanged",
            blockType: Scratch.BlockType.EVENT,
            text: "when time until empty changed",
            isEdgeActivated: false,
          },
        ],
      };
    }
    charging() {
      return withBattery((battery) => {
        if (!battery) return true;
        return battery.charging;
      });
    }
    level() {
      return withBattery((battery) => {
        if (!battery) return 100;
        return battery.level * 100;
      });
    }
    chargeTime() {
      return withBattery((battery) => {
        if (!battery) return 0;
        return battery.chargingTime;
      });
    }
    dischargeTime() {
      return withBattery((battery) => {
        if (!battery) return Infinity;
        return battery.dischargingTime;
      });
    }
  }

  Scratch.extensions.register(new BatteryExtension());
})(Scratch);
