// Name: Binary Converter
// ID: binaryConverter
// Description: The Binary Converter extension allows you to seamlessly convert Text To Binary and Binary To Text.
// By: HirujaSJ <https://scratch.mit.edu/users/CODINGHIRUJA/>

class BinaryConverter {
    constructor(runtime) {
        this.runtime = runtime;
        this.binaryValue = '';
        this.textValue = '';
    }

    getInfo() {
        return {
            id: 'binaryConverter',
            name: 'Binary Converter',
            blocks: [
                {
                    opcode: 'textToBinary',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Convert text [text] to binary',
                    arguments: {
                        text: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Hello, World!'
                        }
                    },
                    blockColor: '#4B4B4B'
                },
                {
                    opcode: 'binaryToText',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Convert binary [binary] to text',
                    arguments: {
                        binary: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '01001000 01100101 01101100 01101100 01101111'
                        }
                    },
                    blockColor: '#4B4B4B'
                },
                {
                    opcode: 'getBinaryValue',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Binary',
                    blockColor: '#4B4B4B'
                },
                {
                    opcode: 'getTextValue',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Text',
                    blockColor: '#4B4B4B'
                }
            ]
        };
    }

    textToBinary({ text }) {
        this.binaryValue = '';
        for (let i = 0; i < text.length; i++) {
            const binaryChar = text[i].charCodeAt(0).toString(2);
            this.binaryValue += '0'.repeat(8 - binaryChar.length) + binaryChar + ' ';
        }
        this.binaryValue = this.binaryValue.trim();
        return this.binaryValue;
    }

    binaryToText({ binary }) {
        this.textValue = '';
        const binaryArray = binary.split(' ');
        for (let i = 0; i < binaryArray.length; i++) {
            const decimalValue = parseInt(binaryArray[i], 2);
            this.textValue += String.fromCharCode(decimalValue);
        }
        this.textValue = this.textValue.trim();
        return this.textValue;
    }

    getBinaryValue() {
        return this.binaryValue;
    }

    getTextValue() {
        return this.textValue;
    }
}

Scratch.extensions.register(new BinaryConverter());
//Made By Hiruja Edurapola
