import {createContext} from "solid-js";
import {Outlet} from "@solidjs/router";

export const ContextYourAccount = createContext()

export function YourAccountContextProvider() {

    return (
        <ContextYourAccount.Provider value={{}}>
            <Outlet/>
        </ContextYourAccount.Provider>
    )
}