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
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
                <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                    Login 
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="email"
                            name="email"
                            value={login.email}
                            onChange={onChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Email Address"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            name="password"
                            value={login.password}
                            onChange={onChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Password"
                        />
                        <span
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            <FontAwesomeIcon icon={passwordVisible ? icon.faEyeSlash : icon.faEye} />
                        </span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" /> Remember me
                        </label>
                        <Link to="/forgot-password" className="text-sm text-purple-500 hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-white font-bold rounded-lg bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm">
                        Not a member? <Link to='/signup' className="text-purple-500 hover:underline">Sign up now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
