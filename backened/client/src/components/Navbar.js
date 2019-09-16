import { useState, useEffect } from 'react';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Form,
	FormGroup,
	Label,
	Input,
	FormText
} from 'reactstrap';
import SignUp from './Signup';
import Home from './Home';
import Login from './Login';

function NavLayout() {
	const [ person, setPerson ] = useState({ newUser: '', loggedIn: false });
	const getUser = async () => {
		const per = await JSON.parse(sessionStorage.getItem('NewUser'));
		if (per) {
			setPerson({ newUser: per, loggedIn: true });
		}
		console.log(per);
	};

	useEffect(
		() => {
			getUser();
			getUser();
		},
		[ person.newUser ]
	);

	return (
		<Router>
			<nav
				style={{ width: '100vw', backgroundColor: '#B22222' }}
				className="navbar navbar-expand-lg navbar-dark "
			>
				<Link to="" className="navbar-brand">
					{/* <img src="../images/Eazi-logo3.png" />  */}
					EaziBusi
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarColor01"
					aria-controls="navbarColor01"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>

				<div className="collapse navbar-collapse" id="navbarColor01">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item active">
							<Link to="" className="nav-link">
								<i className="fa fa-home fa-lg" /> Home <span className="sr-only">(current)</span>
							</Link>
						</li>
						{!person.loggedIn && (
							<li className="nav-item active">
								<Link to="/register" className="nav-link">
									<i className="fa fa-user fa-lg" /> Sign up
								</Link>
							</li>
						)}
						{!person.loggedIn && (
							<li className="nav-item active">
								<Link to="/login" className="nav-link">
									<i className="fa fa-sign-in fa-lg" /> Login
								</Link>
							</li>
						)}
						{person.loggedIn && (
							<li className="nav-item active">
								<Link to="#" className="nav-link">
									Logged in as {person.newUser}
								</Link>
							</li>
						)}
						{person.loggedIn && (
							<li className="nav-item active">
								<Link to="#" className="nav-link">
									Dashboard
								</Link>
							</li>
						)}
						<li className="nav-item active">
							<Link to="/services" className="nav-link">
								<i className="fa fa-question fa-lg" /> Services
							</Link>
						</li>
						<li className="nav-item active">
							<Link to="/About" className="nav-link">
								About
							</Link>
						</li>
						<li className="nav-item active">
							<Link to="/about" className="nav-link">
								<i className="fa fa-shopping-cart fa-lg" /> cart
							</Link>
						</li>
					</ul>
					<form className="form-inline my-2 my-lg-0">
						<input className="form-control mr-sm-2" type="text" placeholder="Search" />
						<button className="btn btn-outline-light my-2 my-sm-0" type="submit">
							Search
						</button>
					</form>
				</div>
			</nav>
			<Route path="/" exact component={Home} />
			{/* <Route path="/about/" component={About} /> */}
			<Route path="/register" component={SignUp} />
			<Route path="/login" component={Login} />
		</Router>
	);
}

// class NavLayo extends React.Component {
// 	constructor(props) {
// 		super(props);

// 		this.toggle = this.toggle.bind(this);
// 		this.state = {
// 			isOpen: false
// 		};
// 	}
// 	toggle() {
// 		this.setState({
// 			isOpen: !this.state.isOpen
// 		});
// 	}
// 	render() {
// 		return (
// 			<div>
// 				<Navbar dark color="success" expand="md">
// 					<NavbarToggler style={{ border: '1px solid white' }} onClick={this.toggle} />
// 					<NavbarBrand href="/">EaziBusi</NavbarBrand>

// 					<Collapse isOpen={this.state.isOpen} navbar>
// 						<Nav className="ml-auto" navbar>
// 							<NavItem>
// 								<Link href="/">
// 									<NavLink>
// 										<i className="fa fa-home fa-lg" /> Home
// 									</NavLink>
// 								</Link>
// 							</NavItem>
// 							<NavItem>
// 								<Link href="/">
// 									<NavLink>
// 										<i className="fa fa-user fa-lg " /> Register
// 									</NavLink>
// 								</Link>
// 							</NavItem>
// 							<NavItem>
// 								<Link href="/">
// 									<NavLink>
// 										<i className="fa fa-user fa-lg " /> Login
// 									</NavLink>
// 								</Link>
// 							</NavItem>
// 							<NavItem>
// 								<Link href="/">
// 									<NavLink>
// 										<i className="fa fa-question fa-lg " /> Questions
// 									</NavLink>
// 								</Link>
// 							</NavItem>
// 							<UncontrolledDropdown nav inNavbar>
// 								<DropdownToggle nav caret>
// 									Services
// 								</DropdownToggle>
// 								<DropdownMenu right>
// 									<DropdownItem>Option 1</DropdownItem>
// 									<DropdownItem>Option 2</DropdownItem>
// 									<DropdownItem divider />
// 									<DropdownItem>Reset</DropdownItem>
// 								</DropdownMenu>
// 							</UncontrolledDropdown>
// 							<UncontrolledDropdown nav inNavbar>
// 								<DropdownToggle nav caret>
// 									<i className="fa fa-people fa-lg" />Markets in Lagos
// 								</DropdownToggle>
// 								<DropdownMenu right>
// 									<Link>
// 										<DropdownItem>Alaba international market</DropdownItem>
// 									</Link>
// 									<Link>
// 										<DropdownItem>Balogun market, Lagos island</DropdownItem>
// 									</Link>
// 									<Link>
// 										<DropdownItem>Computer village</DropdownItem>
// 									</Link>
// 									<Link>
// 										<DropdownItem>Ikotun market</DropdownItem>
// 									</Link>
// 									<Link>
// 										<DropdownItem>Idumota market</DropdownItem>
// 									</Link>
// 									<Link>
// 										<DropdownItem>Ladipo market</DropdownItem>
// 									</Link>
// 									<Link>
// 										<DropdownItem>Oyinbo market</DropdownItem>
// 									</Link>
// 									<Link>
// 										<DropdownItem>Mile 12 market</DropdownItem>
// 									</Link>
// 									<Link>
// 										<DropdownItem>Oshodi market</DropdownItem>
// 									</Link>
// 									<Link>
// 										<DropdownItem>Tejuosho market</DropdownItem>
// 									</Link>
// 								</DropdownMenu>
// 							</UncontrolledDropdown>
// 						</Nav>
// 					</Collapse>
// 				</Navbar>
// 			</div>
// 		);
// 	}
// }

export default NavLayout;