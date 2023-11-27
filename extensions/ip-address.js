// Name: IP Addresses
// ID: ipaddresses
// Description: Blocks for handling public IP addresses
// By: PPPDUD

(function(Scratch) {
  'use strict';

class HelloWorld {
  getInfo() {
    return {
      id: 'ipaddresses',
      name: 'IP Addresses',
      color1: '#2237f2',
      color2: '#1c30e5',
      color3: '#1627bd',
      blocks: [
        {
          opcode: 'get_ip',
          blockType: Scratch.BlockType.REPORTER,
          text: 'get public ip address',
	  disableMonitor: true
        }
      ]
    };
  }

  get_ip() {
    if (true) { // true is a placeholder for in case I choose to add a permissions system
    	return fetch("https://api.ipify.org/")
     	 .then((response) => {
     	   return response.text();
   	   })
   	   .catch((error) => {
     	   console.error(error);
    	    return 'IP address could not be identified.';
   	   });
 	 }
	}
}

Scratch.extensions.register(new HelloWorld());

})(Scratch);

/*

TODO:
 - Add IP address geolocational blocks
 - Consider making a proper thumbnail

*/
