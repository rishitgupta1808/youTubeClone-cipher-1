import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import logger from "redux-logger";
import { persistStore } from "redux-persist";


const middlewares = []
  middlewares.push(logger);


export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default {store,persistor};