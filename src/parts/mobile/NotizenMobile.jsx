import React, { useState, useEffect } from "react";
import { Button, Paper, TextField } from "@mui/material";
import { styled } from "@mui/system";
import GetNotizen from "../../requests/GetNotizen";
import saveNotizen from "../../requests/saveNotizen";
import { motion, AnimatePresence } from "framer-motion";

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex", // Added this line
  flexDirection: "column", // Added this line
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  marginTop: 34,
  borderRadius: 15, // Setzt die Rundung der Ecken
  backgroundColor: "#333e", // Dunklere Farbe für den Block
  height: "calc(100vh - 275px)",
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
}));

function NotizenMobile({ username, note, setNote, toLeft }) {
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

  const SaveData = async () => {
    if (note.length > 0) {
      saveNotizen({ username, note });
    }
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <>
        <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
          <StyledPaper>
            <StyledTextField
              value={note}
              onChange={(e) => setNote(e.target.value)}
              label="Neue Notizen für den Tag"
              multiline
              rows={21}
              variant="outlined"
              sx={{ color: "white" }}
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
        </motion.div>
      </>
    </AnimatePresence>
  );
}

export default NotizenMobile;
