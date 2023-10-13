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
import { getHistoricByEquipment } from '../../api/DivingApi'
import dateFormat from 'dateformat';


class Historique extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			equipments: [],
			isLoading: true,
			barecode: this.props.location.state.bareCodeId
		}
	}

	componentDidMount() {
		this._Mounted = true;
		if (this._Mounted) {
			this._loadHistorique(this.state.barecode); 
		}
	}
	 
	 _loadHistorique(tagEquipment){
		this.setState({ isLoading: true })
		
		getHistoricByEquipment(tagEquipment).then(data => {
			if(data === undefined){
				this.setState({ isLoading: false })
				//this.props.navigation.navigate("MainMenu");
			}else{
				data.sort(function(a,b) {
					return (a.dateDebut < b.dateDebut) ? 1 : ((b.dateDebut < a.dateDebut) ? -1 : 0);
				});
				this.setState({ equipments: data, isLoading: false })
			}
		})
	 }


	render() {

		const columns = [
			{ id: 'nom', label: 'Nom', minWidth: 50, align: 'center' }, 
			{ id: 'prenom', label: 'Prénom', minWidth: 50, align: 'center' },
			{ id: 'dateDebut', label: 'Emprunt', minWidth: 45, align: 'center' },
			{ id: 'dateFin', label: 'Restitution', minWidth: 45, align: 'center' },
		];
		
		return (	
		<div className="App">
			<Header />
			<div align="center">
				
				<h4>Historique</h4>
				
					<TableContainer sx={{ maxHeight: "69vh" , width:"100vw", maxWidth: 1024 }}>
						<Table stickyHeader aria-label="sticky table">
						  <TableHead>
							<TableRow>
							  {columns.map((column) => (
								<TableCell
								  key={column.id}
								  align={column.align}
								  style={{ minWidth: column.minWidth }}	>
								  {column.label}
								</TableCell>
							  ))}
							</TableRow>
						  </TableHead>
						  <TableBody>
							{this.state.equipments
							  .map((row) => {
								return (
								  <TableRow hover role="checkbox" tabIndex={-1} key={row.idEvenement}>
									{columns.map((column) => {
									var value = row[column.id];
									
									if(column.id === 'nom' || column.id === 'prenom')
									  value = row.utilisateur[column.id];
									if(column.id === 'dateDebut' )
									  value = dateFormat(row[column.id], "dd/mm/yyyy");
									if(column.id === 'dateFin'){
										if(value === undefined){
									  		value = 'Non rendu'; 
										}
										else{
											value = dateFormat(row[column.id], "dd/mm/yyyy");
										}	
									}
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
			<SimpleBottomNavigation />
		</div>
		)
	}
}
export function HistoriqueWithRouter(props){
	const navigate = useNavigate();
	const location = useLocation();
	return (<Historique location={location} navigate={navigate}></Historique>);
}
export default Historique