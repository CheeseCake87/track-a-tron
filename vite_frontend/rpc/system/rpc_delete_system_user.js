import {API_URL} from "../../globals";
import {weerpc} from "weerpcjs";

export default async function rpc_delete_system_user(system_user_id, username, display_name) {
    const req = await fetch(API_URL + '/rpc/system/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: weerpc('delete_user', {
            system_user_id: system_user_id,
            username: username,
            display_name: display_name,
        })
    })
    if (req.ok) {
        return await req.json()
    } else {
        throw new Error('System error. Please try again later.')
    }
}