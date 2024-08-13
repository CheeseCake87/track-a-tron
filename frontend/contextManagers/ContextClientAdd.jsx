import {createContext, onMount, useContext} from "solid-js";
import {Outlet} from "@solidjs/router";
import {ContextMain} from "./ContextMain";

export const ContextClientAdd = createContext()

export function ClientAddContextProvider() {

    const ctxMain = useContext(ContextMain)

    onMount(() => {
        ctxMain.setMainMenuLocation('clients')
    })

    return (
        <ContextClientAdd.Provider value={{}}>
            <Outlet/>
        </ContextClientAdd.Provider>
    )
}