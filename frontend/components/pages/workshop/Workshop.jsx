import {useContext} from "solid-js";
import {ContextWorkshop} from "../../../contextManagers/ContextWorkshop";
import WorkshopInnerTable from "./WorkshopInnerTable";
import WorkshopHeader from "./WorkshopHeader";
import WorkshopInnerTableNoTickets from "./WorkshopInnerTableNoTickets";
import WorkshopInnerTableLoading from "./WorkshopInnerTableLoading";
import WorkshopFilterPills from "./WorkshopFilterPills";

export default function Workshop() {

    const ctxWorkshop = useContext(ContextWorkshop)

    return (
        <div className={'main-content-stretch'}>
            <WorkshopHeader/>

            <WorkshopFilterPills/>

            <div className={'-flex-table-bg-wrapper'}>

                <div className={'-table'}>

                    {
                        ctxWorkshop.loadingTickets()
                            ? <WorkshopInnerTableLoading/>
                            : ctxWorkshop.tickets.length > 0
                                ? <WorkshopInnerTable/>
                                : <WorkshopInnerTableNoTickets/>
                    }

                </div>

            </div>

        </div>
    )
}