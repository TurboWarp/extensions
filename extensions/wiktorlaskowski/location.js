// Name: Location
// ID: location
// Description: Allows getting latitude, longitude, and the location accuracy. Supporting location fallbacks.
// By: wiktorlaskowski <https://scratch.mit.edu/users/wiktor_the_cool_guy/>
class LocationExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.latitude = 51.5074;  // Default: London
        this.longitude = -0.1272;
        this.accuracy = 0;
        this.fallbackLatitude = 51.5074;
        this.fallbackLongitude = -0.1272;
    }

    getInfo() {
        return {
            id: 'location',
            name: 'Location',
            color1: '#003366',
            color2: '#002244',
            color3: '#001122',
            blocks: [
                {
                    opcode: 'getLatitude',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'latitude',
                },
                {
                    opcode: 'getLongitude',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'longitude',
                },
                {
                    opcode: 'getAccuracy',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'location accuracy',
                },
                {
                    opcode: 'setFallbackLocation',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'set fallback location latitude [LAT] longitude [LON]',
                    arguments: {
                        LAT: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 51.5074
                        },
                        LON: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: -0.1272
                        }
                    }
                }
            ],
            menus: {}
        };
    }

    // Return a promise that resolves when the location is updated
    async _getUpdatedLocation() {
        return new Promise((resolve) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.latitude = position.coords.latitude;
                        this.longitude = position.coords.longitude;
                        this.accuracy = position.coords.accuracy;
                        resolve();
                    },
                    (error) => {
                        console.warn("Geolocation error, using fallback:", error.message);
                        this.latitude = this.fallbackLatitude;
                        this.longitude = this.fallbackLongitude;
                        this.accuracy = 0;
                        resolve();
                    }
                );
            } else {
                console.warn("Geolocation not supported, using fallback.");
                this.latitude = this.fallbackLatitude;
                this.longitude = this.fallbackLongitude;
                this.accuracy = 0;
                resolve();
            }
        });
    }

    async getLatitude() {
        await this._getUpdatedLocation();
        return this.latitude;
    }

    async getLongitude() {
        await this._getUpdatedLocation();
        return this.longitude;
    }

    async getAccuracy() {
        await this._getUpdatedLocation();
        return this.accuracy;
    }

    setFallbackLocation(args) {
        this.fallbackLatitude = args.LAT;
        this.fallbackLongitude = args.LON;
    }
}

Scratch.extensions.register(new LocationExtension());
