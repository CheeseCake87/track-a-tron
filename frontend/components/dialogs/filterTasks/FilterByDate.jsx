import {useContext} from "solid-js";
import {ContextClients} from "../../../contextManagers/ContextClients";


export function FilterByDate(props) {

    const ctxClients = useContext(ContextClients)

    return (
        <div className={'dialog-content-group'}>
            <div className={'section-filter-group'}>
                <small className={'font-bold'}>Specific</small>
                <div className={'pt-1 pb-2'}>
                <div className={'inline-label flex-1'}>
                    <label>Date</label>
                    <input type="date"
                           value={ctxClients.tempWhere().hasOwnProperty("date_on")
                               ? ctxClients.tempWhere().date_on
                               : ''}
                           onChange={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxClients.tempWhereValue('date_on', e.target.value)
                                   if (ctxClients.tempWhere().hasOwnProperty("date_from")) {
                                       ctxClients.tempWhereValue('date_from', '')
                                   }
                                   if (ctxClients.tempWhere().hasOwnProperty("date_to")) {
                                       ctxClients.tempWhereValue('date_to', '')
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
                           value={ctxClients.tempWhere().hasOwnProperty("date_from")
                               ? ctxClients.tempWhere().date_from
                               : ''}
                           onChange={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxClients.tempWhereValue('date_from', e.target.value)
                                   if (ctxClients.tempWhere().hasOwnProperty("date_on")) {
                                       ctxClients.tempWhereValue('date_on', '')
                                   }
                               }
                           }}/>
                </div>
                <div className={'inline-label flex-1'}>
                    <label>To</label>
                    <input type="date"
                           value={ctxClients.tempWhere().hasOwnProperty("date_to")
                               ? ctxClients.tempWhere().date_to
                               : ''}
                           onChange={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxClients.tempWhereValue('date_to', e.target.value)
                                   if (ctxClients.tempWhere().hasOwnProperty("date_on")) {
                                       ctxClients.tempWhereValue('date_on', '')
                                   }
                               }
                           }}/>
                </div>
                </div>
            </div>
        </div>
    )
}