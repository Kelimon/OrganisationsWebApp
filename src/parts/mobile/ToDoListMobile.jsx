import React, { useState, useEffect } from "react";
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
import AddIcon from "@mui/icons-material/Add";
import { useMediaQuery, useTheme } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion, AnimatePresence } from "framer-motion";

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(2),
  borderRadius: 15, // Setzt die Rundung der Ecken
  backgroundColor: "#333e", // Dunklere Farbe für den Block
  height: "calc(100vh - 100px)",
  overflow: "auto", // Ermöglicht Scrollen, wenn der Inhalt zu groß ist
}));

const StyledPaperMobile = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  paddingBottom: 0,
  marginTop: 34,
  borderRadius: 15, // Setzt die Rundung der Ecken
  backgroundColor: "#333e", // Dunklere Farbe für den Block
  maxHeight: 1000, // Feste Größe für den Block
  height: "calc(100vh - 260px)",
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

function ToDoListMobile({ username, todos, setTodos, setShowVergangeneTodos, showVergangeneTodos, toLeft }) {
  console.log("hi");
  console.log(username);

  const [newTodo, setNewTodo] = useState("");
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isSmallScreen = useMediaQuery(useTheme().breakpoints.down("sm"));

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
    console.log("username before saving todos: ", username);
    console.log("todos before saving todos: ", todos);
  };

  useEffect(() => {
    console.log(todos);
    if (todos.length > 0) {
      saveTodos({ username, todos });
    }
  }, [todos]);

  const toggleCheck = (index) => {
    setTodos(todos.map((todo, i) => (i === index ? { ...todo, checked: !todo.checked } : todo)));
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((todo, i) => i !== index));
  };

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <>
          <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
            <Button
              variant="outlined"
              onClick={() => setShowVergangeneTodos(!showVergangeneTodos)}
              style={{
                position: "absolute",
                right: "5%",
              }}
              sx={{
                border: "none",
                "&:focus": {
                  outline: "none",
                },
              }}
            >
              Vergangene ToDos
            </Button>
            <StyledPaperMobile>
              <Typography color={"white"} variant="h6" align="center">
                To Do's
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
                            primaryTypographyProps={{ style: { color: "white" } }}
                            primary={todo.text}
                            color={"white"}
                          />
                          {hoverIndex === index && (
                            <IconButton onClick={() => deleteTodo(index)} color="error">
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
                    label="New To-Do"
                    fullWidth
                    style={{ marginRight: 5 }} // add some margin to separate the TextField and Button
                    flexGrow={1} // this will allow the TextField to take up as much space as possible
                  />
                  {false && (
                    <IconButton
                      onClick={addTodo}
                      variant="contained"
                      color="secondary"
                      style={{}} // add flexShrink: 0 to prevent the button from shrinking
                    >
                      <AddIcon sx={{ fontSize: 34 }} />
                    </IconButton>
                  )}
                  <Button
                    onClick={addTodo}
                    variant="contained"
                    color="secondary"
                    style={{ borderRadius: 7, width: "2vw" }} // add flexShrink: 0 to prevent the button from shrinking
                  >
                    Add
                  </Button>
                </Box>
              </Box>
            </StyledPaperMobile>
          </motion.div>
        </>
      </AnimatePresence>
    </>
  );
}

export default ToDoListMobile;
