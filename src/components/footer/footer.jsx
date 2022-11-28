import React from 'react';

// Styles
import classes from './footer.module.scss';

// MUI
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';


export const Footer = () => {
    const [value, setValue] = React.useState(0);

    return (
        <Box
            sx={{
            width: "100%",
            // border: "1px solid black"
        }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                sx={{backgroundColor: '#1975d1',}}
            >
                <span>Я футер</span>
                <BottomNavigationAction label="Recents" icon={<RestoreIcon/>}/>
                <BottomNavigationAction label="Favorites" icon={<FavoriteIcon/>}/>
                <BottomNavigationAction label="Nearby" icon={<LocationOnIcon/>}/>
            </BottomNavigation>
        </Box>
    )
}