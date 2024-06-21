import {createSignal, onCleanup, onMount, useContext} from "solid-js";
import {ContextClients} from "../../../contextManagers/ContextClients";
import {FilterByClientInfo} from "./FilterByClientInfo";
import {FilterByDate} from "./FilterByDate";


export function DialogFilterClients() {

    const ctxClients = useContext(ContextClients)

    const [filterTab, setFilterTab] = createSignal('client-info')

    const keyDownHandler = (e) => {
        if (e.key === 'Escape') {
            setFilterTab('client-info')

            // Push closing to the bottom of the event loop
            setTimeout(() => {
                ctxClients.dialogFilterClientsRef.close()
            }, 1)
            return true
        }
        if (e.key === 'Enter') {
            ctxClients.setClientsWhere({
                ...ctxClients.clientsWhere(),
                ...ctxClients.clientsTempWhere()
            })
            setFilterTab('client-info')

            // Push closing to the bottom of the event loop
            setTimeout(() => {
                ctxClients.dialogFilterClientsRef.close()
            }, 1)
            return true
        }
        return false
    }

    onMount(() => {
        ctxClients.dialogFilterClientsRef.addEventListener('keydown', keyDownHandler)
        ctxClients.dialogFilterClientsRef.addEventListener('cancel', (e) => {
            e.preventDefault();
        })
    })

    onCleanup(() => {
        ctxClients.dialogFilterClientsRef.removeEventListener('keydown', keyDownHandler)
        ctxClients.dialogFilterClientsRef.removeEventListener('cancel', (e) => {
            e.preventDefault();
        })
    })

    return (
        <dialog className={'dialog'} ref={ctxClients.dialogFilterClientsRef} id={'dialog-filter-clients-id'}>

            <div className={'btn-tab-group'}>
                <button
                    className={filterTab() === 'client-info'
                        ? 'btn-tab-active'
                        : 'btn-tab'}
                    onClick={
                        () => setFilterTab('client-info')
                    }>
                    Client Info
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
                <FilterByClientInfo keyDownHandler={keyDownHandler}
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
                        ctxClients.dialogFilterClientsRef.close()
                        setFilterTab('client-info')
                    }}>
                        Cancel
                    </button>
                    <button className={'btn'} onClick={() => {
                        ctxClients.setClientsTempWhere({})
                    }}>
                        Clear Filter
                    </button>
                </div>
                <button className={'btn-confirm'} onClick={() => {
                    ctxClients.setClientsWhere(ctxClients.clientsTempWhere())
                    ctxClients.dialogFilterClientsRef.close()
                    setFilterTab('client-info')
                }}>
                    Apply Filter
                </button>
            </div>
        </dialog>
    )

}