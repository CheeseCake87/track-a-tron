import {createContext, createSignal, onMount, useContext} from "solid-js";
import {Outlet} from "@solidjs/router";
import {ContextMain} from "./ContextMain";

export const ContextWorkshopTicketAdd = createContext()

export function WorkshopTicketAddContextProvider() {

    const ctxMain = useContext(ContextMain)

    onMount(() => {
        ctxMain.setMainMenuLocation('workshop')
    })

    return (
        <ContextWorkshopTicketAdd.Provider value={{}}>
            <Outlet/>
        </ContextWorkshopTicketAdd.Provider>
    )
}