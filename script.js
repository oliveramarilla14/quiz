const questionList = [
    {
        question:'How tall is the everest?',
        answers:[
            {text:'8,849m', correct:true},
            {text:'9,530m', correct:false},
            {text:'3,543m', correct:false},
            {text:'7,092m', correct:false}
        ]
    },
    {
        question:'How many bones have a human?',
        answers:[
            {text:'213', correct:false},
            {text:'264', correct:false},
            {text:'206', correct:true},
            {text:'243', correct:false}
        ]
    },
    {
        question:'How many planets are in the solar system?',
        answers:[
            {text:'12', correct:false},
            {text:'8', correct:true},
            {text:'9', correct:false},
            {text:'7', correct:false}
        ]
    },
    {
        question:'Who is the actual president of Paraguay (2023)?',
        answers:[
            {text:'Chilavert', correct:false},
            {text:'Horacio Cartes', correct:false},
            {text:'Santiago Peña', correct:true},
            {text:'Mario Abdo Benitez', correct:false}
        ]
    }
]

const question = document.querySelector('#question')
const answerButtons = document.querySelector('#answerButtons')
const nextBtn = document.querySelector('#next-btn')
let currentQuestIndex = 0
let score = 0

function startQuiz(){
    currentQuestIndex = 0
    score = 0
    nextBtn.innerHTML = 'Next'
    showQuestions()
}

function resetQuiz(){
    while (answerButtons.firstElementChild){
        answerButtons.firstElementChild.remove()
    }
}


function showQuestions(){
    resetQuiz()
    nextBtn.style.display = 'none'
    let currentQuestion =questionList[currentQuestIndex]
    let questionNo = currentQuestIndex + 1
    question.innerHTML = `${questionNo}. ${currentQuestion.question}`
    
    
    currentQuestion.answers.forEach((item)=>{
        let btn = document.createElement('button')
        btn.classList.add('btn')
        btn.innerHTML = item.text
        answerButtons.appendChild(btn)
        if(item.correct){
            btn.dataset.correct = item.correct
        }


        btn.addEventListener('click',selectAnswer)
    })
}

function selectAnswer(e){
    let selected = e.target
    let isCorrect = selected.dataset.correct ==='true'
    if(isCorrect){
        selected.classList.add('correct')
        score++
    }else{
        selected.classList.add('incorrect')
    }

    Array.from(answerButtons.children).forEach((e)=>{
        if(e.dataset.correct){
            e.classList.add('correct')
        }
        e.disabled = true
    })
    nextBtn.style.display = 'block'
}

function showScore(){
    resetQuiz()
    question.innerHTML =` You score ${score} out of ${questionList.length}`
    nextBtn.innerHTML = 'Play Again'
    nextBtn.style.display = 'block'
}

function handleNextBtn(){
    currentQuestIndex++
    if(currentQuestIndex<questionList.length){
        showQuestions()
    }else(
        showScore()
    )
}

nextBtn.addEventListener('click',()=>{
    if(currentQuestIndex < questionList.length){
        handleNextBtn()
    }else(
        startQuiz()
    )
})



startQuiz()

