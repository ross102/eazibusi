import React, { useState, useEffect } from 'react';
import './App.css';
import Signup from './components/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavLayout from './components/Navbar';
import Footer from './components/Footer';
import { UserProvider } from './components/userProvider';

function App() {
	let mounted = false;
	const [ nUser, setNuser ] = useState({
		loggedIn: false,
		user: ''
	});
	const checkUser = () => {
		mounted = true;
		const signedIn = JSON.parse(sessionStorage.getItem('NewUser')) || '';
		if (signedIn !== '') setNuser({ loggedIn: true, user: signedIn });
		else {
			setNuser({ loggedIn: false, user: signedIn });
		}
	};
	const uncheckUser = () => {
		mounted = false;
	};
	return (
		<div>
			<UserProvider value={{ ...nUser, checkUser, uncheckUser }}>
				<NavLayout />
				<Footer />
			</UserProvider>
		</div>
	);
}

export default App;
