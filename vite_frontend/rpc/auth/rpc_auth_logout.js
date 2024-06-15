import {API_URL} from "../../globals";
import {wrpc} from "wrpc-js";

export default async function rpc_auth_logout() {
    const req = await fetch(API_URL + '/rpc/auth/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: wrpc('logout', null)
    })
    if (req.ok) {
        return await req.json()
    } else {
        throw new Error('System error. Please try again later.')
    }
}