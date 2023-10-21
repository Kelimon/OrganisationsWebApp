import React, { useState, useEffect } from "react";
import { Button, Paper, TextField } from "@mui/material";
import { styled } from "@mui/system";
import GetNotizen from "../requests/GetNotizen";
import saveNotizen from "../requests/saveNotizen";
import { useAuth } from "./../contexts/Auth";

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex", // Added this line
  flexDirection: "column", // Added this line
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: 15, // Setzt die Rundung der Ecken
  backgroundColor: "#333", // Dunklere Farbe für den Block
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

function Notizen({}) {
  const [note, setNote] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await GetNotizen({ currentUser });
      console.log("notizen data: ", response.data.notizen);
      if (response.data.notizen.length > 0) {
        setNote(response.data.notizen);
      }
    };

    fetchTodos();
  }, [currentUser]);

  const SaveData = async () => {
    if (note.length > 0) {
      saveNotizen({ currentUser, note });
    }
  };

  return (
    <StyledPaper>
      <StyledTextField
        value={note}
        onChange={(e) => setNote(e.target.value)}
        label="Neue Notizen für den Tag"
        multiline
        rows={18}
        variant="outlined"
        sx={{ color: "white", size: 100 }}
      />
      <Button
        onClick={() => {
          SaveData();
        }}
        variant="contained"
        color="secondary"
        style={{ marginTop: 5, display: "flex", flexDirection: "column" }}
      >
        Save
      </Button>
    </StyledPaper>
  );
}

export default Notizen;
