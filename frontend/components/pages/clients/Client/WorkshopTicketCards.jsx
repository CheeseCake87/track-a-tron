import {For, useContext} from "solid-js";
import {ContextClient} from "../../../../contextManagers/ContextClient";
import WorkshopTicketCard from "../../workshop/Workshop/WorkshopTicketCard";


export default function WorkshopTicketCards() {

    const ctxClient = useContext(ContextClient)

    return (
        <For each={ctxClient.workshopTickets()}>{
            (ticket, i) =>
                <WorkshopTicketCard ticket={ticket}/>
        }</For>
    )
}