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
import saveTodos from "./../requests/saveTodos";
import GetTodos from "./../requests/GetTodos";
import RegisterRequest from "../requests/RegisterRequest";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "./../contexts/Auth";
import { render } from "react-dom";
import { StyledPaper } from "./../components/StyledPaper";
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

function ToDoList({ todos, setTodos }) {
  const [newTodo, setNewTodo] = useState("");
  const [hoverIndex, setHoverIndex] = useState(null);
  const { currentUser, isAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const isFirstRender = useRef(true);
  const initialData = useRef(null);
  const renderCount = useRef(0);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      const response = await GetTodos({ currentUser });
      const latestDayData = response.data.days[response.data.days.length - 1];
      if (latestDayData.data.length > 0) {
        setTodos(latestDayData.data);
        initialData.current = latestDayData.data;
      }
      setIsLoading(false);
    };
    fetchTodos();
  }, []);

  const addTodo = () => {
    if (newTodo.trim().length > 0) {
      setTodos([...todos, { text: newTodo, checked: false }]);
      setNewTodo("");
    }
  };
  renderCount.current += 1;
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isLoading) {
      return;
    }
    if (JSON.stringify(todos) !== JSON.stringify(initialData.current)) {
      saveTodos({ currentUser, todos });
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
      <StyledPaper>
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Verhindert das standardmäßige Verhalten von Enter
                  addTodo();
                }
              }}
              label="New To-Do"
              fullWidth
              style={{ marginRight: 5 }} // add some margin to separate the TextField and Button
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
      </StyledPaper>
    </>
  );
}

export default ToDoList;
