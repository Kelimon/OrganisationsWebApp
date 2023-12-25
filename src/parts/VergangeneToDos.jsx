import React, { useState, useEffect } from "react";
import GetTodos from "./../requests/GetTodos";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { CSSTransition } from "react-transition-group";
import "./../testing/animation.css";
import { useAuth } from "./../contexts/Auth";
import { Paper } from "@mui/material";
import { StyledPaper } from "./../components/StyledPaper";

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: "#333e", //replace with your color
  borderRadius: 0,
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: "#4f4f4f", //replace with your color
  borderRadius: 7,
  margin: "2px",
  color: "white",
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  backgroundColor: "#4f4f4f", //replace with your color
  borderRadius: 12,
  color: "white",
  margin: 7,
}));

function VergangeneToDos({}) {
  const [todos, setTodos] = useState([]);
  const [showPastTodos, setShowPastTodos] = useState(false);
  const { currentUser, isAdmin } = useAuth();
  /*
  useEffect(() => {
  let _isMounted = true;  // Initially, component is mounted

  const fetchTodos = async () => {
    const response = await GetTodos({currentUser});
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
      const response = (await GetTodos({ currentUser })).data.days.slice(0, -3);
      setTodos(response);
    };

    fetchTodos();
  }, [currentUser]); // The empty array makes this useEffect act like componentDidMount - it runs once after the component mounts.

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  console.log("wtf is todos: ", todos);

  return (
    <StyledPaper>
      <div>
        <Button
          onClick={() => setShowPastTodos(!showPastTodos)}
          variant="contained"
          color="secondary"
          fullWidth
          sx={{
            backgroundColor: "#45CDDD",
            borderRadius: 4,
          }}
        >
          {showPastTodos ? "Schließen" : "Zeige vergangene ToDos"}
        </Button>
        {showPastTodos &&
          [...todos].reverse().map((day, index) => (
            <StyledAccordion key={index}>
              <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{formatDate(day.date)}</Typography>
              </StyledAccordionSummary>
              <StyledAccordionDetails>
                <Table>
                  <TableBody>
                    {Array.isArray(day.data) &&
                      day.data.map((todo, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ color: "white" }}>
                            {todo.text}
                          </TableCell>
                          {todo.checked ? (
                            <TableCell sx={{ color: "#17ff2e" }}>
                              <CheckIcon />
                            </TableCell>
                          ) : (
                            <TableCell sx={{ color: "#ed2f2f", marginTop: -5 }}>
                              <CloseIcon />
                            </TableCell>
                          )}
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
