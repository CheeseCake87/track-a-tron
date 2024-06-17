import {API_URL} from "../../globals";
import {wrpc} from "wrpc-js";

export default async function rpc_get_enabled_services() {
    const req = await fetch(API_URL + '/rpc/system/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: wrpc('get_enabled_services', null)
    })
    if (req.ok) {
        return await req.json()
    } else {
        throw new Error('System error. Please try again later.')
    }
}