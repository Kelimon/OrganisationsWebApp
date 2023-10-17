import React, { useState, useEffect } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useAuth } from "./../../contexts/Auth";

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

function AktuellePriosMobile({
  showVergangeneTodos,
  setShowVergangeneTodos,
  todos,
  setTodos,
  toLeft,
}) {
  const [newTodo, setNewTodo] = useState("");
  const { currentUser } = useAuth();
  const [hoverIndex, setHoverIndex] = useState(null);

  /*useEffect(() => {
    const fetchTodos = async () => {
      const response = await GetTodos({username});
      const latestDayData = response.data.days[response.data.days.length - 1];
      setTodos(latestDayData.data);
    };

    fetchTodos();
  }, []);*/

  /*const pageTransition = () => {
    if (toLeft) {
      return {
        in: {
          opacity: 10,
          x: 0,
        },
        out: {
          opacity: 100,
          x: "3vw",
        },
      };
    } else {
      return {
        in: {
          opacity: 10,
          x: 0,
        },
        out: {
          opacity: 100,
          x: "-3vw",
        },
      };
    }
  };*/

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
      setTodos([...todos, { text: newTodo, id: newTodo }]);
      setNewTodo("");
    }
  };

  useEffect(() => {
    if (todos.length > 0) {
      let priosData = todos;
      savePrios({ currentUser, priosData });
    }
  }, [todos]);

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
    padding: 8 * 2,
    margin: `0 0 ${8}px 0`,
    borderRadius: 10,

    // change background colour if dragging
    background: isDragging
      ? "black"
      : "linear-gradient(to right,  #028db0, #fa37c0)",
    //background: isDragging ? "linear-gradient(to bottom right, black,  #550763)" : "#b608d4",
    marginLeft: isHovering ? "20px" : "0px",
    // styles we need to apply on draggables
    ...draggableStyle,
  });

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
              Monatsziele
            </Button>
            <StyledPaper>
              <Typography color={"white"} variant="h6" align="center">
                Aktuelle Prioritäten
              </Typography>
              <Box display="flex" flexDirection="column" height="90%">
                <Box flexGrow="1" overflow="auto">
                  <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="todos">
                      {(provided) => (
                        <List
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {todos.map(({ text }, index) => {
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
                                    <ListItemIcon>
                                      <AdjustOutlinedIcon color="inherit" />
                                    </ListItemIcon>
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
                <Box mt={3} display="flex">
                  <WhiteTextField
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    label="New Priority"
                    fullWidth
                    style={{ marginRight: 5 }} // add some margin to separate the TextField and Button
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
          </motion.div>
        </>
      </AnimatePresence>
    </>
  );
}

export default AktuellePriosMobile;
