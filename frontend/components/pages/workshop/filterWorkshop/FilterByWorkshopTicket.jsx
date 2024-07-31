import {For, useContext} from "solid-js";
import {ContextWorkshop} from "../../../../contextManagers/ContextWorkshop";


export function FilterByWorkshopTicket(props) {

    const ctxWorkshop = useContext(ContextWorkshop)

    return (

        <div className={'dialog-content-group'}>

            <div className={'clients-filter-group'}>
                <div className={'inline-label flex-1'}>
                    <label>Workshop Tag</label>
                    <input type="number"
                           value={ctxWorkshop.ticketsTempWhere().hasOwnProperty("workshop_tag")
                               ? ctxWorkshop.ticketsTempWhere().workshop_tag
                               : ''}
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxWorkshop.ticketsTempWhereValue('workshop_tag', e.target.value)
                               }
                           }}/>
                </div>

                <div className={'inline-label flex-1'}>
                    <label>Status</label>
                    <input className={'flex-1'}
                           type="text"
                           value={ctxWorkshop.ticketsTempWhere().hasOwnProperty("status_code")
                               ? ctxWorkshop.ticketsTempWhere().status_code
                               : ''}
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxWorkshop.ticketsTempWhereValue('status_code', e.target.value)
                               }
                           }}/>
                </div>

                <div className={'inline-label flex-1'}>
                    <label>Category</label>
                    <input className={'flex-1'}
                           type="text"
                           value={ctxWorkshop.ticketsTempWhere().hasOwnProperty("category_code")
                               ? ctxWorkshop.ticketsTempWhere().category_code
                               : ''}
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxWorkshop.ticketsTempWhereValue('category_code', e.target.value)
                               }
                           }}/>
                </div>

                <div className={'inline-label flex-1'}>
                    <label>Assigned&nbsp;To:</label>
                    <select className={'w-full'} onChange={
                        (e) => {
                            ctxWorkshop.ticketsTempWhereValue(
                                'fk_assigned_user_id',
                                e.target.options[e.target.selectedIndex].value
                            )
                        }
                    }>
                        <option value="0" selected={ctxWorkshop.ticketsTempWhere().fk_assigned_user_id === 0}>All</option>
                        <For each={ctxWorkshop.users()}>
                            {(user, index) =>
                                <option
                                    selected={user.user_id === ctxWorkshop.ticketsTempWhere().fk_assigned_user_id}
                                    value={user.user_id}>
                                    {user.display_name}
                                </option>
                            }
                        </For>
                    </select>
                </div>

            </div>

        </div>

    )
}