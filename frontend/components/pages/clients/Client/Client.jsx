import {Show, useContext} from "solid-js";
import {ContextClients} from "../../../../contextManagers/ContextClients";
import {ContextClient} from "../../../../contextManagers/ContextClient";
import {ContextMain} from "../../../../contextManagers/ContextMain";
import {SpinnerSmall} from "../../../globals/Spinner";
import StatusPills from "./StatusPills";
import ClientData from "./ClientData";


export default function Client() {

    const ctxMain = useContext(ContextMain)
    const ctxClients = useContext(ContextClients)
    const ctxClient = useContext(ContextClient)

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

        </div>
    )
}