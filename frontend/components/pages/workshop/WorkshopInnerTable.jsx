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
                    ID
                </div>
                <div className={'-flex-table-cell'}>
                    Name
                </div>
                <div className={'-flex-table-cell'}>
                    Phone
                </div>
                <div className={'-flex-table-cell'}>
                    Email Address
                </div>
                <div className={'-flex-table-cell'}>
                    Address
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
                            {ticket.client_id}
                        </span>
                        <span className={'-flex-table-cell item-stretch'}>
                                {displayName(ticket.business_name, ticket.first_name, ticket.last_name)}
                            </span>
                        <span className={'-flex-table-cell item-stretch'}>
                                {ticket.phone ? ticket.phone : '-'}
                        </span>
                        <span className={'-flex-table-cell item-stretch'}>
                                {ticket.email_address ? ticket.email_address : '-'}
                        </span>
                        <span className={'-flex-table-cell item-stretch'}>
                            {ticket.__address}
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