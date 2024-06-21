import {API_URL} from "../../globals";
import {weerpc} from "weerpcjs";

export default async function rpc_update_system_user_password(system_user_id, password) {
    const req = await fetch(API_URL + '/rpc/system/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: weerpc('update_user_password', {
            system_user_id: system_user_id,
            password: password
        })
    })
    if (req.ok) {
        return await req.json()
    } else {
        throw new Error('System error. Please try again later.')
    }
}