const initialState = {
  musicList: [],
};


const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MUSIC_LIST':
      return {
        ...state,
        musicList: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;