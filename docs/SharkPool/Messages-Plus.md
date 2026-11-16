# Messages+

Messages+ is an extension that builds on the existing broadcast blocks in Scratch.
It adds new ways to broadcast messages, receive messages, send data, respond to broadcasts, and more.

This extension works in parallel to the regular broadcast blocks.

## Block Overviews

```scratch
when any broadcast is received::hat #FFBF00
```

This block triggers automatically every time **any** message is broadcasted across the project.

```scratch
(broadcast name::#FFBF00)
```

This reporter block returns the exact name of the received message.
It must be placed inside a "when I receive" or "when any broadcast is received" script to function.

**Important:** If the broadcast was sent using a dynamic message (i.e., a message that does not appear in the broadcast message dropdown), this block returns the message name in uppercase (`message1` becomes `MESSAGE1`). This behavior is an inherent limitation of Scratch and cannot be changed.

```scratch
broadcast (message1 v) to (all sprites v) and [continue v]::#FFBF00
```

Broadcasts the specified message to the selected sprites.

The **sprites** dropdown controls which sprites will receive the broadcast:

- **`all sprites`** - Every sprite, its clones, and the stage will receive the broadcast
- **`stage`** - Only the stage will receive the broadcast
- **`myself and clones`** - The sprite containing this block and its clones will receive the broadcast
- **`myself only`** - The single sprite or clone containing this block will receive the broadcast
- **Any other option** - The selected sprite and all of its clones will receive the broadcast

The final dropdown controls whether the block waits for the broadcasts to finish:

- **`continue`** - Continues running the script after sending the broadcast
- **`wait`** - Pauses the script until every triggered broadcast script finishes executing

```scratch
broadcast (message1 v) with data (...) to (all sprites v) and [continue v]::#FFBF00
```

Broadcasts the specified message to the selected sprites while sending a value to the receiving scripts (or 'receivers').

This block behaves the same as the previous broadcast block, but includes a data input.
You can pass any value through this input, allowing the receivers to access additional
information associated with the broadcast. This works similarly to passing an argument to a function.

```scratch
broadcast [\["message1", "message2"\]] with data (...) to (all sprites v) and [continue v]::#FFBF00
```

Broadcasts multiple messages simultaneously to the selected sprites while sending a value to the receiving scripts (or 'receivers').

This block behaves the same as the previous broadcast with data block, except the message input is replaced with an array of message names.
Each message in the array is broadcasted at the same time to the selected sprites. Duplicate message names are ignored, so each unique message is only broadcasted once.

The data passed is shared across all broadcasts.

If the input is not a valid array, the block does nothing.

```scratch
(received data::#FFBF00)
```

Returns the data that was passed to the current broadcast.

This reporter can only be used inside a "when I receive" or "when any broadcast is received" script.
If it is used outside of those scripts, it will return nothing as it does not have an active broadcast to retrieve data from.

```scratch
(received data from (message1 v) in (all sprites v)::#FFBF00)
```

Returns the data that was passed with a **currently running** broadcast script that matches the specified message and sprite target.

Unlike the "received data" reporter, this can retrieve data from another script with a matching broadcast that is currently being executed,
not just the one that triggered the current script.

This only inspects standard "when I receive" scripts. Data carried by "when any broadcast is received" scripts or the extension's dynamic "when I receive" hat is not retrieved.

If no matching "when I receive" script is actively running, this reporter will return nothing.

```scratch
(broadcast (message1 v) to (all sprites v)::#FFBF00)
```

Broadcasts the specified message to the selected sprites and returns the response or responses from the receiving scripts.

The value returned depends on the **multiple responses** setting for the message. If multiple responses are enabled, an array containing all responses is returned. Otherwise, only the first response is returned.

The **sprites** dropdown behaves the same as in the broadcast command blocks.

```scratch
(broadcast (message1 v) with data (...) to (all sprites v)::#FFBF00)
```

Broadcasts the specified message to the selected sprites while sending a value to the receiving scripts, then returns the response or responses from those scripts.

As with the previous reporter, the return value depends on the **multiple responses** setting for the message.

Any value can be passed through the **data** input, allowing the receiving scripts to access additional information while processing the broadcast.

```scratch
respond [received!]::#FFBF00 cap
```

Sends a response back to the broadcaster. This block can only be used inside a "when I receive" or "when any broadcast is received" script.

The value inputted is returned by the broadcast reporter blocks. If multiple responses are enabled for the message, it becomes one entry in the returned array of responses; otherwise it may be returned as the single response.

```scratch
<is (message1 v) received?::#FFBF00>
```

Returns `true` **once** when the specified message was broadcast. Each copy of this block returns `true` once when the broadcast happens, then false until it is broadcast again.

Each copy of this block tracks its has-received status separately. One script checking for the message will not prevent another script or block from additionally detecting it.

```scratch
<is (message1 v) waiting?::#FFBF00>
```

Returns `true` if there is currently an active broadcast script running.

This means at least one **`when I receive`** or **`when any broadcast is received`** script is currently running for the selected message.
If no matching broadcast scripts are active, it returns `false`.

```scratch
(receivers of (message1 v)::#FFBF00)
```

Returns an array of all sprites that have a standard "when I receive" script for the specified message.

Sprites that only handle the message through a "when any broadcast is received" script or the extension's dynamic "when I receive" hat are not included.

```scratch
set script restart for (message1 v) to [on v]::#FFBF00
```

Controls whether a broadcasted script should restart when the same message is received again.

When **on**, re-broadcasting the same message will restart any currently running scripts for that message.

When **off**, sending the same broadcast message again will not restart an already running script. Instead, the existing instance continues running.

By default, script restarting is **enabled (on)**.

```scratch
set script overlap for (message1 v) to [on v]::#FFBF00
```

Controls whether multiple instances of the same broadcast script can run at the same time.

When **on**, sending the same broadcast message while it is already running will create additional parallel instances of the script.

When **off**, only one instance of the script is allowed to run at a time for that message.

By default, script overlapping is **disabled (off)**.

```scratch
set multiple responses for (message1 v) to [on v]::#FFBF00
```

Controls whether the reporter broadcast blocks return a single response or all responses for the specified message.

When **on**, every response sent by receivers of that message is collected and returned.

When **off**, only the first response is returned for that message.

By default, multiple responses is **disabled (off)**.

```scratch
when I receive (message1 v)::#FFBF00 hat
```

Executes the script when the specified broadcast message is received.

This block behaves like the standard "when I receive" event hat block,
but the message input can be dynamically set using any string value rather than a fixed dropdown option.

Since the message is evaluated dynamically at runtime, this version may execute _slightly slower_ than the standard fixed-message variant.
