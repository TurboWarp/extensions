(function(Scratch) {
  'use strict';

  const blocksIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAACXBIWXMAAAsTAAALEwEAmpwYAAADkklEQVR4nNWaz0tVQRTHbxaBUhjhLihBWkWrohaG6zTCMPthRQXmD1AzMDPBnf9CLVw8dFNQWhsrWyRF+Q9Yu35Y7SqTFgW+tPzE0XnxvM68O/Pu+N71u3xvzpnzeWfO3Hl3ThBoBOwA2oHHwCcgTXz9AB4CrUCZYd4KYNxgn1axSExtEqPOR9jhJqAbmGN99Q3oBbZoYtgKvLLw8R24KjGbYMqAsQgns/jVJLBNE0slMG/pYxQo1WUmCkaUAgbwqydAiQbqloOP+6sypZaZjVJqfD9+1akBqnL00ZW9Acy5ACm7Pvzpi9SOBmrawYfUVHmgdjNcgdSEUti+dEYDNOjoozVQazgvIDVpD340qfFd5+jjkRh9jgOkJr4GLBFPv8O7FSu7nYtmAseHphYoa2OJC3Uk5LME+OVgnxYjfACpALpiQt3Q+Hzj4sArkAqgIwbUHY2/qaICqSBagL+464XG19OCAQGHgeMGqCt5QL3X+BkrJFCNOnPVesrUfPiwCYwUGgi1U9YZoJodoXaG7FPFAMo8R+oNUE3AH8s5diUFKArqLLBItKqSBJSBOhEDal/SgEQLOaBOR0AdSCJQVKZy1VR1UoEymWowQJ0yZKomSUBvNb98Lijd8ksU0JCh8AWq0QA1nGigYOXzRg2UZO6cBmgo8UBZUAsaqPPBRgQSAScNUBc2JJANVNKBhrO/t4BqSjrQomzFBqgGA9S7JAOtqZHQ+GMWL2WKClRtGLe8nAxQ9epYlEiggznGCtRFA1RtjkwVFWh/xHiBupQDaj5pQHstbOTv92UHqKIC7ba0k/d07QaooyGoogJVONhKppoNUHVZNVVQoBHNzV/aEaolYvkVFGhUE8iMow9Zfm05lt+hQgJNaIJ4ibuWdNeQBsjUegJNaSa8S34SqI5iA73WTHiT/LX0/7LXI1DaYfxPzbvnqBclNlDdnoDSYvDRMYA9oQlLI85mtur3APQhUL0zLlrzUh54jh/1xAQaD1QjkIsGNZPKHzVf6o0B1JJpvJCmBVtNGxqOvuJPfXkAzS43Xigj6Wpy0aobgqwLY59arikHoM7wEUa6mmx1WwMkV/AT+NWAJdC9NW1mareSriYbyZmrUgO1HXiGX81awKxuLwtlqsuypqYMDUebgeueawqNBFRaCPQNgKGgylUrpbRLyuHT9PCVLb/C4EMaCuXS+IFqz4wriUFikZjE78oGENI/OGAeDDqI5HgAAAAASUVORK5CYII=";

  class NFCWarp {
    getInfo() {
      return {
        id: 'nfcwarp',
        name: 'NFCWarp',
        color1: '#ff0000',
        color2: '#800000',
        color3: '#990033',
        docsURI: 'https://docs.turbowarp.org/development/extensions/nfcwarp',
        menuIconURI: blocksIcon,
        blockIconURI: blocksIcon,
        blocks: [{
            blockType: Scratch.BlockType.LABEL,
            text: "Read and write"
          },

          {
            opcode: 'nfcRead',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Read NFC Tag',
            disableMonitor: true
          }
        ]
      };
    }

    nfcRead() {
      return new Promise((resolve, reject) => {
        console.log("Approach NFC Tag");
        // eslint-disable-line
        const ndef = new NDEFReader();
        ndef.scan()
          .then(() => {
            ndef.onreadingerror = err => {
              console.log("Read failed");
              reject(err);
            };
            ndef.onreading = evt => {
              const decoder = new TextDecoder();
              let record = evt.message.records[0];
              console.log("Record type: " + record.recordType);
              console.log("Record encoding: " + record.encoding);
              console.log("Record data: " + decoder.decode(record.data));
              resolve(decoder.decode(record.data));
              return;
            };
          })
          .catch(err => {
            console.log("Read error - " + err.message);
            reject(err);
          });
      });
    }
  }

  Scratch.extensions.register(new NFCWarp());
})(Scratch);
