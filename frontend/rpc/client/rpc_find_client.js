import {API_URL} from "../../globals";
import {weerpc} from "weerpcjs";

export default async function rpc_find_client(where) {
    const req = await fetch(API_URL + '/rpc/client/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: weerpc('find_client',
            {
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