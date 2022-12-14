import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './loginRegister.css';

function Register(props) {
    // used useNavigate for goto the next page
    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const login = () => {
        // if user come 1st time , then store user email and password
        if (localStorage.getItem('users') === null) {
            let userArr = []
            let userDetail = {
                email: email,
                password: pass
            }
            userArr.push(userDetail)
            localStorage.setItem('users', JSON.stringify(userArr))
            navigate('/?fromRegister=true')
        }
        else {
            let oldUserArr = JSON.parse(localStorage.getItem('users'))
            oldUserArr.forEach(Element => {
                // if user has already register then show alert message
                if (Element.email === email) {
                    alert("Your account has already been registered. Please login.")
                    return
                }
                // if user has not register, then store user email password in oldUserArr
                else {
                    let userDetail = {
                        email: email,
                        password: pass
                    }
                    oldUserArr.push(userDetail)
                    localStorage.setItem('users', JSON.stringify(oldUserArr))
                    navigate('/?fromRegister=true')
                }
            })
        }
    }

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    return (

        <div className="form-container">
            <div className="contain">
                <h2>Register</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <label htmlFor="name">Full name</label>
                    <input value={name} name="name" id="name" placeholder="Enter your Name" onChange={handleNameChange} required autoComplete="off" />
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your Email" id="email" name="email" required autoComplete="off" />
                    <label htmlFor="password">Password</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Enter your password" id="password" name="password" required autoComplete="off" />
                    <button type="submit" className='submit' onClick={login}>Sign Up</button>
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

                <button className="link-btn"> Already have an account?
                    <Link to="../"> Login here.</Link>
                </button>
            </div>
        </div>
    );
}

export default Register;