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

function ToDoList({ todos, setTodos }) {
  const [newTodo, setNewTodo] = useState("");
  const [hoverIndex, setHoverIndex] = useState(null);
  const { currentUser, isAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const isFirstRender = useRef(true);
  const initialData = useRef(null);
  const [ownTodos, setOwnTodos] = useState([]);
  const renderCount = useRef(0);
  const [selectedDay, setSelectedDay] = useState(0); // 0 = heute, 1 = morgen, 2 = übermorgen
  const todosForSelectedDay = ownTodos[selectedDay] || [];

  const heute = new Date();
  heute.setHours(0, 0, 0, 0);
  heute.setDate(heute.getDate() + selectedDay); // Addiert selectedDay zum aktuellen Datum
  const jahr = heute.getFullYear();
  const monat = (heute.getMonth() + 1).toString().padStart(2, "0"); // Monate sind 0-indiziert
  const tag = heute.getDate().toString().padStart(2, "0");
  const stunden = heute.getHours().toString().padStart(2, "0");
  const minuten = heute.getMinutes().toString().padStart(2, "0");
  const sekunden = heute.getSeconds().toString().padStart(2, "0");
  const localDateTime = `${jahr}-${monat}-${tag}T${stunden}:${minuten}:${sekunden}Z`;

  console.log("localDateTime: ", localDateTime);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      const response = await GetTodos({ currentUser });
      const latestDayData = response.data.days[response.data.days.length - 3];
      const end = response.data.days.length;
      const start = Math.max(end - 3, 0);
      console.log("response", response.data.days);
      const lastThreeDayData = response.data.days
        .slice(start, end)
        .map((day) =>
          day.data.map((item) => ({
            ...item,
            date: day.date,
          }))
        )
        .flat();

      console.log("datefrommongo", response.data.days[204].date);
      console.log("latesthree", lastThreeDayData);
      if (latestDayData.data.length > 0) {
        setTodos(latestDayData.data);
        setOwnTodos(lastThreeDayData);

        initialData.current = lastThreeDayData;
      }
      setIsLoading(false);
    };
    fetchTodos();
  }, []);

  const addTodo = () => {
    if (newTodo.trim().length > 0) {
      const newTask = {
        text: newTodo,
        checked: false,
        day: selectedDay,
        date: localDateTime,
      };
      setOwnTodos([...ownTodos, newTask]);
      if (selectedDay === 0) {
        setTodos([...todos, newTask]);
      }
      setNewTodo("");
    }
  };
  console.log("keo: ", ownTodos);
  renderCount.current += 1;
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isLoading) {
      return;
    }
    if (JSON.stringify(ownTodos) !== JSON.stringify(initialData.current)) {
      saveTodos({ currentUser, ownTodos, selectedDay });
    }
  }, [ownTodos, isLoading]);

  const toggleCheck = (index) => {
    const updatedOwnTodos = ownTodos.map((todo, i) =>
      i === index ? { ...todo, checked: !todo.checked } : todo
    );
    setOwnTodos(updatedOwnTodos);
    console.log("indexwhat: ", index);
    if (selectedDay === 0) {
      const updatedTodos = todos.map((todo, i) =>
        i === index ? { ...todo, checked: !todo.checked } : todo
      );
      setTodos(updatedTodos);
    }
  };

  const getFormattedDate = (selectedDay) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + selectedDay);
    return currentDate.toLocaleDateString("de-DE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const deleteTodo = (index) => {
    const updatedOwnTodos = ownTodos.filter((todo, i) => i !== index);
    setOwnTodos(updatedOwnTodos);

    if (selectedDay === 0) {
      const updatedTodos = todos.filter((todo, i) => i !== index);
      setTodos(updatedTodos);
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

  // Morgen
  const morgen = new Date();
  morgen.setDate(morgen.getDate() + 1);

  // Übermorgen
  const uebermorgen = new Date();
  uebermorgen.setDate(uebermorgen.getDate() + 2);
  console.log("owntodosis,", ownTodos);
  return (
    <>
      <StyledPaper>
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
            <List>
              {ownTodos
                .filter((todo) => todo.date == localDateTime)
                .map((todo, index) => (
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
                      onChange={() => toggleCheck(ownTodos.indexOf(todo))}
                      style={{ color: "white" }}
                    />
                    <ListItemText
                      primaryTypographyProps={{ style: { color: "white" } }}
                      primary={todo.text}
                      color={"white"}
                    />
                    {hoverIndex === index && (
                      <IconButton
                        onClick={() => deleteTodo(ownTodos.indexOf(todo))}
                        color="inherit"
                      >
                        <DeleteIcon color="black" />
                      </IconButton>
                    )}
                  </ListItem>
                ))}
            </List>
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
              style={{
                borderRadius: 20,
                width: "2vw",
                backgroundColor: "#44CDDD",
              }} // add flexShrink: 0 to prevent the button from shrinking
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
