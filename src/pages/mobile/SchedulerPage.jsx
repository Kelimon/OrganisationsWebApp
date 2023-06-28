import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import Scheduler from "../../parts/Scheduler";
import Header from "../../parts/Header";
import SchedulerMobile from "../../parts/mobile/SchedulerMobile";
import HeaderMobile from "../../components/HeaderMobile";

function SchedulerPage({ currentUser, meetings, setMeetings, toLeft }) {
  console.log(meetings);
  return (
    <>
      <HeaderMobile username={currentUser} />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <SchedulerMobile username={currentUser} meetings={meetings} setMeetings={setMeetings} toLeft={toLeft} />
      </Box>
    </>
  );
}

export default SchedulerPage;
