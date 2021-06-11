
import { combineReducers } from "redux";
import userReducer from "./user/user-reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const congfigPersist = {
  key : 'root',
  storage,
  whitelist : ['user']
}
const rootReducer = combineReducers({

    user : userReducer
  });

  export default persistReducer(congfigPersist,rootReducer)









 