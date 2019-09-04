var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var restart = true;
var i = -1;

//Event section

$(document).keypress(function() {
  $(document).off("keypress");
  setTimeout(nextSequence, 300);
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  playSound(userChosenColor);
  animatedPress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  ++i;
  var success = checkAnswer(i);
  if(!success) {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(removeClassGameOver, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    if(restart === true && i < gamePattern.length) {
      $(document).keypress(startOver);
      restart = false;
    }
  } else if(i === gamePattern.length - 1) {
    setTimeout(nextSequence, 1000);
  }
});

// Function section

function nextSequence() {
  i = -1;
  userClickedPattern = [];
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosencolor = buttonColors[randomNumber];
  gamePattern.push(randomChosencolor);
  playSound(randomChosencolor);
  //animation
  $("#" + randomChosencolor).fadeOut(100).fadeIn(100);
  ++level;
}

function checkAnswer(currentLevel) {
  if(currentLevel < gamePattern.length && gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success " + gamePattern[currentLevel] + " " + userClickedPattern[currentLevel]);
    return true;
  } else {
    console.log("wrong " + gamePattern[currentLevel] + " " + userClickedPattern[currentLevel]);
    return false;
  }
}

function removeClassGameOver() {
  $("body").removeClass("game-over");
}

function startOver() {
  $(document).off("keypress");
  level = 0;
  gamePattern = [];
  i = -1;
  restart = true;
  setTimeout(nextSequence, 300);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatedPress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}
