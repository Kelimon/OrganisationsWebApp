import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  LocalizationProvider,
  StaticDatePicker,
  PickersDay,
} from "@mui/x-date-pickers";
import Dayjs from "dayjs";
import { styled } from "@mui/system";
import dayjs from "dayjs";
import "./../../components/calender.css";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import CircularProgress from "@material-ui/core/CircularProgress";
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
import "./../../testing/animation.css";
import GetScheduleData from "../../requests/GetScheduleData";
import saveScheduleData from "../../requests/saveScheduleData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Clock from "../../components/Clock";
import { useAuth } from "./../../contexts/Auth";

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  borderRadius: 15,
  backgroundColor: "#333e",
  marginTop: 34,
  height: "calc(100vh - 245px)",
  overflow: "auto",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
}));

const HighlightedDay = styled(PickersDay)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

// Define a custom day component
const CustomDay = (props) => {
  const { meetings, day, ...other } = props;
  const meetingOnThisDay = meetings.find((meeting) =>
    meeting.date.isSame(day, "day")
  );
  const isSelected = !!meetingOnThisDay;

  return (
    <HighlightedDay
      {...other}
      day={day}
      selected={isSelected}
      style={{
        backgroundColor: isSelected ? meetingOnThisDay.color : undefined,
      }}
    />
  );
};

export default function SchedulerMobile({ username, toLeft }) {
  const [value, setValue] = React.useState(Dayjs());
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [startHour, setStartHour] = React.useState(
    Dayjs().startOf("hour").add(1, "hour")
  );
  const [endHour, setEndHour] = React.useState(
    Dayjs().startOf("hour").add(2, "hour")
  );
  const [meetings, setMeetings] = React.useState([]);
  const [color, setColor] = React.useState("#9c27b0"); // default color
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [showCalendar, setShowCalendar] = React.useState(true);
  const [editing, setEditing] = React.useState(false);
  const [editingIndex, setEditingIndex] = React.useState(null);
  const [editingMeetingId, setEditingMeetingId] = React.useState(null);
  const { currentUser, isAdmin } = useAuth();
  const [isLoading, setIsLoading] = React.useState(true);
  const isFirstRender = React.useRef(true);
  const initialData = React.useRef(null);

  React.useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      const response = await GetScheduleData({ currentUser });
      if (response?.length > 0) {
        const meetingsWithDayjsDates = response.map((meeting) => ({
          ...meeting,
          date: Dayjs(meeting.date), // convert date string or number to Dayjs object
          start: Dayjs(meeting.start), // convert start time string or number to Dayjs object
          end: Dayjs(meeting.end), // convert end time string or number to Dayjs object
        }));
        setMeetings(meetingsWithDayjsDates);
        initialData.current = meetingsWithDayjsDates;
      }
      setIsLoading(false);
    };

    fetchTodos();
  }, [currentUser]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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

  const handleEdit = (index) => {
    const meetingToEdit = meetings[index];
    setTitle(meetingToEdit.title);
    setDescription(meetingToEdit.description);
    setStartHour(meetingToEdit.start);
    setEndHour(meetingToEdit.end);
    setColor(meetingToEdit.color);
    setValue(meetingToEdit.date);
    setEditing(true);
    setEditingIndex(index);
    setOpen(true);
  };

  React.useEffect(() => {
    let scheduleData = meetings;
    if (meetings?.length > 0) {
      saveScheduleData({ currentUser, scheduleData });
    }
  }, [meetings]);

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

  const handleDelete = () => {
    let array = [...meetings];
    array.splice(editingIndex, 1);
    setMeetings(array);
    setOpen(false);
    setEditing(false);
    setEditingIndex(null); // clear editing index when done deleting
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
      <AnimatePresence exitBeforeEnter>
        {showCalendar ? (
          <>
            <motion.div
              initial="out"
              animate="in"
              exit="out"
              variants={pageTransition}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  height: "50px",
                }}
              >
                <Button
                  onClick={() => {
                    setShowCalendar(false);
                  }}
                >
                  Termine
                </Button>
              </Box>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <StaticDatePicker
                  slotProps={{
                    toolbar: { toolbarFormat: "ddd DD MMMM", hidden: false },
                    day: {
                      meetings,
                    },
                  }}
                  orientation="portrait"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                    if (isSmallScreen) {
                      setShowCalendar(false);
                    }
                  }}
                  sx={{
                    height: "90%",
                    backgroundColor: "#f0f0f5",
                    fontSize: 100,
                    color: "black",
                    "& .MuiPickersDay-daySelected": {
                      backgroundColor: "grey",
                      color: "black",
                      "&:hover": {
                        backgroundColor: "grey",
                        color: "black",
                      },
                    },
                    "& .MuiIconButton-label": {
                      color: "black",
                    },
                    "& .MuiPickersDay-day": {
                      color: "black",
                      // Setzen Sie die gewünschte Höhe
                    },
                    "& .MuiDayCalendar-weekDayLabel": {
                      color: "black",
                    },
                    "& .MuiPickersCalendarHeader-switchViewButton": {
                      color: "black",
                    },
                    "& .MuiPickersArrowSwitcher-button": {
                      color: "black",
                    },
                    "& .MuiPickersDay-root": {
                      color: "black",
                    },
                    "& .MuiPickersDay-root.Mui-selected": {
                      backgroundColor: "grey",
                    },
                    "& .MuiButton-root": {
                      display: "none",
                    },
                  }}
                  slots={{
                    day: CustomDay,
                  }}
                  renderDay={(date, selectedDates, DayComponentProps) => {
                    const hasMeeting = meetings.some((meeting) =>
                      meeting.date.isSame(date, "day")
                    );
                    const backgroundColor = meetingOnThisDay
                      ? meetingOnThisDay.color
                      : "grey";
                    return (
                      <Box
                        sx={{
                          position: "relative",
                          "& .MuiPickersDay-root": {
                            backgroundColor,
                            color: "black",
                          },
                        }}
                      >
                        <DayComponent
                          {...DayComponentProps}
                          onClick={() => handleClickDate(date)}
                        />
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
              </div>{" "}
            </motion.div>
          </>
        ) : (
          <>
            {" "}
            <motion.div
              initial="out"
              animate="in"
              exit="out"
              variants={pageTransition}
              style={{ paddingBottom: "45px" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                }}
              >
                <Button onClick={() => setShowCalendar(true)}>Zurück</Button>
                <Typography
                  variant="h6"
                  color={"black"}
                  fontSize={25}
                  sx={{ marginRight: 2 }}
                >
                  {value.format("ddd, MMM D")}
                </Typography>
                <IconButton
                  aria-label="delete"
                  color="primary"
                  onClick={handleClickOpen}
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Termin hinzufügen</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Titel"
                    type="text"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <MobileTimePicker
                    label="Beginn"
                    value={startHour}
                    onChange={setStartHour}
                    ampm={false}
                  />

                  <MobileTimePicker
                    label="Ende"
                    value={endHour}
                    onChange={setEndHour}
                    ampm={false}
                  />
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
                  <CirclePicker
                    color={color}
                    onChangeComplete={(color) => setColor(color.hex)}
                  />
                </DialogContent>
                <DialogActions>
                  {editing && (
                    <Button color="primary" onClick={handleDelete}>
                      löschen
                    </Button>
                  )}
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Display Meetings */}
              {meetings
                ?.filter((meeting) => meeting.date.isSame(value, "day"))
                ?.sort((a, b) => a.start.unix() - b.start.unix()) // sort meetings by start time
                ?.map((meeting, index) => (
                  <Paper
                    sx={{
                      borderRadius: 2,
                      backgroundColor: meeting.color,
                      margin: "10px",
                      padding: "10px",
                    }}
                    key={meeting.id} // assuming each meeting has a unique id field
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        color="white"
                        variant="h6"
                        fontWeight="fontWeightBold"
                        fontSize={20}
                      >
                        {meeting.title}
                      </Typography>
                      <Box sx={{ display: "flex" }}>
                        <Typography
                          color="white"
                          variant="subtitle1"
                          sx={{ marginTop: 1 }}
                        >
                          {meeting.start.format("HH:mm")} -{" "}
                          {meeting.end.format("HH:mm")}
                        </Typography>

                        <IconButton
                          aria-label="edit"
                          color="white"
                          onClick={() => handleEdit(meetings.indexOf(meeting))} // assuming each meeting has a unique id field
                          sx={{ color: "white" }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        height: "1px",
                        backgroundColor: "black",
                        margin: "5px",
                      }}
                    />
                    {/*<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>*/}
                    <Grid container>
                      <Grid item xs={10}>
                        <Typography
                          color="white"
                          variant="body1"
                          sx={{ marginRight: 1 }}
                        >
                          {meeting.description}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Clock start={meeting.start} end={meeting.end} />
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </LocalizationProvider>
  );
}
