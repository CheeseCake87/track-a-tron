import {useContext} from "solid-js";
import {ContextClient} from "../../../contextManagers/ContextClient";
import {ContextMain} from "../../../contextManagers/ContextMain";
import {ContextClients} from "../../../contextManagers/ContextClients";


export default function Client() {

    const _ = useContext(ContextMain)
    const __ = useContext(ContextClients)
    const ctxClient = useContext(ContextClient)

    return (
        <div>
            <h1>Client {ctxClient.clientId()}</h1>
        </div>
    )
}