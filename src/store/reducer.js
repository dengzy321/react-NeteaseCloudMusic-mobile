import * as actionTypes from './actionTypes';

const initialState = {
    userInfo: {}, //用户信息
    searchHistory: [], // 搜索历史记录
    curPlaySong: {}, //单前播放的歌曲
    curSongUrl: '', //当前播放歌曲的url地址
    isPlayMusic: false, //是否播放音乐
    surplusDuration: 0, //当前播放时间
};

export default function music(state = initialState, action) {
    const { searchHistory, isPlayMusic } = state;
    const { type, payload } = action;
    switch (type) {
        case actionTypes.USERINFO_SAVE:
            return Object.assign({}, state, { 
                userInfo: payload 
            })
        case actionTypes.ADD_SEARCHHISTORY:
            if (searchHistory.indexOf(payload) == -1) {
                return Object.assign({}, state, { 
                    searchHistory: [payload, ...searchHistory] 
                })
            } else return state
        case actionTypes.REMOVE_SEARCHHISTORY:
            return Object.assign({}, state, { 
                searchHistory: [] 
            })
        case actionTypes.ADD_PLAYSONG:
            return Object.assign({}, state, {
                curPlaySong: payload
            })
        case actionTypes.ADD_MUSICURL:
            return Object.assign({}, state, { 
                curSongUrl: payload
            })
        default:
            return state;
    }
}

