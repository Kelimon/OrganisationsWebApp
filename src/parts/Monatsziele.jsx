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
import savePrios from "./../requests/savePrios";
import GetPrios from "./../requests/GetPrios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AdjustOutlinedIcon from "@mui/icons-material/AdjustOutlined";
import GetMonatziele from "../requests/GetMonatsziele";
import saveMonatsziele from "../requests/saveMonatsziele";
import { useAuth } from "./../contexts/Auth";
import Checkbox from "@mui/material/Checkbox";
import { StyledPaper } from "./../components/StyledPaper";
const RoundedCheckbox = styled(Checkbox)({
  "&.MuiCheckbox-colorPrimary.Mui-checked .MuiSvgIcon-root": {
    color: "black", // Ersetzen Sie YOUR_CUSTOM_COLOR durch Ihre gewünschte Farbe
  },
});

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

function Monatsziele({}) {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const isFirstRender = useRef(true);
  const initialData = useRef(null);

  const addTodo = () => {
    if (newTodo.trim().length > 0) {
      setTodos([...todos, { text: newTodo, id: newTodo }]);
      setNewTodo("");
    }
  };
  console.log("Monatsziele currentusercheck: ", currentUser);
  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      const response = await GetMonatziele({ currentUser });
      console.log("response from monatsziele: ", response);
      if (response) {
        setTodos(response);
        initialData.current = response;
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
    if (JSON.stringify(todos) !== JSON.stringify(initialData.current)) {
      let mzieleData = todos;
      saveMonatsziele({ currentUser, mzieleData });
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
    padding: 8 * 1.5,
    margin: `0 0 8px 0`,
    borderRadius: 10,

    // change background colour if dragging
    background: isDragging
      ? "linear-gradient(to bottom right, black,  #550763)"
      : "linear-gradient(to bottom right,  #870e9c, #ee05fa)",
    // add margin if hovering
    // styles we need to apply on draggables
    ...draggableStyle,
  });

  return (
    <StyledPaper>
      <Typography color={"white"} variant="h6" align="center">
        Monatsziele
      </Typography>
      <Box display="flex" flexDirection="column" height="90%">
        <Box flexGrow="1" overflow="auto">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="todos">
              {(provided) => (
                <List {...provided.droppableProps} ref={provided.innerRef}>
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
                            <RoundedCheckbox
                              checked={checked}
                              onChange={() => {
                                const newTodos = [...todos];
                                newTodos[index].checked =
                                  !newTodos[index].checked;
                                setTodos(newTodos);
                              }}
                              color="primary"
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
            label="New monthly Goal"
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
  );
}

export default Monatsziele;
