import { useEffect } from "react";
import { useUser } from "./useUser";
import {User} from "../Interfaces/Interfaces";
import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
    // we can re export the user methods or object from this hook
    const { user, addUser, removeUser, setUser } = useUser();
    const { getItem } = useLocalStorage();

    useEffect(() => {
        const user1 = getItem("user");
        if (user1) {
            setUser(JSON.parse(user1));
        }
    }, [addUser, getItem]);


    const login = (user: User) => {
        addUser(user);
    };

    const getUser = () => {
        const user1 = getItem("user");
        if (user1) {
            addUser(JSON.parse(user1));
        }
    }

    const logout = () => {
        removeUser();
    };

    return { user, login, logout, getUser, setUser };
};