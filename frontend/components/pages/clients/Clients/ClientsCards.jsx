import {For, useContext} from "solid-js";
import ClientsCard from "./ClientsCard";
import {ContextClients} from "../../../../contextManagers/ContextClients";

export default function ClientsCards() {

    const ctxClients = useContext(ContextClients)

    return (
        <For each={ctxClients.clients}>{
            (client, i) =>
                <ClientsCard client={client}/>
        }</For>
    )
}