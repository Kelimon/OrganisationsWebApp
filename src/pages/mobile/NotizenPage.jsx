import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import Notizen from '../../parts/Notizen';
import Header from '../../parts/Header';

function NotizenPage({ currentUser }) {
  return (
    <><Header/> 
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Notizen username={currentUser}/>
    </Box>
    </>
  );
}

export default NotizenPage;
