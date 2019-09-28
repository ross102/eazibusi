import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Dashboard = (props) => {
	// let { signedIn } = useContext(AuthContext);
	// console.log(signedIn);
	// const [ message, setMessage ] = useState({ message: '' });

	// function check() {
	// 	location.reload();
	// 	setMessage({ message: 'welcome to eazibusi' });
	// 	// msg timeout
	// 	setTimeout(function() {
	// 		setMessage({ message: '' });
	// 	}, 6000);
	// }

	// useEffect(() => {
	// 	check();
	// }, []);

	return (
		<div>
			{/* <h4 id="msg" style={{ marginBottom: '0', color: 'green' }}>
				{message.message && message.message}
			</h4> */}

			<h4> Hello </h4>
		</div>
	);
};

export default Dashboard;
