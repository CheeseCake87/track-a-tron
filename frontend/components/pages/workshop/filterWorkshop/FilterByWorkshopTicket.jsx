import {For, useContext} from "solid-js";
import {ContextWorkshop} from "../../../../contextManagers/ContextWorkshop";
import {CATEGORY_CODES_ARRAY, STATUS_CODES_ARRAY} from "../../../../globals";


export function FilterByWorkshopTicket(props) {

    const ctxWorkshop = useContext(ContextWorkshop)

    return (

        <div className={'dialog-content-group'}>

            <div className={'section-filter-group'}>
                <div className={'inline-label flex-1'}>
                    <label>Workshop Tag</label>
                    <input type="text"
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
                    <label>Status&nbsp;{ctxWorkshop.ticketsTempWhere().status_code}</label>
                    <select className={'w-full'} onChange={
                        (e) => {
                            ctxWorkshop.ticketsTempWhereValue(
                                'status_code',
                                e.target.options[e.target.selectedIndex].value
                            )
                        }
                    }>
                        <option value="0">
                            All
                        </option>
                        <For each={STATUS_CODES_ARRAY}>
                            {(status, index) =>
                                <option
                                    value={status.code}
                                    selected={parseInt(ctxWorkshop.ticketsTempWhere().status_code) === status.code}>
                                    {status.label}
                                </option>
                            }
                        </For>
                    </select>
                </div>

                <div className={'inline-label flex-1'}>
                    <label>Category</label>
                    <select className={'w-full'} onChange={
                        (e) => {
                            ctxWorkshop.ticketsTempWhereValue(
                                'category_code',
                                e.target.options[e.target.selectedIndex].value
                            )
                        }
                    }>
                        <option value="0">
                            All
                        </option>
                        <For each={CATEGORY_CODES_ARRAY}>
                            {(category, index) =>
                                <option
                                    selected={parseInt(ctxWorkshop.ticketsTempWhere().category_code) === category.code}
                                    value={category.code}>
                                    {category.label}
                                </option>
                            }
                        </For>
                    </select>


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
                        <option value="0">
                            All
                        </option>
                        <For each={ctxWorkshop.users()}>
                            {(user, index) =>
                                <option
                                    selected={parseInt(ctxWorkshop.ticketsTempWhere().fk_assigned_user_id) === user.user_id}
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