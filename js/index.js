var questions = [{
  question: "What is the capital of California?",
  choices: ["Los Angeles", "Sacramento", "San Diego"],
  answer: "Sacramento"
}, {
  question: "Which university is not in California?",
  choices: ["ASU", "USC", "CSULA"],
  answer: "ASU"
}];

//initialize variables
var score = 0,
  currentQuestion = 0,
  submitted = true;

//define html elements

var content = $("#content"),
  questionContainer = $("#question"),
  choicesContainer = $("#choices"),
  scoreContainer = $("#score-container"),
  submitButton = $("#submit"),
  beginButton = $("#begin");




function askQuestion() {
  $("#begin").addClass("hidden");
  choicesContainer.empty();
  
  var choices = questions[currentQuestion].choices;
  var choicesHtml = "";
  

  //loop through choices, create radio buttons for each
  for (var i = 0; i < choices.length; i++) {
    choicesHtml += "<input type='radio' class='quiz" + currentQuestion +
      "' id='choice" + (i + 1) +
      "' value='" + choices[i] + "'>" +
      " <label for='choice" + (i + 1) + "'>" + choices[i] + "</label><br>";
  }
  


  //load the question
  questionContainer.text("Q" + (currentQuestion + 1) + ": " + questions[currentQuestion].question);
  
  content.prepend(questionContainer);

  //load the choices
  choicesContainer.append(choicesHtml);
  
  content.append(choicesContainer);
   content.append(submitButton);
  submitButton.removeClass("hidden");
  
  


  //initiate for first time
  if (currentQuestion == 0) {
    $("#score").text("Score: " + score + " right out of " + questions.length + " possible.");
    
    submitButton.text("Submit Answer");
   
    submitButton.on("click", checkAnswer);
  }
  
  
}

function checkAnswer() {
  //are we asking a question or proceeding to the next question?
  console.log("called");
  if (submitted) {
    submitButton.text("Next Question");
    submitted = false;
    //determine which radio button a user picked
    var userPick,
      correctIndex,
      radios = $(".quiz" + currentQuestion);
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        userPick = radios[i].value;
      }
      //determine the correct answer
      if (radios[i].value == questions[currentQuestion].answer) {
        correctIndex = i;
      }
    }
   
    //set-up styling for right or wrong answer
    var labelStyle = $("label")[correctIndex].style;
    labelStyle.fontWeight = "bold";
    //alert(score);
    if (userPick == questions[currentQuestion].answer) {
      score++;
      labelStyle.color = "green";

    } else {
      labelStyle.color = "red";
    }


    $("#score").text( "Score: " + score + " right out of " + questions.length + " possible.");
 
  } else { //proceed to the next question
    submitted = true;
    submitButton.text("Submit Answer");
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      askQuestion();
    } else {
      showFinalResults();
    }
  }


}

function showFinalResults() {
  //load a new view for showing the final results
  content.empty();
  scoreContainer.append( "<h1" + " id='Final-Results'>Score: " + score + " right out of " + questions.length + " possible.</h1>");
  var againButton = $("<button></button>");
  scoreContainer.append(againButton);
  againButton.text("Try Again?");
  againButton.on("click", function() {
    scoreContainer.empty();
    submitted = true;
    currentQuestion = 0;
    score = 0;
    askQuestion();
    
  });


}

beginButton.on("click", askQuestion);