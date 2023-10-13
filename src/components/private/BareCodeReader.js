import Header from "../Header2";
import SimpleBottomNavigation from "../SimpleBottomNavigation"
import Html5QrcodePlugin from './Html5QrcodePlugin.jsx';

import React from 'react';
import { useNavigate } from "react-router-dom";

class  BareCodeReader extends React.Component {
 
 
	constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback.
        this.onNewScanResult = this.onNewScanResult.bind(this);
    }

	render() {
        return (<div className="App">		
			<Header />
			<div align='center'>
				<h4>Scanner un équipement pour le rendre</h4>
					<Html5QrcodePlugin 
						fps={5}
						qrbox={250}
						disableFlip={false}
						qrCodeSuccessCallback={this.onNewScanResult}
						showTorchButtonIfSupported={true}/>
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






