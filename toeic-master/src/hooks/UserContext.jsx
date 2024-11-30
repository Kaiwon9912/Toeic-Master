import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const logout = () => {
        setUser(null); // Đặt user về null để đăng xuất
    };

    return (
        <UserContext.Provider value={{ user, logout, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);