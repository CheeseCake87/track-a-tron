import {useContext} from "solid-js";
import {ContextWorkshopTicket} from "../../../../contextManagers/ContextWorkshopTicket";
import {ContextMain} from "../../../../contextManagers/ContextMain";

export default function StatusPills(props) {
    const ctxMain = useContext(ContextMain)
    const ctxWorkshopTicket = useContext(ContextWorkshopTicket)

    return (
        <div className={'flex flex-row flex-wrap gap-2 w-full mb-4'}>

            <div className={'workshop-ticket-group-slim'}>

                <div className={'workshop-ticket-labelled-pill'}>
                    <div className={'workshop-ticket-labelled-pill-label'}>
                        Status
                    </div>
                    <div className={'workshop-ticket-labelled-pill-text'}
                         style={props.status.style}>
                        {props.status.name}
                    </div>
                </div>

                <div className={'workshop-ticket-labelled-pill'}>
                    <div className={'workshop-ticket-labelled-pill-label'}>
                        Tag
                    </div>
                    <div className={'workshop-ticket-labelled-pill-text'}>
                        {ctxWorkshopTicket.workshopTicket().workshop_tag}
                    </div>
                </div>

                <div className={'workshop-ticket-labelled-pill'}>
                    <div className={'workshop-ticket-labelled-pill-label'}>
                        Category
                    </div>
                    <div className={'workshop-ticket-labelled-pill-text'}>
                        {ctxMain.categoryCodeLookup(ctxWorkshopTicket.workshopTicket().category_code)}
                    </div>
                </div>

                <div className={'workshop-ticket-labelled-pill'}>
                    <div className={'workshop-ticket-labelled-pill-label'}>
                        Assigned To
                    </div>
                    <div className={'workshop-ticket-labelled-pill-text'}>
                        {ctxWorkshopTicket.workshopTicket().__assigned_to}
                    </div>
                </div>

                <div className={'workshop-ticket-labelled-pill'}>
                    <div className={'workshop-ticket-labelled-pill-label'}>
                        Created
                    </div>
                    <div className={'workshop-ticket-labelled-pill-text'}>
                        {ctxWorkshopTicket.workshopTicket().__created}
                    </div>
                </div>

            </div>

        </div>
    )
}
