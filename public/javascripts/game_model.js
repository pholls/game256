function GameModel(boardString){
  // assumes boardString is valid
  // boardString = null if NOT VALID???
  var boardString = boardString || this.generateNewBoard();
  this.board = [  boardString.substr(0,4).split(''),
  boardString.substr(4,4).split(''),
  boardString.substr(8,4).split(''),
  boardString.substr(12,4).split('') ];
}

GameModel.prototype.generateNewBoard = function () {
  var boardString = '0000000000000000';
  firstLocation = randomizeIndex(boardString.length);
  boardString = replaceAt(boardString, firstLocation, '2');
  secondLocation = randomizeIndex(boardString.length);
  while(firstLocation === secondLocation){
    secondLocation = randomizeIndex(boardString.length);
  }
  boardString = replaceAt(boardString, secondLocation, '2');
  return boardString;
};

GameModel.prototype.toString = function(){
  var boardDisplay = '';
  this.board.forEach(function(row){
    boardDisplay = boardDisplay.concat(row.join('') + '\n');
  })
  return boardDisplay.replace(/\n$/, "");
}

// Squashes Board going to the <<RIGHT>>
GameModel.prototype.squashBoard = function () {
  var newBoard = [];
  this.board.forEach(function(row){
    newBoard.push(squashRow(row));
  });
  this.board = newBoard;
  return this.board;
};

function squashRow(row) {
  var cleanRow = row.filter(function(number){ return number > 0; });
  var newRow = [];

  for(i = cleanRow.length - 1; i >= 0; i--){
    if(cleanRow[i] === cleanRow[i-1]){
      newRow.unshift((cleanRow[i] * 2).toString());
      i--;
    } else {
      newRow.unshift(cleanRow[i]);
    }
  }
  return addZeros(newRow);
};

function addZeros(array){
  var numberOfZeros = 4 - array.length;
  for(i = 0; i < numberOfZeros; i++ ){
    array.unshift('0');
  }
  return array;
}

function randomizeIndex(length){
  return Math.floor(Math.random() * length);
}

function replaceAt(boardString, index, character) {
  return boardString.substr(0, index) + character + boardString.substr(index+character.length);
}

GameModel.prototype.transpose = function(){
  var new_array = [];
  for (var i = 0; i < this.board.length; i++) {
    var row = this.board[i];
    new_array[i] = [];
    for (var j = 0; j < row.length; j++) {
      new_array[i][j] = this.board[j][i];
    }
  }
  this.board = new_array;
}

GameModel.prototype.flip = function() {
  this.board.map(function(row) {
    return row.reverse();
  })
}

GameModel.prototype.moveRight = function() {
  this.squashBoard();
}

GameModel.prototype.moveLeft = function() {
  this.flip();
  this.squashBoard();
  this.flip();
}

GameModel.prototype.moveDown = function() {
  this.transpose();
  this.squashBoard();
  this.transpose();
}

GameModel.prototype.moveUp = function() {
  this.transpose();
  this.moveLeft();
  this.transpose();
}

GameModel.prototype.spawnBlock = function() {
  var flatBoard = flatten(this.board);
  var indicesOfZeroes = findZeroes(flatBoard);
  var spawnIndex = indicesOfZeroes[randomizeIndex(indicesOfZeroes.length)];
  var row = Math.floor(spawnIndex / 4);
  var col = spawnIndex % 4;
  this.board[row][col] = 2;
}

function flatten(array) {
  return array.reduce(function(a, b) {
    return a.concat(b);
  })
}

function findZeroes(array) {
  var indices = [];
  var index = array.indexOf('0');
  while (index != -1) {
    indices.push(index);
    index = array.indexOf('0', index + 1);
  }
  return indices;
}

function movesRemaining(board) {
  var zeroes = [];
  board.forEach(function(row) {
    zeroes.push(findZeroes(row))
  })
  if (flatten(zeroes).length > 0) {
    return true
  } else {
    return false
  }
}

GameModel.prototype.gameOver = function() {
  var testObject = new GameModel();
  testObject.board = this.board;
  testObject.moveUp();
  testObject.moveLeft();
  testObject.moveDown();
  testObject.moveRight();
  if (testObject.toString() === this.toString() && !movesRemaining(this.board)) {
    return true;
  } else {
    return false;
  }
}
