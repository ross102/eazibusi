import React, { useState, useEffect, useContext } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import NewContext from './userProvider';
import Jumbohouse from './Jumbohouse';
import FirstSection from './firstSection';
import axios from 'axios';

const Login = (props) => {
	const [ mes, setMes ] = useState({ message: '', loading: '' });
	const [ log, setLog ] = useState({ username: '', password: '' });

	const handleSubmit = (event) => {
		event.preventDefault();
		setMes({ ...mes, loading: 'loading... ' });
		axios
			.post('http://localhost:5000/user/login', log)
			.then((res) => {
				sessionStorage.setItem('NewUser', JSON.stringify(res.data.user));
				console.log(res);
				props.history.push({
					pathname: '/',
					state: {
						roleID: res.data.id,
						user: res.data.user,
						message: 'welcome back! '
					}
				});
				return;
			})
			.catch((error) => {
				if (error && error.status === 400) {
					setMes({ ...mes, message: error.response.data.user, loading: '' });
				}
				if (error.response) {
					setMes({ message: '', loading: '' });
				}
				return;
			});
	};

	const handleClick = (event) => {
		setLog({ ...log, [event.target.name]: event.target.value });
	};
	const handleFacebook = (event) => {
		window.location.href = 'http://localhost:5000/auth/facebook';
	};
	return (
		<div className="container mt-5 text-center">
			<p className="text-danger">{mes.message && mes.message}</p>
			<div className="row">
				<div className="col-md-4" />
				<div className="col-md-4 mb-5 ">
					<h3> Login </h3>
					<hr />
					<Form onSubmit={handleSubmit} className="mt-2">
						<FormGroup>
							<Label for="name">Name</Label>
							<Input type="text" value={log.username} onChange={handleClick} name="username" />
						</FormGroup>
						<FormGroup>
							<Label for="Password">Password</Label>
							<Input type="password" value={log.password} onChange={handleClick} name="password" />
						</FormGroup>
						<p className="text-primary">{mes.loading && mes.loading}</p>
						<Button className="mt-2" style={{ backgroundColor: '#000080', width: '100%' }}>
							Login
						</Button>
					</Form>
				</div>
			</div>
			<div className="row">
				<div className="col-md-4 " />
				<div className="col-md-4 ">
					<button onClick={handleFacebook} style={{ width: '100%' }} className="btn btn-primary">
						Login with Facebook
					</button>
				</div>
			</div>
			<div className="row">
				<div className="col-md-4 " />
				<div className="col-md-4 mt-3 mb-5">
					<button style={{ width: '100%' }} className="btn btn-danger">
						Login with Google
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
