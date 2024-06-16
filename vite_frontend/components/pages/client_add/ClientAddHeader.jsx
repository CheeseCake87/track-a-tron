import {useContext} from "solid-js";
import {ContextClients} from "../../../contextManagers/ContextClients";
import {ContextMain} from "../../../contextManagers/ContextMain";


export default function ClientAddHeader(props) {

    const _ = useContext(ContextMain)
    const __ = useContext(ContextClients)

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