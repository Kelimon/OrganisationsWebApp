import React, { useState, useEffect } from "react";
import GetTodos from "./../../requests/GetTodos";
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
import "./../../testing/animation.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./../../contexts/Auth";

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

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  marginTop: 34,
  borderRadius: 15, // Setzt die Rundung der Ecken
  backgroundColor: "#333e", // Dunklere Farbe für den Block
  overflow: "auto", // Ermöglicht Scrollen, wenn der Inhalt zu groß ist
}));

function VergangeneTodosMobile({}) {
  const [showPastTodos, setShowPastTodos] = useState(false);
  const { currentUser, isAdmin } = useAuth();
  const [todos, setTodos] = useState([]);
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
      const response = (await GetTodos({ currentUser })).data.days.slice(0, -3);
      setTodos(response);
    };

    fetchTodos();
  }, [currentUser]); // The empty array makes this useEffect act like componentDidMount - it runs once after the component mounts.

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const pageTransition = {
    in: {
      opacity: 10,
      x: 0,
    },
    out: {
      opacity: 100,
      x: "-1.5vw",
    },
  };
  console.log("todos vergangenetodosmobile", todos);
  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <>
          <motion.div
            initial="out"
            animate="in"
            exit="out"
            variants={pageTransition}
          >
            <Button
              variant="outlined"
              onClick={() => setShowVergangeneTodos(!showVergangeneTodos)}
              style={{
                position: "absolute",
                left: "5%",
              }}
              sx={{
                border: "none",
                "&:focus": {
                  outline: "none",
                },
              }}
            >
              ToDos
            </Button>

            <StyledPaper>
              <div>
                <Button
                  onClick={() => setShowPastTodos(!showPastTodos)}
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{
                    backgroundColor:
                      "linear-gradient(to bottom right, #680e78,  #b608d4)",
                    borderRadius: 4,
                  }}
                >
                  {showPastTodos ? "Schließen" : "Zeige vergangene ToDos"}
                </Button>
                <CSSTransition
                  in={showPastTodos}
                  timeout={10000}
                  classNames="accordion"
                  unmountOnExit
                  appear
                >
                  <div>
                    {showPastTodos &&
                      [...todos].reverse().map((day, index) => (
                        <StyledAccordion key={index}>
                          <StyledAccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                          >
                            <Typography variant="h6">
                              {formatDate(day.date)}
                            </Typography>
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
                                        <TableCell
                                          sx={{
                                            color: "#ed2f2f",
                                            marginTop: -5,
                                          }}
                                        >
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
                </CSSTransition>
              </div>
            </StyledPaper>
          </motion.div>
        </>
      </AnimatePresence>
    </>
  );
}

export default VergangeneTodosMobile;
