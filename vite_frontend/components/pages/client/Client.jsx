import {useContext} from "solid-js";
import {ContextClient} from "../../../contextManagers/ContextClient";


export default function Client() {

    const ctxClient = useContext(ContextClient)

    return (
        <div className={'main-content-slim'}>
            <h1>Client {ctxClient.client().client_id}</h1>
        </div>
    )
}