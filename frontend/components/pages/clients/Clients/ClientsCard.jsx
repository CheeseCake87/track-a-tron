import {A} from "@solidjs/router";
import {displayContact, displayName} from "../../../../utilities/general";

export default function ClientsCard(props) {

    const client = props.client

    return (
        <div className={'card'}>

            <div className={'card-start'}>
                <div className={'card-group-slim'}>

                    <div className={'card-labelled-pill'}>
                        <div className={'card-labelled-pill-label'}>
                            Client ID
                        </div>
                        <div className={'card-labelled-pill-text'}>
                            {client.client_id}
                        </div>
                    </div>

                    <div className={'card-labelled-pill'}>
                        <div className={'card-labelled-pill-label'}>
                            Added By
                        </div>
                        <div className={'card-labelled-pill-text'}>
                            {client.__added_by}
                        </div>
                    </div>

                    <div className={'card-labelled-pill'}>
                        <div className={'card-labelled-pill-label'}>
                            Created
                        </div>
                        <div className={'card-labelled-pill-text'}>
                            {client.__created}
                        </div>
                    </div>

                </div>

                <div className={'card-group mt-2'}>
                    <div className={'card-section'}>
                        <small>Client</small>
                        <p>
                            {displayName(
                                client.business_name, client.first_name, client.last_name
                            )}
                        </p>
                    </div>
                    <div className={'card-section'}>
                        <small>Contact</small>
                        <p>
                            {displayContact(
                                client.phone,
                                client.email_address,
                                client.alt_phone,
                                client.alt_email_address
                            )}
                        </p>
                    </div>
                    <div className={'card-section'}>
                        <small>Address</small>
                        <p>
                            {client.__address}
                        </p>
                    </div>
                </div>

                {/*<Show when={ticket.__devices.length > 0 || ticket.__items.length > 0}>*/}
                {/*    <div className={'workshop-ticket-group'}>*/}
                {/*        {ticket.__devices.length > 0 ? <WorkshopTicketCardDevices devices={ticket.__devices}/> : ''}*/}
                {/*        {ticket.__items.length > 0 ? <WorkshopTicketCardItems items={ticket.__items}/> : ''}*/}
                {/*    </div>*/}
                {/*</Show>*/}

            </div>

            <div className={'card-end'}>
                <div className={'flex justify-end'}>
                    <A className={'btn-confirm'} href={
                        "/clients/" + client.client_id
                    }>Open</A>
                </div>
            </div>
        </div>
    )
}