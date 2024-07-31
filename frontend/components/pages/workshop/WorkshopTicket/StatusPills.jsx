import {useContext} from "solid-js";
import {ContextWorkshopTicket} from "../../../../contextManagers/ContextWorkshopTicket";
import {ContextMain} from "../../../../contextManagers/ContextMain";

export default function StatusPills(props) {
    const ctxMain = useContext(ContextMain)
    const ctxWorkshopTicket = useContext(ContextWorkshopTicket)

    return (
        <div className={'flex flex-row flex-wrap gap-2 w-full mb-4'}>

            <div className={'card-group-slim'}>

                <div className={'card-labelled-pill'}>
                    <div className={'card-labelled-pill-label'}>
                        Status
                    </div>
                    <div className={'card-labelled-pill-text'}
                         style={props.status.style}>
                        {props.status.name}
                    </div>
                </div>

                <div className={'card-labelled-pill'}>
                    <div className={'card-labelled-pill-label'}>
                        Tag
                    </div>
                    <div className={'card-labelled-pill-text'}>
                        {ctxWorkshopTicket.workshopTicket().workshop_tag}
                    </div>
                </div>

                <div className={'card-labelled-pill'}>
                    <div className={'card-labelled-pill-label'}>
                        Category
                    </div>
                    <div className={'card-labelled-pill-text'}>
                        {ctxMain.categoryCodeLookup(ctxWorkshopTicket.workshopTicket().category_code)}
                    </div>
                </div>

                <div className={'card-labelled-pill'}>
                    <div className={'card-labelled-pill-label'}>
                        Assigned To
                    </div>
                    <div className={'card-labelled-pill-text'}>
                        {ctxWorkshopTicket.workshopTicket().__assigned_to}
                    </div>
                </div>

                <div className={'card-labelled-pill'}>
                    <div className={'card-labelled-pill-label'}>
                        Created
                    </div>
                    <div className={'card-labelled-pill-text'}>
                        {ctxWorkshopTicket.workshopTicket().__created}
                    </div>
                </div>

            </div>

        </div>
    )
}
