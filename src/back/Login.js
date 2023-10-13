import React from 'react';
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Platform, TextInput} from 'react-native';
import Constants from 'expo-constants';
import { Icon } from 'react-native-elements';

class Login extends React.Component {
  
  _displayUtilisateurScreen (){
	//this.props.navigation.navigate("CodeReader")
	this.props.navigation.navigate("CodeReader", { nav:this.props , id:undefined, path: 'user', title: 'Scan d\'une licence FFESSM'} );
  }
  
  _displayRestitutionScreen (){
	//this.props.navigation.navigate("CodeReader")
	this.props.navigation.navigate("CodeReader", { nav:this.props , id:undefined, path: 'globalRestitution', title: 'Restitution de matériel'} );
  }
  
  _displayAvailabilityScreen (){
	this.props.navigation.navigate("EquipementsDispo")
  }
  
  _displayBorrowedScreen (){
	this.props.navigation.navigate("EquipementsEmprunt")
  }

  _displaySelectUserScreen (){
	this.props.navigation.navigate("SelectUserManually")
  }
  
	render() {
		return (
	<SafeAreaView style={styles.global}>
		<View style={styles.soustitre_section}>
			<Text style={styles.titre}>
				Application de gestion du matériel du club de plongée de Thionville
			</Text>
		</View>
		  
		<View style={styles.materiel_section}>
			
				
				
				<TextInput style={styles.textinput} placeholder='Login' 
				
				/>
				
				<TextInput style={styles.textinput} placeholder='Password' 
				
				/>
					
					
				<TouchableOpacity style={styles.act_button}
						onPress={() => this._displayAvailabilityScreen ()}>
						<Icon  size={50} name='check' type='foundation' color='#009688' />
				</TouchableOpacity>
			
		</View>
		
		
		<View style={styles.copyright_section}>
			<Text style={styles.copyright}>
				Copyright © 2020 - N.NOEL - Application développée pour les besoins du club de plongée de Thionville - 
			</Text>
		</View>
	</SafeAreaView>
	  );
	}
}
const styles = StyleSheet.create({
  global:{
	flex:1,
	marginTop:0
  },
   textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
	width: 160,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    paddingLeft: 5
  },
  soustitre_section:{
	flex:3,
	backgroundColor:'#E7EFE7',
	borderBottomColor: "#009688",
	borderBottomWidth: StyleSheet.hairlineWidth,
	justifyContent: 'center',
	alignItems: 'center',
  },
  materiel_section:{
	flex:9,
	alignContent: "space-around",
  },
  copyright_section:{
	flex:1,
	backgroundColor:'#E7EFE7',
	//backgroundColor:'purple'
  },
  titre: {
    textAlign: 'center',
    marginVertical: 8,
	color: '#298795',
	fontSize: 20,
	fontWeight: "bold"
  },
  act_button: {
	borderWidth:2, 
	borderColor:'#009688', 
	alignItems:'center', 
	justifyContent:'center', 
	width:160, 
	height:60, 
	backgroundColor:'#FCFCFC', 
	borderRadius:20,
  },
  act_button_noweb: {
	borderWidth:2, 
	borderColor:'#009688', 
	alignItems:'center', 
	justifyContent:'center', 
	width:160, 
	height:200, 
	backgroundColor:'#FCFCFC', 
	borderRadius:20,
	opacity : Platform.OS === 'web' ? 0.5 : 1	
  },
  case_button: {
	flex: 3,
	flexDirection: 'column',
	borderWidth:2, 
	justifyContent: 'center',
	alignItems: 'center',
    marginTop: 0,    
	alignContent: "space-around",
  },
  copyright: {
    textAlign: 'left',
	
    marginVertical: 2,
	color: '#298795',
	fontSize: 8,
	fontWeight: "bold"
  },
})
export default Login