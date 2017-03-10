function GameView(){

}

GameView.prototype.update = function(model){
  flatten(model.board).forEach(function(cellValue, index){
    if(cellValue === '0'){
      $("#cell-" + index).text('');
      $("#cell-" + index).removeClass('blue', 'yellow').addClass('gray');
    } else if(cellValue >= 256) {
      $("#cell-" + index).removeClass('blue', 'gray').addClass('yellow');
    } else {
      $("#cell-" + index).text(cellValue);
      $("#cell-" + index).removeClass('gray', 'yellow').addClass('blue');
    }
  });
}

GameView.prototype.displayGameOver = function() {
  $('.grid-cell').removeClass('blue').addClass('gray');
  $('.hidden').show();
}
