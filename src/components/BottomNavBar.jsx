import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useNavigate } from "react-router-dom";

function BottomNavBar({ toLeft, setToLeft }) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [prevValue, setPrevValue] = React.useState(0);

  React.useEffect(() => {
    if (prevValue > value) {
      setToLeft(true);
    } else {
      setToLeft(false);
    }
    setPrevValue(value);
  }, [value]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        if (newValue === 0) {
          navigate("/todolist");
        } else if (newValue === 1) {
          navigate("/scheduler");
        } else if (newValue === 2) {
          navigate("/notizen");
        } else if (newValue === 3) {
          navigate("/aktuelleprios");
        } else if (newValue === 4) {
          navigate("/morgenroutine");
        }
      }}
      showLabels
      style={{
        position: "fixed",
        bottom: 0,
        width: "102%",
        backgroundColor: "#13131A",

        left: -5,
        border: "none",
      }}
      sx={{
        border: "none",
        "&:focus": {
          outline: "none",
        },
      }}
    >
      <BottomNavigationAction
        label="ToDoList"
        sx={{
          border: "none",
          "&:focus": {
            outline: "none",
          },
          color: "white",
        }}
      />
      <BottomNavigationAction
        label="Kalender"
        sx={{
          border: "none",
          "&:focus": {
            outline: "none",
          },
          color: "white",
        }}
      />
      <BottomNavigationAction
        label="Notizen"
        sx={{
          border: "none",
          "&:focus": {
            outline: "none",
          },
          color: "white",
        }}
      />
      <BottomNavigationAction
        label="Prioritäten"
        sx={{
          border: "none",
          "&:focus": {
            outline: "none",
          },
          color: "white",
        }}
      />
      <BottomNavigationAction
        label="Routine"
        sx={{
          border: "none",
          "&:focus": {
            outline: "none",
          },
          color: "white",
        }}
      />
    </BottomNavigation>
  );
}

export default BottomNavBar;
