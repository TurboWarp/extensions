Sure thing! Here's the documentation for your UI Maker extension for TurboWarp:

---

# TurboWarp UI Maker Extension

## Overview
The **TurboWarp UI Maker Extension** enables users to create and customize user interfaces directly within TurboWarp. Users can add various UI elements, customize their properties, handle events, manage layers, and save or load their designs.

## Installation
To use the TurboWarp UI Maker Extension, follow these steps:

1. **Download**: Obtain the `turboWarpUI-extension.js` file from this repository.
2. **Import**: In TurboWarp, navigate to the Extensions tab, choose "Import Extension", and upload the `turboWarpUI-extension.js` file.

## Blocks and Usage

### 1. Add Button
**Block Type**: Command  
**Description**: Adds a button with specified text.

**Parameters**:
- `TEXT`: The text to display on the button.

### 2. Add Label
**Block Type**: Command  
**Description**: Adds a label with specified text.

**Parameters**:
- `TEXT`: The text to display on the label.

### 3. Add Text Field
**Block Type**: Command  
**Description**: Adds a text field with a specified placeholder.

**Parameters**:
- `PLACEHOLDER`: The placeholder text for the text field.

### 4. Add Image
**Block Type**: Command  
**Description**: Adds an image with a specified URL.

**Parameters**:
- `URL`: The URL of the image to display.

### 5. Set Property
**Block Type**: Command  
**Description**: Sets a specified property of a UI element.

**Parameters**:
- `PROPERTY`: The property to set (e.g., text, color, size, position, background-color).
- `INDEX`: The index of the element to modify.
- `VALUE`: The new value for the property.

### 6. Set Position
**Block Type**: Command  
**Description**: Sets the position of a UI element.

**Parameters**:
- `INDEX`: The index of the element to move.
- `X`: The new x-coordinate.
- `Y`: The new y-coordinate.

### 7. Set Size
**Block Type**: Command  
**Description**: Sets the size of a UI element.

**Parameters**:
- `INDEX`: The index of the element to resize.
- `WIDTH`: The new width.
- `HEIGHT`: The new height.

### 8. Set Background Color
**Block Type**: Command  
**Description**: Sets the background color of a UI element.

**Parameters**:
- `INDEX`: The index of the element to color.
- `COLOR`: The new background color.

### 9. Add Event Listener
**Block Type**: Command  
**Description**: Adds an event listener to a UI element.

**Parameters**:
- `EVENT`: The event to listen for (e.g., click, hover).
- `INDEX`: The index of the element to add the event to.

### 10. Remove Element
**Block Type**: Command  
**Description**: Removes a UI element from the design.

**Parameters**:
- `INDEX`: The index of the element to remove.

### 11. Save Design
**Block Type**: Command  
**Description**: Saves the current UI design to local storage.

### 12. Load Design
**Block Type**: Command  
**Description**: Loads a saved UI design from local storage.

## Example Usage
Here’s how you might use these blocks in a TurboWarp project to create a user interface:

1. **Add a button with text**:
    ```javascript
    addButton({ TEXT: 'Click Me!' });
    ```

2. **Add a label with text**:
    ```javascript
    addLabel({ TEXT: 'Label Text' });
    ```

3. **Add a text field with placeholder**:
    ```javascript
    addTextField({ PLACEHOLDER: 'Enter text' });
    ```

4. **Add an image with URL**:
    ```javascript
    addImage({ URL: 'https://example.com/image.png' });
    ```

5. **Set a property of an element**:
    ```javascript
    setProperty({ PROPERTY: 'color', INDEX: 0, VALUE: '#ff0000' });
    ```

6. **Set the position of an element**:
    ```javascript
    setPosition({ INDEX: 0, X: 100, Y: 200 });
    ```

7. **Set the size of an element**:
    ```javascript
    setSize({ INDEX: 0, WIDTH: 150, HEIGHT: 50 });
    ```

8. **Set the background color of an element**:
    ```javascript
    setBackgroundColor({ INDEX: 0, COLOR: '#0000ff' });
    ```

9. **Add an event listener to an element**:
    ```javascript
    addEventListener({ EVENT: 'click', INDEX: 0 });
    ```

10. **Remove an element**:
    ```javascript
    removeElement({ INDEX: 0 });
    ```

11. **Save the current UI design**:
    ```javascript
    saveDesign();
    ```

12. **Load a saved UI design**:
    ```javascript
    loadDesign();
    ```

## Contributing
Contributions are welcome! Feel free to submit issues, fork the repository, and send pull requests to improve the extension.

## License
This project is licensed under the MIT License.
