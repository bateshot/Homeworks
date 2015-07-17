var ctx = canvas.getContext('2d'),
	bgCtx = bgCanvas.getContext('2d'),
	snColor = {
		fill: 'green',
		stroke: 'lightgreen'
	},
	enColor = {
		fill: '#aaa',
		stroke: 'black'
	},
	bgColor = {
		fill: 'white'
	},
	apple = new Image();
		// ctx.fillRect(10, 10, 10, 10);
		// ctx.beginPath();
		// ctx.moveTo(20, 20);
		// ctx.lineTo(140, 20);
		// ctx.lineTo(140, 140);
		// ctx.lineTo(20, 140);
		// ctx.closePath();
		// ctx.stroke();
		// ctx.endPath();
		
	apple.src = 'apple.png';
	
	//INITIAL SCREEN
	bgCtx.font = '' + height / 10 + 'px arial';	
	bgCtx.textAlign = 'center';
	bgCtx.fillStyle = bgColor.fill;
	bgCtx.fillRect(0, 0, width, height);
	bgCtx.fillStyle = 'black';
	bgCtx.fillText('Take on Snake', width / 2 , height / 2);
	bgCtx.font = '' + height / 20 + 'px arial';	
	bgCtx.fillText('by Nikola Vushkov', width / 2 , height / 2 + height / 10);
	//INITIAL SCREEN

function drawSnake(snakeObj) {
	snakeObj.members.forEach(function(pos){
		var x = pos.x * squareSize,
			y = pos.y * squareSize;
		ctx.beginPath();
		ctx.arc(x, y, squareSize / 2 + (0.1 * squareSize), 0, 2*Math.PI, true);
		ctx.fillStyle = snColor.fill;
		ctx.strokeStyle = snColor.stroke;
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	})
}

function drawFood(food) {
	var x = food.x * squareSize,
		y = food.y * squareSize;
		
	ctx.drawImage(apple, 0, 0, apple.width, apple.height, x - (squareSize * 1.5 / 2), y - (squareSize * 1.5 / 2), squareSize * 1.5, squareSize * 1.5);
	// ctx.beginPath();
	// 	ctx.arc(x, y, squareSize / 2, 0, 2*Math.PI, true);
	// 	ctx.fillStyle = 'red';
	// 	ctx.strokeStyle = 'black';
	// 	ctx.fill();
	// 	ctx.stroke();
	// 	ctx.closePath();
}

function drawBoard(){
	var x, y;
	bgCtx.fillStyle = enColor.fill;
	bgCtx.strokeStyle = enColor.stroke;
	for(var i =  0; i < boardWidth; i++) {
		x = i * squareSize;
		y = 0;
		bgCtx.fillRect(x, y, squareSize, squareSize);
		bgCtx.strokeRect(x, y, squareSize, squareSize);
		bgCtx.fillRect(x, boardHeight * squareSize - squareSize, squareSize, squareSize);
		bgCtx.strokeRect(x, boardHeight * squareSize - squareSize, squareSize, squareSize);
	};
	for(var k = 1; k < boardHeight - 1; k++) {
		x = 0;
		y = k * squareSize;
		bgCtx.fillRect(x, y, squareSize, squareSize);
		bgCtx.strokeRect(x, y, squareSize, squareSize);
		bgCtx.fillRect(boardWidth * squareSize - squareSize, y, squareSize, squareSize);
		bgCtx.strokeRect(boardWidth * squareSize - squareSize, y, squareSize, squareSize);
	};
	
}

function clearGameBoard(){
	ctx.fillStyle = bgColor.fill;
	ctx.fillRect(0, 0, width, height);
}

function clearCanvas(context){
	context.clearRect(0, 0, width, height);
}

function drawObstacles(){
	var x, y;
	game.obstacles.forEach(function(obst){
		x = obst.x * squareSize - (squareSize / 2);
		y = obst.y * squareSize - (squareSize / 2);
		bgCtx.fillStyle = enColor.fill;
		bgCtx.strokeStyle = enColor.stroke;
		bgCtx.fillRect(x, y, squareSize, squareSize);
		bgCtx.strokeRect(x, y, squareSize, squareSize);
	});
}

function drawScore(snakeObj){
	ctx.font = '' + height / 5 + 'px arial';
	ctx.textAlign = 'center';
	ctx.strokeStyle = 'rgba(220, 220, 220, 0.5)';
	ctx.strokeText(snakeObj.score, width / 2, height / 4);
}

function drawGameOver(score, hScore){
	clearCanvas(bgCtx);
	ctx.fillStyle = '#fff';
	ctx.fillRect(0, 0, width, height);
	ctx.textAlign = 'center';
	if(score >= hScore){
		ctx.font = '' + height / 10 + 'px serif';
		ctx.fillStyle = 'yellow';
		ctx.strokeStyle = 'black';
		ctx.fillText('HIGH SCORE: ' + score, width / 2, height / 2);
		ctx.strokeText('HIGH SCORE: ' + score, width / 2, height / 2);
	} else {
	
		ctx.font = '' + height / 5 + 'px serif';
		ctx.fillStyle = 'black';
		ctx.strokeStyle = 'gray';
		ctx.fillText('GAME OVER', width / 2, height / 4);
		ctx.strokeText('GAME OVER', width / 2, height / 4);
		ctx.font = '' + height / 10 + 'px serif';
		ctx.fillText('score: ' + score, width/2, height / 4 + height / 5);
		ctx.font = '' + height / 15 + 'px serif';
		ctx.fillText('high score: ' + hScore, width/2, height / 4 + height / 5 + height / 10);
	}
}

function drawFrame(food, snake){
	clearGameBoard();
	drawFood(food);
	drawSnake(snake);
	drawScore(snake);
}
//localStorage.setItem('highScore', 0);

//initial state
// drawBoard();
// drawObstacles();
// clearGameBoard();
// drawSnake(snake);
