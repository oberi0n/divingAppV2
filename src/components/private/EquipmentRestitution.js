import React from 'react';
import { getEquipmentByTag, setBackEquipments, getUtilisateurEquipment, getEquipmentUtilisateur} from '../../api/DivingApi'

import Header from "../Header2";
import SimpleBottomNavigation from "../SimpleBottomNavigation"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useLocation, useNavigate } from 'react-router-dom';

import Moment from 'moment';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import HistoryIcon from '@mui/icons-material/History';
import UndoIcon from '@mui/icons-material/Undo';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';


import BugReportRoundedIcon from '@mui/icons-material/BugReportRounded';
import BackpackIcon from '@mui/icons-material/Backpack';
import EarbudsIcon from '@mui/icons-material/Earbuds';

class EquipmentRestitution extends React.Component{
 
	constructor(props) {
		super(props)
		this.state = { 
			isLoading: true,
			barecode: this.props.location.state.bareCodeId,
			openDialog: false,
			_dateDebut: "",
			equipments: [],
			refresh: false,
		}
	}	
	
	componentDidMount() {
			this._loadEquipmentsDetail(this.state.barecode);
			this._getUtilisateurEquipment(this.state.barecode)
	}

	_loadEquipmentsDetail(tagEquipment){ 
		
		getEquipmentByTag(tagEquipment).then(data => {
		 
		 if(data !== undefined){
			if(data.dateAchat !== undefined)	
				this._dateAchat = Moment(data.dateAchat.substring(0, 10)).format('DD/MM/YYYY');
			else
				this._dateAchat = 'Inconnue'
			if(data.dateDernierEntretien !== undefined)	
				this._dateEntretien = Moment(data.dateDernierEntretien.substring(0, 10)).format('DD/MM/YYYY');
			else
				this._dateEntretien = 'Inconnue'
			if(data.dateRequalif !== undefined)	
				this._dateRequalif= Moment(data.dateRequalif.substring(0, 10)).format('DD/MM/YYYY');
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
		 }else{
			this.props.navigate('/error');
		 }
		}).catch(e => console.log(e)) 
	}
 
    _getUtilisateurEquipment(tagEquipment){ 
	
	//Gérer les erreurs
		getUtilisateurEquipment(this.state.barecode).then(data => {			
			if(data !== undefined){
				this._idUtilisateur = data.idUtilisateur;
				this._nom = data.nom;
				this._prenom = data.prenom;


				getEquipmentUtilisateur(data.tag).then(dataE => {
			
					for(var i= 0; i < dataE.length; i++)
					{
						if(dataE[i].tag === this._tagEquipment){
							this.setState({_dateDebut : Moment(dataE[i].dateDebut.substring(0, 10)).format('DD/MM/YYYY')})
							//this._dateDebut = Moment(dataE[i].dateDebut.substring(0, 10)).format('DD/MM/YYYY');
							//console.log(this._dateDebut);
						}
					}
				})
			}else{
				this.props.navigate('/error');
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
		
		this.setState({equipments:[]});
		/*setBackEquipments(this.state.barecode, this._idUtilisateur).then(
			this.props.navigate('/equipementsemprunt')
		)*/
		this.setState({isLoading:true});
		setBackEquipments(this.state.barecode, this._idUtilisateur);
		
		setTimeout(() => {
			this.props.navigate('/equipementsemprunt')
		  }, 500);
		  this.setState({isLoading:false});
		  this.setState({openDialog:false});
		
	}
	
	_handleClose_reject = () => {
		this.setState({openDialog:false});	
	}
 
	render() {

		const dateDernEntretien = "Date de dernier entretien : "+this._dateEntretien;
		const noDateDernEntretien = "";
		
		const dateDernQualif = "Date de dernière requalif : "+this._dateRequalif;
		const noDateDernQualif = "";
		
		const statutTIV = "Statut TIV : "+this._statutTIV;
		const noStatutTIV = "";
		
		const numAffiche = "Numéro affiché : " + this._numeroAffiche;
		const noNumAffiche = "Pas de numero affiché";
		
		const numSerie = "Numéro de serie : " + this._numeroSerie;
		const noNumSerie = "Pas de numero de série";
		
		const tableRendering = <Card sx={{ maxWidth: 1024, height: '90vh' }} >
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
		  
			<Typography gutterBottom variant="h5" component="span" >
				{this._displayIconName(this._libelle)}&nbsp;{this._libelle}&nbsp;{this._marque}
			</Typography>
			<CardActions
			sx={{
				display: 'flex', // Active Flexbox
				justifyContent: 'center', // Centre horizontalement
				gap: 2, // Ajoute un espace entre les boutons
			  }}>
				<Button
					onClick={() =>
					this.props.navigate('/historique', { state: { bareCodeId: this._tagEquipment } })
					}
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
					  }}
				>
					Historique
				</Button>
				<Button
					onClick={this._handleClickOpen}
					size="small"
					variant="outlined"
					startIcon={<UndoIcon />}
					color="error"
					sx={{
						borderRadius: '20px',
						fontWeight: 'bold',
						backgroundColor: '#d32f2f', // Rouge vif mais lisible
						color: '#ffffff', // Texte blanc pour le contraste
						'&:hover': {
						  backgroundColor: '#b71c1c', // Rouge légèrement plus foncé au survol
						},
					  }}
				>
					Restituer
				</Button>
				
  		    </CardActions>		
			<Typography gutterBottom variant="body1" component="span" >
				{this._prenom}&nbsp;{this._nom}&nbsp;a emprunté ce matériel depuis le {this.state._dateDebut}
			</Typography>
			<br />
			<Typography variant="body2" color="text.secondary" component="span">
			<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				<Grid xs={6}>
					{(this._numeroAffiche!==undefined)?numAffiche:noNumAffiche}
				</Grid>
				<Grid xs={6}>
					{(this._dateEntretien!=='Inconnue')?dateDernEntretien:noDateDernEntretien}
				</Grid>
				<Grid xs={6}>
					Taille: {this._taille}
				</Grid>
				<Grid xs={6}>
					{(this._dateRequalif!=='Inconnue')?dateDernQualif:noDateDernQualif}
				</Grid>
				<Grid xs={6}>
					{(this._numeroSerie!=='')?numSerie:noNumSerie}
				</Grid>
				<Grid xs={6}>
					{(this._statutTIV)?statutTIV:noStatutTIV}
				</Grid>
				<Grid xs={6}>
					Tag: {this._tagEquipment}
				</Grid>
			</Grid>
			</Typography>
		  </CardContent>
		  			  
		</Card>

		return (
		<div className="App">
			<Header />
				<div align="center">
					{(!this.state.isLoading) ? tableRendering : "Loading"}
				</div>
				<Dialog
					open={this.state.openDialog}
					onClose={this._handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description">
					<DialogTitle id="alert-dialog-title">
					  {"Confirmation de restitution ?"}
					</DialogTitle>
					<DialogContent>
					  <DialogContentText id="alert-dialog-description">
						A un grand pouvoir imcombent de grandes responsabilités, êtes-vous sur de valider le retour de ce matériel ?
					  </DialogContentText>
					</DialogContent>
					<DialogActions>
					  <Button onClick={this._handleClose_reject}>Non</Button>
					  <Button onClick={this._handleClose_confirm} autoFocus>
						Je confirme
					  </Button>
					</DialogActions>
			    </Dialog>			
				<SimpleBottomNavigation />
				
			</div>

			
		);
	}
}
export function EquipmentRestitutionWithRouter(props){
	const location = useLocation();
	const navigate = useNavigate();
	return (<EquipmentRestitution navigate={navigate} location={location}></EquipmentRestitution>);
}
export default EquipmentRestitution