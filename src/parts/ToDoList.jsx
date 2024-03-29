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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DeleteIcon from "@mui/icons-material/Delete";
import saveTodos from "./../requests/saveTodos";
import GetTodos from "./../requests/GetTodos";
import RegisterRequest from "../requests/RegisterRequest";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "./../contexts/Auth";
import { render } from "react-dom";
import { StyledPaper } from "./../components/StyledPaper";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./../components/styledpaper.css";
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

function ToDoList({ todos, setTodos, selectedDay, setSelectedDay }) {
  const [newTodo, setNewTodo] = useState("");
  const [hoverIndex, setHoverIndex] = useState(null);
  const { currentUser, isAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const isFirstRender = useRef(true);
  const initialData = useRef(null);
  const [ownTodos, setOwnTodos] = useState([]);
  const renderCount = useRef(0);

  // )
  const heute = new Date();
  if (heute.getHours() < 3) {
    // Setze das Datum einen Tag zurück, wenn es vor 3 Uhr morgens ist
    heute.setDate(heute.getDate() - 1);
  }
  heute.setHours(0, 0, 0, 0);

  heute.setDate(heute.getDate() + selectedDay); // Addiert selectedDay zum aktuellen Datum
  const jahr = heute.getFullYear();
  const monat = (heute.getMonth() + 1).toString().padStart(2, "0"); // Monate sind 0-indiziert
  const tag = heute.getDate().toString().padStart(2, "0");

  const stunden = heute.getHours().toString().padStart(2, "0");
  const minuten = heute.getMinutes().toString().padStart(2, "0");
  const sekunden = heute.getSeconds().toString().padStart(2, "0");
  const localDateTime = `${jahr}-${monat}-${tag}T${stunden}:${minuten}:${sekunden}Z`;
  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      const response = await GetTodos({ currentUser });
      const latestDayData = response.data.days[response.data.days.length - 3];
      const end = response.data.days.length;
      const start = Math.max(end - 3, 0);
      const lastThreeDayData = response.data.days
        .slice(start, end)
        .map((day) =>
          day.data.map((item) => ({
            ...item,
            date: day.date,
          }))
        )
        .flat();

      setTodos(lastThreeDayData);
      setOwnTodos(lastThreeDayData);

      initialData.current = lastThreeDayData;

      setIsLoading(false);
    };
    fetchTodos();
  }, [currentUser]);

  const addTodo = () => {
    if (newTodo.trim().length > 0) {
      const newTask = {
        text: newTodo,
        checked: false,
        day: selectedDay,
        date: localDateTime,
      };
      setOwnTodos([...ownTodos, newTask]);
      setTodos([...todos, newTask]);
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
      saveTodos({ currentUser, todos, selectedDay });
    }
  }, [todos, isLoading]);

  const toggleCheck = (index) => {
    const updatedOwnTodos = todos.map((todo, i) =>
      i === index ? { ...todo, checked: !todo.checked } : todo
    );
    setTodos(updatedOwnTodos);
  };

  const getFormattedDate = (selectedDay) => {
    const currentDate = new Date();
    if (currentDate.getHours() < 3) {
      // Setze das Datum einen Tag zurück, wenn es vor 3 Uhr morgens ist
      currentDate.setDate(currentDate.getDate() - 1);
    }
    currentDate.setDate(currentDate.getDate() + selectedDay);
    return currentDate.toLocaleDateString("de-DE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const deleteTodo = (index) => {
    const updatedOwnTodos = todos.filter((todo, i) => i !== index);
    setTodos(updatedOwnTodos);
  };
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
  // Morgen
  const morgen = new Date();
  morgen.setDate(morgen.getDate() + 1);

  // Übermorgen
  const uebermorgen = new Date();
  uebermorgen.setDate(uebermorgen.getDate() + 2);
  return (
    <>
      <StyledPaper className="my-container">
        <Typography
          color={"white"}
          variant="h6"
          align="center"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={() => {
              setSelectedDay(selectedDay - 1);
            }}
            variant="text"
            color="secondary"
            style={{ borderRadius: 7, width: "2vw", flexShrink: 0 }}
            disabled={selectedDay === 0}
          >
            Gestern
          </Button>
          {/* This empty div is to keep space even when the button is not rendered */}
          <Typography
            color={"black"}
            style={{ fontWeight: "bold" }}
            variant="h6"
          >
            To Do's
          </Typography>
          <Typography color={"black"}>
            {getFormattedDate(selectedDay)}{" "}
            {/* Hier wird das Datum eingefügt */}
          </Typography>
          <Button
            onClick={() => {
              setSelectedDay(selectedDay + 1);
            }}
            variant="text"
            color="secondary"
            disabled={selectedDay === 2}
            style={{ borderRadius: 7, width: "2vw", flexShrink: 0 }}
          >
            Morgen
          </Button>
          {/* This empty div is to keep space even when the button is not rendered */}
        </Typography>
        <Box display="flex" flexDirection="column" height="90%">
          <Box flexGrow="1" overflow="auto">
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="todos">
                {(provided) => (
                  <List {...provided.droppableProps} ref={provided.innerRef}>
                    {todos
                      .filter((todo) => todo.date == localDateTime)
                      .map((todo, index) => {
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
                                sx={{
                                  transition: "margin-left 0.4s",
                                  height: "4rem",
                                }} // update here
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
                                  onChange={() =>
                                    toggleCheck(todos.indexOf(todo))
                                  }
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
                                    onClick={() =>
                                      deleteTodo(todos.indexOf(todo))
                                    }
                                    color="inherit"
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
                style: { color: "black" },
              }}
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Verhindert das standardmäßige Verhalten von Enter
                  addTodo();
                }
              }}
              label="Neues To-Do"
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

export default ToDoList;
