import {createContext, createSignal, onMount, useContext} from "solid-js";
import {Outlet} from "@solidjs/router";
import rpc_client_add_needs from "../rpc/client_add/rpc_client_add_needs";
import {ContextMain} from "./ContextMain";

export const ContextClientAdd = createContext()

export function ClientAddContextProvider() {

    const ctxMain = useContext(ContextMain)

    const [sources, setSources] = createSignal({})
    const [teams, setTeams] = createSignal({})
    const [statuses, setStatuses] = createSignal({})

    const [chosenTeam, setChosenTeam] = createSignal({})

    onMount(() => {
        ctxMain.setMainMenuLocation('clients')

        rpc_client_add_needs(ctxMain.userId()).then((rpc) => {

        })
    })

    return (
        <ContextClientAdd.Provider value={{}}>
            <Outlet/>
        </ContextClientAdd.Provider>
    )
}