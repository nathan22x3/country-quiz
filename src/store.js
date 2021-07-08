import quizReducer from 'features/Quiz/quizSlice';
const { configureStore } = require('@reduxjs/toolkit');

const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
