import React, { useState } from "react";
import ToDoList from "../../parts/ToDoList";
import VergangeneToDos from "../../parts/VergangeneToDos";
import { Button, Box } from "@mui/material";
import Header from "../../parts/Header";
import ToDoListMobile from "../../parts/mobile/ToDoListMobile";
import VergangeneTodosMobile from "../../parts/mobile/VergangeneTodosMobile";
import HeaderMobile from "../../components/HeaderMobile";

function ToDoListPage({ currentUser, todos, setTodos, vergangeneTodos, setVergangeneTodos, toLeft, setIsLoggedIn  }) {
  const [showVergangeneTodos, setShowVergangeneTodos] = useState(false);
  return (
    <>
      <HeaderMobile username={currentUser} setIsLoggedIn={setIsLoggedIn}/>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {showVergangeneTodos ? (
          <VergangeneTodosMobile
            username={currentUser}
            setShowVergangeneTodos={setShowVergangeneTodos}
            showVergangeneTodos={showVergangeneTodos}
            todos={vergangeneTodos}
            setTodos={setVergangeneTodos}
          />
        ) : (
          <ToDoListMobile
            username={currentUser}
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
