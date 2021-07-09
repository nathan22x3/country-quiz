import Quiz from 'features/Quiz';
import { fetchData } from 'features/Quiz/quizSlice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='relative flex items-center w-screen min-h-screen px-7 py-20 bg-app bg-cover'>
      <Router basename='/'>
        <Redirect exact path='/' to='/play' />
        <Quiz />
      </Router>
      <footer
        css={tw`absolute bottom-0 left-0 w-screen py-7 text-center text-sm font-normal font-montserrat text-white`}
      >
        created by{' '}
        <a
          href='http://github.com/nathan22x3'
          target='_blank'
          rel='noopener noreferrer'
          css={tw`underline font-bold`}
        >
          nathan22x3
        </a>{' '}
        - devChallenges.io
      </footer>
    </div>
  );
};

export default App;
