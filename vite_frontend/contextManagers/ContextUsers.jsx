import {createContext} from "solid-js";
import {Outlet} from "@solidjs/router";

export const ContextUsers = createContext()

export function UserContextProvider() {

    return (
        <ContextUsers.Provider value={{}}>
            <Outlet/>
        </ContextUsers.Provider>
    )
}