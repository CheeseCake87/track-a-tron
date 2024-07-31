import {For, Show, useContext} from "solid-js";
import {ContextClients} from "../../../../contextManagers/ContextClients";
import {FilterClearIcon} from "../../../globals/Icons";

export default function ClientsFilterPills() {

    const ctxClients = useContext(ContextClients)

    return (
        <Show when={Object.keys(ctxClients.clientsWhereAnnex()).length > 0}>
            <div className={'pills mb-2'}>

                <For each={Object.keys(ctxClients.clientsWherePills())}>
                    {(key) =>
                        <div className={'pill'}>{key}: {ctxClients.clientsWherePills()[key]}</div>
                    }
                </For>

                <div className={'pill-danger-interactive'}
                     onClick={() => {
                         ctxClients.setClientsWhere({})
                         ctxClients.setClientsWhereAnnex({})
                         ctxClients.setClientsTempWhere({})
                     }}>
                    <FilterClearIcon size={14}/>
                </div>

            </div>
        </Show>
    )
}


