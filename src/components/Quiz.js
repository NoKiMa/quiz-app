import React, {useState} from "react";
import testData from "../assets/quiz-data";

const Quiz = () => {
    const [points, setPoints] = useState(null);
    const [questions, setQuestions] = useState(testData);
    const [indexOfCurrentQuestion, setIndexOfcurrentQuestion] = useState(0);
    const [isQuizDone, setIsQuizToDone] = useState(false);
    const [userAnswer, setUserAnswer] = useState('');
    const [isQuizFilledUp, setIsQuizFilledUp] = useState(false);

    const onButtonClick = (num) => {
        const nextQuizNum = indexOfCurrentQuestion + num;
        if (nextQuizNum < 0) {
            return;
        }
        if (nextQuizNum >= questions.length) {
            return setIsQuizToDone(true);
        }
        setupUserAnswer(nextQuizNum);
        checkQuizForm();
    }

    const setupUserAnswer = (nextQuizNum) => {
        setIndexOfcurrentQuestion(nextQuizNum);
        setUserAnswer(questions[nextQuizNum].userAnswer);
    }

    const handleChange = (e) => {
        const value = e.target.value;
        const currentQuestions = questions;
        setUserAnswer(value);
        currentQuestions[indexOfCurrentQuestion].userAnswer = value;
        setQuestions(currentQuestions);
        checkQuizForm();
    };

    const checkQuizForm = () => {
        setIsQuizFilledUp(questions.every(question => question.userAnswer !== ''));
    }

    const onDoneClick = () => {
        const pointsPerAnswer = 100 / questions.length;
        let userPoints = 0;
        questions.forEach(question => {
            if (question.userAnswer === question.correctAnswer) {
                userPoints += pointsPerAnswer;
            } 
        })
        return userPoints === 0?setPoints("0"):setPoints(userPoints);
    }

    return (
        <>
            <div className="row">
                <div className="col s6 offset-s3">
                    <div className="card blue darken-1">
                        {isQuizDone ? (
                            <div className="card-content white-text">
                              <span className="card-title">
                                {points? `Your score is ${points} points` : "Congratulations! Please click on Done button to see your SCORE!"}
                              </span>
                            </div>
                        ) : (
                            <div>
                                <div className="card-content white-text">
                                  <span className="card-title">
                                    Question {indexOfCurrentQuestion + 1}
                                  </span>
                                    {questions[indexOfCurrentQuestion].question}
                                </div>
                                <div className="row">
                                    <div className="col s6 offset-s3">
                                        <form className="form" action="#">
                                            {questions[indexOfCurrentQuestion].answers.map((answer, index) => {
                                                return (
                                                    <label key={answer}>
                                                        <input
                                                            className="with-gap orange"
                                                            value={answer}
                                                            name="group1"
                                                            type="radio"
                                                            onChange={handleChange}
                                                            checked={userAnswer === answer}
                                                        />
                                                        <span className="white-text">
                                                          {answer}
                                                        </span>
                                                    </label>
                                                )
                                            })}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )
                        }
                        <div className="card-action">
                            <div className="row">
                                {!isQuizDone ? (
                                    <div>
                                        <div className="col s6">
                                            <button
                                                className="waves-effect waves-light btn  blue lighten-2"
                                                disabled={indexOfCurrentQuestion === 0}
                                                onClick={() => onButtonClick(-1)}
                                            >
                                                Prev
                                            </button>
                                        </div>
                                        <div className="col s6">
                                            <button
                                                className="waves-effect waves-light btn  blue lighten-2"
                                                disabled={indexOfCurrentQuestion === (questions.length - 1) && !isQuizFilledUp}
                                                onClick={() => onButtonClick(+1)}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="col s12">
                                        {points ? (
                                            <div>
                                            </div>) : (
                                            <div>
                                                <button
                                                    className="waves-effect waves-light btn  blue lighten-2"
                                                    onClick={() => onDoneClick()}
                                                >
                                                    Done
                                                </button>
                                            </div>
                                        )}

                                    </div>
                                )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Quiz;
