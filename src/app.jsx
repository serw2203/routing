'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import {IndexPage} from './components/pages/IndexPage';
import {FirstPage} from './components/pages/FirstPage';
import {SecondPage} from './components/pages/SecondPage';

const paths = require('./../config').paths;

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={IndexPage}>
            <IndexRoute component={FirstPage}/>
            <Route path="first" component={FirstPage}/>
            <Route path="second" component={SecondPage}/>
        </Route>
    </Router>,
    document.getElementById(paths.APP_CONTAINER_ID)
);
