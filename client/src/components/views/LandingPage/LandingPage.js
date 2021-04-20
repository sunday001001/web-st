import React, { useEffect } from 'react'
import axios from 'axios'
//props.history.push 가 계속 오류가 나서 추가 함.
import { withRouter } from 'react-router-dom'

function LandingPage(props) {

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response))
    }, [])

    const onClickHandler = () => {
        axios.get('/api/users/logout')
        .then(response => {

            if (response.data.success) {
                props.history.push('/login')
            } else {
                alert('error')
            }

        })
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}>
            <h2>시작하기</h2>
            <button onClick={onClickHandler}>
                Logout
            </button>
        </div>
    )
}

export default withRouter(LandingPage)
