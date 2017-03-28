$(document).ready(function() {

  var gameModel = new GameModel();
  var gameView = new GameView();
  var gameController = new GameController(gameModel, gameView);
  gameView.update(gameModel);
  gameController.run();

});
