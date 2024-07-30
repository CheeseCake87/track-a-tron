import {For, useContext} from "solid-js";
import {ContextWorkshopTicket} from "../../../../contextManagers/ContextWorkshopTicket";
import {ContextMain} from "../../../../contextManagers/ContextMain";
import {STATUS_CODES_ARRAY} from "../../../../globals";

export default function StatusAssigned(props) {
    const ctxMain = useContext(ContextMain)
    const ctxWorkshopTicket = useContext(ContextWorkshopTicket)

    return (
        <div className={'py-3'}>

            <label>Update Ticket</label>

            <div className={'form-section-row'} style={{"padding-bottom": 0}}>
                <div className={'field-group'}>
                    <div className={'py-2 w-full'}>
                        <div className={'inline-label'}>
                        <label>Status:</label>
                        <select onChange={
                            (e) => {
                                // setAddressFromIndex(e.target.value, getAddressPostcode())
                            }
                        }>
                            <For each={STATUS_CODES_ARRAY}>
                                {(status, index) =>
                                    <option
                                        selected={status.code === ctxWorkshopTicket.status().status_code}
                                        value={status.code}>{status.label}
                                    </option>
                                }
                            </For>
                        </select>
                        </div>
                    </div>
                </div>

                <div className={'field-group'}>
                    <div className={'py-2 w-full'}>
                        <div className={'inline-label'}>
                        <label>Assigned To:</label>
                        <select onChange={
                            (e) => {
                                // setAddressFromIndex(e.target.value, getAddressPostcode())
                            }
                        }>
                            <For each={ctxWorkshopTicket.users()}>
                                {(user, index) =>
                                    <option
                                        selected={user.user_id === ctxWorkshopTicket.workshopTicket().__assigned_to_id}
                                        value={user.user_id}>
                                        {user.display_name}
                                    </option>
                                }
                            </For>
                        </select>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
