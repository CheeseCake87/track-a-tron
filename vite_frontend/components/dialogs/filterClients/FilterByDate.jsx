import {useContext} from "solid-js";
import {ContextClients} from "../../../contextManagers/ContextClients";
import {ContextMain} from "../../../contextManagers/ContextMain";


export function FilterByDate(props) {

    const ctxMain = useContext(ContextMain)
    const ctxClients = useContext(ContextClients)

    return (
        <div className={'dialog-content-group'}>
            <div className={'clients-filter-group'}>
                <small className={'font-bold'}>Specific</small>
                <div className={'pt-1 pb-2'}>
                    <div className={'inline-label flex-1'}>
                        <label>Date</label>
                        <input type="date"
                               value={ctxMain.clientsTempWhere().hasOwnProperty("date_on")
                                   ? ctxMain.clientsTempWhere().date_on
                                   : ''}
                               onChange={(e) => {
                                   if (!props.keyDownHandler(e)) {
                                       ctxClients.clientsTempWhereValue('date_on', e.target.value)
                                       if (ctxMain.clientsTempWhere().hasOwnProperty("date_from")) {
                                           ctxMain.clientsTempWhereValue('date_from', '')
                                       }
                                       if (ctxMain.clientsTempWhere().hasOwnProperty("date_to")) {
                                           ctxMain.clientsTempWhereValue('date_to', '')
                                       }
                                   }
                               }}/>
                    </div>
                </div>
                <small className={'font-bold'}>Range</small>
                <div className={'flex flex-col gap-1 pt-1 pb-2'}>
                    <div className={'inline-label flex-1'}>
                        <label>From</label>
                        <input type="date"
                               value={ctxMain.clientsTempWhere().hasOwnProperty("date_from")
                                   ? ctxMain.clientsTempWhere().date_from
                                   : ''}
                               onChange={(e) => {
                                   if (!props.keyDownHandler(e)) {
                                       ctxMain.clientsTempWhereValue('date_from', e.target.value)
                                       if (ctxMain.clientsTempWhere().hasOwnProperty("date_on")) {
                                           ctxMain.clientsTempWhereValue('date_on', '')
                                       }
                                   }
                               }}/>
                    </div>
                    <div className={'inline-label flex-1'}>
                        <label>To</label>
                        <input type="date"
                               value={ctxMain.clientsTempWhere().hasOwnProperty("date_to")
                                   ? ctxMain.clientsTempWhere().date_to
                                   : ''}
                               onChange={(e) => {
                                   if (!props.keyDownHandler(e)) {
                                       ctxMain.clientsTempWhereValue('date_to', e.target.value)
                                       if (ctxMain.clientsTempWhere().hasOwnProperty("date_on")) {
                                           ctxMain.clientsTempWhereValue('date_on', '')
                                       }
                                   }
                               }}/>
                    </div>
                </div>
            </div>
        </div>
    )
}