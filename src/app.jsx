'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import paths from './config';
import configureStore from './state';
import Item from './components/Item';

const store = configureStore({});

store.dispatch({type: 'INCREASE_COUNTER',});

store.dispatch({type: 'INCREASE_COUNTER',});

store.dispatch({type: 'RESET_COUNTER',});

store.dispatch({type: 'UNKNOWN',});

store.dispatch({type: 'INCREASE_COUNTER',});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ReactDOM.render(
    <Provider store={store}>
        <Item/>
    </Provider>
    , document.getElementById(paths.APP_CONTAINER_ID));

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

