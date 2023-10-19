import React from 'react';

import Header from "../Header2";
import SimpleBottomNavigation from "../SimpleBottomNavigation"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import errorLogo from '../elements/img/mini-dob.jpg';

class NotFound extends React.Component{
 
	constructor(props) {
		super(props)
		this.state = { 
			isLoading: true,
			
		}
	}	
	
 	render() {
		return (
		<div className="App">
			<Header />
			<h4>Fausse route !</h4>
			<div align="center">
				<Card raised sx={{ maxWidth: 1024,
								margin: "0 auto",
								padding: "0.1em", }} >
					  <CardMedia
					  	component="img"
						sx={{ objectFit: "contain", maxHeight : "40vh"}}
						image={errorLogo}
						title="green iguana"
					  />
					<CardContent align="left">
						<Typography gutterBottom variant="h7" component="span" >
							Y'a comme un soucis. Vous avez scanné la boite de petits pois de vos courses. <br />
							Plusieurs possibilités:<br />
							<ul>
							<li>L'équipement n'existe pas</li>
							<li>L'équipement n'a pas été emprunté</li>
							</ul>
						</Typography>
					</CardContent>
				</Card>
			</div>
			<SimpleBottomNavigation />
		</div>
		);
	}
}
export default NotFound