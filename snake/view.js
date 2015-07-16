var ctx = canvas.getContext('2d'),
	snColor = {
		fill: 'green',
		stroke: 'lightgreen'
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
		
	apple.src = 'apple.png'
		
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
	ctx.fillStyle = '#aaa';
	ctx.strokeStyle = 'black';
	ctx.fillRect(0, 0, width, height);
	ctx.strokeRect(0, 0, width, height);
	ctx.fillStyle = 'white';
	ctx.fillRect(squareSize, squareSize, width - (squareSize * 2), height - (squareSize * 2));
	ctx.strokeRect(squareSize, squareSize, width - (squareSize * 2), height - (squareSize * 2));
	
}

function drawScore(snakeObj){
	ctx.font = '' + height / 5 + 'px arial';
	ctx.textAlign = 'center';
	ctx.strokeStyle = 'rgba(220, 220, 220, 0.5)';
	ctx.strokeText(snakeObj.score, width / 2, height / 4);
}

function drawGameOver(score, hScore){
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
//localStorage.setItem('highScore', 0);
drawBoard();
drawSnake(snake);
