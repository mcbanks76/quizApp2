'use strict'
//beginning of the quiz
const STORE = [{
	question: "What 80’s TV show, starring Scott Bakula, is one of the greatest shows to ever grace the airways? (For like, a million reasons. Don’t get me started...)",
	choices: ["The A-Team", "MacGyver", "Quantum Leap", "The Golden Girls"],
	correct: "Quantum Leap"
}, {
	question: "Who was the main villain on the cartoon 'He-Man and the Masters of the Universe?'",
	choices: ["Rochester", "Skeletor", "Man-at-Arms", "She-Ra"],
	correct: "Skeletor"
}, {
	question: "In what year did “The Simpsons” first air, starting a reign of televised comedic dominance that will not be replicated in your lifetime?",
	choices: ["1987", "1983", "1989", "Nineteen aught four"],
	correct: "1989"
}, {
	question: "On 'Knight Rider', what was the name of the car that Michael drove around, fighting crime and the like?",
	choices: ["ROC", "TRIPP", "KITT", "Samantha"],
	correct: "KITT"
}, {
	question: "On “The Golden Girls”, who owned the house they all lived in?",
	choices: ["Blanche", "Dorothy", "Rose", "Sophia"],
	correct: "Blanche"
}, {
	question: "What was the name of the robot on the surprisingly watchable show 'Small Wonder'?",
	choices: ["Pam", "Reba", "Vicky", "Max"],
	correct: "Vicky"
}, {
	question: "Which Saturday morning cartoon series featured tiny versions of iconic children's characters?",
	choices: ["Howdy Doody Tots", "Muppet Babies", "He-Man: The Nursery Years", "Ultrasound Voltron"],
	correct: "Muppet Babies"
}, {
	question: "What planet did ALF come from?",
	choices: ["Marvin", "Crapo", "Remulac", "Melmac"],
	correct: "Melmac"
}, {
	question: "Which show was a spinoff of 'Growing Pains'?",
	choices: ["Boner and the Deuce", "Mike Seaver High", "Just the Ten of Us", "Out of This World"],
	correct: "Just the Ten of Us"
}, {
	question: "What was catchphrase of John 'Hanibal' Smith (From the TV show The A-Team. Although, if you need this clue, I worry you ain't gettin' this right)?",
	choices: ["Do you smell something?", "I love it when a plan comes together", "This pup's gotta fly!", "A-team...Let's Finish the Job"],
	correct: "I love it when a plan comes together"
}];

let questionNumber = 0;
let score = 0;
//generate question html
function generateQuestion() {
	if (questionNumber < STORE.length) {
		return `<div class="col-12 question-${questionNumber}">
    <h2 class="questionText">${STORE[questionNumber].question}</h2>
    <form class="form col-12">
    <fieldset class="fieldset row">
    	<legend class="legend"> Choose Your Answer:</legend></br>
    		<label class="answerOption">
    			<input type="radio" value="${STORE[questionNumber].choices[0]}" name="answer" required>
    			<span>${STORE[questionNumber].choices[0]}</br></br></span>
    		</label>
    		<label class="answerOption">
    			<input type="radio" value="${STORE[questionNumber].choices[1]}" name="answer" required>
    			<span>${STORE[questionNumber].choices[1]}</br></br></span>
    		</label>
    		<label class="answerOption">
    			<input type="radio" value="${STORE[questionNumber].choices[2]}" name="answer" required>
    			<span>${STORE[questionNumber].choices[2]}</br></br></span>
    		</label>
    		<label class="answerOption">
    			<input type="radio" value="${STORE[questionNumber].choices[3]}" name="answer" required>
    			<span>${STORE[questionNumber].choices[3]}</br></br></span>
    		</label>
    		<button type="submit" class="submitButton">Compute</br></button>
    </fieldset>
    </form>
    </div>`;
	} else {
		renderResults();
		handleRestartQuiz();
		$('.scoreboard').hide();
	}
}

function generateQuestionNumber() {
	questionNumber++;
	$('.js-question-number').text(questionNumber + 1);
}

function handleStartQuiz() {
	$('.quizStart').on('click', '.startButton', function(event) {
		$('.quizStart').hide();
		$('.scoreboard, .masthead, .js-quiz-container').removeClass('hidden');
		$('.js-question-Number').text('1');
	});
}

function renderQuestion() {
	$('.js-quiz-container').html(generateQuestion());
}

function userSelectAnswer() {
	$('form').on('submit', function(event) {
		event.preventDefault();
		let selected = $('input:checked');
		let answer = selected.val();
		let correctAnswer = `${STORE[questionNumber].correct}`;
		if (answer === correctAnswer) {
			selected.parent().addClass('correct');
			ifAnswerIsCorrect();
		} else {
			selected.parent().addClass('wrong');
			userAnswerFeedbackWrong();
		}
	});
}

function ifAnswerIsCorrect() {
	userAnswerFeedbackCorrect();
	updateScore();
}

function userAnswerFeedbackCorrect() {
	let correctAnswer = `${STORE[questionNumber].correct}`;
	$('.js-quiz-container').html(`<div class="correctFeedback"><p><b>You got it TOTALLY right!</b></p><button type=button class="nextButton">Next</button></div>`);
}

function userAnswerFeedbackWrong() {
	let correctAnswer = `${STORE[questionNumber].correct}`;
	$('.js-quiz-container').html(`<div class="incorrectFeedback"></div><p><b>You got it TOTALLY Wrong!</b><br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}

function updateScore() {
	score++;
	$('.js-score-counter').text(score);
}

function renderResults() {
	if (score >= 8) {
		$('.js-quiz-container').html(`<div class="results correctFeedback"><h3>WOW! You are like, TOTALLY into 80's television!</h3><p>You got ${score} / 10 correct.</p><p>Ken Ober is applauding you from his grave. Now turn off Nick at Nite and go to bed already!</p><button class="restartButton">Restart Quiz</button></div>`);
	} 
	else if (score < 8 && score >= 5) {
		$('.js-quiz-container').html(`<div class="results correctFeedback"><h3>A TOTALLY fine score.</h3><p>You got ${score} / 10 correct.</p><p>Next time try chanting "No Whammies" to yourself before pressing the compute button.</p><button class="restartButton">Restart Quiz</button></div>`);
	} 
	else {
		$('.js-quiz-container').html(`<div class="results correctFeedback"><h3>TOTALLY bogus score dude.</h3><p>You got ${score} / 10 correct.</p><p>Maybe you'll like, do better on the 90's quiz?</p><button class="restartButton">Restart?</button></div>`);
	}
}
//what happens when the user clicks next
function renderNextQuestion() {
	$('main').on('click', '.nextButton', function(event) {
		generateQuestionNumber();
		renderQuestion();
		userSelectAnswer();
	});
}

function handleRestartQuiz() {
	$('main').on('click', '.restartButton', function(event) {
		location.reload();
	});
}

function createQuiz() {
	handleStartQuiz();
	renderQuestion();
	userSelectAnswer();
	renderNextQuestion();
}

$(createQuiz);


	
