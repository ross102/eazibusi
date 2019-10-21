import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import Signup from './components/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavLayout from './components/Navbar';
import Footer from './components/Footer';
import AuthProvider from './context/AuthContext';

function App() {
	return (
		<div>
			<AuthProvider>
				<NavLayout />
				<Footer />
			</AuthProvider>
		</div>
	);
}

export default App;
