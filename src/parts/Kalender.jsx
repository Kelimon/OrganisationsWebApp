import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // import default styles
import { styled } from "@mui/system";
import {Paper} from "@mui/material"

const StyledPaper = styled(Paper)(({ theme }) => ({
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: 15, // Setzt die Rundung der Ecken
    backgroundColor: "#333e", // Dunklere Farbe für den Block
    maxHeight: 500, // Feste Größe für den Block
    height: 550,
    overflow: "auto", // Ermöglicht Scrollen, wenn der Inhalt zu groß ist
}));

const StyledCalendar = styled(Calendar)({
  width: '50%',
  heigth: "100%",
});

const Kalender = () => {
  const [date, setDate] = useState(new Date()); // keep selected date in the state

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <StyledPaper>
      <StyledCalendar onChange={onChange} value={date} />
    </StyledPaper>
  );
};

export default Kalender;
