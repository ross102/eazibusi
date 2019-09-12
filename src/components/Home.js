import React, { useState, useEffect, useContext } from 'react';
import NewContext from './userProvider';
import Jumbohouse from './Jumbohouse';
import FirstSection from './firstSection';
import axios from 'axios';
import SecondSection from './SecondSection';
import ThirdSection from './ThirdSection';

const Home = (props) => {
	const value = useContext(NewContext);
	const { checkUser, uncheckUser, loggedIn, user } = value;
	const msg = {};

	// const uncheckUser = () => {
	// 	sessionStorage.removeItem('NewUser');
	// };

	// useEffect(function() {
	// 	checkUser();
	// 	uncheckUser();
	// }, []);
	// set message
	if (loggedIn === true) return (msg.newMsg = 'Welcome to Eazibusi ' + user);
	else {
		msg.newMsg = '';
	}

	return (
		<div>
			<h4 className={msg.newMsg === '' ? 'mb-0' : 'mb-2'}> {msg.hasOwnProperty('newMsg') && msg.newMsg}</h4>
			<Jumbohouse />
			<FirstSection />
			<SecondSection />
			<ThirdSection />
		</div>
	);
};

export default Home;
