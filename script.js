const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

function setup() {
    createCanvas(900, 500);

    engine = Engine.create();
    world = engine.world;
}

function draw() {
    background(135, 206, 235);

    Engine.update(engine);
}