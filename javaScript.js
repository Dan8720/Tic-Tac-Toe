ticTacToe = {};
ticTacToe.squares = [];
ticTacToe.turn = "o";

//Create the renderer
var renderer = PIXI.autoDetectRenderer(600, 600);
var width = renderer.width;
var height = renderer.height;

//Add the canvas to the div with ID Canvas
document.getElementById("canvas").appendChild(renderer.view);

//Create our main container object and call it the `stage`
var stage = new PIXI.Container();

//load the textures we need into the texture cache 
PIXI.loader.add(["x.png", "o.png"]).load(setup);

//this is a contructor for each square of the grid
ticTacToe.Square = function(){
	var self = this;
	this.container = new PIXI.Container;
	this.backGround = new PIXI.Graphics;
	// this part creates the light blue background
	this.backGround.beginFill(0xB51F6);
	this.backGround.lineStyle(1, 0xB51F6, 1);
	this.backGround.drawRect(0,0,width/3, height/3);
	this.backGround.endFill();
	this.container.addChild(this.backGround);
	//sets up the hit area and mouseDown callBack
	this.backGround.hitArea = this.backGround.getBounds();
	this.backGround.interactive = true;
	this.backGround.buttonMode = true;
	this.backGround.click = function(){
		if (ticTacToe.turn === "x"){
			if(self.spriteX.alpha === 0){
				self.xIn.start();
			}else{
				self.xOut.start()
			}
		}else{
			if(self.spriteO.alpha === 0){
				self.oIn.start();
			}else{
				self.oOut.start()
			}
		}
	};
	
	stage.addChild(this.container);
	// this part creates the X and O sprites
	this.spriteX = new PIXI.Sprite(PIXI.utils.TextureCache["x.png"]);
	this.container.addChild(this.spriteX);
	this.spriteX.anchor.set(0.5,0.5);
	this.spriteX.position.set(this.backGround.width / 2,this.backGround.height / 2);
	this.spriteX.scale.set(1.2);
	this.spriteX.alpha = 0;
	//tweens to fade in and out
	this.xAlpha = {alpha : 0};
	this.xIn = new TWEEN.Tween(this.xAlpha);
	this.xIn.to( {alpha : 1} , 500)
	this.xIn.onUpdate(function() {
		self.spriteX.alpha = self.xAlpha.alpha;
	});
	this.xIn.onStart(function(){self.backGround.interactive = false;});
	this.xIn.onComplete(function(){self.backGround.interactive = true;});

	this.xOut = new TWEEN.Tween(this.xAlpha);
	this.xOut.to( {alpha : 0} , 500)
	this.xOut.onUpdate(function() {
		self.spriteX.alpha = self.xAlpha.alpha;
	});
	this.xOut.onStart(function(){self.backGround.interactive = false;});
	this.xOut.onComplete(function(){self.backGround.interactive = true;});
	

	this.spriteO = new PIXI.Sprite(PIXI.utils.TextureCache["o.png"]);
	this.container.addChild(this.spriteO);
	this.spriteO.anchor.set(0.5,0.5);
	this.spriteO.position.set(this.backGround.width / 2,this.backGround.height / 2);
	this.spriteO.scale.set(1.2);
	this.spriteO.alpha = 0;

	this.oAlpha = {alpha : 0};
	this.oIn = new TWEEN.Tween(this.oAlpha);
	this.oIn.to( {alpha : 1} , 500)
	this.oIn.onUpdate(function() {
		self.spriteO.alpha = self.oAlpha.alpha;
	});
	this.oIn.onStart(function(){self.backGround.interactive = false;});
	this.oIn.onComplete(function(){self.backGround.interactive = true;});

	this.oOut = new TWEEN.Tween(this.oAlpha);
	this.oOut.to( {alpha : 0} , 500)
	this.oOut.onUpdate(function() {
		self.spriteO.alpha = self.oAlpha.alpha;
	});
	this.oOut.onStart(function(){self.backGround.interactive = false;});
	this.oOut.onComplete(function(){self.backGround.interactive = true;});
}

// global functions to manage the board 

ticTacToe.interactive = function(enable){
	ticTacToe.squares.forEach(function(value){
		value.backGround.interactive = enable;
	});
};

function setup() {
	// loop that draws all nine squares on the grid
	for(i=0; i < 9; ++i){
		var square = new ticTacToe.Square;
		square.container.position.set((i%3) * (width / 3), Math.floor((i/3)) * (height /3));
		ticTacToe.squares.push(square);
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
	//this draws the start game box
	ticTacToe.startGameContainer = new PIXI.Container;
	ticTacToe.startGameContainer.anchor = 0.5;
	ticTacToe.startGameContainer.startGameBackGround = new PIXI.Graphics;

	ticTacToe.startGameContainer.startGameBackGround.beginFill(0x001193);
	ticTacToe.startGameContainer.startGameBackGround.lineStyle(4, 0xFFFFFF, 1);
	ticTacToe.startGameContainer.startGameBackGround.drawRect(0, height / 4, width, height / 2);
	ticTacToe.startGameContainer.startGameBackGround.endFill();
	ticTacToe.startGameContainer.addChild(ticTacToe.startGameContainer.startGameBackGround);
	stage.addChild(ticTacToe.startGameContainer);
	// this is the text for our start game panel 
	ticTacToe.startGameContainer.textOne = new PIXI.Text("Choose Game Type",{fontFamily: "Arial", fontSize: 32, fill: "white"});
	ticTacToe.startGameContainer.addChild(ticTacToe.startGameContainer.textOne);
	ticTacToe.startGameContainer.textOne.anchor.set(0.5,0.5);
	ticTacToe.startGameContainer.textOne.position.set(width/2, height/2.5);

	ticTacToe.startGameContainer.textTwo = new PIXI.Text("Vs Computer",{fontFamily: "Arial", fontSize: 32, fill: "white"});
	ticTacToe.startGameContainer.addChild(ticTacToe.startGameContainer.textTwo);
	ticTacToe.startGameContainer.textTwo.anchor.set(0.5,0.5);
	ticTacToe.startGameContainer.textTwo.position.set(width/3, height/1.75);

	ticTacToe.startGameContainer.textThree = new PIXI.Text("Vs Player",{fontFamily: "Arial", fontSize: 32, fill: "white"});
	ticTacToe.startGameContainer.addChild(ticTacToe.startGameContainer.textThree);
	ticTacToe.startGameContainer.textThree.anchor.set(0.5,0.5);
	ticTacToe.startGameContainer.textThree.position.set((width/3) * 2, height/1.75);
}

ticTacToe.gameState = "NEW_GAME"
ticTacToe.interactive(false);
gameLoop();

}

function gameLoop(){
	requestAnimationFrame(gameLoop)
	TWEEN.update();
	renderer.render(stage);

	switch(ticTacToe.gameState){
		case "NEW_GAME":
		{

		}
	}

}