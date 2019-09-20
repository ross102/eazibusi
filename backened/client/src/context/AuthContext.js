import React, { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext();
let signedIn = JSON.parse(sessionStorage.getItem('userToken'));

console.log(signedIn);
function AuthProvider(props) {
	return (
		<div>
			<AuthContext.Provider value={{ signedIn }}>{props.children}</AuthContext.Provider>
		</div>
	);
}

export default AuthProvider;
