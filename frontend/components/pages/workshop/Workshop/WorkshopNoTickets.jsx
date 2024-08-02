import {WorkshopIcon} from "../../../globals/Icons";


export default function WorkshopNoTickets() {
    return (
        <div className={'flex justify-center items-center w-full h-full min-h-0'}>
            <div className={'flex flex-col items-center'}>
                <WorkshopIcon size={64}/>
                <small>No tickets found</small>
            </div>
        </div>
    )
}