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