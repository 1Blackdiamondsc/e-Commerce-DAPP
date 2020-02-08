import { createStore } from 'redux';

const reducer = (state, action) => {
    if( action.type === "CHANGE")
      return action.payload;
    return state;
}

const store = createStore(reducer, {});

export default store;
