import {useContext} from "solid-js";
import {ContextClients} from "../../../contextManagers/ContextClients";
import {ContextClient} from "../../../contextManagers/ContextClient";
import {ContextMain} from "../../../contextManagers/ContextMain";


export default function SalesTill() {

    const ctxMain = useContext(ContextMain)
    const ctxClients = useContext(ContextClients)
    const ctxClient = useContext(ContextClient)

    return (<></>)

}