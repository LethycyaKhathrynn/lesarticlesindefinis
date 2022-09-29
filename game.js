const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Ils ont deux enfants: ___ garçon et une fille.",
        choice1: "des",
        choice2: "un",
        choice3: "une",
        choice4: "d'",
        choice5: "de",
        answer: 2,
    },
    {
        question: "J`ai ___ meubles anciens dans mon salon.",
        choice1: "des",
        choice2: "un",
        choice3: "une",
        choice4: "d'",
        choice5: "de",
        answer: 1,
    },
    {
        question: "Il y a ___ lampe sur la table.",
        choice1: "des",
        choice2: "un",
        choice3: "une",
        choice4: "d'",
        choice5: "de",
        answer: 3,
    },
    {
        question: "Je ne connais pas ___ restaurant italien ici.",
        choice1: "des",
        choice2: "un",
        choice3: "une",
        choice4: "d'",
        choice5: "de",
        answer: 5,
    },
    {
        question: "Elle a acheté ___ sandales blanches pour l`été.",
        choice1: "des",
        choice2: "un",
        choice3: "une",
        choice4: "d'",
        choice5: "de",
        answer: 1,
    },
    {
        question: "J'ai commandé au boucher ___ poulet pour 6 personnes.",
        choice1: "des",
        choice2: "un",
        choice3: "une",
        choice4: "d'",
        choice5: "de",
        answer: 2,
    },
    {
        question: "Il y a ___ station de métro tout près d'ici.",
        choice1: "des",
        choice2: "un",
        choice3: "une",
        choice4: "d'",
        choice5: "de",
        answer: 3,
    },
    {
        question: "Ma fille est née ___ dimanche.",
        choice1: "des",
        choice2: "un",
        choice3: "une",
        choice4: "d'",
        choice5: "de",
        answer: 2,
    },
    {
        question: "J'ai lu ___ petite annonce intéressante dans Le Figaro.",
        choice1: "des",
        choice2: "un",
        choice3: "une",
        choice4: "d'",
        choice5: "de",
        answer: 3,
    },
    {
        question: "Je n'ai pas ___ ami qui parle russe",
        choice1: "des",
        choice2: "un",
        choice3: "une",
        choice4: "d'",
        choice5: "de",
        answer: 4,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('https://lethycyakhathrynn.github.io/lesarticlesindefinisfr/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} - ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct':
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 100)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()

