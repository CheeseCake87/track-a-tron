import {API_URL} from "../../globals";
import {wrpc} from "wrpc-js";

export default async function rpc_client_create_client(values) {
    const req = await fetch(API_URL + '/rpc/client/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: wrpc('create_client', {
            values: values
        })
    })
    if (req.ok) {
        return await req.json()
    } else {
        throw new Error('System error. Please try again later.')
    }
}