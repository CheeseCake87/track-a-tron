import {For, Show, useContext} from "solid-js";
import {ContextWorkshop} from "../../../contextManagers/ContextWorkshop";
import {ContextMain} from "../../../contextManagers/ContextMain";
import {A} from "@solidjs/router";


export default function WorkshopTicketCards() {

    const ctxMain = useContext(ContextMain)
    const ctxWorkshop = useContext(ContextWorkshop)

    return (
        <For each={ctxWorkshop.tickets}>{
            (ticket, i) =>
                <div className={'workshop-ticket'}>
                    <div className={'workshop-ticket-start'}>
                        <div className={'workshop-ticket-group-slim'}>

                            <div className={'workshop-ticket-labelled-pill'}>
                                <div className={'workshop-ticket-labelled-pill-label'}>
                                    Status
                                </div>
                                <div className={'workshop-ticket-labelled-pill-text'}
                                     style={ctxMain.statusCodeLookup(ticket.status_code).style}>
                                    {ctxMain.statusCodeLookup(ticket.status_code).name}
                                </div>
                            </div>

                            <div className={'workshop-ticket-labelled-pill'}>
                                <div className={'workshop-ticket-labelled-pill-label'}>
                                    Tag
                                </div>
                                <div className={'workshop-ticket-labelled-pill-text'}>
                                    {ticket.workshop_tag}
                                </div>
                            </div>

                            <div className={'workshop-ticket-labelled-pill'}>
                                <div className={'workshop-ticket-labelled-pill-label'}>
                                    Category
                                </div>
                                <div className={'workshop-ticket-labelled-pill-text'}>
                                    {ctxMain.categoryCodeLookup(ticket.category_code)}
                                </div>
                            </div>

                            <div className={'workshop-ticket-labelled-pill'}>
                                <div className={'workshop-ticket-labelled-pill-label'}>
                                    Assigned To
                                </div>
                                <div className={'workshop-ticket-labelled-pill-text'}>
                                    {ticket.__assigned_to}
                                </div>
                            </div>

                            <div className={'workshop-ticket-labelled-pill'}>
                                <div className={'workshop-ticket-labelled-pill-label'}>
                                    Created
                                </div>
                                <div className={'workshop-ticket-labelled-pill-text'}>
                                    {ticket.__created}
                                </div>
                            </div>

                        </div>

                        <div className={'workshop-ticket-group mt-2'}>
                            <div className={'workshop-ticket-section'}>
                                <small>Client</small>
                                <p>
                                    {ctxWorkshop.displayName(
                                        ticket.__client.business_name,
                                        ticket.__client.first_name,
                                        ticket.__client.last_name
                                    )}
                                </p>
                            </div>
                            <div className={'workshop-ticket-section'}>
                                <small>Contact</small>
                                <p>
                                    {ctxWorkshop.displayContact(
                                        ticket.__client.phone,
                                        ticket.__client.email_address,
                                        ticket.__client.alt_phone,
                                        ticket.__client.alt_email_address
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className={'workshop-ticket-group mb-2'}>
                            <div className={'workshop-ticket-section'}>
                                <small>Request</small>
                                <p>{ticket.request}</p>
                            </div>
                        </div>

                        <Show when={ticket.__devices.length > 0 || ticket.__items.length > 0}>
                            <div className={'workshop-ticket-group'}>
                                {
                                    ticket.__devices.length > 0 ?
                                        <div className={'workshop-ticket-section'}>
                                            <small>Device(s)</small>
                                            <div className={'workshop-ticket-pill-group'}>
                                                <For each={ticket.__devices}>
                                                    {(device, i) =>
                                                        <div className={'workshop-ticket-labelled-pill'}>
                                                            <Show
                                                                when={device.make !== '' || device.model !== ''}
                                                                fallback={
                                                                    <div
                                                                        className={'workshop-ticket-labelled-pill-device border-r rounded-md'}>
                                                                        {device.type}
                                                                    </div>
                                                                }
                                                            >
                                                                <div
                                                                    className={'workshop-ticket-labelled-pill-device'}>
                                                                    {device.type}
                                                                </div>
                                                                <div
                                                                    className={'workshop-ticket-labelled-pill-text'}>
                                                                    <Show when={device.make !== ''}>
                                                                        {device.make}
                                                                    </Show>
                                                                    <Show when={device.model !== ''}>
                                                                        {device.make !== '' ? ' ' : ''}
                                                                        {device.model}
                                                                    </Show>
                                                                </div>
                                                            </Show>
                                                        </div>
                                                    }
                                                </For>
                                            </div>
                                        </div> : ''
                                }
                                {
                                    ticket.__items.length > 0 ?
                                        <div className={'workshop-ticket-section'}>
                                            <small>Item(s)</small>
                                            <div className={'workshop-ticket-pill-group'}>
                                                <For each={ticket.__items}>
                                                    {(device, i) =>
                                                        <div className={'workshop-ticket-labelled-pill'}>
                                                            <div
                                                                className={'workshop-ticket-labelled-pill-text rounded-md border-r'}>
                                                                {device.description}
                                                            </div>
                                                        </div>
                                                    }
                                                </For>
                                            </div>
                                        </div> : ''
                                }
                            </div>
                        </Show>
                    </div>

                    <div className={'workshop-ticket-end'}>
                        <div className={'flex justify-end'}>
                            <A className={'btn-confirm'} href={
                                "/workshop/ticket/" + ticket.workshop_tag
                            }>Open</A>
                        </div>
                    </div>
                </div>
        }</For>
    )
}