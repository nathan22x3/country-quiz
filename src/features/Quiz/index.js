import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GameScreen from 'features/Quiz/screens/GameScreen';
import ResultScreen from 'features/Quiz/screens/ResultScreen';

const Quiz = () => {
  return (
    <Switch>
      <Route path='/play' component={GameScreen} />
      <Route path='/result' component={ResultScreen} />
    </Switch>
  );
};

export default Quiz;
