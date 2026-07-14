const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

let ground;
let balls = [];
let boxes = [];

let score = 0;
let currentBall = 0;
let destroyedBoxes = 0;

function setup() {
    createCanvas(900, 500);
    engine = Engine.create();
    world = engine.world;

    ground = Bodies.rectangle(
        width / 2,
        height - 10,
        width,
        20,
        {
            isStatic: true
        }
    );
    World.add(world, ground);

    rectMode(CENTER);
    ellipseMode(RADIUS);

    createCastle();
    createBalls();
}

function draw() {
    background(135, 206, 235);
    Engine.update(engine);

    fill(100);

    rect(
        ground.position.x,
        ground.position.y,
        width,
        20
    )

    drawCastle();
    drawBalls();

    text("Score: " + score, 20,30)

    updateScore();
}

function keyPressed() {
    if(key === " ") {
        if(currentBall < balls.length) {
            Body.setStatic(balls[currentBall], false);
            Body.applyForce(
                balls[currentBall],
                balls[currentBall].position,
                {
                    x: 0.1,
                    y: -0.03
                }
            );
            currentBall++;
        }
    }
}

function createCastle() {
    let startX = 650;
    let startY = 450;

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 4; col++) {
            let box = Bodies.rectangle(
                startX + col * 45,
                startY - row * 45,
                40,
                40,
                {
                    restitution: 0.2
                }
            );
            box.counted = false;
            box.startY = box.position.y;

            boxes.push(box);
            World.add(world, box);
        }
    }
}

function createBalls() {
    for (let i = 0; i < 5; i++) {
        let ball = Bodies.circle(
            150,
            455,
            20,
            {
                restitution: 0.8,
            }
        );
        Body.setStatic(ball, true);
        balls.push(ball);
        World.add(world, ball);
    }
}

function drawCastle() {
    fill(181, 101, 29);

    for (let box of boxes) {
        push();
        translate(
            box.position.x,
            box.position.y
        );

        rotate(box.angle);

        rect(
            0,
            0,
            40,
            40
        ),
        pop();
    }
}

function drawBalls() {
    fill(50);

    for (let ball of balls) {
        push();
        translate(
            ball.position.x,
            ball.position.y
        );

        rotate(ball.angle);

        ellipse(
            0,
            0,
            20
        );
        pop();
    }
}

function updateScore() {
    for (let box of boxes) {
        if(!box.counted && (abs(box.angle) > 0.5 || box.position.y > box.startY + 60)) {
            box.counted = true;
            score += 10;
            destroyedBoxes++;
        }
    }

    if(destroyedBoxes == boxes.length || score >= 120) {
        push();
        fill(0,150,0);
        textSize(35);
        textAlign(CENTER);
        text("Você Venceu!", width/2, 50);
        pop();
    }
}