import {For, useContext} from "solid-js";
import {ContextWorkshopTicketAdd} from "../../../../contextManagers/ContextWorkshopTicketAdd";
import DeviceForLoop from "./DeviceForLoop";

export default function DeviceSection() {
    const ctxWorkshopTicketAdd = useContext(ContextWorkshopTicketAdd)

    return (
        <form
            onsubmit={
                (e) => {
                    e.preventDefault()
                }
            }
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault()
                }
            }}>
            <div className={'sectioned-content w-full'}>
                <div className={'form-section pt-2'}>
                    <div className={'form-section'}>
                        <For each={ctxWorkshopTicketAdd.devices()} fallback={
                            <div className={'card-pill'}>
                                No devices added
                            </div>
                        }>
                            {(device, i) => (
                                <DeviceForLoop index={i} device={device}/>
                            )}
                        </For>
                    </div>
                    <div className={'form-section'} style={{"padding-bottom": 0}}>
                        <div className={'field-group'}>
                            <button className={'btn-confirm'}
                                    tabIndex={6}
                                    onClick={
                                        () => {
                                            ctxWorkshopTicketAdd.addDevice()
                                        }
                                    }>Add Device
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )

}


