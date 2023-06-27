import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import AktuellePrios from '../../parts/AktuellePrios';
import Monatsziele from '../../parts/Monatsziele';
import Header from '../../parts/Header';

function AktuellePriosPage({ currentUser }) {
  const [showVergangeneTodos, setShowVergangeneTodos] = useState(false);
  return (<>
    <Header/>
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Button 
        variant="outlined" 
        onClick={() => setShowVergangeneTodos(!showVergangeneTodos)}
        style={{ alignSelf: 'flex-start', margin: '1em' }}
      >
        {showVergangeneTodos ? 'Back to Aktuelle' : 'Monatsziele'}
      </Button>
      {showVergangeneTodos ? 
        <AktuellePrios username={currentUser}/> : 
        <Monatsziele username={currentUser} />
      }
    </Box>
    </>
  );
}

export default AktuellePriosPage;
