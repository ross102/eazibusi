import React, { useEffect, useState } from 'react';

const NewContext = React.createContext();

export const UserProvider = NewContext.Provider;
export const UserConsumer = NewContext.Consumer;
export default NewContext;
