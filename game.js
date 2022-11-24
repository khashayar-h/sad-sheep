let stack = [];

let inputStack = [];

let passedIndex = 0;

let defaultTimer = 10;

let started = false;

let score = 0;

let lastScore = 0;

let confetti = false;

let timer;


let myVar = setInterval(function() {
    if( timer > 0 && started === true){
    timer--;
    minutes = Math.round(timer / 60);
    seconds = timer % 60;
    $('#time').text(`${minutes} : ${seconds}`)
    }
     else if( timer === 0){
        timer = -1;
        started = true;
        gameOver();
        return;
    }
  } ,1000);
 

$(document).keypress(function  ()  {

    if(stack.length === 0){
        
        started = true;
        timer = defaultTimer;
        $('h1').text(`مرحله 🐑  ${stack.length + 1}`);
        generator();

    }

})

$('#button').click(function  ()  {

    if(stack.length === 0){
        
        started = true;
        timer = defaultTimer;
        $('h1').text(`Level ${stack.length + 1}`);
        generator();

    }

})

function gameOver() {

    inputStack = [];
    stack = [];
    passedIndex = 0;
    $('h1').text('هه هه هه باختی😂😐');
    let audio = new Audio('./sounds/wrong.mp3');
    audio.play();
    $('#time').text(`${00} : ${00}`)
    started = false;
    if(score > lastScore){
    lastScore = score;
    }
    $('#highScore').text(lastScore);
    score = 0;
    return;

}

$('._btn').click(function () {

    if(stack.length !== 0){

        inputStack.push(colorBasedSwitcher(this.classList[1]));

            if(stack[passedIndex] != inputStack[passedIndex]){

                gameOver();
                return;

            }  else if (stack[passedIndex] === inputStack[passedIndex]) {

                player(this.classList[1]);
                animator(this.classList[1]);
                passedIndex++;
                
            }
            
            if(passedIndex === stack.length){

                timer += stack.length;
                setTimeout(function() {
                    inputStack = [];
                    passedIndex = 0;
                    generator();
                  }, 1000);
            }

        }

    }
)

function animator(color) {

    setTimeout(function() {

        $(`.${color}`).addClass('pressed');

    })
    setTimeout(function() {

        $(`.${color}`).removeClass('pressed');

    }, 150)
    
}

function generator() {

    score += 1;
    $('#score').text(score);
    $('h1').text(`مرحله 🐑  ${stack.length + 1}`);
    let random = Math.floor(Math.random() * 4) + 1; 
    stack.push(random);
    let color = switcher(random);
    player(color);
    animator(color);
    if(score > lastScore && lastScore != 0 && confetti === false){
        startConfetti();
        let audio = new Audio('./sounds/sheep.mp3');
        audio.play();
        setTimeout(function(){
            stopConfetti();
            confetti = true;
        }, 5000);
    }
    console.log(stack)

}

function player(color) {

    let audio = new Audio(`./sounds/${color}.mp3`);
    audio.play();

}

function colorBasedSwitcher(key){

    let result;

    switch(key) {
        case "green":
            result = 1;
            break;
        case "red":
            result = 2;
            break;
        case "yellow":
            result = 3;
            break;
        case "blue":
            result = 4;
            break;
    }

    return result;

}

function switcher(key) {

    let result;

    switch(key) {
        case 1:
            result = "green";
            break;
        case 2:
            result = "red";
            break;
        case 3:
            result = "yellow";
            break;
        case 4:
            result = "blue";
            break;
    }

    return result;

}
