let x, y, diameter
let friction = .8
let velocity = 0
let moveSpeed = 2
let rectX, rectY, rectW, rectH
let rectSpeed = 10
let score = 0
let bird1,bird2,bird3,bird4,bird5, car
const animRate = 50


function preload() {
    car = loadImage('assets/car.png')
    bird1 = loadImage('assets/bird1.png');
    bird2 = loadImage('assets/bird2.png');
    bird3 = loadImage('assets/bird3.png');
    bird4 = loadImage('assets/bird4.png');
    bird5 = loadImage('assets/bird5.png');
  }

function setup(){
    createCanvas(windowWidth, windowHeight)
    frameRate(60)
    background('green')
    x = windowWidth/2
    diameter = 110
    y = 200
    rectW = 20
    rectH = 100
    rectX = windowWidth
    rectY = windowHeight - rectH
}

function showRect(){
    stroke('black')
    fill('white')
    rect(rectX, rectY, rectW, rectH)
    rect(rectX, 0, rectW, rectH)
}

function updateRect(){
    rectX -= rectSpeed 
    if(rectX <= 0){
        rectX = windowWidth
        rectH = random(100, 300)
        rectY = windowHeight - rectH  
    }
}

function show(){
    ellipseMode(CENTER)
    imageMode(CENTER)
    /*fill(0,0,0,0)
    stroke(0,0,0,0)
    ellipse(x, y, diameter)*/  
    
    // let a = frameCount % animRate/10
    // if(a<1)image(bird1, x, y)
    // if(a>=1&&a<2)image(bird2, x, y)
    // if(a>=2&&a<3)image(bird3, x, y)
    // if(a>=3&&a<4)image(bird4, x, y)
    // if(a>=4)image(bird5, x, y)
    image(car, x, y)
}

function update(){
    // velocity += gravity
    velocity *= friction
    y += velocity 

    if(y > windowHeight - diameter/2){
        y = windowHeight - diameter/2
        velocity = 0
    }
    if(y < 0 + diameter/2){
        y = 0 + diameter/2
        score +=4
        velocity = 0
    }

    if(keyIsDown(UP_ARROW)){
        velocity = velocity - moveSpeed
    }
    if(keyIsDown(DOWN_ARROW)){
        velocity = velocity + moveSpeed
    }
    
}

function colision(){
    //cirklens nederste punkt er x, y+diameter/2
    //cirklens øverste punkt er x, y-diameter/2
    /*let d = dist(x, y, rectX, rectY)
    if(d<diameter/2){
        score -=1
        y=rectY-diameter/2
    }*/
    if(x > rectX && x < rectX + rectW){
        if(y < rectH || y > windowHeight - rectH){
            score -= 1      
        }
    }
}

function draw(){
    background('green')
    show()
    update()
    showRect()
    updateRect()
    select('#info').html(score)
    colision()

  
}

// function keyPressed(key){
//     if(key.key == ' '){
//         velocity -= updrift
//     }
// }


