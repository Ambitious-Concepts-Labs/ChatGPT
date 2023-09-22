// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React from "react";
import { survey } from "../constants/survey";
import Image from "next/image";
import surveyImage from "../assets/survey.png";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";

export default function Survey(props: any) {
  const { session } = props
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedOptions, setSelectedOptions] = React.useState<any>();
  const [score, setScore] = React.useState(0);
  const [showScore, setShowScore] = React.useState(false);
  const [isStarted, setIsStarted] = React.useState(false);

  const handlePrevious = () => {
    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues);
  };

  const handleNext = () => {
    const nextQues = currentQuestion + 1;
    nextQues < survey.length && setCurrentQuestion(nextQues);
  };

  const handlePaginationClick = (selection: React.SetStateAction<number>) => {
    setCurrentQuestion(selection);
  };

  const handleAnswerOption = (answer: any) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion] = {
        question: survey[currentQuestion].question,
        response: answer,
      }),
    ]);
    setSelectedOptions([...selectedOptions]);
    console.log(selectedOptions);
  };

  const handleSubmitButton = async () => {
    await addDoc(collection(db, "users", session?.user?.email, "feedback"), {
      feeback: selectedOptions,
      createdAt: serverTimestamp(),
      id: uuidv4(),
    });
    let newScore = 0;
    for (let i = 0; i < survey.length; i++) {
      survey[i].answerOptions.map(
        (answer) =>
          answer.isCorrect &&
          answer.answer === selectedOptions[i]?.response &&
          (newScore += 1),
      );
    }
    setScore(newScore);
    setShowScore(true);
  };

  return (
    <div className="flex flex-col w-4/5 h-auto  px-5 my-4 py-5 bg-white justify-center items-center">
      {!isStarted ? (
        <>
          <Image src={surveyImage} alt="survey" width={500} />
          <p className="w-3/6 mb-5 text-black/60">
            As part of our ongoing effort to provide better features, we would
            like to request your feedback via this short survey. It should only
            take about 1 minute to complete.
          </p>
          <button
            className=" mb-5 bg-yellow-400 rounded p-2 text-black/60"
            onClick={() => setIsStarted(!isStarted)}
          >
            Take Survey
          </button>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center w-full">
            <h4 className="mt-10 text-xl text-black/60">
              Question {currentQuestion + 1} of {survey.length}
            </h4>
            <div className="mt-4 text-2xl text-black/60">
              {survey[currentQuestion].question}
            </div>
          </div>
          <hr className="w-full p-5" />
          <div className="flex flex-col w-full">
            {survey[currentQuestion].answerOptions.map((answer, index) => (
              <div
                key={index}
                className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white/10 rounded-xl bg-white/5"
                onClick={(e) => handleAnswerOption(answer.answer)}
              >
                <input
                  type="radio"
                  name={answer.answer}
                  value={answer.answer}
                  checked={
                    answer.answer === selectedOptions[currentQuestion]?.response
                  }
                  onChange={(e) => handleAnswerOption(answer.answer)}
                  className="w-6 h-6 bg-black"
                />
                <p className="ml-6 text-black">{answer.answer}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center w-full mt-4  py-10 lg:px-0 sm:px-6 px-4">
            <div className="flex items-center w-full justify-between border-t border-gray-200">
              <div className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer">
                <svg
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.1665 4H12.8332"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1.1665 4L4.49984 7.33333"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1.1665 4.00002L4.49984 0.666687"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <button
                  className="text-sm ml-3 font-medium leading-none"
                  onClick={() => handlePrevious}
                  disabled={currentQuestion === 0 ? true : false}
                  style={
                    currentQuestion === 0
                      ? { backgroundColor: "gray !important" }
                      : {}
                  }
                >
                  Previous
                </button>
              </div>
              <div className="sm:flex hidden">
                {survey.map((question, index) => (
                  <p
                    key={index}
                    className={`${
                      currentQuestion == index
                        ? "text-sm font-medium leading-none cursor-pointer text-indigo-700 border-t border-indigo-400 pt-3 mr-4 px-2"
                        : "text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2"
                    }
                                    `}
                    onClick={() => handlePaginationClick(index)}
                  >
                    {index + 1}
                  </p>
                ))}
              </div>
              <div className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer">
                <button
                  className="text-sm font-medium leading-none mr-3"
                  onClick={ () =>
                    currentQuestion + 1 === survey.length
                      ? handleSubmitButton
                      : handleNext
                  }
                >
                  {currentQuestion + 1 === survey.length ? "Submit" : "Next"}
                </button>
                <svg
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.1665 4H12.8332"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.5 7.33333L12.8333 4"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.5 0.666687L12.8333 4.00002"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </>
      )}
      {showScore ? (
        <h1 className="text-3xl font-semibold text-center text-black">
          You scored {score} out of {survey.length}
        </h1>
      ) : (
        <></>
      )}
    </div>
  );
}