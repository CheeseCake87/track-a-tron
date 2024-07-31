import {NoClientsIcon} from "../../../globals/Icons";
import {ContextClients} from "../../../../contextManagers/ContextClients";
import {useContext} from "solid-js";


export default function ClientsNoClients() {
    const ctxClients = useContext(ContextClients)
    return (
        <div className={'flex justify-center items-center w-full h-full min-h-0'}>
            <div className={'flex flex-col items-center'}>
                <NoClientsIcon size={64}/>
                <small>No tickets found</small>
            </div>
        </div>
    )
}