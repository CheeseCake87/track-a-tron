import {API_URL} from "../../globals";
import {weerpc} from "weerpcjs";

export default async function rpc_auth_login(username, password) {
    const req = await fetch(API_URL + '/rpc/auth/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: weerpc('login',
            {
                username: username,
                password: password
            }
        )
    })
    if (req.ok) {
        return await req.json()
    } else {
        throw new Error('System error. Please try again later.')
    }
}