// Name: IP Addresses
// ID: ipaddresses
// Description: Blocks for handling public IP addresses
// By: PPPDUD

/*
This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <https://unlicense.org>

*/

(function(Scratch) {
  'use strict';

class ipaddresses {
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
          text: 'get public ip address',
          blockType: Scratch.BlockType.REPORTER,
	  disableMonitor: true
        }
      ]
    };
  }

  get_ip() {
    	return Scratch.fetch("https://api.ipify.org/")
     	 .then((response) => {
     	   return response.text();
   	   })
   	   .catch((error) => {
     	   console.error(error);
    	    return 'IP address could not be identified.';
   	   });
 	 }
	}


  Scratch.extensions.register(new ipaddresses());
})(Scratch);
/*

TODO:
 - Add IP address geolocational blocks
 - Consider making a proper thumbnail

*/
