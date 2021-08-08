var ghost,ghostImg;
var ground,groundImg;
var invisibleGround;
var spikeGroup,spikeImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var gameOver,gameOverImg;

function preload(){
 ghostImg = loadImage("ghostR2.jpg");
 groundImg = loadImage("ground1.jpg");
 spikeImg = loadImage("spike1.jpg");
 gameOverImg = loadImage("gameOver.jpg");
}

function setup() {
 createCanvas(400,400);

 ghost = createSprite(50,300);
 ghost.addImage("flying",ghostImg);
 ghost.scale = 0.3;
 
 ground = createSprite(170,445);
 ground.addImage("floor",groundImg);
 ground.scale = 2;
 
 
 invisibleGround = createSprite(200,370,400,20);
 invisibleGround.visible = false;

 

 ground.depth = ghost.depth;
 
 ghost.depth = ghost.depth+1;

 gameOver = createSprite(200,200);
 gameOver.addImage("over",gameOverImg);
 gameOver.visible = false;

 spikeGroup = createGroup();

 //ghost.debug = true;
}

function draw() {
 background("black");
 textSize(20);
 text("Score: "+score,300,50);
 if(gameState===PLAY){
     if(keyDown("SPACE") && ghost.y > 250){
         ghost.velocityY = -13;
     }
     ghost.velocityY = ghost.velocityY + 0.8;

     score = score + Math.round(getFrameRate()/60);

     ground.velocityX = -(4 + score/100);
     if(ground.x < 0){
         ground.x = ground.width/2
     }

     spawnSpikes();

     if(spikeGroup.isTouching(ghost)){
         gameState = END;
     }

 }else if(gameState===END){
     spikeGroup.destroyEach();
     ghost.destroy();
     ground.destroy();
     invisibleGround.destroy();
     gameOver.visible = true;
 }

 ghost.collide(invisibleGround);

 drawSprites();
}


function spawnSpikes(){
    if(frameCount%(Math.round(random(60,90)))===0) {
        var spike = createSprite(400,350);
        spike.addImage("spiky",spikeImg);
        spike.scale = 0.1;
        spike.velocityX = -(6 + score/100);

        spike.depth = ground.depth;
        ground.depth = ground.depth+1;

        spike.depth = ghost.depth;
        ghost.depth = ghost.depth+1;

        spike.lifetime = 600;
        spikeGroup.add(spike);
    }    
        
    
}