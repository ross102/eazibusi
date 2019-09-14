import React, { useState, memo, useEffect, Component, useContext } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewContext from './userProvider';
import axios from 'axios';

function SignUp(props) {
	const value = useContext(NewContext);
	const [ cur, setCur ] = useState({
		username: '',
		email: '',
		password: '',
		Cpassword: '',
		phone: ''
	});
	const [ chk, setChk ] = useState({
		terms: false
	});

	const [ nameErr, setName ] = useState({ name: '' });
	const [ emailErr, setEmail ] = useState({ email: '' });
	const [ pErr, setpErr ] = useState({ password: '' });
	const [ cErr, setcErr ] = useState({ Cpassword: '' });
	const [ phoneErr, setPhone ] = useState({ phone: '' });
	const [ termsErr, setTerms ] = useState({ terms: false });
	const [ serverErr, setServer ] = useState({ err: '' });

	let error = {};
	const handleSubmit = (event) => {
		event.preventDefault();
		// validate data
		validateInput();
		const check = error.hasOwnProperty('err');
		if (check === false) {
			// send data to backened
			sendData();
			// empty form
			setCur({
				username: '',
				email: '',
				password: '',
				Cpassword: '',
				phone: ''
			});
			setChk({
				terms: false
			});
		}
	};

	const handleChange = (event) => {
		setCur({
			...cur,
			[event.target.name]: event.target.value
		});
	};
	const handleCheck = () => {
		setChk({
			...chk,
			terms: !chk.terms
		});
	};
	const validateInput = () => {
		if (cur.username.length < 4 || !cur.username.match(/^[a-zA-Z ]+$/)) {
			setName({ name: 'invalid name' });
			error.err = true;
		} else {
			setName({ name: '' });
		}
		if (!cur.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
			setEmail({ email: 'email is not yet valid' });
			error.err = true;
		} else {
			setEmail({ email: '' });
		}
		if (cur.password.length < 6) {
			setpErr({ password: 'should be more than five characters' });
			error.err = true;
		} else {
			setpErr({ password: '' });
		}
		if (cur.Cpassword !== cur.password) {
			setcErr({ Cpassword: 'Passwords do not match' });
			error.err = true;
		} else {
			setcErr({ Cpassword: '' });
		}
		if (cur.phone.length < 11) {
			setPhone({ phone: 'Please your number is not correct' });
			error.err = true;
		} else {
			setPhone({ phone: '' });
		}
		if (cur.terms === false) {
			setTerms({ terms: 'terms and conditions apply' });
			error.err = true;
		} else {
			setTerms({ terms: '' });
		}
		return error;
	};

	const sendData = () => {
		const data = { ...cur, ...chk };
		axios
			.post('eazibusi.herokuapp.com/user', data)
			.then((res) => {
				console.log(res);
				setServer({ err: '' });
				sessionStorage.setItem('NewUser', JSON.stringify(res.data.name));
				props.history.push({
					pathname: '/',
					state: {
						roleID: res.data.id,
						user: res.data.name,
						message: 'Welcome to Eazibusi '
					}
				});
			})
			.catch((erro) => {
				if (erro.response) {
					setServer({ err: erro.response.data.msg || '' });
				}
			});
		return;
	};

	return (
		<div className="container mt-5">
			<div className="row">
				<div className="col-md-3" />
				<div className="col-md-5 mb-5">
					<h5 style={{ color: '#000080' }}>
						{/* <i className="fa fa-registered fa-lg" /> */}
						Register
					</h5>
					<hr />
					<p className="text-danger"> {serverErr.err ? serverErr.err : ''} </p>
					<Form onSubmit={handleSubmit} className="mt-2">
						<FormGroup>
							<Label for="name">Name</Label>
							<Input
								type="text"
								name="username"
								placeholder="enter your name "
								onChange={handleChange}
								required
								value={cur.username}
							/>
							<p className="text-danger"> {nameErr.name && nameErr.name} </p>
						</FormGroup>
						<FormGroup>
							<Label for="Email">Email</Label>
							<Input
								name="email"
								key="1"
								placeholder="enter your email"
								onChange={handleChange}
								value={cur.email}
								required
							/>
							<p className="text-danger">{emailErr.email && emailErr.email}</p>
						</FormGroup>
						<FormGroup>
							<Label for="Password">Password</Label>
							<Input
								type="password"
								name="password"
								onChange={handleChange}
								required
								value={cur.password}
							/>
							<p className="text-danger">{pErr.password && pErr.password}</p>
						</FormGroup>
						<FormGroup>
							<Label for="Cpassword">Confirm Password</Label>
							<Input
								type="password"
								name="Cpassword"
								onChange={handleChange}
								required
								value={cur.Cpassword}
							/>
							<p className="text-danger">{cErr.Cpassword && cErr.Cpassword}</p>
						</FormGroup>
						<FormGroup>
							<Label for="phone"> Phone number </Label>
							<Input type="number" required name="phone" onChange={handleChange} value={cur.phone} />
							<p className="text-danger">{phoneErr.phone && phoneErr.phone}</p>
						</FormGroup>
						<FormGroup tag="fieldset">
							<FormGroup>
								<Label>
									<Input
										onChange={handleCheck}
										id="terms"
										required
										type="checkbox"
										checked={chk.terms}
										name="terms"
									/>
									I agree to the terms and conditons of Eazibusi
								</Label>
								<p className="text-danger">{termsErr.terms && termsErr.terms}</p>
							</FormGroup>
						</FormGroup>
						<Button style={{ width: '100%' }} className="btn-success">
							<i className="fa fa-registered fa-lg" /> Register
						</Button>
					</Form>
					<p className="mt-3">
						or login <a href="#">here</a>
					</p>
				</div>
			</div>
		</div>
	);
}

export default SignUp;
