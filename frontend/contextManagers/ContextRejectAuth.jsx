import {createContext, onMount, useContext} from "solid-js";
import {Outlet} from "@solidjs/router";
import {ContextMain} from "./ContextMain";

export const ContextRejectAuth = createContext()

export function RejectAuthContextProvider() {

    const ctxMain = useContext(ContextMain)

    onMount(() => {
        if (ctxMain.loggedIn()) {
            ctxMain.navigator('/')
        }
    })

    return (
        <ContextRejectAuth.Provider value={{}}>
            <Outlet/>
        </ContextRejectAuth.Provider>
    )
}