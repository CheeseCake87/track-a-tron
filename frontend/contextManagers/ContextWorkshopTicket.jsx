import {createContext, createEffect, createSignal, onCleanup, onMount, useContext} from "solid-js";
import {Outlet, useParams} from "@solidjs/router";
import {ContextMain} from "./ContextMain";
import {createStore} from "solid-js/store";
import rpc_page_clients from "../rpc/client/rpc_page_clients";
import {ContextWorkshop} from "./ContextWorkshop";

export const ContextWorkshopTicket = createContext()

export function WorkshopTicketContextProvider() {

    const ctxMain = useContext(ContextMain)

    return (
        <ContextWorkshopTicket.Provider value={{}}>
            <Outlet/>
        </ContextWorkshopTicket.Provider>
    )
}
