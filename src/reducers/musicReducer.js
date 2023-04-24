const initialState = [];


const musicListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MUSIC_LIST':
      return [
        ...state,
        ...action.payload
      ];
    default:
      return state;
  }
};

export default musicListReducer;