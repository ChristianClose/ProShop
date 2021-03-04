import { dispatchError } from './utils/userActions.utils';
import * as actions from "../../constants/userConstants";
import { ORDER_LIST_MY_RESET } from '../../constants/orderConstants';
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: actions.USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users/login', { email, password }, config)

        dispatch({
            type: actions.USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatchError(error, actions.USER_LOGIN_FAIL, dispatch);
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: actions.USER_LOGIN_OUT });
    dispatch({ type: actions.USER_DETAILS_RESET });
    dispatch({ type: ORDER_LIST_MY_RESET });
    dispatch({ type: actions.USER_LIST_RESET })
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: actions.USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users', { name, email, password }, config)

        dispatch({
            type: actions.USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: actions.USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatchError(error, actions.USER_REGISTER_FAIL, dispatch);
    }
}