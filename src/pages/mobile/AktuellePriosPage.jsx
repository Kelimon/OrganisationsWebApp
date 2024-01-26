import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import AktuellePrios from "../../parts/AktuellePrios";
import Monatsziele from "../../parts/Monatsziele";
import Header from "../../parts/Header";
import AktuellePriosMobile from "../../parts/mobile/AktuellePriosMobile";
import MonatszieleMobile from "../../parts/mobile/MonatszieleMobile";
import HeaderMobile from "../../components/HeaderMobile";
import { useAuth } from "./../../contexts/Auth";

function AktuellePriosPage({ toLeft }) {
  const [showVergangeneTodos, setShowVergangeneTodos] = useState(false);
  return (
    <>
      <HeaderMobile />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        {!showVergangeneTodos ? (
          <AktuellePriosMobile toLeft={toLeft} />
        ) : (
          <MonatszieleMobile />
        )}
      </Box>
    </>
  );
}

export default AktuellePriosPage;
