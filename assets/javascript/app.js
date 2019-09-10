$(document).ready(function() {
  // $("*").hide();
 
  var question1 = {
   quest: "What's the capital of Illinois?",
   answer1: "Durham",
   answer2: "New York",
   answer3: "Miami",
   answer4: "Chicago",
   correct: "answer4"
  };
 
  var question2 = {
   quest: "What's the capital of North Carolina?",
   answer1: "Raleigh",
   answer2: "New York",
   answer3: "Miami",
   answer4: "Houston",
   correct: "answer1"
  };
 
  var question3 = {
   quest: "What's the capital of New York?",
   answer1: "Durham",
   answer2: "New York",
   answer3: "Miami",
   answer4: "Houston",
   correct: "answer2"
  };
 
  var question4 = {
   quest: "What's the capital of Pennsylvania?",
   answer1: "Durham",
   answer2: "New York",
   answer3: "Miami",
   answer4: "Philadelphia",
   correct: "answer4"
  };
 
  var question5 = {
   quest: "What's the capital of Colorado?",
   answer1: "Denver",
   answer2: "New York",
   answer3: "Miami",
   answer4: "Houston",
   correct: "answer1"
  };
 
  var question6 = {
   quest: "What's the capital of Oregon?",
   answer1: "Durham",
   answer2: "New York",
   answer3: "Portland",
   answer4: "Houston",
   correct: "answer3"
  };
 
  triviaArray = [
   question1,
   question2,
   question3,
   question4,
   question5,
   question6
  ];
  var currentArray = [];
  var intervalId;
  var picked = false;
  var countNum = 0;
 
  // prevents the clock from being sped up unnecessarily
  var clockRunning = false;
  var time = 30;
 
  //audio variables
  var wrongSound = new Audio("./assets/audio/Losing Horn.ogg");
  var rightSound = new Audio("./assets/audio/Exclamation Point.ogg");
 
  function animateCSS(element, animationName, callback) {
   const node = document.querySelector(element);
   node.classList.add("animated", animationName);
 
   function handleAnimationEnd() {
    node.classList.remove("animated", animationName);
    node.removeEventListener("animationend", handleAnimationEnd);
 
    if (typeof callback === "function") callback();
   }
 
   node.addEventListener("animationend", handleAnimationEnd);
  }
 
  // =============================================================================
  // console reporting function
  // =============================================================================
  function report(section) {
   var divider = "------------------------------------";
   console.log(" ");
   console.log(divider);
   console.log("running ", section);
   console.log(divider);
  }
 
  function start() {
   // DONE: Use setInterval to start the count here and set the clock to running.
   if (!clockRunning) {
    intervalId = setInterval(count, 1000);
    clockRunning = true;
    // anwsSelect();
   }
  }
 
  function stop() {
   // DONE: Use clearInterval to stop the count here and set the clock to not be running.
   clearInterval(intervalId);
   clockRunning = false;
  }
 
  function count() {
   // DONE: increment time by 1, remember we cant use "this" here.
   time--;
 
   // DONE: Get the current time, pass that into the timeConverter function,
   //       and save the result in a variable.
   var converted = timeConverter(time);
   console.log(converted);
 
   // DONE: Use the variable we just created to show the converted time in the "display" div.
   $("#display").text("Time remaining: " + converted + " seconds");
  }
 
  function timeConverter(t) {
   var minutes = Math.floor(t / 60);
   var seconds = t - minutes * 60;
 
   if (seconds < 10) {
    seconds = "0" + seconds;
   }
   if (seconds <= 0) {
    stop();
   }
   return seconds;
  }
 
  function startStage() {
   var ID = "startStage";
   report(ID);
   $("#stageDisplay")
    .children()
    .remove();
   $("#stageDisplay").append("<h1> Click me to start </h1>");
   $("#stageDisplay h1").attr("id", "clickMe");
   $("#clickMe").on("click", function() {
    $("#stageDisplay")
     .children()
     .remove();
    triviaGame();
   });
  }
 
  function setStage(current) {
   var ID = "setStage";
   report(ID);
   $("#stageDisplay").children().remove();
    var newDiv = $("<div>");
    var quest1 = $("<h1>");
    quest1.attr("id", "question");
    quest1.text(current[countNum].quest);
    newDiv.append(quest1);
    var ans1 = $("<h3>");
    ans1.attr("id", "answer1");
    ans1.text(current[countNum].answer1);
    newDiv.append(ans1);
    var ans2 = $("<h3>");
    ans2.attr("id", "answer2");
    ans2.text(current[countNum].answer2);
    newDiv.append(ans2);
    var ans3 = $("<h3>");
    ans3.attr("id", "answer3");
    ans3.text(current[countNum].answer3);
    newDiv.append(ans3);
    var ans4 = $("<h3>");
    ans4.attr("id", "answer4");
    ans4.text(current[countNum].answer4);
    newDiv.append(ans4);
    $("#stageDisplay").html(newDiv);
}
 
 
  
  // 
  // =============================================================================
  // // ==========================================================================
  // // =======================================================================
  // Trivia Game functions
  // =======================================================================
  // ==========================================================================
  // =============================================================================
 
  function triviaGame() {
   var ID = "triviaGame";
   var pick = "";
  report(ID);
  start();
      currentArray.push(triviaArray[countNum]);
      setStage(currentArray);
      $("h3").on("click", function() {
        console.log("clicked on", this.id);
            if ((this.id == currentArray[countNum].correct)) {
            rightSound.play();
            console.log("correct pick");
            } else {
              wrongSound.play();
            }
            countNum++
            triviaGame()
      });
}
 
  function Game() {
   startStage();
  }
 
  Game();
 });