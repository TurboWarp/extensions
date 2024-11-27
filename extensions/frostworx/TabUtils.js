// Name: Tab Utilities
// ID: tabUTILS
// Description: A collection of blocks that interact with the tab.
// By: Frostworx
// Original: Frostworx
// License: CC-BY-SA-2.0

(async function(Scratch) {
    const variables = {};
    const blocks = [];
    const menus = [];

    
    class Extension {
        getInfo() {
            return {
                "id": "tabUTILS",
                "name": "Tab Utils",
                "color1": "#0088ff",
                "color2": "#0063ba",
                "tbShow": true,
                "blocks": blocks
            }
        }
    }
    blocks.push({
        opcode: `closeTab`,
        blockType: Scratch.BlockType.COMMAND,
        text: `Enable Close Tab Confirmation`,
        arguments: {},
        disableMonitor: true
    });
    Extension.prototype[`closeTab`] = async (args, util) => {
        window.addEventListener('beforeunload', (event) => {
            event.returnValue = `Are you sure you want to leave?`;
        });;
    };

    blocks.push({
        opcode: `changeTitle`,
        blockType: Scratch.BlockType.COMMAND,
        text: `Change title to [TITLE]`,
        arguments: {
            "TITLE": {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Frostworx was here!',
            },
        },
        disableMonitor: true
    });
    Extension.prototype[`changeTitle`] = async (args, util) => {
        document.title = args.TITLE;;
    };

    blocks.push({
        opcode: `changeFav`,
        blockType: Scratch.BlockType.COMMAND,
        text: `Change favicon to [FAV]`,
        arguments: {
            "FAV": {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://extensions.turbowarp.org/dango.png',
            },
        },
        disableMonitor: true
    });
    Extension.prototype[`changeFav`] = async (args, util) => {
        function setFavicons(favImg) {
            let headTitle = document.querySelector('head');
            let setFavicon = document.createElement('link');
            setFavicon.setAttribute('rel', 'shortcut icon');
            setFavicon.setAttribute('href', favImg);
            headTitle.appendChild(setFavicon);
        }
        setFavicons(args.FAV);
    };

    blocks.push({
        opcode: `getTitle`,
        blockType: Scratch.BlockType.REPORTER,
        text: `Title`,
        arguments: {},
        disableMonitor: true
    });
    Extension.prototype[`getTitle`] = async (args, util) => {
        return document.title;
    };

    Scratch.extensions.register(new Extension());
})(Scratch);
