import React, { useState, useEffect } from "react";
import { Button, Paper, TextField, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import GetNotizen from "../../requests/GetNotizen";
import saveNotizen from "../../requests/saveNotizen";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./../../contexts/Auth";

const StyledPaper = styled(Box)(({ theme }) => ({
  display: "flex", // Added this line
  flexDirection: "column", // Added this line
  margin: theme.spacing(2),
  padding: theme.spacing(0),
  marginTop: 34,
  borderRadius: 15, // Setzt die Rundung der Ecken
  backgroundColor: "#f0f0f5", // Dunklere Farbe für den Block
  height: "calc(100vh - 275px)",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
      borderRadius: 13,
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
}));

function NotizenMobile({ toLeft }) {
  const [note, setNote] = useState("");
  const [lastSavedNote, setLastSavedNote] = useState("");
  const { currentUser } = useAuth();

  localStorage.setItem("test", "#NoitzenMobile");
  const pageTransition = {
    in: {
      opacity: 10,
      x: 0,
    },
    out: {
      opacity: 100,
      x: "-1.5vw",
    },
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await GetNotizen({ currentUser });
      if (response?.data?.notizen?.length > 0) {
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

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    // Event-Handler, der bei Größenänderung des Fensters aufgerufen wird
    function handleResize() {
      setWindowHeight(window.innerHeight);
    }

    // Event-Listener hinzufügen
    window.addEventListener("resize", handleResize);

    // Initialwert setzen
    handleResize();

    // Bereinigungsfunktion, um den Event-Listener zu entfernen
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Berechnung der rowsCount basierend auf der Fensterhöhe
  const rowsCount = Math.floor((windowHeight - 100) / 28); // Beispiel: 24px pro Zeile

  useEffect(() => {
    // Funktion, die alle 5 Sekunden ausgeführt wird
    const interval = setInterval(() => {
      if (note !== lastSavedNote) {
        saveNote(); // Speichern der Notiz
      }
    }, 1000); // 5000 Millisekunden = 5 Sekunden

    // Bereinigungsfunktion
    return () => clearInterval(interval);
  }, [note, lastSavedNote]);
  const localstoragetest = localStorage.getItem("test");
  return (
    <AnimatePresence exitBeforeEnter>
      <>
        <motion.div
          initial="out"
          animate="in"
          exit="out"
          variants={pageTransition}
        >
          <StyledPaper>
            <StyledTextField
              value={note}
              onChange={(e) => setNote(e.target.value)}
              label="Neue Notizen für den Tag"
              multiline
              rows={rowsCount}
              variant="outlined"
              sx={{ color: "black" }}
            />
          </StyledPaper>
          <Typography color="black">{localstoragetest}</Typography>
        </motion.div>
      </>
    </AnimatePresence>
  );
}

export default NotizenMobile;
