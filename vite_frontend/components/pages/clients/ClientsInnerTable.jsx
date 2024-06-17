import {createSignal, For, onMount, useContext} from "solid-js";
import {ContextClients} from "../../../contextManagers/ContextClients";
import {A} from "@solidjs/router";


export default function ClientsInnerTable() {

    const ctxClients = useContext(ContextClients)

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
            <div className={'-grid-table-header grid-cols-5'}
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
                <div className={'-flex-table-cell text-end'}>
                    Created
                </div>
            </div>
            {/* style={{height: `${ctxClients.clientsInnerTableHeight()}px`}} */}
            <div className={'-table-overflow'}>
                <div className={'w-full'}
                     style={{height: '1px'}}
                     ref={tableDataWidthRef}>
                </div>
                <For each={ctxClients.clients}>{(client, i) =>
                    <A className={'-grid-table-row -clickable grid-cols-5'} href={
                        "/client/" + client.client_id
                    }>
                        <span className={'-flex-table-cell-min'}>
                            {client.client_id}
                        </span>
                        <span className={'-flex-table-cell item-stretch'}>
                                {displayName(client.business_name, client.first_name, client.last_name)}
                            </span>
                        <span className={'-flex-table-cell item-stretch'}>
                                {client.phone ? client.phone : '-'}
                        </span>
                        <span className={'-flex-table-cell item-stretch'}>
                                {client.email_address ? client.email_address : '-'}
                        </span>
                        <span className={'-flex-table-cell text-end'}>
                            {client.__created}
                        </span>
                    </A>
                }</For>
            </div>
        </>
    )
}