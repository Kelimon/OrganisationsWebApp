import React, { useState, useEffect } from "react";
import { Button, Paper, TextField } from "@mui/material";
import { styled } from "@mui/system";
import GetNotizen from "../requests/GetNotizen";
import saveNotizen from "../requests/saveNotizen";
import { useAuth } from "./../contexts/Auth";

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch", // dies stellt sicher, dass die Kinder (children) den Container voll ausfüllen
  margin: theme.spacing(3),
  padding: theme.spacing(7),
  borderRadius: 51,
  backgroundColor: "white",
  maxHeight: 500,
  height: 550,
  overflow: "auto",
  boxShadow: theme.shadows[20], // Example shadow deptht dafür, dass Padding und Border in der Höhe berücksichtigt werden
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
  "& .MuiInputLabel-root": {
    color: "black",
  },
  "& .MuiInputBase-input": {
    color: "black", // Setze die Textfarbe des TextFields auf Weiß
  },
  flex: 1, // Added this line
}));

function Notizen({}) {
  const [note, setNote] = useState("");
  const [lastSavedNote, setLastSavedNote] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await GetNotizen({ currentUser });
      if (response.data.notizen.length > 0) {
        setNote(response.data.notizen);
      }
    };

    fetchTodos();
  }, [currentUser]);

  const saveNote = async () => {
    // Hier kommt Ihre Logik zum Speichern der Notiz
    await saveNotizen({ currentUser, note });
    setLastSavedNote(note); // Aktualisieren des zuletzt gespeicherten Textes
  };
  useEffect(() => {
    // Funktion, die alle 5 Sekunden ausgeführt wird
    const interval = setInterval(() => {
      if (note !== lastSavedNote) {
        saveNote(); // Speichern der Notiz
      }
    }, 2000); // 5000 Millisekunden = 5 Sekunden

    // Bereinigungsfunktion
    return () => clearInterval(interval);
  }, [note, lastSavedNote]);

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
    </StyledPaper>
  );
}

export default Notizen;
