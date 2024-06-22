import {API_URL} from "../../globals";
import {weerpc} from "weerpcjs";

export default async function rpc_change_system_user_password(user_id, current_password, new_password) {
    const req = await fetch(API_URL + '/rpc/system/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: weerpc('change_user_password', {
            user_id: user_id,
            current_password: current_password,
            new_password: new_password
        })
    })
    if (req.ok) {
        return await req.json()
    } else {
        throw new Error('System error. Please try again later.')
    }
}