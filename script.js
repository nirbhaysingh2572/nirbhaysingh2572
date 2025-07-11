//  `

console.log("wellcome to my ping pong game");

let table = document.getElementById("table");
let boll = document.getElementById("boll");
let padel = document.getElementById("padel");
let scoreBord = document.getElementById("scorebord");

//game details
var startGame = true;
var gameId = -1;
var bestScore = 0;
var currentScore = 0;

// Boll position
var bollx,bolly,dx,dy;

//padell movment
var padelx , pdx, move;

//restart the Game
function restart(){
    if(startGame===false)   return;
    startGame = false;
    if(gameId>0)    clearInterval(gameId);

    // Boll position
    bollx = padel.offsetWidth/2 - boll.offsetWidth/2;
    bolly = padel.offsetTop - padel.offsetHeight;

    dx  = 1;
    dy = 2;

    boll.style.left = `${bollx}px`;
    boll.style.top = `${bolly}px`;

    //padell movment
    padelx = 0;
    pdx = 2;
    move = 0;
    padel.style.left = `${padelx}px`;

    //resate score
    if(currentScore>bestScore)  bestScore = currentScore;
    currentScore = 0;
    scoreBord.children[0].innerText = "High Score : " + bestScore;
    scoreBord.children[2].innerText = "Score : " + currentScore;

}

restart();

//staraing game
function start (){
    if(startGame)   return;
    startGame = true;
    let count = 0;
    gameId =  setInterval(()=>{
        //moveing boll
        bolly += dy;
        bollx += dx;
        boll.style.left = `${bollx}px`;
        boll.style.top = `${bolly}px`;

        //speed up boll
        if(dx>0)    dx += 0.0001;
        if(dy>0)    dy += 0.0001;

        //moving padel
        padelx += move*pdx;

        //preventin padel not move out side table
        if(padelx<0)    padelx = 0;
        if(padelx>(table.offsetWidth-padel.offsetWidth-10)) padelx = (table.offsetWidth-padel.offsetWidth-10);
        padel.style.left = `${padelx}px`;

        //priventing boll not go out side table
        if(bolly>(table.offsetHeight-boll.offsetWidth-10)||bolly<0)
            dy *= -1;
        if(bollx>(table.offsetWidth-boll.offsetWidth-10)||bollx<0)
            dx *= -1;

        //cheking boll hit padel or not
        if(bolly>=(padel.offsetTop-boll.offsetWidth)&&(bollx>=padel.offsetLeft&&bollx<=padel.offsetLeft+padel.offsetWidth-boll.offsetWidth)){
            if(bolly>(padel.offsetTop-boll.offsetWidth)||bolly<0)
                dy *= -1;
        }

        //display score
        currentScore++;
        scoreBord.children[2].innerText = "Score : " + currentScore;


        //stop the game
        if(bolly>=padel.offsetTop)
            restart();

    },1);
}

table.addEventListener("click",start);


document.addEventListener("keyup",(event)=>{
   if(startGame && ((event.key === "ArrowRight")||(event.key === "ArrowLeft"))){
       move = 0;
    }
});

document.addEventListener("keydown",(event)=>{

    if (event.key === "Enter") start();
    else if(startGame){
        if (event.key === "ArrowLeft") {
            move = -1;
        } else if (event.key === "ArrowRight") {
            move = 1;
        }
    }
   
});

// adding touchstart
var priviousX;
document.addEventListener('touchstart', function (e) {
    priviousX = e.touches[0].clientX;
});
  
document.addEventListener('touchmove', function (e) {
    if(startGame){
        let currentX = e.touches[0].clientX;
        let deltaX = currentX - priviousX;
        // console.log(deltaX);
        // if(deltaX>5)    move = 0.5;
        // else if(deltaX<-5)   move = -0.5;
        move = deltaX * 0.20;
        priviousX = currentX;
    }
});

document.addEventListener('touchend', function (e) {
    move = 0;
});


