import React, { useState } from "react";
import { Button, Paper, TextField } from "@mui/material";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: 15,
  backgroundColor: "#f5f5f5",
  maxHeight: 500,
  overflow: "auto",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "purple",
    },
    "&:hover fieldset": {
      borderColor: "purple",
    },
    "&.Mui-focused fieldset": {
      borderColor: "purple",
    },
  },
  "& .MuiInputLabel-root": {
    color: "purple",
  },
}));

function Notizen() {
  const [note, setNote] = useState("");

  return (
    <StyledPaper>
      <StyledTextField
        color="secondary"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        label="New Note"
        multiline
        rows={4}
        variant="outlined"
      />
      <Button
        onClick={() => {
          /* Add code to handle the note */
        }}
        variant="contained"
        color="secondary"
        style={{ marginTop: 5 }}
      >
        Save
      </Button>
    </StyledPaper>
  );
}

export default Notizen;
