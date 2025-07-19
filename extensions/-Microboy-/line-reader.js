// Name: Line Reader
// ID: linereader
// Description: A simple extension for reading newlines and supports special tilde delimiters. Use ~n for UNIX, ~r for Classic Mac OS, and ~z for Windows.
// By: Pear Computer LLC. <https://scratch.mit.edu/users/-Microboy-/>
// License: BSD-2-Clause
/*
Copyright 2025 Pear Computer LLC.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS “AS IS” AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
(function(Scratch) {
    "use strict";

    class LineReaderExtension {
        getInfo() {
            return {
                id: 'linereader', // Unique ID for the extension
                name: 'Line Reader', // Name displayed in Scratch
                blocks: [
                    {
                        opcode: 'getLine', // Opcode for getting a specific line
                        blockType: Scratch.BlockType.REPORTER, // It's a reporter block (returns a value)
                        text: 'line [LINE_NUM] in [TEXT_INPUT]', // The text displayed on the block
                        arguments: {
                            LINE_NUM: {
                                type: Scratch.ArgumentType.NUMBER, // Argument for the line number
                                defaultValue: 1 // Default value for the line number
                            },
                            TEXT_INPUT: {
                                type: Scratch.ArgumentType.STRING, // Argument for the multi-line text
                                // Default value demonstrating different newline types using custom escape sequences
                                defaultValue: 'Hello from UNIX!~nHello from Classic Mac!~rHello from Windows!~zFinal line.'
                            }
                        }
                    }
                    ,
                    {
                        opcode: 'countLines', // Opcode for counting lines
                        blockType: Scratch.BlockType.REPORTER, // It's a reporter block (returns a number)
                        text: 'number of lines in [TEXT_INPUT]', // The text displayed on the block
                        arguments: {
                            TEXT_INPUT: {
                                type: Scratch.ArgumentType.STRING, // Argument for the multi-line text
                                // Default value demonstrating different newline types using custom escape sequences
                                defaultValue: 'First line!~nSecond line!~rThird line!~zFourth line.'
                            }
                        }
                    }
                ]
            };
        }

        /**
         * Helper function to process the input text by replacing custom escape sequences
         * with actual newline characters.
         * @param {string} text - The input string from a Scratch block.
         * @returns {string} The processed string with actual newlines.
         */
        _processNewlines(text) {
            // Ensure the input is treated as a string
            let processedText = String(text);

            // --- Pre-process custom newline escape sequences ---
            // It's crucial to replace the most specific (or potentially conflicting)
            // sequences first to avoid partial replacements.
            // Order: ~z (for \r\n), then ~r (for \r), then ~n (for \n)

            // ~z is for \r\n (Windows newline)
            processedText = processedText.replace(/~z/g, '\r\n');
            // ~r is for \r (Classic Mac OS newline)
            processedText = processedText.replace(/~r/g, '\r');
            // ~n is for \n (UNIX newline)
            processedText = processedText.replace(/~n/g, '\n');

            return processedText;
        }

        /**
         * Retrieves a specific line from a given string, automatically handling
         * common newline conventions and custom escape sequences.
         * @param {object} args - The arguments passed to the block.
         * @param {number} args.LINE_NUM - The 1-indexed line number to retrieve.
         * @param {string} args.TEXT_INPUT - The multi-line string to process.
         * @returns {string} The requested line, or an empty string if out of bounds.
         */
        getLine(args) {
            // Process custom escape sequences into actual newlines
            const processedText = this._processNewlines(args.TEXT_INPUT);
            // Ensure the line number is an integer
            const lineNum = parseInt(args.LINE_NUM, 10);

            // Regular expression to split by any common newline sequence:
            // \r\n (Windows) OR \r (Classic Mac) OR \n (UNIX)
            const linesArray = processedText.split(/\r\n|\r|\n/);

            // Scratch line numbers are 1-indexed, so convert to 0-indexed for JavaScript array
            const index = lineNum - 1;

            // Check if the requested line number is within the valid range
            if (index >= 0 && index < linesArray.length) {
                return linesArray[index]; // Return the requested line
            } else {
                return ''; // Return an empty string if the line number is out of bounds
            }
        }

        /**
         * Counts the number of lines in a given string, automatically handling
         * common newline conventions and custom escape sequences.
         * @param {object} args - The arguments passed to the block.
         * @param {string} args.TEXT_INPUT - The multi-line string to process.
         * @returns {number} The total number of lines in the string.
         */
        countLines(args) {
            // Process custom escape sequences into actual newlines
            const processedText = this._processNewlines(args.TEXT_INPUT);

            // Regular expression to split by any common newline sequence:
            // \r\n (Windows) OR \r (Classic Mac) OR \n (UNIX)
            const linesArray = processedText.split(/\r\n|\r|\n/);

            // If the input string is empty, split() will return [''], so length will be 1.
            // We want 0 lines for an empty string.
            if (processedText === '') {
                return 0;
            }
            return linesArray.length;
        }
    }

    // Register the extension with Scratch
    Scratch.extensions.register(new LineReaderExtension());

})(Scratch); // Pass the global Scratch object into the IIFE
