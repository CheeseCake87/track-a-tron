import {useContext} from "solid-js";
import {ContextClients} from "../../../contextManagers/ContextClients";


export function FilterByClientInfo(props) {

    const ctxClients = useContext(ContextClients)

    return (

        <div className={'dialog-content-group'}>

            <div className={'clients-filter-group'}>
                <div className={'inline-label flex-1'}>
                    <label>Client&nbsp;ID</label>
                    <input type="number"
                           value={ctxClients.clientsTempWhere().hasOwnProperty("client_id")
                               ? ctxClients.clientsTempWhere().client_id
                               : ''}
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxClients.clientsTempWhereValue('client_id', e.target.value)
                               }
                           }}/>
                </div>

                <div className={'inline-label flex-1'}>
                    <label>Name</label>
                    <input className={'flex-1'}
                           type="text"
                           value={ctxClients.clientsTempWhere().hasOwnProperty("any_name")
                               ? ctxClients.clientsTempWhere().any_name
                               : ''}
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxClients.clientsTempWhereValue('any_name', e.target.value)
                               }
                           }}/>
                </div>

                <div className={'inline-label flex-1'}>
                    <label>Email&nbsp;Address</label>
                    <input className={'flex-1'}
                           type="text"
                           value={ctxClients.clientsTempWhere().hasOwnProperty("email_address")
                               ? ctxClients.clientsTempWhere().email_address
                               : ''}
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxClients.clientsTempWhereValue('email_address', e.target.value)
                               }
                           }}/>
                </div>

                <div className={'inline-label flex-1'}>
                    <label>Phone&nbsp;Number</label>
                    <input className={'flex-1'}
                           type="text"
                           value={ctxClients.clientsTempWhere().hasOwnProperty("any_number")
                               ? ctxClients.clientsTempWhere().any_number
                               : ''}
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxClients.clientsTempWhereValue('any_number', e.target.value)
                               }
                           }}/>
                </div>

                <div className={'inline-label flex-1'}>
                    <label>Postcode</label>
                    <input className={'flex-1'}
                           type="text"
                           value={ctxClients.clientsTempWhere().hasOwnProperty("postcode")
                               ? ctxClients.clientsTempWhere().postcode
                               : ''}
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxClients.clientsTempWhereValue('postcode', e.target.value)
                               }
                           }}/>
                </div>
            </div>

        </div>

    )
}