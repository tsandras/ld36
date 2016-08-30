function Helper() {}

Helper.getGridPosition = function(position) {
    return ({x: Math.floor((position.x - 53)/40), y: Math.floor((position.y - 63)/40)});
  }

Helper.withoutComponent = function(squares) {
  var ok = true;
  for (var i in squares) {
    if (squares[i] && squares[i].component) {
      ok = false
    }
  }
  return ok;
}

Helper.getSlots = function(grid, component, position) {
  var squares = [];
  var gridPosition = Helper.getGridPosition(position);
  if (gridPosition.x < 0 || gridPosition.y < 0 || gridPosition.x > 11 || gridPosition.y > 11) {
    return squares;
  }
  squares.push(grid.squares[gridPosition.y][gridPosition.x]);
  if (component.width > 1 && gridPosition.x + 1 < 12) {
    squares.push(grid.squares[gridPosition.y][gridPosition.x + 1]);
  }
  if (component.height > 1 && gridPosition.y + 1 < 12) {
    squares.push(grid.squares[gridPosition.y + 1][gridPosition.x]);
  }
  if (component.height > 1 && component.width > 1 && gridPosition.x + 1 < 12 && gridPosition.y + 1 < 12) {
    squares.push(grid.squares[gridPosition.y + 1][gridPosition.x + 1]);
  }
  return squares;
}

Helper.getSlotsSize = function(grid, component) {
  return Helper.getSlots(grid, component, component.sprite.position);
}

Helper.getPossibleSlotsSize = function(grid, component, newPosition) {
  return Helper.getSlots(grid, component, newPosition);
}

Helper.snailSlots = function(grid, component) {
  var possibilities = [];
  var tmpPosX = 0;
  var tmpPosY = 0;
  var gridPosition = Helper.getGridPosition(component.sprite.position);
  for (l = 1; l <= 3; l++) {
    for (i = -l; i < l; i++) {
      for (j = -l; j < l; j++) {
        tmpPosX = gridPosition.x + i;
        tmpPosY = gridPosition.y + j;
        if (tmpPosX < 12 && tmpPosY < 12) {
          var squares = Helper.getPossibleSlotsSize(grid, component, {x: tmpPosY * 40 + 53, y: tmpPosY * 40 + 63});
          if (squares.length > 0 && Helper.withoutComponent(squares)) {
            possibilities.push({x: squares[0].x + 53, y: squares[0].y + 63});
          }
        }
      }
    }
  }
  return possibilities;
}

Helper.minPossibility = function(possibilities, sprite) {
  var min = 2000;
  var tmp = 0;
  var index = 0;
  for (i = 0; i < possibilities.length; i++) {
    tmpPosX = possibilities[i].x;
    tmpPosY = possibilities[i].y;
    tmp = Phaser.Point.distance(new Phaser.Point(tmpPosY, tmpPosY), new Phaser.Point(sprite.position.x, sprite.position.y));
    if (tmp < min) {
      min = tmp;
      index = i;
    }
  }
  return possibilities[index];
}
