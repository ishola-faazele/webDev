let questionsArray = [];
const question = document.getElementById('question');
async function fetchQuestions() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=10');
        if(response.ok) {
            const data = await response.json()
            return data.results       
        }

        throw new Error("Request failed: unable to fetch data");
    } catch(error) {
        console.log(error);
    }
}

async function fetchData() {
    try {
        questionsArray = await fetchQuestions();
        console.log(questionsArray);
    } catch(error) {
        console.log(error);
    }
}

(async () => {
    await fetchData();
    
    if (questionsArray.length === 0) {
        question.innerHTML = `<p>Please wait!! Loading questions....</p>`;
    } else {
        loadQuestions();
    }
})();



let current = 0;
let score = 0;
let yourChoices = [];
function loadQuestions() {
    const options = document.getElementById("opt");
    let currentQuestion = questionsArray[current].question;
    //console.log(currentQuestion)

    if (currentQuestion.indexOf('"') > -1) {
        currentQuestion = currentQuestion
            .replace(/"/g, '\"');
    }

    question.innerHTML = `<h2>${currentQuestion}</h2>`;
    options.innerHTML = "";

    const correctAns = questionsArray[current].correct_answer;
    const incorrectAns = questionsArray[current].incorrect_answers;

    const optionsArray = [correctAns, ...incorrectAns];

    optionsArray.sort(() => Math.random() - 0.5)
    optionsArray.forEach((option, index) => {
        const choicediv = document.createElement("div");
        const choiceInput = document.createElement("input")
        const choiceLabel = document.createElement("label");

        
        choiceInput.type = "radio";
        choiceInput.name = "answer";
        choiceInput.value = option;
        choiceInput.id = `option-${index}`;
        
        choiceLabel.textContent = option;
        choiceLabel.htmlFor = `option-${index}`; // Associate the label with the corresponding input

        choicediv.appendChild(choiceInput);
        choicediv.appendChild(choiceLabel);
        options.appendChild(choicediv);
    });
};
function loadScore() {
    const totalScore = document.getElementById("score");
    totalScore.textContent = `You scored ${score} out 
    of ${questionsArray.length}`;
    totalScore.innerHTML += "<h3>All Answers</h3>"
    questionsArray.forEach((el, index) => {
        totalScore.innerHTML += `<p>${index + 1}.
         ${el.correct_answer}</p>`
    })
    totalScore.innerHTML+= `<h3>\n\nYour choices</h3>`;
    yourChoices.forEach((choice,index) => {
        totalScore.innerHTML += `<p>${index+1}. ${choice}</p>`;

    });
};

function nextQuestion() {
    if (current < questionsArray.length -1 ){
        current++;
        loadQuestions()
    }
    else {
        document.getElementById("opt").remove();
        document.getElementById("btn").remove();
        document.getElementById("question").remove();
        loadScore();
    }
};

function checkAnswer() {
    const selectedAns = document.querySelector('input[name ="answer"]:checked').value;
    yourChoices.push(selectedAns);
    if (selectedAns === questionsArray[current].correct_answer) {
        score++;
        nextQuestion();
    }
    else{
        nextQuestion();
    }
};
