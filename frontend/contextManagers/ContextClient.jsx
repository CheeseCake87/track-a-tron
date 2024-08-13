import {createContext, createSignal, onMount, useContext} from "solid-js";
import {Outlet, useParams} from "@solidjs/router";
import {ContextMain} from "./ContextMain";
import API from "../utilities/API";

export const ContextClient = createContext()

export function ClientContextProvider() {

    const ctxMain = useContext(ContextMain)
    const api = new API()

    const params = useParams()

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

    function getClientWorkshopTickets() {
        api.get(`/workshop/get/client/${client().client_id}/tickets`).then((res) => {
            setWorkshopTickets(res.data)
        })
    }

    function getClient() {
        api.get('/clients/get/' + params.client_id).then((res) => {
            if (res.ok) {
                setClient({
                    client_id: res.data.client_id,
                    first_name: res.data.first_name,
                    last_name: res.data.last_name,
                    business_name: res.data.business_name,
                    phone: res.data.phone,
                    email_address: res.data.email_address,
                    alt_phone: res.data.alt_phone,
                    alt_email_address: res.data.alt_email_address,
                    phone_dnc: res.data.phone_dnc,
                    email_address_dnc: res.data.email_address_dnc
                })
            }
            getClientWorkshopTickets()
        })
    }

    function updateClient() {
        setSavingClient(true)
        if (updateDebounceTimer) {
            clearTimeout(updateDebounceTimer)
        }
        updateDebounceTimer = setTimeout(() => {
            api.post(
                '/clients/update/' + client().client_id,
                client()
            ).then((res) => {
                setSavingClient(false)
            })
        }, 500)
    }

    onMount(() => {
        getClient()
    })

    return (
        <ContextClient.Provider value={{
            savingClient: savingClient,
            client: client,
            setClient: setClient,
            showAddress: showAddress,
            setShowAddress: setShowAddress,

            workshopTickets: workshopTickets,
            setWorkshopTickets: setWorkshopTickets,

            saveClient: updateClient
        }}>
            <Outlet/>
        </ContextClient.Provider>
    )
}