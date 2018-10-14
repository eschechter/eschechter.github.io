var food;
var foodExists;
var snake;
var snakeHead;
var gameStarted;
var framerate;
var score;
var highscore = 0;
var name = "";

var database = firebase.database();
var root = database.ref();

root.on('child_added', function(dataSnapshot){

	var data = dataSnapshot.val();
	if(data.score > highscore){
		highscore = data.score;
		name = data.name;
	}

	$("#highscore").text("High Score: " + highscore + " by " + " " + name)

})

function setup(){

	foodExists = false;
	gameStarted = false;
	framerate = 10;
	score = 0;

	createCanvas(420, 420);
	snakeHead = createSprite(217.5 , 217.5, 14, 14);
	snakeHead.setSpeed(0.0000001, 45);
	snakeHead.shapeColor = color(0,255,0);
	snake = new Group();
	snake.add(snakeHead);
	$("#score").text("Score: " + score);


}


function draw(){

	frameRate(framerate);

	background(0);

	if(keyWentDown(UP_ARROW) && !(snakeHead.getDirection() == 90) ){
		snakeHead.setSpeed(15, -90);
		gameStarted = true;
	}
	else if(keyWentDown(LEFT_ARROW) && !(snakeHead.getDirection() == 0)){
		snakeHead.setSpeed(15, 180);
		gameStarted = true;
	}
	else if(keyWentDown(RIGHT_ARROW) && !(snakeHead.getDirection() == 180)){
		snakeHead.setSpeed(15, 0);
		gameStarted = true;
	}
	else if(keyWentDown(DOWN_ARROW) && !(snakeHead.getDirection() == -90) ){
		snakeHead.setSpeed(15, 90);
		gameStarted = true;
	}

	if(!foodExists){

		var x = random(30, width-30);
		var y = random(30, width-30);

		food = createSprite(x - (x % 15) + 7.5 ,y - (y % 15) + 7.5, 14, 14);
		food.shapeColor = color(255,0,0);
		foodExists = true;
	}

	snakeHead.overlap(food, eatFood);

	drawSprites();

	if (gameStarted){

		for (var i = 1; i < snake.length; i++){

			var current = snake.get(i);
			var previous = snake.get(i - 1);

			current.nextX = previous.position.x;
			current.nextY = previous.position.y;
		}

		for (var i = 1; i < snake.length; i++){

			snake.get(i).position.x = snake.get(i).nextX;
			snake.get(i).position.y = snake.get(i).nextY;
		}

		if (snakeHead.position.x < 0 || snakeHead.position.x > width ||snakeHead.position.y < 0 || snakeHead.position.y > width)
			gameOver();


		for (var i = 2; i < snake.length; i++){
			if (snakeHead.overlap(snake.get(i))){
				gameOver();
			}
		}
	}
}

function eatFood(){
	food.remove();
	foodExists = false;


	for (var i = 0; i < 3; i++) {
		var x;
		var y;

		if (snake.length == 1){
			if (snakeHead.getDirection() == 0){
				x = snakeHead.position.x - 15;
				y = snakeHead.position.y;
			}
			else if (snakeHead.getDirection() == 90){
				x = snakeHead.position.x;
				y = snakeHead.position.y - 15;
			}
			else if (snakeHead.getDirection() == 180){
				x = snakeHead.position.x + 15;
				y = snakeHead.position.y;
			}
			else {
				x = snakeHead.position.x;
				y = snakeHead.position.y + 15;
			}
		}
		else {

			var last = snake.get(snake.length - 1);
			var secondLast = snake.get(snake.length - 2);

			if(last.position.x > secondLast.position.x){
				x = last.position.x + 15;
				y = last.position.y;
			}
			else if (last.position.x < secondLast.position.x){
				x = last.position.x - 15;
				y = last.position.y;
			} 

			else if (last.position.y > secondLast.position.y){
				x = last.position.x;
				y = last.position.y + 15;
			} 
			else {
				x = last.position.x;
				y = last.position.y - 15;
			}
		}

		var snakePart = createSprite(x, y, 14, 14);
		snakePart.shapeColor = color(0,255,0);
		snake.add(snakePart);
		
	}

	framerate+= 0.5;
	score++;

	$("#score").text("Current Score: " + score);

}

function gameOver(){
	$("#buttonHolder").append("<button onclick = 'reset()' id = 'reset'> Reset </button>");
	$("#buttonHolder").append("<button onclick = 'submit()' id = 'submit'> Submit Score </button>");
	$("#buttonHolder").append("<input id = 'name' placeholder = 'Name'>");

	noLoop();
}


function reset(){

	print(snake.length);

	while(snake.length != 0){
		snake.get(0).remove();
	}

	food.remove();

	setup();
	loop();

	$("#reset").remove();
	$("#submit").remove();
	$("#name").remove();

}

function submit(){
	root.push({"score" : score, 
		"name" : $('#name').val()
	});
	$("#submit").remove();
	$("#name").remove();

}



