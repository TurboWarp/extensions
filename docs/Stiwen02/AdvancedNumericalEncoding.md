# Advanced Numerical Encoding
This extension allows you to encode strings to numbers and decode them back. These are the currently available characters that you can encode:

``abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-=_+[];'\,./{}:"|<>?`~ ``.

The amount of encodable characters must be less than 100 to keep them at 2 digits per character when encoded.

Some numbers made from encoded strings can have a zero at the beginning like 011616120500, cloud variables can store numbers like that just fine.

The numbers are treated as a string, so that the number wont break when it reaches the maximum integer point.
## Blocks
Blocks that the extension uses to encode strings and decode numbers.

### Basic Encoding & Decoding
```scratch
(encode [apple] :: #681a9c)
```
Encodes the string "apple" to 011616120500.
The encoded result adds "00" at the end to specify that this is the end of the first item "apple".

```scratch
(decode [011616120500] :: #681a9c)
```
Decodes the first item in the number 011616120500 to "apple".
The block gets the first item that ends before "00" and decodes it.

### Encoding
```scratch
reset encoded :: #681a9c
```
Sets the encoded variable to blank.

```scratch
encode [apple] to encoded :: #681a9c
```
Encodes the string "apple" and adds it to the encoded variable, this allows you to encode multiple strings into a single large number.

```scratch
(encoded :: #681a9c)
```
The encoded variable.

### Decoding
```scratch
reset decoded :: #681a9c
```
Sets the decoded variable to blank and sets the decoded index variable to 1.

```scratch
decode [011616120500] at decoded index to decoded :: #681a9c
```
Decodes the number "011616120500" at the index of the decoded index variable, then saves it to the decoded variable. This allows you to decode the multiple strings encoded in a number.

If you first run the reset decoded block and then run this block with the number 011616120500, you get "apple" and if you run it again you get "banana".

```scratch
(decoded :: #681a9c)
```
The decoded variable.

### Advanced Encoding
```scratch
set encoded to [011616120500] :: #681a9c
```
Sets the encoded variable to 011616120500.

### Advanced Decoding
```scratch
(amount of items encoded in [01161612050002011401140100] :: #681a9c)
```
Gets the amount of items (Amount of "00") in 01161612050002011401140100, which is 2.

The index of "00" must be an even number or 0, such as 0, 2, 4, 6, 8 and so on.

---
```scratch
(decode [01161612050002011401140100] at index [13] :: #681a9c)
```
Decodes 01161612050002011401140100 at the index 13, which is where the encoded string "banana" begins right after "00" which signifies that the first encoded item "apple" has ended.

```scratch
decode [01161612050002011401140100] at index [13] to decoded :: #681a9c
```
Decodes 01161612050002011401140100 at the index 13 to the decoded variable, which is where the encoded string "banana" begins right after "00" which signifies that the first encoded item "apple" has ended.

---
```scratch
(decode [01161612050002011401140100] at item [2] :: #681a9c)
```
Decodes 01161612050002011401140100 at item 2 (after the first "00"), which is where the encoded string "banana" begins.

Item 1 (At the start of the number) is where the encoded string "apple" begins.

```scratch
decode [01161612050002011401140100] at index [2] to decoded :: #681a9c
```
Decodes 01161612050002011401140100 at item 2 (after the first "00") to the decoded variable, which is where the encoded string "banana" begins.

Item 1 (At the start of the number) is where the encoded string "apple" begins.

---
```scratch
set decoded to [apple] :: #681a9c
```
Sets the decoded variable to "apple".

```scratch
set decoded index to [1] :: #681a9c
```
Sets the decoded index variable to 1.

```scratch
add decoded index by [2] :: #681a9c
```
Adds the decoded index variable by 2.

```scratch
(decoded index :: #681a9c)
```
The decoded index variable.