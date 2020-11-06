function Main() {
    console.log("main");

    // Get the app div
    let app = $("#app");

    // Create start
    let start = document.createElement("div");
    $(start).attr("id", "start");
    $(app).append(start);

    // Create start title
    let startTitle = document.createElement("div");
    $(startTitle).attr("id", "start-title");
    $(startTitle).html("Coding Quiz Challenge");
    $(start).append(startTitle);

    // Create start info
    let startInfo = document.createElement("div");
    $(startInfo).attr("id", "start-info");
    $(startInfo).html("Insert some quiz info.");
    $(start).append(startInfo);

    // Create start button
    let startBtn = document.createElement("button");
    $(startBtn).attr("id", "start-btn");
    $(startBtn).html("Start Quiz");
    $(start).append(startBtn);

    // Create quiz
    let quiz = document.createElement("div");
    $(quiz).attr("id", "quiz");
    $(quiz).css("height", "0px");
    $(app).append(quiz);

    // Create the timer
    let timer = document.createElement("div");
    $(timer).attr("id", "quiz-timer");
    $(timer).html("00:00");
    $(quiz).append(timer);

    // Create quiz question
    let question = document.createElement("div");
    $(question).attr("id", "quiz-question");
    $(question).html("Insert your question here");
    $(quiz).append(question);

    // Create answer buttons
    let answerIDs = ["a", "b", "c", "d"];
    let answerBtns = {};
    for (var i = 0; i < answerIDs.length; i++) {
        let btnID = answerIDs[i];
        let btn = makeAnswerBtn(btnID);
        answerBtns[btnID] = btn;
        $(quiz).append(btn.container);
    }

    // Create finish
    let finish = document.createElement("div");
    $(finish).attr("id", "finish");
    $(finish).css("height", "0px");
    $(app).append(finish);

    // Create finish title
    let finishTitle = document.createElement("div");
    $(finishTitle).attr("id", "finish-title");
    $(finishTitle).html("Quiz Complete");
    $(finish).append(finishTitle);

    // Create finish score
    let finishScore = document.createElement("div");
    $(finishScore).attr("id", "finish-score");
    $(finishScore).html("0");
    $(finish).append(finishScore);

    // Create finish form
    let finishForm = document.createElement("div");
    $(finishForm).attr("id", "finish-form");
    $(finish).append(finishForm);

    // Create finish label
    let finishLabel = document.createElement("span");
    $(finishLabel).attr("id", "finish-label");
    $(finishLabel).html("Enter your initials");
    $(finishForm).append(finishLabel);

    // Create finish initials
    let finishInitials = document.createElement("input");
    $(finishInitials).attr("id", "finish-initials");
    $(finishInitials).attr("type", "text");
    $(finishForm).append(finishInitials);

    // Create finish button
    let finishBtn = document.createElement("button");
    $(finishBtn).html("Submit");
    $(finishBtn).click(function() {
        console.log("Submit: " + finishInitials.value);
        $(finishInitials).attr("value", "");
        showStart();
    });
    $(finishForm).append(finishBtn);

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
        $(start).css("height", "auto");
        $(quiz).css("height", "0px");
        $(finish).css("height", "0px");
    }
    
    $(startBtn).click(function startQuiz() {
        console.log("start quiz");

        $(start).css("height", "0px");
        $(quiz).css("height", "auto");

        questionIndex = 0;
        correct = "";
        score = 0;
        scoreTotal = 0;

        resetTimer();

        loadQuestion();
    });

    function loadQuestion() {
        console.log("load question");
        clearInterval(questionInt);
        if (questionIndex < questions.length) {
            let q = questions[questionIndex];
            $(question).html(q.question);
            for (let id in answerBtns) {
                let btn = answerBtns[id];
                let answer = q.answers[id];
                $(btn.answer).html(answer);
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
        $(quiz).css("height", "0px");
        $(finish).css("height", "auto");
    }

    function resetTimer() {
        window.clearInterval(quizInt);
        quizInt = setInterval(updateTimer, 1000);
        quizTime = quizTotalTime;
        $(timer).html("5:00");
    }

    function updateTimer() {
        quizTime -= 1;
        let minutes = Math.floor(quizTime/60);
        let seconds = quizTime%60;
        if (minutes <=0 && seconds <= 0) {
            showFinish();
        } 
        $(timer).html(minutes + ":" + seconds);
    }

    function makeAnswerBtn(id) {
        var container = document.createElement("div");
        $(container).attr("class", "quiz-btn-container");

        var radioBtn = document.createElement("input");
        $(radioBtn).attr("type", "radio");
        $(container).append(radioBtn);

        var answer = document.createElement("span");
        $(answer).html("Answer");
        $(container).append(answer);

        $(radioBtn).click(function() {
            console.log(id);
            if (id == correct) {
                console.log("result: correct");
                console.log("score: " + score);
                console.log("scoreTotal: " + scoreTotal);
                scoreTotal += score;
                $(finishScore).html("Score: " + scoreTotal);
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
        });
        
        return {
            container: container,
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