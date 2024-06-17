import {createContext, createEffect, createSignal, useContext} from "solid-js";
import {Outlet, useParams} from "@solidjs/router";
import rpc_get_client from "../rpc/client/rpc_get_client";
import {ContextMain} from "./ContextMain";

export const ContextClient = createContext()

export function ClientContextProvider() {

    const ctxMain = useContext(ContextMain)

    const params = useParams()
    const [client, setClient] = createSignal({})

    const getClient = rpc_get_client(params.client_id)

    createEffect(() => {
        if (!getClient.store.loading) {
            setClient({...getClient.data()})
        }
    })

    return (
        <ContextClient.Provider value={{
            client: client,
            setClient: setClient,
            getClient: getClient,
        }}>
            <Outlet/>
        </ContextClient.Provider>
    )
}