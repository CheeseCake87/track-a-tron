import {ContextWorkshopTicket} from "../../../../contextManagers/ContextWorkshopTicket";
import {createEffect, createSignal, Show, useContext} from "solid-js";
import {SpinnerSmall} from "../../../globals/Spinner";
import {ContextWorkshop} from "../../../../contextManagers/ContextWorkshop";
import {ContextMain} from "../../../../contextManagers/ContextMain";
import DevicesItems from "./DevicesItems";
import ClientRequest from "./ClientRequest";
import StatusPills from "./StatusPills";
import StatusAssigned from "./StatusAssigned";
import Notes from "./Notes";


export default function WorkshopTicket() {

    const ctxMain = useContext(ContextMain)
    const ctxWorkshop = useContext(ContextWorkshop)
    const ctxWorkshopTicket = useContext(ContextWorkshopTicket)

    const [status, setStatus] = createSignal({
        'Name': '',
        'Style': {}
    })

    createEffect(() => {
        if (ctxWorkshopTicket.workshopTicket().status_code) {
            setStatus(ctxMain.statusCodeLookup(ctxWorkshopTicket.workshopTicket().status_code))
        }
    })

    return (
        <div className={'main-content-slim gap-2'}>

            <div className={'field-group items-center sticky top-0'}>
                <button className={'btn'} onClick={() => {
                    ctxWorkshop.deBounceGetPageTickets(
                        200, ctxWorkshop.page(), ctxWorkshop.limit(), ctxWorkshop.ticketsWhere()
                    )
                    ctxMain.navigator('/workshop')
                }}>
                    ← Back
                </button>
                <Show when={ctxWorkshopTicket.savingWorkshopTicket()}>
                    <div className={'flex flex-row gap-2 items-center px-4'}>
                        <SpinnerSmall/> Saving...
                    </div>
                </Show>
            </div>

            <div className={'sectioned-content'}>
                <StatusPills status={status()}/>
                <ClientRequest/>
                <DevicesItems/>
                <StatusAssigned/>
                <Notes/>
            </div>

        </div>
    )
}


//
//
// function DeviceForLoop(props) {
//     const ctxWorkshopTicket = useContext(ContextWorkshopTicket)
//
//     const device = props.device
//     const id_ = device.workshop_ticket_device_id
//
//     return (
//         <div className={'field-group'}>
//             <div className={'inline-label'}>
//                 <label>Type</label>
//                 <select
//                     id={`device-type-${id_}`}
//                     // onChange={(e) => {
//                     //     const thisValue = document.getElementById(`device-type-${index()}`)
//                     //     ctxWorkshopTicketAdd.updateDeviceArray(
//                     //         index(), 'type', thisValue.options[e.target.selectedIndex].text
//                     //     )
//                     // }}
//                 >
//                     <option value={'Select...'}
//                             selected={device.type === 'Select...'}>
//                         Select...
//                     </option>
//                     <For each={DEVICE_TYPES}>
//                         {(deviceType, i) => (
//                             <option value={deviceType}
//                                     selected={
//                                         deviceType === device.type
//                                     }>
//                                 {deviceType}
//                             </option>
//                         )}
//                     </For>
//                 </select>
//             </div>
//             <div className={'inline-label'}>
//                 <label>Make</label>
//                 <input type={'text'}
//                        id={`device-make-${id_}`}
//                        className={'w-36'}
//                        value={device.make}/>
//             </div>
//             <div className={'inline-label'}>
//                 <label>Model</label>
//                 <input type={'text'}
//                        id={`device-model-${id_}`}
//                        className={'w-38'}
//                        value={device.model}/>
//             </div>
//             <div className={'inline-label'}>
//                 <label>Password</label>
//                 <input type={'text'}
//                        id={`device-password-${id_}`}
//                        value={device.password}/>
//             </div>
//             <button className={'btn-danger'}
//                     id={`remove-device-${id_}`}
//                     onClick={() => {
//                         ctxWorkshopTicket.removeDevice(id_)
//                     }}>
//                 Remove
//             </button>
//         </div>
//     )
// }
//
// function DeviceSection() {
//     const ctxWorkshopTicket = useContext(ContextWorkshopTicket)
//
//     return (
//         <Show when={ctxWorkshopTicket.devices().length > 0}>
//             <form
//                 onsubmit={
//                     (e) => {
//                         e.preventDefault()
//                     }
//                 }
//                 onKeyDown={(e) => {
//                     if (e.key === 'Enter') {
//                         e.preventDefault()
//                     }
//                 }}>
//                 <div className={'sectioned-content w-full'}>
//                     <div className={'form-section pt-2'}>
//                         <div className={'form-section'}>
//                             <For each={ctxWorkshopTicket.devices()}>
//                                 {(device, i) => (
//                                     <DeviceForLoop device={device}/>
//                                 )}
//                             </For>
//                         </div>
//                         <div className={'form-section'} style={{"padding-bottom": 0}}>
//                             <div className={'field-group'}>
//                                 <button className={'btn-confirm'}
//                                         tabIndex={6}
//                                         onClick={
//                                             () => {
//                                                 ctxWorkshopTicket.addDevice()
//                                             }
//                                         }>Add Device
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </form>
//         </Show>
//     )
//
// }
