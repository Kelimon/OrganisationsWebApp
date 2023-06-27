import React, { useState } from 'react';
import ToDoList from "../../parts/ToDoList";
import VergangeneToDos from '../../parts/VergangeneToDos';
import { Button, Box } from '@mui/material';
import Header from '../../parts/Header';

function ToDoListPage({ currentUser, todos, setTodos }) {
  const [showVergangeneTodos, setShowVergangeneTodos] = useState(false);
  return (
    <><Header/>
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Button 
        variant="outlined" 
        onClick={() => setShowVergangeneTodos(!showVergangeneTodos)}
        style={{ alignSelf: 'flex-start', margin: '1em' }}
      >
        {showVergangeneTodos ? 'Back to ToDoList' : 'Vergangene ToDos'}
      </Button>
      {showVergangeneTodos ? 
        <VergangeneToDos username={currentUser}/> : 
        <ToDoList username={currentUser} todos={todos} setTodos={setTodos} />
      }
    </Box>
    </>
  );
}

export default ToDoListPage;
