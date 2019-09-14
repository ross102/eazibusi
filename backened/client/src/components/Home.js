import React, { useState, useEffect, useContext } from 'react';
import NewContext from './userProvider';
import Jumbohouse from './Jumbohouse';
import FirstSection from './firstSection';
import axios from 'axios';
import SecondSection from './SecondSection';
import ThirdSection from './ThirdSection';

const Home = (props) => {
	const [ message, setMessage ] = useState({ message: '' });
	const [ newUser, setUser ] = useState({ user: '' });

	function check() {
		if (props.location.state) {
			setMessage({ message: props.location.state.message });
			setUser({ user: props.location.state.user });
			// msg timeout
			setTimeout(function() {
				setMessage({ message: '' });
			}, 6000);
		}
	}

	useEffect(
		() => {
			check();
		},
		[ newUser.user ]
	);

	return (
		<div>
			<h4 id="msg" style={{ marginBottom: '0', color: 'green' }}>
				{message.message && message.message + newUser.user}
			</h4>
			<Jumbohouse />
			<FirstSection />
			<SecondSection />
			<ThirdSection />
		</div>
	);
};

export default Home;
