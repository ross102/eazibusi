import React from 'react';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const Footer = () => {
	return (
		<div style={{ backgroundColor: '#000080' }} className="container-fluid mb-0 pb-0 mt-5 text-light">
			<div className="row">
				<div className="col-md-3 col-sm-1" />
				<div className="col-md-6 col-sm-12 mt-5">
					<Form>
						<FormGroup>
							<Input
								type="text"
								name="subcribe"
								placeholder="abc@example.com"
								style={{
									border: '3px solid white',
									width: '60%',
									borderOutline: 'none',
									outline: 'none',
									boxShadow: 'none'
								}}
							/>
							<p className="text-muted"> We won't spam your email</p>
							<button
								className="btn btn-outline-light "
								style={{
									position: 'absolute',
									left: '65%',
									top: 0
								}}
							>
								Subscribe
							</button>
						</FormGroup>
					</Form>
				</div>
			</div>
			<div className="row mt-3">
				<div className="col-md-3 col-sm-12 mt-md-1 mb-4 ">
					<h5> Navigation</h5>
					<div className="col">Home</div>
					<div className="col">About</div>
					<div className="col">Contact</div>
					<div className="col">Register</div>
					<div className="col">Questions</div>
				</div>
				<div className="col-md-3 col-sm-12 mt-md-1 mb-4  ">
					<h5> Powered By</h5>
					<div className="col">Eunatel Nigeria</div>
					<div className="col">devHeros</div>
				</div>
				<div className="col-md-3 col-sm-12 mt-md-1 mb-4 ">
					<h5> Services</h5>
					<div className="col">Store owners</div>
					<div className="col">Buyers</div>
					<div className="col">Policy</div>
					<div className="col">Online help</div>
					<div className="col ">Copyright</div>
				</div>
				<div className="col-md-3 col-sm-12 mt-md-1 mb-sm-4 mb-4 ">
					<h5> Social media</h5>
					<div className="col pb-2">
						<i className="fa fa-twitter fa-lg " /> Twitter{' '}
					</div>
					<div className="col pb-2">
						<i className="fa fa-youtube fa-lg " /> Youtube
					</div>
					<div className="col pb-2">
						<i className="fa fa-facebook fa-lg " /> Facebook
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
