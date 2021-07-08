import AdventureImage from 'assets/images/adventure.svg';
import AnswerOption from 'features/Quiz/components/AnswerOption';
import {
  generateCapitalQuestion,
  getAnswers,
  getData,
  getQuestion,
  getStatus,
  increScore,
} from 'features/Quiz/quizSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';

const GameScreen = () => {
  const router = useHistory();
  const data = useSelector(getData);
  const question = useSelector(getQuestion);
  const answers = useSelector(getAnswers);
  const status = useSelector(getStatus);
  const dispatch = useDispatch();

  const [selected, setSelected] = useState();
  const [completed, setCompleted] = useState(false);

  const handleCheck = (answer) => {
    if (selected.text === answer.text && selected.isCorrect) {
      return 'correct';
    } else if (selected.text === answer.text && !selected.isCorrect) {
      return 'incorrect';
    } else if (answer.isCorrect) return 'correct';
    return 'default';
  };

  const handleSelect = (answer) => {
    setSelected(answer);
    if (answer.isCorrect) dispatch(increScore());
    setCompleted(true);
  };

  const handleNext = () => {
    if (selected.isCorrect) {
      setSelected(undefined);
      dispatch(generateCapitalQuestion());
    } else router.push('/result');
    setCompleted(false);
  };

  useEffect(() => {
    dispatch(generateCapitalQuestion());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div css={tw`w-[464px] mx-auto`}>
      <h1 css={tw`mb-2 uppercase font-bold text-2xl text-white`}>
        Country quiz
      </h1>
      <div
        css={tw`relative flex flex-col px-8 pt-16 pb-10 rounded-3xl bg-white`}
      >
        <img
          css={tw`absolute top-[-72px] right-0`}
          src={AdventureImage}
          alt='Illutration'
        />
        {['idle', 'loading'].includes(status) ? (
          <span>Loading...</span>
        ) : (
          <>
            <p css={tw`text-2xl font-bold text-blue`}>{question}</p>
            <section
              css={tw`flex flex-col gap-y-6 my-8`}
              style={{ counterReset: 'answer' }}
            >
              {answers.map((answer) => (
                <AnswerOption
                  key={answer.text}
                  text={answer.text}
                  state={selected && handleCheck(answer)}
                  disabled={completed}
                  onClick={() => handleSelect(answer)}
                />
              ))}
            </section>
          </>
        )}
        {completed && (
          <button
            tw='self-end flex justify-between px-5 py-4 rounded-xl text-lg font-medium bg-orange text-white duration-200'
            onClick={() => handleNext()}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default GameScreen;
