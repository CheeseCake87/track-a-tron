import {useContext} from "solid-js";
import {ContextClients} from "../../../../contextManagers/ContextClients";


export function FilterByDate(props) {

    const ctxClients = useContext(ContextClients)

    return (
        <div className={'dialog-content-group'}>
            <div className={'section-filter-group'}>
                <small className={'font-bold'}>Specific</small>
                <div className={'pt-1 pb-2'}>
                    <div className={'inline-label flex-1'}>
                        <label>Date</label>
                        <div className={'inline-button w-full'}>
                            <input type="date"
                                   className={''}
                                   value={ctxClients.clientsTempWhere().hasOwnProperty("date_on")
                                       ? ctxClients.clientsTempWhere().date_on
                                       : ''}
                                   onChange={(e) => {
                                       if (!props.keyDownHandler(e)) {
                                           ctxClients.clientsTempWhereValue('date_on', e.target.value)
                                           if (ctxClients.clientsTempWhere().hasOwnProperty("date_from")) {
                                               ctxClients.clientsTempWhereValue('date_from', '')
                                           }
                                           if (ctxClients.clientsTempWhere().hasOwnProperty("date_to")) {
                                               ctxClients.clientsTempWhereValue('date_to', '')
                                           }
                                       }
                                   }}/>
                            <button className={'btn'} onClick={(e) => {
                                e.preventDefault()
                                ctxClients.clientsTempWhereValue('date_on', '')
                            }}>
                                clear
                            </button>
                        </div>
                    </div>
                </div>
                <small className={'font-bold'}>Range</small>
                <div className={'flex flex-col gap-1 pt-1 pb-2'}>
                    <div className={'inline-label flex-1'}>
                        <label>From</label>
                        <div className={'inline-button w-full'}>
                            <input type="date"
                                   value={ctxClients.clientsTempWhere().hasOwnProperty("date_from")
                                       ? ctxClients.clientsTempWhere().date_from
                                       : ''}
                                   onChange={(e) => {
                                       if (!props.keyDownHandler(e)) {
                                           ctxClients.clientsTempWhereValue('date_from', e.target.value)
                                           if (ctxClients.clientsTempWhere().hasOwnProperty("date_on")) {
                                               ctxClients.clientsTempWhereValue('date_on', '')
                                           }
                                       }
                                   }}/>
                            <button className={'btn'} onClick={(e) => {
                                e.preventDefault()
                                ctxClients.clientsTempWhereValue('date_on', '')
                            }}>
                                clear
                            </button>
                        </div>
                    </div>
                    <div className={'inline-label flex-1'}>
                        <label>To</label>
                        <div className={'inline-button w-full'}>
                            <input type="date"
                                   value={ctxClients.clientsTempWhere().hasOwnProperty("date_to")
                                       ? ctxClients.clientsTempWhere().date_to
                                       : ''}
                                   onChange={(e) => {
                                       if (!props.keyDownHandler(e)) {
                                           ctxClients.clientsTempWhereValue('date_to', e.target.value)
                                           if (ctxClients.clientsTempWhere().hasOwnProperty("date_on")) {
                                               ctxClients.clientsTempWhereValue('date_on', '')
                                           }
                                       }
                                   }}/>
                            <button className={'btn'} onClick={(e) => {
                                e.preventDefault()
                                ctxClients.clientsTempWhereValue('date_on', '')
                            }}>
                                clear
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}