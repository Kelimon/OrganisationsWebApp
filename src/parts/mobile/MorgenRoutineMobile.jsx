import React, { useState, useEffect, useRef } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  TextField,
  Button,
  Paper,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import saveTodos from "./../../requests/saveTodos";
import GetTodos from "./../../requests/GetTodos";
import RegisterRequest from "../../requests/RegisterRequest";
import saveRoutine from "../../requests/saveRoutine";
import GetRoutine from "../../requests/GetRoutine";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./../../contexts/Auth";

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  marginTop: 34,
  borderRadius: 15,
  backgroundColor: "#333e",
  height: "calc(100vh - 275px)",
  overflow: "auto", // Ermöglicht Scrollen, wenn der Inhalt zu groß ist
}));

const WhiteTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white", // Setze die Outline-Farbe auf Weiß
    },
    "&:hover fieldset": {
      borderColor: "white", // Setze die Hover-Outline-Farbe auf Weiß
    },
    "&.Mui-focused fieldset": {
      borderColor: "white", // Setze die Fokussierte-Outline-Farbe auf Weiß
    },
  },
  "& .MuiInputLabel-root": {
    color: "white", // Setze die Label-Farbe auf Weiß
  },
  "& .MuiInputBase-input": {
    color: "white", // Setze die Textfarbe des TextFields auf Weiß
  },
}));

function MorgenRoutineMobile({ toLeft }) {
  const [newTodo, setNewTodo] = useState("");
  const [hoverIndex, setHoverIndex] = useState(null);
  const { currentUser, isAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const isFirstRender = useRef(true);
  const initialData = useRef(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      const response = await GetRoutine({ currentUser });
      setTodos(response.data.days);
      initialData.current = response.data.days;
      setIsLoading(false);
    };

    fetchTodos();
  }, [currentUser]);
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

  const addTodo = () => {
    if (newTodo.trim().length > 0) {
      setTodos([...todos, { text: newTodo, checked: false }]);
      setNewTodo("");
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isLoading) {
      return; // Skip saving when the component is in a loading state
    }
    if (JSON.stringify(todos) !== JSON.stringify(initialData.current)) {
      saveRoutine({ currentUser, todos });
    }
  }, [todos, isLoading]);

  const toggleCheck = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((todo, i) => i !== index));
  };

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
            <StyledPaper>
              <Typography color={"white"} variant="h6" align="center">
                Morgenroutine
              </Typography>
              <Box display="flex" flexDirection="column" height="90%">
                <Box flexGrow="1" overflow="auto">
                  <List>
                    {Array.isArray(todos) &&
                      todos.map((todo, index) => (
                        <ListItem
                          key={index}
                          onMouseEnter={() => setHoverIndex(index)}
                          onMouseLeave={() => setHoverIndex(null)}
                        >
                          <Checkbox
                            checked={todo.checked}
                            onChange={() => toggleCheck(index)}
                            style={{ color: "white" }}
                          />
                          <ListItemText
                            primaryTypographyProps={{
                              style: { color: "white" },
                            }}
                            primary={todo.text}
                            color={"white"}
                          />
                          {hoverIndex === index && (
                            <IconButton
                              onClick={() => deleteTodo(index)}
                              color="error"
                            >
                              <DeleteIcon color="red" />
                            </IconButton>
                          )}
                        </ListItem>
                      ))}
                  </List>
                </Box>
                <Box mt={3} display="flex">
                  <WhiteTextField
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    label="New Routine Task"
                    fullWidth
                    style={{ marginRight: 5 }} // add some margin to separate the TextField and Button
                  />
                  <Button
                    onClick={addTodo}
                    variant="contained"
                    color="secondary"
                    style={{ height: 45, flexShrink: 0, marginTop: 5 }} // add flexShrink: 0 to prevent the button from shrinking
                  >
                    Add
                  </Button>
                </Box>
              </Box>
            </StyledPaper>
          </motion.div>
        </>
      </AnimatePresence>
    </>
  );
}

export default MorgenRoutineMobile;
