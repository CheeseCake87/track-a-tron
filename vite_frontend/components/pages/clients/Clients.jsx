import {createEffect, useContext} from "solid-js";
import {ContextClients} from "../../../contextManagers/ContextClients";
import ClientsInnerTable from "./ClientsInnerTable";
import ClientsHeader from "./ClientsHeader";
import {ContextMain} from "../../../contextManagers/ContextMain";
import ClientsInnerTableNoClients from "./ClientsInnerTableNoClients";
import ClientsInnerTableLoading from "./ClientsInnerTableLoading";
import ClientsFilterPills from "./ClientsFilterPills";

export default function Clients() {

    const ctxMain = useContext(ContextMain)
    const ctxClients = useContext(ContextClients)

    createEffect(() => {
        if (!ctxMain.loggedIn()) {
            ctxMain.navigator('/login')
        }
    })

    return (
        <>
            <ClientsHeader/>

            <div className={'-flex-table-bg-wrapper'}>

                <ClientsFilterPills/>

                <div className={'-flex-table'}>

                    {
                        ctxClients.loadingClients()
                            ? <ClientsInnerTableLoading/>
                            : ctxClients.clients.length > 0
                                ? <ClientsInnerTable/>
                                : <ClientsInnerTableNoClients/>
                    }

                </div>

            </div>

        </>
    )
}