function GameController(model, view){
  this.model = model;
  this.view = view;
};

GameController.prototype.move = function(direction) {
  var compareString = this.model.toString();
  if (this.model.gameOver()) {
    this.view.displayGameOver();
    return;
  }
  if (direction === 'up') {
    this.model.moveUp();
  } else if (direction === 'down') {
    this.model.moveDown();
  } else if (direction === 'left') {
    this.model.moveLeft();
  } else if (direction === 'right') {
    this.model.moveRight();
  };
  if (compareString != this.model.toString()) {
    this.model.spawnBlock();
    this.view.update(this.model);
  };
}

GameController.prototype.handleKeyUp = function(event) {
  if (event.which === 37) {
    this.move('left');
  } else if (event.which === 39) {
    this.move('right');
  } else if (event.which === 38) {
    this.move('up');
  } else if (event.which === 40) {
    this.move('down');
  }
}

GameController.prototype.run = function() {
  $(document).keyup(this.handleKeyUp.bind(this));
}
