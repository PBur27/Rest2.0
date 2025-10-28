import { createContext, useContext, useState } from "react";

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userExertionData, setUserExertionData] = useState(null);

    const setUid = (userData) => {
        setUser(userData);
    };

    const clearUid = () => {
        setUser(null);
    };

    const setUserData = (data) => {
        setUserExertionData(data)
    }

    return (
        <UserDataContext.Provider value={{ user, setUid, clearUid, userExertionData, setUserExertionData }}>
            {children}
        </UserDataContext.Provider>
    );
};

export const useUser = () => useContext(UserDataContext).user;
export const useSetUid = () => useContext(UserDataContext).setUid;
export const useUserData = () => useContext(UserDataContext).userExertionData;
export const useSetUserData = () => useContext(UserDataContext).setUserExertionData;