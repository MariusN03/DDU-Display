let currentPage = '#splash'
let canvas 
let ballgameStarted = false

//ballgame stuff
let x, y, diameters
let friction = .75   
let moveSpeed = 3
let velocity = 0
let rectX, rectY, rectW, rectH
let rectSpeed = 4
let score = 0
let bird1, bird2, bird3, bird4, bird5, car
const animRate = 50

function preload() {
    bird1 = loadImage('assets/bird-1.png')
    bird2 = loadImage('assets/bird-2.png')
    bird3 = loadImage('assets/bird-3.png')
    bird4 = loadImage('assets/bird-4.png')
    bird5 = loadImage('assets/bird-5.png')
    car = loadImage('assets/car.png')
}



function setup(){
    canvas = createCanvas(windowWidth, windowHeight)
    background('orange')
    //MQTT STUFF
    //forsøg at oprette forbindelse til MQTT serveren 
    client = mqtt.connect('wss://mqtt.nextservices.dk')

    //hvis forbindelsen lykkes kaldes denne funktion
    client.on('connect', (m) => {
        console.log('Client connected: ', m)
        console.log('You are now connected to mqtt.nextservices.dk')
    })
    
    client.subscribe('joystick')

    client.on('message',(topic, message) => {
        if(message == 'press'){
            console.log('press')
            if(rectSpeed == 4){
                rectSpeed = 10
                
            }
        }
        if(message == 'joystickL'){
            velocity = velocity - moveSpeed
            console.log('left')
        }
        if(message == 'joystickR'){
            velocity = velocity + moveSpeed
            console.log('right')
        }
        
    })
    

    //BALLGAME STUFF
    x = windowWidth/2
    diameter = 133
    // y = diameter/2
    y = windowHeight - windowHeight/3.5
    carW = 70
    totalW = windowWidth - carW - 20
    rect1W = 100
    rect2W = totalW - 100
    rectH = 40
    rectX = windowWidth - rect1W
    rectY = 0

}

function draw(){
    if(ballgameStarted){
        background('orange')
        update()
        showRect()
        updateRect()
        show()
        select('#info').html(score)
        collission()
    }
}

function showRect(){
    rect(rectX, rectY, rect1W, rectH)
    rect(0, rectY, rect2W, rectH)
}

function updateRect(){
    rectY += rectSpeed 
    if(rectY >= windowHeight){
        rect1W = random(50, 200)
        rect2W = totalW - rect1W
        rectX = windowWidth - rect1W
        rectY = 0  
    }
}

function show(){
    ellipseMode(CENTER)
    imageMode(CENTER)
    angleMode(DEGREES)
    // ellipse(x, y, diameter)
    // let a = frameCount % animRate / 10
    // if(a <= 1)image(bird1, x, y)
    // if(a >= 1 && a < 2)image(bird2, x, y)
    // if(a >= 2 && a < 3)image(bird3, x, y)
    // if(a >= 3 && a < 4)image(bird4, x, y)
    // if(a >= 4)image(bird5, x, y)
    
    image(car, x, y, carW, 110)
    
}

function update(){
    velocity *= friction
    x += velocity 

    if(x > windowWidth - diameter/2){
        x = windowWidth - diameter/2
        velocity = -velocity
    }
    if(x < diameter/2){
        x = diameter/2
        score += 4
        //velocity = -velocity
    }

    if(keyIsDown(65)){
        velocity = velocity - moveSpeed
    }
    if(keyIsDown(68)){
        velocity = velocity + moveSpeed
    }
}

function collission(){
    //cirklens nederste punkt er x, y + diameter/2
    //ciklens øverste punkt er x, y - diameter/2
    if(x > rectX && x < rectX + rect1W){
        if(x < rect1W || x > windowWidth - rect1W){
            score -= 1
        }
    }
    if(x > rectX && x < rectX + rect2W){
        if(x < rect2W || x > windowWidth - rect2W){
            score -= 1
        }
    }
}
function shift (newPage) {
    select(newPage).addClass('show')
    select(currentPage).removeClass('show')
    currentPage = newPage
    if(newPage = '#boldspil'){
        select('#ballgame').child(canvas)
        ballgameStarted = true
    }
}    

function keyPressed(key) {
    if (key.key == 1) shift('#splash')
    if (key.key == 2) shift('#boldspil')
    if (key.key == 3) shift('#task')
    console.log(key.key)
    // if(key.key == 'ArrowUp'){
    //     velocity -= updrift
    // }    
  }