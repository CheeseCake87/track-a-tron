import {For, Show, useContext} from "solid-js";
import {ContextWorkshopTicket} from "../../../../contextManagers/ContextWorkshopTicket";


export default function DevicesItems() {
    const ctxWorkshopTicket = useContext(ContextWorkshopTicket)

    return (
        <Show when={ctxWorkshopTicket.devices().length > 0 || ctxWorkshopTicket.items().length > 0}>
            <div className={'py-3'}>
                <div className={'card-group'}>
                    {ctxWorkshopTicket.devices().length > 0 ?
                        <LoopDevices devices={ctxWorkshopTicket.devices()}/> : ''}
                    {ctxWorkshopTicket.items().length > 0 ?
                        <LoopItems items={ctxWorkshopTicket.items()}/> : ''}
                </div>
            </div>
        </Show>
    )
}

function LoopDevices(props) {

    const devices = props.devices

    return (
        <div className={'card-section'}>
            <small>Device(s)</small>
            <div className={'card-pill-group'}>
                <For each={devices}>
                    {(device, i) =>
                        <div className={'card-labelled-pill'}>
                            <Show
                                when={device.make !== '' || device.model !== ''}
                                fallback={
                                    <div
                                        className={'card-labelled-pill-device border-r rounded-md'}>
                                        {device.type}
                                    </div>
                                }
                            >
                                <div
                                    className={'card-labelled-pill-device'}>
                                    {device.type}
                                </div>
                                <div
                                    className={'card-labelled-pill-text'}>
                                    <Show when={device.make !== ''}>
                                        {device.make}
                                    </Show>
                                    <Show when={device.model !== ''}>
                                        {device.make !== '' ? ' ' : ''}
                                        {device.model}
                                    </Show>
                                    <Show when={device.password !== '' && device.password}>
                                        {' (Password: ' + device.password + ')'}
                                    </Show>
                                </div>
                            </Show>
                        </div>
                    }
                </For>
            </div>
        </div>
    )
}


function LoopItems(props) {

    const items = props.items

    return (
        <div className={'card-section'}>
            <small>Item(s)</small>
            <div className={'card-pill-group'}>
                <For each={items}>
                    {(device, i) =>
                        <div className={'card-labelled-pill'}>
                            <div
                                className={'card-labelled-pill-text rounded-md border-r'}>
                                {device.description}
                            </div>
                        </div>
                    }
                </For>
            </div>
        </div>
    )
}