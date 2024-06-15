import {createContext, createSignal} from "solid-js";
import {Outlet, useParams} from "@solidjs/router";

export const ContextClient = createContext()

export function ClientContextProvider() {

    const params = useParams()
    const [clientId, setClientId] = createSignal(params.client_id)

    return (
        <ContextClient.Provider value={{
            clientId: clientId,
        }}>
            <Outlet/>
        </ContextClient.Provider>
    )
}