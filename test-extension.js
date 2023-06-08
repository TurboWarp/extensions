class TestExtension {
  getInfo() {
    return {
      id: 'testblock',
      name: 'Just testing.',
      blocks [
        { 
         opcode: 'test',
         blocktype: Scratch.BlockType.REPORTER,
         text: 'Test.'
        }
      ]
    };
 } 

testing() {
  return '...';
 }  
}

Scratch.extensions.register(new TestExtension());
