import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Css/loginsignup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Login(props) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [login, setLogin] = useState({ email: '', password: '' });
    const navigate = useNavigate(); 

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const trimmedEmail = login.email.trim();
        const trimmedPassword = login.password.trim();

        try {
            const response = await fetch("http://localhost:2000/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
            });

            const json = await response.json();
            if (json.success) {
                localStorage.setItem('token', json.authtoken);
                navigate("/");
                props.showalert("Login successful!", "success"); 
            } else {
                props.showalert('Invalid credentials', "error");
            }
        } catch (error) {
            props.showalert(error, "error"); 
        }
    };

    const onChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="formcenter">
            <div className='background flex flex-col justify-center items-center text-black'>
                <h1 className='title text-center text-10xl'>Login <FontAwesomeIcon icon={icon.faBook}/></h1>
                <form onSubmit={handleSubmit} className="w-full p-4">
                    <div className="mb-4">
                        <label className="block text-black mb-1" htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={login.email}
                            onChange={onChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-black mb-1" htmlFor="password">Password:</label>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            name="password"
                            value={login.password}
                            onChange={onChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                            placeholder="Enter your password"
                        />
                        <span
                            className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer mt-5"
                            onClick={togglePasswordVisibility}
                        >
                            <FontAwesomeIcon icon={passwordVisible ? icon.faEyeSlash : icon.faEye} />
                        </span>
                    </div>
                    <div className='flex justify-center'>
                        <button type='submit' className="buttonsubmit text-white font-bold py-2 rounded-lg">
                            Login
                        </button>
                    </div>
                </form>
                <div className="gologin">
                    <h1>Don't have an account? <Link to='/signup' className='gotosignuporlogin text-2xl ml-2'>Sign up</Link></h1>
                </div>
            </div>
        </div>
    );
}

export default Login;
