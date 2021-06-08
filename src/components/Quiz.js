import React, {useEffect, useState} from "react";
import Question from "../models/Question";
import data from "../data/data";

const Quiz = () => {
  const [points, setPoints] = useState(0);
  const [questions, setQuestions] = useState(data);
  const [indexOfcurrentQuestion, setIndexOfcurrentQuestion] = useState(0);
  const [finish, setFinish] = useState(false);
  const [dane, setDane] = useState(false);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);


  console.log(questions[indexOfcurrentQuestion].question);

  const showResults = () => {
    setFinish(true);
  };

  useEffect(()=>{
      let arrAnswers = [];
      arrAnswers.length = questions.length;
      setAnswers(arrAnswers);
  },[questions]);

  const handleNextButtonClick = () => {
    
    const nextQuestion = indexOfcurrentQuestion + 1;
    if (nextQuestion === questions.length - 1) {
      setDane(true);
    }
    if (nextQuestion < questions.length) {
      setIndexOfcurrentQuestion(nextQuestion);
        // setAnswers(prev => {
        //     let newAnswers = prev;
        //     newAnswers[indexOfcurrentQuestion] = answer;
        //     return newAnswers;
        // });
        // setAnswer('');
    } else {
      showResults();
    }
  };


  const handlePrevButtonClick = () => {
    const nextQuestion = indexOfcurrentQuestion - 1;
    if (nextQuestion === questions.length) {
      setDane(false);
    }
    setIndexOfcurrentQuestion(nextQuestion);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setAnswer(value);
  };

  return (
    <>
      {finish ? (
        <div>YES</div>
      ) : (
        <div className="row">
          <div className="col s6 offset-s3">
            <div className="card blue darken-1">
              <div className="card-content white-text">
                <span className="card-title">
                  Question {indexOfcurrentQuestion + 1}
                </span>
                {questions[indexOfcurrentQuestion].question}
              </div>
              <div className="row">
                <div className="col s6 offset-s4">
                  <form action="#">
                    <p>
                      <label>
                        <input
                          className="with-gap orange"
                          value={
                            answers[indexOfcurrentQuestion]
                              ? answers[indexOfcurrentQuestion]
                              : questions[indexOfcurrentQuestion].answers[0]
                          }
                          name="group1"
                          type="radio"
                          onChange={handleChange}
                        />
                        <span>
                          {questions[indexOfcurrentQuestion].answers[0]}
                        </span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input
                          className="with-gap"
                          value={
                            answers[indexOfcurrentQuestion]
                              ? answers[indexOfcurrentQuestion]
                              : questions[indexOfcurrentQuestion].answers[1]
                          }
                          name="group1"
                          type="radio"
                          onChange={handleChange}
                        />
                        <span>
                          {questions[indexOfcurrentQuestion].answers[1]}
                        </span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input
                          className="with-gap"
                          value={
                            answers[indexOfcurrentQuestion]
                              ? answers[indexOfcurrentQuestion]
                              : questions[indexOfcurrentQuestion].answers[2]
                          }
                          name="group1"
                          type="radio"
                          onChange={handleChange}
                        />
                        <span>
                          {questions[indexOfcurrentQuestion].answers[2]}
                        </span>
                      </label>
                    </p>
                  </form>
                </div>
              </div>
              <div className="card-action">
                <div className="row">
                  <div className="col s6">
                    <button
                      className="waves-effect waves-light btn  blue lighten-2"
                      disabled={indexOfcurrentQuestion === 0 ? true : false}
                      onClick={() => handlePrevButtonClick()}
                    >
                      Prev
                    </button>
                  </div>
                  <div className="col s6">
                    <button
                      className="waves-effect waves-light btn  blue lighten-2"
                      onClick={() => handleNextButtonClick()}
                    >
                      {dane ? "Dane" : "Next"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Quiz;
