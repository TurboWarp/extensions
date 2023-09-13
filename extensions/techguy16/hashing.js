(async function () {
    async function loadScript(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    async function sha1Hash(input) {
        if (typeof calcSHA1 !== 'function') {
            await loadScript('https://techguy16.github.io/xpkeygen-js/sha1.js');
        }

        const hash = calcSHA1(input);
        return hash;
    }

    async function sha256Hash(input) {
        if (typeof sha256 !== 'function') {
            await loadScript('https://web.archive.org/web/20151121160242if_/https://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha256.js?_=1448121771646');
        }

        const hash = CryptoJS.SHA256(input).toString();
        return hash;
    }

    async function md5Hash(input) {
        if (typeof md5 !== 'function') {
            await loadScript('https://web.archive.org/web/20151121123050if_/http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js');
        }

        const hash = CryptoJS.MD5(input).toString();
        return hash;
    }

    const descriptor = {
        blocks: [
            ['R', 'SHA-1 of %s', 'sha1Hash', 'Hello, world!'],
            ['R', 'SHA-256 of %s', 'sha256Hash', 'Hello, world!'],
            ['R', 'MD5 of %s', 'md5Hash', 'Hello, world!']
        ],
        menus: {},
        url: 'https://github.com/techguy16'
    };

    ScratchExtensions.register('Hashing', descriptor, {
        sha1Hash: function (input, callback) {
            sha1Hash(input).then(hash => {
                // Call the callback to return the hash value to the variable attached to the block
                callback(hash);
            });
        },
        sha256Hash: function (input, callback) {
            sha256Hash(input).then(hash => {
                callback(hash);
            });
        },
        md5Hash: function (input, callback) {
            md5Hash(input).then(hash => {
                callback(hash);
            });
        }
    });
})();
