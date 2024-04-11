import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import {User} from "../Interfaces/Interfaces";
// import { useLocalStorage } from "./useLocalStorage";


export const useUser = () => {
    const { user, setUser } = useContext(AuthContext);
    // const { setItem } = useLocalStorage();

    const addUser = (user: User) => {
        setUser(user);
        // setItem("user", JSON.stringify(user));
    };

    const removeUser = () => {
        setUser(null);
        // setItem("user", "");
    };

    return { user, addUser, removeUser, setUser };
};
