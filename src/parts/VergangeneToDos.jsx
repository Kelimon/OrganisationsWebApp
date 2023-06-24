import React, { useState, useEffect } from "react";
import GetTodos from "./../requests/GetTodos";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { styled } from "@mui/system";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {
    List,
    ListItem,
    ListItemText,
    Checkbox,
    TextField,
    Paper,
    IconButton,

    Box,
  } from "@mui/material";

  const StyledAccordion = styled(Accordion)(({ theme }) => ({
    backgroundColor: '#9e9d9e',  //replace with your color
    borderRadius: 5,
  }));
  
  const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
    backgroundColor: '#9e9d9e',  //replace with your color
    borderRadius: 5,
  }));
  
  const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
    backgroundColor: '#9e9d9e',  //replace with your color
    borderRadius: 5,
    color: "white"
  }));

const StyledPaper = styled(Paper)(({ theme }) => ({
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: 15, // Setzt die Rundung der Ecken
    backgroundColor: "#333e", // Dunklere Farbe für den Block
    maxHeight: 500, // Feste Größe für den Block
    height: 550,
    overflow: "auto", // Ermöglicht Scrollen, wenn der Inhalt zu groß ist
    width: '21.25vw' // 1/4 of the viewport width
  }));

function VergangeneToDos({username}) {
  const [todos, setTodos] = useState([]);
  const [showPastTodos, setShowPastTodos] = useState(false);
/*
  useEffect(() => {
  let _isMounted = true;  // Initially, component is mounted

  const fetchTodos = async () => {
    const response = await GetTodos({username});
    const latestDayData = response.data.days[response.data.days.length - 1];
    
    if (_isMounted) {  // Only proceed if the component is still mounted
      setTodos(latestDayData.data);
    }
  };
  console
  fetchTodos();

  return () => {
    _isMounted = false;  // Update the flag when component unmounts
  };
}, []); */

useEffect(() => {
  const fetchTodos = async () => {
    const response = (await GetTodos({username})).data.days.slice(0,-1);
    setTodos(response);
  };

  fetchTodos();
}, [username]); // The empty array makes this useEffect act like componentDidMount - it runs once after the component mounts.

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <StyledPaper>
    <div>
      <Button onClick={() => setShowPastTodos(!showPastTodos)} variant="contained" color="secondary" fullWidth>
        {showPastTodos ? "Schließen" : "Zeige vergangene ToDos"}
      </Button>
      {showPastTodos && todos.map((day, index) => (
        <StyledAccordion key={index}>
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{formatDate(day.date)}</Typography>
          </StyledAccordionSummary>
          <StyledAccordionDetails>
          <Table>
        <TableBody>
          {day.data.map((todo, index) => (
            <TableRow key={index}>
              <TableCell sx={{color: "white"}}>{todo.text}</TableCell>
              {todo.checked ? <TableCell sx={{color: "green"}}>{todo.checked ? "Erledigt" : "Nicht erledigt"}</TableCell> : <TableCell sx={{color: "black"}}>{todo.checked ? "Erledigt" : "Nicht erledigt"}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
          </StyledAccordionDetails>
        </StyledAccordion>
      ))}
    </div>
    </StyledPaper>
  );
}

export default VergangeneToDos;
