const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

let ground;
let ball;
let boxes = [];

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

    ball = Bodies.circle(
        100,
        400,
        20,
        {
            restitution: 0.8,
        }
    );
    World.add(world, ball);

    rectMode(CENTER);
    ellipseMode(RADIUS);

    createCastle()
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

    push();
    translate(
        ball.position.x,
        ball.position.y
    );

    rotate(ball.angle);

    fill(50);

    ellipse(
        0,
        0,
        20
    );
    pop();

    drawCastle();
}

function keyPressed() {
    if(key === " ") {
        Body.applyForce(
            ball,
            ball.position,
            {
                x: 0.08,
                y: -0.03
            }
        );
    }
}

function createCastle() {
    let startX = 650;
    let startY = 420;

    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 5; col++) {
            let box = Bodies.rectangle(
                startX + col * 45,
                startY - row * 45,
                40,
                40,
                {
                    restitution: 0.2
                }
            );
            boxes.push(box);
            World.add(world, box);
        }
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