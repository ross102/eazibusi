import React, { useState, useEffect, useContext } from 'react';
import Jumbotron from './Jumbotron';
import Slider from './Slider';

const SecondSection = (props) => {
	const fourthJumbo = {
		backgroundColor: 'teal',
		height: '300px',
		width: '50vw'
	};
	const welcm2 = 'Best Deals Ever!! ';
	const rotate4 = ' text-light pt-5  text-center';
	const rotate5 = 'text-light text-center';
	const secondWords = 'get the best deals at an affordable price';
	return (
		<div className="container-fluid mt-3 text-center">
			<div className="row mb-3">
				<hr />
				<div className="col-md-4 px-0 mx-md-0">
					<Slider />
				</div>
				<div className="col-md-4" />
			</div>
		</div>
	);
};

export default SecondSection;

// <div className="col-md-6 px-0 mx-0">
// 	<Jumbotron
// 		welcm={welcm2}
// 		rotate={rotate4}
// 		firstJumbo={fourthJumbo}
// 		firstWords={secondWords}
// 		firstStyle={rotate5}
// 	/>
// </div>
