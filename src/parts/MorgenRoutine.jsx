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
import saveTodos from "./../requests/saveTodos";
import GetTodos from "./../requests/GetTodos";
import RegisterRequest from "../requests/RegisterRequest";
import saveRoutine from "../requests/saveRoutine";
import GetRoutine from "../requests/GetRoutine";

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

function MorgenRoutine({ username, todos, setTodos }) {
  console.log("hi");
  console.log(username)
  
  const [newTodo, setNewTodo] = useState("");
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await GetRoutine({username});
      console.log( "getroutine in morgenrotuine: ", response)
      if(response.data.days.length>0){
      setTodos(response.data.days);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = () => {
    if (newTodo.trim().length > 0) {
      setTodos([...todos, { text: newTodo, checked: false }]);
      setNewTodo("");
    }
    console.log("username before saving todos: ", username);
  console.log("todos before saving todos: ", todos);


  };

  useEffect(()=>{
    console.log(todos)
    if(todos.length>0){
      saveRoutine({username, todos})
    }
  },[todos])

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
        <Typography color={"white"} variant="h6" align="center">
          Morgenroutine
        </Typography>
        <Box display="flex" flexDirection="column" height="90%">
          <Box flexGrow="1" overflow="auto">
            <List>
              {Array.isArray(todos) && todos.map((todo, index) => (
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
        style: { color: 'white' },
      }}
    value={newTodo}
    onChange={(e) => setNewTodo(e.target.value)}
    label="New Routine Task"
    fullWidth
    style={{ marginRight: 5 }} // add some margin to separate the TextField and Button
    flexGrow={1} // this will allow the TextField to take up as much space as possible
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
    </>
  );
}

export default MorgenRoutine;
