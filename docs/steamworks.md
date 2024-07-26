# Steamworks

The Steamworks extension lets you use these Steam APIs:

 - Basic user information (name, id, level, country)
 - Achievements
 - DLC ownership
 - Opening URLs in the Steam Overlay

## Enabling Steamworks

Steamworks support will be automatically enabled when you [package](https://packager.turbowarp.org/) your project using one of these environments:

 - Electron Windows application (64-bit)
 - Electron macOS application
 - Electron Linux application (64-bit)

The blocks will not work in the editor, in 32-bit environments, or in WKWebView or NW.js. You can still run the blocks safely, they just won't do anything.

When you package a project that uses the Steamworks extension, the packager willl ask you to enter your game's App ID, which you can find on the Steamworks website. See the demo game section below if you don't have one of these yet.

## Steamworks & piracy

Using the Steamworks extension in your game will not meaningfully prevent people from pirating your game.

## Demo game

For testing the Steamworks extension without paying for a Steamworks Partner Program membership, you can use the Steamworks demo game. It's called Spacewar and its App ID is `480`. You don't need to install Spacewar; rather you can use its App ID to test various Steamworks APIs.

Spacewar has achievements which have the following API Names, which can used for testing the achievement blocks:

 - `ACH_WIN_ONE_GAME`
 - `ACH_WIN_100_GAMES`
 - `ACH_TRAVEL_FAR_ACCUM`
 - `ACH_TRAVEL_FAR_SINGLE`

## Basic information

You can detect if Steamworks has been enabled using: (Remember this will only be true when your game is packaged in a few specific environments)

```scratch
<has steamworks? :: #136C9F>
```

Then you can get basic information about the user using:

```scratch
(get user (name v) :: #136C9F)
```

## Achievements

Achievements are created in the Steamworks website. The **API Name** of each achievement is what you need to provide to in your project's code to the Steamworks extension.

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

Each DLC on Steam has its own App ID. You can detect ownership using:

```scratch
if <user owns (DLC v) with ID [1234]? :: #136C9F> then

end
```

## Overlay

You can manually open URLs in the overlay:

```scratch
open (URL v) [https://example.com/] in overlay :: #136C9F
```

The website might open in the Steam app instead if the overlay is not working.
