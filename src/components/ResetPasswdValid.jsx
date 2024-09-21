import React from 'react';
//import React, { useState } from 'react';

//import { useNavigate } from 'react-router-dom'

//import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
//import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {  createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../logo_club.png';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const ResetPasswdValid = () => {
    //const navigate = useNavigate();
    //const [setErrors] = useState('');
    //const [setLoading] = useState(false);

    


    function Copyright(props) {
        return (
          <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright ©'+new Date().getFullYear()+' N. NOEL - '}
            <Link color="inherit" href="https://plongee-thionville.fr/">
            plongee-thionville.fr
            </Link>{' - v' + process.env.REACT_APP_VERSION}
            
            <br /><br />
          </Typography>
        );
      }

    const defaultTheme = createTheme({
        palette: {
            primary: {
               main: "#298795" // This is an orange looking color
                      },
            secondary: {
               main: "#ffcc80" //Another orange-ish color
                       }
                  },

    });
    
    return (
        <>

<ThemeProvider theme={defaultTheme}>
    <div align="center">
    <Paper sx={{ align: clearInterval, maxWidth: 600, top: 50 }} elevation={10}>
      <Container component="main" maxWidth="xs" >
      
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <img src={logo} className="App-logo" alt="logo" />
          
          <Typography component="h1" variant="h5">
            Demande d'un nouveau mot de passe 
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1, color: '#298795' }}>

          <Typography variant="body1" color="text.primary" align="center" >
            Demande réalisée avec succès. <br />
            Merci de consulter votre boite mail
            <br /><br />
          </Typography>

            
            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2" sx={{color: '#298795'}}>
                  Retour
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />

      </Container>
      </Paper>      
      </div>
    </ThemeProvider>
 
        </>
    )
}

export default ResetPasswdValid