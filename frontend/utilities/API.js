import {API_V1_URL} from "../globals";

export default class API {

    constructor(
        {
            navigator = null,
            apiUrl = API_V1_URL,
            session: session = null,
        } = {}
    ) {
        this.navigator = navigator;
        this.apiUrl = apiUrl;
        this.session = session;
    }

    async get(url, ignoreIfUnauthorized = true) {

        if (ignoreIfUnauthorized) {
            if (typeof this.session === 'function') {
                if (!this.session().logged_in) {
                   if (import.meta.env.DEV) {
                        console.log("GET SKIPPED")
                        console.log(url)
                    }
                    return {ok: false, message: 'Unauthorized'}
                }
            }
        }

        const req = await fetch(this.apiUrl + url, {
            method: 'GET',
            credentials: 'include',
        })
        if (req.ok) {
            const json = await req.json()

            if (import.meta.env.DEV) {
                console.log(url)
                console.log(json)
            }

            if (json.navigate) {
                this.navigator(json.navigate)
            }

            return await json
        } else {
            throw new Error('System error. Please try again later.')
        }
    }

    async post(url, data, ignoreIfUnauthorized = true) {

        if (ignoreIfUnauthorized) {
            if (typeof this.session === 'function') {
                if (!this.session().logged_in) {
                   if (import.meta.env.DEV) {
                        console.log("POST SKIPPED")
                        console.log(url)
                        console.log(data)
                    }
                    return {ok: false, message: 'Unauthorized'}
                }
            }
        }

        const req = await fetch(this.apiUrl + url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (req.ok) {
            const json = await req.json()

            if (import.meta.env.DEV) {
                console.log(url)
                console.log(data)
                console.log(json)
            }

            if (json.navigate) {
                this.navigator(json.navigate)
            }

            return await json
        } else {
            throw new Error('System error. Please try again later.')
        }

    }

}
