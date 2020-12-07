var PLAY = 1;
var END = 0;
var START = 1;
var gameState = PLAY;

var reward1, reward2, reward3, reward4, reward5, reward6, reward7, reward8, reward9, reward10, reward11, reward12, reward13, reward14, reward0, reward; 
var boy, boy1, bo;
var back,ga,gam ; 
    

function preload(){
  reward1 = loadImage("badge_legendary.png");
  reward2 = loadImage("badge_rare.png");
  reward3 = loadImage("badge_uncommon.png");
  reward4 = loadImage("champion_rare.png");
  reward5 = loadImage("festbook_with_bg.png");
  reward6 = loadImage("hardwork_common.png");
  reward7 = loadImage("hardwork_uncommon.png");
  reward8 = loadImage("hats-blue-hat@3x.11d9dac8.png");
  reward9 = loadImage("hats-green-hat@3x.6a8f543b.png");
  reward10 = loadImage("hats-orange-hat@3x.909e859b.png");
  reward11 = loadImage("hats-purple-hat@3x.603a279e.png");
  reward12 = loadImage("hats-red-hat@3x.989e4727.png");
  reward13 = loadImage("timeliness_common.png");
  reward14 = loadImage("timeliness_rare.png");
  reward0 = loadImage("download.jpeg");
  boy = loadImage("Screenshot 2020-12-05 110201.png");
  boy1 = loadImage("boy2.jpg");
  back = loadImage("digital-coding-785.jpg");
  ga = loadImage("gameOver.png");
  gam = loadImage("restart.png")
  

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
bo = createSprite(50,330,20,50);
  bo.addImage(boy)
  bo.scale = 0.3
  
    ground = createSprite(width/2,height/2,width,2);
  ground.addImage(back);
  ground.x = width/2
  ground.scale = 7;
  ground.velocityX = -6;
  
  
   invisibleGround = createSprite(width/2,height-10,width,125);  
  invisibleGround.visible = false;
  
   gameOver = createSprite(width/2,height/2);
  gameOver.addImage(ga);
  
  restart = createSprite(width/2,height/2+50);
  restart.addImage(gam);
  restart.scale = 0.3;
  
  score = 0;
  score1 = 0;

   bo.depth = ground.depth;
   bo.depth = bo.depth+10;
   obstaclesGroup = new Group();
  rewardGroup = new Group();
  gameOver.visible = false;
  restart.visible = false;
  


}

function draw(){
   background("blue");
  /*if(gameState === START){
    back.visible = false;
    bo.visible = false;
    score.visible = false;
    score1.visible = false;
    //text("WhiteHat Junior little coder, this is a game made for you all, this is your journy to become a young coder. The WhiteHat Jr. Path To Become a Founder From being CEO for a Day to reaching Silicon Valley, WhiteHat Jr is about learning with rewards in your journey to be a Founder. press space bar or click on the screen to start", width/2,height/2);
    if(keyDown("SPACE") ){
      gameState === PLAY;
      
    }
      
  
  }*/ 
  if(gameState === PLAY){
     back.visible = true;
    bo.visible = true;
    score.visible = true;
    score1.visible = true;
     score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
     if (ground.x < 0){
      ground.x = ground.width/2;
     }
    if(keyDown("SPACE")&& bo.y >= height-150) {
      bo.velocityY = -15;
     }
    bo.velocityY = bo.velocityY + 0.8
    bo.collide(invisibleGround);
  spawnObstacles()
    spawnreward()
    if(rewardGroup.isTouching(bo)){
        // collidedSound.play()
        score1 = score1+1
      rewardGroup.destroyEach();
    }
     if(obstaclesGroup.isTouching(bo)){
        // collidedSound.play()
        gameState = END;
    }
  }else if (gameState === END) {
//     gameOver.visible = true;
//     restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    bo.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    rewardGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    rewardGroup.setLifetimeEach(-1);
    bo.visible = false;
    game()
    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
  }
  drawSprites();
  textSize(20);
  fill("yellow");
  text("Survival Time: "+ score, 500,50);
  text("Score: "+ score1, 50,50);
}
function spawnObstacles() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(600,height-95,20,30);
    obstacle.setCollider('circle',0,0,100)
    obstacle.addImage(reward0)
     obstacle.velocityX = -(6 + 3*score/100);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    obstacle.depth = back.depth;
    obstacle.depth +=1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    
  }
}

function spawnreward() {
  if(frameCount % 100 === 0) {
    reward = createSprite(600,height-305,20,30);
    reward.setCollider('circle',0,0,45)
    // obstacle.debug = true
  
    reward.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,9));
    switch(rand) {
      case 1: reward.addImage(reward1);
              break;
      case 2: reward.addImage(reward2);
              break;
      case 3: reward.addImage(reward3);
              break;
      case 4: reward.addImage(reward5);
              break;
      case 5: reward.addImage(reward14);
        reward.visible = false;
              break;
      case 6: reward.addImage(reward11);
              break;
      case 7: reward.addImage(reward12);
              break;
      case 8: reward.addImage(reward10);
              break;             
      case 9: reward.addImage(reward9);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    reward.scale = 0.3;
    reward.lifetime = 300;
    rewardGroup.add(reward);
  }
}

function game() {
  //gameState = PLAY;
  gameOver.visible = true;
  restart.visible = true;
  
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  rewardGroup.destroyEach();
  
  gameOver.depth = rewardGroup.depth
  gameOver.depth = gameOver.depth + 1
  //trex.changeAnimation("running",trex_running);
  
  score = 0;
  score1 = 0;
  
}
