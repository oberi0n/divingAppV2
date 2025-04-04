import Header from "../Header2";
import SimpleBottomNavigation from "../SimpleBottomNavigation"
import Html5QrcodePlugin from './Html5QrcodePlugin.jsx';
import {Html5QrcodeScanType, Html5Qrcode} from 'html5-qrcode';

import {BrowserView, MobileView} from 'react-device-detect';
import React from 'react';
import { useNavigate } from "react-router-dom";

class  BareCodeReader extends React.Component {
 
 
	constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback.
        this.onNewScanResult = this.onNewScanResult.bind(this);
		
		Html5Qrcode.getCameras().then(devices => {
			console.log('devices: ' + devices);
			alert('devices: ' + Object.keys(devices));
			alert('devices: ' + Object.entries(devices));

			for (let key in devices) {
				alert(key, devices[key]);
			}

			/**
			 * devices would be an array of objects of type:
			 * { id: "id", label: "label" }
			 */
			//if (devices && devices.length) {
			  //var cameraId = devices[0].id;
			  // .. use this to start scanning.
			//}
		  }).catch(err => {
			console.log(err);
			alert(err);
		  });
    }

	render() {
        return (<div className="App">		
			<Header />
			<div align='center' height='100px'>
				<h4>Scanner un équipement pour le rendre</h4>
				<BrowserView>
					<Html5QrcodePlugin 
						fps={5}
						qrbox={250}
						disableFlip={false}
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
		this.props.navigate('/equipmentrestitution',  {
			state: {
				bareCodeId: decodedText,
			}
		});
    }
 
} 
export function BareCodeReaderWithRouter(props){
	const navigate = useNavigate();
	return (<BareCodeReader navigate={navigate}></BareCodeReader>);
}
export default BareCodeReader;






