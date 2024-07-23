import {FilterIcon, FirstPageIcon, LastPageIcon, NextPageIcon, PrevPageIcon} from "../../globals/Icons";
import {ContextWorkshop} from "../../../contextManagers/ContextWorkshop";
import {useContext} from "solid-js";


export default function WorkshopPageControls() {

    const ctxWorkshop = useContext(ContextWorkshop)

    return (
        <>
            <button className={'btn-confirm'} onClick={() => {
                if (ctxWorkshop.page() > 1) {
                    ctxWorkshop.setPage(1)
                }
            }} disabled={ctxWorkshop.page() === 1}>
                <FirstPageIcon size={16}/>
            </button>
            <button className={'btn-confirm'} onClick={() => {
                if (ctxWorkshop.page() > 1) {
                    ctxWorkshop.setPage(ctxWorkshop.page() - 1)
                }
            }} disabled={ctxWorkshop.page() === 1}>
                <PrevPageIcon size={16}/>
            </button>

            <div className={'input-like'} onClick={() => {
            }}>
                {ctxWorkshop.loadingTickets() ? '-' : `Total: ${ctxWorkshop.totalTickets()}`}
            </div>

            <div className={'input-like'} onClick={() => {
            }}>
                {ctxWorkshop.loadingTickets() ? '-' : `${ctxWorkshop.page()} / ${ctxWorkshop.totalPages()}`}
            </div>

            <select onChange={(e) =>
                ctxWorkshop.changeLimit(
                    parseInt(e.target.options[e.target.selectedIndex].value)
                )
            }>
                <option value="25" selected={ctxWorkshop.limit() === 25}>25 pp</option>
                <option value="50" selected={ctxWorkshop.limit() === 50}>50 pp</option>
                <option value="100" selected={ctxWorkshop.limit() === 100}>100 pp</option>
            </select>

            <button className={'btn-confirm'} onClick={() => {
                if (ctxWorkshop.page() < ctxWorkshop.totalPages()) {
                    ctxWorkshop.setPage(ctxWorkshop.page() + 1)
                }
            }} disabled={ctxWorkshop.page() === ctxWorkshop.totalPages()}>
                <NextPageIcon size={16}/>
            </button>
            <button className={'btn-confirm'} onClick={() => {
                if (ctxWorkshop.page() < ctxWorkshop.totalPages()) {
                    ctxWorkshop.setPage(ctxWorkshop.totalPages())
                }
            }} disabled={ctxWorkshop.page() === ctxWorkshop.totalPages()}>
                <LastPageIcon size={16}/>
            </button>

            <button className={'btn-confirm'} onClick={() => {
                ctxWorkshop.dialogFilterTicketsRef.showModal()
            }}>
                <FilterIcon size={16}/>
            </button>

        </>
    )
}