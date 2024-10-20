import * as React from 'react';

import BottomNavigation from '@mui/material/BottomNavigation';

import HomeIcon from '@mui/icons-material/Home';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import GroupIcon from '@mui/icons-material/Group';
import UndoIcon from '@mui/icons-material/Undo';


import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";



export default function SimpleBottomNavigation() {

	const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
		color: #298795;
		top: -20px;
		&.Mui-selected {
	  		color: #953729;
		}
		
  `);

  	const pathname = window.location.pathname; 
    const [value, setValue] = React.useState(pathname);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
  return (
	
   <Paper sx={{ position: 'fixed', bottom: 10, left: 0, right: 0 }} elevation={10}>
   		<BottomNavigation value={value} onChange={handleChange} showLabels={true} sx={{ position: 'fixed', bottom: 10, width: 1.0 }} >
   			<BottomNavigationAction label="Accueil" value="/home" icon={<HomeIcon />} component={Link} to='/home'/>
			<BottomNavigationAction label="Disponibles" value="/equipementsdispo" icon={<EventAvailableIcon /> } component={Link} to='/equipementsdispo'/>                
			<BottomNavigationAction label="Emprunts" value="/equipementsemprunt" icon={<EventBusyIcon />}  component={Link} to='/equipementsemprunt'/>
			<BottomNavigationAction label="Obtenir" value="/utilisateurs" icon={<GroupIcon />} component={Link} to='/utilisateurs'/>
			<BottomNavigationAction label="Restitution" value="/barecodereader" icon={<UndoIcon />} component={Link} to='/barecodereader'/>
			
        </BottomNavigation>
    </Paper>
  );

}
