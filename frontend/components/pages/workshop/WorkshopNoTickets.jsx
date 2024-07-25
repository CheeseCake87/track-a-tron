import {NoClientsIcon} from "../../globals/Icons";
import {ContextWorkshop} from "../../../contextManagers/ContextWorkshop";
import {useContext} from "solid-js";


export default function WorkshopNoTickets() {
    const ctxWorkshop = useContext(ContextWorkshop)
    return (
        <div className={'flex justify-center items-center w-full h-full min-h-0'}>
            <div className={'flex flex-col items-center'}>
                <NoClientsIcon size={64}/>
                <small>No tickets found</small>
            </div>
        </div>
    )
}