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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FontColor from "../../components/FontColor";

const fontColor = FontColor();
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
      borderColor: "black", // Setze die Outline-Farbe auf Weiß
    },
    "&:hover fieldset": {
      borderColor: "black", // Setze die Hover-Outline-Farbe auf Weiß
    },
    "&.Mui-focused fieldset": {
      borderColor: "black", // Setze die Fokussierte-Outline-Farbe auf Weiß
    },
  },
  "& .MuiInputLabel-root": {
    color: "black", // Setze die Label-Farbe auf Weiß
  },
  "& .MuiInputBase-input": {
    color: "black", // Setze die Textfarbe des TextFields auf Weiß
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

  const getItemStyle = () => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 8 * 1.5,
    margin: `0 0 8px 0`,
    borderRadius: 10,

    // change background colour if dragging
    background: "linear-gradient(to bottom right,  #44CDDD, #44CDDD)",
    // add margin if hovering
    // styles we need to apply on draggables
  });

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
            <Box>
              <Typography></Typography>
            </Box>
            <Box marginTop="30px">
              <Typography color={"black"} variant="h6" align="center">
                Morgenroutine
              </Typography>
              <Box mt={3} display="flex">
                <WhiteTextField
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  label="Neue Routine"
                  fullWidth
                  style={{ marginRight: 5 }} // add some margin to separate the TextField and Button
                />
                <Button
                  onClick={addTodo}
                  variant="contained"
                  color="secondary"
                  style={{
                    backgroundColor: "#44CDDD",
                  }} // add flexShrink: 0 to prevent the button from shrinking
                >
                  <AddCircleIcon />
                </Button>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                style={{ paddingBottom: "45px" }}
              >
                <Box flexGrow="1" overflow="auto">
                  <List>
                    {Array.isArray(todos) &&
                      todos.map((todo, index) => (
                        <ListItem
                          key={index}
                          onMouseEnter={() => setHoverIndex(index)}
                          onMouseLeave={() => setHoverIndex(null)}
                          style={getItemStyle(
                            false, // as this list isn't draggable, set isDragging to false
                            {}, // no draggableProps here
                            hoverIndex === index
                          )}
                        >
                          <Checkbox
                            checked={todo.checked}
                            onChange={() => toggleCheck(index)}
                            style={{ color: fontColor }}
                          />
                          <ListItemText
                            primaryTypographyProps={{
                              style: { color: fontColor },
                            }}
                            primary={todo.text}
                          />
                          {hoverIndex === index && (
                            <IconButton
                              onClick={() => deleteTodo(index)}
                              color="black"
                            >
                              <DeleteIcon color="red" />
                            </IconButton>
                          )}
                        </ListItem>
                      ))}
                  </List>
                </Box>
              </Box>
            </Box>
          </motion.div>
        </>
      </AnimatePresence>
    </>
  );
}

export default MorgenRoutineMobile;
