import {useContext} from "solid-js";
import {ContextWorkshop} from "../../../../contextManagers/ContextWorkshop";


export function FilterByDate(props) {

    const ctxWorkshop = useContext(ContextWorkshop)

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
                                   value={ctxWorkshop.ticketsTempWhere().hasOwnProperty("date_on")
                                       ? ctxWorkshop.ticketsTempWhere().date_on
                                       : ''}
                                   onChange={(e) => {
                                       if (!props.keyDownHandler(e)) {
                                           ctxWorkshop.ticketsTempWhereValue('date_on', e.target.value)
                                           if (ctxWorkshop.ticketsTempWhere().hasOwnProperty("date_from")) {
                                               ctxWorkshop.ticketsTempWhereValue('date_from', '')
                                           }
                                           if (ctxWorkshop.ticketsTempWhere().hasOwnProperty("date_to")) {
                                               ctxWorkshop.ticketsTempWhereValue('date_to', '')
                                           }
                                       }
                                   }}/>
                            <button className={'btn'} onClick={(e) => {
                                e.preventDefault()
                                ctxWorkshop.ticketsTempWhereValue('date_on', '')
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
                                   value={ctxWorkshop.ticketsTempWhere().hasOwnProperty("date_from")
                                       ? ctxWorkshop.ticketsTempWhere().date_from
                                       : ''}
                                   onChange={(e) => {
                                       if (!props.keyDownHandler(e)) {
                                           ctxWorkshop.ticketsTempWhereValue('date_from', e.target.value)
                                           if (ctxWorkshop.ticketsTempWhere().hasOwnProperty("date_on")) {
                                               ctxWorkshop.ticketsTempWhereValue('date_on', '')
                                           }
                                       }
                                   }}/>
                            <button className={'btn'} onClick={(e) => {
                                e.preventDefault()
                                ctxWorkshop.ticketsTempWhereValue('date_on', '')
                            }}>
                                clear
                            </button>
                        </div>
                    </div>
                    <div className={'inline-label flex-1'}>
                        <label>To</label>
                        <div className={'inline-button w-full'}>
                            <input type="date"
                                   value={ctxWorkshop.ticketsTempWhere().hasOwnProperty("date_to")
                                       ? ctxWorkshop.ticketsTempWhere().date_to
                                       : ''}
                                   onChange={(e) => {
                                       if (!props.keyDownHandler(e)) {
                                           ctxWorkshop.ticketsTempWhereValue('date_to', e.target.value)
                                           if (ctxWorkshop.ticketsTempWhere().hasOwnProperty("date_on")) {
                                               ctxWorkshop.ticketsTempWhereValue('date_on', '')
                                           }
                                       }
                                   }}/>
                            <button className={'btn'} onClick={(e) => {
                                e.preventDefault()
                                ctxWorkshop.ticketsTempWhereValue('date_on', '')
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