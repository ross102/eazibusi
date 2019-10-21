import React, { useState, useEffect, useContext } from 'react';
import NewContext from './userProvider';
import Jumbohouse from './Jumbohouse';
import axios from 'axios';

const Category = (props) => {
	return (
		<div>
			<ul className="nav nav-pills flex-column">
				<li className="nav-item">
					<a className="nav-link active" href="#">
						Shops
					</a>
				</li>
				<li className="nav-item dropdown">
					<a
						className="nav-link dropdown-toggle"
						data-toggle="dropdown"
						href="#"
						role="button"
						aria-haspopup="true"
						aria-expanded="false"
					>
						Products
					</a>
					<div className="dropdown-menu">
						<a className="dropdown-item" href="#">
							car spare-parts
						</a>
						<a className="dropdown-item" href="#">
							native wears
						</a>
						<a className="dropdown-item" href="#">
							Suits
						</a>
						<div className="dropdown-divider" />
						<a className="dropdown-item" href="#">
							clothes
						</a>
						<a className="dropdown-item" href="#">
							phones
						</a>
						<a className="dropdown-item" href="#">
							Electrical appliances
						</a>
						<a className="dropdown-item" href="#">
							laptops
						</a>
						<a className="dropdown-item" href="#">
							Others
						</a>
					</div>
				</li>
				<li className="nav-item">
					<a className="nav-link" href="#">
						Brands
					</a>
				</li>
				<li className="nav-item">
					<a className="nav-link disabled" href="#">
						children
					</a>
				</li>
			</ul>
		</div>
	);
};

export default Category;

// <ul class="nav nav-pills flex-column">
//     <li class="nav-item">
//         <a class="nav-link active" href="#">Active</a>
//     </li>
//     <li class="nav-item dropdown">
//         <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
//         <div class="dropdown-menu">
//             <a class="dropdown-item" href="#">Action</a>
//             <a class="dropdown-item" href="#">Another action</a>
//             <a class="dropdown-item" href="#">Something else here</a>
//             <div class="dropdown-divider"></div>
//             <a class="dropdown-item" href="#">Separated link</a>
//         </div>
//     </li>
//     <li class="nav-item">
//         <a class="nav-link" href="#">Link</a>
//     </li>
//     <li class="nav-item">
//         <a class="nav-link disabled" href="#">Disabled</a>
//     </li>
// </ul>
