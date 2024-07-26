# Steamworks

The Steamworks extension lets you use these Steam APIs:

 - Basic user information (name, id, level, country)
 - Achievements
 - DLC
 - Opening URLs in the Steam Overlay

## Enabling Steamworks

Steamworks support will be automatically enabled when you [package](https://packager.turbowarp.org/) your project using one of these environments:

 - Electron Windows application (64-bit)
 - Electron macOS application
 - Electron Linux application (64-bit)

The blocks will not work in the editor, 32-bit environments, ARM environments, plain HTML files, WKWebView, or NW.js. You can still run the blocks, they just won't interact with Steam at all.

When you package a project that uses the Steamworks extension, the packager willl ask you to enter your game's App ID, which you can find on the Steamworks website. If you don't have an App ID yet, see the demo game section below.

You can run the packaged executable directly as usual; you don't need to start the game from Steam for the Steamworks extension to function. However there are a couple caveats when doing this:

 - On macOS and Linux, when not started through Steam, the Steam Overlay may not work
 - On Linux, when not started through Steam, Steamworks may not work if Steam is installed from Flatpak/Snap instead of as a native package

## Security considerations

Using the Steamworks extension will not prevent people from pirating your game.

The Steamworks extension is also inherently client-side, so a cheater could manipulate all of the Steamworks blocks to return whatever they want. You shouldn't use them for things that are security critical.

## Demo game

To test the Steamworks extension without paying for a Steamworks Partner Program membership, you can use the free Steamworks demo game. It's called Spacewar and its App ID is `480`. You don't need to install Spacewar; rather, you can use its App ID to test various Steamworks APIs.

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
