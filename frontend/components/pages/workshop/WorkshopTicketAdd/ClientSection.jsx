import {Show, useContext} from "solid-js";
import {ContextWorkshopTicketAdd} from "../../../../contextManagers/ContextWorkshopTicketAdd";
import FindClientSection from "./FindClientSection";
import AddClientSection from "./AddClientSection";
import {LetterXIcon, NextPageIcon} from "../../../globals/Icons";

export default function ClientSection() {
    const ctxWorkshopTicketAdd = useContext(ContextWorkshopTicketAdd)

    return (
        <div className={'sectioned-content w-full'}>

            <div className={'flex flex-row gap-2 mb-4'}>

                <div className={'btn-box-group-row'}>

                    <button
                        onClick={() => {
                            ctxWorkshopTicketAdd.setAddNewClient(false)
                        }}
                        disabled={ctxWorkshopTicketAdd.clientSelected() !== ''}
                        className={(!ctxWorkshopTicketAdd.addNewClient() && ctxWorkshopTicketAdd.clientSelected() === '') ? 'btn-confirm' : 'btn'}>
                        Search For Client
                    </button>
                    <button
                        onClick={() => {
                            ctxWorkshopTicketAdd.clearClientSearch()
                        }}
                        disabled={ctxWorkshopTicketAdd.clientSelected() !== ''}
                        className={(ctxWorkshopTicketAdd.addNewClient() && ctxWorkshopTicketAdd.clientSelected() === '') ? 'btn-confirm' : 'btn'}>
                        Add New Client
                    </button>

                    <NextPageIcon/>

                    <div
                        className={ctxWorkshopTicketAdd.clientSelected() === '' ? 'btn-box-good-disabled' : 'btn-box-good'}>
                        Client Selected
                    </div>
                </div>

            </div>

            <Show when={!ctxWorkshopTicketAdd.addNewClient() && ctxWorkshopTicketAdd.clientSelected() === ''}>
                <FindClientSection/>
            </Show>
            <Show when={ctxWorkshopTicketAdd.addNewClient() && ctxWorkshopTicketAdd.clientSelected() === ''}>
                <AddClientSection/>
            </Show>
            <Show when={ctxWorkshopTicketAdd.clientSelected() !== ''}>
                <div className={'form-section pt-2'}>
                    <label>Client Selected</label>
                    <div className={'card-pill-group'}>
                        <div className={'card-pill'}>
                            {ctxWorkshopTicketAdd.clientSelected()}
                            <button className={'btn-danger btn-pill'}
                                    onClick={() => {
                                        ctxWorkshopTicketAdd.setClientIDSelected(0)
                                        ctxWorkshopTicketAdd.setClientSelected('')
                                    }}>
                                <LetterXIcon size={18} strokeWidth={2}/>
                            </button>
                        </div>
                    </div>
                </div>
            </Show>

        </div>
    )
}