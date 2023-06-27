import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import Scheduler from '../../parts/Scheduler';
import Header from '../../parts/Header';

function SchedulerPage({ currentUser }) {
  const [showVergangeneTodos, setShowVergangeneTodos] = useState(false);
  const [todos, setTodos] = useState([]);

  return (
    <><Header/> 
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Scheduler username={currentUser}/>
    </Box>
    </>
  );
}

export default SchedulerPage;
