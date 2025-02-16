import React, { useState } from 'react';
import { navbarinfo } from './Navbarinfo';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Navbar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate=useNavigate();
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const handlelogout=()=>{
        localStorage.removeItem('token');
        props.showalert('Logout Succesfully','success')
        navigate('/userlogin')
        


    }

    return (
        <nav className="navbar">
        <div className="navbar-container">
            <div className="navbar-logo">
            <Link to="/" className='logo'>NoteBook</Link>
            </div>
            <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
            <ul className="navbar-list">
                {navbarinfo.map((item, index) => (
                <li key={index} className="navbar-link">
                    <Link to={item.path}>{item.title}</Link>
                </li>
                ))}
            </ul>
            {!localStorage.getItem('token')?<div className="auth-buttons">
                <Link type='button' to='/Userlogin' className="login-btn">Login</Link>
                <Link type='button' to='/signup' className="signup-btn">Signup</Link>
            </div>:
            <div className='auth-buttons'>
                <button onClick={handlelogout} className='login-btn'>Logout</button>
            </div>}
            </div>
            <button className="navbar-toggle" onClick={toggleMenu}>
            {isOpen ? 'Close' : 'Menu'}
            </button>
        </div>
        </nav>
    );
};

export default Navbar;
