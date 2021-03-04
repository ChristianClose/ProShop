import { dispatchError } from './utils/userActions.utils';
import * as actions from "../../constants/userConstants";
import axios from 'axios';

export const requestUserDetails = (id) => async (dispatch, getState) => {
    try {
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        dispatch({ type: actions.USER_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/users/${id}`, config)

        dispatch({ type: actions.USER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatchError(error, actions.USER_DETAILS_FAIL, dispatch);
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: actions.USER_UPDATE_PROFILE_REQUEST })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/users/profile`, user, config)

        dispatch({ type: actions.USER_UPDATE_PROFILE_SUCCESS, payload: data })
        dispatch({ type: actions.USER_LOGIN_SUCCESS, payload: data })
        dispatch(requestUserDetails('profile'))

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        dispatchError(error, actions.USER_UPDATE_PROFILE_FAIL, dispatch);
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({ type: actions.USER_LIST_REQUEST })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/users`, config)

        dispatch({ type: actions.USER_LIST_SUCCESS, payload: data })

    } catch (error) {
        dispatchError(error, actions.USER_LIST_FAIL, dispatch);
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: actions.USER_DELETE_REQUEST })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/users/${id}`, config)

        dispatch({ type: actions.USER_DELETE_SUCCESS })

    } catch (error) {
        dispatchError(error, actions.USER_DELETE_FAIL, dispatch);
    }
}

export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: actions.USER_UPDATE_REQUEST })

        const { userLogin: { userInfo } } = getState()
        const config = {
            'Content-Type': 'application/json',
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/users/${user._id}`, user, config)

        dispatch({ type: actions.USER_UPDATE_SUCCESS })

        dispatch({ type: actions.USER_DETAILS_SUCCESS, payload: data })

    } catch (error) {
        dispatchError(error, actions.USER_UPDATE_FAIL, dispatch);
    }
}


