import axios from 'axios';
import { API_HOST } from '../../config/constant';
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../types';

export const makeAuthenticated = (response, navigate) => (dispatch) => {
    
    const token = `Bearer ${response.data.token}`;
    localStorage.setItem('token', token);
    localStorage.setItem('expires_at', response.data.expires_in);
    axios.defaults.headers.common['Authorization'] = token;

    const user = response.data.user;
    dispatch({type: SET_AUTHENTICATED, payload: user});

    navigate("/dashboard");

} 


export const logoutUser = (navigate) => (dispatch) => {

    localStorage.removeItem("token");
    localStorage.removeItem('expires_at');
    delete axios.defaults.headers.common["Authorization"];
    dispatch({type: SET_UNAUTHENTICATED});

}

export const getUser = () => (dispatch) => {
    
    const token = localStorage.token;
    if(!token) return false;

    return axios.get(API_HOST+"/me", { headers: {"Authorization" : `${token}`} })
        .then(res => {
            dispatch({type: SET_AUTHENTICATED, payload: res.data.data});
            return true;
        })
        .catch( err => {
            dispatch(logoutUser());
            console.log(err);
            return false;
        });

}


