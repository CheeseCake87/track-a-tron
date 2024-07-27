import {API_URL} from "../../globals";
import {weerpc} from "weerpcjs";

export default async function rpc_create_workshop_ticket(
    user_id,
    client_id,
    category_code,
    status_code,
    request,
    devices,
    items,
) {
    const req = await fetch(API_URL + '/rpc/workshop/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: weerpc('create_workshop_ticket', {
            user_id: user_id,
            client_id: client_id,
            category_code: category_code,
            status_code: status_code,
            request: request,
            devices: devices,
            items: items,
        })
    })
    if (req.ok) {
        return await req.json()
    } else {
        throw new Error('System error. Please try again later.')
    }
}