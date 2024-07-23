import {API_URL} from "../../globals";
import {weerpc} from "weerpcjs";

export default async function rpc_page_workshop_tickets(
    userId, page, limit, where = {}
) {
    const req = await fetch(API_URL + '/rpc/workshop/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: weerpc('page_workshop_tickets',
            {
                user_id: userId,
                page: page,
                limit: limit,
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