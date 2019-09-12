import React, { useState, useEffect, useContext } from 'react';
import Category from './Category';
import Shop from './Shop';

const ThirdSection = (props) => {
	return (
		<div>
			<div className="container text-center">
				<h3 className="text-success">Featured Items</h3>
				<hr />
				<div className="row ">
					<div className="col-md-3">
						<Shop />
					</div>
					<div className="col-md-3">
						<Shop />
					</div>
					<div className="col-md-3">
						<Shop />
					</div>
					<div className="col-md-3">
						<Shop />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ThirdSection;
