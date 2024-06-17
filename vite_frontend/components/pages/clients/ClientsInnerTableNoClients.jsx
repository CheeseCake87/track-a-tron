import {NoClientsIcon} from "../../globals/Icons";
import {ContextClients} from "../../../contextManagers/ContextClients";
import {useContext} from "solid-js";


export default function ClientsInnerTableNoClients() {
    const ctxClients = useContext(ContextClients)
    return (
        <div className={'-table-overflow justify-center items-center p-2'}
             style={{height: `${ctxClients.clientsInnerTableHeight() + 24}px`}}>
            <NoClientsIcon size={64}/>
            <small>No clients found</small>
        </div>
    )
}