import {For, useContext} from "solid-js";
import {ContextWorkshopTicketAdd} from "../../../../contextManagers/ContextWorkshopTicketAdd";
import ItemForLoop from "./ItemForLoop";

export default function ItemSection() {
    const ctxWorkshopTicketAdd = useContext(ContextWorkshopTicketAdd)

    return (
        <form
            onsubmit={(e) => {
                e.preventDefault()
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault()
                }
            }}>
            <div className={'sectioned-content w-full'}>
                <div className={'form-section pt-2'}>
                    <div className={'form-section'}>
                        <For each={ctxWorkshopTicketAdd.items()} fallback={
                            <div className={'card-pill'}>
                                No items added
                            </div>
                        }>
                            {(item, i) => (
                                <ItemForLoop index={i} item={item}/>
                            )}
                        </For>
                    </div>
                    <div className={'form-section'} style={{"padding-bottom": 0}}>
                        <div className={'field-group'}>
                            <button className={'btn-confirm'}
                                    onClick={
                                        () => {
                                            ctxWorkshopTicketAdd.addItem()
                                        }
                                    }>Add Item
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )

}