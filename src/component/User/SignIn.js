import { Link, useNavigate } from "react-router-dom"
import './signup-in.css'
import { useState } from "react"
import swal from "sweetalert"
import M from 'materialize-css'

const SignIn = () => {

    const history = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [error, setError] = useState('')
    // const [flag, setFlag] = useState(false)

    const userData = () => {
        fetch("http://localhost:5000/signin", {
            method: 'post',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.error){
                console.log(data.error)
                // setError(data.error)
                // setFlag(true)
                M.toast({html: data.error})
            }else{
                swal({
                    title: 'Welcome to Spotify',
                    icon: "success"
                })
                localStorage.setItem('jwt', data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
                history('/home')
            }
        })
        .catch(err => console.log(err))
    }

    return <div className="form-container-main">
    <div className="form">
        <div className='font-s-l font-c-l logo-m-b'>Spotify</div>
        <p className='font-s-sm b-m-signin para-m-b-sign font-opct'>Enter your credentials to access your account</p>
        {/* <div className="showMessage">{!flag ? "" : error}</div> */}
        <div className="input-filed">
            <input 
                className="b-m-signin"
                type="text"
                placeholder="Mail ID"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
        </div>
        <div className="input-filed">
            <input 
                className="b-m-signin"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
        </div>
        <div className="signUp-btn">
            <button
                onClick={() => userData()}
            >Sign In</button>
        </div>
    </div>
    <p className='font-s-sm m-top'>Don't have an account? <Link to='/signup' className='font-s-n link-font-w'>Sign Up</Link></p>
</div>
}

export default SignIn