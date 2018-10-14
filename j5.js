var balls = [];
var cnv;


function Ball(x,y,xv,yv,s,r,g,b){

	this.x_velocity = xv;
	this.y_velocity = yv;
	this.x_position = x;
	this.y_position = y;
	this.ball_size = s;
	this.red = r;
	this.green = g;
	this.blue = b;


}

Ball.prototype.animate = function() {

	if (this.x_position + this.ball_size / 2 >= width || this.x_position - this.ball_size / 2 <= 0){
		this.x_velocity = -this.x_velocity;
	}
	if (this.y_position + this.ball_size / 2 >= height || this.y_position - this.ball_size / 2 <= 0){
		this.y_velocity = -this.y_velocity;
	}

	this.x_position += this.x_velocity;
	this.y_position += this.y_velocity;

	noStroke()
	fill(this.red, this.green, this.blue)
	ellipse(this.x_position, this.y_position, this.ball_size, this.ball_size);

};

function setup(){
	cnv = createCanvas(window.innerWidth,window.innerHeight);
	cnv.parent('canvas')
	for (var i = 0; i < 100; i++) {
		var x = new Ball(Math.random() * window.innerWidth, Math.random() * window.innerHeight,(Math.random() * 6 - 3),(Math.random() * 6 -3), Math.random() * 30 + 20 ,Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255))
		balls.push(x);
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function draw(){
	background(255);
	for (var i = 0; i < balls.length; i++) {
		balls[i].animate();
	}
}







