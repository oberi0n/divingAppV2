import Header from "../Header2";
import SimpleBottomNavigation from "../SimpleBottomNavigation"
import Html5QrcodePlugin from './Html5QrcodePlugin.jsx';
import {Html5QrcodeScanType} from 'html5-qrcode';
import {BrowserView, MobileView} from 'react-device-detect';
import { setBorrowedEquipments} from '../../api/DivingApi'
import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { red } from '@mui/material/colors';

class  BareCodeObtenir extends React.Component {
 
 
	constructor(props) {
        super(props);
		this.state = { 
			idUtilisateur: this.props.location.state.idUtilisateur,
			openDialog: false,
			textConfirmation: '',
			iconValid: '',
		}
		
        // This binding is necessary to make `this` work in the callback.
        this.onNewScanResult = this.onNewScanResult.bind(this);
		
		
    }

	_handleClickOpen = (p_textConfirmation, p_icon) => {
		this.setState({textConfirmation: p_textConfirmation})		
		this.setState({openDialog:true});

		if(p_icon === 'ok'){
			this.setState({iconValid : <DoneOutlineIcon color="success" />})
		}else
			this.setState({iconValid : <CancelIcon sx={{ color: red[500] }} />})
			
	}
 
	_handleClose_confirm = () => {
		this.props.navigate('/equipementsemprunt')		
	}

	render() {
        return (<div className="App">		
			<Header />
				<div align='center'>
				<h4>Scanner un équipement pour l'emprunter</h4>
				<BrowserView>
					<Html5QrcodePlugin 
						fps={5}
						qrbox={250}
						disableFlip={true}
						qrCodeSuccessCallback={this.onNewScanResult}
						supportedScanTypes={[Html5QrcodeScanType.SCAN_TYPE_FILE]}
						/>
				</BrowserView>
				<MobileView>
					<Html5QrcodePlugin 
						fps={5}
						qrbox={250}
						disableFlip={true}
						qrCodeSuccessCallback={this.onNewScanResult}
						showTorchButtonIfSupported={true}
						supportedScanTypes={[Html5QrcodeScanType.SCAN_TYPE_CAMERA]}
						/>
				</MobileView>
				</div>

				<Dialog
					open={this.state.openDialog}
					onClose={this._handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description">
					<DialogTitle id="alert-dialog-title">
					  {"Confirmation d'emprunt"}
					</DialogTitle>
					<DialogContent>
					  <DialogContentText id="alert-dialog-description">
					  {this.state.iconValid}&nbsp;
					  {this.state.textConfirmation}
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
		);		
    }

    onNewScanResult(decodedText, decodedResult) {
			setBorrowedEquipments(decodedText, this.state.idUtilisateur).then(data => {
			if(data.status === 404){
				this._handleClickOpen("L'équipement est déjà emprunté, merci de vérifier", "ko")
			}else
					this._handleClickOpen("L'équipement a été emprunté avec succès !", "ok")
			})
    }

} 
export function BareCodeObtenirWithRouter(props){
	const navigate = useNavigate();
	const location = useLocation();
	return (<BareCodeObtenir location={location} navigate={navigate}></BareCodeObtenir>);
}
export default BareCodeObtenir;






