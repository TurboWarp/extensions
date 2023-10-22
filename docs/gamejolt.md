# Game Jolt API
---
This extension allows you to easily implement the Game Jolt API using a public domain library.
## Blocks
---
Blocks that the extension uses to send requests to the Game Jolt API.

```scratch
<On Game Jolt? :: #2F7F6F>
```
Checks to see if the URL is the Game Jolt website.
### Session Blocks
---
Operating on the game's session.

```scratch
Set game ID to (0) and private key [private key] :: #2F7F6F
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
Ping session :: #2F7F6F
```
Pings an open session.
- If the session hasn't been pinged within 120 seconds, the system will close the session and you will have to open another one.
- It's recommended that you ping about every 30 seconds or so to keep the system from clearing out your session.

When the session is opened it is pinged every 30 seconds automatically.
- You can ping it manually to update the session status.

---
```scratch
Set session status to [active v] :: #2F7F6F
```
Sets the session status to active/idle.
- Ping the session to update it's status.

---
```scratch
<Session open? :: #2F7F6F>
```
Checks to see if there is an open session for the user.
- Can be used to see if a particular user account is active in the game.
### User Blocks
---
Login, logout and fetch users.

```scratch
Login with [username] and [private token] :: #2F7F6F
```
This block is required for all user based requests to work.

Requires to not be logged in.
- When logged in on the Game Jolt website and the game is played on Game Jolt, the user is logged in automatically.

---
```scratch
Login automatically :: #2F7F6F
```
Does automatic login after logout.

Requires to not be logged in.
- Requires to be logged in on the Game Jolt website and for the game to be played on Game Jolt.

---
```scratch
Autologin available? :: #2F7F6F
```
Checks to see if the user is logged in on the Game Jolt website and the game is played on Game Jolt.

---
```scratch
Logout :: #2F7F6F
```
Logs out the user, the game session is then closed.

Requires to be logged in.

---
```scratch
<Logged in? :: #2F7F6F>
```
Checks to see if the user is logged in.

---
```scratch
Logged in user's username :: #2F7F6F
```
Returns the logged in user's username.

Requires to be logged in.

---
```scratch
Fetch user's [username] by [username v] :: #2F7F6F
```
Fetches user data based on the user's username or the ID

---
```scratch
Fetch logged in user :: #2F7F6F
```
Fetches logged in user data.

Requires to be logged in.

---
```scratch
(Fetched user's [ID v] :: #2F7F6F)
```
Returns fetched user's data by passed key.

---
```scratch
(Fetched user's data in JSON :: #2F7F6F)
```
Returns fetched user's data in JSON.

---
```scratch
Fetch user's friend IDs :: #2F7F6F
```
Fetches user's friend IDs.

Requires to be logged in.

---
```scratch
(Fetched user's friend ID at index (0) :: #2F7F6F)
```
Returns fetched user's friend ID at passed index.

---
```scratch
(Fetched user's friend IDs in JSON :: #2F7F6F)
```
Returns fetched user's friend IDs in JSON.

### Trophy Blocks
---
Achieve, remove and fetch trophies.

```scratch
Achieve trophy of ID (0) :: #2F7F6F
```
Achieves trophy of passed ID.

Requires to be logged in and for the trophy to not be achieved.

---
```scratch
Remove trophy of ID (0) :: #2F7F6F
```
Removes trophy of passed ID.

Requires to be logged in and for the trophy to be achieved.

---
```scratch
Fetch trophy of ID (0) :: #2F7F6F
```
Fetches trophy of passed ID.

Requires to be logged in.

---
```scratch
Fetch all trophies :: #2F7F6F
```
Fetches all of the game's trophies.

Requires to be logged in.

---
```scratch
(Fetched trophy [ID v] at index (0) :: #2F7F6F)
```
Returns fetched trophy data at passed index by passed key.

---
```scratch
(Fetched trophies in JSON :: #2F7F6F)
```
Returns fetched trophy data in JSON

### Score Blocks
---
```scratch
Add score (1) in table of ID (0) with text [1 point] and comment [optional] :: #2F7F6F
```
Adds a score in table of an ID with a text and an optional comment.
- Score, table ID, text and optional comment are passed.

Requires to be logged in.

---
```scratch
Add [guest] score (1) in table of ID (0) with text [1 point] and comment [optional] :: #2F7F6F
```
Adds a score in table of an ID with text and optional comment for the a guest.
- Score, table ID, text, optional comment and guest's username are passed.

---
```scratch
Fetch (1) [global v] score/s in table of ID (0) :: #2F7F6F
```
Fetches global/user scores in table of an ID.
- Limit, global/user option and table ID are passed.

Requires to be logged in.

--- 
```scratch
Fetch (1) [global v] score/s [better v] than (1) in table of ID (0) :: #2F7F6F
```
Fetches global/user scores better/worse than a value in table of an ID.
- Limit, global/user option, better/worse option, a value and table ID are passed.

Requires to be logged in.

---
```scratch
Fetch (1) [guest] score/s in table of ID (0) :: #2F7F6F
```
Fetches guest's scores in table of an ID.
- Limit, guest's username and table ID are passed.

---
```scratch
Fetch (1) [guest] score/s [better v] than (1) in table of ID (0) :: #2F7F6F
```
Fetched quest's scores better/worse than a value in table of an ID.
- Limit, guest's username, better/worse option, a value and a table ID are passed.

---
```scratch
(Fetched score [value v] at index (0) :: #2F7F6F)
```
Returns fetched score data at passed index by passed key.

---
```scratch
(Fetched score data in JSON :: #2F7F6F)
```
Returns fetched score data in JSON.

---
```scratch
(Fetched rank of (1) in table of ID (0) :: #2F7F6F)
```
Fetches and returns a rank of passed value in table of passed ID.

---
```scratch
Fetch score tables :: #2F7F6F
```
Fetches score tables.

---
```scratch
(Fetched table [ID v] at index (0) :: #2F7F6F)
```
Returns fetched table data at passed index by passed key.

---
```scratch
(Fetched tables in JSON :: #2F7F6F)
```
Returns fetched tables in JSON.

### Data Storage Blocks
---
Operate on Game Jolt's cloud variables.

```scratch
Set [global v] data at [key] to [data] :: #2F7F6F
```
Sets global/user data at passed key to passed data.

User option requires to be logged in.

---
```scratch
(Fetched [global v] data at [key] :: #2F7F6F)
```
Fetches and returns global/user data at passed key.

User option requires to be logged in.

---
```scratch
Update [global v] data at [key] by [adding v](1) :: #2F7F6F
```
Updates global/user data at key by operation with value.
- Global/user option, key, operation and value are passed.

User option requires to be logged in.

---
```scratch
Remove [global v] data at [key] :: #2F7F6F
```
Removes global/user data at passed key.

User option requires to be logged in.

---
```scratch
Fetch all [global v] keys :: #2F7F6F
```
Fetches all global/user keys.

User option requires to be logged in.

---
```scratch
Fetch [global v] keys matching with [*] :: #2F7F6F
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
(Fetched key at index (0) :: #2F7F6F)
```
Returns fetched key at passed index.

---
```scratch
(Fetched keys in JSON :: #2F7F6F)
```
Returns fetched keys in JSON.

### Time Blocks
---
Track server's time.

```scratch
Fetch server's time :: #2F7F6F
```
Fetches server's time.

---
```scratch
(Fetched server's [timestamp v] :: #2F7F6F)
```
Returns fetched server's time data by passed key.

---
```scratch
(Fetched server's time in JSON :: #2F7F6F)
```
Returns fetched server's time data in JSON.

### Debug Blocks
---
Blocks used for debugging.

```scratch
Turn debug mode [off v] :: #2F7F6F
```
Turns debug mode on/off.
- When debug mode is off, instead of errors, reporters return an empty string and booleans return false.

---
```scratch
<In debug mode? :: #2F7F6F>
```
Checks to see if debug mode is on.

---
```scratch
(Last API error :: #2F7F6F)
```
Returns the last API error.
- Doesn't return errors based on invalid input.

---