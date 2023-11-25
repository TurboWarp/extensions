# WebSocket

This extension lets you communicate directly with most [WebSocket](https://en.wikipedia.org/wiki/WebSocket) servers. This is the protocol that things like cloud variables and Cloudlink use.

These are rather low level blocks. They let you establish the connection, but your project still needs to know what kinds of messages to send and how to read messages from the server.

## Blocks

```scratch
connect to [wss://...] :: #307eff
```
You have to run this block before any of the other blocks can do anything. You need to provide a valid WebSocket URL.

The URL should start with `ws://` or `wss://`. For security reasons, `ws://` URLs will usually only work if the WebSocket is running on your computer (for example, `ws://localhost:8000`).

Something simple to play with is the echo server: `wss://echoserver.redman13.repl.co`. Any message you send to it, it'll send right back to you.

Note that connections are **per sprite**. Each sprite (or clone) can connect to one server at a time. Multiple sprites can connect to the same or different servers as much as your computer allows, but note those will all be separate connections.

---

```scratch
when connected :: hat #307eff
```
<br>

```scratch
<is connected? :: #307eff >
```
Connecting to the server can take some time. Use these blocks to know when the connection was successful. After this, you can start sending and receiving messages.

When the connection is lost, any blocks under the hat will also be stopped.

---

```scratch
when message received :: hat #307eff
```
<br>

```scratch
(received message data :: #307eff)
```

These blocks let you receive messages from the server. The hat block block will run once for each message the server sends with the data stored in the round reporter block.

Note that WebSocket supports two types of messages:

 - **Text messages**: The data in the block will just be the raw text from the server.
 - **Binary messages**: The data in the block will be a base64-encoded data: URL of the data, as it may not be safe to store directly in a string. You can use other extensions to convert this to something useful, such as fetch, depending on what data it contains.

If multiple messages are received in a single frame or if your message processing logic causes delays (for example, using wait blocks), messages after the first one will be placed in a **queue**. Once your script finishes, if there's anything in the queue, the "when message received" block will run again the next frame.

---

```scratch
send message (...) :: #307eff 
```

This is the other side: it lets you send messages to the server. Only text messages are supported; binary messages are not yet supported.

There's no queue this time. The messages are sent over as fast as your internet connection and the server will allow.

---

```scratch
when connection closes :: hat #307eff
```
<br>

```scratch
<is connection closed? :: #307eff>
```
<br>

These let you detect when either the server closes the connection or your project closes the connection. They don't distinguish. Note that connections have separate blocks.

Servers can close connections for a lot of reasons: perhaps it's restarting, or perhaps your project tried to do something the server didn't like.

```scratch
(closing code :: #307eff)
```
<br>

```scratch
(closing message :: #307eff)
```

These blocks can help you gain some insight. Closing code is a number from the WebSocket protocol. There is a [big table](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent/code#value) of possible values, but generally there is very little to gain from looking at these.

Servers can also send a text "reason" when they close the connection, although almost no servers actually do this.

```scratch
close connection :: #307eff
```
<br>

```scratch
close connection with code (1000) :: #307eff
```
<br>

```scratch
close connection with reason (...) and code (1000) :: #307eff
```

Your project can also close the connection whenever it wants. All of these blocks do basically the same thing.

Just like how the server can send a code and a reason when it closes the connection, you can send those to the server. Note some limitations:

 - **Code** can be either the number 1000 ("Normal Closure") or an integer in the range 3000-4999 (meaning depends on what server you're talking to). Anything not in this range will be converted to 1000. Few servers will look at this.
 - **Reason** can be any text up to 123-bytes long when encoded as UTF-8. Usually that just means up to 123 characters, but things like Emoji are technically multiple characters. Regardless very few servers will even bother to look at this.

---

```scratch
when connection errors :: hat #307eff
```
<br>

```scratch
<is connection errored? :: #307eff>
```

Sometimes things don't go so well. Maybe your internet connection died, the server is down, or you typed in the wrong URL. There's a lot of things that can go wrong. These let you try to handle that.

Unfortunately we can't give much insight as to what caused the errors. Your browser tells us very little, but even if it did give us more information, it probably wouldn't be very helpful.

A connection can either close or error; it won't do both.
