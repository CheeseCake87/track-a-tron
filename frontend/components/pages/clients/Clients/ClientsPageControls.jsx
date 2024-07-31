import {FilterIcon, FirstPageIcon, LastPageIcon, NextPageIcon, PrevPageIcon} from "../../../globals/Icons";
import {ContextClients} from "../../../../contextManagers/ContextClients";
import {useContext} from "solid-js";


export default function ClientsPageControls() {

    const ctxClients = useContext(ContextClients)

    return (
        <>
            <button className={'btn-confirm'} onClick={() => {
                if (ctxClients.page() > 1) {
                    ctxClients.setPage(1)
                }
            }} disabled={ctxClients.page() === 1}>
                <FirstPageIcon size={16}/>
            </button>
            <button className={'btn-confirm'} onClick={() => {
                if (ctxClients.page() > 1) {
                    ctxClients.setPage(ctxClients.page() - 1)
                }
            }} disabled={ctxClients.page() === 1}>
                <PrevPageIcon size={16}/>
            </button>

            <div className={'input-like'} onClick={() => {
            }}>
                {ctxClients.loadingClients() ? '-' : `Total: ${ctxClients.totalClients()}`}
            </div>

            <div className={'input-like'} onClick={() => {
            }}>
                {ctxClients.loadingClients() ? '-' : `${ctxClients.page()} / ${ctxClients.totalPages()}`}
            </div>

            <select onChange={(e) =>
                ctxClients.changeLimit(
                    parseInt(e.target.options[e.target.selectedIndex].value)
                )
            }>
                <option value="25" selected={ctxClients.limit() === 25}>25 pp</option>
                <option value="50" selected={ctxClients.limit() === 50}>50 pp</option>
                <option value="100" selected={ctxClients.limit() === 100}>100 pp</option>
            </select>

            <button className={'btn-confirm'} onClick={() => {
                if (ctxClients.page() < ctxClients.totalPages()) {
                    ctxClients.setPage(ctxClients.page() + 1)
                }
            }} disabled={ctxClients.page() === ctxClients.totalPages()}>
                <NextPageIcon size={16}/>
            </button>
            <button className={'btn-confirm'} onClick={() => {
                if (ctxClients.page() < ctxClients.totalPages()) {
                    ctxClients.setPage(ctxClients.totalPages())
                }
            }} disabled={ctxClients.page() === ctxClients.totalPages()}>
                <LastPageIcon size={16}/>
            </button>

            <button className={'btn-confirm'} onClick={() => {
                ctxClients.dialogFilterClientsRef.showModal()
            }}>
                <FilterIcon size={16}/>
            </button>

        </>
    )
}