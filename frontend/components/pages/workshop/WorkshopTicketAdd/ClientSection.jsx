import {Show, useContext} from "solid-js";
import {ContextWorkshopTicketAdd} from "../../../../contextManagers/ContextWorkshopTicketAdd";
import FindClientSection from "./FindClientSection";
import AddClientSection from "./AddClientSection";

export default function ClientSection() {
    const ctxWorkshopTicketAdd = useContext(ContextWorkshopTicketAdd)

    return (
        <div className={'sectioned-content w-full'}>
            <div className={'flex flex-row gap-2 mb-4'}>
                <button
                    onClick={() => {
                        ctxWorkshopTicketAdd.setAddNewClient(false)
                    }}
                    className={ctxWorkshopTicketAdd.addNewClient() ? 'btn' : 'btn-confirm'}>
                    Search For Client
                </button>
                <button
                    onClick={() => {
                        ctxWorkshopTicketAdd.clearClientSearch()
                    }}
                    className={!ctxWorkshopTicketAdd.addNewClient() ? 'btn' : 'btn-confirm'}>
                    Add New Client
                </button>
            </div>

            <Show when={!ctxWorkshopTicketAdd.addNewClient()}>
                <FindClientSection/>
            </Show>
            <Show when={ctxWorkshopTicketAdd.addNewClient()}>
                <AddClientSection/>
            </Show>

        </div>
    )
}