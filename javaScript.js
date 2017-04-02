ticTacToe = {};
ticTacToe.squares = [];

//Create the renderer
var renderer = PIXI.autoDetectRenderer(600, 600);
var width = renderer.width;
var height = renderer.height;

//Add the canvas to the div with ID Canvas
document.getElementById("canvas").appendChild(renderer.view);

//Create our main container object and call it the `stage`
var stage = new PIXI.Container();

//load the textures we need into the texture cache 
PIXI.loader.add(["graphics/x.png", "graphics/o.png"]);
var TextureCache = PIXI.utils.TextureCache;
var xTexture = TextureCache["graphics/x.png"];
var oTexture = TextureCache["graphics/o.png"];

//this will be a contructor for each square of the grid
ticTacToe.Square = function(){
	this.container = new PIXI.Container;
	this.backGround = new PIXI.Graphics;
	// this part creates the light blue background
	this.backGround.beginFill(0xB51F6);
	this.backGround.lineStyle(1, 0xB51F6, 1);
	this.backGround.drawRect(0,0,width/3, height/3);
	this.backGround.endFill();
	this.container.addChild(this.backGround);
	stage.addChild(this.container);
	
	// this part creates the X and O sprites
	this.spriteX = new PIXI.Sprite(xTexture);
	this.container.addChild(this.spriteX);

	renderer.render(stage);

	
}

var firstSquare = new ticTacToe.Square;

// this draws the grid
var lines = new PIXI.Graphics;
lines.lineStyle(4, 0xFFFFFF, 1);
lines.moveTo(width/3, 0);
lines.lineTo(width/3, height);
lines.moveTo((width/3)*2, 0);
lines.lineTo((width/3)*2, height);
lines.moveTo(0, height / 3);
lines.lineTo(width, height /3);
lines.moveTo(0, (height / 3) *2 );
lines.lineTo(width, (height / 3) *2 );
stage.addChild(lines);
renderer.render(stage);