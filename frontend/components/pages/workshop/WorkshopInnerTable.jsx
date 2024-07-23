import {createSignal, For, onMount, useContext} from "solid-js";
import {ContextWorkshop} from "../../../contextManagers/ContextWorkshop";
import {A} from "@solidjs/router";


export default function WorkshopInnerTable() {

    const ctxWorkshop = useContext(ContextWorkshop)

    const [
        tableHeadersWidth,
        setTableHeadersWidth
    ] = createSignal(0)

    let tableHeaderWidthRef;
    let tableDataWidthRef;

    function displayName(business_name, first_name, last_name) {
        let name = ''
        if (first_name) {
            name = first_name
        }
        if (last_name) {
            if (first_name) {
                name += ' ' + last_name
            } else {
                name = last_name
            }
        }

        if (business_name) {
            if (name !== '') {
                return name + ' (' + business_name + ')'
            } else {
                return business_name
            }
        }

        return name
    }

    function displayContact(phone, email, alt_phone, alt_email) {
        let contact = []
        if (phone) {
            contact.push(phone)
        }
        if (email) {
            contact.push(email)
        }
        if (alt_phone) {
            contact.push(alt_phone)
        }
        if (alt_email) {
            contact.push(alt_email)
        }
        return contact.join(', ')
    }

    function trackWidth() {
        setTableHeadersWidth(tableDataWidthRef.offsetWidth)
        return tableDataWidthRef.offsetWidth
    }

    onMount(() => {
        new ResizeObserver(trackWidth).observe(tableDataWidthRef)
    })

    return (
        <>
            <div className={'-grid-table-header grid-cols-6'}
                 style={{width: `${tableHeadersWidth()}px`}}
                 ref={tableHeaderWidthRef}>
                <div className={'-flex-table-cell-min'}>
                    Ticket
                </div>
                <div className={'-flex-table-cell'}>
                    Status
                </div>
                <div className={'-flex-table-cell'}>
                    Client
                </div>
                <div className={'-flex-table-cell'}>
                    Client Contact
                </div>
                <div className={'-flex-table-cell'}>
                    Details
                </div>
                <div className={'-flex-table-cell text-end'}>
                    Created
                </div>
            </div>
            <div className={'-table-overflow'} id={'ticketsTableOverflow'}>
                <div className={'w-full'}
                     style={{height: '1px'}}
                     ref={tableDataWidthRef}>
                </div>
                <For each={ctxWorkshop.tickets}>{(ticket, i) =>
                    <A className={'-grid-table-row -clickable grid-cols-6'} href={
                        "/workshop/ticket/" + ticket.client_id
                    }>
                        <span className={'-flex-table-cell-min'}>
                            {ticket.workshop_tag}
                        </span>
                        <span className={'-flex-table-cell-min'}>
                            {ticket.status_code}
                        </span>
                        <span className={'-flex-table-cell item-stretch'}>
                                {displayName(
                                    ticket.__client.business_name,
                                    ticket.__client.first_name,
                                    ticket.__client.last_name
                                )}
                            </span>
                        <span className={'-flex-table-cell item-stretch'}>
                                {displayContact(
                                    ticket.__client.phone,
                                    ticket.__client.email_address,
                                    ticket.__client.alt_phone,
                                    ticket.__client.alt_email_address
                                )}
                        </span>
                        <span className={'-flex-table-cell item-stretch'}>
                                {ticket.request}
                        </span>
                        <span className={'-flex-table-cell text-end'}>
                            {ticket.__created}
                        </span>
                    </A>
                }</For>
            </div>
        </>
    )
}