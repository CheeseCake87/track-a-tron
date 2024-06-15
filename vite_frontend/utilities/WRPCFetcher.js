import {createResource} from "solid-js";

export default class WRPCFetcher {
    /*

    A class that makes the construction of solid createResource
    a little easier.

    */
    store
    refetch
    mutate

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

    data(key, return_if_not_found = null) {
        if (typeof this.store() === 'object') {
            if (typeof this.store().data === 'object') {
                if (key in this.store().data)
                    return this.store().data[key]
            }
        }
        return return_if_not_found
    }

    version() {
        if (typeof this.store() === 'object') {
            return this.store().wrpc
        }
        return null
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
