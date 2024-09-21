import  React, { useEffect }  from 'react';
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import '../App.css';
import Container from '@mui/material/Container';

import Box from '@mui/material/Box';
import logo from '../logo_club.png';

import {auth} from '../firebase.config';
import {  signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

import { useNavigate } from 'react-router-dom'

import LogoutIcon from '@mui/icons-material/LogoutRounded';
import Search from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import {  createTheme, ThemeProvider } from '@mui/material/styles';


function Header2() {
    
  const navigate = useNavigate();  

	const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
			navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
			console.log(error)
        });
	}

  const handleAnalyse = () => {               
    
    navigate("/equipmentanalyse");
    console.log("Analyse")
    
}


  const defaultTheme = createTheme({
    palette: {
        primary: {
          main: "#298795" // This is an orange looking color
                  },
          }
    }
  );

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          //const uid = user.uid;
          //const email = user.email;
          //console.log("logged in")
        } else {
          // User is signed out
          // ...
          navigate("/");
          //console.log("user is logged out")
        }
      });
     
}, [navigate])

  return (
    <ThemeProvider theme={defaultTheme}>
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="sticky" className="App-header" sx={{ backgroundColor: '#E7EFE7'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        
		  <img src={logo} className="App-logo" alt="logo" />
		  
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'flex' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#298795',
              textDecoration: 'none',
            }} >
            Matériel
          </Typography>
          <IconButton color="primary" aria-label="Logout"  onClick={() => {
            handleAnalyse();
          }}>
          <Search sx={{ color: '#E345J' }}/>
          
          </IconButton>

          <IconButton color="primary" aria-label="Logout"  onClick={() => {
            handleLogout();
          }}>
          <LogoutIcon sx={{ color: '#E345J' }}/>
          
          </IconButton>
          
        </Toolbar>
        
      </Container>
      
    </AppBar>
    </Box>
    </ThemeProvider>
  );
}
export default Header2;