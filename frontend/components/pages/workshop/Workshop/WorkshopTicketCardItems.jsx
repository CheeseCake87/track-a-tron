import {For} from "solid-js";


export default function WorkshopTicketCardItems(props) {

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