import {NoClientsIcon} from "../../../globals/Icons";


export default function ClientsNoClients() {
    return (
        <div className={'flex justify-center items-center w-full h-full min-h-0'}>
            <div className={'flex flex-col items-center'}>
                <NoClientsIcon size={64}/>
                <small>No clients found</small>
            </div>
        </div>
    )
}