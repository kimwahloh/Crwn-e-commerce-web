//153
import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';


//root-reducer
import { rootReducer } from './root-reducer';

//169 Redux-persist
const persistConfig = { 
    key: 'root',
    storage,
    whitelist: ['cart'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

//154 Middlewares 中间件 : little library helpers that run before an action hits the reducer; something like enhancers
//170 Redux-Devtools
const middleWares = [process.env.NODE_ENV !== 'production' && logger,
thunk,
].filter(Boolean);

//170 Redux-Devtools
const composeEnhancer = 
    (process.env.NODE_ENV !== 'production' && 
        window && 
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || 
    compose;


const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);