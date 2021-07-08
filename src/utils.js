export const getRandomItem = (array) => {
  const randomIdx = Math.floor(Math.random() * array.length);
  const randomItem = array.splice(randomIdx, 1)[0];

  return randomItem;
};

export const shuffleArray = (array = []) => {
  array.sort(() => Math.random() - 0.5);
};
