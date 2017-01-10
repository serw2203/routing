const middleware = store => next => action => {
    if (action.type !== 'REMOTE_ISSUES') {
        return next(action);
    } else {
        const [startA, errorA] = action.actions;
        store.dispatch({ type: startA, });
        action.promise.then (data => store.dispatch({ type: 'ADD_ISSUES', payload: data }),
            error => store.dispatch({ type: errorA, error })
        );

    }
}

export default middleware;