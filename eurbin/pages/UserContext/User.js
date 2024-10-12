
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({
        _id: null,
        userId: null,
        userName: '',
        password: '',
        email: '',
        department: '',
        program: '',
        yearLevel: '',
        smartPoints: 0,
        plasticBottle: 0,
        rank: 'null',
        co2: 0,
        accumulatedSP: 0,
        isActive: true,
        creationDate: '',
    });

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
