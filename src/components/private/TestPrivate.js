import React from 'react';
import Header from "../Header2";
import SimpleBottomNavigation from "../SimpleBottomNavigation"

import { useNavigate, useLocation } from "react-router-dom";


class TestPrivate extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
		
		}
	}

	componentDidMount() {
		
	}
	 

	render() {
	
		return (	
		<div className="App">
			<Header />
			<div align="center">
				
				<h4>Test</h4>
				
				Ceci est un test TestPrivate
				Youhou

			</div>
			<SimpleBottomNavigation />
		</div>
		)
	}
}
export function TestPrivateWithRouter(props){
	const navigate = useNavigate();
	const location = useLocation();
	return (<TestPrivate location={location} navigate={navigate}></TestPrivate>);
}
export default TestPrivate