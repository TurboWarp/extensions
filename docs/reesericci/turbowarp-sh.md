# turbowarp.sh

SSH over WebSockets for Scratch

Git repository to submit issues and patches is located at [sr.ht/\~reesericci/turbowarp.sh](https://sr.ht/~reesericci/turbowarp.sh)

## docs

### connecting

SSH connections are tunneled over WebSockets, so they require a proxy on the receiving end to translate the WebSocket connection to TCP for sshd.

This proxy can be set up using [websockify](https://github.com/novnc/websockify) or [websocat](https://github.com/vi/websocat). 

To specify the WebSocket proxy server, use the "connection with proxy" block:

```
connection [user]@[host] -i [identity file] with proxy [wss://] :: #859900
```


**FYI: password authentication is not supported at this time, only SSH keys.**

### executing commands

Commands are currently executed in independent sessions from one another, not inside of the same shell (see [#1](https://todo.sr.ht/~reesericci/turbowarp.sh/1)). 

This means commands like `cd` won't actually do anything to the shell, they have to be attached to the same command with `&&`

Do:

```
execute (cd [example] && [do a thing]) :: #859900
```

Don't:

```
execute (cd [example]) :: #859900
execute (ls) :: #859900
```

### connection "objects"

Connections are passed around using the connection block, which outputs a base64 encoded version of the JSON that makes up the connection. These are then decoded by any block that uses the connection.

There is no shared state of all instantiated connections, only the current active connection is stored in the program. All other connections only exist in their encoded form.
