var x;
var level, backGround;
var level1Img, level2Img;
var inxGround;
var player;
var playerImg, knifePlayerImg;
var obstaclesGroup, obstacleImg;
var knifeImg, knifeGroup;
var life, lifeCount, lifeImg1, lifeImg2, lifeImg3;

function preload() {
  level1Img = loadImage("backgroundImg3.jpg");
  level2Img = loadImage("backgroundImg9.jpg");
  playerImg = loadAnimation("player_run1.png", "player_run2.png", "player_run3.png",
  "player_run4.png", "player_run5.png", "player_run6.png");
  knifeImg = loadImage("knife.gif");
  obstacleImg = loadImage("enemy.jpg");
  knifePlayerImg = loadImage("knifeplayer.png");
  lifeImg1 = loadImage("heart.png");
  lifeImg2 = loadImage("heart2.png");
  lifeImg3 = loadImage("heart3.png");

}



function setup() {
  createCanvas(windowWidth, windowHeight)
  
  x = createSprite(100,100,10,10)
  backGround = createSprite(windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  backGround.x = windowWidth/2;

  inxGround = createSprite(windowWidth/2, windowHeight-10, width, 10);

  player = createSprite(100, windowHeight-50, 10,10);
  player.addAnimation("running", playerImg);
  player.addAnimation("playerWithKnife", knifePlayerImg);
  player.scale = 1.5;

  life = createSprite(windowWidth-170, 70, 25,25);
  lifeCount = 3;
  life.scale = 0.3;

  obstaclesGroup = new Group();
  knifeGroup = new Group();
}


function draw() {
  background("black");

  if(lifeCount === 3) {
    life.addImage(lifeImg3);
  }

  if(lifeCount === 2) {
    life.addImage(lifeImg2);
  }

  if(lifeCount === 1) {
    life.addImage(lifeImg1);
  }

  level = 2;

  if(level === 1) {
      backGround.addImage(level1Img);
      backGround.scale = 2;
  }

  else if(level === 2) {
      backGround.addImage(level2Img);
      backGround.scale = 0.5;
  }

  backGround.velocityX = -5;
  if(backGround.x<500) {
    backGround.x = windowWidth/2;
  }

  if(keyWentDown("up")) {
    player.velocityY = -18;
    console.log("HELLO");
  }

  if(knifeGroup.isTouching(player)) {
    knifeGroup.setLifetimeEach(0);
    player.changeAnimation("playerWithKnife", knifePlayerImg);

  }

  if(lifeCount > 0 && obstaclesGroup.isTouching(player)) {
    lifeCount--;
    enemyGroup.destroyEach();
  }

  player.velocityY = player.velocityY + 0.5;

  player.collide(inxGround);
  inxGround.visible = false;

  //for (var i = 0; i < obstacleGroup.length; i++) { if (obstacleGroup.get(i).isTouching(knife)) { obstacleGroup.get(i).destroy(); player.score =player.score+1; } }

  spawnObstacles();
  spawnKnifes();

  drawSprites();
}

function spawnObstacles() {
  if(frameCount%170 === 0) {
    var obstacle = createSprite(windowWidth-20, inxGround.y-50, 20,20);
    //obstacle.shapeColor = "red";
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.2;
    obstacle.velocityX = -7;

    obstaclesGroup.add(obstacle);

  }


}

function spawnKnifes() {
  if(frameCount%100 === 0) {
    var knife = createSprite(windowWidth-20, inxGround.y-250, 20,20);
    knife.addImage(knifeImg);
    knife.scale = 0.55;
    knife.velocityX = -7;
    knife.lifetime = windowWidth/7;
    //knife.debug = true;
    knife.setCollider("rectangle", 0, 0, 20, 150, 43);


    knifeGroup.add(knife);

  }


}