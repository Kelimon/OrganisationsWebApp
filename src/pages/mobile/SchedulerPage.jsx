import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import Scheduler from "../../parts/Scheduler";
import Header from "../../parts/Header";
import SchedulerMobile from "../../parts/mobile/SchedulerMobile";
import HeaderMobile from "../../components/HeaderMobile";

function SchedulerPage({ meetings, setMeetings, toLeft }) {
  console.log(meetings);
  return (
    <>
      <HeaderMobile/>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <SchedulerMobile meetings={meetings} setMeetings={setMeetings} toLeft={toLeft} />
      </Box>
    </>
  );
}

export default SchedulerPage;
