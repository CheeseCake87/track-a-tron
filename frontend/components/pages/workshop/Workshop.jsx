import {Show, useContext} from "solid-js";
import {ContextWorkshop} from "../../../contextManagers/ContextWorkshop";
import WorkshopInnerTable from "./WorkshopInnerTable";
import WorkshopHeader from "./WorkshopHeader";
import WorkshopNoTickets from "./WorkshopNoTickets";
import WorkshopLoading from "./WorkshopLoading";
import WorkshopFilterPills from "./WorkshopFilterPills";
import WorkshopTicketCards from "./WorkshopTicketCards";

export default function Workshop() {

    const ctxWorkshop = useContext(ContextWorkshop)

    return (
        <div className={'main-content-stretch'}>
            <WorkshopHeader/>

            <WorkshopFilterPills/>

            <Show when={ctxWorkshop.workshopLayout() === 'cards'}>

                <div className={'workshop-tickets-bg-wrapper'}>

                    <div className={'workshop-tickets'}>

                        {
                            ctxWorkshop.loadingTickets()
                                ? <WorkshopLoading/>
                                : ctxWorkshop.tickets.length > 0
                                    ? <WorkshopTicketCards/>
                                    : <WorkshopNoTickets/>
                        }

                    </div>

                </div>

            </Show>

            <Show when={ctxWorkshop.workshopLayout() === 'table'}>

                <div className={'-flex-table-bg-wrapper'}>

                    <div className={'-table'}>

                        {
                            ctxWorkshop.loadingTickets()
                                ? <WorkshopLoading/>
                                : ctxWorkshop.tickets.length > 0
                                    ? <WorkshopInnerTable/>
                                    : <WorkshopNoTickets/>
                        }

                    </div>

                </div>

            </Show>

        </div>
    )
}