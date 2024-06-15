import {createContext} from "solid-js";
import {Outlet} from "@solidjs/router";

export const ContextSystem = createContext()

export function SystemContextProvider() {

    return (
        <ContextSystem.Provider value={{}}>
            <Outlet/>
        </ContextSystem.Provider>
    )
}