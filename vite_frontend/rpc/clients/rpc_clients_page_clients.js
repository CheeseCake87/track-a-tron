import {API_URL} from "../../globals";
import {wrpc} from "wrpc-js";

export default async function rpc_clients_page_clients(
    userId, page, limit, where = {}
) {
    const req = await fetch(API_URL + '/rpc/client/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: wrpc('page_clients',
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