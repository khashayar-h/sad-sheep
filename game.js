let stack = [];

let inputStack = [];

let passedIndex = 0;

$(document).keypress(function  ()  {

    if(stack.length === 0){
        
        $('h1').text(`Level ${stack.length + 1}`);
        generator();

    }

})

$('#button').click(function  ()  {

    if(stack.length === 0){
        
        $('h1').text(`Level ${stack.length + 1}`);
        generator();

    }

})

$('._btn').click(function () {

    if(stack.length !== 0){

        inputStack.push(colorBasedSwitcher(this.classList[1]));

            if(stack[passedIndex] != inputStack[passedIndex]){

                inputStack = [];
                stack = [];
                passedIndex = 0;
                $('h1').text('GAME OVER');
                let audio = new Audio('./sounds/wrong.mp3');
                audio.play();
                return;

            }  else if (stack[passedIndex] === inputStack[passedIndex]) {

                player(this.classList[1]);
                animator(this.classList[1]);
                passedIndex++;
                
            }
            
            if(passedIndex === stack.length){

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

    $('h1').text(`Level ${stack.length + 1}`);
    let random = Math.floor(Math.random() * 4) + 1; 
    stack.push(random);
    let color = switcher(random);
    player(color);
    animator(color);
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
