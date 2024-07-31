import {useContext} from "solid-js";
import {ContextClients} from "../../../../contextManagers/ContextClients";
import ClientsHeader from "./ClientsHeader";
import ClientsNoClients from "./ClientsNoClients";
import ClientsLoading from "./ClientsLoading";
import ClientsFilterPills from "./ClientsFilterPills";
import ClientsCards from "./ClientsCards";

export default function Clients() {

    const ctxClients = useContext(ContextClients)

    return (
        <div className={'main-content-stretch'}>
            <ClientsHeader/>

            <ClientsFilterPills/>

            <div className={'cards-bg-wrapper'}>

                <div className={'cards'}>

                    {
                        ctxClients.loadingClients()
                            ? <ClientsLoading/>
                            : ctxClients.clients.length > 0
                                ? <ClientsCards/>
                                : <ClientsNoClients/>
                    }

                </div>

            </div>

        </div>
    )
}