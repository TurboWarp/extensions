## 🧠 MountainAI — GPT-like Neural Network for TurboWarp

**MountainAI** is a simple GPT-style neural network extension for [TurboWarp](https://turbowarp.org), written entirely in JavaScript.
It allows users to **train** and **use** a text-generation model directly inside Scratch projects — no server or installation required.

---

### ⚠️ Performance Notice

**Training the model may cause the page to temporarily freeze**, especially on slower or older computers.
This is expected behavior — **the training is still running in the background**, and the browser will resume responsiveness when it's complete.
If you see a warning like *“This page is unresponsive”* — just wait, and don’t reload.

---

### 🔧 Features

* 🧠 Fully local training and inference
* 📄 Custom dataset support (text-based)
* ⚙️ Adjustable hyperparameters:

  * Number of transformer layers
  * Feed-forward size
  * Sequence length
* 📝 Text continuation instead of random generation
* 🪄 Easy to use through custom blocks

---

### 📦 How to Use

1. Open [TurboWarp Editor](https://turbowarp.org/editor?extension=https://ttstudio300.github.io/MountainAI/MountainAI.js)
2. Load the extension using this URL:
   `https://ttstudio300.github.io/MountainAI/MountainAI.js`
3. Use the blocks from the “MountainAI” category to:

   * Set model parameters
   * Load or input training data
   * Train the model
   * Generate text

---

### 🧱 Example Blocks

* `Set number of layers [3]`
* `Set sequence length [8]`
* `Train model`
* `Generate text from [start phrase] for [length] tokens`

---

### 🔗 Links

* 🌐 Live Extension URL:
  `https://ttstudio300.github.io/MountainAI/MountainAI.js`
* 💾 GitHub Repository:
  [github.com/ttstudio300/MountainAI](https://github.com/ttstudio300/MountainAI)
* 🧪 Try it instantly:
  [TurboWarp + Extension](https://turbowarp.org/editor?extension=https://ttstudio300.github.io/MountainAI/MountainAI.js)

---

### ✨ Author

Made with care by **RadereDev**
Special thanks to GPT and open learning communities.

---

Хочешь добавить ещё секцию о том, как устроена архитектура внутри? Или, например, гифку, показывающую, как оно работает?
