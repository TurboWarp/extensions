// WARNING: This Extension is Unsandboxed
// Name: Key Utils
// ID: keyutils
// description: Adds Key Simulator. It's useful for Mobile and Gampead Compatibility
// Credit to Aness6040 <https://scratch.mit.edu/users/AnessScratched/>
// Creator's Github: https://github.com/Aness6040

class KeyUtils {
  constructor(runtime) {
    this.runtime = runtime;
    this.isPressed = false;
    this.currentKey = null;
    this.isDisabled = false;
  }

  getInfo() {
    const keysMenu = [
      // Special Inputs
      { text: "space", value: "space" },
      { text: "up arrow", value: "up arrow" },
      { text: "down arrow", value: "down arrow" },
      { text: "right arrow", value: "right arrow" },
      { text: "left arrow", value: "left arrow" },
      { text: "enter", value: "enter" },
      // TW: Extra Special Inputs
      { text: "escape", value: "escape" },
    { text: "backspace", value: "backspace" },
    { text: "delete", value: "delete" },
    { text: "shift", value: "shift" },
    { text: "caps lock", value: "caps lock" },
    { text: "control", value: "control" },
    { text: "insert", value: "insert" },
      // Letter Keyboard Inputs
      { text: "a", value: "a" },
      { text: "b", value: "b" },
      { text: "c", value: "c" },
      { text: "d", value: "d" },
      { text: "e", value: "e" },
      { text: "f", value: "f" },
      { text: "g", value: "g" },
      { text: "h", value: "h" },
      { text: "i", value: "i" },
      { text: "j", value: "j" },
      { text: "k", value: "k" },
      { text: "l", value: "l" },
      { text: "m", value: "m" },
      { text: "n", value: "n" },
      { text: "o", value: "o" },
      { text: "p", value: "p" },
      { text: "q", value: "q" },
      { text: "r", value: "r" },
      { text: "s", value: "s" },
      { text: "t", value: "t" },
      { text: "u", value: "u" },
      { text: "v", value: "v" },
      { text: "w", value: "w" },
      { text: "x", value: "x" },
      { text: "y", value: "y" },
      { text: "z", value: "z" },
      // Number Keyboard Inputs
      { text: "0", value: "0" },
      { text: "1", value: "1" },
      { text: "2", value: "2" },
      { text: "3", value: "3" },
      { text: "4", value: "4" },
      { text: "5", value: "5" },
      { text: "6", value: "6" },
      { text: "7", value: "7" },
      { text: "8", value: "8" },
      { text: "9", value: "9" },
    ];

    return {
      blockIconURI: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADbUExURSdagYy11D+T1Iy104211Iy003mlxS9hiEV1moix0VB/onCcvY621I611I+31Y6204+21I+205G31JG21JG41JK41ZK31ZK31JO41JO51JS405S41JS305S51JW51Ja51Za61Za51Je61Je61Za405e505a505e51Jm71Jm71Zm61Jq71Zq71Jq705q605y81Ju71Jy71Jy81Z291Zy91Z691Z281J271J+91J6805681J++1KG+1aC91KG+1KK+1KG906G+06K/1KK+06S/1KO/1KS/1WGi1AAAAD0noPEAAABJdFJOU////////////////////////////////////////////////////////////////////////////////////////////////wAMCJ9VAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAGyklEQVR4Xu2WiXbVNhRFk3RuSaEpc6CBlJKkQIGWplDmMoT//6Lee3Rsy5Ys+wGypBftrIUVWzr37OWXt9j4sCZUkdyoIrlRRXKjiuRGFcmNKpIbVSQ3qkhurCCykQCOnsG8rYxNBEuEmbWLgelgjxAz9jAsKawSYHoLozY2NhPA0TNM5oowOAWmANuMMr1BYWQiUGGq6ORzhYHJQAkWGmOOCOMSMsOkDBGYsNEIU48zEglXnSHCrKRsfaKIHs9HJNh1WmRLg74QkJiIrUmTsKUCkc0v5Wd52qmfJoKzWxD5Sn5G+Pob7LP59js+8/E9N1n8wEdDuqlbkyYzRc4ISHSJKNJNFZGJv/fQI0UCNGj7zPY2El0iimxvbw9ExutOiGiABv0oINElokg3VXuETQKKSiNy9tzZc0h0iSjSTf0EEZzCeQ36SUCiyzyRVXVBNxVFgiZFiYT+3kfvK+a0Bu0ISHSJKNJNNU1CryQkwtMa9LOARJeIIt1UVgmYjPkpPKxB5y+cv4BEl4gi3VRWWVkE+3nWfLQu7lxCokuw4gpfUR52Lu1cNCtWCZjMFLl85fIVJLpEFOmmsoqgEWzZw39T4UGKCEh0iSnSTmUVARnsaTMqwnOCBl3dvbqLRJeIIt1UVlEQwqIWXjmFxwQNurZ7LYFIN5VVFISwqYXvlsJTigZd/+X6L0h08Yh46NxWQaZex4JVAPLYtWOmyK6ARJeYIu1YVjFoHrt2eO4oPAI0aO/G3g0kusQUkal7WLCKAYFs2+IX4QmDBt3cu2kSXWKKyNSbWLAKQSLrNrhmCg8YNGj/1/19JLrEFNmXuViwCkEi+zY4vyvcTzTo1m+3biPRZZ5IxwrfWpu3ZS4WrNKAIDYmM0X2BSS6xBRpx7JKiwaxMRn+qnBzgwYd7B8cINElpsiBzMWCVVqQxM4Gjwj3tmjQ4dHhERJdYorI1EMsWKUDUSwNBloKt7Zo0O8CEl1iirRjWaUDUWwN+r8o3NmhQUd3ju4g0cUj0n1Fef6L0jLji0ymmg8Cq1gggr2VmSKHdw/NO3aJKXIoc7FgFRuNYG+lt1a4zUKD7t29dxeJLjFFZOo9LFjFBhlsLgxFuMtGg/4QkOgSU6Qdyyo9EMLqPRE84CYbDbovINElpkg7llV6IITdbRHc554eGvTg4YOHSHQJirR4dnWMfpHJ1AdYsEofnGX7uSJ//nX/ERJdYoo8krlYsMoAPcv2nQgSuaGPBn3sR6vl40SCH63+K+mJ8PkADfpbQKJLTJF2LKsMwWn2N5fAC4HI8fE/x0h0iSlyLHOxYJUhOE0BXhQ+HaJBjwUkLks7llUc0NsY4N9JkSf/PnmCxIVp5rKKy0Ak5GHeyNPHT/W6NM1cVnFB874In7ggMM1Hq53LKh4aE2Oj8IGLBj0T9Lo0zVxW8YDuFMGa9z1o0PNnz5OINHNZxQfazxZ58fLFC70uTTOXVby0IhMeEHn1+tVrvS6MTH2FBat4Qf9GhPe8aNB/CiIXpZ3KKn4oopdJkc2Xb+QHqwXRmW+wYhU/lgjv+EHS23dv371/9xbrhdB5zURW8aMGqiLwjh8TpaEJfszwOSKAd0YwWe9TYEZ/XhH5eC0OB0+IWCa84eeEYQoHLAJHKiesMgItpl7IiW2ShJOwiCpMf/mqSGoTacAuXozI5LeWpKQ1QQGW8bKKiMDYheHwzymSGLbxMU+EOclhHR+nS4QxGcBCHqpIItjIZY4IM7KAlVyqSCrYyeE0iTAhE1jKoTiRMZNTJMLz2cBaQ8oTGTE5PSI8nREsNqCKJITN+qyLiAoERXg2K1itBzwo4jXh2bxgN5tGZPSV8GhesJvNlAhPZgbL2ZQp4jGpImlhO4sJEZ7LDtazKFTENakiiWG/jrAIT+UIG7ZUkdSwYcvpEOGZPGHHhiqSHHZsKFdkYBIS4YFcYUuD8VgrEY8JD+QKWxpKFumZhES4PV/YE1SRHGBPULSIbRIQ4eacYVOlimQBmypli1gm4yLcmjfsKlSRPGBXoXCRzmRUhBtzh23XR4Qe5Yo0JrZI34T7sod1R0W4LX/Yt4rkg+m79iLcVAKmcBXJCBRedxFuKQM0riI5oY2rSE5oY78IN5TC2oiISeOxZiKtCZ8Xw5gIH5fD2oicVJHc8IvwYUmsjchJFcmNKpIb6yyysQ4i5pVs8GFBtB62iMDHxYDSNDCXMk1QuRForg3cUwCmL/u3Ip2Jwq3ZwpoC21siAp+VBJsLtkh5Kqyt9EWKUmFjMhQxcGu2sKaNX6RAqkhuVJHcqCK5UUVyo4rkRhXJjSqSG1UkLz58+B87mtL0ZLI/SwAAAABJRU5ErkJggg==",
      id: 'keyutils',
      name: 'Key Utils',
      color1: "#8cb5d4",
      color2: "#7da8cf",
      color3: "#7d81a6",
      name: 'Key Utils',
      blocks: [
        {
          opcode: 'pressKey',
          blockType: Scratch.BlockType.COMMAND,
          text: 'press [KEY] key',
          arguments: {
            KEY: {
              type: Scratch.ArgumentType.STRING,
              menu: 'keysMenu',
              defaultValue: 'space'
            }
          }
        },
        {
          opcode: 'pressKeyAlt',
          blockType: Scratch.BlockType.COMMAND,
          text: 'press key [KEY_ALT] in keybind mode.',
          arguments: {
            KEY_ALT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'space'
            }
          },
        }
      ],
      menus: {
        keysMenu
      }
    };
  }

  keyPressed(args) {
    const key = this.getKeyToDispatch(args.KEY);
  
    return this.pressedKeys.has(key); 
  }

  pressKey(args) {
    if (!this.isDisabled) {
      const key = args.KEY;

      if (this.isPressed) {
        this.releaseKey();
      } else {
        this.currentKey = key;
        this.pressKeyForCurrentKey();
      }
    }
  }

  pressKeyAlt(args) {
    if (!this.isDisabled) {
      const keyAlt = args.KEY_ALT;

      if (this.isPressed) {
        this.releaseKey();
      } else {
        this.currentKey = keyAlt;
        this.pressKeyForCurrentKey();
      }
    }
  }

  pressKeyForCurrentKey() {
    const keyToDispatch = this.getKeyToDispatch(this.currentKey);

    const eventDown = new KeyboardEvent('keydown', { key: keyToDispatch });
    document.dispatchEvent(eventDown);

    this.isPressed = true;

    this.disableExtensionTemporarily(1); // Disable for 0.001 seconds
  }

  releaseKey() {
    if (this.currentKey) {
      const keyToDispatch = this.getKeyToDispatch(this.currentKey);

      const eventUp = new KeyboardEvent('keyup', { key: keyToDispatch });
      document.dispatchEvent(eventUp);

      this.currentKey = null;
      this.isPressed = false;

      this.disableExtensionTemporarily(1); // Disable for 0.001 seconds
    }
  }

  disableExtensionTemporarily(ms) {
    this.isDisabled = true;
    setTimeout(() => {
      this.isDisabled = false;
      this.releaseKey(); // Simulate releasing the key after the delay
    }, ms);
  }

  getKeyToDispatch(key) {
    if (key === 'space') return ' ';
    else if (key === 'up arrow') return 'ArrowUp';
    else if (key === 'down arrow') return 'ArrowDown';
    else if (key === 'left arrow') return 'ArrowLeft';
    else if (key === 'right arrow') return 'ArrowRight';
    else if (key === 'escape') return 'Escape';
    else if (key === 'backspace') return 'Backspace';
    else if (key === 'delete') return 'Delete';
    else if (key === 'shift') return 'Shift';
    else if (key === 'caps lock') return 'CapsLock';
    else if (key === 'control') return 'Control';
    else if (key === 'insert') return 'Insert';
    else return key;
  }
}

Scratch.extensions.register(new KeyUtils());
