var canvas = document.getElementById('cvs'),
	bgCanvas = document.getElementById('bgCanvas'),
	width = canvas.clientWidth,
	height = canvas.clientHeight,
	boardWidth = 38, // represents the number of horizontal gameboard boxes
	squareSize = width / boardWidth,
	boardHeight = height / squareSize,
	gameOver = true;
	
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
		init: function(obstacles){
			this.running = false;
			this.speed = speed;
			this.obstacles = obstacles;
			return this;
		},
		increaseSpeed: function(){
			if(this.speed >= 65){
				//speed -= 5;
				this.speed -= 5;
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
		init: function(coord){
			this.x = coord.x;
			this.y = coord.y;
			return this;
		}
	}
	return food;
}();

// var food = Object.create(foodObj).init({x:2, y:2});
// var game = Object.create(gameObj).init(generateObstacles(5));
// var snake = Object.create(snakeObj).init();
