import React from 'react';
import ReactDOM from 'react-dom';
import PokemonList from './components/pokemon-list';
import './styles/pokemon-list.css'; 
import { createRoot } from "react-dom/client";


const container = document.getElementById("root");
const root = createRoot(container);
root.render(<PokemonList />);
