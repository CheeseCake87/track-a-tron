import {useContext} from "solid-js";
import {ContextWorkshopTicketAdd} from "../../../../contextManagers/ContextWorkshopTicketAdd";

export default function ItemForLoop(props) {
    const ctxWorkshopTicketAdd = useContext(ContextWorkshopTicketAdd)

    const index = props.index
    const item = props.item

    return (
        <div className={'field-group'}>
            <div className={'inline-label'}>
                <label>Description</label>
                <input type={'text'}
                       className={'w-52'}
                       id={`item-description-${index()}`}
                       onKeyUp={
                           (e) => {
                               ctxWorkshopTicketAdd.updateItemArray(
                                   index(), 'description', e.target.value
                               )
                           }
                       } value={item.description}/>
            </div>
            <button className={'btn-danger'}
                    id={`remove-device-${index()}`}
                    onClick={() => {
                        ctxWorkshopTicketAdd.removeItemArray(index())
                    }}>
                Remove
            </button>
        </div>
    )
}