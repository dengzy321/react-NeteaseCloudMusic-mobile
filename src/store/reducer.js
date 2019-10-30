import * as actionTypes from './actionTypes';

const initialState = {
    count: 0,
    newsList: []
};

export default function music(state = initialState, action) {
    const { count } = state;
    const { type, payload } = action;
    switch (type) {
        case actionTypes.ADD_COUNT: 
            return Object.assign({}, state, { count: count + 1 })
        case actionTypes.REDUCE_COUNT: 
            return Object.assign({}, state, { count: count - 1 })
        default:
            return state;
    }
}