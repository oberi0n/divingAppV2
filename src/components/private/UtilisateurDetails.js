import React from 'react';
import Header from "../Header2";
import SimpleBottomNavigation from "../SimpleBottomNavigation"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useNavigate, useLocation } from "react-router-dom";
import { getEquipmentByUtilisateur, getUtilisateurById } from '../../api/DivingApi'

import BugReportRoundedIcon from '@mui/icons-material/BugReportRounded';
import BackpackIcon from '@mui/icons-material/Backpack';
import EarbudsIcon from '@mui/icons-material/Earbuds';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


import {  createTheme, ThemeProvider } from '@mui/material/styles';


class UtilisateurDetails extends React.Component {

	constructor(props) {
		super(props)
		this.searchedText = "" ;
		this.state = {
			equipments: [],
			user: '',
			isLoading: true,
			openDialog: false,
			utilisateursBis: [],
			idUtilisateur: this.props.location.state.idUtilisateur,
			id: this.props.location.state.id
		}
		
	}

	componentDidMount() {
		this._Mounted = true;
		if (this._Mounted) {
			this._loadUserInfo();
			this._loadEquipmentsInit(); 
		}
	}

	_loadUserInfo(){
		this.setState({ isLoading: true })
		getUtilisateurById(this.state.id).then(data => {
			if(data !== undefined){
				this.setState({ user: data, isLoading: false })
			}
		})
	}
	

	_loadEquipmentsInit(){
		this.setState({ isLoading: true })
		getEquipmentByUtilisateur(this.state.idUtilisateur).then(data => {
			//alert(data);
			if(data !== undefined){
			//	alert("1");
				this.setState({ equipments: data, isLoading: false });
			}else{
			//	alert("2");
				this.props.navigate('/obtenir',  {	state: { idUtilisateur: this.state.id, id: this.state.idUtilisateur }})		
			}
		})
	}
	
	_displayIconName(lbl){
		switch (lbl) {
			case 'Stab':
				this.icon_name = 'bug';
				return <BugReportRoundedIcon />;
			case 'Détendeur':
				this.icon_name = 'snorkel'
				return <EarbudsIcon />;
			case 'Bloc':
				this.icon_name = 'rocket'
				return <BackpackIcon />;
			default:
				return;
		}
	}
  	_handleClickOpen = () => {
		this.setState({openDialog:true});
	}
 			
		
	_handleClose_confirm = () => {
		this.props.navigate('/')
	}
	

	render() {

		const defaultTheme = createTheme({
			palette: {
				primary: {
				   main: "#298795" // This is an orange looking color
						  },
			}
		});

		const columns = [
			{ id: 'libelle', label: 'Libelle', minWidth: 80 },
			{ id: 'marque', label: 'Marque', minWidth: 100 },
			{ id: 'taille', label: 'Taille', minWidth: 50, align: 'center' },
			{ id: 'dateDebut', label: 'Depuis le', minWidth: 50, align: 'center' },
		];
		
		return (	
			<ThemeProvider theme={defaultTheme}>
		<div className="App">
			<Header />
			<div align="center">
				<h4>{this.state.user.prenom} {this.state.user.nom} a emprunté le matériel suivant:</h4>
					<TableContainer sx={{ maxWidth: 1024,maxHeight: '69vh' }}>
						<Table stickyHeader aria-label="sticky table">
						  <TableHead>
							<TableRow>
							  {columns.map((column) => (
								<TableCell
								  key={column.id}
								  align={column.align}
								  style={{ minWidth: column.minWidth }}
								>
								  {column.label}
								</TableCell>
							  ))}
							</TableRow>
						  </TableHead>
						  <TableBody>
							{this.state.equipments
							  .map((row) => {
								return (
								  <TableRow hover role="checkbox" tabIndex={-1} key={row.idEquipment} >
									{columns.map((column) => {
									  	var value = row[column.id];
									  	var today = "";
										if(column.id === 'dateDebut' ){
											today = new Date(row[column.id].substring(0, 10));
											value = today.toLocaleDateString("fr-FR");
									  	}
									  
										return (
											<TableCell key={column.id+row.idEquipment} align={column.align}>
												{value}
											</TableCell>
										);

									})}
								  </TableRow>
								);
							  })}
						  </TableBody>
						</Table>
					</TableContainer>
					<br /><br />
					<Button 
					    
						variant="contained"
						sx={{ mt: 3, mb: 2 , bgcolor: '#298795'}}
						onClick={() => this.props.navigate('/obtenir',  {	state: { idUtilisateur: this.state.id, id: this.state.idUtilisateur }})}>
          				Emprunter
        			</Button>

			</div>
			<Dialog
				open={this.state.openDialog}
				onClose={this._handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">
				  {"Erreur"}
				</DialogTitle>
				<DialogContent>
				  <DialogContentText id="alert-dialog-description">
				  Un problème de connexion est survenu. Réessayez plus tard...
				  </DialogContentText>
				</DialogContent>
				<DialogActions>
				  <Button onClick={this._handleClose_confirm} autoFocus>
					Ok
				  </Button>
				</DialogActions>
			</Dialog>		
			<SimpleBottomNavigation />
		</div>
		</ThemeProvider>
		)
	}
}
export function UtilisateurDetailsWithRouter(props){
	const navigate = useNavigate();
	const location = useLocation();
	return (<UtilisateurDetails location={location} navigate={navigate}></UtilisateurDetails>);
}
export default UtilisateurDetails