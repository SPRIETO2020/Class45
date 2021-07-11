var canvas;
var gameState = 0;
var woodScore = 0;
var ironScore = 0;
var bookScore = 0;

//global variables
var dream, dreamIMG;
var chest, chestIMG, bg, bgIMG;
var wood1, wood2, wood3, woodIMG;
var iron1, iron2, iron3, ironIMG;
var book1, book2, book3, bookIMG;
var ranboo, ranbooForward, ranbooLeft, ranbooRight, ranbooBack;
var zombie1, zombie2, spider, creeper;
var zombiaIMG, spiderIMG, creeperIMG;
var restart, restartIMG;
var leftWall, rightWall, upperWall, lowerWall;


function preload() {
  //downloading images
  dreamIMG = loadImage("sprites/hello_dream.png");

  bgIMG = loadImage("sprites/background.png");

  ranbooForward = loadImage("sprites/forward_ranboo.gif");
  ranbooBack = loadImage("sprites/back_ranboo.gif");
  ranbooLeft = loadImage("sprites/left_ranboo.gif");
  ranbooRight = loadImage("sprites/right_ranboo.gif");

  woodIMG = loadImage("sprites/wood.PNG");
  ironIMG = loadImage("sprites/iron.PNG");
  bookIMG = loadImage("sprites/book.PNG");

  chestIMG = loadImage("sprites/chest.png");

  zombieIMG = loadImage("sprites/zombie.webp");
  creeperIMG = loadImage("sprites/creeper.png");
  spiderIMG = loadImage("sprites/spider.webp");

  restartIMG = loadImage("sprites/heart.png");
}

function setup() {
  canvas = createCanvas(900,900);

  //create person
  dream = createSprite(700,695);
  dream.addImage(dreamIMG);
  dream.scale = 1.5;

  //create the bg
  bg = createSprite(450,450);
  bg.addImage(bgIMG);
  bg.scale = 8;

  //creating chest
  chest = createSprite(450,450);
  chest.addImage(chestIMG);
  chest.scale = 0.4;

  //create the player
  ranboo = createSprite(450,750,60,60);
  ranboo.addImage(ranbooForward);
  ranboo.scale = 0.7;

  //create material and mobs
  spawnMaterials();
  spawnMobs();

  //create restart
  restart = createSprite(450,450);
  restart.addImage(restartIMG);
  restart.scale = 0.3;

  //walls
  leftWall = createSprite(-550, 450, 20, 2000);
  rightWall = createSprite(1450, 450, 20, 2000);
  upperWall = createSprite(450, 1450, 2000, 20);
  lowerWall = createSprite(450, -550, 2000, 20);

  //insible game state 0
  dream.visible = true;

  //invisible game state 1
  bg.visible = false;
  chest.visible = false;
  ranboo.visible = false;
  wood1.visible = false;
  wood2.visible = false;
  wood3.visible = false;
  iron1.visible = false;
  iron2.visible = false;
  iron3.visible = false;
  book1.visible = false;
  book2.visible = false;
  book3.visible = false;
  zombie1.visible = false;
  zombie2.visible = false;
  creeper.visible = false;
  spider.visible = false;
  restart.visible = false;

  //invisible game state 3
}


function draw() {
  background("black");
  drawSprites();
  console.log(gameState);
  console.log (ranboo.x, ranboo.y);

  if(gameState == 0) {
    fill("white");
    stroke("white");
    textSize(30);
    text("hello!  :)", 100, 100);
    text("what are you doing? it's been a while! ure not busy", 100, 200);
    text("rn, right? cool. i wouldn't mind a bit of ur help atm.", 100, 240);
    text("it's nothing much, just, ah, a bit of wood, iron, and", 100, 340);
    text("some books. that's it! surely u can do that. 3 of each.", 100, 380);
    text("just, like, put them in that chest over there when ur", 100, 420);
    text("done. and don't touch the mobs.", 100, 460);
    text("u know how to do this. use the arrow keys. easy, right?", 100, 560);
    text("press enter to start. i'll wait here.", 100, 660);
    text("--  Dream", 100, 700);textSize(100);
    textFont("impact");
    text("ENDERWALK", 120, 830);

    if(keyDown("ENTER")) {
      gameState = 1;
    }
  }

  if(gameState == 1) {
    dream.visible = false;
    bg.visible = true;
    chest.visible = true;
    ranboo.visible = true;
    wood1.visible = true;
    wood2.visible = true;
    wood3.visible = true;
    iron1.visible = true;
    iron2.visible = true;
    iron3.visible = true;
    book1.visible = true;
    book2.visible = true;
    book3.visible = true;
    zombie1.visible = true;
    zombie2.visible = true;
    creeper.visible = true;
    spider.visible = true;
    restart.visible = false;

  //moving the camera
  camera.x = ranboo.x;
  camera.y = ranboo.y;

  //making the player move and change animation
  if(keyDown("UP_ARROW")) {
    ranboo.y = ranboo.y - 10;
    ranboo.addImage(ranbooBack);
  }
  if(keyDown("DOWN_ARROW")) {
    ranboo.y = ranboo.y + 10;
    ranboo.addImage(ranbooForward);
  }
  if(keyDown("LEFT_ARROW")) {
    ranboo.x = ranboo.x - 10;
    ranboo.addImage(ranbooLeft);
  }
  if(keyDown("RIGHT_ARROW")) {
    ranboo.x = ranboo.x + 10;
    ranboo.addImage(ranbooRight);
  }

  //making characters stay in the perimeter
  ranboo.bounceOff(leftWall);
  ranboo.bounceOff(rightWall);
  ranboo.bounceOff(upperWall);
  ranboo.bounceOff(lowerWall);
  zombie1.bounceOff(leftWall);
  zombie1.bounceOff(rightWall);
  zombie1.bounceOff(upperWall);
  zombie1.bounceOff(lowerWall);
  zombie2.bounceOff(leftWall);
  zombie2.bounceOff(rightWall);
  zombie2.bounceOff(upperWall);
  zombie2.bounceOff(lowerWall);
  creeper.bounceOff(leftWall);
  creeper.bounceOff(rightWall);
  creeper.bounceOff(upperWall);
  creeper.bounceOff(lowerWall);
  spider.bounceOff(leftWall);
  spider.bounceOff(rightWall);
  spider.bounceOff(upperWall);
  spider.bounceOff(lowerWall);

  //increase wood score
  if(ranboo.isTouching(wood1)) {
    wood1.destroy();
    woodScore = woodScore + 1;
  }
  if(ranboo.isTouching(wood2)) {
    wood2.destroy();
    woodScore = woodScore + 1;
  }
  if(ranboo.isTouching(wood3)) {
    wood3.destroy();
    woodScore = woodScore + 1;
  }

  //increase iron score
  if(ranboo.isTouching(iron1)) {
    iron1.destroy();
    ironScore = ironScore + 1;
  }
  if(ranboo.isTouching(iron2)) {
    iron2.destroy();
    ironScore = ironScore + 1;
  }
  if(ranboo.isTouching(iron3)) {
    iron3.destroy();
    ironScore = ironScore + 1;
  }

  //increase book score
  if(ranboo.isTouching(book1)) {
    book1.destroy();
    bookScore = bookScore + 1;
  }
  if(ranboo.isTouching(book2)) {
    book2.destroy();
    bookScore = bookScore + 1;
  }
  if(ranboo.isTouching(book3)) {
    book3.destroy();
    bookScore = bookScore + 1;
  }
  
  //end game
  if(ranboo.isTouching(chest) && woodScore == 3 && ironScore == 3 && bookScore == 3) {
    gameState = 2;
  }
  if(ranboo.isTouching(zombie1) || ranboo.isTouching(zombie2) || ranboo.isTouching(creeper) || ranboo.isTouching(spider)) {
    gameState = 3;
  }

  //display scores
  fill("white");
  stroke("white");
  //strokeWeight(2);
  textSize(30);
  text("Wood: "+ woodScore, ranboo.x - 225, ranboo.y - 100);
  text("Iron: "+ ironScore, ranboo.x - 225, ranboo.y);
  text("Books: "+ bookScore, ranboo.x - 225, ranboo.y + 100);
  }

  //make final page
  if(gameState == 2) {
    camera.x = 450;
    camera.y = 450;

    dream.visible = true;
    bg.visible = false;
    chest.visible = false;
    ranboo.visible = false;
    wood1.visible = false;
    wood2.visible = false;
    wood3.visible = false;
    iron1.visible = false;
    iron2.visible = false;
    iron3.visible = false;
    book1.visible = false;
    book2.visible = false;
    book3.visible = false;
    zombie1.visible = false;
    zombie2.visible = false;
    creeper.visible = false;
    spider.visible = false;
    restart.visible = false;

    fill("white");
    stroke("white");
    textSize(30);
    text("hey! u got it! i'll be taking that now. thank u for ur", 100, 100);
    text("collaboration!", 100, 140);
    textSize(20);
    text("as always...", 290, 140);
    textSize(30);
    text("hm? oh, nothing. ehh, don't worry ab it.", 100, 180);
    text("u never fail to amaze me, ranboo! i might just, like,", 100, 280);
    text("consider u, like, a friend at this point. haha! that's", 100, 320);
    text("a little funny. it's funny.", 100, 360);
    text("anyways, u can go back home now.", 100, 460);

    text("Just remember the lessons you've learned.", 100, 560);
    text(":)      -- Dream", 100, 600);

    textSize(100);
    textFont("impact");
    text("GAME OVER", 120, 800);
  }

  if(gameState == 3) {
    camera.x = 450;
    camera.y = 450;

    dream.visible = false;
    bg.visible = false;
    chest.visible = false;
    ranboo.visible = false;
    restart.visible = true;
    wood1.destroy();
    wood2.destroy();
    wood3.destroy();
    iron1.destroy();
    iron2.destroy();
    iron3.destroy();
    book1.destroy();
    book2.destroy();
    book3.destroy();
    zombie1.destroy();
    zombie2.destroy();
    creeper.destroy();
    spider.destroy();

    fill("white");
    stroke("white");
    textSize(100);
    textFont("impact");
    text("GAME OVER", 220, 200);
    textSize(30);
    textFont("arial");
    text("dude! why r u touching the mobs?!", 215, 260);
    text("well, whatever, i guess. just try again.", 205, 660);
    text("press space.", 350, 700);

    if(keyWentDown("space") && gameState == 3) {
      gameState = 1;
      woodScore = 0;
      ironScore = 0;
      bookScore = 0;
      spawnMaterials();
      spawnMobs();
    }
  }
}


function spawnMaterials() {
  //create wood
  wood1 = createSprite(random(-400,1300), random(-400,1190), 30, 30);
  wood1.addImage(woodIMG);
  wood1.scale = 0.1;
  wood2 = createSprite(random(-400,1300), random(-400,1190), 30, 30);
  wood2.addImage(woodIMG);
  wood2.scale = 0.1;
  wood3 = createSprite(random(-400,1300), random(-400,1190), 30, 30);
  wood3.addImage(woodIMG);
  wood3.scale = 0.1;

  //create iron
  iron1 = createSprite(random(-400,1300), random(-400,1190), 30, 30);
  iron1.addImage(ironIMG);
  iron1.scale = 0.1;
  iron2 = createSprite(random(-400,1300), random(-400,1190), 30, 30);
  iron2.addImage(ironIMG);
  iron2.scale = 0.1;
  iron3 = createSprite(random(-400,1300), random(-400,1190), 30, 30);
  iron3.addImage(ironIMG);
  iron3.scale = 0.1;

  //create books
  book1 = createSprite(random(-400,1300), random(-400,1190), 30, 30);
  book1.addImage(bookIMG);
  book1.scale = 0.1;
  book2 = createSprite(random(-400,1300), random(-400,1190), 30, 30);
  book2.addImage(bookIMG);
  book2.scale = 0.1;
  book3 = createSprite(random(-400,1300), random(-400,1190), 30, 30);
  book3.addImage(bookIMG);
  book3.scale = 0.1;
}


function spawnMobs() {
  zombie1 = createSprite(random(-400,1300), random(-400,1190), 30, 30);
  zombie1.addImage(zombieIMG);
  zombie1.scale = 0.3;
  zombie1.velocityX = -3;
  zombie1.velocityY = 2;
  zombie2 = createSprite(random(-400,1300), random(-400,1190), 30, 30);
  zombie2.addImage(zombieIMG);
  zombie2.scale = 0.3;
  zombie2.velocityX = 3;
  zombie2.velocityY = -2;

  creeper = createSprite(random(-400,1300), random(-400,1190), 30, 30);
  creeper.addImage(creeperIMG);
  creeper.scale = 0.35;
  creeper.velocityX = 5;
  creeper.velocityY = 3;

  spider = createSprite(random(-400,1300), random(-400,1190), 30, 30);
  spider.addImage(spiderIMG);
  spider.scale = 0.15;
  spider.velocityX = 3;
  spider.velocityY = -5;
}