import React, { useContext, useEffect, useState } from 'react';
import Notecontext from '../context/notes/Notecontext'
import './index.css';
import Notes from './Notes';

function Home(props) {
  const [userData, setUserData] = useState(null);
  const{getuserdata}=useContext(Notecontext);


  useEffect(() => {
    const fetchdata=async()=>{
      const data=await getuserdata();
      setUserData(data);
    }
    fetchdata();
    // eslint-disable-next-line 
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    
    <div className="container mx-auto mt-5">
      {userData?(
        <h1 className="text-3xl text-center">Welcome,{userData.name}</h1>
      ):(
        <h1 className="text-3xl text-center">Loading Data</h1>
      )

      }
      <Notes showalert={props.showalert} />
    </div>
  );
}

export default Home;
