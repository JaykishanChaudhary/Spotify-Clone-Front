import { Link, useNavigate } from 'react-router-dom'
import './signup-in.css'
import { useState } from 'react'
import swal from 'sweetalert';
import M from 'materialize-css'


const SignUp = () => {

    const history = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmpassword] = useState('')
    // const [error, setError] = useState();
    // const [flag, setFlag] = useState(false)

    const userData = () =>{
        fetch('http://localhost:5000/signup',{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email,
                password,
                confirmpassword
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                console.log(data.error)
                // setError(data.error)
                // setFlag(true)
                M.toast({html: data.error})
            }else{
                console.log(data.message)
                swal({
                    text: "Sign In with same credentials",
                    title: data.message,
                    icon: "success"
                })
                history('/')
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return <div className="form-container-main">
        <div className="form">
            <div className='font-s-l font-c-l logo-m-b'>Logo</div>
            <p className='font-s-sm  font-opct'>Create New Account</p>
            {/* <div id='showMessage'>All fields are mandatory</div> */}
            {/* <div className='showMessage'>{!flag ? '' : error}</div> */}
            <div className="input-filed">
                <input 
                    type="text"
                    placeholder="Mail ID"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="input-filed">
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div className="input-filed">
                <input 
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmpassword}
                    onChange={e => setConfirmpassword(e.target.value)}
                />
            </div>
            <div className="signUp-btn">
                <button
                    onClick={() => userData()}
                >Sign Up</button>
            </div>
        </div>
        <p className='font-s-sm m-top'>Already have an account? <Link to='/' className='font-s-n link-font-w'>Sign In</Link></p>
    </div>
}

export default SignUp