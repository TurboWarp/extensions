// Name: ESP32 Education
// ID: esp32education
// Description: Control an ESP32 over Web Serial for GPIO, DHT sensors, SSD1306 OLEDs, ESP-NOW, and environmental calculations.
// By: davinichi
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("ESP32 Education must run unsandboxed.");
  }

  const tr = (text) => Scratch.translate(text);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  class ESP32Education {
    constructor() {
      this.port = null;
      this.reader = null;
      this.writer = null;
      this.connected = false;
      this.keepReading = false;
      this.readBuffer = "";
      this.encoder = new TextEncoder();

      this.ready = "";
      this.mac = "";
      this.channel = "";
      this.gpioValues = Object.create(null);
      this.dhtTemperature = NaN;
      this.dhtHumidity = NaN;
      this.dhtStatus = "";
      this.oledStatus = "";
      this.espnowReceived = "";
      this.espnowNewData = false;
      this.espnowTxResult = "";
    }

    getInfo() {
      return {
        id: "esp32education",
        name: tr("ESP32 Education"),
        color1: "#3F8FD2",
        color2: "#2E70AA",
        docsURI: "https://extensions.turbowarp.org/davinichi/esp32-education",
        blocks: [
          {
            opcode: "connect",
            blockType: Scratch.BlockType.COMMAND,
            text: tr("connect to ESP32"),
          },
          {
            opcode: "disconnect",
            blockType: Scratch.BlockType.COMMAND,
            text: tr("disconnect ESP32"),
          },
          {
            opcode: "isConnected",
            blockType: Scratch.BlockType.BOOLEAN,
            text: tr("ESP32 connected?"),
          },
          {
            opcode: "requestStatus",
            blockType: Scratch.BlockType.COMMAND,
            text: tr("refresh ESP32 status"),
          },
          {
            opcode: "statusReporter",
            blockType: Scratch.BlockType.REPORTER,
            text: tr("ESP32 status"),
          },
          {
            opcode: "macReporter",
            blockType: Scratch.BlockType.REPORTER,
            text: tr("ESP32 MAC address"),
          },
          {
            opcode: "channelReporter",
            blockType: Scratch.BlockType.REPORTER,
            text: tr("ESP32 Wi-Fi channel"),
          },
          "---",
          {
            opcode: "gpioMode",
            blockType: Scratch.BlockType.COMMAND,
            text: tr("set GPIO [PIN] mode to [MODE]"),
            arguments: {
              PIN: {
                type: Scratch.ArgumentType.STRING,
                menu: "gpioPins",
                defaultValue: "23",
              },
              MODE: {
                type: Scratch.ArgumentType.STRING,
                menu: "gpioModes",
                defaultValue: "OUTPUT",
              },
            },
          },
          {
            opcode: "gpioWrite",
            blockType: Scratch.BlockType.COMMAND,
            text: tr("write [STATE] to GPIO [PIN]"),
            arguments: {
              STATE: {
                type: Scratch.ArgumentType.STRING,
                menu: "digitalStates",
                defaultValue: "HIGH",
              },
              PIN: {
                type: Scratch.ArgumentType.STRING,
                menu: "gpioPins",
                defaultValue: "23",
              },
            },
          },
          {
            opcode: "gpioRead",
            blockType: Scratch.BlockType.REPORTER,
            text: tr("digital value of GPIO [PIN]"),
            arguments: {
              PIN: {
                type: Scratch.ArgumentType.STRING,
                menu: "gpioPins",
                defaultValue: "23",
              },
            },
          },
          "---",
          {
            opcode: "dhtInit",
            blockType: Scratch.BlockType.COMMAND,
            text: tr("initialize [TYPE] on GPIO [PIN]"),
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "dhtTypes",
                defaultValue: "DHT22",
              },
              PIN: {
                type: Scratch.ArgumentType.STRING,
                menu: "dhtPins",
                defaultValue: "25",
              },
            },
          },
          {
            opcode: "dhtTemperatureReporter",
            blockType: Scratch.BlockType.REPORTER,
            text: tr("DHT temperature (°C)"),
          },
          {
            opcode: "dhtHumidityReporter",
            blockType: Scratch.BlockType.REPORTER,
            text: tr("DHT humidity (%)"),
          },
          {
            opcode: "dhtStatusReporter",
            blockType: Scratch.BlockType.REPORTER,
            text: tr("DHT status"),
          },
          "---",
          {
            opcode: "oledInit",
            blockType: Scratch.BlockType.COMMAND,
            text: tr("initialize OLED"),
          },
          {
            opcode: "oledClear",
            blockType: Scratch.BlockType.COMMAND,
            text: tr("clear OLED"),
          },
          {
            opcode: "oledCursor",
            blockType: Scratch.BlockType.COMMAND,
            text: tr("set OLED cursor to x [X] y [Y]"),
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "oledTextSize",
            blockType: Scratch.BlockType.COMMAND,
            text: tr("set OLED text size to [SIZE]"),
            arguments: {
              SIZE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            },
          },
          {
            opcode: "oledShowText",
            blockType: Scratch.BlockType.COMMAND,
            text: tr("show [TEXT] on OLED"),
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello",
              },
            },
          },
          {
            opcode: "oledSelfTest",
            blockType: Scratch.BlockType.COMMAND,
            text: tr("run OLED display test"),
          },
          {
            opcode: "oledStatusReporter",
            blockType: Scratch.BlockType.REPORTER,
            text: tr("OLED status"),
          },
          "---",
          {
            opcode: "espnowSend",
            blockType: Scratch.BlockType.COMMAND,
            text: tr("send [MESSAGE] to other ESP32"),
            arguments: {
              MESSAGE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello",
              },
            },
          },
          {
            opcode: "espnowReceivedReporter",
            blockType: Scratch.BlockType.REPORTER,
            text: tr("ESP-NOW received data"),
          },
          {
            opcode: "espnowHasNewData",
            blockType: Scratch.BlockType.BOOLEAN,
            text: tr("new ESP-NOW data received?"),
          },
          {
            opcode: "espnowTxResultReporter",
            blockType: Scratch.BlockType.REPORTER,
            text: tr("ESP-NOW send result"),
          },
          "---",
          {
            opcode: "environmentIndex",
            blockType: Scratch.BlockType.REPORTER,
            text: tr(
              "calculate [INDEX] from temperature [TEMP] °C humidity [HUM] %"
            ),
            arguments: {
              INDEX: {
                type: Scratch.ArgumentType.STRING,
                menu: "environmentIndices",
                defaultValue: "WBGT",
              },
              TEMP: { type: Scratch.ArgumentType.NUMBER, defaultValue: 25 },
              HUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 60 },
            },
          },
          {
            opcode: "wbgtLevel",
            blockType: Scratch.BlockType.REPORTER,
            text: tr("WBGT [WBGT] risk level"),
            arguments: {
              WBGT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 25 },
            },
          },
        ],
        menus: {
          gpioPins: {
            acceptReporters: false,
            items: [
              "2",
              "4",
              "5",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "21",
              "22",
              "23",
              "25",
              "26",
              "27",
              "32",
              "33",
              "34",
              "35",
              "36",
              "39",
            ],
          },
          dhtPins: {
            acceptReporters: false,
            items: [
              "2",
              "4",
              "5",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "21",
              "22",
              "23",
              "25",
              "26",
              "27",
              "32",
              "33",
            ],
          },
          gpioModes: {
            acceptReporters: false,
            items: [
              { text: tr("output"), value: "OUTPUT" },
              { text: tr("input"), value: "INPUT" },
              { text: tr("input pull-up"), value: "INPUT_PULLUP" },
              { text: tr("input pull-down"), value: "INPUT_PULLDOWN" },
            ],
          },
          digitalStates: { acceptReporters: false, items: ["HIGH", "LOW"] },
          dhtTypes: { acceptReporters: false, items: ["DHT11", "DHT22"] },
          environmentIndices: {
            acceptReporters: false,
            items: [
              { text: tr("discomfort index"), value: "DI" },
              { text: tr("heat index"), value: "HEAT_INDEX" },
              { text: tr("Humidex"), value: "HUMIDEX" },
              { text: tr("dew point"), value: "DEW_POINT" },
              { text: tr("absolute humidity"), value: "ABS_HUM" },
              { text: tr("wet-bulb temperature"), value: "WET_BULB" },
              { text: tr("vapor pressure deficit"), value: "VPD" },
              { text: tr("vapor pressure"), value: "VP" },
              { text: tr("temperature-humidity index"), value: "THI" },
              { text: tr("estimated WBGT"), value: "WBGT" },
            ],
          },
        },
      };
    }

    async connect() {
      if (!("serial" in navigator))
        throw new Error(tr("Web Serial is not supported in this browser."));
      if (this.connected) return;

      this.port = await navigator.serial.requestPort();
      await this.port.open({
        baudRate: 115200,
        dataBits: 8,
        stopBits: 1,
        parity: "none",
        bufferSize: 1024,
        flowControl: "none",
      });
      this.writer = this.port.writable.getWriter();
      this.connected = true;
      this.keepReading = true;
      this.readLoop();
      await sleep(1500);
      await this.sendLine("SYS:STATUS");
    }

    async disconnect() {
      this.keepReading = false;
      if (this.reader) {
        try {
          await this.reader.cancel();
        } catch (e) {}
      }
      await sleep(50);
      if (this.writer) {
        this.writer.releaseLock();
        this.writer = null;
      }
      if (this.port) {
        await this.port.close();
        this.port = null;
      }
      this.connected = false;
    }

    isConnected() {
      return this.connected;
    }
    async requestStatus() {
      await this.sendLine("SYS:STATUS");
    }
    statusReporter() {
      return this.ready;
    }
    macReporter() {
      return this.mac;
    }
    channelReporter() {
      return this.channel;
    }

    async readLoop() {
      if (!this.port || !this.port.readable) return;
      const decoder = new TextDecoder();
      try {
        this.reader = this.port.readable.getReader();
        while (this.keepReading) {
          const { value, done } = await this.reader.read();
          if (done) break;
          if (!value) continue;
          this.readBuffer += decoder.decode(value, { stream: true });
          let index;
          while ((index = this.readBuffer.indexOf("\n")) >= 0) {
            let line = this.readBuffer.slice(0, index);
            this.readBuffer = this.readBuffer.slice(index + 1);
            line = line.replace(/\r/g, "").trim();
            if (line) this.processLine(line);
          }
        }
      } finally {
        if (this.reader) {
          this.reader.releaseLock();
          this.reader = null;
        }
      }
    }

    processLine(line) {
      if (line.startsWith("SYS:READY:")) this.ready = line.substring(10);
      else if (line.startsWith("SYS:MAC:")) this.mac = line.substring(8);
      else if (line.startsWith("SYS:CH:")) this.channel = line.substring(7);
      else if (line.startsWith("GPIO:READ:")) {
        const p = line.split(":");
        if (p.length >= 4) this.gpioValues[p[2]] = Number(p[3]) ? 1 : 0;
      } else if (line.startsWith("DHT:DATA:")) {
        const p = line.split(":");
        if (p.length >= 4) {
          this.dhtTemperature = Number(p[2]);
          this.dhtHumidity = Number(p[3]);
          this.dhtStatus = "OK";
        }
      } else if (line.startsWith("DHT:STATUS:"))
        this.dhtStatus = line.substring(11);
      else if (line === "OLED:READY") this.oledStatus = "READY";
      else if (line === "OLED:ERROR") this.oledStatus = "ERROR";
      else if (line.startsWith("ESPNOW:RX:")) {
        this.espnowReceived = line.substring(10);
        this.espnowNewData = true;
      } else if (line === "ESPNOW:TX:OK") this.espnowTxResult = "OK";
      else if (line === "ESPNOW:TX:FAIL") this.espnowTxResult = "FAIL";
    }

    async sendLine(text) {
      if (!this.connected || !this.writer)
        throw new Error(tr("Connect to the ESP32 first."));
      const normalized = String(text).replace(/[\r\n]+/g, "");
      await this.writer.write(this.encoder.encode(normalized + "\n"));
      await sleep(10);
    }

    async gpioMode(args) {
      await this.sendLine(`GPIO:MODE:${args.PIN},${args.MODE}`);
    }
    async gpioWrite(args) {
      await this.sendLine(`GPIO:WRITE:${args.PIN},${args.STATE}`);
    }
    async gpioRead(args) {
      const pin = String(args.PIN);
      await this.sendLine(`GPIO:READ:${pin}`);
      await sleep(40);
      return this.gpioValues[pin] ?? 0;
    }

    async dhtInit(args) {
      this.dhtStatus = "";
      await this.sendLine(`DHT:INIT:${args.TYPE},${args.PIN}`);
      await sleep(100);
    }
    async readDHT() {
      await this.sendLine("DHT:READ");
      await sleep(150);
    }
    async dhtTemperatureReporter() {
      await this.readDHT();
      return Number.isFinite(this.dhtTemperature) ? this.dhtTemperature : 0;
    }
    async dhtHumidityReporter() {
      await this.readDHT();
      return Number.isFinite(this.dhtHumidity) ? this.dhtHumidity : 0;
    }
    dhtStatusReporter() {
      return this.dhtStatus;
    }

    async oledInit() {
      await this.sendLine("OLED:INIT");
      await sleep(100);
    }
    async oledClear() {
      await this.sendLine("OLED:CLEAR");
    }
    async oledCursor(args) {
      const x = Math.max(0, Math.min(127, Math.round(Number(args.X))));
      const y = Math.max(0, Math.min(63, Math.round(Number(args.Y))));
      await this.sendLine(`OLED:CURSOR:${x},${y}`);
    }
    async oledTextSize(args) {
      let size = Math.round(Number(args.SIZE));
      if (!Number.isFinite(size)) size = 1;
      size = Math.max(1, Math.min(8, size));
      await this.sendLine(`OLED:SIZE:${size}`);
    }
    async oledShowText(args) {
      await this.sendLine(
        `OLED:TEXT:${String(args.TEXT).replace(/[\r\n]+/g, " ")}`
      );
    }
    async oledSelfTest() {
      await this.sendLine("OLED:TEST");
    }
    oledStatusReporter() {
      return this.oledStatus;
    }

    async espnowSend(args) {
      this.espnowTxResult = "";
      await this.sendLine(
        `ESPNOW:SEND:${String(args.MESSAGE).replace(/[\r\n]+/g, " ")}`
      );
    }
    espnowReceivedReporter() {
      const value = this.espnowReceived;
      this.espnowNewData = false;
      return value;
    }
    espnowHasNewData() {
      return this.espnowNewData;
    }
    espnowTxResultReporter() {
      return this.espnowTxResult;
    }

    clampHumidity(h) {
      return Math.max(0, Math.min(100, Number(h)));
    }
    saturationVaporPressureHpa(temp) {
      return 6.112 * Math.exp((17.67 * temp) / (temp + 243.5));
    }
    discomfortIndex(temp, hum) {
      const h = this.clampHumidity(hum);
      return 0.81 * temp + 0.01 * h * (0.99 * temp - 14.3) + 46.3;
    }
    dewPoint(temp, hum) {
      let h = this.clampHumidity(hum);
      if (h < 0.1) h = 0.1;
      const g = Math.log(h / 100) + (17.67 * temp) / (243.5 + temp);
      return (243.5 * g) / (17.67 - g);
    }
    wetBulb(temp, hum) {
      const h = this.clampHumidity(hum);
      return (
        temp * Math.atan(0.151977 * Math.sqrt(h + 8.313659)) +
        Math.atan(temp + h) -
        Math.atan(h - 1.676331) +
        0.00391838 * Math.pow(h, 1.5) * Math.atan(0.023101 * h) -
        4.686035
      );
    }
    estimatedWBGT(temp, hum) {
      const w = this.wetBulb(temp, hum);
      return 0.7 * w + 0.3 * temp;
    }
    absoluteHumidity(temp, hum) {
      const h = this.clampHumidity(hum);
      const e = this.saturationVaporPressureHpa(temp) * (h / 100);
      return (216.7 * e) / (temp + 273.15);
    }
    vaporPressureKpa(temp, hum) {
      const h = this.clampHumidity(hum);
      return (this.saturationVaporPressureHpa(temp) * (h / 100)) / 10;
    }
    vaporPressureDeficit(temp, hum) {
      const h = this.clampHumidity(hum);
      return (this.saturationVaporPressureHpa(temp) / 10) * (1 - h / 100);
    }
    humidex(temp, hum) {
      const dp = this.dewPoint(temp, hum);
      const k = dp + 273.15;
      const e = 6.11 * Math.exp(5417.753 * (1 / 273.15 - 1 / k));
      return temp + 0.5555 * (e - 10);
    }
    heatIndex(temp, hum) {
      const h = this.clampHumidity(hum);
      const f = (temp * 9) / 5 + 32;
      let hi = 0.5 * (f + 61 + (f - 68) * 1.2 + h * 0.094);
      hi = (hi + f) * 0.5;
      if (hi >= 80) {
        const f2 = f * f;
        const h2 = h * h;
        hi =
          -42.379 +
          2.04901523 * f +
          10.14333127 * h -
          0.22475541 * f * h -
          0.00683783 * f2 -
          0.05481717 * h2 +
          0.00122874 * f2 * h +
          0.00085282 * f * h2 -
          0.00000199 * f2 * h2;
      }
      return ((hi - 32) * 5) / 9;
    }
    temperatureHumidityIndex(temp, hum) {
      return temp + 0.36 * this.dewPoint(temp, hum) + 41.2;
    }

    environmentIndex(args) {
      const temp = Number(args.TEMP);
      const hum = Number(args.HUM);
      switch (String(args.INDEX)) {
        case "DI":
          return this.discomfortIndex(temp, hum);
        case "HEAT_INDEX":
          return this.heatIndex(temp, hum);
        case "HUMIDEX":
          return this.humidex(temp, hum);
        case "DEW_POINT":
          return this.dewPoint(temp, hum);
        case "ABS_HUM":
          return this.absoluteHumidity(temp, hum);
        case "WET_BULB":
          return this.wetBulb(temp, hum);
        case "VPD":
          return this.vaporPressureDeficit(temp, hum);
        case "VP":
          return this.vaporPressureKpa(temp, hum);
        case "THI":
          return this.temperatureHumidityIndex(temp, hum);
        default:
          return this.estimatedWBGT(temp, hum);
      }
    }

    wbgtLevel(args) {
      const w = Number(args.WBGT);
      if (w >= 31) return tr("danger");
      if (w >= 28) return tr("severe warning");
      if (w >= 25) return tr("warning");
      if (w >= 21) return tr("caution");
      return tr("low risk");
    }
  }

  Scratch.extensions.register(new ESP32Education());
})(Scratch);
