const initialState = {
};



const currentPlayReducer = (state = initialState, action) => {

  console.log("currentPlay", action)

  switch (action.type) {
    case 'SET':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default currentPlayReducer;