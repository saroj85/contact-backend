import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../type';





const AuthState = (props) => {
    const initialState = {
       token: localStorage.getItem("token"),
       isAuthenticated: null,
       loading: true,
       error: null,
       user: null
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);


    // USER_LOADED


    // REGISTER_SUCCESS


    // REGISTER_FAIL


    // AUTH_ERROR


    // LOGIN_SUCESS


    // LOGIN_FAIL


    // LOGOUT


    // CLEAR_ERRORS

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                error: state.error,
                user: state.user
            }}>
            {props.children}
        </AuthContext.Provider>
    ) 
};




export default AuthState;