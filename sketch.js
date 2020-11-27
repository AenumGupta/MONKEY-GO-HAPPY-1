var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var survivalTime=0,score=0;
var ground;
var gameState="play";

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
   ground=createSprite(300,350,800,10);
 ground.velocityX=-2;
  
  monkey=createSprite(30,316,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  obstacleGroup=new Group;
foodGroup=new Group;
  
}
function draw(){
  background(255,255,255);
  
   stroke("black");
  textSize(15);
  fill("black");
  text("Score :"+score,200,50);
  
  stroke("black");
  textSize(15);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time :- "+survivalTime,50 ,50);
 
if(ground.x <0){
    ground.x = ground.width/2;
  }  
 if(gameState==="play"){ 
  if(keyDown("space")){
    monkey.velocityY=-5;
  }
  
  monkey.velocityY=monkey.velocityY+0.6;
  monkey.collide(ground);
  
 
  
spawnObstacles();
  spawnFood();
   
   if(foodGroup.isTouching(monkey)){
     foodGroup.destroyEach();
     score=score+1;
   }
  if(obstacleGroup.isTouching(monkey)){
    gameState="end";
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();
    
  foodGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0); 
    }
  

drawSprites();
 }
  if(gameState==="end"){
    background("aqua");
    textSize(30);
    fill("pink");
    text("Game Over",150,200);
    
  }
  
  //text(mouseX+"x"+mouseY+"y",mouseX,mouseY);
  
  
}

function spawnObstacles(){
  
  if(frameCount%300===0){
    obstacle=createSprite(400,328);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-2;
    obstacle.scale=0.09;
    obstacle.lifetime=200;
    obstacleGroup.add(obstacle);
    
  }
  
}

function spawnFood(){
  
  if(frameCount%200===0){
    banana=createSprite(390,Math.round(random(120,200)));
    banana.addImage(bananaImage);
    banana.velocityX=-2;
    banana.scale=0.09;
    banana.lifetime=200;
    foodGroup.add(banana);
  }
  
}



