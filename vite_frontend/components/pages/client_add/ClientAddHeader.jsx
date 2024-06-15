import {useContext} from "solid-js";
import {ContextClients} from "../../../contextManagers/ContextClients";
import {ContextMain} from "../../../contextManagers/ContextMain";
import {A} from "@solidjs/router";


export default function ClientAddHeader(props) {

    const mainCtx = useContext(ContextMain)
    const clientsCtx = useContext(ContextClients)

    return (
        <>
            <div className={'client-add-header'}>
                <div className={'flex gap-1'}>
                    <h1 className={'page-header'}>New Client</h1>
                </div>

                <div className={'flex gap-1'}>

                </div>
            </div>
        </>
    )
}