import {useContext} from "solid-js";
import {ContextWorkshop} from "../../../../contextManagers/ContextWorkshop";
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

            <div className={'cards-bg-wrapper'}>

                <div className={'cards'}>

                    {
                        ctxWorkshop.loadingTickets()
                            ? <WorkshopLoading/>
                            : ctxWorkshop.tickets.length > 0
                                ? <WorkshopTicketCards/>
                                : <WorkshopNoTickets/>
                    }

                </div>

            </div>

        </div>
    )
}