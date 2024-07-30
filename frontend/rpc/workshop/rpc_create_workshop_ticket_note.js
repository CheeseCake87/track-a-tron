import {API_URL} from "../../globals";
import {weerpc} from "weerpcjs";
import WRPCFetcher from "../../utilities/WRPCFetcher";

export default async function rpc_create_workshop_ticket_note(workshop_ticket_id, user_id, note) {
    const req = await fetch(API_URL + '/rpc/workshop/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: weerpc('create_workshop_ticket_note',
            {
                workshop_ticket_id: workshop_ticket_id,
                user_id: user_id,
                note: note
            }
        )
    })
    if (req.ok) {
        return await req.json()
    } else {
        throw new Error('System error. Please try again later.')
    }
}