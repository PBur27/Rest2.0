import { createContext, useContext, useState } from "react";

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
    //stores userId
    const [user, setUser] = useState(null);
    //stores an array of days holding data regarding exercises, diet and sleep
    const [userData, setUserData] = useState(null);
    //stores the exertion values for each muscle in the body
    const [userExertion, setUserExertion] = useState(null);
    //stores data regarding exercises, fetched from database in key value pairs eg. {exercise: [...muscles], exercise: [...muscles], ... } 
    const [exercisesData, setExercisesData] = useState(null)

    const setUid = (userData) => {
        setUser(userData);
    };

    return (
        <UserDataContext.Provider value={{ user, setUid,  userData, setUserData, userExertion, setUserExertion, exercisesData, setExercisesData}}>
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
export const useExercisesData = () => useContext(UserDataContext).exercisesData
export const useSetExercisesData = () => useContext(UserDataContext).setExercisesData