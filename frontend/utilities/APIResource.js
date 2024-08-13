import {createResource} from "solid-js";

export default class APIResource {
    /*

    A class that makes the construction of solid createResource
    a little easier.

    */

    constructor(source, fetcher) {
        if (typeof source === 'function') {
            // If the passed in source arg is a function,
            // this is probably the fetcher; Use it as such.
            const [
                store, {refetch, mutate}
            ] = createResource(source)
            this.store = store
            this.refetch = refetch
            this.mutate = mutate
        } else {
            const [
                store, {refetch, mutate}
            ] = createResource(source, fetcher)
            this.store = store
            this.refetch = refetch
            this.mutate = mutate
        }
    }

    get(key, if_not_found = null) {
        if (key === 'undefined') {
            return this.store().data
        }

        if (typeof this.store() === 'object') {
            if (typeof this.store().data === 'object') {
                if (key in this.store().data)
                    return this.store().data[key]
            }
        }

        return if_not_found
    }

    status() {
        if (typeof this.store() === 'object') {
            return this.store().ok
        }
        return null
    }

    message() {
        if (typeof this.store() === 'object') {
            return this.store().message
        }
        return null
    }
}
