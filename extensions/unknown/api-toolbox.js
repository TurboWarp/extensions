// Name: API Toolbox
// ID: unkapiToolbox
// Description: API for Frogs
// By: Unknown07724 https://scratch.mit.edu/users/Unknown07724/
// License: MPL-2.0

(function(Scratch) {
  'use strict';

  // API Toolbox Extension
  class API_Toolbox {
    getInfo() {
      return {
        id: 'unkapiToolbox',
        name: 'API Toolbox',
        color1: '#99C68E',
        blocks: [
          {
            opcode: 'getProjects',
            blockType: Scratch.BlockType.REPORTER,
            text: 'give projects json pls',
            arguments: {}
          },
          {
            opcode: 'getAuthors',
            blockType: Scratch.BlockType.REPORTER,
            text: 'who are the authors?',
            arguments: {} // No arguments here
          },
          {
            opcode: 'getLanguages',
            blockType: Scratch.BlockType.REPORTER,
            text: 'list o’ languages pls',
            arguments: {}
          },
          {
            blockType: "label",
            text: "I forgot what root is",
          },
          {
            opcode: 'getRootData',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get root data',
            arguments: {}
          }
        ]
      };
    }

    // constructor with optional caching (could help performance)
    constructor() {
      this.cache = {};
    }

    // Fetch data from a specific folder in the API
    async getJson(folder) {
      const URL = 'https://unknown07724.github.io/api';
      try {
        // Fix double slash issue if folder is empty
        const path = folder ? `${URL}/${folder}/main.json` : `${URL}/main.json`;

        // check cache first
        if (this.cache[path]) return this.cache[path];

        const res = await fetch(path);
        if (!res.ok) throw new Error(`Error: ${res.status}`);

        const data = await res.json();
        this.cache[path] = data; // save to cache
        return data;
      } catch (err) {
        console.log('Failed for ' + folder, err);
        return null;
      }
    }

    // Block: Get all projects
    async getProjects() {
      const data = await this.getJson('projects');
      if (data) {
        // Return each project with creator and author (as a string for Scratch)
        return JSON.stringify(data.map(p => `${p.creator} (${p.author})`));
      }
      return '[]'; // return empty array if no data
    }

    // Block: Get authors without any arguments
    async getAuthors() {
      const data = await this.getJson('users');  // Always fetch from the 'users' folder
      if (data) {
        return JSON.stringify(data.map(a => `${a.Username} [${a.ID}]`));
      }
      return '[]'; // return empty array if no data
    }

    // Block: Get languages data
    async getLanguages() {
      const data = await this.getJson('langs');
      return data ? JSON.stringify(data) : '[]';
    }

    // Block: Get root API data
    async getRootData() {
      const data = await this.getJson('');
      return data ? JSON.stringify(data) : '{}';
    }
  }

  // Register the extension
  Scratch.extensions.register(new API_Toolbox());

})(Scratch);
