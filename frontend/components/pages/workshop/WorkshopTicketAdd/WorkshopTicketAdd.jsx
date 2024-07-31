import {For, useContext} from "solid-js";
import {ContextMain} from "../../../../contextManagers/ContextMain";
import {ContextWorkshopTicketAdd} from "../../../../contextManagers/ContextWorkshopTicketAdd";
import {CATEGORY_CODES_ARRAY} from "../../../../globals";
import ClientSection from "./ClientSection";
import DeviceSection from "./DeviceSection";
import ItemSection from "./ItemSection";

export default function WorkshopTicketAdd() {

    const ctxMain = useContext(ContextMain)
    const ctxWorkshopTicketAdd = useContext(ContextWorkshopTicketAdd)

    return (
        <div className={'main-content-stretch gap-2'}>
            <div className={'sticky-top-buttons'}>
                <button className={'btn'} onClick={() => ctxMain.navigator('/workshop')}>← Cancel</button>
                <button className={'btn-good'}
                        onClick={ctxWorkshopTicketAdd.createWorkshopTicket}>
                    Create Ticket
                </button>
            </div>

            <ClientSection/>

            <form onsubmit={
                (e) => {
                    e.preventDefault()
                }
            }>
                <div className={'sectioned-content w-full'}>
                    <div className={'form-section'}>
                        <label>Category</label>
                        <div className={'flex flex-row gap-2'}>
                            <For each={CATEGORY_CODES_ARRAY}>
                                {(category, i) => (
                                    <button
                                        onClick={() => ctxWorkshopTicketAdd.setCategoryCode(category.code)}
                                        className={ctxWorkshopTicketAdd.categoryCode() === category.code
                                            ? 'btn-confirm'
                                            : 'btn'}>
                                        {category.label}
                                    </button>
                                )}
                            </For>
                        </div>
                    </div>
                    <div className={'form-section pt-2'}>
                        <label>Request</label>
                        <textarea rows="3" tabIndex={1} onKeyUp={
                            (e) => {
                                ctxWorkshopTicketAdd.setRequest(e.target.value)
                            }
                        } value={ctxWorkshopTicketAdd.request()
                        }></textarea>
                    </div>
                </div>
            </form>

            <DeviceSection/>

            <ItemSection/>

        </div>
    )
}












