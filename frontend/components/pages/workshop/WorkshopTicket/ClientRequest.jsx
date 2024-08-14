import {useContext} from "solid-js";
import {ContextWorkshopTicket} from "../../../../contextManagers/ContextWorkshopTicket";
import {ContextWorkshop} from "../../../../contextManagers/ContextWorkshop";
import {A} from "@solidjs/router";
import {ExternalLink} from "../../../globals/Icons";

export default function ClientRequest() {
    const ctxWorkshop = useContext(ContextWorkshop)
    const ctxWorkshopTicket = useContext(ContextWorkshopTicket)

    return (
        <div className={'flex flex-col gap-6 w-full py-4'}>
            <div className={'card-group'}>

                <div className={'card-section'}>
                    <small>Client</small>
                    <p>
                        {ctxWorkshopTicket.client() ? ctxWorkshop.displayName(
                            ctxWorkshopTicket.client().business_name,
                            ctxWorkshopTicket.client().first_name,
                            ctxWorkshopTicket.client().last_name
                        ) : ''}
                    </p>
                </div>

                <div className={'card-section'}>
                    <small>Contact</small>
                    <p>
                        {ctxWorkshopTicket.client() ? ctxWorkshop.displayContact(
                            ctxWorkshopTicket.client().phone,
                            ctxWorkshopTicket.client().email_address,
                            ctxWorkshopTicket.client().alt_phone,
                            ctxWorkshopTicket.client().alt_email_address
                        ) : ''}
                    </p>
                </div>

                <div className={'card-section'}>
                    <small>Address</small>
                    <p>
                        {ctxWorkshopTicket.client()
                            ? ctxWorkshopTicket.client().__address
                            : ''}
                    </p>
                </div>

            </div>
            <div className={'card-group'}>
                <div className={'card-section'}>
                    <small>Request</small>
                    {ctxWorkshopTicket.workshopTicket().request}
                </div>
            </div>
        </div>
    )
}