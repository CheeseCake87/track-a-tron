import {API_V1_URL} from "../globals";

export default class API {
    constructor(apiUrl = API_V1_URL) {
        this.apiUrl = apiUrl;
    }

    async get(url) {
        const req = await fetch(this.apiUrl + url, {
            method: 'GET',
            credentials: 'include',
        })
        if (req.ok) {
            return await req.json()
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
            return await req.json()
        } else {
            throw new Error('System error. Please try again later.')
        }
    }

    resource() {

    }
}
