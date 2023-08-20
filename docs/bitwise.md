# Bitwise

This extension allows you to perform bit shifts and logic operations on integers as if they were encoded in binary. These operations can be used to create programmer calculators and more.

The extension uses signed 32-bit integers, which can range from -2,147,483,648 to 2,147,483,647.

## Blocks

```scratch
<is [0000000000100000] binary? :: #17cde6>
```
Returns true if the input is a binary number. Binary numbers can only contain 0s and 1s, so this essentially tells you if the input only contains 0s and 1s.

---

```scratch
([32] to binary :: #17cde6)
```

Converts the input from decimal to binary and returns the result.

Note: All other blocks except for `is () binary?` and `() to number` will treat this result as a decimal number, so make sure to convert it back to decimal before you perform operations on it.

---

```scratch
([0000000000100000] to number :: #17cde6)
```

Converts the input from binary to decimal and returns the result.

---

```scratch
([x] >> [y] :: #17cde6)
```
Arithmatically shifts each bit of the binary representation of _x_ to the right _y_ times and returns the result.

Example: `32` → `100000` → `010000` → `16`

The sign will be preserved, so negative numbers will stay negative.

This is essentially the same thing as dividing by 2^*y* and rounding down to the nearest integer.

---

```scratch
([x] \<\< [y] :: #17cde6)
```
Arithmatically shifts each bit of the binary representation of _x_ to the left _y_ times and returns the result.

Example: `32` → `0100000` → `1000000` → `64`

The sign will be preserved, so negative numbers will stay negative.

This is essentially the same thing as multiplying by 2^*y*.

---

```scratch
([x] >>> [y] :: #17cde6)
```
Logically shifts each bit of the binary representation of _x_ to the right _y_ times and returns the result.

This also moves the sign bit, so it can result in negative numbers becoming positive.

---

```scratch
([x] ↻ [y] :: #17cde6)
```
Shifts each bit of the binary representation of _x_ to the right _y_ times. Numbers shifted past one end will reappear on the other (circle around).

Example: `3` → `00000000000000000000000000000011` → `10000000000000000000000000000001` → `-2147483647`

---

```scratch
([x] ↺ [y] :: #17cde6)
```
Shifts each bit of the binary representation of _x_ to the left _y_ times. Numbers shifted past one end will reappear on the other (circle around).

Example: `-2147483647` → `10000000000000000000000000000001` → `00000000000000000000000000000011` → `3`

---

```scratch
([x] and [y] :: #17cde6)
```
Logically ANDs the binary representation of the inputs together and returns the result.

Example:

```
    14        1110
AND 7     AND 0111
——————————————————
    6         0110
```

---

```scratch
([x] or [y] :: #17cde6)
```

Logically ORs the binary representation of the inputs together and returns the result.

Example:

```
    14        1110
OR  7     OR  0111
——————————————————
    15        1111
```

---

```scratch
([x] xor [y] :: #17cde6)
```

Logically XORs the binary representation of the inputs together and returns the result.

Example:

```
    14        1110
XOR 3     XOR 0011
——————————————————
    13        1101
```

---

```scratch
(not [x] :: #17cde6)
```

Flips all bits of the binary representation of _x_ and returns the result.

Example:

```
NOT 42    NOT ...00101010
—————————————————————————
    -43       ...11010101
```
