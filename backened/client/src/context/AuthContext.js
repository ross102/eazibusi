import React, { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext();

function AuthProvider(props) {
	let signedIn = JSON.parse(sessionStorage.getItem('loggedUser'));
	return (
		<div>
			<AuthContext.Provider value={{ signedIn }}>{props.children}</AuthContext.Provider>
		</div>
	);
}

export default AuthProvider;
