	];
	//Establish Quiz State with an Object(class-like) Template. I tried doing this all OOP like, a holdover from elementary experience with other languages.
	//But...it got really confusing with all the '.this' calls. Plus, couldn't get it to work, even with help from my mentor and online q&a.
	//Not there yet in my JS knowledge. Mentor suggested storing data in a quizobject type area instead.
	//So, had to change course as I went along. 
	let quiz = {
		currentScore: 0,
		currentQuestion: 0,
		questions: [],

	//seems odd?, but only way I could debug was to arrange like this. Be gentile please.
		generateQuestions: function()	{
			console.log('`generateQuestions` ran!');
			return this.questions[this.currentQuestion]
		},

		generateScoreboard: function ()	{
			let correctAnswer = this.generateQuestions()
		},

		generateFeedback: function(correctAnswer)	{
		return correctAnswer ? "<p class='correct'>You. Are. Correct!</p>" : 
		"<p class='incorrect'>Incorrect! Correct answer is highlighted above.</p>"
    	},

    	generateQuestionCount: function() {
      		return (this.currentQuestion + 1) + " (out of 10:)" 
        },

   	 	generateCorrectCount: function() {
   	 		return (this.currentScore) + " correct so far. ";
   	 	},

    	generateFinalScore: function() {
      		return "You have reached the end of this quiz. Out of 10 questions, you have successfully answered" + (this.currentScore) + " correctly. Not Bad. For a human.";
      	},
     //not sure where to put this one. seems like a state function, but could also be in the render area. Made a call here.
    	generateCorrectAnswer: function(answer) {
      		let answerCheck = this.currentQuestion().choices[this.currentQuestion().correct];
      			if (answer === answerCheck) {
        		this.currentScore ++;
      	}
      		return answer === answerCheck;
    	}
    }
    //Got this bit from a nice forum on stackoverflow.
    function newQuiz()	{
    	let quiz1 = object.create(quiz);
    	quiz1.questions = questionData;
    	return quiz1;
    }

    //render quiz view
    function renderCurrentQuestion(quiz) {
    	let currentQuestion = quiz.generateQuestions();
		$('.js-question-number').append(quiz.generateQuestionCount());
    	$('.js-score-counter').append(quiz.generateCorrectCount());
   	 	$('.js-question').append(currentQuestion.question);
   	 }
});