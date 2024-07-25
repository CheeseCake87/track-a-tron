import {SpinnerWithMessage} from "../../globals/Spinner";


export default function WorkshopLoading() {
    return (
        <div className={'flex justify-center items-center w-full h-full min-h-0'}>
            <SpinnerWithMessage/>
        </div>
    )
}