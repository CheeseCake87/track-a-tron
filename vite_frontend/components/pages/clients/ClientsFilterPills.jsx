import {For, Show, useContext} from "solid-js";
import {ContextClients} from "../../../contextManagers/ContextClients";
import {ContextMain} from "../../../contextManagers/ContextMain";
import {FilterClearIcon} from "../../globals/Icons";

export default function ClientsFilterPills() {

    const ctxMain = useContext(ContextMain)
    const ctxClients = useContext(ContextClients)

    return (
        <Show when={Object.keys(ctxMain.clientsWhereAnnex()).length > 0}>
            <div className={'pills'}>

                <For each={Object.keys(ctxMain.clientsWherePills())}>
                    {(key) =>
                        <div className={'pill'}>{key}: {ctxMain.clientsWherePills()[key]}</div>
                    }
                </For>

                <div className={'pill-danger-interactive'}
                     onClick={() => {
                         ctxMain.setClientsWhere({})
                         ctxClients.setClientsWhereAnnex({})
                         ctxMain.setClientsTempWhere({})
                     }}>
                    <FilterClearIcon size={14}/>
                </div>

            </div>
        </Show>
    )
}


