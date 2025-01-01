# Rich Presence
This extension allows you to use Rich Presence in your projects.

## Enabling Rich Presence

The Rich Presence SDK will be automatically downloaded and enabled when a project using the Rich Presence extension is put into the [TurboWarp Packager](https://packager.turbowarp.org/). You will need to select one of these environments:

## Basic Information

Remember that Rich Presence is only properly enabled when your project is packaged in a few specific environments. You can detect if this is the case using:

```scratch
<has rich presence support? :: #4D5057>
```

Then you can log in to the client using:

```scratch
set client id () and log in :: #4D5057
```

You can use this to fetch the current `client id`:

```scratch
(client id :: #4D5057)
```

## Presence Data

Presence Data is what is displayed when Rich Presence is active

Using this will allow you to set data to your Rich Presence:

```scratch
set [details v] to () :: #4D5057
```

It has these menu options:
 - `details`: Specify the details of the activity (Ex. "Traveling to Dango Land!")
 - `state`: Specify the state of the activity (Ex. "Searching for Dangos")
 - `large image key`: Specify the key of the image you want to display as the main image shown on the activity (Ex. "DangoCat" would be the name/key of an image you uploaded to Developer Assets)
 - `large image text`: Specify the text that would display when hovering over the large image (Ex. "Dango Cat!")
 - `small image key`: Same as `large image key` except this is for the smaller image that displays as a circle on the bottom right of the large image (Ex. "OdenDog" would be the name/key of the image you uploaded to Developer Assets)
 - `small image text`: Same as `large image text` except this is for the small image (Ex. "Oden Dog!")
 - `party size`: **[Must be an integer]** Displays next to `state` and specifies the current size of the party. It doesn't have to have anything to do with "parties", so it can be used in other cases (Ex. "2", could be used to say 2 dangos found)
 - `party max`: **[Must be an integer]** Displays next to `party size` and specifies the max party size. Just like `party size`, it doesn't have to be used for "parties" only (Ex. "8", could be used to say 8 dangos total, together with `party size` and `state`, could say "Searching for Dangos (2 of 8)")
 - `JSON`: Allows you to specify the JSON of the Presence Data yourself, so you can use other features not listed on your own. **[Note that `instance` will ALWAYS be overridden to be `false`]**

Using this will allow you to toggle a timestamp on your Rich Presence:

```scratch
turn timestamp [on v] :: #4D5057
```

Finally, this will allow you to fetch the current Presence Data:

```scratch
(rich presence data :: #4D5057)
```

## Setting the Presence

To set the Rich Presence, you first need to check if the client is ready to go, use this to check if it's ready:

```scratch
<is rich presence ready? :: #4D5057>
```

Once it's ready, use this to set the presence:

```scratch
update rich presence :: #4D5057
```

Every time you want to update the presence, run the above block. Here's an example script:

```scratch
when green flag clicked
if <has rich presence support? :: #4D5057> then
  set client id (1234567890123456789) and log in :: #4D5057
  set [details v] to [Hello World!] :: #4D5057
  turn timestamp [on v] :: #4D5057
  forever
    if <is rich presence ready? :: #4d5057> then
      update rich presence :: #4D5057
      wait (4) seconds
```

The Rich Presence SDK has a rate limit of 5 requests per 20 seconds, so you need to roughly follow that. As such, 4 seconds is what we recommend as the minimum.