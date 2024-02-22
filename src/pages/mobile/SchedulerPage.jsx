import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import Scheduler from "../../parts/Scheduler";
import Header from "../../parts/Header";
import SchedulerMobile from "../../parts/mobile/SchedulerMobile";
import HeaderMobile from "../../components/HeaderMobile";

function SchedulerPage({ toLeft }) {
  return (
    <>
      <HeaderMobile />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <SchedulerMobile toLeft={toLeft} />
      </Box>
    </>
  );
}

export default SchedulerPage;
