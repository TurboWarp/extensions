# Game Jolt API
This extension allows you to easily implement the Game Jolt API using a public domain library.
## Blocks
Blocks that the extension uses to send requests to the Game Jolt API.

```scratch
<on game jolt? :: #2F7F6F>
```
Checks to see if the URL is the Game Jolt website.
### Session Blocks
Operating on the game's session.

```scratch
set game ID to (0) and private key [private key] :: #2F7F6F
```
This block is required for all requests to work.

---
```scratch
[Open v] session :: #2F7F6F
```
Opens/closes a game session.
- You must ping the session to keep it open and you must close it when you're done with it.

When you login the session is opened automatically.

---
```scratch
ping session :: #2F7F6F
```
Pings an open session.
- If the session hasn't been pinged within 120 seconds, the system will close the session and you will have to open another one.
- It's recommended that you ping about every 30 seconds or so to keep the system from clearing out your session.

When the session is opened it is pinged every 30 seconds automatically.
- You can ping it manually to update the session status.

---
```scratch
set session status to [active v] :: #2F7F6F
```
Sets the session status to active/idle.
- Ping the session to update it's status.

---
```scratch
<session open? :: #2F7F6F>
```
Checks to see if there is an open session for the user.
- Can be used to see if a particular user account is active in the game.
### User Blocks
Login, logout and fetch users.

```scratch
login with [username] and [private token] :: #2F7F6F
```
This block is required for all user based requests to work.

Requires to not be logged in.
- When logged in on the Game Jolt website and the game is played on Game Jolt, the user is logged in automatically.

---
```scratch
login automatically :: #2F7F6F
```
Does automatic login after logout.

Requires to not be logged in.
- Requires to be logged in on the Game Jolt website and for the game to be played on Game Jolt.

---
```scratch
auto login available? :: #2F7F6F
```
Checks to see if the user is logged in on the Game Jolt website and the game is played on Game Jolt.

---
```scratch
logout :: #2F7F6F
```
Logs out the user, the game session is then closed.

Requires to be logged in.

---
```scratch
<logged in? :: #2F7F6F>
```
Checks to see if the user is logged in.

---
```scratch
logged in user's username :: #2F7F6F
```
Returns the logged in user's username.

Requires to be logged in.

---
```scratch
fetch user's [username] by [username v] :: #2F7F6F
```
Fetches user data based on the user's username or the ID

---
```scratch
fetch logged in user :: #2F7F6F
```
Fetches logged in user data.

Requires to be logged in.

---
```scratch
(fetched user's [ID v] :: #2F7F6F)
```
Returns fetched user's data by passed key.

---
```scratch
(fetched user's data in JSON :: #2F7F6F)
```
Returns fetched user's data in JSON.

---
```scratch
fetch user's friend IDs :: #2F7F6F
```
Fetches user's friend IDs.

Requires to be logged in.

---
```scratch
(fetched user's friend ID at index (0) :: #2F7F6F)
```
Returns fetched user's friend ID at passed index.

---
```scratch
(fetched user's friend IDs in JSON :: #2F7F6F)
```
Returns fetched user's friend IDs in JSON.
### Trophy Blocks
Achieve, remove and fetch trophies.

```scratch
achieve trophy of ID (0) :: #2F7F6F
```
Achieves trophy of passed ID.

Requires to be logged in and for the trophy to not be achieved.

---
```scratch
remove trophy of ID (0) :: #2F7F6F
```
Removes trophy of passed ID.

Requires to be logged in and for the trophy to be achieved.

---
```scratch
fetch trophy of ID (0) :: #2F7F6F
```
Fetches trophy of passed ID.

Requires to be logged in.

---
```scratch
fetch [all v] trophies :: #2F7F6F
```
Fetches game trophies:
- All - fetches all trophies.
- All achieved - fetches all achieved trophies.
- All unachieved - fetches all unachieved trophies.

Requires to be logged in.

---
```scratch
(fetched trophy [ID v] at index (0) :: #2F7F6F)
```
Returns fetched trophy data at passed index by passed key.

---
```scratch
(fetched trophies in JSON :: #2F7F6F)
```
Returns fetched trophy data in JSON
### Score Blocks
```scratch
add score (1) in table of ID (0) with text [1 point] and comment [optional] :: #2F7F6F
```
Adds a score in table of an ID with a text and an optional comment.
- Score, table ID, text and optional comment are passed.

Requires to be logged in.

---
```scratch
add [guest] score (1) in table of ID (0) with text [1 point] and comment [optional] :: #2F7F6F
```
Adds a score in table of an ID with text and optional comment for the a guest.
- Score, table ID, text, optional comment and guest's username are passed.

---
```scratch
fetch (1) [global v] score/s in table of ID (0) :: #2F7F6F
```
Fetches global/user scores in table of an ID.
- Limit, global/user option and table ID are passed.

Requires to be logged in.

---
```scratch
fetch (1) [global v] score/s [better v] than (1) in table of ID (0) :: #2F7F6F
```
Fetches global/user scores better/worse than a value in table of an ID.
- Limit, global/user option, better/worse option, a value and table ID are passed.

Requires to be logged in.

---
```scratch
fetch (1) [guest] score/s in table of ID (0) :: #2F7F6F
```
Fetches guest's scores in table of an ID.
- Limit, guest's username and table ID are passed.

---
```scratch
fetch (1) [guest] score/s [better v] than (1) in table of ID (0) :: #2F7F6F
```
Fetched quest's scores better/worse than a value in table of an ID.
- Limit, guest's username, better/worse option, a value and a table ID are passed.

---
```scratch
(fetched score [value v] at index (0) :: #2F7F6F)
```
Returns fetched score data at passed index by passed key.

---
```scratch
(fetched score data in JSON :: #2F7F6F)
```
Returns fetched score data in JSON.

---
```scratch
(fetched rank of (1) in table of ID (0) :: #2F7F6F)
```
Fetches and returns a rank of passed value in table of passed ID.

---
```scratch
fetch score tables :: #2F7F6F
```
Fetches score tables.

---
```scratch
(fetched table [ID v] at index (0) :: #2F7F6F)
```
Returns fetched table data at passed index by passed key.

---
```scratch
(fetched tables in JSON :: #2F7F6F)
```
Returns fetched tables in JSON.
### Data Storage Blocks
Operate on Game Jolt's cloud variables.

```scratch
set [global v] data at [key] to [data] :: #2F7F6F
```
Sets global/user data at passed key to passed data.

User option requires to be logged in.

---
```scratch
(fetched [global v] data at [key] :: #2F7F6F)
```
Fetches and returns global/user data at passed key.

User option requires to be logged in.

---
```scratch
update [global v] data at [key] by [adding v](1) :: #2F7F6F
```
Updates global/user data at key by operation with value.
- Global/user option, key, operation and value are passed.

User option requires to be logged in.

---
```scratch
remove [global v] data at [key] :: #2F7F6F
```
Removes global/user data at passed key.

User option requires to be logged in.

---
```scratch
fetch all [global v] keys :: #2F7F6F
```
Fetches all global/user keys.

User option requires to be logged in.

---
```scratch
fetch [global v] keys matching with [*] :: #2F7F6F
```
Fetches global/user keys matching with passed pattern.
- Examples:
    - A pattern of `*` matches all keys.
    - A pattern of `key*` matches all keys with `key` at the start.
    - A pattern of `*key` matches all keys with `key` at the end.
    - A pattern of `*key*` matches all keys containing `key`.

User option requires to be logged in.

---
```scratch
(fetched key at index (0) :: #2F7F6F)
```
Returns fetched key at passed index.

---
```scratch
(fetched keys in JSON :: #2F7F6F)
```
Returns fetched keys in JSON.
### Time Blocks
Track server's time.

```scratch
fetch server's time :: #2F7F6F
```
Fetches server's time.

---
```scratch
(fetched server's [timestamp v] :: #2F7F6F)
```
Returns fetched server's time data by passed key.

---
```scratch
(fetched server's time in JSON :: #2F7F6F)
```
Returns fetched server's time data in JSON.
### Batch Blocks
Fetch more data per request.

```scratch
add [data-store/set] request with [{"key":"key", "data":"data"}] to batch :: #2F7F6F
```
Adds passed arguments to the batch.
- The batch is an array of sub requests consisting of the namespace and the parameters object.

---
```scratch
clear batch :: #2F7F6F
```
Clears the batch of all sub requests.

---
```scratch
(batch in JSON :: #2F7F6F)
```
Returns the batch in JSON.

---
```scratch
fetch batch [sequentially v] :: #2F7F6F
```
Fetches the batch.
- After the fetch the batch is not cleared.

You can call the batch request in different ways:
- Sequentially - all sub requests are processed in sequence.
- Sequentially, break on error - all sub requests are processed in sequence, if an error in one of them occurs, the whole request will fail.
- In parallel - all sub requests are processed in parallel, this is the fastest way but the results may vary depending on which request finished first.

User based sub requests require to be logged in.

---
```scratch
(fetched batch data in JSON :: #2F7F6F)
```
Returns fetched batch data in JSON.

### Debug Blocks
Blocks used for debugging.

```scratch
turn debug mode [off v] :: #2F7F6F
```
Turns debug mode on/off.
- When debug mode is off, instead of errors, reporters return an empty string and booleans return false.

---
```scratch
<in debug mode? :: #2F7F6F>
```
Checks to see if debug mode is on.

---
```scratch
(last API error :: #2F7F6F)
```
Returns the last API error.

### Handling Common Errors
Handling commonly encountered errors.

```scratch
// Error: The game ID you passed in does not point to a valid game.
```
This error occurs when the game ID you set is invalid.
#### Handling
This error can be avoided by using this block:
```scratch
set game ID to [0] and private key to [private key] :: #2F7F6F
```
- Make sure the value matches your game's ID.

---
```scratch
// Error: The signature you entered for the request is invalid.
```
This error occurs when the private key you set is invalid.
#### Handling
This error can be avoided by using this block:
```scratch
set game ID to [0] and private key to [private key] :: #2F7F6F
```
- Make sure the value matches your game's private key.

---
```scratch
// Error: No user logged in.
```
This error occurs when no user is logged in.
- The most common cause is that the extension failed to recognize the user.
#### Handling
This error can be avoided with a manual login option.
```scratch
when flag clicked
if <not<auto login available? :: #2F7F6F>> then
ask [login or continue as guest?] and wait
if <(answer) = [login]> then
ask [enter your username] and wait
set [username v] to (answer)
ask [enter your private game token] and wait
set [private game token v] to (answer)
login with (username :: variables) and (private game token) :: #2F7F6F 
end
end
```

---
```scratch
// Error: No such user with the credentials passed in could be found.
```
This error occurs when manual login failed to recognize the user credentials you passed in.
- It can also occur with autologin when no user is recognized by the extension.
#### Handling
This error can be avoided by modifying the previous example to try again after a failed login attempt.
```scratch
when flag clicked
if <not<auto login available? :: #2F7F6F>> then
ask [login or continue as guest?] and wait
if <(answer) = [login]> then
repeat until <logged in? :: #2F7F6F>
ask [enter your username] and wait
set [username v] to (answer)
ask [enter your private game token] and wait
set [private game token v] to (answer)
login with (username :: variables) and (private game token) :: #2F7F6F 
end
end
end
```

---
```scratch
// Error: Data not found.
// Error: Data at such index not found.
```
These errors occur when you are trying to access non-existent data.
- Make sure you have previously fetched the data you are trying to access.
- Make sure you have the right index as indexing starts at 0 instead of 1.
