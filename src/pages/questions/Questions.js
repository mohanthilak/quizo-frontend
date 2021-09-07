import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";
import "./questions.css";

export default function Questions() {
  const { id } = useParams();
  const [questions, setQuestions] = useState();
  const [question, setQuestion] = useState();
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState();
  let [score, setScore] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://quizzooo.herokuapp.com/portals/${id}/questions`,
    }).then((res) => {
      setQuestion(res.data.questions.questions[0]);
      setQuestions(res.data.questions.questions);
    });
  }, []);

  const nextQuestion = () => {
    console.log(question);
    console.log(score);
    if (index === 9) return setShow(true);
    setQuestion(questions[index + 1]);
    setIndex((i) => i + 1);
  };

  return (
    <div className="question_page mt-5" fluid="true">
      <div className="back_button_div d-flex ms-4 align-items-center">
        <svg
          width="57"
          height="24"
          viewBox="0 0 57 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.93934 10.9393C0.353553 11.5251 0.353553 12.4749 0.93934 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.807612 11.0711 0.807612 10.4853 1.3934L0.93934 10.9393ZM57 10.5L2 10.5V13.5L57 13.5V10.5Z"
            fill="black"
          />
        </svg>
        <Link to="/" className="back_link ms-2">
          Back
        </Link>
      </div>
      {question ? (
        <Container className="question_div">
          {show ? (
            <div className="score_div">
              {score === 10 ? (
                <>
                  <h1>
                    Congratulations! your score is <br />
                    <span>10</span>
                  </h1>
                  <p>
                    Try another anime and check if you still get the same score.
                  </p>
                </>
              ) : (
                <>
                  <h1>
                    Well your score is <br />
                    {score}
                  </h1>
                  <p>Play again and check if your can score 10.</p>
                </>
              )}
            </div>
          ) : (
            <>
              <div className="question_text mt-4 ">
                <h4>
                  Q{index + 1}/10. {question.question}
                </h4>
              </div>

              <div className="options_div ">
                <div>
                  <button
                    onClick={() => {
                      if ("a" === question.answer) {
                        console.log("Correct answer");
                        setScore((i) => i + 1);
                      }
                      nextQuestion();
                    }}
                  >
                    {question.a}
                  </button>
                  <button
                    onClick={() => {
                      if ("b" === question.answer) {
                        console.log("Correct answer");
                        setScore((i) => i + 1);
                      }
                      nextQuestion();
                    }}
                  >
                    {question.b}
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      if ("c" === question.answer) {
                        console.log("Correct answer");
                        setScore((i) => i + 1);
                      }
                      nextQuestion();
                    }}
                  >
                    {question.c}
                  </button>
                  <button
                    onClick={() => {
                      if ("d" === question.answer) {
                        console.log("Correct answer");
                        setScore((i) => i + 1);
                      }
                      nextQuestion();
                    }}
                  >
                    {question.d}
                  </button>
                </div>
              </div>
            </>
          )}
        </Container>
      ) : (
        <></>
      )}
    </div>
  );
}
