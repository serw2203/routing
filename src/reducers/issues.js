'use strict';
export default function (state = [], action) {
    if (action.type === 'ADD_ISSUES') {
        return action.payload;
    } else {
        return state;
    }
};