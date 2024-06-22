import {createContext, createEffect, createSignal, useContext} from "solid-js";
import {Outlet, useParams} from "@solidjs/router";
import rpc_get_client from "../rpc/client/rpc_get_client";
import {ContextMain} from "./ContextMain";

export const ContextClient = createContext()

export function ClientContextProvider() {

    const ctxMain = useContext(ContextMain)

    const params = useParams()

    const getClientFetcher = rpc_get_client(params.client_id)

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

    createEffect(() => {
        if (!getClientFetcher.store.loading) {
            setClient({...getClientFetcher.data()})
        }
    })

    return (
        <ContextClient.Provider value={{
            client: client,
            setClient: setClient,
            getClientFetcher: getClientFetcher,
            showAddress: showAddress,
            setShowAddress: setShowAddress
        }}>
            {getClientFetcher.store.loading
            ? <div>Loading...</div>
            : <Outlet/>}
        </ContextClient.Provider>
    )
}