import React from 'react';
import Header from "../Header2";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getEquipmentsEmprunt } from '../../api/DivingApi'
import { useLocation, useNavigate } from "react-router-dom";

import BugReportRoundedIcon from '@mui/icons-material/BugReportRounded';
import BackpackIcon from '@mui/icons-material/Backpack';
import EarbudsIcon from '@mui/icons-material/Earbuds';

import SimpleBottomNavigation from "../SimpleBottomNavigation"

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

class EquipementsEmprunt extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			equipments: [],
			isLoading: true,
			openDialog: false,

		}
	}
	componentDidMount() {
		//console.log("componentDidMount");
		this._loadEquipmentsEmprunt();
	}

	_loadEquipmentsEmprunt() {
		this.setState({ isLoading: true })
		getEquipmentsEmprunt().then(data => {
			if (data === undefined) {
				this._handleClickOpen();
				console.log('Aïe !', 'Soit il n\'y a plus d\'équipements, soit il y a une erreur !');
				this.setState({ isLoading: false })
			} else {
				data.sort(function (a, b) {
					return (a.nom > b.nom) ? 1 : ((b.nom > a.nom) ? -1 : 0);
				});
				this.setState({ equipments: data, isLoading: false });
			}
		})
	}

	_displayIconName(lbl) {
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
		this.setState({ openDialog: true });
	}

	_handleClose_confirm = () => {
		this.props.navigate('/')
	}

	render() {

		const columns = [
			{ id: 'prenom', label: 'Prénom', minWidth: 50, align: 'center' },
			{ id: 'nom', label: 'Nom', minWidth: 50, align: 'center' },
			{ id: 'libelle', label: 'Libelle', minWidth: 80 },
			{ id: 'marque', label: 'Marque', minWidth: 100 },
			{ id: 'taille', label: 'Taille', minWidth: 50, align: 'center' },
		];

		const tableRendering = <TableContainer sx={{ maxWidth: 1024, maxHeight: "69vh" }}>
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
								<TableRow hover role="checkbox" tabIndex={-1} key={row.idEquipment}
									onClick={() => this.props.navigate('/equipmentrestitution', { state: { bareCodeId: row.tag } })}>
									{columns.map((column) => {
										const value = row[column.id];
										return (
											<TableCell key={column.id + row.idEquipment} align={column.align}
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

		return (
			<div className="App">
				<Header />
				<div align="center">
					<h4>Equipements empruntés</h4>
					{(!this.state.isLoading) ? tableRendering : "Loading"}
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
export function EquipementsEmpruntWithRouter(props) {
	const navigate = useNavigate();
	const location = useLocation();
	return (<EquipementsEmprunt navigate={navigate} location={location}></EquipementsEmprunt>);
}
export default EquipementsEmprunt