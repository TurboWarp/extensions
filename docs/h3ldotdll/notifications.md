# Notifications

An extension of the old Notifications Extension by mdwalters.

# Sending a notification.

You can send basic notifications using the
```scratch
Notify [Title] [Body] :: #0FBD8C
```
block. This sends a basic notification.

# Tagged Notifications

Tagged Notifications are like your regular notification, but dynamic.
Say you dragged the:
```scratch
Dynamic Notify [Title] [Body] [Tag] :: #0FBD8C
```
block. This block will send a notification like normal.
Now, drag the same block out, keeping the default Tag, but change the body:
```scratch
Dynamic Notify [Title] [Hello, World!] [Tag] :: #0FBD8C
```
What this will do is you wont see a new notification, but the previously sent one was updated!

# Image Notifications

Image Notifications are regular old notifications. They aren't dynamic, But you can have an image inside them.
Use your previously gained knowledge from the previous sections, and apply it!
The last field of the image notification is the DIRECT path to your image or image URI. I didn't put IMGUR api in here.
