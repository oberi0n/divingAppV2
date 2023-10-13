import React from 'react';
import Header from "../Header2";
import SimpleBottomNavigation from "../SimpleBottomNavigation"

import { getEquipmentsDispo } from '../../api/DivingApi'

import { useNavigate } from "react-router-dom";


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import BugReportRoundedIcon from '@mui/icons-material/BugReportRounded';
import BackpackIcon from '@mui/icons-material/Backpack';
import EarbudsIcon from '@mui/icons-material/Earbuds';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


class EquipementsDispo extends React.Component {
	
	constructor(props) {
		//alert("Constructeur");
		super(props);
		this.state = {
			equipments: [],
			isLoading: true,
			openDialog: false,
		}
	}
	
	componentDidMount() {
		//alert("Mount 0");
		this._Mounted = true;
		if (this._Mounted) {
			//alert("Mount 1");
			this._loadEquipmentsDispo(); 
			//alert("Mount 2");
		}
	 }
 
	_loadEquipmentsDispo(){
		this.setState({ isLoading: true })
		//alert("_loadEquipmentsDispo 0: ");
		getEquipmentsDispo().then(data => {
			//alert("_loadEquipmentsDispo 1: "+data);
			if(data === undefined){
				this._handleClickOpen();
				console.log('Aïe !','Soit il n\'y a plus d\'équipements, soit il y a une erreur !');
				this.setState({ isLoading: false })
			}else{
				//console.log('data');
				data.sort(function(a,b) {
					return (a.libelle > b.libelle) ? 1 : ((b.libelle > a.libelle) ? -1 : 0);
				});
				this.setState({ equipments: data, isLoading: false });
			}
		})
		//alert("_loadEquipmentsDispo 3 : ");
	}


	


	_handleClickOpen = () => {
		this.setState({openDialog:true});
	}
 
			
		
	_handleClose_confirm = () => {
		this.props.navigate('/')
	}
	
	render() {


		const _displayIconName = (lbl) => {
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



		const columns = [
		  { id: 'libelle', label: 'Libelle', minWidth: 50 },
		  { id: 'marque', label: 'Marque', minWidth: 90 },
		  { id: 'taille', label: 'Taille',  minWidth: 40, align: 'center' },
		  { id: 'numeroAffiche', label: 'Numero affiché', minWidth: 40, align: 'center' }, 
		];
		
		return (	
		
		<div className="App">
		<Header />
				<div align="center">
					<h4>Equipements disponibles</h4>
					  <TableContainer sx={{ maxWidth: 1024,maxHeight: "69vh" }}>
						<Table stickyHeader aria-label="sticky table">
						  <TableHead>
							<TableRow>
							  {columns.map((column) => (
								<TableCell
								  key={column.id}
								  align={column.align}
								  style={{ minWidth: column.minWidth }}>
								  {column.label}
								</TableCell>
							  ))}
							</TableRow>
						  </TableHead>
						  <TableBody>
							{this.state.equipments
							  .map((row) => {
								return (
							  <TableRow hover role="checkbox" tabIndex={-1} key={row.idEquipment}  sx={{ verticalAlign: 'top' }} 
								onClick={() => 	this.props.navigate('/equipmentdetail',  {	state: { bareCodeId: row.tag,}}) }>
									{columns.map((column) => {
									  var value = row[column.id];

									  return (
										<TableCell key={column.id+row.idEquipment} align={column.align} >
											{_displayIconName(row[column.id])}<br />
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
		)
	}
}
export function EquipementsDispoWithRouter(props){
	const navigate = useNavigate();
	return (<EquipementsDispo navigate={navigate}></EquipementsDispo>);
}
export default EquipementsDispo