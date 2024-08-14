import {For, Show, useContext} from "solid-js";
import {ContextWorkshopTicketAdd} from "../../../../contextManagers/ContextWorkshopTicketAdd";
import {ExternalLink} from "../../../globals/Icons";
import {ContextMain} from "../../../../contextManagers/ContextMain";
import {A} from "@solidjs/router";

export default function FindClientSection() {

    const ctxMain = useContext(ContextMain)
    const ctxWorkshopTicketAdd = useContext(ContextWorkshopTicketAdd)

    return (
        <>
            <div className={'form-section'}>

                <label>Search</label>

                <div className={'field-group'}>
                    <div className={'inline-label'}>
                        <label>Name</label>
                        <input type={'text'}
                               className={'w-36'}
                               onKeyUp={
                                   (e) => {
                                       if (e.key === 'Enter') {
                                           ctxWorkshopTicketAdd.findClient()
                                       }
                                       ctxWorkshopTicketAdd.updateFindClient('any_name', e.target.value)
                                   }
                               } value={ctxWorkshopTicketAdd.findClientFields().any_name}/>
                    </div>
                    <div className={'inline-label'}>
                        <label>Phone</label>
                        <input type={'text'}
                               className={'w-36'}
                               onKeyUp={
                                   (e) => {
                                       if (e.key === 'Enter') {
                                           ctxWorkshopTicketAdd.findClient()
                                       }
                                       ctxWorkshopTicketAdd.updateFindClient('any_phone', e.target.value)
                                   }
                               } value={ctxWorkshopTicketAdd.findClientFields().any_phone}/>
                    </div>
                    <div className={'inline-label'}>
                        <label>Email Address</label>
                        <input type={'text'}
                               onKeyUp={
                                   (e) => {
                                       if (e.key === 'Enter') {
                                           ctxWorkshopTicketAdd.findClient()
                                       }
                                       ctxWorkshopTicketAdd.updateFindClient('any_email', e.target.value)
                                   }
                               } value={ctxWorkshopTicketAdd.findClientFields().any_email}/>
                    </div>
                    <div className={'inline-label'}>
                        <label>Postcode</label>
                        <input type={'text'}
                               className={'w-28'}
                               onKeyUp={
                                   (e) => {
                                       if (e.key === 'Enter') {
                                           ctxWorkshopTicketAdd.findClient()
                                       }
                                       ctxWorkshopTicketAdd.updateFindClient('postcode', e.target.value)
                                   }
                               } value={ctxWorkshopTicketAdd.findClientFields().postcode}/>
                    </div>
                    <button className={'btn-confirm'}
                            tabIndex={8}
                            disabled={
                                ctxWorkshopTicketAdd.findClientFields().any_name === '' &&
                                ctxWorkshopTicketAdd.findClientFields().any_phone === '' &&
                                ctxWorkshopTicketAdd.findClientFields().any_email === '' &&
                                ctxWorkshopTicketAdd.findClientFields().postcode === ''
                            }
                            onClick={
                                () => {
                                    ctxWorkshopTicketAdd.findClient()
                                }
                            }>Search Client
                    </button>
                </div>
            </div>
            <div className={'form-section pt-2'}>
                <label>
                    Clients Found
                </label>
                <div className={'card-pill-group'}>
                    <For each={ctxWorkshopTicketAdd.foundClients()} fallback={
                        <div className={'flex'}>
                            <div className={'card-pill'}>
                                <Show when={ctxWorkshopTicketAdd.clientSearchDone()}
                                      children={'No clients found'}
                                      fallback={'Search for a client'}/>
                            </div>
                        </div>
                    }>
                        {(foundClient, i) => (
                            <div className={'card-pill'}>
                                {ctxWorkshopTicketAdd.buildSelectedClient(foundClient)}
                                <A href={`/clients/${foundClient.client_id}`}
                                   target={'_blank'}
                                   className={'btn-confirm btn-pill'}>
                                    Open <ExternalLink size={14}/>
                                </A>
                                <button className={'btn-good btn-pill'}
                                        role={'button'}
                                        onClick={() => {
                                            ctxWorkshopTicketAdd.setSelectedClient(foundClient)
                                        }}>
                                    Select
                                </button>
                            </div>
                        )}
                    </For>
                </div>
            </div>
        </>
    )
}