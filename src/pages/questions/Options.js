// import React from "react";
// import { Container } from "react-bootstrap";

// export default function Options({
//   index,
//   question,
//   nextQuestion,
//   prevQuestion,
// }) {
//   return (
//     <Container className="question_div">
//       {console.log(index)}
//       <div className="question_text mt-4 ">
//         <h4>
//           Q{index + 1}. {question.question}
//         </h4>
//       </div>
//       <div className="options_div ms-4 mt-5">
//         <div className="options my-2">
//           <input type="radio" name="option" value="a" />
//           <label className="ms-2">{question.a}</label>
//         </div>
//         <div className="options my-2">
//           <input type="radio" name="option" value="b " />
//           <label className="ms-2">{question.b}</label>
//         </div>
//         <div className="options my-2">
//           <input type="radio" name="option" value="c" />
//           <label className="ms-2">{question.c}</label>
//         </div>
//         <div className="options my-2">
//           <input type="radio" name="option" value="d" checked={}/>
//           <label className="ms-2">{question.d}</label>
//         </div>
//       </div>
//       <div className="buttons mt-5 d-flex justify-content-between">
//         {index > 0 ? (
//           <button onClick={prevQuestion}>Prev Question</button>
//         ) : (
//           <div>
//             <h1></h1>
//           </div>
//         )}
//         <button onClick={nextQuestion}>
//           {index === 9 ? "SUBMIT" : "Next Question"}
//         </button>
//       </div>
//     </Container>
//   );
// }
