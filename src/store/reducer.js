import * as actionTypes from './actionTypes';

const initialState = {
    userInfo: {}, //用户信息
    searchHistory: [], // 搜索历史记录
    curPlaySong: {}, //单前播放的歌曲
    curSongUrl: '', //当前播放歌曲的url地址
    isPlayMusic: false, //是否播放音乐
    surplusDuration: 0, //当前播放时间
    songSheetSort: [
        { title: '官方' },
        { title: '流行' },
        { title: '华语', hot: true },
        { title: '电子', hot: true },
        { title: '轻音乐', hot: true },
        { title: '摇滚', hot: true },
        { title: '民谣', hot: true },
        { title: '古典', hot: true },
        { title: '钢琴', hot: true },
        { title: '吉他', hot: true }
    ],
    latestPlay: [], //最新播放
};

export default function music(state = initialState, action) {
    let { searchHistory, songSheetSort, latestPlay } = state;
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
        case actionTypes.CHANGE_SONGSHEETSORT:
            return Object.assign({}, state, {
                songSheetSort: [...payload]
            })
        case actionTypes.ADD_LATESTPLAY:
            let isHas = false
            latestPlay.forEach(item => {
                if (item.id == payload.id) isHas = true
            })
            if (!isHas) {
                return Object.assign({}, state, {
                    latestPlay: [...latestPlay, payload]
                })
            } else return state
        default:
            return state;
    }
}

