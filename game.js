var colors = ["red","blue","green","yellow"];
var gameContent=[];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function(){
    if(started===false){
    $("h1").text("Level "+ level);
    nextSequence();
    started=true;
    }
})

$(".btn").on("click",handler);
function handler(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+ level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = colors[randomNumber];
    gameContent.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100)
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gameContent[currentLevel]){
        console.log("success");
        if(userClickedPattern.length==gameContent.length){
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }
    else{
        console.log("failure");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started = false;
}