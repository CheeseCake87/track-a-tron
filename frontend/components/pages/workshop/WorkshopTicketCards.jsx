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
                        <div className={'workshop-ticket-group'}>
                            <div className={'workshop-ticket-section'}>
                                <small>Status</small>
                                <div className={'workshop-ticket-pill'}
                                     style={ctxMain.statusCodeLookup(ticket.status_code).style}>
                                    {ctxMain.statusCodeLookup(ticket.status_code).name}
                                </div>
                            </div>
                            <div className={'workshop-ticket-section'}>
                                <small>Category</small>
                                <div className={'workshop-ticket-pill'}>
                                    {ctxMain.categoryCodeLookup(ticket.category_code)}
                                </div>
                            </div>
                            <div className={'workshop-ticket-section'}>
                                <small>Workshop Tag</small>
                                <div className={'workshop-ticket-pill'}>
                                    {ticket.workshop_tag}
                                </div>
                            </div>
                        </div>
                        <div className={'workshop-ticket-group'}>
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

                        <Show when={ticket.__devices.length > 0 || ticket.__items.length > 0}>
                            <div className={'workshop-ticket-group'}>
                                {
                                    ticket.__devices.length > 0 ?
                                        <div className={'workshop-ticket-section'}>
                                            <small>Device(s)</small>
                                            <div className={'workshop-ticket-pill-group'}>
                                                <For each={ticket.__devices}>
                                                    {(device, i) =>
                                                        <div className={'workshop-ticket-pill'}>

                                                            <div className={'workshop-ticket-inner-pill'}>
                                                                {device.type}
                                                            </div>
                                                            <Show when={device.make !== ''}>
                                                                {device.make}
                                                            </Show>
                                                            <Show when={device.model !== ''}>
                                                                {device.make !== '' ? ' ' : ''}
                                                                {device.model}
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
                                            <small>Items</small>
                                            <div className={'workshop-ticket-pill-group'}>
                                                <For each={ticket.__items}>
                                                    {(device, i) =>
                                                        <div className={'workshop-ticket-pill'}>
                                                            {device.description}
                                                        </div>
                                                    }
                                                </For>
                                            </div>
                                        </div> : ''
                                }
                            </div>
                        </Show>
                        <div className={'workshop-ticket-group'}>
                            <div className={'workshop-ticket-section'}>
                                <small>Request</small>
                                <p>{ticket.request}</p>
                            </div>
                        </div>
                    </div>

                    <div className={'workshop-ticket-end'}>
                        <div className={'flex justify-end'}>
                            <A className={'btn-confirm'} href={
                                "/workshop/ticket/" + ticket.client_id
                            }>Open</A>
                        </div>
                        <div className={'workshop-ticket-group'}>
                            <div>
                                <small>Assigned To</small>
                                <p>{ticket.__assigned_to}</p>
                            </div>
                            <div>
                                <small>Created</small>
                                <p>{ticket.__created}</p>
                            </div>
                        </div>
                    </div>
                </div>
        }</For>
    )
}