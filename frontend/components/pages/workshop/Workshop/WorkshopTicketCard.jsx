import {Show, useContext} from "solid-js";
import {ContextMain} from "../../../../contextManagers/ContextMain";
import {A} from "@solidjs/router";
import WorkshopTicketCardDevices from "./WorkshopTicketCardDevices";
import WorkshopTicketCardItems from "./WorkshopTicketCardItems";
import {displayContact, displayName} from "../../../../utilities/general";


export default function WorkshopTicketCard(props) {

    const ctxMain = useContext(ContextMain)

    const ticket = props.ticket

    return (
        <div className={'card'}>
            <div className={'card-start'}>
                <div className={'card-group-slim'}>

                    <div className={'card-labelled-pill'}>
                        <div className={'card-labelled-pill-label'}>
                            Status
                        </div>
                        <div className={'card-labelled-pill-text'}
                             style={ctxMain.statusCodeLookup(ticket.status_code).style}>
                            {ctxMain.statusCodeLookup(ticket.status_code).name}
                        </div>
                    </div>

                    <div className={'card-labelled-pill'}>
                        <div className={'card-labelled-pill-label'}>
                            Tag
                        </div>
                        <div className={'card-labelled-pill-text'}>
                            {ticket.workshop_tag}
                        </div>
                    </div>

                    <div className={'card-labelled-pill'}>
                        <div className={'card-labelled-pill-label'}>
                            Category
                        </div>
                        <div className={'card-labelled-pill-text'}>
                            {ctxMain.categoryCodeLookup(ticket.category_code)}
                        </div>
                    </div>

                    <div className={'card-labelled-pill'}>
                        <div className={'card-labelled-pill-label'}>
                            Assigned To
                        </div>
                        <div className={'card-labelled-pill-text'}>
                            {ticket.__assigned_to}
                        </div>
                    </div>

                    <div className={'card-labelled-pill'}>
                        <div className={'card-labelled-pill-label'}>
                            Created
                        </div>
                        <div className={'card-labelled-pill-text'}>
                            {ticket.__created}
                        </div>
                    </div>

                </div>

                <div className={'card-group mt-2'}>
                    <div className={'card-section'}>
                        <small>Client</small>
                        <p>
                            {displayName(
                                ticket.__client.business_name,
                                ticket.__client.first_name,
                                ticket.__client.last_name
                            )}
                        </p>
                    </div>
                    <div className={'card-section'}>
                        <small>Contact</small>
                        <p>
                            {displayContact(
                                ticket.__client.phone,
                                ticket.__client.email_address,
                                ticket.__client.alt_phone,
                                ticket.__client.alt_email_address
                            )}
                        </p>
                    </div>
                </div>

                <div className={'card-group mb-2'}>
                    <div className={'card-section'}>
                        <small>Request</small>
                        <p>{ticket.request}</p>
                    </div>
                </div>

                <Show when={ticket.__devices.length > 0 || ticket.__items.length > 0}>
                    <div className={'card-group'}>
                        {ticket.__devices.length > 0 ? <WorkshopTicketCardDevices devices={ticket.__devices}/> : ''}
                        {ticket.__items.length > 0 ? <WorkshopTicketCardItems items={ticket.__items}/> : ''}
                    </div>
                </Show>
            </div>

            <div className={'card-end'}>
                <div className={'flex justify-end'}>
                    <A className={'btn-confirm'} href={
                        "/workshop/ticket/" + ticket.workshop_tag
                    }>Open</A>
                </div>
            </div>
        </div>
    )
}