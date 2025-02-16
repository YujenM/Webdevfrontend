import React, { useContext, useEffect, useState } from 'react';
import Notecontext from '../context/notes/Notecontext';
import './Css/Setting.css';


function Setting(props) {
  
  const [userData, setUserData] = useState(null);
  const { getuserdata } = useContext(Notecontext);

  useEffect(() => {
    const fetchdata = async () => {
      const data = await getuserdata();
      setUserData(data);
    };
    fetchdata();
    // eslint-disable-next-line 
  }, []); // Empty dependency array ensures this runs only once on mount

  const [password, setpassword] = useState({
    oldpassword: '',
    newpassword: '',
    confirmnewpassword: '',
  });

  const handleChange = (e) => {
    setpassword({ ...password, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!password.oldpassword || !password.newpassword || !password.confirmnewpassword) {
      props.showalert('Fill all the form', 'error');
      return;
    }

    if (password.newpassword !== password.confirmnewpassword) {
      props.showalert('Password mismatch', 'error');
      return;
    }

    try {
      const response = await fetch('http://localhost:2000/api/auth/updatepassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({
          oldPassword: password.oldpassword,
          newPassword: password.newpassword,
        }),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.errors?.[0]?.msg || 'Something went wrong');
      }
      props.showalert('Password Changed Successfully', 'success');
      setpassword({ oldpassword: '', newpassword: '', confirmnewpassword: '' });
    } catch (err) {
      props.showalert(err.message, 'error');
    }
  };

  // Function to convert ISO date to a readable format
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div>
      <div className="flex justify-center mt-5">
        {userData ? (
          <h1 className="text-3xl text-center greetings">Welcome, {userData.name}</h1>
        ) : (
          <h1 className="text-3xl text-center greetings">Loading Data...</h1>
        )}
      </div>
      <div className="userinfo container mx-auto text-4xl">
        {userData ? (
          <div>
            <h1 className='mb-4 '>User Info</h1>
            <p className='userpersonalinfo'>Name: {userData.name}</p>
            <p className='userpersonalinfo' >Email: {userData.email}</p>
            <p className='userpersonalinfo'>DOB: {formatDate(userData.date)}</p>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      <div className="container ">
        <h1 className='text-4xl mb-5'>Change Password</h1>
        <form onSubmit={handlesubmit}>
          <label>Old Password :</label><br/>
          <input className='passwordchange' type="password" name="oldpassword" value={password.oldpassword} onChange={handleChange}/><br/>
          <label>New Password :</label><br/>
          <input className='passwordchange' type="password" name="newpassword" value={password.newpassword} onChange={handleChange}/><br/>
          <label>Confirm New Password :</label><br/>
          <input className='passwordchange' type="password" name="confirmnewpassword" value={password.confirmnewpassword} onChange={handleChange}/> <br/>
          <button type="submit" className="buttonsubmit text-white font-bold py-2 rounded-lg mt-5">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default Setting;
