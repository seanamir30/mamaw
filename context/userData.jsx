import React, { createContext, useContext, useState } from "react";

const Context = createContext()

export const UserData = ({children}) => {
    const [userData, setUserData] = useState()
    return (
        <Context.Provider value={[userData, setUserData]}>{children}</Context.Provider>
    )
}

export const useUserData = () => useContext(Context);