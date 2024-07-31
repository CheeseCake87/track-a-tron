import {API_URL} from "../../globals";
import {weerpc} from "weerpcjs";

export default async function rpc_get_workshop_tickets(where = {}) {
    console.log('rpc_get_workshop_tickets', where)
    const req = await fetch(API_URL + '/rpc/workshop/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: weerpc('get_workshop_tickets',
            {
                where: where
            }
        )
    })
    if (req.ok) {
        return await req.json()
    } else {
        throw new Error('System error. Please try again later.')
    }
}