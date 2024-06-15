import {ContextClients} from "../../../contextManagers/ContextClients";
import {useContext} from "solid-js";
import {SpinnerWithMessage} from "../../globals/Spinner";


export default function ClientsInnerTableLoading() {
    const ctxClients = useContext(ContextClients)
    return (
        <div className={'-flex-table-body justify-center items-center p-2'}
             style={{height: `${ctxClients.clientsInnerTableHeight() + 24}px`}}>
            <SpinnerWithMessage message="loading..."/>
        </div>
    )
}