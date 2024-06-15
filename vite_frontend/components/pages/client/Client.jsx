import {useContext} from "solid-js";
import {ContextClient} from "../../../contextManagers/ContextClient";


export default function Client() {

    const ctxClient = useContext(ContextClient)

    return (
        <div>
            <h1>Client {ctxClient.clientId()}</h1>
        </div>
    )
}