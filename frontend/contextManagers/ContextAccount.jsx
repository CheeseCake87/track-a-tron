import {createContext} from "solid-js";
import {Outlet} from "@solidjs/router";

export const ContextAccount = createContext()

export function AccountContextProvider() {

    return (
        <ContextAccount.Provider value={{}}>
            <Outlet/>
        </ContextAccount.Provider>
    )
}