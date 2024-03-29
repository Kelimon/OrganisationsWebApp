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
import saveRoutine from "../requests/saveRoutine";
import GetRoutine from "../requests/GetRoutine";
import { useAuth } from "./../contexts/Auth";
import { StyledPaper } from "./../components/StyledPaper";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import FontColor from "./../components/FontColor";
import "./../components/styledpaper.css";
const fontColor = FontColor();
const WhiteTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black", // Setze die Outline-Farbe auf Weiß
      borderRadius: "20px", // Fügt den borderRadius hinzu
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

function MorgenRoutine({}) {
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
  }, []);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  };
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 8 * 1.5,
    margin: `0 0 8px 0`,
    borderRadius: 10,

    // change background colour if dragging
    background: isDragging
      ? "linear-gradient(to bottom right, #44CDDD, #118491)"
      : "linear-gradient(to bottom right,  #44CDDD, #44CDDD)",
    // add margin if hovering
    // styles we need to apply on draggables
    ...draggableStyle,
  });

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
      <StyledPaper className="my-container">
        <Typography color={"black"} variant="h6" align="center">
          Morgenroutine
        </Typography>
        <Box display="flex" flexDirection="column" height="90%">
          <Box flexGrow="1" overflow="auto">
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="todos">
                {(provided) => (
                  <List {...provided.droppableProps} ref={provided.innerRef}>
                    {Array.isArray(todos) &&
                      todos.map((todo, index) => {
                        return (
                          <Draggable
                            key={index}
                            draggableId={`draggable-${index}-${todo}`}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <ListItem
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                key={index}
                                onMouseEnter={() => setHoverIndex(index)}
                                onMouseLeave={() => setHoverIndex(null)}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style,
                                  index === hoverIndex
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
                                    color="#4f4f4f"
                                  >
                                    <DeleteIcon color="black" />
                                  </IconButton>
                                )}
                              </ListItem>
                            )}
                          </Draggable>
                        );
                      })}
                    {provided.placeholder}
                  </List>
                )}
              </Droppable>
            </DragDropContext>
          </Box>
          <Box mt={3} display="flex">
            <WhiteTextField
              InputLabelProps={{
                style: { color: "" },
              }}
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Verhindert das standardmäßige Verhalten von Enter
                  addTodo();
                }
              }}
              label="Neue Routine"
              fullWidth
              style={{ marginRight: 5 }} // add some margin to separate the TextField and Button
            />
            <Button
              onClick={addTodo}
              variant="contained"
              color="secondary"
              style={{
                borderRadius: 20,
                width: "2vw",
                backgroundColor: "#44CDDD",
              }} // add flexShrink: 0 to prevent the button from shrinking
            >
              <AddCircleIcon />
            </Button>
          </Box>
        </Box>
      </StyledPaper>
    </>
  );
}

export default MorgenRoutine;
