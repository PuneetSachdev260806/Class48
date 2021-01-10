var bg1, bg2, bg3, bg4, bg5, bgmain, mbg2;

var r1, r2, r3, r4, r5;

var name, height1;

var smoke, flame;

var score = 0;

var obstacle,obstacle1, obstacle2, obstacle3;

var obstaclesGroup;

var trajectory = [];

var gameState = 0;

var retry;

function preload() {
  bg1 = loadImage("images/bg1.jpg");
 // bg2 = loadImage("images/bg6.jpg");
  bg3 = loadImage("images/bg3.jpg");
  bg4 = loadImage("images/bg4.jpg");
  bg5 = loadImage("images/bg5.jpg");
  bg6 = loadImage("images/bg6.jpg");
  r1 = loadImage("images/r1.png");
  r2 = loadImage("images/r2.png");
  //r3 = createImg("r3.gif");
  r3 = loadGif("images/r3.gif");
  r4 = loadImage("images/r4.png");
  r5 = loadImage("images/r5.png");
  bgmain = loadImage("images/bgmain.jpg");
  smoke = loadImage("images/smoke.png");
  flame = loadImage("images/flame.png");
  obstacle1 = loadImage("images/asteroid.png");
  obstacle2 = loadImage("images/meteor.png");
  obstacle3 = loadImage("images/obstacle.png");
}


function setup() {
  createCanvas(1200,800);
 // button = createButton('START');
 // button.position(700,600);
 r1s = createSprite(200,450);
  r2s = createSprite(400,450);
  //r3s = createSprite(600,450);
  r4s = createSprite(800,450);
  r5s = createSprite(1000,450);
  mbg2 = createSprite(600,800,1200,800);

  retry = createButton('RETRY');
  retry.position(600,200);
 // retry.visible = false;

 height1 = Math.round(random(2500,7359));
  r1s.addImage(r1);
  r2s.addImage(r2);
  //r3s.addGif(r3);
  r4s.addImage(r4);
  r5s.addImage(r5);
  score =  - r2s.y;
  mbg2.addImage(bg6);
  mbg2.velocityY = 2;
  mbg2.visible = false;

  obstaclesGroup = createGroup();

  
}


function draw() {
  if (gameState===0){
  
  background(bgmain); 
  //r3.position(200,180);
  // image(r3, 120, 140);
  stroke("white");
  textSize(36);
  text("Space Rocketzz!", 570,80);
  // add story here
  stroke("red");
  textSize (19);
  text("Welcome to SPACE ROCKETZZ !  In this game, you will have the choice to select any of the given Rockets and fly them to SPACE!",60,125);
  textSize (15);
  text("Click on you favourite rocket and fly them without colliding with asteroids, meteors and space garbage to Fail the Mission! Remember to reach the TARGET Height!",45,172);
  retry.hide();

  

  
  if (mousePressedOver(r1s)) {
    gameState = 1;
   // name = "r1s";
    r1s.scale = 0.38;
    r1s.x = 440;
    r1s.y = 235;
    r1s.visible = true;
    r2s.visible = false;
   // r3s.visible = false;
    r4s.visible = false;
    r5s.visible = false;
  }
  if (mousePressedOver(r2s)) {
    gameState = 1;
    name = "r2s";
    r2s.scale = 0.37;
    r2s.x = 440;
    r2s.y = 235;
    r2s.visible = true;
    r1s.visible = false;
   // r3s.visible = false;
    r4s.visible = false;
    r5s.visible = false;
  }
 /* if (mousePressedOver(r3s)) {
    gameState = 1;
    r3s.scale = 0.35;
    r3s.x = 450;
    r3s.y = 150;
    r3s.visible = true;
    r2s.visible = false;
    r1s.visible = false;
    r4s.visible = false;
    r5s.visible = false;
  }*/
  if (mousePressedOver(r4s)) {
    gameState = 1;
    r4s.scale = 0.45;
    r4s.x = 440;
    r4s.y = 235;
    r4s.visible = true;
    r2s.visible = false;
   // r3s.visible = false;
    r1s.visible = false;
    r5s.visible = false;   
  }
  if (mousePressedOver(r5s)) {
    gameState = 1;
    r5s.scale = 0.32;
    r5s.x = 440;
    r5s.y = 235;
    r5s.visible = true;
    r2s.visible = false;
    //r3s.visible = false;
    r4s.visible = false;
    r1s.visible = false;
  }
  //button.mousePressed(()=>{
  // gameState = 1;
   
 // });
}
 if (gameState===1){
  //button.hide();
  background(bg1);
  retry.hide();
  textSize(26);
  stroke("Black");
  text("Press the Arrow Keys To Lift the Rocket",width-500,100);
  stroke ("red");
  text("Target Height : "+height1+"m",50,100);
  
  stroke("black");
  text("Height :"+ -r2s.y, height-750,200);

  if (keyDown(UP_ARROW)&& name === "r2s"){
    r2s.velocityY = r2s.velocityY-0.5;
    r2s.velocityX = 0.105
   console.log(r2s.velocityY);  
    //console.log(r2s.y);
   // camera.y = r2s.y;
   var position = [r2s.x-5, r2s.y+75];
  trajectory.push(position);
  for(var i=0; i<trajectory.length; i++){
    image(smoke,trajectory[i][0],trajectory[i][1]);
  }
   if (r2s.velocityY < -3.5){
    gameState=2;
   }

  }

}

  
  if(gameState===2){
  
    retry.hide();
   console.log(score);
mbg2.visible = true;
 
    r2s.depth = mbg2.depth+1;
    camera.position.y = r2s.y;
    camera.position.x = displayWidth/2
  
      spawnObstacles();

   r2s.velocityY = 0;
   r2s.rotation = r2s.rotation+0.6;
   if (r2s.rotation>5){
     r2s.rotation = 5;

   }
  if(mbg2.y > 500) {
    mbg2.y = 400;
  }
  if(obstaclesGroup.isTouching(r2s)){
    gameState = 3;
  }


} 

  if(gameState===3){
    r2s.destroy();
    obstaclesGroup.destroyEach();
    mbg2.velocityY = 0;
    //retry.visible = true;
    //if (retry.mousePressed()){
     // gameState = 0;
    //}
  }
  
  drawSprites();
  if(gameState===2){
    
    textSize(26);
   // stroke("Black");
   // text("Press the Arrow Keys To Lift the Rocket",width-500,100);
    stroke ("red");
    text("Target Height : "+height1+"m",920,50);
   // var score =  - r2s.y;
   score = score + 20;
    stroke("black");
    text("Height :"+ score,201,30);
  }
  if (gameState===3){
    textSize(26);
    stroke("green");
    text("Game Over ! ",550,100);
    text ("Click on RETRY to Play again", 550, 170);
  }

}

function spawnObstacles() {
  if(frameCount % 230 === 0) {
    var obstacle = createSprite(random(200,800),-20,10,40);
    obstacle.velocityY = random(2,6);
    obstacle.velocityX = random(-2,2);
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    console.log(rand);
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
      obstacle.scale = 0.3;
              break;
      case 2: obstacle.addImage(obstacle2);
      obstacle.scale = 0.2;
              break;
      case 3: obstacle.addImage(obstacle3);
      obstacle.scale = 0.25;
              break;
      /*case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;*/
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    //obstacle.scale = 0.5;
    //obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
