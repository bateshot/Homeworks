var canvas = document.getElementById('cvs'),
	width = canvas.clientWidth,
	height = canvas.clientHeight,
	boardWidth = 38, // represents the number of horizontal gameboard boxes
	squareSize = width / boardWidth,
	boardHeight = height / squareSize;
	
var snakeObj = {
	init: function(){
		var centerW = Math.floor(boardWidth / 2),
			centerH = Math.floor(boardHeight / 2);
		this.direction = {x: 1, y: 0};
		this.score = 0;
		this.length = 3;
		
		this.members = [{x: centerW, y: centerH}, {x: centerW - 1, y: centerH}, {x: centerW - 2, y: centerH}];
		return this;
	}	
}

var gameObj = function(){
	var speed = 120,
		gameObj = {
		init: function(){
			this.running = false;
			this.speed = speed;
			return this;
		},
		increaseSpeed: function(){
			if(speed >= 5){
				speed -= 5;
				this.speed = speed;
				console.log('speed increased: ' + this.speed);
			}
		},
		decreaseSpeed: function(){
			if(speed <= 900){
				speed += 5;
				this.speed = speed;
			}
		}
	}
	return gameObj;
}();

var foodObj = function(){
	var food = {
		init: function(){
			this.x = Math.round(Math.random() * (boardWidth - 4)) + 2;
			this.y = Math.round(Math.random() * (boardHeight - 4)) + 2;
			return this;
		}
	}
	return food;
}();

var food = Object.create(foodObj).init();
var game = Object.create(gameObj).init();
var snake = Object.create(snakeObj).init();
