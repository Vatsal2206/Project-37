var database;
var foodStock,foodSprite;
var feedFood;
var lastFed,feedTime;
var foodS;
var bedroomI,deadI,foodStockI,gardenI,livingroomI,washroomI;
var currentTime;
var gameStateRef,gameState;

function preload(){

  deadI = loadImage("images/deadDog.png");
  
  foodStockI = loadImage("images/Food Stock.png");

  bedroomI = loadImage("images/Bed Room.png");
  gardenI = loadImage("images/Garden.png");
  livingroomI = loadImage("images/Living Room.png");
  washroomI = loadImage("images/Wash Room.png")
    
}

function setup() {
  createCanvas(600, 700);
  
  database = firebase.database();

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  feedFood = createButton('Feed the dog')
  feedFood.position(700,20)
  feedFood.mousePressed(feedDog);

  foodSprite = new Food();

  
}

function draw() {  
  background(7, 171, 122)

  drawSprites();

  gameStateRef = database.ref('gameState');
  gameStateRef.on("value",function(data){
    gameState = data.val();
  })

  feedTime = database.ref('FeedTime');
  feedTime.on("value",function(data){
    lastFed = data.val();
  })

  fill(242, 239, 24)
  textSize(20)
  if(lastFed > 12){
    text("Last Feed : " + lastFed % 12 + " PM",280,25)
  }else if(lastFed === 0){
    text("Last Feed : 12 AM",280,25)
  }else if(lastFed < 12){
    text("Last Feed : " + lastFed + " AM",280,25)
  }else if(lastFed === 12){
    text("Last Feed : 12 PM",280,25)
  }
  
  console.log(lastFed)
  

  if(foodS >= 20){
    foodS = 20;
  }
  if(foodS <= 0){
    foodS = 0;
  }

  currentTime = hour();

  if(currentTime === (lastFed + 1)){
    update("playing");

  }
  if(currentTime === (lastFed + 3) && currentTime < (lastFed + 5)){
    update("sleeping");

  }
  if(currentTime === (lastFed + 5) && currentTime < (lastFed + 6)){
    update("bathing");

  }
  if(currentTime > (lastFed + 6)){
    update("hungry");

  }

  if(gameState === "playing"){
    foodSprite.garden();
    feedFood.hide();

    fill("yellow")
    textSize(30)
    text("Tommy is playing!",100,100)
  }

  if(gameState === "sleeping"){
    foodSprite.bedroom();
    feedFood.hide();
    
    fill("yellow")
    textSize(30)
    text("Tommy is sleeping!",100,100)
  }

  if(gameState === "bathing"){
    foodSprite.washroom();
    feedFood.hide();
    
    fill("yellow")
    textSize(30)
    text("Tommy is taking a bath!",100,100)
  }

  if(gameState === "hungry"){
    foodSprite.livingroom();
    
    fill("yellow")
    textSize(30)
    text("Tommy is hungry! Feed him food...",100,100)
  }

  console.log(gameState)
  console.log(foodS)

  
}

function readStock(data) {
  foodS = data.val();
  foodSprite.updateFoodStock(foodS);
}

function feedDog(){
  foodS--
  database.ref('/').update({
    Food : foodS,
    FeedTime : hour()
  })

}


function update(state){
  database.ref('/').update({
    gameState : state
  })
}