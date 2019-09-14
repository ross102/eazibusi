import React, { useState, useEffect, useContext } from 'react';
import NewContext from './userProvider';
import Jumbotron from './Jumbotron';

const Jumbohouse = (props) => {
	// const value = useContext(NewContext);
	// const { checkUser, uncheckUser, loggedIn, user } = value;
	const firstJumbo = {
		backgroundImage: 'url(../../images/wallpaper3.png)',
		backgroundPosition: 'center',
		height: '400px',
		width: '100vw'
	};
	const secondJumbo = {
		backgroundColor: '#B22222',
		height: '50%',
		width: '100%'
	};
	// const thirdJumbo = {
	// 	backgroundImage: 'url(../../images/alaba7.jpg) ',
	// 	height: '250px',
	// 	width: '100vw',
	// 	backgroundPosition: 'center'
	// };
	const welcm = 'Easibusi';
	const firstWords = 'Business made easy';
	const rotate = ' rotated display-3 text-light text-center';
	const rotate2 = 'text-success text-center';
	const jumbo = 'jumbotron my-0';
	const jumbo2 = 'jumbotron mt-0';

	//second jumbo
	const welcm2 = 'Welcome! Locate and buy from your favorite sellers. ';
	const rotate3 = 'rotated text-light text-center';
	const rotate4 = 'text-warning text-center';
	const secondWords =
		' Bringing different quality products and services from the Nigerian markets to your door-step. Know your sellers, manufacturers, retailers, their shop location and more.';
	//third Jumbo

	const welcm3 = '';
	const thirdWords = 'Get the best deals';
	const rotate5 = 'text-dark text-center rotated3';

	return (
		<div className="mt-0">
			<Jumbotron
				jumbo={jumbo}
				firstJumbo={firstJumbo}
				rotate={rotate}
				welcm={welcm}
				firstWords={firstWords}
				firstStyle={rotate2}
			/>
			<Jumbotron
				jumbo={jumbo2}
				firstJumbo={secondJumbo}
				welcm={welcm2}
				rotate={rotate3}
				firstWords={secondWords}
				firstStyle={rotate4}
			/>
		</div>
	);
};

export default Jumbohouse;
