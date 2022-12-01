
lastcon = null;
let mWS = null;
constat = null;
(function(Scratch) {
  const vm = Scratch.vm;
  'use strict';
  class PingUtil {
    getInfo () {
      return { 
        id: 'PingUtil',
        name: 'PingUtil',
        blocks: [{
          opcode: 'Ping',
          blockType: Scratch.BlockType.BOOLEAN,
          text: "Ping server [TEXT]",
          arguments: {
           TEXT: {
             type: Scratch.ArgumentType.STRING,
             defaultValue: 'wss://clouddata.turbowarp.org',
           }
         }
        }    
      ]
      }
    }



    Ping({TEXT}) {

      if (lastcon === TEXT) {


        if (constat == true) {
          console.log("true")
            return 'true'
          
          } else {
            console.log("false")
            return 'false'
          }


      } else {
        constat = false
        lastcon = TEXT
        if (mWS === null){

        } else {mWS.close()}
      const self = this;
		if (!self.isRunning) {
			console.log("Starting socket.");
			mWS = new WebSocket(String(TEXT));
			
			mWS.onerror = function(){
				self.isRunning = false;
        constat = false
			};
			
			mWS.onopen = function(){
				console.log("Successfully opened socket.");
        constat = true

			};
    }
return false
  }
}
}


  Scratch.extensions.register(new PingUtil());
})(Scratch);
