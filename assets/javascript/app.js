$(document).ready(function() {
  // ============================================================================
  // Global Variables
  // ============================================================================
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
  var question7 = {
    quest: "What's the capital of Illinois?",
    answer1: "Durham",
    answer2: "New York",
    answer3: "Miami",
    answer4: "Chicago",
    correct: "answer4"
  };

  var question8 = {
    quest: "What's the capital of North Carolina?",
    answer1: "Raleigh",
    answer2: "New York",
    answer3: "Miami",
    answer4: "Houston",
    correct: "answer1"
  };

  var question9 = {
    quest: "What's the capital of Connecticut?",
    answer1: "Durham",
    answer2: "Boston",
    answer3: "Miami",
    answer4: "Houston",
    correct: "answer2"
  };

  var question10 = {
    quest: "What's the capital of Utah?",
    answer1: "Durham",
    answer2: "New York",
    answer3: "Miami",
    answer4: "Salt Lake City",
    correct: "answer4"
  };

  var question11 = {
    quest: "What's the capital of Tennessee?",
    answer1: "Nashville",
    answer2: "New York",
    answer3: "Miami",
    answer4: "Houston",
    correct: "answer1"
  };

  var question12 = {
    quest: "What's the capital of Texas?",
    answer1: "Durham",
    answer2: "New York",
    answer3: "Dallas",
    answer4: "Houston",
    correct: "answer3"
  };

  triviaArray = [
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question7,
    question8,
    question9,
    question10,
    question11,
    question12
  ];
  var right = 0;
  var wrong = 0;
  var currentArray = [];
  var intervalId;
  var intervalId1;
  var picked = false;
  var countNum = 0;
  // prevents the clock from being sped up unnecessarily
  var clockRunning = false;
  var time = 30;

  //audio variables
  var wrongSound = new Audio("./assets/audio/the-price-is-right-losing-horn.mp3");
  var rightSound = new Audio("./assets/audio/winner-bell.mp3");
  var timeSound = new Audio("./assets/audio/jeopardy.mp3");
  var startSound = new Audio("./assets/audio/dun_dun_1.mp3");
  var clockSound = new Audio("./assets/audio/tick.mp3");
  var endGameSound = new Audio("./assets/audio/halo.mp3");
  clockSound.loop = true;
  timeSound.loop = true;

  // ===========================================================================
  // gif variables
  // ===========================================================================
  var rightGif = "https://media.giphy.com/media/26FPnsRww5DbqoPuM/giphy.gif";
  var wrongGif = "https://media.giphy.com/media/jK8NUUpCBrqM0/giphy.gif";
  var endGif = "https://media.giphy.com/media/AkLGHCYGv43uw/giphy.gif";
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
      clockSound.play();
    }
  }

  function stop() {
    // DONE: Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);
    clockRunning = false;
    clockSound.pause();
  }

  function count() {
    time--;
    var converted = timeConverter(time);
    console.log(converted);
    $("#display").text("Time remaining: " + converted + " seconds");
    if (converted <= 0) {
      stop();
      endStage();
    }
  }

  function timeConverter(t) {
    var minutes = Math.floor(t / 60);
    var seconds = t - minutes * 60;

    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return seconds;
  }
//sets up initial game stage
  function startStage() {
    var ID = "startStage";
    report(ID);
    //remove any unwanted html
    $("#stageDisplay").empty();
    // delay function so sound plays is delayed with the same delay of starting banner.
    setTimeout(function() {
      startSound.play()
    }, 1000);
  
    $("#display").text("Time remaining: " + time + " seconds");
    $("#stageDisplay").append("<h1> Click me to start </h1>");
    $("#stageDisplay h1").attr("id", "clickMe");
//adds event listener for user to start the game
    $("#clickMe").on("click", function() {
      $("#stageDisplay").empty();
      start();

      triviaGame();
    });
  }

  function setStage(current) {
    var ID = "setStage";
    report(ID);
    $("#stageDisplay")
      .children()
      .remove();
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

  function endStage() {
    $("#stageDisplay").empty();
    var hOne = $("<h1>");
    hOne.text("Correct: " + right);
    $("#stageDisplay").append(hOne);
    var hTwo = $("<h1>");
    hTwo.text("Wrong: " + wrong);
    $("#stageDisplay").append(hTwo);
    var hThree = $("<h1>");
    var unAnswered = triviaArray.length - wrong - right;
    hThree.text("Unanswered: " + unAnswered);
    $("#stageDisplay").append(hThree);
    var giphy = $("<img>");
    giphy.attr("src", endGif);
    $("#stageDisplay").append(giphy);
    setTimeout(function () { 
      currentArray=[];
      time=30;
      $("#display").text("Time remaining: " + time + " seconds");
      start();
      triviaGame();},10000);

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

    if (clockRunning) {
      currentArray.push(triviaArray[countNum]);
      setStage(currentArray);
      $("h3").on("click", function() {
          NewONE(this.id);
          $("h3").off(); 
       
      });
    }
  }

  function rightAnswer (id) {
    rightSound.play();
          right++;
          console.log(right, " correctly picked");
          var giphy = $("<img>");
          giphy.attr("src", rightGif);
          giphy.attr("animation-duration", "3s");
          $("#stageDisplay").append(giphy);
  }

  function wrongAnswer (id) {
         var newTarget = "#"+ currentArray[countNum].correct;
        animateCSS(newTarget,'wobble')
          var giphy = $("<img>");
          giphy.attr("src", wrongGif);
          giphy.attr("animation-duration", "3s");
          $("#stageDisplay").append(giphy)
          wrongSound.play();
          wrong++;
          console.log(wrong, "wrongly picked");
  }

  function NewONE (ID) {
     console.log("clicked on", ID);
        if (ID == currentArray[countNum].correct) {
          rightAnswer(ID)
        } else {
          wrongAnswer(ID)
        }
        countNum++;
        $("h3").off();
        console.log(countNum);
        if (countNum < triviaArray.length) {
          console.log("passed through");
          stop()
          setTimeout(function () {
            start()
            triviaGame()},3000);
        } else {
          stop();
          endStage();
        }
  }

  function Game() {
    startStage();
  }
//starts game
  Game();
});
