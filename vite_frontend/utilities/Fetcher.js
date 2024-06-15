import {createResource} from 'solid-js'

export default class Fetcher {
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

    get(key) {
        if (typeof this.store() === 'object') {
            return this.store()[key]
        }
        return null
    }
}


