var player, canvas, ground, jump = 10, gravity = 0.4, pl1, pl2;
var fpl1, fpl2, fpl3, fpl4, fpl5, fpl6;// floating platform
var p, p2, p3, p4, p5;// player animation
var g, plI1, fplI, teleI;// ground, tele, floating platform, platform image/animation
var level = 1;// level counter
var edges, tele;
var coin1, coin2, coin3, coin4, coin5, coin6, coin7, coin8;
var coinA, coinA2, cc;
var coinsCollected  = 0;
var runtime = 0;

function preload(){
 p = loadImage('./images/player.png');
 p2 = loadImage('./images/player2.png');
 p3 = loadAnimation('./images/player2.png','./images/player3.png');
 p4 = loadImage('./images/player4.png');
 p5 = loadImage('./images/player3.png')
 g = loadImage('./images/ground.png');
 s = loadImage('./images/sky.png');
 plI1 = loadImage('./images/pl1.png');
 fplI = loadImage('./images/fpl1.png');
 teleI = loadAnimation('./images/tele1.png','./images/tele2.png','./images/tele3.png','./images/tele1.png','./images/tele1.png','./images/tele4.png','./images/tele5.png','./images/tele6.png','./images/tele7.png','./images/tele1.png','./images/tele1.png','./images/tele1.png','./images/tele8.png','./images/tele9.png','./images/tele10.png','./images/tele1.png');
 coinA2 = loadImage('./images/coin1.png');
 coinA = loadAnimation('./images/coin1.png','./images/coin2.png','./images/coin3.png','./images/coin4.png','./images/coin5.png','./images/coin6.png');
}
function setup(){
  canvas = createCanvas(1318, 625);

  ground = createSprite(width/2,height-10,width*2,30);
  ground.addImage('Ground',g);

  pl1 = createSprite(150,530,300,200);
  pl1.addImage('Pl1',plI1);

  pl2 = createSprite(300,530,300,200);
  pl2.addImage('Pl1',plI1);

  tele = createSprite(1240,550,20,100)
  tele.addAnimation('teleporter',teleI);

  coin1 = createSprite(300,570,20,20);
  coin1.addAnimation('coin',coinA);

  coin2 = createSprite(500,570,20,20);
  coin2.addAnimation('coin',coinA);

  coin3 = createSprite(700,570,20,20);
  coin3.addAnimation('coin',coinA);

  coin4 = createSprite(900,570,20,20);
  coin4.addAnimation('coin',coinA);

  coin5 = createSprite(900,570,20,20);
  coin5.addAnimation('coin',coinA);  

  cc = createSprite(1100,50,20,20);
  cc.addAnimation('coin',coinA2);
  
  fpl1 = createSprite(100,615,200,50);fplI
  fpl1.addAnimation('coin',fplI);
  player = createSprite(30,300,25,60);
  player.addAnimation('Player1',p);
  player.addAnimation('Player2',p2);
  player.addAnimation('left',p3);
  player.addImage('r',p4);
  player.addImage('jumpleft',p5)
}
function draw(){
  background(s);
  textSize(20);
  fill(0);
  text(" " + coinsCollected, 1115,57);
  move();
  fill(0,0,0,100);
  rect(0,0,1318,700);
  edges = createEdgeSprites();
  player.bounceOff(edges[0]);
  player.bounceOff(edges[1]);
  player.bounceOff(edges[2]);

  if(level === 1){
    coin1.visible = true;
    coin2.visible = true;
    coin3.visible = true;
    coin4.visible = true;
    gravity = 1.2;
    jump = 9;
    coinCollection(coin1);
    coinCollection(coin2);
    coinCollection(coin3);
    coinCollection(coin4);
  }else{
    coin1.visible = false;
    coin2.visible = false;
    coin3.visible = false;
    coin4.visible = false;
  }

  ////////////////////////////////////////// Level 2 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  if(level === 2){
    coin5.visible = true;
    gravity = 0.6;
    jump = 13;
    tele.y = 380;
    tele.x = 800;
    coin5.y = 340;
    coin5.x = 430;
    pl2.x = 700;
    pl1.visible = true;
    pl2.visible = true;
    Gravity(player,pl1);
    Gravity(player,pl2);
    coinCollection(coin5);
  }else{
    pl1.visible = false;
    pl2.visible = false;
    coin5.visible = false;
  }

  if(level === 3){
    fpl1.visible = true;
    gravity = 1.2;
    jump = 9;
    tele.y = 380;
    tele.x = 800;
    Gravity(player,fpl1);
  }else{
    fpl1.visible = false;
  }

  if(player.isTouching(tele) && level === 1){
    player.x = 30;
    player.y = 340;
    level = 2
  }

  if(player.isTouching(edges[3])){
    player.x = 30;
    player.y = 340;
  }

  if(player.isTouching(tele) && level === 2){
    player.y = 500;
    player.x = 30;
    level = 3;
  }

  if(level === 1){
    Gravity(player,ground);
    ground.visible = true;
  }else{
    ground.visible = false;
  }

  drawSprites();
}

function Gravity(player,ground){

  if(player.isTouching(ground)){
    player.velocityY = 0;
    player.collide(ground);
    if(keyDown(UP_ARROW)){
      player.velocityY = jump * -1;
    }    
  }
  else{
    player.velocityY = player.velocityY + gravity;
  }
  
}

function move(){
  if(keyDown(RIGHT_ARROW)){
    player.x += 13;
    player.changeAnimation('r',p4);
  }
  if(keyWentUp(RIGHT_ARROW)){
    player.changeAnimation('Player1',p);
  }
 
  if(keyDown(LEFT_ARROW)){
    player.x += 13 * -1;
    player.changeAnimation('left',p3);
  }

  if(keyWentUp(LEFT_ARROW)){
    player.changeAnimation('Player2',p2);
  }

  if(keyDown(UP_ARROW) && keyDown(RIGHT_ARROW)){
    player.changeAnimation('r',p4);
  }
  if(keyDown(UP_ARROW) && keyDown(LEFT_ARROW)){
    player.changeAnimation('jumpleft',p5);
  }
}

function coinCollection(coin){
  if(player.isTouching(coin)){
    coinsCollected += 1;
    console.log(coinsCollected);
    coin.destroy();
  }
}