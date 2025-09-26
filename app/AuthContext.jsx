import { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const setUid = (userData) => {
        setUser(userData);
    };

    const clearUid = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUid, clearUid }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useUser = () => useContext(AuthContext).user;
export const useSetUid = () => useContext(AuthContext).setUid;
export const useClearUid = () => useContext(AuthContext).clearUid;