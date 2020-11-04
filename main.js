function Main() {
  console.log("main");

  // Get the app div
  let app = document.getElementById("app");

  // Create start
  let start = document.createElement("div");
  start.id = "start";
  app.appendChild(start);

  // Create start title
  let startTitle = document.createElement("div");
  startTitle.id = "start-title";
  startTitle.innerHTML = "Coding Quiz Challenge";
  start.appendChild(startTitle);

  // Create start info
  let startInfo = document.createElement("p");
  startInfo.id = "start-info";
  startInfo.innerHTML = "This is a timed quiz and contains 5 mulitple choice questions. You will get one point for each correct answer. For each incorrect answer 5 seconds will be taken away from the timer. Test your knowledge. May the odds be ever in your favor!";
  start.appendChild(startInfo);

  // Create start button
  let startBtn = document.createElement("button");
  startBtn.id = "start-btn";
  startBtn.innerHTML = "Start Quiz";
  startBtn.onclick = startQuiz;
  start.appendChild(startBtn);

  // Create quiz
  let quiz = document.createElement("div");
  quiz.id = "quiz";
  app.appendChild(quiz);

  // Create the timer
  let timer = document.createElement("div");
  timer.id = "quiz-timer";
  timer.innerHTML = "00:00";
  quiz.appendChild(timer);

  // Create quiz question
  let question = document.createElement("div");
  question.id = "quiz-question";
  question.innerHTML = "Insert your question here";
  quiz.appendChild(question);

  // Create answer buttons
  let answerBtns = ["a", "b", "c", "d"];
  for (var i = 0; i < answerBtns.length; i++) {
    let btnID = answerBtns[i];
    makeAnswerBtn(btnID);
  }

  // Create result field
  let result = document.createElement("div");
  result.id = "quiz-result";
  result.innerHTML = "Result";
  quiz.appendChild(result);

  // Create finish
  let finish = document.createElement("div");
  finish.id = "finish";
  app.appendChild(finish);

  let finishTitle = document.createElement("div");
  finishTitle.id = "finish-title";
  finishTitle.innerHTML = "Quiz Complete";
  finish.appendChild(finishTitle);

  let finishScore = document.createElement("div");
  finishScore.id = "finish-score";
  finishScore.innerHTML = "0";
  finish.appendChild(finishScore);

  let finishForm = document.createElement("div");
  finishForm.id = "finish-form";
  finish.appendChild(finishForm);

  let finishLabel = document.createElement("span");
  finishLabel.id = "finish-label";
  finishLabel.innerHTML = "Enter your initials";
  finishForm.appendChild(finishLabel);

  let finishInitials = document.createElement("input");
  finishInitials.id = "finish-initials";
  finishInitials.type = "text";
  finishForm.appendChild(finishInitials);

  let finishBtn = document.createElement("button");
  finishBtn.innerHTML = "Submit";
  finishForm.appendChild(finishBtn);

  function startQuiz() {
    console.log("start quiz");
  }

  function makeAnswerBtn(id) {
    var container = document.createElement("div");
    container.className = "quiz-btn-container";
    quiz.appendChild(container);

    var radioBtn = document.createElement("input");
    radioBtn.type = "radio";
    radioBtn.onclick = function () {
      console.log(id);
    }
    container.appendChild(radioBtn);

    var answer = document.createElement("span");
    answer.innerHTML = "Answer";
    container.appendChild(answer);

    return container;
  }
}
window.onload = Main;