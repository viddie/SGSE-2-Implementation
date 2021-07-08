import {createContext} from "react";

const initialState = {
    loggedIn : false
};

export const Context = createContext(initialState);
export default State;