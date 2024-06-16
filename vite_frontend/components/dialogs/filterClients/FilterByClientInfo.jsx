import {useContext} from "solid-js";
import {ContextClients} from "../../../contextManagers/ContextClients";
import {ContextMain} from "../../../contextManagers/ContextMain";


export function FilterByClientInfo(props) {

    const ctxMain = useContext(ContextMain)
    const ctxClients = useContext(ContextClients)

    return (

        <div className={'dialog-content-group'}>

            <div className={'clients-filter-group'}>
                <div className={'inline-label flex-1'}>
                    <label>Client&nbsp;ID</label>
                    <input type="number"
                           value={ctxMain.clientsTempWhere().hasOwnProperty("client_id")
                               ? ctxMain.clientsTempWhere().client_id
                               : ''}
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxMain.clientsTempWhereValue('client_id', e.target.value)
                               }
                           }}/>
                </div>

                <div className={'inline-label flex-1'}>
                    <label>Name</label>
                    <input className={'flex-1'}
                           type="text"
                           value={ctxMain.clientsTempWhere().hasOwnProperty("any_name")
                               ? ctxMain.clientsTempWhere().any_name
                               : ''}
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxMain.clientsTempWhereValue('any_name', e.target.value)
                               }
                           }}/>
                </div>

                <div className={'inline-label flex-1'}>
                    <label>Email&nbsp;Address</label>
                    <input className={'flex-1'}
                           type="text"
                           value={ctxMain.clientsTempWhere().hasOwnProperty("email_address")
                               ? ctxMain.clientsTempWhere().email_address
                               : ''}
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxMain.clientsTempWhereValue('email_address', e.target.value)
                               }
                           }}/>
                </div>

                <div className={'inline-label flex-1'}>
                    <label>Phone&nbsp;Number</label>
                    <input className={'flex-1'}
                           type="text"
                           value={ctxMain.clientsTempWhere().hasOwnProperty("any_number")
                               ? ctxMain.clientsTempWhere().any_number
                               : ''}
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxMain.clientsTempWhereValue('any_number', e.target.value)
                               }
                           }}/>
                </div>

                <div className={'inline-label flex-1'}>
                    <label>Postcode</label>
                    <input className={'flex-1'}
                           type="text"
                           value={ctxMain.clientsTempWhere().hasOwnProperty("postcode")
                               ? ctxMain.clientsTempWhere().postcode
                               : ''}
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxMain.clientsTempWhereValue('postcode', e.target.value)
                               }
                           }}/>
                </div>
            </div>

        </div>

    )
}