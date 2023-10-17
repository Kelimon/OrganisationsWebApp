import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import Scheduler from "../../parts/Scheduler";
import MorgenRoutine from "../../parts/MorgenRoutine";
import Header from "../../parts/Header";
import MorgenRoutineMobile from "../../parts/mobile/MorgenRoutineMobile";
import HeaderMobile from "../../components/HeaderMobile";

function MorgenRoutinePage({ todos, setTodos, toLeft }) {
  return (
    <>
      <HeaderMobile/>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <MorgenRoutineMobile todos={todos} setTodos={setTodos} toLeft={toLeft} />
      </Box>
    </>
  );
}

export default MorgenRoutinePage;
