# 2 Factor Authentication
This extension lets you make a 2FA app using turbowarp.

Basically when apps and services ask you to enter a secret key to the 2FA app, you can use the only block in the extension and enter the secret that they gave you to get a 6 digit long code.Now when they ask you to enter a 6 digit long code provided by the 2FA app, you can use the block and it will tell you the code.
This is how to use it:
```scratch
(Generate TOTP from [Secret key]::#0FBD8C)
```
"Secret key" is what the service/app (e.g. Pypi,Google Drive) provided as the key that you should add to a 2FA app like duo mobile.
