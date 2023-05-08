export const setCurrentPlay = (file) => {
  return {
    type: 'SET',
    payload: file,
  };
};