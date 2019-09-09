$(document).ready(function() {
  // $("*").hide();

  var question1 = {
    quest: "What's the capital of Illinois?",
    answer1 : "Durham",
    answer2: "New York",
    answer3: "Miami",
    answer4: "Chicago",
    correct: "answer4"
  };

  var question2 = {
    quest: "What's the capital of North Carolina?",
    answer1 : "Raleigh",
    answer2: "New York",
    answer3: "Miami",
    answer4: "Houston",
    correct: "answer1"
  };

  var question3 = {
    quest: "What's the capital of New York?",
    answer1 : "Durham",
    answer2: "New York",
    answer3: "Miami",
    answer4: "Houston",
    correct: "answer2"
  };

  var question4 = {
    quest: "What's the capital of Pennsylvania?",
    answer1 : "Durham",
    answer2: "New York",
    answer3: "Miami",
    answer4: "Philadelphia",
    correct: "answer4"
  };

  var question5 = {
    quest: "What's the capital of Colorado?",
    answer1 : "Denver",
    answer2: "New York",
    answer3: "Miami",
    answer4: "Houston",
    correct: "answer1"
  };

  var question6 = {
    quest: "What's the capital of Oregon?",
    answer1 : "Durham",
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
var currentArray= [];
  var intervalId;

  // prevents the clock from being sped up unnecessarily
  var clockRunning = false;
  var time = 30;

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
      intervalId = setInterval(count,1000);
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
    if (seconds <= 0){
      stop()
    } 
    return seconds;
  }

  function updateStage(selection) {
    // animateCSS('#cardBase','ZoomIn')
    $("#question")
      .children()
      .remove();
    $("#question").text(selection[0].quest);
    $("#answer1").text(selection[0].answer1);
    $("#answer2").text(selection[0].answer2);
    $("#answer3").text(selection[0].answer3);
    $("#answer4").text(selection[0].answer4);
  }

  
  
function startStage () {
  var ID = "startStage";
  report(ID);
  $("#stageDisplay").children().remove();
  $("#stageDisplay").append("<h1> Click me to start </h1>");
  $("#stageDisplay h1").attr("id","clickMe");
  $("#clickMe").on('click', function () {
    $("#stageDisplay").children().remove();
    setStage()
    triviaGame()
  });
} 

function setStage () {
  var ID = "setStage";
  report(ID);
  $("#stageDisplay").children().remove();
  $("#stageDisplay").append("<h1/>");
  $("#stageDisplay h1:last-child").attr("id","question");
  $("#stageDisplay").append("<h3/>");
  $("#stageDisplay h3:last-child").attr("id","answer1");
  $("#stageDisplay").append("<h3/>");
  $("#stageDisplay h3:last-child").attr("id","answer2");
  $("#stageDisplay").append("<h3/>");
  $("#stageDisplay h3:last-child").attr("id","answer3");
  $("#stageDisplay").append("<h3/>");
  $("#stageDisplay h3:last-child").attr("id","answer4");
  $("#stageDisplay h3:last-child").append();
} 

function Picker() {
  var whichOne = "";
  $("<h3>").on('click', function () {
    this.ID = whichOne;
    return whichOne;
  });
}
  // $("#stageDisplay").append("<div/>");
  // $("#stageDisplay div:last-child").addClass(
  //       "card animated fadeIn text-center");
  //     $(target + " div:last-child").attr("id", "question");
  //     $(target + " div:last-child").append("<p>" + selection[i].name + "</p>");
  //     $(target + " div:last-child").append("<img/>");
  //     $(target + " img:last-child").attr("class", "rounded img-responsive");
  //     $(target + " img:last-child").attr("src", selection[i].cardImg);
  //     $(target + " img:last-child").attr("width", "130");
  //     $(target + " div:last-child").append("<p>" + selection[i].health + "</p>");
  //     $(target + " div:last-child").append();
  //   }

//  function updateDisplay(target, selection) {
//     report("updating display");
//     $(target).children().remove();

   
//   }
// =============================================================================
// // ==========================================================================
   // // =======================================================================
      // Trivia Game functions
      // =======================================================================
   // ==========================================================================
// =============================================================================

function triviaGame (){
  var ID = "triviaGame";
  var pick = "";
  report(ID);
 
  start()
  if (clockRunning) {
    for (var i = 0; i < triviaArray.length; i++) {
      currentArray.push(triviaArray[i]);
      updateStage(currentArray);
      pick = Picker();
      if (pick === triviaArray[i].correct) {

      }
    }
}
}

  function Game() {
    startStage()
  
   
  }

  Game();
});
