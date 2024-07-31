import {For, useContext} from "solid-js";
import {ContextWorkshopTicketAdd} from "../../../../contextManagers/ContextWorkshopTicketAdd";
import {DEVICE_TYPES} from "../../../../globals";

export default function DeviceForLoop(props) {
    const ctxWorkshopTicketAdd = useContext(ContextWorkshopTicketAdd)

    const index = props.index
    const device = props.device

    return (
        <div className={'field-group'}>
            <div className={'inline-label'}>
                <label>Type</label>
                <select
                    id={`device-type-${index()}`}
                    onChange={(e) => {
                        const thisValue = document.getElementById(`device-type-${index()}`)
                        ctxWorkshopTicketAdd.updateDeviceArray(
                            index(), 'type', thisValue.options[e.target.selectedIndex].text
                        )
                    }}
                >
                    <option value={'Select...'}
                            selected={device.type === 'Select...'}>
                        Select...
                    </option>
                    <For each={DEVICE_TYPES}>
                        {(deviceType, i) => (
                            <option value={deviceType}
                                    selected={
                                        deviceType === device.type
                                    }>
                                {deviceType}
                            </option>
                        )}
                    </For>
                </select>
            </div>
            <div className={'inline-label'}>
                <label>Make</label>
                <input type={'text'}
                       id={`device-make-${index()}`}
                       className={'w-36'}
                       onKeyUp={
                           (e) => {
                               ctxWorkshopTicketAdd.updateDeviceArray(
                                   index(), 'make', e.target.value
                               )
                           }
                       } value={device.make}/>
            </div>
            <div className={'inline-label'}>
                <label>Model</label>
                <input type={'text'}
                       id={`device-model-${index()}`}
                       className={'w-38'}
                       onKeyUp={
                           (e) => {
                               ctxWorkshopTicketAdd.updateDeviceArray(
                                   index(), 'model', e.target.value
                               )
                           }
                       } value={device.model}/>
            </div>
            <div className={'inline-label'}>
                <label>Password</label>
                <input type={'text'}
                       id={`device-password-${index()}`}
                       onKeyUp={
                           (e) => {
                               ctxWorkshopTicketAdd.updateDeviceArray(
                                   index(), 'password', e.target.value
                               )
                           }
                       } value={device.password}/>
            </div>
            <button className={'btn-danger'}
                    id={`remove-device-${index()}`}
                    onClick={() => {
                        ctxWorkshopTicketAdd.removeDeviceArray(index())
                    }}>
                Remove
            </button>
        </div>
    )
}