import React from 'react';
import './MainMenu.css';


import Header from "../components/Header2";
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';

import SimpleBottomNavigation from "./SimpleBottomNavigation"


export default function MainMenu(){
	

    return (
      <div className="App">
		  <Header />
	
          <div align="center">
			<Paper sx={{ maxWidth: 1024,overflow: 'hidden' }} elevation={0}>
				<CardMedia
					sx={{ height: "80vh" }}
					image="./assets/bloc.jpg"
					title="accueil"
				/>
			</Paper>			
		</div>

		<SimpleBottomNavigation />
      </div>
	  
    ); 
}
