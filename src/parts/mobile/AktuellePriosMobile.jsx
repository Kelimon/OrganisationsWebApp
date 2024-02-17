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
import { motion, AnimatePresence } from "framer-motion";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useAuth } from "./../../contexts/Auth";
import Checkbox from "@mui/material/Checkbox";
import "./../../assets/aktuellepriosmobile.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
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
  overflowY: "auto",
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

const RoundedCheckbox = styled(Checkbox)({
  "&.MuiCheckbox-colorPrimary.Mui-checked .MuiSvgIcon-root": {
    color: "white", // Ersetzen Sie YOUR_CUSTOM_COLOR durch Ihre gewünschte Farbe
  },
});

function AktuellePriosMobile({ toLeft, setShowVergangeneTodos }) {
  const [newTodo, setNewTodo] = useState("");
  const { currentUser } = useAuth();
  const [hoverIndex, setHoverIndex] = useState(null);
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFirstRender = useRef(true);
  const initialData = useRef(null);
  const [gotData, setGotData] = useState(false);
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
      setTodos([...todos, { text: newTodo, checked: false, id: newTodo }]);
      setNewTodo("");
    }
  };
  console.log("prios", todos);
  useEffect(() => {
    console.log(1);
    const fetchTodos = async () => {
      console.log(2);
      setIsLoading(true);
      const response = await GetPrios({ currentUser });
      console.log("response", currentUser);
      if (response) {
        console.log("totods", response);
        const todosWithChecked = response.map((todo) => ({
          ...todo,
          checked: todo.checked ?? false, // Use nullish coalescing operator to add 'checked' if it's not present
        }));
        console.log("checkedtodos", todosWithChecked);
        setTodos(todosWithChecked);
        // Make sure to create a deep copy of todosWithChecked to ensure independence
        initialData.current = JSON.parse(JSON.stringify(todosWithChecked));
      }
      setIsLoading(false);
      setGotData(true);
    };

    fetchTodos();
  }, [currentUser]);
  console.log("intialdata", initialData.current);
  useEffect(() => {
    console.log(1);
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    console.log(2);
    if (isLoading) {
      return; // Skip saving when the component is in a loading state
    }

    let priosData = todos;
    console.log(4);
    if (gotData) {
      console.log(5);
      savePrios({ currentUser, priosData });
    }
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
    padding: 8 * 2,
    margin: `0 0 ${8}px 0`,
    borderRadius: 10,

    // change background colour if dragging
    background: isDragging
      ? "linear-gradient(to bottom right,  #44CDDD, lightblue)"
      : "linear-gradient(to bottom right,  #44CDDD, #44CDDD)",
    //background: isDragging ? "linear-gradient(to bottom right, black,  #550763)" : "#b608d4",
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
            <Box>
              <Button
                variant="text"
                onClick={() => setShowVergangeneTodos(true)}
                style={{
                  position: "absolute",
                  right: "0%",
                }}
              >
                Monatsziele
              </Button>
            </Box>
            <Box height={"92vh"} marginTop="30px">
              <Typography color={"black"} variant="h6" align="center">
                Aktuelle Prioritäten
              </Typography>
              <Box class="container">
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
                    label="Neue Priorität"
                    fullWidth
                    style={{ marginRight: 5 }} // add some margin to separate the TextField and Button
                  />
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
              </Box>
            </Box>
          </motion.div>
        </>
      </AnimatePresence>
    </>
  );
}

export default AktuellePriosMobile;
