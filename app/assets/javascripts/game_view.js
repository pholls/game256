function GameView(){

}

GameView.prototype.update = function(model){
  flatten(model.board).forEach(function(cellValue, index){
    if(cellValue === '0'){
      $("#cell-" + index).text('');
      $("#cell-" + index).removeClass('blue', 'goldenrod').addClass('gray');
    } else if(cellValue >= 256) {
      $("#cell-" + index).removeClass('blue', 'gray').addClass('goldenrod');
    } else {
      $("#cell-" + index).text(cellValue);
      $("#cell-" + index).removeClass('gray', 'goldenrod').addClass('blue');
    }
  });
}

GameView.prototype.displayGameOver = function() {
  $('.grid-cell').removeClass('blue').addClass('gray');
  $('.hidden').show();
}
