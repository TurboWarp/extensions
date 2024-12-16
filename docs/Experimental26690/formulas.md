
# Formulas

## Performance Speed

Some of this extension's blocks take time to process calculations and can not be forced to go faster than intended causing it to act like the stop this script block:

```scratch
stop [this script v]
```

Instead try using a delay of some sorts. For example a delay of 0 seconds in the loop

---

Putting a reporter block in a variable instead of using it directly in a script is *recommended*.

```scratch
define go to midway point of (x1)(y1) to (x2)(y2)
set [midwayX v] to (midpoint [x v] between points:(x1)(y1) and (x2)(y2) :: #ff91ef)
set [midwayY v] to (midpoint [y v] between points:(x1)(y1) and (x2)(y2) :: #ff91ef)
go to x:(midwayX) y:(midwayY)

go to midway point of (0)(0) to(mouse x)(mouse y)
```

---

## Blocks

```scratch
(hypotenuse of a right angle triangle with legs:(0)(0) :: #ff91ef)
```
Finds the hypotenuse of a right triangle using the triangle's legs.


---
```scratch
(leg of a right angle with hypotenuse:(0) other leg:(0) :: #ff91ef)
```
Finds any of the other two legs of a right triangle using the hypotenuse and a leg.

---
```scratch
<is triangle with hypotenuse: (0)and legs: (0)(0) a right triangle
```
Identifies if a triangle is a right triangle using the side lengths of the triangle.

---
```scratch
(distance between points:(0)(0) and (0)(0) :: #ff91ef)
```
Gets the distance between two (`x`, `y`) coordinates.


---
```scratch
(midpoint [x v] between points:(0)(0) and (0)(0) :: #ff91ef)
```
Gets the midway point `x`, `y` values between two (`x`, `y`) coordinates.

---
```scratch
(area of a rectangle with width:(0)and height() :: #ff91ef)
```
Finds the area of a rectangle.

---
```scratch
(area of a square with a side length:(0) :: #ff91ef)
```
Finds the area of a square.

---
```scratch
(area of a triangle with a base of:(0) and a height: :: #ff91ef)
```
Finds the area of a triangle using base and height.

---
```scratch
(perimeter of a square with a side length:(0) :: #ff91ef)
```
Finds the perimeter of a square.

---
```scratch
(perimeter of a square with a side length:(0) :: #ff91ef)
```
Finds the perimeter of a square.

---
```scratch
(perimeter of a triangle with side lengths:(0)(0)(0) :: #ff91ef)
```
Finds the perimeter of a triangle using the side lengths.

---
```scratch
(find the circumference of a circle with the (radius v) of (0) :: #ff91ef)
```
Finds the circumference of a circle with a radius or diameter.

---
```scratch
(find the area of a circle with a radius of (0) :: #ff91ef)
```
Finds the circumference of a circle with a radius or diameter.

---
```scratch
(find the (radius v) when(diameter v) is:(0) :: #ff91ef)
```
Converts the first value into the second value. For example, if the first value is "radius" and the second value is diameter,
the radius will be multiplied by 2. You can learn more about circumferences, diameters, and radiuses [here](https://en.wikipedia.org/wiki/Circumference).

---
```scratch
(pi :: #ff91ef)
```
The value of pi according to JavaScript.

---
```scratch
(round(0) to the nearest [hundredths v] :: #ff91ef)
```
Rounds a number to the nearest number place.

---
```scratch
(slope of (0)(0) and(0)(0) :: #ff91ef)
```
Finds the decimal value of the `slope` of two coordinates

---

## Sample 1

```scratch
when gf clicked
forever
	ask [Insert a number of choice] and wait
	set[number v] to (answer)
	ask [How would you like to round? (1) tenths (2) hundredths (3) thousandths] and wait
	if <(answer) = (1)> then
		say (round(number) to the nearest [tenths v] :: #ff91ef)
	else
		if <(answer) = (2)> then
			say (round(number) to the nearest [hundredths v] :: #ff91ef)
		else
			if <(answer) = (3)> then
				say (round(number) to the nearest [thousandths v] :: #ff91ef)		
			else
				say [invalid input]
				stop [all v]
			end
		end
	end
end
```

---

## Sample 2

```scratch
when gf clicked
forever
	go to x:(0)y:(0)
	set [distance v] to (distance between points:(0)(0) and (mouse x)(mouse y) :: #ff91ef)
	say (join(distance between points:(0)(0) and (0)(0) :: #ff91ef)(join[ should be the same as ](distance to (mouse-pointer v))))
end
```
