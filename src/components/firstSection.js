import React, { useState, useEffect, useContext } from 'react';
import Category from './Category';
import Shop from './Shop';

const FirstSection = (props) => {
	return (
		<div>
			<div className="container text-center">
				<div className="row mb-3">
					<div className="col-md-4" />
					<div className="col-md-4">
						<h3 className="text-success">Categories</h3>
						<Category />
					</div>
				</div>
				<h3 className="text-success">Shops</h3>
				<hr />
				<div className="row">
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

export default FirstSection;
