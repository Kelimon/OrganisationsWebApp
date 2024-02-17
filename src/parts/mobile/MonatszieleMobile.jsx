import React, { useState, useEffect, useRef } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Paper,
  TextField,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import savePrios from "./../../requests/savePrios";
import GetPrios from "./../../requests/GetPrios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AdjustOutlinedIcon from "@mui/icons-material/AdjustOutlined";
import GetMonatziele from "../../requests/GetMonatsziele";
import saveMonatsziele from "../../requests/saveMonatsziele";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./../../contexts/Auth";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Checkbox from "@mui/material/Checkbox";

import FontColor from "../../components/FontColor";

const fontColor = FontColor();

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  marginTop: 34,
  borderRadius: 15,
  backgroundColor: "#333e",
  height: "calc(100vh - 275px)",
  overflow: "auto",
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

function MonatszieleMobile({ username, setShowVergangeneTodos }) {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const isFirstRender = useRef(true);
  const initialData = useRef(null);

  /*useEffect(() => {
    const fetchTodos = async () => {
      const response = await GetTodos({username});
      const latestDayData = response.data.days[response.data.days.length - 1];
      setTodos(latestDayData.data);
    };

    fetchTodos();
  }, []);*/

  const addTodo = () => {
    if (newTodo.trim().length > 0) {
      setTodos([...todos, { text: newTodo, checked: false, id: newTodo }]);
      setNewTodo("");
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      const response = await GetMonatziele({ currentUser });
      if (response) {
        const todosWithChecked = response.map((todo) => ({
          ...todo,
          checked: todo.checked ?? false, // Use nullish coalescing operator to add 'checked' if it's not present
        }));
        setTodos(todosWithChecked);
        initialData.current = todosWithChecked;
      }
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
      return; // Skip saving when the component is in a loading state
    }

    let mzieleData = todos;
    console.log("mziele", mzieleData);
    saveMonatsziele({ currentUser, mzieleData });
  }, [todos, isLoading]);

  const deleteTodo = (index) => {
    setTodos(todos.filter((todo, i) => i !== index));
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  };
  const getItemStyle = (isDragging, draggableStyle, isHovering) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 8 * 1.5,
    margin: `0 0 8px 0`,
    borderRadius: 10,

    // change background colour if dragging
    background: isDragging
      ? "linear-gradient(to bottom right, #44CDDD,  lightblue)"
      : "linear-gradient(to bottom right,  #44CDDD, #44CDDD)",
    // add margin if hovering
    marginLeft: isHovering ? "20px" : "0px",
    // styles we need to apply on draggables
    ...draggableStyle,
  });

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
              <Button
                variant="text"
                onClick={() => setShowVergangeneTodos(false)}
                style={{
                  position: "absolute",
                }}
              >
                Aktuelle Prioritäten
              </Button>
            </Box>
            <Box height={"92vh"} marginTop="30px">
              <Typography color={"black"} variant="h6" align="center">
                Monatsziele
              </Typography>
              <Box class="container" height="90%">
                <Box flexGrow="1" overflow="auto">
                  <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="todos">
                      {(provided) => (
                        <List
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {todos.map(({ text, checked }, index) => {
                            return (
                              <Draggable
                                key={index}
                                draggableId={`draggable-${index}-${text}`}
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
                                    style={getItemStyle(
                                      snapshot.isDragging,
                                      provided.draggableProps.style,
                                      index === hoverIndex
                                    )}
                                    onMouseEnter={() => setHoverIndex(index)}
                                    onMouseLeave={() => setHoverIndex(null)}
                                  >
                                    <Checkbox
                                      checked={checked}
                                      onChange={() => {
                                        const newTodos = [...todos];
                                        newTodos[index].checked =
                                          !newTodos[index].checked;
                                        setTodos(newTodos);
                                      }}
                                      style={{ color: fontColor }}
                                    />
                                    <ListItemText
                                      primaryTypographyProps={{
                                        style: { color: "white" },
                                      }}
                                      primary={text}
                                    />
                                    {hoverIndex === index && (
                                      <IconButton
                                        onClick={() => deleteTodo(index)}
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
                <Box mt={3} display="flex" marginBottom={"155px"}>
                  <WhiteTextField
                    InputLabelProps={{
                      style: { color: "black" },
                    }}
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    label="Neues Monatsziel"
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
              </Box>
            </Box>
          </motion.div>
        </>
      </AnimatePresence>
    </>
  );
}

export default MonatszieleMobile;
