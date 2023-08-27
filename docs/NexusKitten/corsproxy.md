# CORS Proxies

The CORS Proxy extension is an extension to easily add CORS proxies to fetch requests, or to send fetch requests with built-in CORS proxies.

## What is CORS?

CORS, or Cross-Origin Resource Sharing, is a browser mechanism that allows one website to fetch information from another. For example, CORS would be used to grab information from GitHub on the TurboWarp website.
However, most websites don't support CORS off the bat. With the exception of certain APIs, most sites will return an error when you try to fetch from them.

## What is a CORS Proxy?

A CORS proxy is a website that accepts CORS fetch requests, and is specially designed to fetch from other sites, even if they don't support CORS. It essentially acts as a middle man; when a fetch request is sent to a CORS proxy, it then sends a special fetch request to the site, and returns the data without CORS errors. Most CORS proxies are free for use as long as the files requested aren't too large or frequent.

## Extension Blocks

Although it's relatively simple to modify fetch requests to include a CORS Proxy, [this extension](https://extensions.turbowarp.org/NexusKitten/corsproxy.js) includes 3 blocks to make the process simpler.

```scratch
([] CORS protected :: #376661)
```

Modifies the inputted URL to go through a CORS proxy. This can be used in conjunction with extensions such as ShovelUtils. The block may cause issues if the inputted URL already uses a CORS proxy.

```scratch
(fetch [] CORS protected :: #376661)
```

Sends a fetch request with a built in CORS proxy. The block may cause issues if the inputted URL already uses a CORS proxy.

```scratch
change proxy to [corsproxy v] :: #376661
```

Choose between 2 CORS proxy providers. The ones provided are [corsproxy.io](https://corsproxy.io) and [allorigins](https://allorigins.win). The latter of these two does not support images.
