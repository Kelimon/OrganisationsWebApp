import React, { useState } from "react";
import ToDoList from "../../parts/ToDoList";
import VergangeneToDos from "../../parts/VergangeneToDos";
import { Button, Box } from "@mui/material";
import Header from "../../parts/Header";
import ToDoListMobile from "../../parts/mobile/ToDoListMobile";
import VergangeneTodosMobile from "../../parts/mobile/VergangeneTodosMobile";
import HeaderMobile from "../../components/HeaderMobile";

function ToDoListPage({ todos, setTodos, vergangeneTodos, setVergangeneTodos, toLeft  }) {
  const [showVergangeneTodos, setShowVergangeneTodos] = useState(false);
  return (
    <>
      <HeaderMobile/>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {showVergangeneTodos ? (
          <VergangeneTodosMobile
            setShowVergangeneTodos={setShowVergangeneTodos}
            showVergangeneTodos={showVergangeneTodos}
            todos={vergangeneTodos}
            setTodos={setVergangeneTodos}
          />
        ) : (
          <ToDoListMobile
            todos={todos}
            setTodos={setTodos}
            setShowVergangeneTodos={setShowVergangeneTodos}
            showVergangeneTodos={showVergangeneTodos}
            toLeft={toLeft}
          />
        )}
      </Box>
    </>
  );
}

export default ToDoListPage;
