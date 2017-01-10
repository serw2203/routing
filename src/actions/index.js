'use strict';
import {getIssues} from './../api';

export function loadIssues() {
    return {
        type: 'REMOTE_ISSUES',
        actions: ['LOADING', 'FAILURE'],
        promise: getIssues(),};
}
