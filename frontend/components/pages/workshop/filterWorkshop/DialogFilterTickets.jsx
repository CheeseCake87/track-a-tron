import {createSignal, onCleanup, onMount, useContext} from "solid-js";
import {ContextWorkshop} from "../../../../contextManagers/ContextWorkshop";
import {FilterByWorkshopTicket} from "./FilterByWorkshopTicket";
import {FilterByDate} from "./FilterByDate";


export function DialogFilterTickets() {

    const ctxWorkshop = useContext(ContextWorkshop)

    const [filterTab, setFilterTab] = createSignal('client-info')

    const keyDownHandler = (e) => {
        if (e.key === 'Escape') {
            setFilterTab('client-info')

            // Push closing to the bottom of the event loop
            setTimeout(() => {
                ctxWorkshop.dialogFilterTicketsRef.close()
            }, 1)
            return true
        }
        if (e.key === 'Enter') {
            ctxWorkshop.setTicketsWhere({
                ...ctxWorkshop.ticketsWhere(),
                ...ctxWorkshop.ticketsTempWhere()
            })
            setFilterTab('client-info')

            // Push closing to the bottom of the event loop
            setTimeout(() => {
                ctxWorkshop.dialogFilterTicketsRef.close()
            }, 1)
            return true
        }
        return false
    }

    onMount(() => {
        ctxWorkshop.dialogFilterTicketsRef.addEventListener('keydown', keyDownHandler)
        ctxWorkshop.dialogFilterTicketsRef.addEventListener('cancel', (e) => {
            e.preventDefault();
        })
    })

    onCleanup(() => {
        ctxWorkshop.dialogFilterTicketsRef.removeEventListener('keydown', keyDownHandler)
        ctxWorkshop.dialogFilterTicketsRef.removeEventListener('cancel', (e) => {
            e.preventDefault();
        })
    })

    return (
        <dialog className={'dialog'} ref={ctxWorkshop.dialogFilterTicketsRef} id={'dialog-filter-tickets-id'}>

            <div className={'btn-tab-group'}>
                <button
                    className={filterTab() === 'client-info'
                        ? 'btn-tab-active'
                        : 'btn-tab'}
                    onClick={
                        () => setFilterTab('client-info')
                    }>
                    Workshop Ticket
                </button>
                <button
                    className={filterTab() === 'date'
                        ? 'btn-tab-active'
                        : 'btn-tab'}
                    onClick={
                        () => setFilterTab('date')
                    }>
                    Date
                </button>
            </div>

            <div className={filterTab() === 'client-info'
                ? 'dialog-content'
                : 'hidden'}>
                <FilterByWorkshopTicket keyDownHandler={keyDownHandler}
                                        setFilterTab={setFilterTab}/>
            </div>

            <div className={filterTab() === 'date'
                ? 'dialog-content'
                : 'hidden'}>
                <FilterByDate keyDownHandler={keyDownHandler}
                              setFilterTab={setFilterTab}/>
            </div>

            <div className={'dialog-footer'}>
                <div className={'flex gap-1'}>
                    <button className={'btn'} onClick={() => {
                        ctxWorkshop.dialogFilterTicketsRef.close()
                        setFilterTab('client-info')
                    }}>
                        Cancel
                    </button>
                    <button className={'btn'} onClick={() => {
                        ctxWorkshop.setTicketsTempWhere({})
                    }}>
                        Clear Filter
                    </button>
                </div>
                <button className={'btn-confirm'} onClick={() => {
                    ctxWorkshop.setTicketsWhere(ctxWorkshop.ticketsTempWhere())
                    ctxWorkshop.dialogFilterTicketsRef.close()
                    setFilterTab('client-info')
                }}>
                    Apply Filter
                </button>
            </div>
        </dialog>
    )

}