'use strict';
import fetch from 'isomorphic-fetch';

export function getIssues() {
    return fetch('https://api.github.com/repos/serw2203/transfer/issues')
        .then(response => response.json());
}

