import {API_URL} from "../../globals";
import {weerpc} from "weerpcjs";
import WRPCFetcher from "../../utilities/WRPCFetcher";

export default async function rpc_update_workshop_ticket(workshop_ticket_id, values) {
    const req = await fetch(API_URL + '/rpc/workshop/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: weerpc('update_workshop_ticket',
            {
                workshop_ticket_id: workshop_ticket_id,
                values: values
            }
        )
    })
    if (req.ok) {
        return await req.json()
    } else {
        throw new Error('System error. Please try again later.')
    }
}