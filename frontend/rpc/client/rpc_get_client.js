import {API_URL} from "../../globals";
import {weerpc} from "weerpcjs";
import WRPCFetcher from "../../utilities/WRPCFetcher";

export default function rpc_get_client(clientId) {

    async function __fetch__() {
        const req = await fetch(API_URL + '/rpc/client/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: weerpc('get_client',
                {
                    client_id: clientId
                }
            )
        })
        if (req.ok) {
            return await req.json()
        } else {
            throw new Error('System error. Please try again later.')
        }
    }

    return new WRPCFetcher(__fetch__)
}