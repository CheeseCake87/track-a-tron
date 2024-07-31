import {Show, useContext} from "solid-js";
import {SpinnerSmall} from "../../../globals/Spinner";
import {ContextWorkshop} from "../../../../contextManagers/ContextWorkshop";
import WorkshopPageControls from "./WorkshopPageControls";
import {DialogFilterTickets} from "../filterWorkshop/DialogFilterTickets";
import {A} from "@solidjs/router";


export default function WorkshopHeader(props) {

    const ctxWorkshop = useContext(ContextWorkshop)

    return (
        <>
            <div className={'clients-header'}>
                <A className={'btn-good'} href={'/workshop/ticket/add'}>
                    <span>+</span> Add Ticket
                </A>

                <div className={'flex items-center gap-1'}>

                    <Show when={ctxWorkshop.smallLoadingTickets()}>
                        <div className={'flex items-center px-4'}>
                            <SpinnerSmall/>
                        </div>
                    </Show>

                    <WorkshopPageControls/>

                </div>
            </div>

            <DialogFilterTickets/>

        </>
    )
}