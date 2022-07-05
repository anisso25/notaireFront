import {
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import { Interceptor } from '~/lib/axios';
import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk, sagaMiddleware];
const persistConfig = {
  version: 1,
  key: 'notaire-app',
  storage,
  whitelist: ['user', 'general'],
};
export const store = createStore(
  persistReducer(persistConfig, reducers),
  composeWithDevTools(applyMiddleware(...middlewares)),
);

Interceptor(store);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;
