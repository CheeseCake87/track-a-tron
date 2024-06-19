import {API_URL} from "../../globals";
import {weerpc} from "weerpcjs";

export async function rpc_get_address_find(postcode) {
    const req = await fetch(API_URL + '/rpc/services/get_address/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: weerpc('find', {
            postcode: postcode
        })
    })
    if (req.ok) {
        return await req.json()
    } else {
        throw new Error('System error. Please try again later.')
    }
}


export async function rpc_get_address_cache_find(postcode, refresh = false) {
    const req = await fetch(API_URL + '/rpc/services/get_address/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: weerpc('cache_find', {
            postcode: postcode,
            refresh: refresh
        })
    })
    if (req.ok) {
        return await req.json()
    } else {
        throw new Error('System error. Please try again later.')
    }
}