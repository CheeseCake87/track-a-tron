import {For, useContext} from "solid-js";
import {ContextClients} from "../../../contextManagers/ContextClients";
import {CircleIcon} from "../../globals/Icons";


export function FilterByStatus() {

    const ctxClients = useContext(ContextClients)

    return (
        <div className={'dialog-content-group'}>

            <div className={'clients-filter-checkbox-group'}>

                <For each={ctxClients.campaignsAndStatuses}>{(available) =>
                    <div>

                        <small className={'font-bold'}>{available.team_name}</small>
                            <div className={'flex flex-col gap-1 pt-1.5 pb-2'}>
                            <For each={available.statuses}>{(status) =>
                                <label className={'checkbox'}>

                                    <input type={'checkbox'}
                                           id={`status-${status.status_id}`}
                                           name={`status-${status.status_id}`}
                                           value={status.status_id}
                                           checked={ctxClients.checkTempWhereIn('fk_status_id', status.status_id)}
                                           onClick={
                                               (_) => {
                                                   if (!ctxClients.checkTempWhereIn('fk_status_id', status.status_id)) {
                                                       ctxClients.setTempWhereIn('fk_status_id', status.status_id)
                                                   } else {
                                                       ctxClients.unsetTempWhereIn('fk_status_id', status.status_id)
                                                   }
                                               }
                                           }/>
                                    <span style={{color: status.color}}>
                                        <CircleIcon size={18}/>
                                    </span>
                                    <span>&nbsp; {status.name}</span>

                                </label>}
                            </For>
                        </div>
                    </div>
                }</For>

            </div>

        </div>
    )
}