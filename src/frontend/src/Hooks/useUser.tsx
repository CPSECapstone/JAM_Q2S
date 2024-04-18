import { useAuthContext }  from "../Context/AuthContext";
import {User} from "../Interfaces/Interfaces";
import { useLocalStorage } from "./useLocalStorage";


export const useUser = () => {
    const { user, setUser } = useAuthContext();
    const { setItem } = useLocalStorage();
    console.log("Here", user)

    const addUser = (user: User) => {
        setUser(user);
        setItem("user", JSON.stringify(user));
    };

    const removeUser = () => {
        setUser(null);
        setItem("user", "");
    };

    return { user, addUser, removeUser, setUser };
};
