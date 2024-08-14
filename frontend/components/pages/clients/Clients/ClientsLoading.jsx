import {SpinnerWithMessage} from "../../../globals/Spinner";


export default function ClientsLoading() {
    return (
        <div className={'flex justify-center items-center w-full h-full min-h-0'}>
            <SpinnerWithMessage/>
        </div>
    )
}