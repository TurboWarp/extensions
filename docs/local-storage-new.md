# Local Storage

This extension allows you to automatically save plain text in storage. Forget save codes! With this extension, we can make a game that doesn't require any user interaction to save progress.

## Namespaces

The namespace is basically like the file you want to read and write to. Each project should set this to something unique, such as developer/project title so each project gets its own storage space. If two different projects use the same namespace, they will overwrite eachother's data and cause very bad things!

You can set which namespace to use with this block:

```scratch
set storage namespace ID to [project title] :: #0FBD8C
```

Some example namespaces:

 - `griffpatch/Paper Minecraft`
 - `Untitled-37 by TestMuffin`

The format isn't important -- it just needs to be unique. Don't include a version number like "v1.4" in the namespace unless you want to discard data from old versions of your project.

## Reading and writing

After setting the namespace, you're ready to read from and write to storage.

You can store data in keys, which are kind of like names of variables in any Scratch project, except they persist between sessions.

You can store data in storage keys with this block:

```scratch
set key [score] to [1000] :: #0FBD8C
```

And read it with:

```scratch
(get key [score] :: #0FBD8C)
```

If you want to delete a key and its value, use this block:

```scratch
delete key [score] :: #0FBD8C
```

Or wipe everything stored in the namespace:

```scratch
delete all keys :: #0FBD8C
```

## Loading data into memory

Relying on the disk to read information that gets saved such as a player's progress or stats can be pretty slow. That's why it's very useful to store this data in variables while it's in use. Variables are like your project's random-access memory. One way of doing this is by getting all keys from storage and putting their values in variables as part of your project's initialization process.

If you're unfamiliar with computer memory, think of reading local storage as opening up your dictionary to look for a definition for someone and reading memory as remembering the definition you just read and saying it to someone. Of course, you wouldn't want to be constantly running to get the dictionary every time the same definition was requested.

While browsers actually hold this data in memory automatically for quicker access, it's still more efficient and a better practice to take some work off the browser by not constantly getting the same storage key over and over again for no reason, and is much more important to know and think about if you ever use other programming languages where you don't want the disk to have to spend time reading the same data over and over again when it could be kept in memory (that's what memory is for).

For example, in a game, you can speed up code that needs to know how many coins the player has collected by getting the storage key for coins and then loading it into a variable, just once on startup.

```scratch
forever
    if <(get key [coins] :: #0FBD8C) > [99]> then // Don't do this
        broadcast (1-UP v)
    end
end

set [coins v] to (get key [coins] :: #0FBD8C) // Do this instead
forever
    if <(coins) > [99]> then
        broadcast (1-UP v)
    end
end
```

So in general, we don't really need to load data from storage again once we have it in memory. If we already know what's in storage and what we're writing to storage because that data is already present in the project's variables, we really only need to read from storage once to initialize and then we're good.

...Right?

## Handling interference from other windows

Sometimes a user may open the same project in multiple tabs or windows, each of which could be trying to read and write data to the same space. If this causes a desync, it can result in unexpected behavior.

Here's an example scenario. Suppose someone opens the same game twice by accident. They play in Window A for a while and save the game. Then they close that window and do something else. Later, they come back to the other window they had opened before and start playing in Window B, but all the progress is "gone" because that window had already been running the game and had already loaded the save data before Window A had saved the progress that was made, and it's too late because they had saved the game in Window B before they realized the problem. This is unfortunate for the player, but more importantly for you, the developer, what is the project supposed to do now? Mix the data?

So you can see how it's a good idea to consider that people may have multiple windows of the same project open intentionally or accidentally.

You don't have to do things like auto-refresh content if you didn't intend for your project to support multi-window usage, but it's nice to at least make sure no glitches happen if someone accidentally had multiple windows open. Here are a few ways you can deal with this problem:

## Initialize by loading from storage

For games and other projects that are intended for use only in one window, we recommend you load all storage keys you need into variables only when the project starts so that nothing changes if a second instance of the project writes to storage while you're still using the first one. Then, when you need to save data, rewrite everything in the same group of data (like everything in the same save file in a game) to storage at the same time so nothing from other instances of the project gets mixed in.

The worst that could happen with this implementation is that "data A" might be overwritten by "data B", if the user made a mistake.

## Reload data from storage as needed

Sometimes you might want to respond to changes in local storage. There is a block to help with this:

```scratch
when another window changes storage :: hat #0FBD8C
```

The code under this block will run whenever a different instance of the project writes to storage or if a different project that's using the same namespace writes to storage. This allows your project to properly respond to and handle these events as they happen.

This may or may not be important. You probably wouldn't want to use this technique in a game - games don't need to respond to other instances of themselves writing to storage. Plus, if game save data from one window is mixed in with data from another, it can cause glitches like sequence breaks.

This kind of thing is more useful if you made something like a file system simulator that you want to have auto-refresh if the user makes edits in other windows, you may want to use this so that the content being displayed stays up to date even if another window modifies it.

You could do this by constantly getting the storage key, but it's better to only grab keys from storage when necessary. The block above is how you do that.

## Merge the data

This one is more advanced and the way you would code it depends on the project, but you could make it so that when you're about to save data and another window wrote data that was not loaded into the first window, the two are merged - the data being written is merged with the data that was already present, so that if you collected 100 coins in one session and 100 XP in another, both of those changes in the save data would stay.

Make sure to do this correctly because if data is merged incorrectly, it can cause glitches like sequence breaks in a game.

I said that this is advanced, because sometimes these algorithms can get confused when merging changes to the same piece of data. (Like, what are we supposed to do if we're trying to merge two changes, one of which changes "A" to "B" and the other changes the same "A" to "C"?) This is known as a merge conflict. If you don't have any way to prioritize one change over another, you'll just be stuck with two branches of data.

## Local storage limits

This extension uses the browser's local storage API, which limits each website to around 5 MiB or 5,242,800 bytes of local storage data, so if we want local storage to be able to hold data for many projects, each one should stay well below this limit. We recommend only storing small files such as game save data or settings in local storage.

In rare instances, such as when a system is running out of disk space, the browser may delete our data to make room for something else. We, unfortunately, cannot influence when this happens.
