# Steamworks

The Steamworks extension lets you use these Steam APIs:

 - Basic user information (name, id, level, country)
 - Achievements
 - DLC
 - Opening URLs in the Steam Overlay

This extension was not created by and is not supported by Valve. This extension should be considered **alpha** until some real games use it.

## Enabling Steamworks

The Steamworks SDK will be automatically downloaded and enabled when a project using the Steamworks extension is put into the [TurboWarp Packager](https://packager.turbowarp.org/). You'll be asked to provide your game's App ID, which you can find on the Steamworks website. If you don't have an App ID yet, [use the demo game](#demo-game). You will also need to select one of these environments:

 - Electron Windows application (64-bit)
 - Electron macOS application
   (Warning: macOS games published on Steam need to be notarized by Apple, which the packager doesn't support. You can still test your game on a Mac, but you won't be able to publish it for macOS yet.)
 - Electron Linux application (64-bit)

You may have to look under "Other environments" to find some of these. The blocks will not work in the editor, 32-bit environments, ARM environments, plain HTML files, WKWebView, or NW.js. You can still run the blocks, they just won't interact with Steam at all.

You can run the packaged executable directly as usual; you don't need to start the game from Steam for the Steamworks extension to function. However there are a couple caveats when doing this:

 - On macOS and Linux, when not started through Steam, the Steam Overlay may not work
 - On Linux, when not started through Steam, Steamworks may not work if Steam is installed from Flatpak/Snap instead of as a native package

## Security considerations

Using the Steamworks extension will not prevent people from pirating your game.

The Steamworks extension is also inherently client-side, so a cheater could manipulate all of the Steamworks blocks to return whatever they want. You shouldn't use them for things that are security critical.

## Demo game <a name="demo-game"></a>

To test the Steamworks extension without paying for a Steamworks Partner Program membership, you can use the Steamworks demo game. It's called Spacewar and its App ID is `480`. You don't need to install or run Spacewar; rather, you can use its App ID to test various Steamworks APIs as if you were the Spacewar developers.

Spacewar has achievements with the following API Names, which can used for testing the achievement blocks:

 - `ACH_WIN_ONE_GAME`
 - `ACH_WIN_100_GAMES`
 - `ACH_TRAVEL_FAR_ACCUM`
 - `ACH_TRAVEL_FAR_SINGLE`

## Basic information

Remember that Steamworks is only properly enabled when your project is packaged in a few specific environments. You can detect if this is the case using:

```scratch
<has steamworks? :: #136C9F>
```

Then you can get basic information about the user using:

```scratch
(get user (name v) :: #136C9F)
```

## Achievements

Achievements are created on the Steamworks website. The **API Name** of each achievement is what you need to provide in your project's code to the Steamworks extension.

This would unlock the `ACH_WIN_ONE_GAME` achievement from Spacewar:

```scratch
when this sprite clicked
set achievement [ACH_WIN_ONE_GAME] unlocked to (true v) :: #136C9F
```

You can also detect if an achievement has already been unlocked:

```scratch
when flag clicked
forever
    if <achievement [ACH_WIN_ONE_GAME] unlocked? :: #136C9F> then
        say [Unlocked!]
    else
        say [Not unlocked :(]
    end
end
```

## DLC

Each DLC has its own App ID which you can find on the Steamworks website. You can detect if it is installed using:

```scratch
if <(DLC v) [1234] installed? :: #136C9F> then

end
```

## Overlay

The Steamworks extension has a block to open URLs in the Steam Overlay's web browser. If the overlay is not working, it might open in the Steam app instead. If that also doesn't work, it will open in the default web browser. Regardless, packaged projects never display security prompts like "The project wants to open a new window or tab".

```scratch
open (URL v) [https://example.com/] in overlay :: #136C9F
```
