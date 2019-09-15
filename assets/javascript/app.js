$(document).ready(function() {
  // ============================================================================
  // Global Variables
  // ============================================================================
  var question1 = {
    quest: "In Super Bowl XXXII, with 1:45 left on the clock, what did Coach Holmgren tell his defense?",
    answer1: "Get a stop",
    answer2: "Blitz",
    answer3: "Go into Prevent",
    answer4: "Let Terrell Davis score",
    correct: "answer4"
  };

  var question2 = {
    quest: "In 2003, with a 17-14 lead over the Eagles, the Packers let what happen to lose the game with 1:12?",
    answer1: "Let the Eagles get a first down after being 4th and 26.",
    answer2: "Do the Lambeau leap",
    answer3: "Beg for Chicago Bears tickets",
    answer4: "not embarrass themselves",
    correct: "answer1"
  };

  var question3 = {
    quest: "In 2018, what player from the Oakland Raiders did the Packers sign",
    answer1: "Antonio Brown",
    answer2: "Not Khalil Mack",
    answer3: "Uncle Rico",
    answer4: "Paul Blake",
    correct: "answer2"
  };

  var question4 = {
    quest: "Out of the following, what do Packer fans really want to chant?",
    answer1: "Help me",
    answer2: "End my suffering",
    answer3: "Why",
    answer4: "Bear Down",
    correct: "answer4"
  };

  var question5 = {
    quest: "In 2009, after being down 31-10 in the 3rd quarter to the Cardinals, the Packers scored 5 touchdowns, took the game to overtime and ended their season how?",
    answer1: "Fumbled and let Arizona win",
    answer2: "not fumbled and let Arizona win",
    answer3: "Please Chicago Fans",
    answer4: "waste another year of Aaron Rogers",
    correct: "answer1"
  };

  var question6 = {
    quest: "What's was the best day in Packer History?",
    answer1: "January 25, 1998",
    answer2: "Judgement Day",
    answer3: "January 26, 1986",
    answer4: "November 10, 1955",
    correct: "answer3"
  };
  var question7 = {
    quest: "On what stage did Rogers have his best performance?",
    answer1: "Young and the Restless",
    answer2: "Sing the Auditions",
    answer3: "Madden",
    answer4: "The Bachelorette",
    correct: "answer4"
  };

  var question8 = {
    quest: "Why did Green Bay hire a new coach?",
    answer1: "Aaron Rogers needed a new coach to ignore",
    answer2: "Aaron Rogers needed someone else to blame",
    answer3: "they needed a backup plan for Aaron Rogers Clavicle",
    answer4: "mental health concerns",
    correct: "answer1"
  };

  var question9 = {
    quest: "Who was the best quarterback in Green Bay history?",
    answer1: "Jay Cutler",
    answer2: "Jay Cutler",
    answer3: "Jay Cutler",
    answer4: "Jay Cutler",
    correct: "answer2"
  };

  var question10 = {
    quest: "How did the Packers lose to the Rams in the 2018 season?",
    answer1: "Ty Montgomery took a knee in the endzone",
    answer2: "Ty Montgomery was not told what to do at the end of the game",
    answer3: "ty Montgomery was told to improvise",
    answer4: "Ty Montgomery was ordered by the team to take a knee and you guess it, he didnt take a knee",
    correct: "answer4"
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
    question10
  ];

  var right = 0;
  var wrong = 0;
  var currentArray = [];
  var intervalId;
  var countNum = 0;
  // prevents the clock from being sped up unnecessarily
  var clockRunning = false;
  var time = 10;

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
      $("#display").text("Time remaining: " + time + " seconds");
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
    time=10;
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

      triviaGame(currentArray);
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
    newDiv.append("<hr>");
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
    var giphy = $('<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" width="50%" height="315" src="https://www.youtube.com/embed/232NWVGHRQI?start=47&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; " allowfullscreen></iframe></div>');
    // giphy.attr("src", endGif);
    $("#stageDisplay").append(giphy);
     var hFour = $("<h1>");
    hFour.attr("id","startOver");
    hFour.text("😂 Start Over?");
    $("#stageDisplay").append(hFour);
     $("#startOver").on('click', function () {
      currentArray=[];
      time=10;
      countNum=0;
      $("#stageDisplay").empty();
      $("#display").text("Time remaining: " + time + " seconds");
      startStage()
    });
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
            triviaGame()},5000);
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
