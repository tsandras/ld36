# Cursed bricks of the Ancient
## Ludum dare 36 :-)

[Our Ludum Dare submission](http://ludumdare.com/compo/ludum-dare-36/?action=preview&uid=26047)! \o/  
[Link to old README (TODO)](https://github.com/tsandras/ld36/blob/master/TODO.md)

## Create levels
Example of first level :
```json
[
  {
    "levelName":"Pyramid",
    "id": 0,
    "levelText":"Level 1 \nPyramid",
    "blueprintImage":"ld36_blueprint_001",
    "winImage":"ld36_win_001",
    "components": [
      {"name": "square+raw_1x2", "width": 1, "height": 2, "type": "Raw", "cardinality": 2},
      {"name": "square+raw_2x1", "width": 2, "height": 1, "type": "Raw", "cardinality": 2},
      {"name": "square+raw_1x1", "width": 1, "height": 1, "type": "Raw", "cardinality": 2},
      {"name": "square+raw_2x2", "width": 2, "height": 2, "type": "Raw", "cardinality": 1}
    ],
    "grid": [
      [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
      [[], [], [], [], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], [], [], [], [], [], [], [], [], [], []],
      [[], [], [], [], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], [], [], [], [], [], [], [], [], [], []],
      [[], [], [], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], [], [], [], [], [], [], [], [], []],
      [[], [], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], [], [], [], [], [], [], [], []],
      [[], [], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], [], [], [], [], [], [], [], []],
      [[], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], [], [], [], [], [], [], []],
      [[], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], [], [], [], [], [], [], []],
      [["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], ["Raw", "Mechanics"], [], [], [], [], [], []]
    ],
    "textsBefore": [
      "My loyal servant,\n\nI want you to collect samples from the crafts of an old extinct species named 'humans'.\n\nYou will have to summon and use blocks of ancient materials to rebuild those samples. \n\nDo not disappoint me...\n\n(click to continue)"
    ],
    "textsAfterWin": [
      "Impressive... Most impressive. \n\n(click to next level)"
    ],
    "textsAfterLose": [
      "It was very easy... but you're just a human... \n\n(click to restart)"
    ],
    "textDuring": "Test",
    "loseByShape": 0.1,
    "loseByKind": 1
  }
]
```
`loseByShape` and `loseByKind` need to have value between 0 and 1. This is the tolerance for bad shape or bad kind (of component). Put 1 if you want to release this parameter.  
Example : If you have a template of 10 squares and you have `loseByShape` to 0.1 if you have more than one square with component outside the template, you lose the game.  
If you want to add level, you need to edit this json : [levels.json](https://github.com/tsandras/ld36/blob/master/data/levels.json)
