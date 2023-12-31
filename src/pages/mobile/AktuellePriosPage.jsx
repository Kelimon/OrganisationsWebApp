import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import AktuellePrios from "../../parts/AktuellePrios";
import Monatsziele from "../../parts/Monatsziele";
import Header from "../../parts/Header";
import AktuellePriosMobile from "../../parts/mobile/AktuellePriosMobile";
import MonatszieleMobile from "../../parts/mobile/MonatszieleMobile";
import HeaderMobile from "../../components/HeaderMobile";

function AktuellePriosPage({ currentUser, priosData, setPriosData, mzieleData, setMzieleData, toLeft, setIsLoggedIn }) {
  const [showVergangeneTodos, setShowVergangeneTodos] = useState(false);
  return (
    <>
      <HeaderMobile username={currentUser} setIsLoggedIn={setIsLoggedIn}/>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        {!showVergangeneTodos ? (
          <AktuellePriosMobile
            username={currentUser}
            setShowVergangeneTodos={setShowVergangeneTodos}
            showVergangeneTodos={showVergangeneTodos}
            todos={priosData}
            setTodos={setPriosData}
            toLeft={toLeft}
          />
        ) : (
          <MonatszieleMobile
            username={currentUser}
            showVergangeneTodos={showVergangeneTodos}
            setShowVergangeneTodos={setShowVergangeneTodos}
            todos={mzieleData}
            setTodos={setMzieleData}
          />
        )}
      </Box>
    </>
  );
}

export default AktuellePriosPage;
