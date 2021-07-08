import React from 'react';
/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';
import ResultImage from 'assets/images/winners.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getScores, restartRound } from '../quizSlice';
import { useHistory } from 'react-router-dom';

const ResultScreen = () => {
  const dispatch = useDispatch();
  const scores = useSelector(getScores);
  const history = useHistory();

  const handleReplay = () => {
    dispatch(restartRound());
    history.replace('/play');
  };

  return (
    <div css={tw`w-[464px] mx-auto`}>
      <h1 css={tw`mb-2 uppercase font-bold text-2xl text-white`}>
        Country quiz
      </h1>
      <div
        css={tw`flex flex-col items-center px-8 pt-16 pb-10 rounded-3xl bg-white`}
      >
        <img src={ResultImage} alt='Result' css={tw`w-[238px]`} />
        <h1 css={tw`mt-[72px] mb-5 text-5xl font-bold text-blue`}>Results</h1>
        <p css={tw`text-lg font-normal`}>
          You got <span css={tw`text-4xl font-bold text-green`}>{scores}</span>{' '}
          correct {scores === 1 ? 'answer' : 'answers'}
        </p>
        <button
          css={tw`px-14 py-4 border-2 border-blue rounded-xl mt-20 text-lg font-semibold text-blue duration-200 hover:(bg-blue text-white)`}
          onClick={handleReplay}
        >
          Try angain
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
