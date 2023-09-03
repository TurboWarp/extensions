// Name: Geolocation
// ID: geolocation
// Description: Get your precise location based on GPS or IP.
// By: The_Mad_Punter

class GeolocationExtension {
  constructor(runtime) {
    this.runtime = runtime;
  }
  

  getInfo() {
    const blockIconURI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAzCAYAAAAKLSELAAAAAXNSR0IArs4c6QAAARNJREFUaEPt2OEKwyAMRtHl/R/aYkHpnDYm+WqT4f4O5HBt0YY+oF9KKbVLEREhllcv0kNxIC1ahNTARnAJeAqJxGkeCRb5JLCAuaq3yBXAGegQuRLIQbvIN4B30B/km8AR9AvpAdiDxkJ6qtjWrCXdIz0CrzXPkhvJXY2Y//ORSZ4r1i3fSONW75KggHWZ/eKgisYouU8cwH6fJ06Ykl6hJWKc+2R5dDyd49eBQaxvHE8127FLvO9uDzV7w6u4s6C3io5GgLFHfytrmoaoK6AcMBvYcfST0Bng/yHRN6XZiqKSyG2XAFVIa1EpUI3UQjVAE1IK1QLNyFmoBQhBclArEIYcQRFAKLKFooBwZIEigXnNAzqQzBTaigTKAAAAAElFTkSuQmCC";
    return {
      id: 'geolocation',
      name: 'Geolocation',
      color1: '#12e8f7',
      color2: '#11aacc',
      blockIconURI: blockIconURI,
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
