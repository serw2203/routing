'use strict';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import middleware from './middleware';
import * as reducers from './reducers';
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

const reducer = combineReducers(reducers);
const logger = createLogger();

export default function configureStore( preState ) {
    return createStore(
        reducer,
        preState,
        applyMiddleware(
            middleware,
            thunk,
            logger
        )
    )
}
