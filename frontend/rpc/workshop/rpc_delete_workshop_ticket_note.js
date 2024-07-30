import {API_URL} from "../../globals";
import {weerpc} from "weerpcjs";

export default async function rpc_delete_workshop_ticket_note(workshop_ticket_note_id) {
    const req = await fetch(API_URL + '/rpc/workshop/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: weerpc('delete_workshop_ticket_note',
            {
                workshop_ticket_note_id: workshop_ticket_note_id,
            }
        )
    })
    if (req.ok) {
        return await req.json()
    } else {
        throw new Error('System error. Please try again later.')
    }
}