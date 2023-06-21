import React, { useState } from "react";
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
import saveTodos from "./../requests/saveTodos";
import RegisterRequest from "../requests/RegisterRequest";

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: 15, // Setzt die Rundung der Ecken
  backgroundColor: "#333e", // Dunklere Farbe für den Block
  maxHeight: 500, // Feste Größe für den Block
  height: 550,
  overflow: "auto", // Ermöglicht Scrollen, wenn der Inhalt zu groß ist
}));

const WhiteTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "purple", // Setze die Outline-Farbe auf Weiß
    },
    "&:hover fieldset": {
      borderColor: "purple", // Setze die Hover-Outline-Farbe auf Weiß
    },
    "&.Mui-focused fieldset": {
      borderColor: "purple", // Setze die Fokussierte-Outline-Farbe auf Weiß
    },
  },
  "& .MuiInputLabel-root": {
    color: "purple", // Setze die Label-Farbe auf Weiß
  },
  "& .MuiInputBase-input": {
    color: "white", // Setze die Textfarbe des TextFields auf Weiß
  },
}));

function ToDoList({ username }) {
  saveTodos();
  console.log("hi");
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addTodo = () => {
    if (newTodo.trim().length > 0) {
      setTodos([...todos, { text: newTodo, checked: false }]);
      setNewTodo("");
    }
    RegisterRequest("234", "pass", setIsLoggedIn);
  };

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
      <StyledPaper>
        <Typography color={"white"} variant="h6">
          To Do's
        </Typography>
        <Box display="flex" flexDirection="column" height="90%">
          <Box flexGrow="1" overflow="auto">
            <List>
              {todos.map((todo, index) => (
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
          <Box mt={3}>
            <WhiteTextField
              color="secondary"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              label="New To-Do"
            />
            <Button
              onClick={addTodo}
              variant="contained"
              color="secondary"
              style={{ marginTop: 5, marginLeft: 3, height: 45 }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </StyledPaper>
    </>
  );
}

export default ToDoList;
