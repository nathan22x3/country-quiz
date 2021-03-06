import { getRandomItem, shuffleArray } from 'utils';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const fetchData = createAsyncThunk('quiz/fetchData', async () => {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const data = await res.json();
  return data;
});

export const randomQuestion = createAsyncThunk(
  'quiz/randomQuestion',
  async (_, { dispatch }) => {
    const types = [generateCapitalQuestion(), generateFlagQuestion()];
    dispatch(types[Math.floor(Math.random() * types.length)]);
  }
);

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    data: [],
    question: { text: '', image: '' },
    answers: [],
    scores: 0,
    status: 'idle',
  },
  reducers: {
    increScore: (state) => {
      state.scores += 1;
    },
    restartRound: (state) => {
      state.scores = 0;
    },
    generateCapitalQuestion: (state) => {
      const data = [...state.data];
      const result = { question: '', answers: [] };

      for (let index = 0; index < 4; index++) {
        try {
          const randomItem = getRandomItem(data);
          const answer = { text: '', isCorrect: false };

          if (index === 0) {
            result.question = `${randomItem.capital} is the capital of`;
            answer.isCorrect = true;
          }

          answer.text = randomItem.name;
          result.answers.push(answer);
        } catch (error) {}
      }

      shuffleArray(result.answers);

      state.question.text = result.question;
      state.question.image = '';
      state.answers = result.answers;
    },
    generateFlagQuestion: (state) => {
      const data = [...state.data];
      const result = {
        question: 'Which country does this flag belong to?',
        flag: '',
        answers: [],
      };

      for (let index = 0; index < 4; index++) {
        try {
          const randomItem = getRandomItem(data);
          const answer = { text: '', isCorrect: false };

          if (index === 0) {
            result.flag = randomItem.flag;
            answer.isCorrect = true;
          }

          answer.text = randomItem.name;
          result.answers.push(answer);
        } catch (error) {}
      }

      shuffleArray(result.answers);

      state.question.text = result.question;
      state.question.image = result.flag;
      state.answers = result.answers;
    },
  },
  extraReducers: {
    [fetchData.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchData.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'succeeded';
    },
  },
});

const { reducer, actions } = quizSlice;

export const {
  increScore,
  restartRound,
  generateCapitalQuestion,
  generateFlagQuestion,
} = actions;

export const getData = ({ quiz }) => quiz.data;
export const getQuestion = ({ quiz }) => quiz.question;
export const getAnswers = ({ quiz }) => quiz.answers;
export const getScores = ({ quiz }) => quiz.scores;
export const getStatus = ({ quiz }) => quiz.status;

export default reducer;
