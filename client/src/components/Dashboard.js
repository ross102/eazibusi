import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Dashboard = (props) => {
	let { signedIn } = useContext(AuthContext);
	const [ message, setMessage ] = useState({ message: '' });

	function check() {
		setMessage({ message: 'welcome to eazibusi' });
		// msg timeout
		setTimeout(function() {
			setMessage({ message: '' });
		}, 6000);
	}

	useEffect(() => {
		check();
	}, []);

	return (
		<div>
			<h6 id="msg" style={{ marginBottom: '0', color: 'green' }}>
				{message.message && message.message}
			</h6>

			<h4> This is your Dashboard ! </h4>
		</div>
	);
};

export default Dashboard;
