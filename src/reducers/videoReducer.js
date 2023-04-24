const initialState = [];


const videoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VIDEO_LIST':
      return [
        ...state,
        ...action.payload
      ];
    default:
      return state;
  }
};

export default videoListReducer;