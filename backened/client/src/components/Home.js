import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Jumbohouse from './Jumbohouse';
import FirstSection from './firstSection';
import axios from 'axios';
import queryString from 'query-string';
import SecondSection from './SecondSection';
import ThirdSection from './ThirdSection';

const Home = (props) => {
	// let { signedIn } = useContext(AuthContext);
	// console.log(signedIn);

	// function check() {
	// 	setMessage({ message: 'welcome to eazibusi' });
	// 	// msg timeout
	// 	setTimeout(function() {
	// 		setMessage({ message: '' });
	// 	}, 6000);
	// }

	// useEffect(
	// 	() => {
	// 		if (signedIn !== null) {
	// 			check();
	// 		}
	// 	},
	// 	[ signedIn ]
	// );

	useEffect(() => {
		let query = queryString.parse(props.location.search);
		if (query.token) {
			window.sessionStorage.setItem('userToken', JSON.stringify(query.token));
			props.history.push('/');
			window.location.reload();
		}
	}, []);

	return (
		<div>
			{/* <h4 id="msg" style={{ marginBottom: '0', color: 'green' }}>
				{message.message && message.message}
			</h4> */}
			<Jumbohouse />
			<FirstSection />
			<SecondSection />
			<ThirdSection />
		</div>
	);
};

export default Home;
