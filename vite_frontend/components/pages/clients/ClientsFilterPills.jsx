import {For, Show, useContext} from "solid-js";
import {ContextClients} from "../../../contextManagers/ContextClients";
import {ContextMain} from "../../../contextManagers/ContextMain";
import {FilterClearIcon} from "../../globals/Icons";

export default function Clients() {

    const ctxMain = useContext(ContextMain)
    const ctxClients = useContext(ContextClients)

    return (
        <Show when={Object.keys(ctxClients.displayWhere()).length > 0}>
            <div className={'pills'}>

                <For each={Object.keys(ctxClients.displayWherePills())}>
                    {(key) =>
                        <div className={'pill'}>{key}: {ctxClients.displayWherePills()[key]}</div>
                    }
                </For>

                <div className={'pill-danger-interactive'}
                     onClick={() => {
                         ctxMain.setWhere({})
                         ctxClients.setDisplayWhere({})
                         ctxClients.setTempWhere({})
                     }}>
                    <FilterClearIcon size={14}/>
                </div>

            </div>
        </Show>
    )
}


