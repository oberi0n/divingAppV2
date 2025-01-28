import React from 'react';
import { getEquipmentByTag } from '../../api/DivingApi'

import Header from "../Header2";
import SimpleBottomNavigation from "../SimpleBottomNavigation"

import { useLocation, useNavigate } from "react-router-dom";

import Moment from 'moment';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HistoryIcon from '@mui/icons-material/History';
import BugReportRoundedIcon from '@mui/icons-material/BugReportRounded';
import BackpackIcon from '@mui/icons-material/Backpack';
import EarbudsIcon from '@mui/icons-material/Earbuds';

class EquipmentDetail extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			isLoading: true,
			barecode: this.props.location.state.bareCodeId
		}
	}

	componentDidMount() {
		this._Mounted = true;
		if (this._Mounted) {
			this._loadEquipmentsDetail(this.state.barecode);
		}
	}

	_loadEquipmentsDetail(tagEquipment) {
		getEquipmentByTag(tagEquipment).then(data => {
			if (data.dateAchat !== undefined)
				this._dateAchat = Moment(data.dateAchat.substring(0, 10)).format('DD/MM/YYYY');
			else
				this._dateAchat = 'Inconnue'
			if (data.dateDernierEntretien !== undefined)
				this._dateEntretien = Moment(data.dateDernierEntretien.substring(0, 10)).format('DD/MM/YYYY');
			else
				this._dateEntretien = 'Inconnue'
			if (data.dateRequalif !== undefined)
				this._dateRequalif = Moment(data.dateRequalif.substring(0, 10)).format('DD/MM/YYYY');
			else
				this._dateRequalif = 'Inconnue'

			this._idEquipment = data.idEquipment;
			this._taille = data.taille;
			this._libelle = data.libelle;
			this._marque = data.marque;
			this._numeroSerie = data.numeroSerie;
			this._tagEquipment = data.tag;
			this._imageEquipment = data.photoB64;
			this._statutTIV = data.statutTIV;
			this._numeroAffiche = data.numeroAffiche;
			this.setState({ isLoading: false });
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

	render() {

		const dateDernEntretien = "Date de dernier entretien : " + this._dateEntretien;
		const noDateDernEntretien = "";

		const dateDernQualif = "Date de dernière requalif : " + this._dateRequalif;
		const noDateDernQualif = "";

		const statutTIV = "Statut TIV : " + this._statutTIV;
		const noStatutTIV = "";

		return (
			<div className="App">
				<Header />
				<div align="center">
					<Card sx={{ maxWidth: 1024, height: '75vh' }} >
						{this._imageEquipment ? (
							<CardMedia
								sx={{ height: 290 }}
								image={this._imageEquipment}
								title="green iguana"
							/>
						) : (
							<div />
						)}
						<CardContent align="left">

							<Typography gutterBottom variant="h5" component="div">
								{this._displayIconName(this._libelle)}&nbsp;{this._libelle}&nbsp;{this._marque}
							</Typography>
							<CardActions
							sx={{
								display: 'flex', // Active Flexbox
								justifyContent: 'center', // Centre horizontalement
								gap: 2, // Ajoute un espace entre les boutons
								marginTop: 2, // Optionnel : espace au-dessus des boutons
							  }}>
							<Button
								onClick={() => this.props.navigate('/historique', { state: { bareCodeId: this._tagEquipment, } })}
								size="small"
								variant="contained"
								startIcon={<HistoryIcon />}
								color="primary"
								sx={{
									borderRadius: '20px',
									fontWeight: 'bold',
									backgroundColor: '#298795', // Bleu-vert élégant
									color: '#ffffff', // Texte blanc pour un bon contraste
									'&:hover': {
									backgroundColor: '#226d7b', // Une teinte légèrement plus sombre au survol
									},
								}}>Historique</Button>
							</CardActions>
							<Typography variant="body2" color="text.secondary">
								Taille: {this._taille}
								<br />
								{ }Numero de serie : {this._numeroSerie}
								<br />
								Numero affiché: {this._numeroAffiche}
								<br />
								{(this.dateDernierEntretien !== 'Inconnue') ? dateDernEntretien : noDateDernEntretien}
								<br />
								{(this._dateRequalif !== 'Inconnue') ? dateDernQualif : noDateDernQualif}
								<br />
								{(this._statutTIV) ? statutTIV : noStatutTIV}
							</Typography>
							<Typography gutterBottom variant="h7" component="div">
								Tag: {this._tagEquipment}
							</Typography>
						</CardContent>
						
					</Card>
				</div>
				<SimpleBottomNavigation />
			</div>
		);
	}
}
export function EquipmentDetailWithRouter(props) {
	const location = useLocation();
	const navigate = useNavigate();
	return (<EquipmentDetail location={location} navigate={navigate}></EquipmentDetail>);
}
export default EquipmentDetail