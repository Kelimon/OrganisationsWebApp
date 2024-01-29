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
import AddIcon from "@mui/icons-material/Add";
import { useMediaQuery, useTheme } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion, AnimatePresence } from "framer-motion";
import { StyledPaperMobile } from "./../../components/StyledPaperMobile";
import { useAuth } from "./../../contexts/Auth";
const StyledPaperMobile2 = styled(Paper)(({ theme }) => ({
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

function ToDoListMobile({
  setShowVergangeneTodos,
  showVergangeneTodos,
  toLeft,
}) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [hoverIndex, setHoverIndex] = useState(null);
  const isSmallScreen = useMediaQuery(useTheme().breakpoints.down("sm"));
  const [selectedDay, setSelectedDay] = useState(0); // 0 = heute, 1 = morgen, 2 = übermorgen
  const { currentUser, isAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const isFirstRender = useRef(true);
  const initialData = useRef(null);
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

  const getFormattedDate = (selectedDay) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + selectedDay);
    return currentDate.toLocaleDateString("de-DE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const addTodo = () => {
    if (newTodo.trim().length > 0) {
      setTodos([
        ...todos,
        {
          text: newTodo,
          checked: false,
          day: selectedDay,
          date: localDateTime,
        },
      ]);
      setNewTodo("");
    }
  };
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

      if (latestDayData.data.length > 0) {
        setTodos(lastThreeDayData);

        initialData.current = lastThreeDayData;
      }
      setIsLoading(false);
    };
    fetchTodos();
  }, [currentUser]);
  useEffect(() => {
    if (todos.length > 0) {
      saveTodos({ currentUser, ownTodos: todos, selectedDay });
    }
  }, [todos]);

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
                <Typography color={"black"} variant="h6" align="center">
                  To Do's
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
              </Typography>
              <Typography color={"black"} align="center">
                {getFormattedDate(selectedDay)}{" "}
                {/* Hier wird das Datum eingefügt */}
              </Typography>
              <Box display="flex" flexDirection="column" height="90%">
                <Box flexGrow="1" overflow="auto">
                  <List>
                    {Array.isArray(todos) &&
                      todos
                        .filter((todo) => todo.date == localDateTime)
                        .map((todo, index) => (
                          <ListItem
                            key={index}
                            onMouseEnter={() => setHoverIndex(index)}
                            onMouseLeave={() => setHoverIndex(null)}
                          >
                            <Checkbox
                              checked={todo.checked}
                              onChange={() => toggleCheck(index)}
                              style={{ color: "black" }}
                            />
                            <ListItemText
                              primaryTypographyProps={{
                                style: { color: "black" },
                              }}
                              primary={todo.text}
                              color={"black"}
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
                      style: { color: "black" },
                    }}
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
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
            </StyledPaperMobile>
          </motion.div>
        </>
      </AnimatePresence>
    </>
  );
}

export default ToDoListMobile;
