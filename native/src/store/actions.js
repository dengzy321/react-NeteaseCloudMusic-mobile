import * as actionTypes from './actionTypes';

// 增加计数
export const addCount = (data, callback = f => f) => async (dispatch,getState) =>{
    dispatch({
        type: actionTypes.ADD_COUNT,
        payload:data
    })
    callback()
}

// 减少计数
export const reduceCount = (data) => async (dispatch,getState) =>{
    dispatch({
        type: actionTypes.REDUCE_COUNT,
        payload:data
    })
}