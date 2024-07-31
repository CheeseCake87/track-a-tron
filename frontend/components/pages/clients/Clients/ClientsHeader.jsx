import {Show, useContext} from "solid-js";
import {SpinnerSmall} from "../../../globals/Spinner";
import {ContextClients} from "../../../../contextManagers/ContextClients";
import ClientsPageControls from "./ClientsPageControls";
import {DialogFilterClients} from "../filterClients/DialogFilterClients";
import {A} from "@solidjs/router";


export default function ClientsHeader(props) {

    const clientsCtx = useContext(ContextClients)

    return (
        <>
            <div className={'page-section-header'}>
                <A className={'btn-good'} href={'/clients/add'}>
                    <span>+</span> Add Client
                </A>

                <div className={'flex items-center gap-1'}>

                    <Show when={clientsCtx.smallLoadingClients()}>
                        <div className={'flex items-center px-4'}>
                            <SpinnerSmall/>
                        </div>
                    </Show>

                    <ClientsPageControls/>

                </div>
            </div>

            <DialogFilterClients/>

        </>
    )
}