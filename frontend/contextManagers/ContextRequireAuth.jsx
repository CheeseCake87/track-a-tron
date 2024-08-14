import {createContext, onMount, useContext} from "solid-js";
import {Outlet} from "@solidjs/router";
import {ContextMain} from "./ContextMain";

export const ContextRequireAuth = createContext()

export function RequireAuthContextProvider() {

    const ctxMain = useContext(ContextMain)

    onMount(() => {
        if (!ctxMain.loggedIn()) {
            ctxMain.navigator('/login')
        }
    })

    return (
        <ContextRequireAuth.Provider value={{}}>
            <Outlet/>
        </ContextRequireAuth.Provider>
    )
}