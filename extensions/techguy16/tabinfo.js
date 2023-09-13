(async function () {
    const getTabSize = () => {
        const tabWidth = window.innerWidth;
        const tabHeight = window.innerHeight;
        return [tabWidth, tabHeight];
    };

    const descriptor = {
        blocks: [
            ['R', 'Tab Width', 'getTabWidth'],
            ['R', 'Tab Height', 'getTabHeight']
        ],
        menus: {},
        url: 'https://github.com/techguy16'
    };

    ScratchExtensions.register('Tab Info', descriptor, {
        getTabWidth: function (callback) {
            const [tabWidth] = getTabSize();
            callback(tabWidth);
        },
        getTabHeight: function (callback) {
            const [, tabHeight] = getTabSize();
            callback(tabHeight);
        }
    });
})();
