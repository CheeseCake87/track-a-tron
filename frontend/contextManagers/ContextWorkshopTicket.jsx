import {createContext, createSignal, onMount, useContext} from "solid-js";
import {Outlet, useParams} from "@solidjs/router";
import {ContextMain} from "./ContextMain";
import rpc_get_workshop_ticket from "../rpc/workshop/rpc_get_workshop_ticket";
import rpc_update_client from "../rpc/client/rpc_update_client";

export const ContextWorkshopTicket = createContext()

export function WorkshopTicketContextProvider() {

    const ctxMain = useContext(ContextMain)

    const params = useParams()

    const [savingWorkshopTicket, setSavingWorkshopTicket] = createSignal(false)
    const [workshopTicket, setWorkshopTicket] = createSignal({})

    let updateDebounceTimer;

    function saveWorkshopTicket() {
        setSavingWorkshopTicket(true)
        if (updateDebounceTimer) {
            clearTimeout(updateDebounceTimer)
        }
        updateDebounceTimer = setTimeout(() => {
            rpc_update_client(workshopTicket().workshop_ticket_id, workshopTicket()).then((rpc) => {
                getClientFetcher.refetch()
                setSavingClient(false)
            })
        }, 500)
    }

    onMount(() => {
        rpc_get_workshop_ticket(params.workshop_tag).then(
            (rpc) => {
                if (rpc.ok) {
                    console.log({...rpc.data})
                    setWorkshopTicket({...rpc.data})
                } else {
                    ctxMain.showErrorToast('Ticket not found.')
                }
            }
        )
    })

    return (
        <ContextWorkshopTicket.Provider value={{
            savingWorkshopTicket: savingWorkshopTicket,
            setSavingWorkshopTicket: setSavingWorkshopTicket,

            workshopTicket: workshopTicket,
            setWorkshopTicket: setWorkshopTicket
        }}>
            <Outlet/>
        </ContextWorkshopTicket.Provider>
    )
}
