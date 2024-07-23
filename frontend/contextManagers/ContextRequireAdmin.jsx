import {createContext, onMount, useContext} from "solid-js";
import {Outlet} from "@solidjs/router";
import {ContextMain} from "./ContextMain";

export const ContextRequireAdmin = createContext()

export function RequireAdminContextProvider() {

    const ctxMain = useContext(ContextMain)

    onMount(() => {
        if (ctxMain.userType() !== 'admin') {
            ctxMain.navigator('/')
            ctxMain.showErrorToast('You must be an admin to access this page')
        }
    })

    return (
        <ContextRequireAdmin.Provider value={{}}>
            <Outlet/>
        </ContextRequireAdmin.Provider>
    )
}