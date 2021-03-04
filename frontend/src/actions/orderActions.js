import * as actions from '../constants/orderConstants';
import { dispatchError } from './userActions/utils/userActions.utils';
import axios from 'axios';

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: actions.ORDER_CREATE_REQUEST })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/orders`, order, config)

        dispatch({ type: actions.ORDER_CREATE_SUCCESS, payload: data })

    } catch (error) {
        dispatchError(error, actions.ORDER_CREATE_FAIL, dispatch);
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: actions.ORDER_DETAILS_REQUEST })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/${id}`, config)

        dispatch({ type: actions.ORDER_DETAILS_SUCCESS, payload: data })

    } catch (error) {
        dispatchError(error, actions.ORDER_DETAILS_FAIL, dispatch);
    }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: actions.ORDER_PAY_REQUEST })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)

        dispatch({ type: actions.ORDER_PAY_SUCCESS, payload: data })

    } catch (error) {
        dispatchError(error, actions.ORDER_PAY_FAIL, dispatch);
    }
}

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: actions.ORDER_LIST_MY_REQUEST })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/myorders`, config)

        dispatch({ type: actions.ORDER_LIST_MY_SUCCESS, payload: data })

    } catch (error) {
        dispatchError(error, actions.ORDER_LIST_MY_FAIL, dispatch);
    }
}

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: actions.ORDER_LIST_REQUEST })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders`, config)

        dispatch({ type: actions.ORDER_LIST_SUCCESS, payload: data })

    } catch (error) {
        dispatchError(error, actions.ORDER_LIST_FAIL, dispatch);
    }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: actions.ORDER_DELIVER_REQUEST })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/orders/${order._id}/deliver`, {}, config)

        dispatch({ type: actions.ORDER_DELIVER_SUCCESS, payload: data })

    } catch (error) {
        dispatchError(error, actions.ORDER_DELIVER_FAIL, dispatch);
    }
}