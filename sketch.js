var PLAY=1;
var END=0
var gameState=PLAY

var trex, trex_running;

var ground, groundImg;

var invisibleGround;

var meteoro;

var meteoroImg;

var obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var obstaclesGroup, meteoroGroup;

var gameOver, gameOverImg, restart, restartImg

var trexCollided;

var jumpSound, checkPointSound, dieSound;

function preload(){

  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  
  groundImg=loadImage("ground2.png")

  meteoroImg=loadImage("meteoro.png")

  obstacle1=loadImage("obstacle1.png");

  obstacle2=loadImage("obstacle2.png");

  obstacle3=loadImage("obstacle3.png");

  obstacle4=loadImage("obstacle4.png");

  obstacle5=loadImage("obstacle5.png");

  obstacle6=loadImage("obstacle6.png");

  gameOverImg=loadImage("gameOver.png");

  restartImg=loadImage("restart.png");

  trexCollided=loadImage("trex_collided.png")

  jumpSound=loadSound("jump.mp3");

  checkPointSound=loadSound("checkpoint.mp3");

  dieSound=loadSound("die.mp3");
}

function setup(){
  createCanvas(windowWidth-20, windowHeight)
  
trex=createSprite(50, height-70, 20,50);
 trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trexCollided);
   trex.scale=0.7

ground=createSprite(width/2,height-50,width,2);
  ground.addImage(groundImg);

invisibleGround=createSprite(width/2,height+24,width,125)
 invisibleGround.visible=false

gameOver=createSprite(width/2,height/2-50);
 gameOver.addImage(gameOverImg)

restart=createSprite(width/2,height/2)
 restart.addImage(restartImg)

obstaclesGroup=new Group();

meteoroGroup=new Group();

score=0

trex.debug=false;
}

function draw(){

background("white");

if(gameState===PLAY){
textSize(30); 
 fill("green") 
  text("pontuação:"+score, 20, 710);
   score=score+Math.round(getFrameRate()/60);

  spawnmeteoros();

  spawnObstacles();

if(score>0&&score%750===0){

 checkPointSound.play();
}

if(touches.length>0 || keyDown("space")&& trex.y>257){
 trex.velocityY=-10;

 jumpSound.play();

 touches=[];
}
trex.velocityY=trex.velocityY+0.5;

ground.velocityX=-(2+3*score/1000);

if(ground.x<0){
  ground.x=ground.width/2;
}
 

if(obstaclesGroup.isTouching(trex)){

 gameState=END;

 dieSound.play();
}

gameOver.visible=false;

restart.visible=false;
}
else if(gameState===END){

ground.velocityX=0;

obstaclesGroup.setLifetimeEach(-1);
cloudsGroup.setLifetimeEach(-1);

obstaclesGroup.setVelocityXEach(0);

meteoroGroup.setVelocityXEach(0);

gameOver.visible=true;

restart.visible=true;

trex.changeAnimation("collided",trexCollided)
trex.velocityY=0

if(mousePressedOver(restart)){ 
  reset(); 
}
}

 trex.collide(invisibleGround);

  drawSprites();
}

function spawnmeteoros(){

if(frameCount %80===0){
  meteoro=createSprite(windowWidth, 100, 40,10)
  meteoro.velocityX=-3;
  meteoro.addImage(meteoroImg);
  meteoro.scale=0.8;
  meteoro.y=Math.round(random(100, 220));

  meteoro.depth=trex.depth;
 trex.depth=trex.depth+1;

 meteoro.lifetime=530;

 meteoroGroup.add(meteoro);
}
}

function spawnObstacles(){

if(frameCount %70===0){
 obstacle=createSprite(windowWidth, windowHeight-75, 10,40),
  obstacle.velocityX=-(6+score/1000);
   var rand=Math.round(random(1,6));
    switch(rand){

     case 1: obstacle.addImage(obstacle1);
     break;
     
     case 2: obstacle.addImage(obstacle2);
     break;

     case 3: obstacle.addImage(obstacle3);
     break;

     case 4: obstacle.addImage(obstacle4);
     break;

     case 5: obstacle.addImage(obstacle5);
     break;

     case 6: obstacle.addImage(obstacle6);
     break;

     default:break
    }
     obstacle.lifetime=260;
      obstacle.scale=0.8;

obstaclesGroup.add(obstacle)
}
}

function reset(){

gameState = PLAY; obstaclesGroup.destroyEach(); 

meteoroGroup.destroyEach(); score = 0;

trex.changeAnimation("running",trex_running);

gameOver.visible = false;

restart.visible = false; 
}
