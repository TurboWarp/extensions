
# About all the blocks

This section explains every block included in the **Turbo Bot** extension.

## AI ready?

```scratch
<AI ready? ::#FF4C4C>

```

A boolean block that returns **true** if the extension is loaded and ready to process requests.

## is bot thinking?

```scratch
<is bot thinking? ::#FF4C4C>

```

This returns **true** while the AI is actively fetching a response or generating an image. It is perfect for making a "Loading" spinner.

## model?

```scratch
(model? ::::#FF4C4C)

```

A reporter that tells you which **Text** and **Image** models are currently active (e.g., `T:openai | I:turbo`).

## bot?

```scratch
(bot? ::#FF4C4C)

```

Returns the name of the bot currently being used for memory storage.

## memory

```scratch
(memory ::#FF4C4C)

```

Returns the raw **JSON** data of all bot conversations stored in the current session.

---

## create bot named [NAME]

```scratch
create bot named [TurboBot] ::#FF4C4C

```

Creates a new memory slot for a bot. This allows you to have different "personalities" or separate conversations.

## rename [NAME1] to [NAME2]

```scratch
rename [TurboBot] to [TurboPal] ::#FF4C4C

```

Changes the name of an existing bot while keeping all its saved conversation memory.

## delete bot named [NAME]

```scratch
delete bot named [TurboBot] ::#FF4C4C

```

Permanently deletes a bot and wipes its memory from the project.

## export bot [NAME] as [TYPE]

```scratch
(export bot [TurboBot] as [json v] ::#FF4C4C)

```

Converts the bot's memory into a format like **JSON**, **Text**, or **Markdown** so you can save it.

## import conversation [TEXT] as [TYPE] to bot [NAME]

```scratch
import conversation [ ] as [json v] to bot [TurboBot] ::#FF4C4C

```

Loads saved conversation data back into a bot.

---

## set text model [MOD]

```scratch
set text model [openai v] ::#FF4C4C

```

Changes the AI brain used for text (OpenAI, Gemini, Mistral, DeepSeek, etc.).

## set image model [MOD]

```scratch
set image model [turbo v] ::#FF4C4C

```

Changes the engine used for generating images (Flux, Anime, 3D, etc.).

---

## set image gen height [H] and width [W]

```scratch
set image gen height (360) and width (480) ::#FF4C4C

```

Sets the resolution for the AI-generated images.

## image gen height

```scratch
(image gen height ::#FF4C4C)

```

Returns the current height setting for images.

## image gen width

```scratch
(image gen width ::#FF4C4C)

```

Returns the current width setting for images.

---

## prompt [TEXT]

```scratch
(prompt [Hello!] ::#FF4C4C)

```

The main block for talking to the AI. It sends your message and returns the AI's answer as text.

## set image from prompt [TEXT] as SVG costume named [NAME]

```scratch
set image from prompt [a futuristic car] as SVG costume named [costume2] ::#FF4C4C

```

**Requires Unsandboxed Mode.** This block asks the AI to draw an image and automatically adds it to your sprite as a new costume.

## get url for image prompt [TEXT]

```scratch
(get url for image prompt [a racecar] ::#FF4C4C)

```

Generates a direct link (URL) to an AI image based on your description.

## attach file url [URL]

```scratch
attach file url [[https://example.com/image.png](https://example.com/image.png)] ::#FF4C4C

```

Allows you to provide an image URL that the AI can "look at" or use as a reference.

---

## set system log [LOG]

```scratch
set system log [You are a funny pirate.] ::#FF4C4C

```

Sets the "System Prompt." This tells the AI how to behave (e.g., "Act like a teacher" or "Speak only in code").

## set context [CTX] and prompt [TEXT]

```scratch
(set context [Persona] and prompt [Who are you?] ::#FF4C4C)

```

Sends a prompt with a specific context label to help the AI understand the situation better.

---

## set temperature [N]

```scratch
set temperature (1) ::#FF4C4C

```

Controls "Creativity." **0.1** is very focused and serious, while **1.0** or higher is more creative and random.

## set seed [N]

```scratch
set seed (12345) ::#FF4C4C

```

Sets a specific "Random Seed." Using the same seed with the same prompt will give you the same result every time.

## seed

```scratch
(seed ::#FF4C4C)

```

Returns the current random seed being used.

## temperature

```scratch
(temperature ::#FF4C4C)

```

Returns the current creativity level (temperature).

---

# Join us 

* Join our discord **[here.](https://discord.com/invite/DJ9EWXhnNC)**
* Contact via mail
  Use **turbobot.contact@atomicmail.io**.
* subscribe to our **[youtube channel.](https://www.youtube.com/channel/UCde3077jwsLsBb8HIjgZUiQ)**
* join our telegram **[here.](https://t.me/+StlI46K855JiMTk1)**

***
Made by **[Seigh sword](https://github.com/Seigh-sword/)** with **Time & effort**

***
