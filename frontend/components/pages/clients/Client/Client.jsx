import {Show, useContext} from "solid-js";
import {ContextClients} from "../../../../contextManagers/ContextClients";
import {ContextClient} from "../../../../contextManagers/ContextClient";
import {ContextMain} from "../../../../contextManagers/ContextMain";
import {SpinnerSmall} from "../../../globals/Spinner";
import StatusPills from "./StatusPills";
import ClientData from "./ClientData";
import WorkshopTicketCards from "./WorkshopTicketCards";


export default function Client() {

    const ctxMain = useContext(ContextMain)
    const ctxClients = useContext(ContextClients)
    const ctxClient = useContext(ContextClient)

    let dialogDeleteClientsRef;

    return (
        <div className={'main-content-slim gap-2'}>
            <div className={'field-group items-center sticky top-0'}>
                <button className={'btn'} onClick={() => {
                    ctxClients.deBounceGetPageClients(
                        200, ctxClients.page(), ctxClients.limit(), ctxClients.clientsWhere()
                    )
                    ctxMain.navigator('/clients')
                }}>
                    ← Back
                </button>


                <button className={'btn-danger'} onClick={() => {
                    dialogDeleteClientsRef.showModal()
                }}>
                    Delete Client
                </button>


                <Show when={ctxClient.savingClient()}>
                    <div className={'flex flex-row gap-2 items-center px-4'}>
                        <SpinnerSmall/> Saving...
                    </div>
                </Show>
            </div>
            <div className={'sectioned-content w-full'}>

                <StatusPills/>
                <ClientData/>

            </div>

            <div className={'sectioned-content flex flex-col w-full gap-2'}>
                <label>Tickets</label>

                <WorkshopTicketCards/>

            </div>

            <dialog className={'dialog'} ref={dialogDeleteClientsRef}>
                <div className={'dialog-content text-center'} style={{height: '100px'}}>
                    <p>Are you sure you would like to delete this client?</p>
                    <p>Please note that this action is irreversible.</p>
                </div>
                <div className={'dialog-footer'}>
                    <button className={'btn'} onClick={() => {
                        dialogDeleteClientsRef.close()
                    }}>
                        Cancel
                    </button>
                    <button className={'btn-danger'} onClick={() => {
                        ctxClient.deleteClient()
                    }}>
                        Confirm Delete
                    </button>
                </div>
            </dialog>

        </div>
    )
}