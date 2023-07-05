import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import Notizen from "../../parts/Notizen";
import Header from "../../parts/Header";
import NotizenMobile from "../../parts/mobile/NotizenMobile";
import HeaderMobile from "../../components/HeaderMobile";

function NotizenPage({ currentUser, note, setNote, toLeft, setIsLoggedIn  }) {
  return (
    <>
      <HeaderMobile username={currentUser} setIsLoggedIn={setIsLoggedIn}/>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <NotizenMobile username={currentUser} note={note} setNote={setNote} toLeft={toLeft} />
      </Box>
    </>
  );
}

export default NotizenPage;
