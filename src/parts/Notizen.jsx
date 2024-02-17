import React, { useState, useEffect } from "react";
import { Button, Paper, TextField } from "@mui/material";
import { styled } from "@mui/system";
import GetNotizen from "../requests/GetNotizen";
import saveNotizen from "../requests/saveNotizen";
import { useAuth } from "./../contexts/Auth";

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(3),
  padding: theme.spacing(7),
  borderRadius: 51,
  backgroundColor: "white",
  maxHeight: 500,
  height: 550,
  overflow: "auto",
  boxShadow: theme.shadows[20], // Example shadow depth
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
  flex: 1, // Nimmt den verfügbaren Platz ein
  "& .MuiOutlinedInput-root": {
    height: "110%", // Füllt den umgebenden Container aus
    "&.Mui-focused": {
      height: "100%", // Stellt sicher, dass der Fokus-Stil die volle Höhe beibehält
    },
  },
  "& .MuiOutlinedInput-inputMultiline": {
    height: "100%", // Stellt sicher, dass der mehrzeilige Textbereich den Container ausfüllt
    overflow: "auto", // Erlaubt das Scrollen, falls der Text die Höhe überschreitet
  },
  "& .MuiOutlinedInput-multiline": {
    padding: 0, // Entfernt Padding innerhalb des Textfelds, falls gewünscht
  },
  "& .MuiFormControl-root": {
    height: "100%", // Stellt sicher, dass der FormControl die volle Höhe einnimmt
  },
  minHeight: "100px", // Minimale Höhe des Textfelds
  // Entfernen Sie Randabstände, falls diese von MUI gesetzt wurden
  margin: 0,
  "& .MuiOutlinedInput-root": {
    // ... andere Stile ...
    "& fieldset": {
      borderColor: "black", // Farbe des Randes
      borderWidth: "2px", // Hier stellen Sie die Dicke des Randes ein
    },
    "&:hover fieldset": {
      borderColor: "black", // Farbe des Randes beim Hover
      borderWidth: "2px", // Dicke des Randes beim Hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "black", // Farbe des Randes beim Fokus
      borderWidth: "2px", // Dicke des Randes beim Fokus
    },
  },
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
        rows={20} // Diese Eigenschaft könnte nun irrelevant sein, da wir die Höhe manuell steuern
        variant="outlined"
        sx={{
          height: "100%", // Füllt den StyledPaper Container aus
          width: "100%", // Füllt die Breite des StyledPaper Containers aus
        }}
      />
    </StyledPaper>
  );
}

export default Notizen;
