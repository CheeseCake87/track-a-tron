import {API_URL} from "../../globals";
import {weerpc} from "weerpcjs";
import WRPCFetcher from "../../utilities/WRPCFetcher";

export default async function rpc_get_workshop_ticket(workshop_tag) {
    const req = await fetch(API_URL + '/rpc/workshop/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: weerpc('get_workshop_ticket',
            {
                where: {
                    workshop_tag: workshop_tag
                }
            }
        )
    })
    if (req.ok) {
        return await req.json()
    } else {
        throw new Error('System error. Please try again later.')
    }
}