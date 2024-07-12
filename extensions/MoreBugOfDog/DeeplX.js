// Name: DeeplX Translate
// ID: morebugofdogdeepl
// Description: Alternative translation extension that uses DeeplX instead of Google Translate.
// By: MoreBugOfDog
// License: MPL-2.0

((Scratch) => {
  'use strict';

  const icon =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTQiIGhlaWdodD0iNjgiIHZpZXdCb3g9IjAgMCA1NCA2OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAuMTg3NSAxNy4yNzQxVjQ0LjA4NDhDMC4xODc1IDQ1LjQ3NzUgMC45MTc4MTMgNDYuNzU0MiAyLjEwOTM4IDQ3LjQ1MDZMMjUuMTcxOSA2MC44MzY2QzI2LjM2MzQgNjEuNTMzIDI3LjgyNDEgNjEuNTMzIDI5LjAxNTYgNjAuODM2Nkw1Mi4wNzgxIDQ3LjQ1MDZDNTMuMjY5NyA0Ni43NTQyIDU0IDQ1LjQ3NzUgNTQgNDQuMDg0OFYxNy4yNzQxQzU0IDE1Ljg4MTMgNTMuMjY5NyAxNC42MDQ2IDUyLjA3ODEgMTMuOTA4M0wyOS4wMTU2IDAuNTIyMjg1QzI3LjgyNDEgLTAuMTc0MDk1IDI2LjM2MzQgLTAuMTc0MDk1IDI1LjE3MTkgMC41MjIyODVMMi4xMDkzOCAxMy45NDdDMC45MTc4MTMgMTQuNjQzMyAwLjE4NzUgMTUuOTIgMC4xODc1IDE3LjI3NDFaIiBmaWxsPSIjMEYyQjQ2Ii8+CjxwYXRoIGQ9Ik0zNi43MDMxIDY3LjUzMDNMMzYuNjY0NyA2MS43MjcxTDM2LjcwMzEgNTYuMzg4MkwyMy4yNSA1OS43MTUzIiBmaWxsPSIjMEYyQjQ2Ii8+CjxwYXRoIGQ9Ik0zNi4wODc5IDU1LjkyMzhMMzguNjI0OCA1NS4yNjYxTDM3LjY2MzggNTUuODA3N0MzNy4wODczIDU2LjE1NTkgMzYuNzAyOSA1Ni43NzQ5IDM2LjcwMjkgNTcuNDcxM1Y1OC41NTQ2TDM2LjA4NzkgNTUuOTIzOFoiIGZpbGw9IiMxNDJDNDYiLz4KPHBhdGggZD0iTTE3Ljc5MDQgMTguNDc0NEMxOS4zMjc5IDE2Ljk2NTYgMjEuNzg3OSAxNi45NjU2IDIzLjMyNTQgMTguNDc0NEMyNC45NzgyIDIwLjA2MDYgMjQuOTc4MiAyMi42OTE0IDIzLjMyNTQgMjQuMjc3NkMyMS43ODc5IDI1Ljc4NjQgMTkuMzI3OSAyNS43ODY0IDE3Ljc5MDQgMjQuMjc3NkMxNi4xMzc2IDIyLjY5MTQgMTYuMTM3NiAyMC4wNjA2IDE3Ljc5MDQgMTguNDc0NFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0zNS4wODczIDI4LjU3MTZDMzYuNjI0OCAyNy4wNjI3IDM5LjA4NDggMjcuMDYyNyA0MC42MjIzIDI4LjU3MTZDNDIuMjc1MSAzMC4xNTc4IDQyLjI3NTEgMzIuNzg4NSA0MC42MjIzIDM0LjM3NDdDMzkuMDg0OCAzNS44ODM2IDM2LjYyNDggMzUuODgzNiAzNS4wODczIDM0LjM3NDdDMzMuNDM0NSAzMi43ODg1IDMzLjQzNDUgMzAuMTU3OCAzNS4wODczIDI4LjU3MTZaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTcuNzkwNCAzOS4yNDk4QzE5LjMyNzkgMzcuNzQxIDIxLjc4NzkgMzcuNzQxIDIzLjMyNTQgMzkuMjQ5OEMyNC45NzgyIDQwLjgzNiAyNC45NzgyIDQzLjQ2NjggMjMuMzI1NCA0NS4wNTNDMjEuNzg3OSA0Ni41NjE4IDE5LjMyNzkgNDYuNTYxOCAxNy43OTA0IDQ1LjA1M0MxNi4xMzc2IDQzLjQ2NjggMTYuMTM3NiA0MC44MzYgMTcuNzkwNCAzOS4yNDk4WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTIyLjQ4MDUgMjMuNTQxOUwzNC4wMTE3IDMwLjIzNDlMMzUuOTMzNiAyOS4xNTE2TDI0LjQwMjMgMjIuNDE5OUwyMi40ODA1IDIzLjU0MTlaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMzQuNzgwNSAzNS4xNDgyTDI0LjQwMjMgNDEuMTgzNUwyMi40ODA1IDQwLjA2MTZMMzIuODU4NiAzNC4wNjQ5TDM0Ljc4MDUgMzUuMTQ4MloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=";

  const languages = [
    {
      text: 'English',
      value: 'en'
    },
    {
      text: 'Chinese',
      value: 'zh'
    }
  ];

  class DeeplX {
    getInfo() {
      return {
        id: "morebugofdogdeepl",
        name: Scratch.translate("Deepl"),
        color1: "#0f2b46",
        blockIconURI: icon,
        menuIconURI: icon,
        blocks: [
          {
            blockType: Scratch.BlockType.REPORTER,
            opcode: "render",
            text: Scratch.translate("translate [text] from [original] to [to]"),
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello World",
              },
              original: {
                type: Scratch.ArgumentType.STRING,
                menu: 'language'
              },
              to: {
                type: Scratch.ArgumentType.STRING,
                menu: 'language'
              },
            },
          },
        ],
        menus: {
          language: {
            acceptReporters: true,
            items: languages
          }
        }
      };
    }

    async render(args) {
      try {
        const res = await Scratch.fetch('https://api.deeplx.org/translate', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            text: Scratch.Cast.toString(args.text),
            source_lang: Scratch.Cast.toString(args.original),
            target_lang: Scratch.Cast.toString(args.to),
          })
        });
        if (!res.ok) {
          return '';
        }
        const json = await res.json();
        return Scratch.Cast.toString(json.data);
      } catch (e) {
        return '';
      }
    }
  }

  Scratch.extensions.register(new DeeplX());
})(Scratch);
