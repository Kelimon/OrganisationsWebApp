import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import Dayjs from "dayjs";
import { styled } from "@mui/system";
import dayjs from "dayjs";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { isDayjs } from "dayjs";
import { CirclePicker } from "react-color";
import AddIcon from "@mui/icons-material/Add";
import "dayjs/locale/de"; // import German locale
import { useMediaQuery, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import "./../testing/animation.css";
import GetScheduleData from "../requests/GetScheduleData";
import saveScheduleData from "../requests/saveScheduleData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Clock from "../components/Clock";

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  borderRadius: 15,
  backgroundColor: "#333e",
  maxHeight: 532,
  height: 550,
  overflow: "auto",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
}));

const TimeSlot = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  margin: theme.spacing(1, 2),
  "&:after": {
    content: '""',
    flex: 1,
    borderBottom: "1px solid white",
    marginRight: theme.spacing(1),
  },
}));



export default function Scheduler({ username }) {
  const [value, setValue] = React.useState(Dayjs());
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [startHour, setStartHour] = React.useState(null);
  const [endHour, setEndHour] = React.useState(null);
  const [meetings, setMeetings] = React.useState([]);
  const [color, setColor] = React.useState("#9c27b0"); // default color
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [showCalendar, setShowCalendar] = React.useState(true);
  const [editing, setEditing] = React.useState(false);
  const [editingIndex, setEditingIndex] = React.useState(null);
  const [editingMeetingId, setEditingMeetingId] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(false)
    setEditingIndex(null)
  };

  function MeetingProgress() {
    // Convert hours to percentage of 12-hour clock
    const startPercent = (1 / 12) * 100;
    const endPercent = (3 / 12) * 100;
  
    return (
      <div>
        <CircularProgress variant="determinate" value={startPercent} />
        <CircularProgress variant="determinate" value={endPercent} />
      </div>
    );
  }

  const handleSubmit = () => {
    setOpen(false);
    if (editing) {
      // If we're editing, replace the meeting at the current index
      setMeetings((prevMeetings) => [
        ...prevMeetings.slice(0, editingIndex),
        {
          date: value,
          title: title,
          description: description,
          start: startHour,
          end: endHour,
          color: color,
        },
        ...prevMeetings.slice(editingIndex + 1),
      ]);
    } else {
      // Else, add a new meeting as before
      setMeetings((prevMeetings) => [
        ...prevMeetings,
        {
          date: value,
          title: title,
          description: description,
          start: startHour,
          end: endHour,
          color: color,
        },
      ]);
    }
    setColor("#9c27b0"); // reset color after adding meeting
    setEditing(false);
    setEditingIndex(null); // clear editing index when done editing
  };

  React.useEffect(() => {
    console.log("useeffect entered");
    const fetchTodos = async () => {
      console.log("fetchtodosentered");
      const response = await GetScheduleData({ username });
      console.log("schedule length and data", response);
      if (response.length > 0) {
        const meetingsWithDayjsDates = response.map((meeting) => ({
          ...meeting,
          date: Dayjs(meeting.date), // convert date string or number to Dayjs object
          start: Dayjs(meeting.start), // convert start time string or number to Dayjs object
          end: Dayjs(meeting.end), // convert end time string or number to Dayjs object
        }));
        setMeetings(meetingsWithDayjsDates);
      }
    };

    fetchTodos();
  }, [username]);

  const handleEdit = (index) => {
    console.log("editing and paramter id: ", editingIndex, index)
    const meetingToEdit = meetings[index];
    setTitle(meetingToEdit.title);
    setDescription(meetingToEdit.description);
    setStartHour(meetingToEdit.start);
    setEndHour(meetingToEdit.end);
    setColor(meetingToEdit.color);
    setValue(meetingToEdit.date);
    setEditing(true);
    setEditingIndex(index); // set the index of the meeting being edited
    setOpen(true);
};


  React.useEffect(() => {
    let scheduleData = meetings;
    if (meetings.length > 0) {
      saveScheduleData({ username, scheduleData });
    }
  }, [meetings]);

  const pageTransition = {
    in: {
      opacity: 10,
      x: 0,
    },
    out: {
      opacity: 100,
      x: "-1000vw",
    },
  };

  const handleDelete = () => {
    let array = [...meetings]
    array.splice(editingIndex, 1)
    setMeetings(array);
    setOpen(false);
    setEditing(false);
    setEditingIndex(null); // clear editing index when done deleting
  };

  
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
        <StyledPaper>
          <StaticDatePicker
            slotProps={{
              toolbar: { toolbarFormat: "ddd DD MMMM", hidden: false },
            }}
            orientation="portrait"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
              console.log("scheduler", newValue);
            }}
            sx={{
              height: "100%",
              backgroundColor: "#333e",
              borderRight: "3px solid black",
              fontSize: 100,
              width: "50%",
              color: "white",
              "& .MuiPickersDay-daySelected": {
                backgroundColor: "grey",
                color: "white",
                "&:hover": {
                  backgroundColor: "grey",
                  color: "white",
                },
              },
              "& .MuiIconButton-label": {
                color: "white",
              },
              "& .MuiPickersDay-day": {
                color: "white",
              },
              "& .MuiDayCalendar-weekDayLabel": {
                color: "white",
              },
              "& .MuiPickersCalendarHeader-switchViewButton": {
                color: "white",
              },
              "& .MuiPickersArrowSwitcher-button": {
                color: "white",
              },
              "& .MuiPickersDay-root": {
                color: "white",
              },
              "& .MuiPickersDay-root.Mui-selected": {
                backgroundColor: "grey",
              },
              "& .MuiButton-root": {
                display: "none",
              },
            }}
            renderDay={(date, selectedDates, DayComponentProps) => {
              const hasMeeting = meetings.some((meeting) => {
                return meeting.date.isSame(date, "day");
              });
              return (
                <Box sx={{ position: "relative" }}>
                  <DayComponent {...DayComponentProps} />
                  {hasMeeting && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        backgroundColor: "red",
                      }}
                    />
                  )}
                </Box>
              );
            }}
          />
          {value && (
            <Paper sx={{ height: "100%", width: "66%", overflow: "auto", backgroundColor: "#333e" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0" }}>
                <Typography color={"white"} sx={{ fontSize: 30, marginLeft: 4 }}>
                  {value.format("ddd, MMM D")}
                </Typography>
                <IconButton
                  aria-label="delete"
                  color="secondary"
                  onClick={handleClickOpen}
                  sx={{ outlineColor: "#333e" }}
                  disableRipple
                  disableFocusRipple
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <Dialog
                open={open}
                onClose={handleClose}
                sx={{
                  borderRadius: 10,
                  "& .MuiDialog-paper": {
                    borderRadius: 10,
                    backgroundColor: "white",
                  },
                }}
              >
                <DialogTitle sx={{ marginLeft: 1 }}>Termin erstellen</DialogTitle>
                <DialogContent sx={{ borderRadius: 20 }}>
                  <TextField
                    autoFocus
                    margin="dense"
                    sx={{ marginTop: 3 }}
                    id="title"
                    label="Titel"
                    type="text"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <MobileTimePicker label="Beginn" value={startHour} onChange={setStartHour} ampm={false} />

                  <MobileTimePicker label="Ende" value={endHour} onChange={setEndHour} ampm={false} />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="description"
                    label="Beschreibung"
                    type="text"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <CirclePicker color={color} onChangeComplete={(color) => setColor(color.hex)} />
                </DialogContent>
                <DialogActions>
                  {editing && (
                    <Button color="primary" onClick={handleDelete}>
                      löschen
                    </Button>
                  )}
                  <Button
                    onClick={handleClose}
                    color="secondary"
                    sx={{ marginBottom: 1 }}
                    disableRipple
                    disableFocusRipple
                  >
                    Zurück
                  </Button>
                  <Button onClick={handleSubmit} color="secondary" sx={{ marginRight: 3, marginBottom: 1 }}>
                    Hinzufügen
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Display Meetings */}
              {meetings
                .filter((meeting) => meeting.date.isSame(value, "day"))
                .sort((a, b) => a.start.unix() - b.start.unix()) // sort meetings by start time
                .map((meeting, index) => (
                  <Paper
                    sx={{
                      borderRadius: 2,
                      backgroundColor: meeting.color,
                      margin: "10px",
                      padding: "10px",
                    }}
                    key={index}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography color="white" variant="h6" fontWeight="fontWeightBold" fontSize={21}>
                        {meeting.title}
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography color="white" variant="subtitle1">
                        {meeting.start.format("HH:mm")} - {meeting.end.format("HH:mm")}
                      </Typography>
                      
                      <Clock start={meeting.start} end={meeting.end}/>
                      </Box>
                      
                    
                    </Box>
                    <Box sx={{ height: "1px", backgroundColor: "black", margin: "5px", marginTop: "-3px" }} />
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography color="white" variant="body1">
                        {meeting.description}
                      </Typography>
                      <IconButton
                        aria-label="edit"
                        color="white"
                        onClick={() => handleEdit(meetings.indexOf(meeting))}
                        sx={{ color: "white" }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </Paper>
                ))}
            </Paper>
          )}
        </StyledPaper>
      </LocalizationProvider>
    );
  }

