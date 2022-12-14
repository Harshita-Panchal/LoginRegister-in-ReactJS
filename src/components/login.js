import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './loginRegister.css';
import { useLocation } from 'react-router-dom';

function Login(props) {

    // use (useNavigate) for land on new page
    let navigate = useNavigate();
    //  used useLocation for show alert message
    let location = useLocation();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const login = () => {
        // compare user data if user come first time
        if (localStorage.getItem('users') === null) {
            alert('Your account has not been registered. Please register first.')
            setEmail("")
            setPass("")
        } else {
            let oldUserArr = JSON.parse(localStorage.getItem('users'))
            oldUserArr.forEach(element => {
                // compare email and password  for login
                if (element.email === email && element.password === pass) {
                    localStorage.setItem("isLoggedIn", true)
                    props.stateChange(true)
                    navigate('/details')
                }
                 // if password is incorrect show alert message
                else if (element.email === email && element.password !== pass) {
                    alert('Your password is wrong')
                }
                // if email is incorrect show alert message
                else {
                    alert('Your email is incorrect or your account has not been registered')
                }
            });
        }
    }

    // used useLocation for showing alert message
    useEffect(() => {
        if (location.search === '?fromRegister=true') {
            setTimeout(() => {
                alert("Your account has been registered. Please login.")
            }, 500)
        }

    }, [location]);

    return (
        <div className="form-container">
            <div className="contain">
                <h2>Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" id="email" name="email" required autoComplete="off" />
                    <label htmlFor="password">Password</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Enter your password" id="password" name="password" required autoComplete="off" />
                    <button type="submit" className='submit' onClick={login}>Sign In</button>
                </form>
                {localStorage.getItem('Email') && (
                    <div>
                        Email: <p>{localStorage.getItem('Email')}</p>
                    </div>
                )}
                {localStorage.getItem('Password') && (
                    <div>
                        Password: <p>{localStorage.getItem('Password')}</p>
                    </div>
                )}
                <button className="link-btn">Don't have an account?
                    <Link to="../register"> Register here.</Link>
                </button>
            </div>
        </div>
    )
}

export default Login;