import {ContextWorkshopTicket} from "../../../contextManagers/ContextWorkshopTicket";
import {createEffect, createSignal, Show, useContext} from "solid-js";
import {CATEGORY_CODES} from "../../../globals";
import {SpinnerSmall} from "../../globals/Spinner";
import {ContextWorkshop} from "../../../contextManagers/ContextWorkshop";
import {ContextMain} from "../../../contextManagers/ContextMain";

export default function WorkshopTicket() {

    const ctxMain = useContext(ContextMain)
    const ctxWorkshop = useContext(ContextWorkshop)
    const ctxWorkshopTicket = useContext(ContextWorkshopTicket)

    const [status, setStatus] = createSignal({
        'Name': '',
        'Style': {}
    })

    createEffect(() => {
        if (ctxWorkshopTicket.workshopTicket().status_code) {
            setStatus(ctxMain.statusCodeLookup(ctxWorkshopTicket.workshopTicket().status_code))
        }
    })

    return (
        <div className={'main-content-slim gap-2'}>
            <div className={'field-group items-center sticky top-0'}>
                <button className={'btn'} onClick={() => {
                    ctxWorkshop.deBounceGetPageTickets(
                        200, ctxWorkshop.page(), ctxWorkshop.limit(), ctxWorkshop.ticketsWhere()
                    )
                    ctxMain.navigator('/workshop')
                }}>
                    ← Back
                </button>
                <Show when={ctxWorkshopTicket.savingWorkshopTicket()}>
                    <div className={'flex flex-row gap-2 items-center px-4'}>
                        <SpinnerSmall/> Saving...
                    </div>
                </Show>
            </div>

            <div className={'sectioned-content flex flex-row flex-wrap gap-2 w-full'}>
                <div className={'input-like'} style={status().style}>
                    {status().name}
                </div>
                <div className={'input-like'}>
                    <strong>Tag:</strong> {ctxWorkshopTicket.workshopTicket().workshop_tag}
                </div>
                <div className={'input-like'}>
                    <strong>Category:</strong> {CATEGORY_CODES[ctxWorkshopTicket.workshopTicket().category_code]}
                </div>
                <div className={'input-like'}>
                    <strong>Assigned To:</strong> {ctxWorkshopTicket.workshopTicket().__assigned_to}
                </div>
                <div className={'input-like'}>
                    <strong>Created:</strong> {ctxWorkshopTicket.workshopTicket().__created}
                </div>
            </div>
            <div className={'sectioned-content flex flex-col gap-2 w-full'}>
                <div className={'workshop-ticket-group'}>
                    <div className={'workshop-ticket-section'}>
                        <small>Client</small>
                        <p>
                            {ctxWorkshopTicket.workshopTicket().__client ? ctxWorkshop.displayName(
                                ctxWorkshopTicket.workshopTicket().__client.business_name,
                                ctxWorkshopTicket.workshopTicket().__client.first_name,
                                ctxWorkshopTicket.workshopTicket().__client.last_name
                            ) : ''}
                        </p>
                    </div>
                    <div className={'workshop-ticket-section'}>
                        <small>Contact</small>
                        <p>
                            {ctxWorkshopTicket.workshopTicket().__client ? ctxWorkshop.displayContact(
                                ctxWorkshopTicket.workshopTicket().__client.phone,
                                ctxWorkshopTicket.workshopTicket().__client.email_address,
                                ctxWorkshopTicket.workshopTicket().__client.alt_phone,
                                ctxWorkshopTicket.workshopTicket().__client.alt_email_address
                            ) : ''}
                        </p>
                    </div>
                    <div className={'workshop-ticket-section'}>
                        <small>Address</small>
                        <p>
                            {ctxWorkshopTicket.workshopTicket().__client
                                ? ctxWorkshopTicket.workshopTicket().__client.__address
                                : ''}
                        </p>
                    </div>
                </div>
                <div className={'workshop-ticket-group'}>
                    <div className={'workshop-ticket-section'}>
                        <small>Request</small>
                        {ctxWorkshopTicket.workshopTicket().request}
                    </div>
                </div>
            </div>
        </div>
    )
}