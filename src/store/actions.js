import * as actionTypes from './actionTypes';

//保存用户信息
export const saveUserInfo = (data) => async (dispatch, getState) => {
    dispatch({
        type: actionTypes.USERINFO_SAVE,
        payload: data
    });
}

//增加搜索历史记录
export const addSearchHistory = (data) => async (dispatch, getState) => {
    dispatch({
        type: actionTypes.ADD_SEARCHHISTORY,
        payload: data
    });
}

//删除搜索历史记录
export const removeSearchHistory = (data) => async (dispatch, getState) => {
    dispatch({
        type: actionTypes.REMOVE_SEARCHHISTORY,
        payload: data
    });
}

//添加播放歌曲
export const addPlaySong = (data) => async (dispatch, getState) => {
    dispatch({
        type: actionTypes.ADD_PLAYSONG,
        payload: data
    });
}

//添加播放歌曲URL地址
export const addSongUrl = (data) => async (dispatch, getState) => {
    dispatch({
        type: actionTypes.ADD_MUSICURL,
        payload: data
    });
}