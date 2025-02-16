import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Notestate from './context/notes/NoteState';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Setting from './components/Setting';
import Signup from './components/Signup';
import Userlogin from './components/Userlogin';
import Alert from './components/Alert';

function App() {
  const [alert, setAlert] = useState(null);

  const showalert = (message, type) => {
    setAlert({
      msg: message,
      type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000); 
  };

  const DisplayNavbar = () => {
    const location = useLocation();
    const hideNavbarRoutes = ['/userlogin', '/signup'];

    if (hideNavbarRoutes.includes(location.pathname.toLowerCase())) {
      return null; 
    }

    return <Navbar showalert={showalert}/>; 
  };

  return (
    <Notestate>
        <Router>
          <DisplayNavbar />
          {alert && <Alert message={alert.msg} type={alert.type} />}
          <Routes>
            <Route exact path="/" element={<Home showalert={showalert} />} />
            <Route exact path="/about" element={<Setting showalert={showalert}/>} />
            <Route exact path="/userlogin" element={<Userlogin showalert={showalert} />} />
            <Route exact path="/signup" element={<Signup showalert={showalert} />} />
          </Routes>
        </Router>
    </Notestate>
  );
}

export default App;
