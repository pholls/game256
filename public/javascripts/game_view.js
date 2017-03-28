function GameView(){

}

GameView.prototype.update = function(model){
  flatten(model.board).forEach(function(cellValue, index){
    if(cellValue === '0'){
      $("#cell-" + index).text('');
      $("#cell-" + index).removeClass('blue').removeClass( 'yellow').addClass('gray');
    } else if(cellValue >= 256) {
      $("#cell-" + index).text(cellValue);
      $("#cell-" + index).removeClass('blue').removeClass( 'gray').addClass('yellow');
    } else {
      $("#cell-" + index).text(cellValue);
      $("#cell-" + index).removeClass('gray').removeClass( 'yellow').addClass('blue');
    }
  });
}

GameView.prototype.displayGameOver = function() {
  $('.grid-cell').removeClass('blue').addClass('gray');
  $('.hidden').show();
}
