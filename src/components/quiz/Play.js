import React, { Component, Fragment } from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';
import isEmpty from '../../utils/is-empty';
import questions from '../../questions.json';
import M from 'materialize-css';
import correctSound from '../../assets/img/554055__gronkjaer__rightanswer.mp3';
import wrongSound from '../../assets/img/554053__gronkjaer__wronganswer.mp3';
import buttonSound from '../../assets/img/188388__wubitog__mid-high-tone-button-click.wav';
const QuizWrapper = () => {
    const navigate = useNavigate();
    return <Play navigate={navigate} />;
};
class Play extends Component {
    playSound = (sound) => {
        const audio = new Audio(sound);
        audio.play();
    };
    handleAnswer = (isCorrect) => {
        if (isCorrect) {
            this.playSound(correctSound);
        } else {
            this.playSound(wrongSound);
        }
    };
    handleNextButtonClick = () => {
        this.playSound(buttonSound);
        if (this.state.nextQuestion !== undefined) {
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex + 1
            }), () => { this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion) })
        }
    };
    handlePrevButtonClick = () => {
        this.playSound(buttonSound);
        if (this.state.previousQuestion !== undefined) {
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex - 1
            }), () => { this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion) })
        }
    }
    handleButtonClick = (e) => {
        const { id } = e.target;
        console.log(e.target.className);
        switch (e.target.className) {
            case 'next':
                this.handleNextButtonClick();
                this.playSound(buttonSound);
                break;
            case 'back':
                this.handlePrevButtonClick();
                this.playSound(buttonSound);
                break;
            default:
                console.warn(`Unhandled button click: ${id}`);
                break;
        }
    }
    getRandomQuestions = (questions, num) => {
        const shuffled = [...questions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    };

    constructor(props) {
        super(props);
        this.state = {
            questions: this.getRandomQuestions(questions, 15),
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            userAnswers: {},
            answer: '',
            numberofQuestion: 15,
            numberofAnsweredQuestion: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            hints: 5,
            usedHints: 0,
            previousRandomNumbers: [],
            fiftyFifty: 2,
            fiftyFiftyUsed: 0,
            time: {}
        }
        this.interval = null;
    };
    componentDidMount() {
        const { questions, currentQuestion, nextQuestion, previousQuestion, correctAnswers } = this.state;
        this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion, correctAnswers);
        this.starttimer();
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion, correctAnswers) => {
        let { currentQuestionIndex } = this.state;
        if (!isEmpty(this.state.questions)) {
            currentQuestion = questions[currentQuestionIndex]
            nextQuestion = questions[currentQuestionIndex + 1]
            previousQuestion = questions[currentQuestionIndex - 1]
            correctAnswers = questions[correctAnswers + 1]
            const answer = currentQuestion.answer
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                answer,
                previousRandomNumbers: []
            }, () => {
                this.showOptions()
            })
        }
    }
    handleOptionClick = (e) => {
        const selectedAnswer = e.target.innerHTML;
        const { currentQuestionIndex, answer } = this.state;

        const isCorrect = selectedAnswer.toLowerCase() === answer.toLowerCase();

        this.setState(prevState => ({
            userAnswers: {
                ...prevState.userAnswers,
                [currentQuestionIndex]: selectedAnswer  // overwrite if already answered
            },
            numberofAnsweredQuestion: Object.keys({
                ...prevState.userAnswers,
                [currentQuestionIndex]: selectedAnswer
            }).length
        }), () => {
            if (isCorrect) {
                this.correctAnswer();
                this.handleAnswer(true);
            } else {
                this.wrongAnswer();
                this.handleAnswer(false);
            }
        });
    };

    correctAnswer = () => {
        M.toast({
            html: "correct answer",
            classes: "toast-valid",
            displayLength: 1500,
        })
        this.setState(prevState => ({
            score: prevState.score + 1,
            correctAnswers: prevState.correctAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberofAnsweredQuestion: prevState.numberofAnsweredQuestion + 1
        }), () => {
            if (this.state.currentQuestionIndex + 1 >= this.state.questions.length) {
                this.endGame();
            }
            else {
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
            }
        })
    }
    wrongAnswer = () => {
        // navigator.vibrate(1000)
        M.toast({
            html: "wrong answer",
            classes: "toast-invalid",
            displayLength: 1500
        })
        this.setState(prevState => ({
            wrongAnswers: prevState.wrongAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberofAnsweredQuestion: prevState.numberofAnsweredQuestion + 1
        }), () => {
            if (this.state.nextQuestion === undefined) {
                this.endGame();
            }
            else {
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
            }
        })
    }
    starttimer = () => {
        const countDownTime = Date.now() + 300000;
        this.interval = setInterval(() => {
            const now = Date.now();
            const distance = countDownTime - now;
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((distance % (1000 * 60)) / (1000))
            if (distance < 0) {
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                    this.endGame();
                })
            }
            else {
                this.setState({
                    time: {
                        minutes,
                        seconds
                    }
                })
            }
        }, 1000)
    }
    endGame = () => {
        const { userAnswers, questions } = this.state;
        let score = 0, correctAnswers = 0, wrongAnswers = 0;

        Object.keys(userAnswers).forEach(index => {
            const question = questions[index];
            if (
                userAnswers[index].toLowerCase() === question.answer.toLowerCase()
            ) {
                score++;
                correctAnswers++;
            } else {
                wrongAnswers++;
            }
        });

        const playerStats = {
            score,
            numberofQuestion: 15,
            numberofAnsweredQuestion: Object.keys(userAnswers).length,
            correctAnswers,
            wrongAnswers,
            fiftyFiftyUsed: 2 - this.state.fiftyFifty,
            usedHints: 5 - this.state.hints
        };

        alert("The quiz has ended. Press OK to see your report.");
        this.props.navigate('/play/quiz/analysis', { state: playerStats });
    };

    showOptions = () => {
        const options = Array.from(document.querySelectorAll('.opi'))
        options.forEach((opi) => {
            opi.style.visibility = 'visible';
        })
    }
    handlefiftyFifty = () => {
        const { fiftyFifty, answer } = this.state;

        if (fiftyFifty > 0) {
            const options = document.querySelectorAll('.opi');
            const randomNumbers = [];
            let indexOfAnswer;

            options.forEach((opi, index) => {
                if (opi.innerHTML.toLowerCase() === answer.toLowerCase()) {
                    indexOfAnswer = index;
                }
            });

            while (randomNumbers.length < 2) {
                const randomNumber = Math.floor(Math.random() * options.length);
                if (randomNumber !== indexOfAnswer && !randomNumbers.includes(randomNumber)) {
                    randomNumbers.push(randomNumber);
                }
            }

            options.forEach((opi, index) => {
                if (randomNumbers.includes(index)) {
                    opi.style.visibility = 'hidden';
                }
            });

            this.setState(prevState => ({
                fiftyFifty: prevState.fiftyFifty - 1
            }));
        } else {
            M.toast({
                html: "No more 50-50 lifelines left!",
                classes: "toast-invalid",
                displayLength: 1500
            });
        }
    };
    handleHints = () => {
        if (this.state.hints === 0) {
            console.log("out of hints")
            M.toast({
                html: "Out of Hints",
                classes: "toast-valid",
                displayLength: 1500,
            })
        }
        if (this.state.hints > 0) {
            const options = Array.from(document.querySelectorAll('.opi'))
            console.log(options)
            let indexofAnswer;
            options.forEach((opi, index) => {
                if (opi.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
                    indexofAnswer = index;
                }
            });
            while (true) {
                const randomnumber = Math.round(Math.random() * 3);
                if (randomnumber !== indexofAnswer && !this.state.previousRandomNumbers.includes(randomnumber)) {
                    options.forEach((opi, index) => {
                        if (index === randomnumber) {
                            opi.style.visibility = 'hidden';
                            this.setState(prevState => ({
                                hints: prevState.hints - 1,
                                previousRandomNumbers: prevState.previousRandomNumbers.concat(randomnumber)
                            }))
                        }
                    })
                    if (this.state.previousRandomNumbers.length >= 3) break;
                    break;
                }
            }
        }
    }
    render() {
        const { alert } = this.state;
        const { currentQuestion, currentQuestionIndex, hints, fiftyFifty, time } = this.state;
        return (
            <Fragment>
                <Helmet><title>Quiz-Questions</title></Helmet>
                <header><div className="head-x">
                    <div className="currentIndex-1">
                        <h3>Questioncount-{currentQuestionIndex + 1}</h3>
                    </div>
                    <div className="time">
                        <div className='timeTag'>{time.minutes}:{time.seconds}</div>
                        <button className='z' id="submit-button" onClick={this.endGame} ><div className="submit">Submit</div></button>
                    </div>
                </div></header>
                <div className="Question">
                    {/* <Header/> */}
                    <div className="alert"><Alert alert={alert} /></div>
                    <div className="Question-1">
                        <div className="lifeline" onClick={this.handlefiftyFifty}>
                            <span className='mdi mdi-set-center mdi-24px lifeline-icon'></span>
                            <div style={{ color: 'green', fontWeight: "bold", fontSize: "1rem" }} className='hint-index mx-2 my-2' >{fiftyFifty}</div>
                        </div>
                        <h1>{currentQuestion.question}</h1>
                        <div className="hints" onClick={this.handleHints}>
                            <div className='mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon'></div>
                            <div style={{ color: 'green', fontWeight: "bold", fontSize: "1rem" }} className='hint-index mx-2 my-2' >{hints}</div>
                        </div>
                    </div>
                    <div className="options">
                        <div className='col-1'>
                            <div className='opt-1'>
                            <button onClick={this.handleOptionClick} className="opi">{currentQuestion.optionA}</button>
                            </div>
                            <div className="opt-2">
                            <button onClick={this.handleOptionClick} className="opi">{currentQuestion.optionB}</button>
                            </div>
                        </div>
                        <div className='col-2'>
                            <div className="opt-3">
                            <button onClick={this.handleOptionClick} className="opi" >{currentQuestion.optionC}</button>
                            </div>
                            <div className="opt-4">
                            <button onClick={this.handleOptionClick} className="opi">{currentQuestion.optionD}</button>
                            </div>
                        </div>
                    </div>
                    <footer>
                        <button className='x' id="prev-button" onClick={this.handleButtonClick}><div className="back">Prev</div></button>
                        <button className='y' id="next-button" onClick={this.handleButtonClick} ><div className="next">Next</div></button>
                    </footer>
                </div>
            </Fragment>
        )
    }
}
// export default Play;
export default QuizWrapper;

// handleNavigation = (navigate,props) => {
//     const { state } = this;
//     const playerStats = {
//         score: state.score,
//         numberofQuestion: state.numberofQuestion,
//         numberofAnsweredQuestion: state.numberofAnsweredQuestion,
//         correctAnswers: state.correctAnswers,
//         wrongAnswers: state.wrongAnswers,
//         fiftyFiftyUsed: 2 - state.fiftyFiftyUsed,

//         hintsUsed: 5 - state.hintsUsed
//     };
//     console.log(playerStats);
//     navigate('/play/quiz/report',playerStats);
// };