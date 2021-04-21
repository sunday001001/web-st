import axios from 'axios'
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types'

export function loginUser(dataToSubmit) {

    //서버로 summit data를 전송
    const request = axios.post('/api/users/login', dataToSubmit)
    .then(response => response.data )

    //reducer에 넘겨 주기
    return {
        type: LOGIN_USER,
        payload: request
    }

}

export function registerUser(dataToSubmit) {

    //서버로 summit data를 전송
    const request = axios.post('/api/users/register', dataToSubmit)
    .then(response => response.data )

    //reducer에 넘겨 주기
    return {
        type: REGISTER_USER,
        payload: request
    }

}

export function auth() {

    //서버로 summit data를 전송
    const request = axios.get('/api/users/auth')
    .then(response => response.data )

    //reducer에 넘겨 주기
    return {
        type: AUTH_USER,
        payload: request
    }

}