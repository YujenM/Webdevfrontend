import React, { useState } from 'react';
import './Css/loginsignup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Signup(props) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [signup, setsignup] = useState({ name: '', email: '', password: '' });

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const onChange = (e) => {
        setsignup({
            ...signup,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const trimmedEmail = signup.email.trim();
            const trimmedPassword = signup.password.trim();
            const trimmedName = signup.name.trim();
    
            const response = await fetch("http://127.0.0.1:8000/api/user", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    "user_name": trimmedName, 
                    "user_email": trimmedEmail, 
                    "user_password": trimmedPassword, 
                }),
            });
    
            if (!response.ok) {
                throw new Error("Failed to create account.");
            }
    
            const json = await response.json();
    
            if (json.status === "success" && json.data) {
                localStorage.setItem('user_id', json.data.user_id); 
                localStorage.setItem('user_name', json.data.user_name); 
                
                setsignup({ name: '', email: '', password: '', dob: '' });
                props.showalert("Account Created Successfully", "success");
            } else {
                props.showalert(json.message || "Signup failed", "warning");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            props.showalert("An unexpected error occurred. Please try again.", "danger");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                    Signup <FontAwesomeIcon icon={icon.faBook} />
                </h1>
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            name="name"
                            value={signup.name}
                            onChange={onChange}
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Full Name"
                            minLength={4}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            name="email"
                            type="email"
                            value={signup.email}
                            onChange={onChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Email Address"
                            required
                        />
                    </div>
                    <div className="mb-4 relative">
                        <input
                            name="password"
                            type={passwordVisible ? 'text' : 'password'}
                            onChange={onChange}
                            value={signup.password}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Password"
                            minLength={5}
                            required
                        />
                        <span
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            <FontAwesomeIcon icon={passwordVisible ? icon.faEyeSlash : icon.faEye} />
                        </span>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-white font-bold rounded-lg bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400"
                    >
                        Submit
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm">
                        Already have an account?{' '}
                        <Link to="/Userlogin" className="text-purple-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
