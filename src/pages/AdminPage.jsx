import React, {useEffect} from 'react';
import axios from 'axios';
import { useState } from "react";
import VergangeneToDos from './../parts/VergangeneToDos';
import Monatsziele from '../parts/Monatsziele';
import MorgenRoutine from "../parts/MorgenRoutine"
import { TextField, Button } from '@mui/material';
import Header from '../parts/Header';
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
const wrapperStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between' // optional: add space between the components
  };

function AdminPage({ currentUser, setCurrentUser, isAdmin}) {
    const [usernames, setUsernames] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    const getUsernames = async () => {
      const response = await axios.get('https://eu-west-1.aws.data.mongodb-api.com/app/application-3-qcyry/endpoint/getusers');
      setUsernames(response.data.usernames);
    }
    getUsernames();
  }, []);

  return (<>
    
    <div style={wrapperStyle}>
    <Header username={currentUser} isAdmin={isAdmin}/>
    {usernames.map((username, index) => (
        <Button key={index} variant="contained" color="secondary" onClick={() => {setCurrentUser(username)
        navigate("/home")}}  >
          {username}
        </Button>
      ))}
    </div>
    </>
  );
}

export default AdminPage;
