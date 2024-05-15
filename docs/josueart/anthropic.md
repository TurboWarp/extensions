# AnthropicAPI
This extensions lets you communicate with the Anthropic API. This includes the new Claude 3 family and all the other previous model that have system prompt capabilities.

## Setting up
In order to use this extension you'll need an API key. You can get one from [the API keys part on the console](https://console.anthropic.com/settings/keys). Just click the "Create Key" button, give it a name, copy it, and paste it inside of the prompt.

You'll need to have credits on your API account in order to use this extension. Having a Claude Pro account will not work. You can get the $5 free trial credits if you enter your phone number for confirmation purposes.

## Blocks
```scratch
(Generate completion with model [... v], system prompt [You are a helpful assistant] and user prompt [Hi] :: #d5a583)
```
This reporter will execute the user prompt, guided by the system prompt with the model specified. It'll return the result from Claude as plain text. If an error occurs, the reporter will return an error message explaining what went wrong.

### Possible errors:
``Invalid bearer token``: You didn't provide a valid token.