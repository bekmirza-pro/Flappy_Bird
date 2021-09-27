var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var elBtn = document.querySelector(".button")


const makeElament = (selector, parent = document) => parent.querySelector(selector);
const createDOM = (element) => document.createElement(element);

const elModalInfo = makeElament('.modal');
const elRestartModalBtn = makeElament('.modal_restart-btn');


var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();


bird.src = "images/bird.png"
bg.src = "images/flappy_bird_bg.png"
fg.src = "images/bird_fg.png"
pipeUp.src = "images/bird_pipeUp.png"
pipeBottom.src = "images/bird_pipeBottom.png"

// Ovoz

var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

var gap = 90;

document.addEventListener("keydown", moveUp);
elBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    moveUp();
})

function moveUp() {
    yPos -= 25;
    fly.play();
}

var pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0,
}

var score = 0;

var xPos = 10;
var yPos = 150;
var grav = 1.5;

function draw() {

    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {

        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        if (xPos + bird.width >= pipe[i].x &&
            xPos <= pipe[i].x + pipeUp.width &&
            (yPos <= pipe[i].y + pipeUp.height ||
                yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
            elModalInfo.classList.add('modal_active');
        }

        if (pipe[i].x == 5) {
            score++;
            score_audio.play();
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = '#000';
    ctx.font = "24px Verdana";
    ctx.fillText("Счет: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;


elRestartModalBtn.addEventListener('click', (evt) => {
    elModalInfo.classList.remove('modal_active');
    // evt.preventDefault();
    location.reload()
        // console.log(elModalInfo);
})