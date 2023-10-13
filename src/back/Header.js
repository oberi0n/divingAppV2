// Components/Search.js
import React from 'react'
import logo from '../logo_club.png';

import Grid from '@mui/material/Unstable_Grid2';


class Header extends React.Component {
   
   render() {
	
        return (
	        <header className="App-header">
				<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
					<Grid xs={6}>
						<img src={logo} className="App-logo" alt="logo" />
					</Grid>
					<Grid xs={6}>
						<h1 className="App-title">Gestion du matériel</h1>
					</Grid>
				</Grid>
			</header>
        )
    }
}

export default Header