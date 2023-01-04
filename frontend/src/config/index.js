import axios from 'axios';
export const api=axios.create({
    baseURL:process.env.REACT_APP_API_URL,
    // withCredentials:true,
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
    },
});

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
    SUCESS:'sucess'
});