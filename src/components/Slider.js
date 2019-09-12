import React, { useState, useEffect, useContext } from 'react';
import NewContext from './userProvider';

const Slider = (props) => {
	return (
		<div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
			<div className="carousel-inner">
				<div className="carousel-item active">
					<img
						src="../../images/shop2.jpg"
						style={{ width: '100%', height: '300px' }}
						className="d-block w-100"
						alt="..."
					/>
				</div>
				<div className="carousel-item">
					<img
						src="../../images/shop3.jpg"
						style={{ width: '100%', height: '300px' }}
						className="d-block w-100"
						alt="..."
					/>
				</div>
				<div className="carousel-item">
					<img
						src="../../images/shop4.jpg"
						style={{ width: '100%', height: '300px' }}
						className="d-block w-100"
						alt="..."
					/>
				</div>
			</div>
		</div>
	);
};

export default Slider;
