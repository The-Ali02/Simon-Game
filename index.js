var started = false;
var colors = ["red","yellow","blue","green"];
var level=0 ;
var user = [];
var gamePattern = [];
$(document).keypress(function() {
  if (!started) {
    level++;
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
function nextSequence(){
  user = [];
  ++level;
  $("level-title").text("Level "+level);
  var rand = Math.floor(Math.random()*4);
  var randomColor = colors[rand];
  gamePattern.push(randomColor);
  $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = Audio("sounds/"+randomColor+".mp3");
  audio.play();
  playSound(randomColor);
}
function playSound(colorID) {

    var aud = new Audio("sounds/"+colorID+".mp3");
    aud.play();
    }

$(".btn").click(function(){
  var userColor = $(this).attr("id");
  user.push(userColor);
  playSound(userColor);
  animatePress(userColor);
  checkAnswer(user.length-1);    //to verify if user clicked correctly
});

function animatePress(userColor) {
  $("#"+userColor).addClass("pressed");

  setTimeout(function () {
      $("#"+userColor).removeClass("pressed");
  },100);
}

function checkAnswer(level) {
    if(gamePattern[level]==user[level]){
        if(user.length == gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000 );
            level++;
            $("level-title").text("Level "+level);
        }
    }
    else {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      },150);

      $("#level-title").text("Game Over , Press any key to Restart");
      startOver();
    }

}

function startOver() {
    level = 0;
    gamePattern =[];
    started =false;

}
