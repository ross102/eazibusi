import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Jumbotron(props) {
	return (
		<div className={props.jumbo} style={props.firstJumbo}>
			<h2 className={props.rotate}>{props.welcm}</h2>
			<h5 className={props.firstStyle}>{props.firstWords}</h5>
		</div>
	);
}

export default Jumbotron;

// <div class="jumbotron">
//     <h1 class="display-3">Hello, world!</h1>
//     <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
//     <hr class="my-4">
//         <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
//         <p class="lead">
//             <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
//         </p>
// </div>
