# SVG

SVG is an XML language that is designed for drawing vector images. There are two types of images: raster and vector, so using SVG you can draw vector graphics.

Example:

<img src="https://github.com/WAYLIVES/my-extensions/blob/main/extensions/SVG/doc/11.png">
&emsp;<i>- This image belongs to @WAYLIVES</i>

##  

Using the "SVG" extension, you can create code for simple SVG images, where the following elements will be available:
- line
- rectangle
- circle

## Блоки
### SVG-frame:
```scratch
(SVG-frame  //  width:[100] height:[100] elements in svg:[...] :: #9823FF)
```
<img src="https://github.com/WAYLIVES/my-extensions/blob/main/extensions/SVG/doc/s1.svg">

Nothing will work without this block, it sets the beginning and end of vector images.

(width) - here you set the width of the SVG format

(height) - here you set the height of the SVG format

(elements in svg) - here you can insert SVG elements with which you will draw images.

### Line:

```scratch
(LINE  //  x1, y1:[4][4] x2, y2:[96][96] width:[8] color:[#FF0000] opacity:[100]% dash, gap:[0][0] linecap:[round v] :: #9823FF)
```
<img src="https://github.com/WAYLIVES/my-extensions/blob/main/extensions/SVG/doc/s2.svg">

You can use this block to draw lines.

(x1), (y2) - is the position of the first point of the line along the X, Y coordinate (SVG coordinates: https://developer.mozilla.org/en/docs/Web/SVG/Tutorial/Positions ).

(x2), (y2) - is the position of the end (second) point of the line along the X, Y coordinate.

(width) - here you can set the line thickness.

(color) - here you set the color of the line.

(opacity) - here you set the transparency of the line as a percentage (%).

(dash), (gap) - you can use these parameters to set the line type. Dash is the length of the dotted lines. Gap is the indentation, i.e. the distance between the dotted lines. 

(linecap) - here you can set the shape of the line ends (more details here: https://developer.mozilla.org/en/docs/Web/SVG/Attribute/stroke-linecap ).

Linecap:

<img src="https://github.com/WAYLIVES/my-extensions/blob/main/extensions/SVG/doc/14.svg">

### Rect:

```scratch
(RECT  //  x, y:[4][4] width:[92] height:[92] radius:[20] fill color:[#FF0000] fill opacity:[100]% stroke width:[8] stroke color[#000000] stroke opacity:[100]% dash, gap:[0][0] stroke linecap:[round v] :: #9823FF)
```
<img src="https://github.com/WAYLIVES/my-extensions/blob/main/extensions/SVG/doc/s3.svg">

You can use this block to draw rectangles and squares.

(x), (y) - is the position of the rectangle's starting point along the X, Y coordinate.

(width), (height) - are the width and height of the rectangle.

(radius) - here you set the rounded corners of the rectangle.

(fill color) - here you set the fill color of the rectangle.

(fill opacity) - here you set the transparency of the rectangle fill as a percentage (%).

(stroke width) - here you set the stroke thickness of the rectangle.

(stroke color) - here you set the stroke color.

(stroke opacity) - here you set the transparency of the stroke.

(dash), (gap) - you can use these parameters to set the line type. Dash is the length of the dotted lines. Gap is the indentation, i.e. the distance between the dotted lines. 

(linecap) - here you can set the shape of the line ends.

### Ellipse:

```scratch
(ELLIPSE  //  cx, cy:[50][50] width:[92] height:[92] fill color:[#FF0000] fill opacity:[100]% stroke width:[8] stroke color[#000000] stroke opacity:[100]% dash, gap:[0][0] stroke linecap:[round v] :: #9823FF)
```
<img src="https://github.com/WAYLIVES/my-extensions/blob/main/extensions/SVG/doc/s4.svg">

You can use this block to draw circles and ovals.

(cx), (cy) - is the position of the center point of the circle along the X, Y coordinate.

(width), (height) - are the width and height of the circle.

(fill color) - here you set the fill color.

(fill opacity) - here you set the transparency of the fill as a percentage (%).

(stroke width) - here you set the thickness of the circle outline.

(stroke color) - here you set the stroke color.

(stroke opacity) - here you set the transparency of the stroke.

(dash), (gap) - you can use these parameters to set the line type. Dash is the length of the dotted lines. Gap is the indentation, i.e. the distance between the dotted lines. 

(linecap) - here you can set the shape of the line ends.

## Пример-проект

<img src="https://github.com/WAYLIVES/my-extensions/blob/main/extensions/SVG/doc/12.png">
<img src="https://github.com/WAYLIVES/my-extensions/blob/main/extensions/SVG/doc/13.png">
