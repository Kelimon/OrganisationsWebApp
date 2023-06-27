import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function BottomNavBar() {
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);

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
            style={{ position: 'fixed', bottom: 0, width: '100%' }}
        >
            <BottomNavigationAction label="ToDoList" />
            <BottomNavigationAction label="Page2" />
            <BottomNavigationAction label="Page3" />
            <BottomNavigationAction label="Page4" />
            <BottomNavigationAction label="Page5" />
        </BottomNavigation>
    );
}

export default BottomNavBar;
