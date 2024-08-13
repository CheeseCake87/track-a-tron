import {createSignal, For, useContext} from "solid-js";
import {ContextWorkshopTicket} from "../../../../contextManagers/ContextWorkshopTicket";
import {ContextMain} from "../../../../contextManagers/ContextMain";
import {STATUS_CODES_ARRAY} from "../../../../globals";
import {ContextWorkshop} from "../../../../contextManagers/ContextWorkshop";

export default function StatusAssigned(props) {
    const ctxMain = useContext(ContextMain)
    const ctxWorkshop = useContext(ContextWorkshop)
    const ctxWorkshopTicket = useContext(ContextWorkshopTicket)

    const [status, setStatus] = createSignal(ctxWorkshopTicket.status().status_code)
    const [user, setUser] = createSignal(ctxWorkshopTicket.workshopTicket().__assigned_to_id)

    return (
        <div className={'py-3'}>

            <label>Update Ticket</label>

            <div className={'form-section-row flex-wrap'} style={{"padding-bottom": 0}}>
                <div className={'field-group'}>
                    <div className={'py-2 w-full'}>
                        <div className={'inline-label'}>
                            <label>Status:</label>
                            <select onChange={
                                (e) => {
                                    setStatus(e.target.value)
                                }
                            }>
                                <For each={STATUS_CODES_ARRAY}>
                                    {(status, index) =>
                                        <option
                                            selected={status.code === ctxWorkshopTicket.workshopTicket().status_code}
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
                                    setUser(e.target.value)
                                }
                            }>
                                <For each={ctxWorkshop.users()}>
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

                <div className={'field-group'}>
                    <div className={'py-2 w-full'}>
                        <button className={'btn btn-confirm'} onClick={
                            () => {
                                if (status() === 0) {
                                    ctxMain.showErrorToast('Please select a status.')
                                    return
                                }
                                if (user() === 0) {
                                    ctxMain.showErrorToast('Please select a user.')
                                    return
                                }
                                ctxWorkshopTicket.updateWorkshopTicket({
                                    status_code: status(),
                                    fk_user_id: user()
                                })
                            }
                        }>Update
                        </button>
                    </div>
                </div>

            </div>

        </div>
    )
}
