# Webhooks

This extension allows you to use [Webhooks](https://en.wikipedia.org/wiki/Webhook). It provides a simple way to save multiple Webhooks to your project for easy management and easy data handling.

These blocks are made with simplicity in mind so that your project isn't messy when you implement Webhooks.

## Adding a Webhook

When loading the extension, you are provided with a button, `Add a Webhook`, to make a new Webhook. It will prompt you to type in a name, which the Webhook registers under, and then prompt you to provide the URL of the Webhook. Please make sure the Webhook URL is valid before making the Webhook, else the extension can't send anything.

## Deleting a Webhook

You can delete a specific Webhook by pressing the `Delete a Webhook` button, where you will be prompted to enter the name of the Webhook you wish to delete.

## Blocks

```scratch
(data of [Webhook v] :: #C73A63)
```

This block reports the data the Webhook chosen from the dropdown is currently assigned to.

```scratch
set data of [Webhook v] to [{"key":"value"}] and type to [application/json v] :: #C73A63
```

This block is used to set data to the chosen Webhook from the list. It only supports JSON inputs, but using the second dropdown, you can make the content type either `application/json` or `application/x-www-form-urlencoded`. The extension will automatically handle conversions for your ease.

```scratch
send data to [Webhook v] :: #C73A63
```

This block sends the data that is set for the selected Webhook.