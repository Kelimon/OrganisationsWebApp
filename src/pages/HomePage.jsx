import React from 'react';
import AktuellePrios from "./../parts/AktuellePrios";
import Notizen from "./../parts/Notizen";
import ToDoList from "./../parts/ToDoList";
import Chart from "./../parts/Chart";
import Verlauf from "./../parts/Verlauf";
import { useState } from "react";
import VergangeneToDos from './../parts/VergangeneToDos';
import Monatsziele from '../parts/Monatsziele';
import MorgenRoutine from "../parts/MorgenRoutine"
import Kalender from '../parts/Kalender';
import { TextField, Button } from '@mui/material';
import Header from '../parts/Header';

function HomePage({ currentUser, setCurrentUser, isAdmin}) {
  console.log("homepage ",isAdmin)
  const [todos, setTodos] = useState([]);
  const [routineList, setRoutineList] = useState([])
  const [inputValue, setInputValue] = useState('');

  console.log("homepage: ", currentUser)

  const wrapperStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between' // optional: add space between the components
  };

  return (<>
    
    <div style={wrapperStyle}>
    <Header username={currentUser} isAdmin={isAdmin}/>
      <ToDoList username={currentUser} todos={todos} setTodos={setTodos} />
      <VergangeneToDos username={currentUser}/>
      <AktuellePrios username={currentUser}/>
      <Monatsziele username={currentUser}/>
      
      <Chart todos={todos} username={currentUser}/>
      
      <Verlauf/>
      <Notizen username={currentUser} />
      <Kalender/>
      <MorgenRoutine username={currentUser} todos={routineList} setTodos={setRoutineList}/>
      
      <Chart todos={todos} username={currentUser}/>
    </div>
    </>
  );
}

export default HomePage;
