import { useDispatch } from 'react-redux'
import React, { useState } from 'react'
import { loginUser } from '../../../_actions/user_action'

function LoginPage(props) {
    //functional redux 로 작성.

    //action
    const dispatch = useDispatch()

    //redux state 선언
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    //이벤트 처리
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSummitHandler = (event) => {
        //변경이 없을땐 리프레쉬가 안되게끔 함.
        event.preventDefault();
        //console.log(`email:${Email} pwd:${Password}`)

        let body = {
            email: Email,
            password: Password
        }

        //action
        dispatch(loginUser(body))
        .then(response => {
            //login 성공시 루트 페이지로 이동.
            if (response.payload.loginSuccess) {
                props.history.push('/')
            } else {
                alert('error')
            }
        })
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}>
            <form style={{ display: 'flex', flexDirection: 'column'}}
                onSubmit={onSummitHandler}
            >
                <label>EMAIL</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>PASSWORD</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button type="submit">LOGIN</button>
            </form>
        </div>
    )
}

export default LoginPage
