# SVG

SVG - это XML язык, который преднозначен для рисования векторых изображений. Изображения бывают двух видов: растровыми и векторными, так вот с помощью SVG можно рисовать именно векторную графику.

Пример векторного и растрового изображения:

<img src="https://github.com/WAYLIVES/my-extensions/blob/main/extensions/SVG/doc/11.png">
&emsp;<i>- Данное изображение принадлежит @WAYLIVES</i>

##  

С помощью расширения "SVG" Вы сможете создавать код простых SVG изображений, где будут доступны такие элементы:
- линия
- прямоугольник
- круг

## Блоки
### SVG-frame:
```scratch
(SVG-frame  //  width:[100] height:[100] elements in svg:[...] :: #9823FF)
```
<img src="https://github.com/WAYLIVES/my-extensions/blob/main/extensions/SVG/doc/s1.svg">

Без этого блока ничего не будет работать, он задаёт начало и конец векторным изображениям.

(width) - здесь вы задаёте ширину формата SVG

(height) - здесь вы задаёте высоту формата SVG

(elements in svg) - сюда вы можете вставлять SVG элементы, с помощью которых будете рисовать изображения

### Line:

```scratch
(LINE  //  x1, y1:[4][4] x2, y2:[96][96] width:[8] color:[#FF0000] opacity:[100]% dash, gap:[0][0] linecap:[round v] :: #9823FF)
```
<img src="https://github.com/WAYLIVES/my-extensions/blob/main/extensions/SVG/doc/s2.svg">

С помощью этого блока можно рисовать линии.

(x1), (y2) - это положение первой точки линии по каардинату X, Y (координаты SVG: https://developer.mozilla.org/ru/docs/Web/SVG/Tutorial/Positions).

(x2), (y2) - это положение конечной (второй) точки линии по координату X, Y.

(width) - здесь вы можете задать толщину линии.

(color) - здесь вы задаёте цвет линии.

(opacity) - здесь вы задаёте прозрачность линии.

(dash), (gap) - с помощью этих параметров вы можете задать тип линии. Dash - это длина пунктирных линий. Gap - это отступ, т.е. расстояние между пунктирными линиями. 

(linecap) - здесь вы можете задать форму концов линии (подробнее здесь: https://developer.mozilla.org/ru/docs/Web/SVG/Attribute/stroke-linecap).

### Rect:

```scratch
(RECT  //  x, y:[4][4] width:[92] height:[92] radius:[20] fill color:[#FF0000] fill opacity:[100]% stroke width:[8] stroke color[#000000] stroke opacity:[100]% dash, gap:[0][0] stroke linecap:[round v] :: #9823FF)
```
<img src="https://github.com/WAYLIVES/my-extensions/blob/main/extensions/SVG/doc/s3.svg">

С помощью этого блока можно рисовать прямоугольники, квадраты.

### Ellipse:

```scratch
(ELLIPSE  //  cx, cy:[50][50] width:[92] height:[92] fill color:[#FF0000] fill opacity:[100]% stroke width:[8] stroke color[#000000] stroke opacity:[100]% dash, gap:[0][0] stroke linecap:[round v] :: #9823FF)
```
<img src="https://github.com/WAYLIVES/my-extensions/blob/main/extensions/SVG/doc/s4.svg">

С помощью этого блока можно рисовать круги и овалы.

## Пример-проект

```scratch
(SVG-frame  //  width:(100) height:(100) elements in svg:(...))
```

<img src="https://github.com/WAYLIVES/my-extensions/blob/main/extensions/SVG/doc/12.png">
<img src="https://github.com/WAYLIVES/my-extensions/blob/main/extensions/SVG/doc/13.png">
