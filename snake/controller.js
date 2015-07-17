var food,
	snake,
	game;
function updateSnake(snakeObj){
	var last = {},
		temp = {};
	snakeObj.members.forEach(function(pos){
		if(!last.x){
			last.x = pos.x;
			last.y = pos.y;
			pos.x = pos.x + snakeObj.direction.x;
			pos.y = pos.y + snakeObj.direction.y;
		} else {
			temp.x = pos.x;
			temp.y = pos.y;
			pos.x = last.x;
			pos.y = last.y;
			last.x = temp.x;
			last.y = temp.y;
		}
	});
	
}



//KEY PRESS HANDLERS:
document.onkeypress = function(e) {
    e = e || window.event;
    var charCode = (typeof e.which == "number") ? e.which : e.keyCode,
		newDir = {};
	
    if (charCode == 87 || charCode == 119) { //w
		newDir = {x: 0, y: -1}
		if(validateInput(snake.direction, newDir))
        	snake.direction = newDir;
    }
    if (charCode == 83 || charCode == 115) { //s
        newDir = {x: 0, y: 1}
		if(validateInput(snake.direction, newDir))
	        snake.direction = newDir;
    }
	if (charCode == 65 || charCode == 97) { //a
        newDir = {x: -1, y: 0}
		if(validateInput(snake.direction, newDir))
	        snake.direction = newDir;
    }
	if (charCode == 68 || charCode == 100) { //d
        newDir = {x: 1, y: 0}
		if(validateInput(snake.direction, newDir))
	        snake.direction = newDir;
    }
	if (charCode == 32) { //space
		if(gameOver){
			gameOver = false;
			newGame();
			
		} else {
			togglePause(game);	
		}
        
    }
};

//MAKES IMPOSSIBLE TO REVERSE THE SNAKE MOVING DIRECTION
function validateInput(direction, newDirection){
	if(Math.abs(direction.x) === Math.abs(newDirection.x) || Math.abs(direction.y) === Math.abs(newDirection.y))
		return false;
	else return true;
}

function togglePause(gameObj){
	if (gameObj.running){
		gameObj.running = false;
	}
	else {
		gameObj.running = true;
		setTimeout(animate, game.speed);
	}
}


function snakeCheck(snakeObj) {
	var arr = snakeObj.members,
		obst = game.obstacles,
		obstLen = obst.length,
		len = arr.length;
	if(arr[0].x <= 1 || arr[0].x >= boardWidth - 1 || arr[0].y <= 1 || arr[0].y >= boardHeight - 1) {
		return 'hit-wall';
	}
	for (var i = 0; i < len; i++) {
		if(i === 0){
			for (var k = 0; k < obstLen; k++) {
				if(arr[0].x === obst[k].x && arr[0].y === obst[k].y){
					return 'hit-wall';
				}		
			}
		}
		for (var j = i + 1; j < len; j++){
			if(arr[i].x === arr[j].x && arr[i].y === arr[j].y){
				return 'self-eat';
			}
		}
	}
	if (snakeObj.members[0].x == food.x && snakeObj.members[0].y == food.y ){
		eatFood(snakeObj);
	}
	return 'running';
}

function eatFood(snakeObj){
	food = Object.create(foodObj).init(foodCoord());
	snakeObj.score++;
	snakeObj.length ++;
	snakeObj.members.push({
		x: snakeObj.members[snakeObj.length -2].x - 1,
		y: snakeObj.members[snakeObj.length -2].y - 1
	});
	game.increaseSpeed();
}

function checkEnding(snakeObj) {
	var endCode = snakeCheck(snakeObj);
	if(endCode === 'hit-wall'){
		endGame('Wall encountered!', snakeObj.score);
	}
	if(endCode === 'self-eat'){
		endGame('Snake bite!', snakeObj.score);
	}
}

function endGame(reason, score) {
	var highScore = 'unsupported';
	console.log(reason);
	if(typeof(Storage) !== "undefined") {
    	if(!localStorage.getItem('highScore') || score > localStorage.getItem('highScore')){
			localStorage.setItem('highScore', score);					
		}
		highScore = localStorage.getItem('highScore');	
	} else {
	    // Sorry! No Web Storage support..
	}
	drawGameOver(score, highScore);
	gameOver = true;
}

function generateObstacles(num){
	var obstacles = [],
		x,
		y;
		for(var i = 0; i < num; i++){
			x = Math.round(Math.random() * (boardWidth - 8)) + 4;
			y = Math.round(Math.random() * (boardHeight - 8)) + 4;
			obstacles.push({
				x: x,
				y: y
			});
			obstacles.push({
				x: x + 1,
				y: y
			});
			obstacles.push({
				x: x + 1,
				y: y + 1
			});
			obstacles.push({
				x: x,
				y: y + 1
			});
		}
	return obstacles;
}

function foodCoord(){
	var x = Math.round(Math.random() * (boardWidth - 4)) + 2,
		y = Math.round(Math.random() * (boardHeight - 4)) + 2,
		unique = true;
		
		game.obstacles.forEach(function(obst){
			if(obst.x == x && obst.y == y){
				unique = false;
			}
		});
		snake.members.forEach(function(el){
			if(el.x == x && el.y == y){
				unique = false;
			}
		});
		if(unique){
			return {x: x, y: y};
		} else {
			console.log('wrong food placement prevented');
			return foodCoord();
		}
}

function newGame(){
	game = Object.create(gameObj).init(generateObstacles(5));
	snake = Object.create(snakeObj).init();
	food = Object.create(foodObj).init(foodCoord());
	clearCanvas(bgCtx);
	clearGameBoard();
	drawSnake(snake);
	drawFood(food);
	drawBoard();
	drawObstacles();
}

function animate(){
	if (game.running && !gameOver){
        setTimeout(animate, game.speed);
	}
    updateSnake(snake);		
	drawFrame(food, snake);
	checkEnding(snake);
}

//setTimeout(animate, game.speed);


// console.log(snake.members);
// updateSnake(snake);
// console.log(snake.members);