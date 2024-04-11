import { useEffect } from "react";
import { useUser } from "./useUser";
import {User} from "../Interfaces/Interfaces";
// import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
    // we can re export the user methods or object from this hook
    const { user, addUser, removeUser, setUser } = useUser();
    // const { getItem } = useLocalStorage();

    // useEffect(() => {
    //     const user = getItem("user");
    //     if (user) {
    //         addUser(JSON.parse(user));
    //     }
    // }, [addUser, getItem]);

    const login = (user: User) => {
        addUser(user);
    };

    const logout = () => {
        removeUser();
    };

    return { user, login, logout, setUser };
};