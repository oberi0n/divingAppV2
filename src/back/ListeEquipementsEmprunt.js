import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getEquipmentsEmprunt } from '../api/DivingApi'

import BugReportRoundedIcon from '@mui/icons-material/BugReportRounded';
import BackpackIcon from '@mui/icons-material/Backpack';
import EarbudsIcon from '@mui/icons-material/Earbuds';



class ListeEquipementsEmprunt extends React.Component {
 
  
 constructor(props) {
    super(props)
	this.state = {
		equipments: [],
		isLoading: true
	}
 }
 componentDidMount() {
	 
	this._Mounted = true;
    if (this._Mounted) {
		this._loadEquipmentsEmprunt(); 
	}
 }
 
 _loadEquipmentsEmprunt(){
	this.setState({ isLoading: true })
 	getEquipmentsEmprunt().then(data => {
		if(data === undefined){
			console.log('Aïe !','Soit il n\'y a plus d\'équipements, soit il y a une erreur !');
			this.setState({ isLoading: false })
			//this.props.navigation.navigate("MainMenu");
		}else{
			//console.log('data');
			data.sort(function(a,b) {
				return (a.libelle > b.libelle) ? 1 : ((b.libelle > a.libelle) ? -1 : 0);
			});

			this.setState({ equipments: data, isLoading: false });

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



 render() {
const columns = [
  { id: 'prenom', label: 'Prénom', minWidth: 50, align: 'center' }, 
  { id: 'nom', label: 'Nom', minWidth: 50, align: 'center' }, 
  { id: 'libelle', label: 'Libelle', minWidth: 80 },
  { id: 'marque', label: 'Marque', minWidth: 100 },
  { id: 'taille', label: 'Taille',  minWidth: 50, align: 'center' },
];
	  
  return (
    <Paper sx={{ width: '100%',overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 670 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.equipments
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id+row.idEquipment} align={column.align}
						>
							{column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
}
export default ListeEquipementsEmprunt