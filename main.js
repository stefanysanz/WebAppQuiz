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
    startInfo.innerHTML = "Test your knowledge on JavaScript with this short five question quiz. You have 5 minutes to complete it. For every question you answer correctly you will receive 5 points. When you complete the quiz sumbit your initials so your score is tracked. May the odds be ever in your favor!"; 
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
    quiz.style.height = "0px";
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
    let answerIDs = ["a", "b", "c", "d"];
    let answerBtns = {};
    for (var i = 0; i < answerIDs.length; i++) {
        let btnID = answerIDs[i];
        let btn = makeAnswerBtn(btnID);
        answerBtns[btnID] = btn;
    }

    // Create finish
    let finish = document.createElement("div");
    finish.id = "finish";
    finish.style.height = "0px";
    app.appendChild(finish);

    // Create finish title
    let finishTitle = document.createElement("div");
    finishTitle.id = "finish-title";
    finishTitle.innerHTML = "Quiz Complete";
    finish.appendChild(finishTitle);

    // Create finish score
    let finishScore = document.createElement("div");
    finishScore.id = "finish-score";
    finishScore.innerHTML = "0";
    finish.appendChild(finishScore);

    // Create finish form
    let finishForm = document.createElement("div");
    finishForm.id = "finish-form";
    finish.appendChild(finishForm);

    // Create finish label
    let finishLabel = document.createElement("span");
    finishLabel.id = "finish-label";
    finishLabel.innerHTML = "Enter your initials";
    finishForm.appendChild(finishLabel);

    // Create finish initials
    let finishInitials = document.createElement("input");
    finishInitials.id = "finish-initials";
    finishInitials.type = "text";
    finishForm.appendChild(finishInitials);

    // Create finish button
    let finishBtn = document.createElement("button");
    finishBtn.innerHTML = "Submit";
    finishBtn.onclick = function() {
        console.log("Submit: " + finishInitials.value);
        finishInitials.value = "";
        showStart();
    }
    finishForm.appendChild(finishBtn);

    // quizTotalTime is the quiz time in seconds
    // quizTotalTime = minutes * seconds/minute
    let quizTotalTime = 5 * 60;
    let quizInt;
    let quizTime;

    let questionIndex;
    let questionInt;
    let correct;
    let score;
    let scoreTotal;

    function showStart() {
        start.style.height = "auto";
        quiz.style.height = "0px";
        finish.style.height = "0px";
    }
    
    function startQuiz() {
        console.log("start quiz");

        start.style.height = "0px";
        quiz.style.height = "auto";

        questionIndex = 0;
        correct = "";
        score = 0;
        scoreTotal = 0;

        resetTimer();

        loadQuestion();
    }

    function loadQuestion() {
        console.log("load question");
        clearInterval(questionInt);
        if (questionIndex < questions.length) {
            let q = questions[questionIndex];
            question.innerHTML = q.question;
            for (let id in answerBtns) {
                let btn = answerBtns[id];
                let answer = q.answers[id];
                btn.answer.innerHTML = answer;
            }
            correct = q.correct;
            score = q.points;
            resetBtns();
        } else {
            showFinish();
        }
    }

    function showFinish() {
        console.log("show finish");
        window.clearInterval(quizInt);
        quiz.style.height = "0px";
        finish.style.height = "auto";
    }

    function resetTimer() {
        window.clearInterval(quizInt);
        quizInt = setInterval(updateTimer, 1000);
        quizTime = quizTotalTime;
        timer.innerHTML = "5:00";
    }

    function updateTimer() {
        quizTime -= 1;
        let minutes = Math.floor(quizTime/60);
        let seconds = quizTime%60;
        if (minutes <=0 && seconds <= 0) {
            showFinish();
        } 
        timer.innerHTML = minutes + ":" + seconds;
    }

    function makeAnswerBtn(id) {
        var container = document.createElement("div");
        container.className = "quiz-btn-container";
        quiz.appendChild(container);

        var radioBtn = document.createElement("input");
        radioBtn.type = "radio";
        container.appendChild(radioBtn);

        var answer = document.createElement("span");
        answer.innerHTML = "Answer";
        container.appendChild(answer);

        radioBtn.onclick = function() {
            console.log(id);
            if (id == correct) {
                console.log("result: correct");
                console.log("score: " + score);
                console.log("scoreTotal: " + scoreTotal);
                scoreTotal += score;
                finishScore.innerHTML = scoreTotal;
                $(answer).css("color", "green");
            } else {
                $(answer).css("color", "red");
                quizTime -= 5;
                if (quizTime <= 0) {
                    quizTime = 0;
                }
            }
            questionIndex++;
            disableBtns();
            questionInt = setInterval(loadQuestion, 1000);
        }

        return {
            answer: answer,
            radioBtn: radioBtn,
        };
    }

    function disableBtns() {
        for (let id in answerBtns) {
            let btn = answerBtns[id];
            btn.radioBtn.disabled = true;
        }
    }

    function resetBtns() {
        for (let id in answerBtns) {
            let btn = answerBtns[id];
            btn.radioBtn.disabled = false;
            btn.radioBtn.checked = false;
            $(btn.answer).css("color", "black");
        }
    }
}