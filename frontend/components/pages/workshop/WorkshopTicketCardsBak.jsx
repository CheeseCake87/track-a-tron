import {For, Show, useContext} from "solid-js";
import {ContextWorkshop} from "../../../contextManagers/ContextWorkshop";
import {A} from "@solidjs/router";
import {ContextMain} from "../../../contextManagers/ContextMain";


export default function WorkshopTicketCards() {

    const ctxMain = useContext(ContextMain)
    const ctxWorkshop = useContext(ContextWorkshop)

    return (
        <For each={ctxWorkshop.tickets}>{(ticket, i) =>
            <A className={'workshop-ticket'} href={
                "/workshop/ticket/" + ticket.client_id
            }>
                <span className={'workshop-ticket-start'}>
                    <span className={'workshop-ticket-group'}>
                        <span className={'workshop-ticket-section'}>
                            <small>Status</small>
                            <span className={'workshop-ticket-pill'}
                                  style={ctxMain.statusCodeLookup(ticket.status_code).style}>
                                {ctxMain.statusCodeLookup(ticket.status_code).name}
                            </span>
                        </span>
                        <span className={'workshop-ticket-section'}>
                            <small>Category</small>
                            <span className={'workshop-ticket-pill'}>
                                {ctxMain.categoryCodeLookup(ticket.category_code)}
                            </span>
                        </span>
                        <span className={'workshop-ticket-section'}>
                            <small>Workshop Tag</small>
                            <p>{ticket.workshop_tag}</p>
                        </span>
                    </span>
                    <span className={'workshop-ticket-group'}>
                        <span className={'workshop-ticket-section'}>
                            <small>Client</small>
                            <p>
                                {ctxWorkshop.displayName(
                                    ticket.__client.business_name,
                                    ticket.__client.first_name,
                                    ticket.__client.last_name
                                )}
                            </p>
                        </span>
                        <span className={'workshop-ticket-section'}>
                            <small>Contact</small>
                            <p>
                                {ctxWorkshop.displayContact(
                                    ticket.__client.phone,
                                    ticket.__client.email_address,
                                    ticket.__client.alt_phone,
                                    ticket.__client.alt_email_address
                                )}
                            </p>
                        </span>
                    </span>

                    <Show when={ticket.__devices.length > 0 || ticket.__items.length > 0}>
                        <span className={'workshop-ticket-group'}>
                        {
                            ticket.__devices.length > 0 ?
                                <span className={'workshop-ticket-section'}>
                                <small>Device(s)</small>
                                <span className={'workshop-ticket-pill-group'}>
                                    <For each={ticket.__devices}>
                                        {(device, i) =>
                                            <span className={'workshop-ticket-pill'}>
                                                {device.make}
                                                <span className={'workshop-ticket-inner-pill'}>
                                                    {device.type}
                                                </span>
                                            </span>
                                        }
                                    </For>
                                </span>
                            </span> : ''
                        }
                            {
                                ticket.__items.length > 0 ?
                                    <span className={'workshop-ticket-section'}>
                                <small>Items</small>
                                <span className={'workshop-ticket-pill-group'}>
                                    <For each={ticket.__items}>
                                        {(device, i) =>
                                            <span className={'workshop-ticket-pill'}>
                                                {device.description}
                                            </span>
                                        }
                                    </For>
                                </span>
                            </span> : ''
                            }
                        </span>
                    </Show>
                    <span className={'workshop-ticket-group'}>
                        <span className={'workshop-ticket-section'}>
                            <small>Request</small>
                            <p>{ticket.request}</p>
                        </span>
                    </span>
                </span>
                <span className={'workshop-ticket-end'}>
                    <span className={'workshop-ticket-group'}>
                        <span>
                            <small>Assigned To</small>
                            <p>{ticket.__assigned_to}</p>
                        </span>
                    </span>
                    <span className={'workshop-ticket-group'}>
                        <span>
                            <small>Created</small>
                            <p>{ticket.__created}</p>
                        </span>
                    </span>
                    <button>Open</button>
                </span>
            </A>
        }</For>
    )
}