import React, { useState } from "react";
import { Button, Paper, TextField } from "@mui/material";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',  // Added this line
  flexDirection: 'column',  // Added this line
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: 15, // Setzt die Rundung der Ecken
  backgroundColor: "#333e", // Dunklere Farbe für den Block
  maxHeight: 500, // Feste Größe für den Block
  height: 1100,
  overflow: "auto", // Ermöglicht Scrollen, wenn der Inhalt zu groß ist
  width: '21.25vw' // 1/4 of the viewport width
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
  flex: 1,  // Added this line
}));

function Notizen() {
  const [note, setNote] = useState("");

  return (
    <StyledPaper>
      <StyledTextField
        color="secondary"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        label="Neue Notizen für den Tag"
        multiline
        rows={18}
        variant="outlined"
        fullWidth
        />
      <Button
  onClick={() => {
    /* Add code to handle the note */
  }}
  variant="contained"
  color="secondary"
  style={{ marginTop: 5, display: 'flex', flexDirection: 'column' }}
>
  Save
</Button>

    </StyledPaper>
  );
}

export default Notizen;
