import { createContext, useContext, useState } from "react";

//Context for user data, most importantly user ID, but also pgysica
export const UserDataContext = createContext();

// 2. The Provider component that wraps your app (usually in _layout.tsx).
export const UserDataProvider = ({ children }) => {
  // State: stores the current logged-in User ID or user object
  const [userId, setUserId] = useState(null);

  // State: stores history (diet, sleep, exercise) likely as an array of objects
  const [userDataDaysContext, setUserDataDaysContext] = useState(null);

  // State: stores current muscle fatigue/exertion levels
  const [userExertionContext, setUserExertionContext] = useState(null);

  // State: stores the library of available exercises and their mapped muscle groups
  const [exercisesData, setExercisesData] = useState(null);

  // Helper function to update the user state specifically

  return (
    // 3. The Provider's 'value' prop broadcasts these variables and functions
    // to every component nested inside it.
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

/**
 * 4. Custom Hooks (Selectors)
 * These make it easier to consume specific parts of the context without
 * writing 'useContext(UserDataContext)' every time in your UI files.
 */
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
