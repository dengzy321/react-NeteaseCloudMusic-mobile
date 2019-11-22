import * as actionTypes from './actionTypes';

const initialState = {
    userInfo: {}, //用户信息
    searchHistory: [], // 搜索历史记录
    curPlaySong: {}, //单前播放的歌曲
};

export default function music(state = initialState, action) {
    const { userInfo, searchHistory } = state;
    const { type, payload } = action;
    switch (type) {
        case actionTypes.USERINFO_SAVE:
            return Object.assign({}, state, { userInfo: payload })
        case actionTypes.ADD_SEARCHHISTORY:
            if(searchHistory.indexOf(payload) == -1){
                return Object.assign({}, state, { searchHistory: [payload, ...searchHistory] })
            }else return state
        case actionTypes.REMOVE_SEARCHHISTORY:
            return Object.assign({}, state, { searchHistory: [] })
        case actionTypes.ADD_PLAYSONG:
            return Object.assign({}, state, { curPlaySong: payload })
        default:
            return state;
    }
}

