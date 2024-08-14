import {API_V1_URL} from "../globals";

export default class API {

    constructor(
        {
            navigator = null,
            apiUrl = API_V1_URL,
        } = {}
    ) {
        this.navigator = navigator;
        this.apiUrl = apiUrl;
    }

    setNavigator(navigator) {
        this.navigator = navigator;
    }

    async get(url) {

        const req = await fetch(this.apiUrl + url, {
            method: 'GET',
            credentials: 'include',
        })
        if (req.ok) {
            const json = await req.json()

            if (json.navigate) {
                this.navigator(json.navigate)
            }

            return await json
        } else {
            throw new Error('System error. Please try again later.')
        }
    }

    async post(url, data) {

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

            if (json.navigate) {
                this.navigator(json.navigate)
            }

            return await json
        } else {
            throw new Error('System error. Please try again later.')
        }
    }

}
