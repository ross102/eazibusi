import React, { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext();
const signedIn = JSON.parse(sessionStorage.getItem('userToken')) || null;

console.log(signedIn);
function AuthProvider(props) {
	return (
		<div>
			<AuthContext.Provider value={{ signedIn }}>{props.children}</AuthContext.Provider>
		</div>
	);
}

export default AuthProvider;
