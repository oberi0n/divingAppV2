import Header from "../Header2";
import SimpleBottomNavigation from "../SimpleBottomNavigation"
import Html5QrcodePlugin from './Html5QrcodePlugin.jsx';
import {Html5QrcodeScanType} from 'html5-qrcode';

import {BrowserView, MobileView} from 'react-device-detect';
import React from 'react';
import { useNavigate } from "react-router-dom";

class  EquipmentAnalyse extends React.Component {
 
 	constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback.
        this.onNewScanResult = this.onNewScanResult.bind(this);
    }

	render() {
        return (<div className="App">		
			<Header />
			<div align='center'>
				<h4>Scanner un équipement pour obtenir le détail</h4>
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
						fps={50}
						qrbox={250}
						disableFlip={false}
						qrCodeSuccessCallback={this.onNewScanResult}
						showTorchButtonIfSupported={true}
						supportedScanTypes={[Html5QrcodeScanType.SCAN_TYPE_CAMERA]}
						/>
				</MobileView>
				</div>
			
				<SimpleBottomNavigation />
			</div>
		);		
    }

    onNewScanResult(decodedText, decodedResult) {
		console.log('test : ' + this.props);
		this.props.navigate('/equipmentdetail',  {
			state: {
				bareCodeId: decodedText,
			}
		});
		console.log('test2');
    }
 
} 
export function EquipmentAnalyseWithRouter(props){
	const navigate = useNavigate();
	return (<EquipmentAnalyse navigate={navigate}></EquipmentAnalyse>);
}
export default EquipmentAnalyse;






