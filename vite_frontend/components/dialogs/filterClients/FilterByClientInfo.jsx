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
                           value={ctxClients.tempWhere().hasOwnProperty("client_id")
                               ? ctxClients.tempWhere().client_id
                               : ''}
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxClients.tempWhereValue('client_id', e.target.value)
                               }
                           }}/>
                </div>

                <div className={'inline-label flex-1'}>
                    <label>Name</label>
                    <input className={'flex-1'}
                           type="text"
                           value={ctxClients.tempWhere().hasOwnProperty("any_name")
                               ? ctxClients.tempWhere().any_name
                               : ''}
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxClients.tempWhereValue('any_name', e.target.value)
                               }
                           }}/>
                </div>

                <div className={'inline-label flex-1'}>
                    <label>Email&nbsp;Address</label>
                    <input className={'flex-1'}
                           type="text"
                           value={ctxClients.tempWhere().hasOwnProperty("email_address")
                               ? ctxClients.tempWhere().email_address
                               : ''}
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxClients.tempWhereValue('email_address', e.target.value)
                               }
                           }}/>
                </div>

                <div className={'inline-label flex-1'}>
                    <label>Phone&nbsp;Number</label>
                    <input className={'flex-1'}
                           type="text"
                           value={ctxClients.tempWhere().hasOwnProperty("any_number")
                               ? ctxClients.tempWhere().any_number
                               : ''}
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxClients.tempWhereValue('any_number', e.target.value)
                               }
                           }}/>
                </div>

                <div className={'inline-label flex-1'}>
                    <label>Postcode</label>
                    <input className={'flex-1'}
                           type="text"
                           value={ctxClients.tempWhere().hasOwnProperty("pz_code")
                               ? ctxClients.tempWhere().pz_code
                               : ''}
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxClients.tempWhereValue('pz_code', e.target.value)
                               }
                           }}/>
                </div>
            </div>

        </div>

    )
}