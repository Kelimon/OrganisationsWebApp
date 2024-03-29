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
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import saveTodos from "./../../requests/saveTodos";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import GetTodos from "./../../requests/GetTodos";
import RegisterRequest from "../../requests/RegisterRequest";
import AddIcon from "@mui/icons-material/Add";
import { useMediaQuery, useTheme } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion, AnimatePresence } from "framer-motion";
import { StyledPaperMobile } from "./../../components/StyledPaperMobile";
import { useAuth } from "./../../contexts/Auth";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FontColor from "./../../components/FontColor";
import { useSwipeable } from "react-swipeable";
import { Pagination, PaginationItem } from "@mui/material";
import { select } from "@syncfusion/ej2-base";

const fontColor = FontColor();

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
  todos,
  setTodos,
  setShowVergangeneTodos,
  selectedDay,
  setSelectedDay,
  showVergangeneTodos,
  toLeft,
}) {
  const [newTodo, setNewTodo] = useState("");
  const [hoverIndex, setHoverIndex] = useState(null);
  const isSmallScreen = useMediaQuery(useTheme().breakpoints.down("sm"));

  const { currentUser, isAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

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
  const onBeforeDragStart = () => {
    setIsDragging(true);
  };

  const handlers = useSwipeable(
    isDragging
      ? {}
      : {
          onSwipedLeft: () =>
            setSelectedDay(Math.max(0, Math.min(selectedDay + 1, 2))),
          onSwipedRight: () =>
            setSelectedDay(Math.max(0, Math.min(selectedDay - 1, 2))),
          // Prevent default touch action to prevent scroll on swipe
          preventDefaultTouchmoveEvent: true,
          trackMouse: true, // If you want to track mouse events as swipes on desktop
        }
  );

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

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
    setIsDragging(false); // Update the dragging state when the drag ends
  };
  const getItemStyle = (isDragging, draggableStyle, isHovering) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 8 * 1.5,
    margin: `0 0 8px 0`,
    borderRadius: 10,

    // change background colour if dragging
    background: isDragging
      ? "linear-gradient(to bottom right,  #44CDDD, #118491)"
      : "linear-gradient(to bottom right,  #44CDDD, #44CDDD)",
    //background: isDragging ? "linear-gradient(to bottom right, black,  #550763)" : "#b608d4",
    ...draggableStyle,
  });

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

      initialData.current = lastThreeDayData;

      setIsLoading(false);
    };
    fetchTodos();
  }, [currentUser]);
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
  const handleChange = (event, value) => {
    setSelectedDay(value);
    // Hier könnten Sie auch die Animation hinzufügen
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
              <Box>
                <Button
                  variant="text"
                  onClick={() => setShowVergangeneTodos(true)}
                  style={{
                    position: "absolute",
                    right: "0%",
                    top: "0px",
                  }}
                >
                  Vergangene ToDos
                </Button>
              </Box>
              <Box marginTop="30px" {...handlers} height="80vh">
                <Typography
                  color={"white"}
                  variant="h6"
                  align="center"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography color={"black"} variant="h6" align="center">
                    To Do's
                  </Typography>
                </Typography>

                <Typography color={"black"} align="center">
                  {getFormattedDate(selectedDay)}{" "}
                  {/* Hier wird das Datum eingefügt */}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center", // Zentriert die Pagination-Komponente horizontal
                    mt: 0, // Margin Top für etwas Abstand unter dem Datum
                    mb: "-15px",
                  }}
                >
                  <Pagination
                    count={3}
                    page={selectedDay + 1}
                    onChange={handleChange}
                    variant="outlined"
                    shape="rounded"
                    size="small"
                    hideNextButton
                    hidePrevButton
                    renderItem={(item) => (
                      <PaginationItem
                        {...item}
                        sx={{
                          margin: -0.3, // Entfernt den Außenabstand komplett
                          padding: "0 10px", // Fügt einen kleinen Innenabstand zwischen den Punkten hinzu
                          "&.MuiButtonBase-root": {
                            borderRadius: "100px",
                            fontSize: "0px",
                            heigth: "10%",
                            backgroundColor: "action.disabled", // Standard-Hintergrundfarbe für nicht ausgewählte Items
                            transform: "scale(0.4)",
                            padding: "-10px",
                          },
                          "&.Mui-selected": {
                            backgroundColor: "#44CDDD",
                            transform: "scale(0.6)",
                          },

                          "&:hover": {
                            backgroundColor: "#ccdcde",
                            transform: "scale(0.6)",
                          },
                        }}
                      />
                    )}
                  />
                </Box>
                <Box
                  mt={3}
                  display="flex"
                  style={{
                    position: "sticky",
                    bottom: 0,
                    backgroundColor: "inherit",
                  }}
                >
                  <WhiteTextField
                    InputLabelProps={{
                      style: { color: "black" },
                    }}
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
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
                      borderRadius: 7,
                      backgroundColor: "#44CDDD",
                    }} // add flexShrink: 0 to prevent the button from shrinking
                  >
                    <AddCircleIcon />
                  </Button>
                </Box>
                <Box
                  direction="column"
                  justifyContent="flex-end"
                  alignItems="stretch"
                  style={{ paddingBottom: "45px" }}
                >
                  <DragDropContext
                    onBeforeDragStart={onBeforeDragStart}
                    onDragEnd={handleOnDragEnd}
                  >
                    <Droppable droppableId="todos">
                      {(provided) => (
                        <List
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {todos.filter((todo) => todo.date == localDateTime)
                            .length === 0 && (
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "50vh", // Dies füllt die Höhe des übergeordneten Containers
                                minHeight: "200px", // Mindesthöhe, um sicherzustellen, dass es sichtbar ist, auch wenn es leer ist
                              }}
                            >
                              <Typography color={"black"} align="center">
                                Keine Todos für den{" "}
                                {getFormattedDate(selectedDay)} vorhanden
                              </Typography>
                            </Box>
                          )}
                          {Array.isArray(todos) &&
                            todos
                              .filter((todo) => todo.date == localDateTime)
                              .map((todo, index) => (
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
                                        onChange={() =>
                                          toggleCheck(todos.indexOf(todo))
                                        }
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
                                          onClick={() =>
                                            deleteTodo(todos.indexOf(todo))
                                          }
                                          color="black"
                                        >
                                          <DeleteIcon />
                                        </IconButton>
                                      )}
                                    </ListItem>
                                  )}
                                </Draggable>
                              ))}

                          {provided.placeholder}
                        </List>
                      )}
                    </Droppable>
                  </DragDropContext>
                </Box>
              </Box>
            </Box>
          </motion.div>
        </>
      </AnimatePresence>
    </>
  );
}

export default ToDoListMobile;
