import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import Scheduler from '../../parts/Scheduler';
import MorgenRoutine from '../../parts/MorgenRoutine';
import Header from '../../parts/Header';

function MorgenRoutinePage({ currentUser, todos, setTodos }) {

  return (
    <><Header/>
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <MorgenRoutine username={currentUser} todos={todos} setTodos={setTodos}/>
    </Box>
    </>
  );
}

export default MorgenRoutinePage;
