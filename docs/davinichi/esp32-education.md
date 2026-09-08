# ESP32 Education

ESP32 Education is a TurboWarp extension for controlling an ESP32 from TurboWarp using USB and Web Serial.

It is designed for educational activities using ESP32 boards, allowing students to work with GPIO, sensors, OLED displays, environmental calculations, and ESP-NOW communication using blocks.

## Requirements

- ESP32
- USB cable capable of data communication
- A browser that supports Web Serial
- ESP32 Education firmware installed on the ESP32

Google Chrome and other Chromium-based browsers with Web Serial support are recommended.

## ESP32 firmware

Before using this extension, the ESP32 must be programmed with the TurboWarp ESP32 Education firmware.

The firmware receives commands from TurboWarp over USB serial communication and controls the ESP32 hardware.

The firmware, installation instructions, and source code are available from the **TurboWarp ESP32 Education** GitHub repository:

[TurboWarp ESP32 Education on GitHub](https://github.com/davinichi/TurboWarp-ESP32-Education)

Students normally do not need to use the Arduino IDE after the firmware has been installed.

## Connecting to the ESP32

1. Connect the ESP32 to the computer using a USB cable.
2. Open TurboWarp.
3. Add the ESP32 Education extension.
4. Use the **connect to ESP32** block.
5. Select the ESP32 serial port when the browser asks for permission.

After the connection is established, the ESP32 can be controlled using the extension blocks.

## GPIO

The GPIO blocks can configure and control ESP32 GPIO pins.

Available functions include:

- Set a GPIO pin as input or output
- Write HIGH or LOW to a GPIO pin
- Read a digital input

Some ESP32 pins have hardware restrictions. Check the specifications of your ESP32 board before connecting external devices.

## DHT11 and DHT22

The extension supports DHT11 and DHT22 temperature and humidity sensors.

Available values include:

- Temperature
- Relative humidity
- Sensor status

Initialize the sensor before reading temperature or humidity.

## SSD1306 OLED

The extension supports SSD1306 OLED displays.

The standard configuration is:

- Resolution: 128 × 64
- I2C address: `0x3C`
- SDA: GPIO 21
- SCL: GPIO 22

Available functions include:

- Initialize the OLED
- Clear the display
- Set the cursor position
- Set the text size
- Display text
- Run a display test

## Environmental calculations

Temperature and humidity values can be used to calculate environmental indices.

Available calculations include:

- Discomfort Index (DI)
- Heat Index
- Humidex
- Dew Point
- Absolute Humidity
- Wet Bulb Temperature
- Vapor Pressure Deficit (VPD)
- Vapor Pressure
- Temperature-Humidity Index (THI)
- Estimated WBGT

The estimated WBGT value is a simplified calculation based on temperature and humidity. It is not a replacement for a certified WBGT measuring instrument.

## ESP-NOW

ESP-NOW allows ESP32 boards to communicate directly without connecting to a school or home Wi-Fi network.

The ESP32 Education extension can:

- Send data to another ESP32
- Receive data from another ESP32
- Detect newly received data
- Check the transmission result

This makes it possible to create classroom activities such as wireless sensors, environmental monitoring systems, and communication between robots.

## Web Serial

This extension uses the Web Serial API.

The extension must run unsandboxed and requires a browser that supports Web Serial.

Web Serial is not supported by every browser or operating system.

## Classroom use

A teacher or administrator can install the TurboWarp ESP32 Education firmware on the ESP32 boards in advance.

Students can then use TurboWarp and the ESP32 Education blocks without needing to install or use the Arduino IDE.

A typical classroom configuration is:

```text
Chromebook
    |
    | USB / Web Serial
    |
   ESP32
    |
    | ESP-NOW
    |
Other ESP32 boards
```

This configuration can be used without connecting the ESP32 boards to the school's Wi-Fi network.

## Author

Developed by **davinichi**.

## License

MPL-2.0
