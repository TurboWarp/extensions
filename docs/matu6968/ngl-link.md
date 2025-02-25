# NGL anonymous message sender API
This extension allows you to easily send anonymous messages to anybody with the NGL API using this library.
## Message sending

```scratch
(send message [Hello!] to [username] with game [none v] :: #ff69b4)
```
Send anonymous message to the selected person on NGL.
- You can also configure the Q&A game mode:
    - `ask_me_anything` - means Ask me anything
    - `never_have_i_ever` - means Never have i ever
    - `confessions` - means Confessions
    - `three_words` - means Three words

Though keep in mind that enabling game mode will not work unless the user has a NGL Pro subscription (can't be proven if it will work even with this subscription) and will fallback to without a Q&A game mode if it fails to send it.

### Error Handling

The extension implements several error handling mechanisms:

- If a game mode fails with a server error (status 500), the extension will automatically retry sending the message without the game mode
- Network or server errors will be returned as an error message that starts with "Error:" followed by details
- Detailed error logs are available in the browser console for debugging
- If the device ID verification fails, the extension will report this as an error

### Random fake question generator
Generates a random fake question with the set language.

```scratch
(get random question :: #ff69b4)
```
To set the language of those questions, use this block:

```scratch
set questions language to (en v) :: #ff69b4
```
Supported languages:
- en - English
- es - Spanish
- fr - French
- de - German
- it - Italian
- pt - Portuguese
- pl - Polish
- ru - Russian
- ja - Japanese
- ko - Korean
- zh - Chinese

This block also supports automatic lowercase conversion which means if you are using for example IPInfo to grab the country based of the IP where it's output is in caps (like PL), then it will do the conversion for you.

## Technical Notes

- The extension uses your browser's actual user agent for requests to appear more legitimate
- Device IDs are generated as UUID v4 strings for each session
- HTTP requests are made directly to NGL's API endpoints
- If game modes fail, you'll see a success message with "(Game mode was ignored)" appended
