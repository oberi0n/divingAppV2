import React from 'react';
import "./App.css"; //Import du style globale

//Import des composants basiques de navigation
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Import des composants pages
import MainMenu from "./components/MainMenu";
import {BareCodeReaderWithRouter} from "./components/private/BareCodeReader";
import BareCodeResult from "./components/private/BareCodeResult";
import {EquipementsDispoWithRouter} from "./components/private/EquipementsDispo";

import {EquipementsEmpruntWithRouter} from "./components/private/EquipementsEmprunt";
import {EquipmentDetailWithRouter} from "./components/private/EquipmentDetail";
import {EquipmentRestitutionWithRouter} from "./components/private/EquipmentRestitution";

import {UtilisateursWithRouter} from "./components/private/Utilisateurs";
import {HistoriqueWithRouter} from "./components/private/Historique";
import {BareCodeObtenirWithRouter} from "./components/private/BareCodeObtenir";

import Login from './components/Login';

export default function App() {
  return (

    <BrowserRouter>
      <Routes>
        
        <Route exact path="/home" element={<MainMenu />} />
        <Route path="/barecodereader" element={<BareCodeReaderWithRouter />} />
        <Route path="/barecoderesult" element={<BareCodeResult />} />
        <Route path="/equipementsdispo" element={<EquipementsDispoWithRouter />} />
        <Route path="/equipementsemprunt" element={<EquipementsEmpruntWithRouter />} />
        <Route path="/equipmentdetail" element={<EquipmentDetailWithRouter />} />
        <Route path="/equipmentRestitution" element={<EquipmentRestitutionWithRouter />} />
        <Route path="/utilisateurs" element={<UtilisateursWithRouter />} />
        <Route path="/obtenir" element={<BareCodeObtenirWithRouter />} />
        <Route path="/historique" element={<HistoriqueWithRouter />} />	


        <Route path="/" element={<Login />} />	
        
      </Routes>
    </BrowserRouter>
  );
}