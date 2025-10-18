# Local Storage

The local storage etension allows you to automatically save plain text in a storage space provided by the browser. Forget save codes! With this extension, we can make a game that doesn't require any user interaction to save progress.

## Namespaces

A namespace is basically like the file in the browser's storage you want to save your codes in. Every project should use a unique namespace. If two projects use the same namespace, then they will overwrite each other's storage and they'll probably both end up broken :(

By default, the extension generates a random namespace for you and saves this inside the project, **so you shouldn't need to worry about managing the namespace yourself**. You should still be aware of what a namespace is since changing it could break your project.

In older versions of the extension, it was necessary to configure the namespace by running the set namespace block at the start of your project. This block should not be needed anymore unless you are doing something very advanced. For example, if you want to access variables stored in another project, you can find that project's namespace and then set your namespace to the same thing. This would let you access the values that project stored.

## Basic usage

Think of local storage as providing a special type of variable that automatically persists between sessions. Rather than using the "Make a Variable" button to make a new variable, you just type its name into an input. Unlike normal cloud variables, local storage is not restricted to just numbers.

To put a value into storage, use this block:

```scratch
set [score] to [1000] in storage :: #0FBD8C
```

This sets the `score` variable to `1000` only within your project's namespace. You can retrieve the variable later using:

```scratch
(get [score] from storage :: #0FBD8C)
```

You can of course set a variable to something based on its old value, just like with regular variables. For example, this will increase the stored score by 10 every time it runs:

```scratch
set [score] to ((get [score] from storage :: #0FBD8C) + [10]) in storage :: #0FBD8C
```

To delete something from storage, use this block:

```scratch
delete [score] from storage :: #0FBD8C
```

Or delete everything stored in the namespace:

```scratch
delete storage :: #0FBD8C
```

## Performance

The local storage extension is inevitably slower than regular variables.

Reading from storage is actually decently fast, though still slower than regular variables. However, putting values into storage is quite a bit slower since the extension tries to immediately save any changes the moment the block runs.

To better illustrate, these two pieces of code both set `counter` to `1000` in storage. However, the second one will be much faster because it only actually writes to storage one time while the first one will do so 1000 times.

```scratch
define slow
set [counter] to [1] in storage :: #0FBD8C
repeat [1000]
    set [counter] to ((get [counter] from storage :: #0FBD8C) + [1]) in storage :: #0FBD8C
end

define faster
set [counter v] to [1]
repeat [1000]
    change [counter v] by [1]
end
set [counter] to (counter) in storage :: #0FBD8C
```

## Changes in other windows

Sometimes a user may open the same project in multiple tabs or windows, each of which could be trying to read stuff from storage and put new values in. This might cause your project to misbehave without careful consideration.

Here's an example scenario. Suppose you have a game, and at the start of your game you load in information about the user's progress like this:

```scratch
when gf clicked
set [level v] to (get [level] from storage :: #0FBD8C)
set [gold v] to (get [gold] from storage :: #0FBD8C)
set [name v] to (get [name] from storage :: #0FBD8C)
```

As your game advanced, you make sure to use the "set in storage" block to save the player's progress. All seems good.

Unfortunately, there is a scenario that might cause a lot of grief. Suppose the player opens two copies of your game at once on accident without noticing. They play in Window A for a while and assume their progress is being saved. Then they close that window and do something else. Later, they come back to the other window they had opened before and start playing in Window B, but all the progress is "gone" because that window had already been running the game and had already loaded save data before Window A had saved the progress that was made, and it's too late because they had saved the game in Window B before they realized the problem.

The "correct" behavior to do in this type of scenario is heavily context-dependent, thus the extension can't solve this for you. You'll need to write some scripts if this preventing this scenario is important. Here are some possible ways to deal with the problem:

## Read and write all at once

For projects are confident they will only be open in one window at once or that rely on manual saving where indiscriminently overwriting the old save is the expected outcome, the simplest approach is to read all values from storage into regular variables at the start, then your game does all its logic using just the regular variables. To save, your game puts these regular variabels back in storage. Here's what that looks like:

```scratch
when i receive [start v]
set [mana v] to (get [mana] from storage :: #0FBD8C)
set [cookies v] to (get [cookies] from storage :: #0FBD8C)

when i receive [save v]
set [mana] to (mana) in storage :: #0FBD8C
set [cookies] to (cookies) in storage :: #0FBD8C
```

Pros:

 * Very simple.
 * Changes in another window will not affect your local variables.

Cons:

 * Changes in other windows will be indiscriminently overwritten on each save.
 * This may result in data loss, depending on the context.

## Constantly reading from storage

For projects where having multiple windows open at once is expected and storage changes in one project should immediately appear in the other, the simplest approach is to always be re-reading the variable from storage every time you use it. Here's what that looks like:

```scratch
when gf clicked
forever
    say (join [Coins: ] (get [coins] from storage :: #0FBD8C))
end

when this sprite clicked
set [coins] to ((get [coins] from storage :: #0FBD8C) + [1]) in storage :: #0FBD8C
```

Because changes to storage are always being re-read instead of being stored in a local storage, changes in one window will immediately propagate to the other. In the case of simple counters, this may be sufficient.

Pros:

 * Still pretty simple.
 * Avoid unnecessary variable.
 * Changes to storage are instantly available to all windows at the same time.

Cons:

 * Reading from storage is slightly slower than regular variables, even when nothing has changed since the last read.
 * May not work well for anything more complicated than a counter.

## Reloading data as it changes

The local storage extension offers an event block to detect arbitrary storage changes by other windows. This takes a bit of extra code, but it is the most flexible approach and essentially combines the benefits of the above approahes for projects that need to have storage sync between open windows. The simplest form of it is:

```scratch
when another window changes storage :: hat #0FBD8C
set [silver v] to (get [silver] from storage :: #0FBD8C)
```

Pros:

 - You can access your data in a regular variable, so it's fast.
 - Your data changes in response to other windows.
 - You get a lot more control. Instead of just taking the new value from storage as-is, you could process it in any way you want before storing it in a local variable.

Cons:

 - A bit more complex.
 - Due to block execution order, the rest of your projects may execute for a frame before the change event runs. This might cause a 1 frame delay before the local variable is updated.

## Local storage limits

This extension uses the browser's local storage API, which limits each website to around 5 MB of data, so if we want local storage to be able to hold data for many projects, each one should stay well below this limit. We recommend only storing small files such as game save data or settings in local storage.

The TurboWarp Desktop app and the Electron environments in the packager raise the storage size limit to 100 MB. However, we do not recommend storing anywhere near that much in local storage.

In rare instances, such as when a system is running out of disk space, the browser may start deleting data at random to make room for something else. We, unfortunately, cannot influence when this happens.
