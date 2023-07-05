import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import Scheduler from "../../parts/Scheduler";
import MorgenRoutine from "../../parts/MorgenRoutine";
import Header from "../../parts/Header";
import MorgenRoutineMobile from "../../parts/mobile/MorgenRoutineMobile";
import HeaderMobile from "../../components/HeaderMobile";

function MorgenRoutinePage({ currentUser, todos, setTodos, toLeft, setIsLoggedIn  }) {
  return (
    <>
      <HeaderMobile username={currentUser} setIsLoggedIn={setIsLoggedIn}/>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <MorgenRoutineMobile username={currentUser} todos={todos} setTodos={setTodos} toLeft={toLeft} />
      </Box>
    </>
  );
}

export default MorgenRoutinePage;
