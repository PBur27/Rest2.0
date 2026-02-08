import { createContext, useContext, useState } from "react";

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  //stores userId
  const [user, setUser] = useState(null);
  //stores an array of days holding data regarding exercises, diet and sleep
  const [userDataDaysContext, setUserDataDaysContext] = useState(null);
  //stores the exertion values for each muscle in the body
  const [userExertionContext, setUserExertionContext] = useState(null);
  //stores data regarding exercises, fetched from database in key value pairs eg. {exercise: [...muscles], exercise: [...muscles], ... }
  const [exercisesData, setExercisesData] = useState(null);

  const setUid = (userData) => {
    setUser(userData);
  };

  return (
    <UserDataContext.Provider
      value={{
        user,
        setUid,
        userDataDaysContext,
        setUserDataDaysContext,
        userExertionContext,
        setUserExertionContext,
        exercisesData,
        setExercisesData,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUser = () => useContext(UserDataContext).user;
export const useSetUid = () => useContext(UserDataContext).setUid;
export const useUserDataDaysContext = () =>
  useContext(UserDataContext).userDataDaysContext;
export const useSetUserDataDaysContext = () =>
  useContext(UserDataContext).setUserDataDaysContext;
export const useUserExertionContext = () =>
  useContext(UserDataContext).userExertionContext;
export const useSetUserExertionContext = () =>
  useContext(UserDataContext).setUserExertionContext;
export const useExercisesData = () => useContext(UserDataContext).exercisesData;
export const useSetExercisesData = () =>
  useContext(UserDataContext).setExercisesData;
