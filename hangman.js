var wordDisplay = document.querySelector("#wordDisplay");
// var letter = document.getElementById("myText").value;
// var guessBtn = document.querySelector("#guessBtn");
// var myText = document.querySelector("#myText");
var livesDisplay = document.querySelector("#livesDisplay");
var message = document.querySelector("#message");
var resetBtn = document.querySelector("#resetBtn");
var P1Btn = document.querySelector("#P1Btn");
var P1Btn = document.querySelector("#P2Btn");
var modeButtons = document.querySelectorAll(".modeButtons");
var wordUnder = [];
var guessedWrong = [];
var guessedRight = [];
var lives = 10;
var word ="";
var gameOver = false;
var game = 1;
var dictionary = [
    "window",
    "laptop",
    "tree",
    "speakers",
]

reset();

for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function(){
        modeButtons[0].classList.remove("selected");
        modeButtons[1].classList.remove("selected");
        this.classList.add("selected");
        this.textContent === "1 player" ? game = 1: game = 2;
        reset();
    } )
}


function reset(){
    wordUnder = [];
    word = chooseWord();
    lives = 10;
    guessedWrong = [];
    guessedRight = [];
    message.textContent="";
    gameOver = false;
    resetBtn.textContent = "Reset";

    for (var i=0; i < word.length; i++) {
        wordUnder.push("_ ");
    }
    livesDisplay.textContent = lives;
    wordDisplay.textContent = wordUnder.join("");
}

resetBtn.addEventListener("click", function(){
    reset();
});

function chooseWord(){
    if(game === 1) {
        var index = Math.floor(Math.random() * dictionary.length);
        word = dictionary[index];
        word = word.split("");
        return word;
    }
    else{
        word = prompt("Choose a word!!");
        word = word.split("");
        return word;
    }
    
}

function gameCheck(){
    if (lives < 1) {
        message.textContent = ("You LOSE!");
        gameOver = true;
        resetBtn.textContent="Play Again?";

    }
    if (word.join("") === wordUnder.join("")) {
        message.textContent = ("You WIN!");
        gameOver = true;
        resetBtn.textContent="Play Again?";

    }
}



document.addEventListener("keypress", function(){
    
    if (gameOver === false){
        message.textContent = "";
        var guess = event.key;
    
        if (guessedWrong.includes(guess) || guessedRight.includes(guess)) {
            message.textContent = ("Already guessed!");
        }
        else {
            // LOOP THROUGH WORD, LOOKING FOR GUESS
            for (var t=0; t < word.length; t++){
                if (word[t] === guess) {
                    wordUnder[t] = word [t];
                    wordDisplay.textContent = wordUnder.join(" ");
                }        
            }
    
            // ADD GUESSES TO ARRAYS AND KEEP SCORE
            if(word.indexOf(guess) === -1) {
                guessedWrong.push(guess);
                lives--;
                livesDisplay.textContent = lives;
            } else{
                guessedRight.push(guess);
            }
        }
        gameCheck();
    }
    
})
