import Quiz from 'features/Quiz';
import { fetchData } from 'features/Quiz/quizSlice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex items-center w-screen h-screen bg-app bg-cover'>
      <Router basename='/'>
        <Redirect exact path='/' to='/play' />
        <Quiz />
      </Router>
    </div>
  );
};

export default App;
