'use strict';
export default function (state = 0, action) {
    if (action.type === 'INCREASE_COUNTER') {
        return state + 1;
    }
    else if (action.type === 'RESET_COUNTER') {
        return 0;
    }
    else {
        return state;
    }
};
