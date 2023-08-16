# TurboHook

This extension allows you to post to webhooks from some common third-party websites or programs.

## WebHook block

Posts a message to a webhook.

```scratch
webhook data: [] webhook url: [] :: #3c48c2
```
The empty area is where you insert the data reporter and/or connector reporter. The string area is where you put your webhook's URL.

## Data Reporter

The Menu area of the Data Reporter currently has three options, ("content","name","icon").

### Content

```scratch
((content v) [] :: #3c48c2)
```
When choosing "content", you can type in the text you want to send as the body of the webhook.

### Name

```scratch
((name v) [] :: #3c48c2)
```
When choosing "name", you can type in the name of the name you want the webhook to display as on the third-party website.

### Icon

```scratch
((icon v) [] :: #3c48c2)
```
When choosing "icon", you can type in a URL to the image you want to set as the profile picture of the webhook.

## Connector Reporter

```scratch
([], [] :: #3c48c2)
```
This reporter connects two different data reporters together and/or another connector reporter so you can send multiple pieces of data to the webhook.
