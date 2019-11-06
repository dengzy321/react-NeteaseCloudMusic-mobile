import * as actionTypes from './actionTypes';

const initialState = {
    userInfo: {}, //用户信息
};

export default function music(state = initialState, action) {
    const { userInfo } = state;
    const { type, payload } = action;
    switch (type) {
        case actionTypes.USERINFO_SAVE: 
            return Object.assign({}, state, { userInfo: payload })
        default:
            return state;
    }
}