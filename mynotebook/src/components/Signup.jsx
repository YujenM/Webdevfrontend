import React ,{useState} from 'react'
import './Css/loginsignup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Signup(props) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [signup,setsignup]=useState({name:'',email:'',password:'',dob:''})
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
            const trimmedDob = signup.dob.trim();

            const response = await fetch("http://localhost:2000/api/auth/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: trimmedName, email: trimmedEmail, password: trimmedPassword, dob: trimmedDob }),
            });

            const json = await response.json();

            if (response.ok) {
                // console.log(json);
                localStorage.setItem('authtoken', json.authtoken); 
                setsignup({ name: '', email: '', password: '', dob: '' });
                props.showalert("Account Created","success")
            } else {
                
                if (json.error) {
                    props.showalert(json.error,"warning")
                }
            }
        } catch (error) {
            alert("An unexpected error occurred. Please try again."); // Default error message for unexpected issues
        }
    };
    return (
        <div className="formcenter">
        <div className='backgroundsignup flex flex-col justify-center items-center text-black'>
            <h1 className='title text-center text-10xl mt-5 '>Signup <FontAwesomeIcon icon={icon.faBook}/></h1>
            <form className="w-full p-4" onSubmit={handleSubmit}>
            <div className="mb-4">
                    <label className="block text-black mb-1">Full Name:</label>
                    <input name='name' value={signup.name} onChange={onChange} type='text'  className="w-full px-4 py-2 border rounded-lg focus:outline-none"  placeholder="Enter your Fullname" minLength={4}  required/>
                </div>
                <div className="mb-4">
                    <label className="block text-black mb-1" htmlFor="email">Email:</label>
                    <input name='email' type="email" value={signup.email} onChange={onChange} placeholder="Enter Your Email" className="w-full px-4 py-2 border rounded-lg focus:outline-none"  required/>
                </div>
                <div className="mb-4 relative">
                    <label className="block text-black mb-1">Password:</label>
                    <input
                    name='password'
                    type={passwordVisible ? 'text' : 'password'}
                    onChange={onChange}
                    value={signup.password}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    placeholder="Enter your password"
                    minLength={5}
                    required
                    />
                    <span 
                    className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer" onClick={togglePasswordVisibility}>
                    <FontAwesomeIcon className='mt-5' icon={passwordVisible ? icon.faEyeSlash : icon.faEye} />
                    </span>
                </div>
                <div className="mb-4">
                    <label className="block text-black mb-1">Date of Birth:</label>
                    <input 
                    name='dob'
                    onChange={onChange}
                    value={signup.dob}
                    type='date' 
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none" 
                    placeholder="Enter your email" 
                    />
                </div>
                <div className='flex justify-center'>
                    <button type='submit'  className=" buttonsubmit text-white font-bold py-2 rounded-lg">
                        Submit
                    </button>
                </div>
                </form>
                <div className="gologin">
                    <h1>Already Have an account? <Link to='/Userlogin' className='gotosignuporlogin text-2xl ml-2'>Login</Link></h1>
                </div>
            </div>
        </div>
    )
}
