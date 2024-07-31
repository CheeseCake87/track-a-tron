import {createContext, createEffect, createSignal, useContext} from "solid-js";
import {Outlet, useParams} from "@solidjs/router";
import rpc_get_client from "../rpc/client/rpc_get_client";
import {ContextMain} from "./ContextMain";
import rpc_update_client from "../rpc/client/rpc_update_client";
import rpc_get_workshop_tickets from "../rpc/workshop/rpc_get_workshop_tickets";

export const ContextClient = createContext()

export function ClientContextProvider() {

    const ctxMain = useContext(ContextMain)

    const params = useParams()

    const getClientFetcher = rpc_get_client(params.client_id)

    const [savingClient, setSavingClient] = createSignal(false)
    const [showAddress, setShowAddress] = createSignal(false)
    const [client, setClient] = createSignal(
        {
            client_id: 0,
            first_name: '',
            last_name: '',
            business_name: '',
            phone: '',
            email_address: '',
            alt_phone: '',
            alt_email_address: '',
            phone_dnc: false,
            email_address_dnc: false
        }
    )

    const [workshopTickets, setWorkshopTickets] = createSignal([])

    let updateDebounceTimer;

    function saveClient() {
        setSavingClient(true)
        if (updateDebounceTimer) {
            clearTimeout(updateDebounceTimer)
        }
        updateDebounceTimer = setTimeout(() => {
            rpc_update_client(client().client_id, client()).then((rpc) => {
                getClientFetcher.refetch()
                setSavingClient(false)
            })
        }, 500)
    }

    function getClientWorkshopTickets() {
        rpc_get_workshop_tickets({fk_client_id: client().client_id}).then((rpc) => {
            setWorkshopTickets(rpc.data)
        })
    }

    createEffect(() => {
        if (!getClientFetcher.store.loading) {
            setClient({...getClientFetcher.data()})
            if (client().client_id !== 0) {
                getClientWorkshopTickets()
            }
        }
    })

    return (
        <ContextClient.Provider value={{
            savingClient: savingClient,
            client: client,
            setClient: setClient,
            getClientFetcher: getClientFetcher,
            showAddress: showAddress,
            setShowAddress: setShowAddress,

            workshopTickets: workshopTickets,
            setWorkshopTickets: setWorkshopTickets,

            saveClient: saveClient
        }}>
            <Outlet/>
        </ContextClient.Provider>
    )
}