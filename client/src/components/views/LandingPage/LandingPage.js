import React,{useEffect} from 'react'
import axios from 'axios'

function LandingPage() {
    useEffect(() => {
        //port가 다르면 CORS 정책에 의해 차단 된다.
        //Proxy를 사용해 해결 가능.
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    }, [])

    return (
        <div>
            LandingPage
        </div>
    )
}

export default LandingPage
