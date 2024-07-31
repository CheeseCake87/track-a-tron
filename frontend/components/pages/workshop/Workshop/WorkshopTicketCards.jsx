import {For, useContext} from "solid-js";
import {ContextWorkshop} from "../../../../contextManagers/ContextWorkshop";
import WorkshopTicketCard from "./WorkshopTicketCard";


export default function WorkshopTicketCards() {

    const ctxWorkshop = useContext(ContextWorkshop)

    return (
        <For each={ctxWorkshop.tickets}>{
            (ticket, i) =>
                <WorkshopTicketCard ticket={ticket}/>
        }</For>
    )
}