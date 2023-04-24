import { combineReducers } from 'redux'
import currentPlayReducer from './currentPlayReducer'
import extensionsReducer from './extensionsReducer'
import musicListReducer from './musicReducer'
import videoListReducer from './videoReducer'


const rootReducer = combineReducers({
  currentPlay: currentPlayReducer,
  extensions: extensionsReducer,
  musicList: musicListReducer,
  videoList: videoListReducer
})



export default rootReducer;