class GeolocationExtension {
  constructor(runtime) {
    this.runtime = runtime;
  }

  getInfo() {
    return {
      id: 'geolocation',
      name: 'Geolocation',
      blocks: [
        {
          opcode: 'getLatitude',
          blockType: 'reporter',
          text: 'Latitude',
        },
        {
          opcode: 'getLongitude',
          blockType: 'reporter',
          text: 'Longitude',
        },
      ],
    };
  }

  getLatitude() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(position.coords.latitude);
          },
          (error) => {
            reject('Error getting latitude: ' + error.message);
          }
        );
      } else {
        reject('Geolocation not supported');
      }
    });
  }

  getLongitude() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(position.coords.longitude);
          },
          (error) => {
            reject('Error getting longitude: ' + error.message);
          }
        );
      } else {
        reject('Geolocation not supported');
      }
    });
  }
}

Scratch.extensions.register(new GeolocationExtension());
