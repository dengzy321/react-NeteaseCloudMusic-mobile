import * as actionTypes from './actionTypes';

//保存用户信息
export const saveUserInfo = (data) => async (dispatch, getState) => {
    dispatch({
        type: actionTypes.USERINFO_SAVE,
        payload: data
    });
}