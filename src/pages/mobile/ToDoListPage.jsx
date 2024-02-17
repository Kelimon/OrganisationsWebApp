import React, { useState } from "react";
import ToDoList from "../../parts/ToDoList";
import VergangeneToDos from "../../parts/VergangeneToDos";
import { Button, Box } from "@mui/material";
import Header from "../../parts/Header";
import ToDoListMobile from "../../parts/mobile/ToDoListMobile";
import VergangeneTodosMobile from "../../parts/mobile/VergangeneTodosMobile";
import HeaderMobile from "../../components/HeaderMobile";

function ToDoListPage({ vergangeneTodos, setVergangeneTodos, toLeft }) {
  const [showVergangeneTodos, setShowVergangeneTodos] = useState(false);
  const [todos, setTodos] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0); // 0 = heute, 1 = morgen, 2 = übermorgen
  return (
    <>
      <HeaderMobile />

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {showVergangeneTodos ? (
          <VergangeneTodosMobile
            todosFromTodoList={todos}
            setTodosFromTodoList={setTodos}
            setShowVergangeneTodos={setShowVergangeneTodos}
            selectedDay={selectedDay}
          />
        ) : (
          <ToDoListMobile
            setShowVergangeneTodos={setShowVergangeneTodos}
            todos={todos}
            setTodos={setTodos}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            toLeft={toLeft}
          />
        )}
      </Box>
    </>
  );
}

export default ToDoListPage;
