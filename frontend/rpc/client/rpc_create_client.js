import {API_URL} from "../../globals";
import {weerpc} from "weerpcjs";

export default async function rpc_create_client(user_id, values) {
    const req = await fetch(API_URL + '/rpc/client/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: weerpc('create_client', {
            user_id: user_id,
            values: values
        })
    })
    if (req.ok) {
        return await req.json()
    } else {
        throw new Error('System error. Please try again later.')
    }
}