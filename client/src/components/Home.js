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
	let { signedIn } = useContext(AuthContext);
	// console.log(signedIn);

	const verify = () => {
		axios
			.get('/user/success', { headers: { 'x-access-token': signedIn || '' } })
			.then((res) => {
				if (res.data.user) {
					window.localStorage.setItem('userInfo', JSON.stringify(res.data.user));
				}
			})
			.catch((err) => {
				throw new Error(err);
			});
	};

	// useEffect(
	// 	() => {
	// 		if (signedIn !== null) {
	// 			check();
	// 		}
	// 	},
	// 	[ signedIn ]
	// );

	useEffect(() => {
		window.location.reload();
		verify();
		// let query = queryString.parse(props.location.search);
		// if (query.token) {
		// 	window.sessionStorage.setItem('userToken', JSON.stringify(query.token));
		// 	props.history.push('/');
		// 	window.location.reload();
		// }
		// if (signedIn) {
		// 	setTimeout(() => {
		// 		window.location.reload();
		// 	}, 2000);
		// }
		console.log(signedIn);
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
