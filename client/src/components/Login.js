import React, { useState, useEffect, useContext } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import FirstSection from './firstSection';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
	const [ mes, setMes ] = useState({ message: '', loading: '' });
	const [ log, setLog ] = useState({ email: '', password: '' });

	const handleSubmit = (event) => {
		event.preventDefault();
		setMes({ ...mes, loading: 'loading... ' });
		axios
			.post('/user/login', log)
			.then((res) => {
				if (res.data.success) {
					window.localStorage.setItem('userToken', JSON.stringify(res.data.token));
					props.history.push({
						pathname: '/'
					});
				}
			})
			.catch((error) => {
				if (error && error.status === 400) {
					setMes({ ...mes, message: error.response.err, loading: '' });
				}
				if (error.response) {
					setMes({ message: error.response.err, loading: '' });
				}
				return;
			});
	};

	const handleClick = (event) => {
		setLog({ ...log, [event.target.name]: event.target.value });
	};
	const handleFacebook = (event) => {
		window.location.href = '/auth/facebook';
	};
	const handleGoogle = (event) => {
		window.location.href = '/auth/google';
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
							<Label for="name">Email</Label>
							<Input type="email" value={log.email} onChange={handleClick} name="email" />
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
					<button onClick={handleGoogle} style={{ width: '100%' }} className="btn btn-danger">
						Login with Google
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
