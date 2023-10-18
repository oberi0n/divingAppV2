import {encode as base64_encode} from 'base-64';

//import axios from 'axios';

//const API_TOKEN = "VOTRE_TOKEN_ICI";

//const ENDPOINT = "http://127.0.0.1:8080" //DEV
//const ENDPOINT = "http://192.168.1.112:12378" //DEV
//const ENDPOINT = "http://188.213.25.247:12378" //PROD
//const ENDPOINT = "http://5.196.225.93:12378" //PROD
//const ENDPOINT = "https://5.196.225.93:12379" //PROD
const ENDPOINT = "https://oberi0n.xyz:12379" //PROD
//const ENDPOINT = "http://82.64.133.26:12378" //PROD


const username = 'divingApp';
const password = 'valsalva01';

export async function getEquipmentByUtilisateur (text) {
  let headers = new Headers();
	headers.append('Authorization', 'Basic ' + base64_encode(username + ":" + password));
	headers.append('Content-Type', 'application/json');
	headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization');	
	const getOptions = {
        method: 'GET',
        headers: headers
  }
  
  const url = ENDPOINT + '/equipment/utilisateur?tag=' + text
  return await fetch(url,getOptions).then(
		(response) => {
			 if (response.ok) {
				return response.json();
			} else {
				throw Error(response.statusText);
			}
		})
		.catch((error) => {
			console.log('Erreur','L\'équipement n\'a pas été trouvé, merci de contacter un administrateur')
		})
}

export function getUtilisateur (text) {
  let headers = new Headers();
	headers.append('Authorization', 'Basic ' + base64_encode(username + ":" + password));
	headers.append('Content-Type', 'application/json');
	headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization');	
	const getOptions = {
        method: 'GET',
        headers: headers
  }
  const url = ENDPOINT + '/utilisateur/detail?nom=' + text
  return  fetch(url, getOptions)
    .then((response) =>  response.json())
    .catch((error) => console.log(error))
}

export function getAllUtilisateur () {
  let headers = new Headers();
	headers.append('Authorization', 'Basic ' + base64_encode(username + ":" + password));
	headers.append('Content-Type', 'application/json');
	headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization');	
	const getOptions = {
        method: 'GET',
        headers: headers
  }
  const url = ENDPOINT + '/utilisateur/all'
  return  fetch(url, getOptions)
    .then((response) =>  response.json())
    .catch((error) => console.log(error))
}

export function getUtilisateurById (text) {
  
  const url = ENDPOINT + '/utilisateur/id?id=' + text
  let headers = new Headers();
	headers.append('Authorization', 'Basic ' + base64_encode(username + ":" + password));
	headers.append('Content-Type', 'application/json');
	headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization');	
	const getOptions = {
        method: 'GET',
        headers: headers
  }
  return  fetch(url, getOptions)
    .then((response) => {
		if (response.status >= 200 && response.status <= 299) {
			return response.json();
		} else {
			console.log("Response getUtilisateurById: " + response.statusText)
		}
	}
		
	)
	.catch((error) => console.log(error))
}

export function getInfoFromURL(text) {
	let headers = new Headers();
	headers.append('Authorization', 'Basic ' + base64_encode(username + ":" + password));
	headers.append('Content-Type', 'application/json');
	headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization');	
	const getOptions = {
        method: 'GET',
        headers: headers
  }
	const url = ENDPOINT + '/utilisateur/licence?url=' + text
	return  fetch(url, getOptions)
		.then((response) => {
			if (response.status >= 200 && response.status <= 299) {
				return response.json()
			} else {
				//console.warn('Aucun utilisateur trouvé avec cet identifiant. Merci de contacter un responsable.')
				throw Error(response.statusText);
			}
		})
		//.catch((error) => Alert.alert('Erreur !','Aucun utilisateur trouvé avec cet identifiant. Merci de contacter un responsable.'))
		.catch((error) => console.log('Aucun utilisateur trouvé avec cet identifiant. Merci de contacter un responsable.'))
}

export function getEquipmentsDispo() {
	
/*	console.log("1");
	const config = {
	  headers:{
		'Authorization': 'Basic ' + base64_encode(username + ":" + password),
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		"Access-Control-Allow-Credentials": "true",
		//"Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,DELETE",
		"Access-Control-Allow-Headers": "*"
	  }
	};
	
	const url = ENDPOINT + '/equipment/dispo'
		
	return axios.get(url, config)
		.then(result => { console.log(result.data.json()); return result.data.json(); })
		//.catch(err=> alert(err))
		.catch((error) => console.log('Il n\'y a pas d\'équipement dispo actuellement.'))*/
	
	let headers = new Headers();
	headers.append('Authorization', 'Basic ' + base64_encode(username + ":" + password));
	headers.append('Content-Type', 'application/json');
	headers.append('Access-Control-Allow-Origin', '*');
	headers.append("Access-Control-Allow-Credentials", "true");
	headers.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
	headers.append("Access-Control-Allow-Headers", "*");

	const getOptions = {
        method: 'GET',
        headers: headers,
		mode: 'cors'
	}
	const url = ENDPOINT + '/equipment/dispo'
	return fetch(url, getOptions)
    .then((response) => response.json())
    .catch((error) => console.log('Il n\'y a pas d\'équipement dispo actuellement.'))
	 
}

export async function getEquipmentByTag(tag) {
	let headers = new Headers();
	headers.append('Authorization', 'Basic ' + base64_encode(username + ":" + password));
	headers.append('Content-Type', 'application/json');
	headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization');	
	const getOptions = {
        method: 'GET',
        headers: headers
	}
	tag = tag.substring(0,11);
	const url = ENDPOINT + '/equipment/detail?tag=' + tag
	return  await fetch(url, getOptions)
    .then((response) => response.json())
    .catch((error) =>  console.log('Erreur','L\'élément n\'a pas été trouvé.'))
}

export async function getUtilisateurEquipment(tag) {
	let headers = new Headers();
	headers.append('Authorization', 'Basic ' + base64_encode(username + ":" + password));
	headers.append('Content-Type', 'application/json');
	headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization');	
	const getOptions = {
        method: 'GET',
        headers: headers
	}
	tag = tag.substring(0,11);
	const url = ENDPOINT + '/utilisateur/equipment?tag=' + tag
	//console.log(url);
	return  await fetch(url, getOptions)
    .then((response) => response.json())
	.catch((error) => console.log('Erreur','L\'élément n\'a pas été trouvé.'))
    //.catch((error) => console.log('Erreur','L\'élément n\'a pas été trouvé.'))
}

export  function getEquipmentUtilisateur(tagUser) {
	let headers = new Headers();
	headers.append('Authorization', 'Basic ' + base64_encode(username + ":" + password));
	headers.append('Content-Type', 'application/json');
	headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization');	
	const getOptions = {
        method: 'GET',
        headers: headers
	}
	const url = ENDPOINT + '/equipment/utilisateur?tag=' + tagUser
	//console.log(url);
	return   fetch(url, getOptions)
    .then((response) => response.json())
    .catch((error) => console.log('Erreur','L\'équipement n\'a pas été trouvé.'))
}

export function getEquipmentsEmprunt() {
	let headers = new Headers();
	headers.append('Authorization', 'Basic ' + base64_encode(username + ":" + password));
	headers.append('Content-Type', 'application/json');
	headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization');	
	
	//headers.append('Authorization', 'Basic ' + base64_encode(username + ":" + password));
	//headers.append('Content-Type', 'application/json');
	//headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	
	/*headers.append('Access-Control-Allow-Origin', '*');
	headers.append('Access-Control-Allow-Credentials', 'true');*/
	
    //headers.append('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization');
	/*headers.append('Access-Control-Allow-Methods', 'GET, OPTIONS');
	headers.append('Access-Control-Allow-Headers', '*');	*/
	
	const getOptions = {
        method: 'GET',
        headers: headers
    }
	
	const url = ENDPOINT + '/equipment/nondispo'
	
	return fetch(url, getOptions)
		.then((response) => response.json())
		.catch((error) => console.log('Il n\'y a pas d\'équipement emprunté actuellement.'))
}

export function setBorrowedEquipments(idEq, idUt) {
	let headers = new Headers();
	headers.append('Authorization', 'Basic ' + base64_encode(username + ":" + password));
	headers.append('Content-Type', 'application/json');
	idEq = idEq.substring(0,11);
	const getBorrowedEquipmentsOptions = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({ "tagEquipment": idEq, "idUtilisateur": idUt},
		)
    }
	const url = ENDPOINT + '/event/new'
	
	const response =  fetch(url, getBorrowedEquipmentsOptions)
		/*.then((response) => response.json())
		.catch((error) => 'error' )*/
		
		return response;
		
		
		
		/*(response) => {
			if (response.status === 404) {
			//	throw Error(response.statusText);
			}
				
		})*/
		//.catch((error) => console.log('L\'équipement n\'a pas été trouvé ou est déjà emprunté, merci de contacter un administrateur'));
	
	//await console.log('response borrowed: ' + response)
	/*const url2 = ENDPOINT + '/utilisateur/id?id=' + idUt
	return  fetch(url2)
		.then((response) => response.json())
		.catch((error) => console.error("Error fetch 2: " + error))	*/
	
}

export async function setBackEquipments(idEq, idUt ) {
	let headers = new Headers();
	headers.append('Authorization', 'Basic ' + base64_encode(username + ":" + password));
	headers.append('Content-Type', 'application/json');
	idEq = idEq.substring(0,11);
	const getBackEquipmentsOptions = {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify({ "tagEquipment": idEq, "idUtilisateur": idUt})
    }
	//console.log(getBackEquipmentsOptions);
	const url = ENDPOINT + '/event/delete'
	const response = await fetch(url, getBackEquipmentsOptions).then(
		(response) => {
			if (response.status === 404) {
				throw Error(response.statusText);
			}
		})
		//.catch((error) => console.log('Back : L\'équipement n\'a pas été trouvé, merci de contacter un administrateur'));
		return response;
	//await console.log('response back: ' + response)
	/*const url2 = ENDPOINT + '/utilisateur/id?id=' + idUt
	return  fetch(url2)
		.then((response) => response.json())
		.catch((error) => console.error("Error fetch 2: " + error))	*/
	
}

export async function getHistoricByEquipment (text) {
  let headers = new Headers();
	headers.append('Authorization', 'Basic ' + base64_encode(username + ":" + password));
	headers.append('Content-Type', 'application/json');
	headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization');	
	const getOptions = {
        method: 'GET',
        headers: headers
  }
  
  const url = ENDPOINT + '/event/historique?tag=' + text
  return await fetch(url,getOptions).then(
		(response) => {
			 if (response.ok) {
				return response.json();
			} else {
				throw Error(response.statusText);
			}
		})
		.catch((error) => {
			console.log('Erreur','L\'équipement n\'a pas été trouvé, merci de contacter un administrateur')
		})
}

/*export async function pushToken(token) {
	let headers = new Headers();
	headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
	headers.append('Content-Type', 'application/json');
	
	const getTokenOptions = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({ "idNotificationsToken": 0, "token": token, "idUtilisateur": 0}
		)
    }
	
	const url = ENDPOINT + '/notification/token'
	
	const response = await fetch(url, getTokenOptions).then(
		(response) => {
			if (response.status == 404) {
				throw Error(response.statusText);
			}
		})
}*/
