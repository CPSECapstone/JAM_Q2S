import React, {ReactNode, useState} from "react";
import {User} from "../Interfaces/Interfaces";
import {useLocalStorage} from "../Hooks/useLocalStorage";

interface AuthContext {
    readonly user: User | null;
    readonly setUser: (user: User) => void;
}

export const AuthContext = React.createContext<AuthContext>({
    user: null,
    setUser: () => null,
})

export const UserAuthProvider: React.FC<{ children: ReactNode}> = ({children}) => {
    const [ user, setUser ] = useState<User | null>(null);
    const { setItem } = useLocalStorage();

    const updateUser = (newUser: User | null) => {
        setUser(newUser);
        setItem("user", JSON.stringify(newUser));
    };

    const value = {
        user,
        setUser: updateUser,
    };

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};