import { createContext, useContext, useState } from "react";

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [userExertion, setUserExertion] = useState(null);

    const setUid = (userData) => {
        setUser(userData);
    };

    return (
        <UserDataContext.Provider value={{ user, setUid,  userData, setUserData, userExertion, setUserExertion }}>
            {children}
        </UserDataContext.Provider>
    );
};

export const useUser = () => useContext(UserDataContext).user;
export const useSetUid = () => useContext(UserDataContext).setUid;
export const useUserData = () => useContext(UserDataContext).userData;
export const useSetUserData = () => useContext(UserDataContext).setUserData;
export const useUserExertion = () => useContext(UserDataContext).userExertion;
export const useSetUserExertion = () => useContext(UserDataContext).setUserExertion;