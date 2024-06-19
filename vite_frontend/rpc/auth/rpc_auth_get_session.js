import {API_URL} from "../../globals";
import {weerpc} from "weerpcjs";
import WRPCFetcher from "../../utilities/WRPCFetcher";
import {createEffect} from "solid-js";

export default function rpc_auth_get_session() {
    async function __fetch__() {
        const req = await fetch(API_URL + '/rpc/auth/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: weerpc('get_session', null)
        })
        if (req.ok) {
            return await req.json()
        }
    }

    const __fetch_result__ = new WRPCFetcher(__fetch__)

    if (import.meta.env.DEV) {
        createEffect(() => {
            if (!__fetch_result__.store.loading) {
                console.log(
                    `${__fetch_result__.message()} ~ LOGGED IN: ${__fetch_result__.data('logged_in')}`,
                    __fetch_result__.store(),
                )
            }
        })
    }

    return __fetch_result__
}