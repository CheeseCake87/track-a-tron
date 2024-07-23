import {For, Show, useContext} from "solid-js";
import {ContextWorkshop} from "../../../contextManagers/ContextWorkshop";
import {FilterClearIcon} from "../../globals/Icons";

export default function WorkshopFilterPills() {

    const ctxWorkshop = useContext(ContextWorkshop)

    return (
        <Show when={Object.keys(ctxWorkshop.ticketsWhereAnnex()).length > 0}>
            <div className={'pills mb-2'}>

                <For each={Object.keys(ctxWorkshop.ticketsWherePills())}>
                    {(key) =>
                        <div className={'pill'}>{key}: {ctxWorkshop.ticketsWherePills()[key]}</div>
                    }
                </For>

                <div className={'pill-danger-interactive'}
                     onClick={() => {
                         ctxWorkshop.setTicketsWhere({})
                         ctxWorkshop.setTicketsWhereAnnex({})
                         ctxWorkshop.setTicketsTempWhere({})
                     }}>
                    <FilterClearIcon size={14}/>
                </div>

            </div>
        </Show>
    )
}


