import React from 'react';
import Header from "../Header2";
import SimpleBottomNavigation from "../SimpleBottomNavigation"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useNavigate } from "react-router-dom";
import { getAllUtilisateur } from '../../api/DivingApi'

import BugReportRoundedIcon from '@mui/icons-material/BugReportRounded';
import BackpackIcon from '@mui/icons-material/Backpack';
import EarbudsIcon from '@mui/icons-material/Earbuds';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import {  createTheme, ThemeProvider } from '@mui/material/styles';


class Utilisateurs extends React.Component {

	constructor(props) {
		super(props)
		this.searchedText = "" ;
		this.state = {
			equipments: [],
			isLoading: true,
			openDialog: false,
			utilisateursBis: [],
		}
	}

	componentDidMount() {
		this._Mounted = true;
		if (this._Mounted) {
			this._loadUtilisateurs(); 
		}
	}
	 
	 _loadUtilisateurs(){
		this.setState({ isLoading: true })
		getAllUtilisateur().then(data => {
			if(data === undefined){
				this._handleClickOpen();
				
				this.setState({ isLoading: false })
				
			}else{
				//console.log('data');
				data.sort(function(a,b) {
					return (a.nom > b.nom) ? 1 : ((b.nom > a.nom) ? -1 : 0);
				});

				this.setState({ equipments: data, utilisateursBis: data, isLoading: false });

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


	_searchTextInputChanged(text) {
		this.searchedText = text.target.value;
		const listUser = this.state.utilisateursBis;

		var fouf = listUser.filter(function(listUser) {

			if(listUser.nom.toUpperCase().startsWith(text.target.value.toUpperCase())||listUser.prenom.toUpperCase().startsWith(text.target.value.toUpperCase())){
					return listUser;
			}			  
		})
		
		this.setState({ equipments: fouf })
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
			{ id: 'nom', label: 'Nom', minWidth: 50, align: 'center' }, 
			{ id: 'prenom', label: 'Prénom', minWidth: 50, align: 'center' }, 
		];
		
		return (	
			<ThemeProvider theme={defaultTheme}>
		<div className="App">
			<Header />
			<div align="center">
				<h4>Selectionner un utilisateur</h4>
				<Box
					component="form"
					sx={{
						'& > :not(style)': { m: 1, width:"90vw", maxWidth: 1024 },
					}}
					noValidate
					autoComplete="off"
					>
					<TextField id="outlined-search" label="Filtrer par nom ou prénom" type="search" 
						onChange={(text) => this._searchTextInputChanged(text)}
					/>
					
				</Box>
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
								  <TableRow hover role="checkbox" tabIndex={-1} key={row.idUtilisateur}
								  onClick={() => 	this.props.navigate('/obtenir',  {	state: { idUtilisateur: row.idUtilisateur }}) }>
									{columns.map((column) => {
									  const value = row[column.id];
									  return (
										<TableCell key={column.id} align={column.align}
										>
											{column.format && typeof value === 'number'
											? column.format(value)
											: value}
										</TableCell>
									  );
									})}
								  </TableRow>
								);
							  })}
						  </TableBody>
						</Table>
					</TableContainer>
				

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
export function UtilisateursWithRouter(props){
	const navigate = useNavigate();
	return (<Utilisateurs navigate={navigate}></Utilisateurs>);
}
export default Utilisateurs