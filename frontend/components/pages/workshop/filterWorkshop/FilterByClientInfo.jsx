import {useContext} from "solid-js";
import {ContextWorkshop} from "../../../../contextManagers/ContextWorkshop";


export function FilterByClientInfo(props) {

    const ctxWorkshop = useContext(ContextWorkshop)

    return (

        <div className={'dialog-content-group'}>

            <div className={'clients-filter-group'}>
                <div className={'inline-label flex-1'}>
                    <label>Client&nbsp;ID</label>
                    <input type="number"
                           value={ctxWorkshop.ticketsTempWhere().hasOwnProperty("client_id")
                               ? ctxWorkshop.ticketsTempWhere().client_id
                               : ''}
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxWorkshop.ticketsTempWhereValue('client_id', e.target.value)
                               }
                           }}/>
                </div>

                <div className={'inline-label flex-1'}>
                    <label>Business Name</label>
                    <input className={'flex-1'}
                           type="text"
                           value={ctxWorkshop.ticketsTempWhere().hasOwnProperty("business_name")
                               ? ctxWorkshop.ticketsTempWhere().business_name
                               : ''}
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxWorkshop.ticketsTempWhereValue('business_name', e.target.value)
                               }
                           }}/>
                </div>

                <div className={'inline-label flex-1'}>
                    <label>Name</label>
                    <input className={'flex-1'}
                           type="text"
                           value={ctxWorkshop.ticketsTempWhere().hasOwnProperty("any_name")
                               ? ctxWorkshop.ticketsTempWhere().any_name
                               : ''}
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxWorkshop.ticketsTempWhereValue('any_name', e.target.value)
                               }
                           }}/>
                </div>

                <div className={'inline-label flex-1'}>
                    <label>Email&nbsp;Address</label>
                    <input className={'flex-1'}
                           type="text"
                           value={ctxWorkshop.ticketsTempWhere().hasOwnProperty("email_address")
                               ? ctxWorkshop.ticketsTempWhere().email_address
                               : ''}
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxWorkshop.ticketsTempWhereValue('email_address', e.target.value)
                               }
                           }}/>
                </div>

                <div className={'inline-label flex-1'}>
                    <label>Phone&nbsp;Number</label>
                    <input className={'flex-1'}
                           type="text"
                           value={ctxWorkshop.ticketsTempWhere().hasOwnProperty("any_number")
                               ? ctxWorkshop.ticketsTempWhere().any_number
                               : ''}
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxWorkshop.ticketsTempWhereValue('any_number', e.target.value)
                               }
                           }}/>
                </div>

                <div className={'inline-label flex-1'}>
                    <label>Postcode</label>
                    <input className={'flex-1'}
                           type="text"
                           value={ctxWorkshop.ticketsTempWhere().hasOwnProperty("postcode")
                               ? ctxWorkshop.ticketsTempWhere().postcode
                               : ''}
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxWorkshop.ticketsTempWhereValue('postcode', e.target.value)
                               }
                           }}/>
                </div>
            </div>

        </div>

    )
}