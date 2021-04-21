import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_actions/types";

//reducer ( previous state, action ) => next state
export default function (state={}, action) {
    switch (action.type) {
        case LOGIN_USER:
            //서버응답 loginSuccess 를 action.payload 로 받기
            return { ...state, loginSuccess: action.payload }
            break;

        case REGISTER_USER:
            //서버응답 register 를 action.payload 로 받기
            return { ...state, register: action.payload }
            break;

        case AUTH_USER:
            //서버응답 register 를 action.payload 로 받기
            return { ...state, userDate: action.payload }
            break;
    
        default:
            return state
            break;
    }
}