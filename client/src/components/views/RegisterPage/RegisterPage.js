import { useDispatch } from 'react-redux'
import React, { useState } from 'react'
import { registerUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'

function RegisterPage(props) {
    //functional redux 로 작성.

    //action
    const dispatch = useDispatch()

    //redux state 선언
    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    //이벤트 처리
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }
    
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onCofirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSummitHandler = (event) => {
        //변경이 없을땐 리프레쉬가 안되게끔 함.
        event.preventDefault();
        //console.log(`email:${Email} pwd:${Password}`)

        if (Password !== ConfirmPassword) {
            return alert('비밀번호를 정확하게 다시 입력해 주세요.')
        }

        let body = {
            email: Email,
            name: Name,
            password: Password
        }

        //redux action
        dispatch(registerUser(body))
        .then(response => {
            //sign up 성공시 루트 페이지로 이동.
            if (response.payload.success) {
                props.history.push('/login')
            } else {
                alert('failed to sign up')
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
                <label>NAME</label>
                <input type="text" value={Name} onChange={onNameHandler} />
                <label>PASSWORD</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <label>CONFIRM PASSWORD</label>
                <input type="password" value={ConfirmPassword} onChange={onCofirmPasswordHandler} />
                <br />
                <button type="submit">JOIN</button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
