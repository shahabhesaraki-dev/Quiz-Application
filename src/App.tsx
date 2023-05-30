import React, { useState } from "react";
import styled from "styled-components";
import QuestionCard from "./components/QuestionCard";

import { fetchQuizQuestions } from "./API";
import { StateQuestion } from "./API";
import { GlobalStyle } from "./globalStyle";

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<StateQuestion[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // console.log(questions);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = event.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    if (number !== TOTAL_QUESTIONS - 1) {
      setNumber((prev) => prev + 1);
    } else {
      setGameOver(true);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Title>Quiz Game</Title>
        {gameOver ? (
          <StartButton onClick={startTrivia}>Start</StartButton>
        ) : gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <StartButton onClick={startTrivia}>New Game</StartButton>
        ) : null}
        {!gameOver && <Score>Score: {score}</Score>}
        {loading && <P>Loading Questions ...</P>}
        {!gameOver && !loading && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestins={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!loading &&
          !gameOver &&
          userAnswers.length === number + 1 &&
          number !== TOTAL_QUESTIONS - 1 && (
            <NextButton style={{ marginTop: "15px" }} onClick={nextQuestion}>
              Next Question
            </NextButton>
          )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const P = styled.p`
  color: #fff;
`;

const Score = styled.p`
  color: #fff;
  font-size: 2rem;
  margin: 0;
`;

const Title = styled.h1`
  font-family: Fascinate Inline;
  background-image: linear-gradient(180deg, #fff, #87f1ff);
  font-weight: 400;
  background-size: 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
  filter: drop-shadow(2px 2px #0085a3);
  font-size: 70px;
  text-align: center;
  margin: 20px;
`;

const StartButton = styled.button`
  cursor: pointer;
  background: linear-gradient(180deg, #ffffff, #ffcc91);
  border: 2px solid #d38558;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  height: 40px;
  margin: 20px 0;
  padding: 0 40px;
  max-width: 200px;
  font-size: large;
`;

const NextButton = styled.button`
  cursor: pointer;
  background: linear-gradient(180deg, #ffffff, #ffcc91);
  border: 2px solid #d38558;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  height: 40px;
  margin: 20px 0;
  padding: 0 40px;
  font-size: large;
`;

export default App;
