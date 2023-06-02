(function (Scratch) {
  'use strict';

  /** @type {Promise<BatteryManager>|null} */
  let getBatteryPromise = null;
  /** @type {BatteryManager|null} */
  let cachedBattery = null;
  /** @type {Error|null} */
  let cachedBatteryError = null;
  const withBattery = (callback) => {
    if (!navigator.getBattery || cachedBatteryError) {
      return callback(null);
    }
    if (cachedBattery) {
      return callback(cachedBattery);
    }
    if (!getBatteryPromise) {
      getBatteryPromise = navigator.getBattery()
        .then(battery => {
          getBatteryPromise = null;
          cachedBattery = battery;
          return cachedBattery;
        })
        .catch(error => {
          console.error('Could not get battery', error);
          cachedBatteryError = error;
          return null;
        });
    }
    return getBatteryPromise.then(battery => {
      return callback(battery);
    });
  };

  class BatteryExtension {
    getInfo () {
      return {
        name: 'Battery',
        id: 'battery',
        blocks: [
          {
            opcode: 'charging',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'charging?'
          },
          {
            opcode: 'getCharge',
            blockType: Scratch.BlockType.REPORTER,
            text: 'battery percent'
          },
          {
            opcode: 'timeUntilCharged',
            blockType: Scratch.BlockType.REPORTER,
            text: 'seconds until charged'
          },
          {
            opcode: 'timeUntilDischarged',
            blockType: Scratch.BlockType.REPORTER,
            text: 'seconds until empty'
          }
        ]
      };
    }
    charging () {
      return withBattery(battery => {
        if (!battery) return false;
        return battery.charging;
      });
    }
    getCharge () {
      return withBattery(battery => {
        if (!battery) return 100;
        return battery.level * 100;
      });
    }
    timeUntilCharged () {
      return withBattery(battery => {
        if (!battery) return 0;
        return battery.chargingTime;
      });
    }
    timeUntilDischarged () {
      return withBattery(battery => {
        if (!battery) return Infinity;
        return battery.dischargingTime;
      });
    }
  }

  Scratch.extensions.register(new BatteryExtension());
})(Scratch);
