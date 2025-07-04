prompt (bolt):

```
I want to create a 3D simulator of walking along a warehouse space, Using three.js library from within React (docs: https://threejs.org/docs/).
You can think of the warehouse as if it was a set of square tiles where some tiles are defined as docks. Here you can, there you can see, you know, trucks being loaded. There are also aisles where our moving hero can walk along. And finally, there are racks with shelves. So these should have specific different colors. Rack could be illustrated as a square column, which has some, you know, cubes, one on top of another, which represent separate shelves.

Below you've got a map where D is a dock, the underscore is an aisle that we can walk along, each A, B, C, D, etc. represent a rack with shelves and A is a zone that has one color, B has another color, C another and D another.

```
DDDDDDDDDD
__________
AAAA_BBBB_
AAAA_BBBB_
__________
CCCC_DDDD_
CCCC_DDDD_
```

Our hero is a like in a first person view shooter games. We can press the cursor arrows like you know, up, forward, down, backward, left, turning left, right, turning right. Basically, as we move along the warehouse, the 3D visualization basically changes. So there might be quite a bit of calculations of the space. So please make sure that this navigation, the walking along the warehouse looks realistic. This realistic visualization is the most important thing in the whole project. So please make sure that you do it nice.
```

- follow-up:

```
Okay, now let's add a Shift+Up arrow to move faster forward and Shift+Down arrow to move faster backward. Also, please add Shift+Left or Shift+Right to faster move to the sides.
```

- follow-up:

```
It would be useful to see some kind of a map of the warehouse, maybe in the top right-hand corner of the screen, so that we can see where we are exactly in the warehouse. Let's use the red triangle emoji to point out not only where the main hero is, but also what is the direction, what is the angle of where we are looking at: 🔺
```

- follow-up:

```
Please add the "Deliveroo" logo attached in the image, randomly somewhere in the warehouse walls.
```

- follow-up:

```
The main hero starting position disallows him to move correctly. So we need to specify a variable or an object that would outline what is the initial coordinates or maybe better, what is the initial starting tile where the hero starts to move. We also need to make sure that the starting position is not a rack tile so that the hero can freely move along the aisles. Let's say that the algorithm is that first, the program tries to use the coordinates that we have passed, and if not, then the program needs to calculate what is the first aisle moveable tile.
```

- follow-up:

```
There is some troublesome discrepancy between the minimap visualization and the warehouse, a first person view. So as I move along the warehouse, I can see that everything is absolutely clear in the minimap. So when I get near to a rack and I cannot cross it, then it seems to be very clear and everything works correct. However, the problem is that in the main visualization from the first person view, I can see that I have still a lot of space in front of me, like a free space, the same way. So that's in front. However, if I move backward, then I can walk into the rack and I can basically see that I am crossing the walls of the rack. And I shouldn't do that, but on the minimap, it seems that I'm not crossing the rack. So it seems as if what I see in the first person view is being shifted for a half height of the tile comparing to what happens in the minimap. So all in all, the minimap seems to be correct and the first person view seems to be somehow shifted vertically. Moreover, if I move left or if I move right, then the walls of the racks are correct. The problem only happens for the vertical up and down directions. So my guess is that something is shifted, but this is only my guess. Please try to find the root cause of that.
```

potem:

- ciężarówki, lampy oraz nažiści generowani w perplexity + odpowiedź wklejana wprost do prompta

i wiele innych...
