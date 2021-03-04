export const dispatchError = (error, type, dispatch) => {
    dispatch({
        type: type,
        payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    })
}

export const sendDispatch = (type, payload, dispatch, ...otherParams) => {
    dispatch({
        type,
        payload,
        otherParams
    })

}