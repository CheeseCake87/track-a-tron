import {createContext, onMount, useContext} from "solid-js";
import {Outlet} from "@solidjs/router";
import {ContextMain} from "./ContextMain";

export const ContextRejectAuth = createContext()

export function RejectAuthContextProvider() {

    const ctxMain = useContext(ContextMain)

    onMount(() => {
        if (ctxMain.loggedIn()) {
            console.log('User is already logged in')
            ctxMain.navigator('/')
        }
    })

    return (
        <ContextRejectAuth.Provider value={{}}>
            <Outlet/>
        </ContextRejectAuth.Provider>
    )
}