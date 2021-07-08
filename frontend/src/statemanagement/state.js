import {createContext} from "react";

const initialState = {
    loggedIn : false
};

export const State = createContext(initialState);
