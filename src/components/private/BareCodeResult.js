
import Header from "../Header2";
import SimpleBottomNavigation from "../SimpleBottomNavigation"


import React from 'react';

import { useLocation } from "react-router-dom";

 
function BareCodeResult()  {

	const location = useLocation();		

    return (<div className="App">
		
		<Header />
			<div>
			
			{location.state.bareCodeId}

			</div>
		
			<SimpleBottomNavigation />
		</div>
	);
}
export default BareCodeResult;