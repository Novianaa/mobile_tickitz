import { createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk'
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducers from './reducer/index'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'schedule', 'movie']
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk, logger)
);

const persistor = persistStore(store);

export { store, persistor };