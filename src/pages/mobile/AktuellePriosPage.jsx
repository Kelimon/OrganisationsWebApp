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
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {!showVergangeneTodos ? (
          <AktuellePriosMobile
            toLeft={toLeft}
            setShowVergangeneTodos={setShowVergangeneTodos}
          />
        ) : (
          <MonatszieleMobile setShowVergangeneTodos={setShowVergangeneTodos} />
        )}
      </Box>
    </>
  );
}

export default AktuellePriosPage;
