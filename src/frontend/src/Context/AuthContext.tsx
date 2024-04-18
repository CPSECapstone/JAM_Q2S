import {createContext, useContext} from "react";
import {User} from "../Interfaces/Interfaces";

interface AuthContext {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContext>({
    user: null,
    setUser: () => {},
});

export const useAuthContext = () => {
    return useContext(AuthContext);
};