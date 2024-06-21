import {API_URL} from "../../globals";
import {weerpc} from "weerpcjs";

export default async function rpc_get_system_user(data) {
    const req = await fetch(API_URL + '/rpc/system/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: weerpc('get_user', data)
    })
    if (req.ok) {
        return await req.json()
    } else {
        throw new Error('System error. Please try again later.')
    }
}