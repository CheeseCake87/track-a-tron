import {useContext} from "solid-js";
import {ContextClients} from "../../../contextManagers/ContextClients";
import ClientsInnerTable from "./ClientsInnerTable";
import ClientsHeader from "./ClientsHeader";
import ClientsInnerTableNoClients from "./ClientsInnerTableNoClients";
import ClientsInnerTableLoading from "./ClientsInnerTableLoading";
import ClientsFilterPills from "./ClientsFilterPills";

export default function Clients() {

    const ctxClients = useContext(ContextClients)

    return (
        <div className={'main-content-stretch'}>
            <ClientsHeader/>

            <ClientsFilterPills/>

            <div className={'-flex-table-bg-wrapper'}>

                <div className={'-table'}>

                    {
                        ctxClients.loadingClients()
                            ? <ClientsInnerTableLoading/>
                            : ctxClients.clients.length > 0
                                ? <ClientsInnerTable/>
                                : <ClientsInnerTableNoClients/>
                    }

                </div>

            </div>

        </div>
    )
}