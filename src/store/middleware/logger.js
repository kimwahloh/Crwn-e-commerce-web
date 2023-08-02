
//161 Demystifying Middleware
// 170 Redux-Devtools
//if there is no action types (i.e. receive an action that we may not need to receive), pass it to action
// if there is action types, then shows it up (console)
// getState( ): gives back the value of the state right now; it will only get us the new state if it's
// updated once it's run through all the reducers with the action 
// after that re-call getState( ) to see what's the new state will be
const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type) {
        return next (action);
    }

    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentState: ', store.getState());

    next(action);

    console.log('next state: ', store.getState());
};