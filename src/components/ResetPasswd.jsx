import React, { useState } from 'react';
import { sendPasswordResetEmail } from "firebase/auth";

import { auth } from '../firebase.config';
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {  createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../logo_club.png';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const ResetPasswd = () => {
    const navigate = useNavigate();
    const [setErrors] = useState('');
    //const [setLoading] = useState(false);

    const handleSubmit = (event) => {
    
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        sendPasswordResetEmail(auth,  data.get('email'))

        //signInWithEmailAndPassword(auth, data.get('email'), data.get('password'))
            .then(() => {
              console.log("test1");
                navigate("/resetOk")
                console.log("test2");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrors(errorMessage);
        
                console.log(errorCode, errorMessage)
            });

    }


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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, color: '#298795' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse Email"
              name="email"
              autoComplete="email"
              autoFocus              
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 , bgcolor: '#298795'}}
            >
              Réinitialiser mon mot de passe
            </Button>
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

export default ResetPasswd