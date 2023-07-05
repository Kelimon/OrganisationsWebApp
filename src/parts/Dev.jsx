import React, { useState, useEffect } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import GetNotizen from "../requests/GetNotizen";
import saveNotizen from "../requests/saveNotizen";

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex", // Added this line
  flexDirection: "column", // Added this line
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: 15, // Setzt die Rundung der Ecken
  backgroundColor: "#333e", // Dunklere Farbe für den Block
  maxHeight: 500, // Feste Größe für den Block
  height: 1100,
  overflow: "auto", // Ermöglicht Scrollen, wenn der Inhalt zu groß ist
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiInputBase-input": {
    color: "white", // Setze die Textfarbe des TextFields auf Weiß
  },
  flex: 1, // Added this line
}));

function Dev({ username }) {
  return (
    <StyledPaper>
      <Grid container>
        <Grid item xs={12}>
          <Typography color={"white"} variant="h6">
            Update 03.07.23:
          </Typography>
        </Grid>
        <Grid item>
          <Typography color={"white"}>-automatisches Einloggen eingebaut</Typography>
        </Grid>
        <Grid item>
          <Typography color={"white"}>-Termine deleten, editieren added</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color={"white"} variant="h6">
            Update 05.07.23:
          </Typography>
        </Grid>
        <Grid item>
          <Typography color={"white"}>-Visualisierung Terminzeit added</Typography>
        </Grid>
        <Grid item>
          <Typography color={"yellow"}>-Bei Textfeld Enter drücken löst jetzt die Buttons aus</Typography>
        </Grid>
      </Grid>
    </StyledPaper>
  );
}

export default Dev;
