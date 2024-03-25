# AES encryption
AES (Advanced Encryption Standart) Encryption can be used in places where confidential information has to be delivered between 2 places.

This extension uses CryptoJS, It can be found in github. by searching its name.

# Encrypting text with a key
```scratch
(Encrypt[Hello][Key]::#0FBD8C) //This will return AES encrypted version of the text
```
##### In the snippet above, "Hello" is the text that will be encrypted, "Key" is the key used for encryption.
# Decrypting encrypted text with a key
```scratch
(Decrypt[U2FsdGVkX18PnNdpfLEvPlE/jKlsJ8ZEWZIgx++7+Jc=][Key]::#0FBD8C)
```
##### In the snippet above, "Hello" was encrypted and it is "U2FsdGVkX18PnNdpfLEvPlE/jKlsJ8ZEWZIgx++7+Jc=". To decrypt it, We have to put the encrypted text in the first argument, and "Key" in the second, as that was what we used to encrypt. If we Enter something else than "Key" It will return TypeError.
