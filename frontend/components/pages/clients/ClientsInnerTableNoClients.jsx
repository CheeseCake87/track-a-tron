import {NoClientsIcon} from "../../globals/Icons";
import {ContextClients} from "../../../contextManagers/ContextClients";
import {useContext} from "solid-js";


export default function ClientsInnerTableNoClients() {
    const ctxClients = useContext(ContextClients)
    return (
        <div className={'flex justify-center items-center w-full h-full min-h-0'}>
            <div className={'flex flex-col items-center'}>
                <NoClientsIcon size={64}/>
                <small>No clients found</small>
            </div>
        </div>
    )
}