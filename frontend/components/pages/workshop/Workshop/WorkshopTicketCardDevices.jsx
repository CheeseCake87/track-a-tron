import {For, Show} from "solid-js";


export default function WorkshopTicketCardDevices(props) {

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
                                </div>
                            </Show>
                        </div>
                    }
                </For>
            </div>
        </div>
    )
}