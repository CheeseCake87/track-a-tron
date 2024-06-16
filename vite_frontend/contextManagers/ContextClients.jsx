import {createContext, createEffect, createSignal, onCleanup, onMount, useContext} from 'solid-js'
import {Outlet} from '@solidjs/router'
import {createStore} from "solid-js/store";
import rpc_clients_page_clients from "../rpc/clients/rpc_clients_page_clients";
import {ContextMain} from "./ContextMain";


export const ContextClients = createContext()

export function ClientsContextProvider() {

    const ctxMain = useContext(ContextMain)

    const [loadingClients, setLoadingClients] = createSignal(true)
    const [smallLoadingClients, setSmallLoadingClients] = createSignal(false)

    const [clients, setClients] = createStore([])

    const [totalClients, setTotalClients] = createSignal(0)
    const [totalPages, setTotalPages] = createSignal(0)
    const [page, setPage] = createSignal(1)
    const [limit, setLimit] = createSignal(25)

    const [windowHeight, setWindowHeight] = createSignal()
    const [clientsInnerTableHeight, setClientsInnerTableHeight] = createSignal(200)


    const windowResizeHandler = (_) => {
        setWindowHeight(window.innerHeight)
    };

    let dialogFilterClientsRef;

    let deBounceGetPageClientsTimer;

    function checkTempWhereIn(key, value) {
        if (ctxMain.clientsTempWhere().hasOwnProperty('_in')) {
            if (ctxMain.clientsTempWhere()._in.hasOwnProperty(key)) {
                if (ctxMain.clientsTempWhere()._in[key].includes(value)) {
                    return true
                }
            }
        }
    }

    function setTempWhereIn(key, value) {
        if (ctxMain.clientsTempWhere().hasOwnProperty('_in')) {
            if (ctxMain.clientsTempWhere()._in.hasOwnProperty(key)) {
                if (!ctxMain.clientsTempWhere()._in[key].includes(value)) {
                    ctxMain.setClientsTempWhere({
                        ...ctxMain.clientsTempWhere(),
                        _in: {
                            ...ctxMain.clientsTempWhere()._in,
                            [key]: [...ctxMain.clientsTempWhere()._in[key], value]
                        }
                    })
                }
            } else {
                ctxMain.setClientsTempWhere({
                    ...ctxMain.clientsTempWhere(),
                    _in: {
                        ...ctxMain.clientsTempWhere()._in,
                        [key]: [value]
                    }
                })
            }
        } else {
            ctxMain.setClientsTempWhere({
                ...ctxMain.clientsTempWhere(),
                _in: {
                    [key]: [value]
                }
            })
        }
    }

    function unsetTempWhereIn(key, value) {
        if (ctxMain.clientsTempWhere().hasOwnProperty('_in')) {
            if (ctxMain.clientsTempWhere()._in.hasOwnProperty(key)) {
                if (ctxMain.clientsTempWhere()._in[key].includes(value)) {

                    const cast = ctxMain.clientsTempWhere()._in[key].filter((v) => v !== value)

                    ctxMain.setClientsTempWhere({
                        ...ctxMain.clientsTempWhere(),
                        _in: {
                            ...ctxMain.clientsTempWhere()._in,
                            [key]: cast
                        }
                    })

                }
            }
        }
    }

    function changeLimit(value) {
        setPage(1)
        setLimit(value)
    }

    function fieldFilterKeyLookup(key) {
        let filterKey = {
            'client_id': 'Client ID',
            'any_name': 'Name',
            'any_email_address': 'Email Address',
            'any_number': 'Phone Number',
            'postcode': 'Postcode',
            'date_from': 'Date From',
            'date_to': 'Date To',
            'date_on': 'Date On'
        }
        return filterKey[key]
    }

    function deBounceGetPageClients(delay, page, limit, where) {
        setSmallLoadingClients(true)

        clearTimeout(deBounceGetPageClientsTimer)
        deBounceGetPageClientsTimer = setTimeout(() => {
            rpc_clients_page_clients(
                ctxMain.userId(), page, limit, where
            ).then((rpc) => {
                if (rpc.ok) {
                    setTotalClients(rpc.data.total_clients)
                    setTotalPages(rpc.data.total_pages)
                    setClients(rpc.data.clients)
                    setSmallLoadingClients(false)
                    if (loadingClients()) {
                        setLoadingClients(false)
                    }

                } else {
                    setTotalClients(0)
                    setTotalPages(0)
                    setClients([])
                    setSmallLoadingClients(false)
                    if (loadingClients()) {
                        setLoadingClients(false)
                    }
                }
            })

            ctxMain.setClientsWhereAnnex(where)
        }, delay)

    }

    function buildDisplayWherePills(displayWhere) {
        const tempFieldNames = {}

        for (let [key, value] of Object.entries(displayWhere)) {
            tempFieldNames[fieldFilterKeyLookup(key)] = value
        }

        return {...tempFieldNames}
    }

    // DISPLAY WHERE HEIGHT
    createEffect(() => {
        setClientsInnerTableHeight(
            windowHeight() - 150 - (Object.keys(ctxMain.clientsWherePills()).length > 0 ? 45 : 0))
    })

    createEffect(() => {
        deBounceGetPageClients(200, page(), limit(), ctxMain.clientsWhere())
    })

    createEffect(() => {
        ctxMain.setClientsWherePills(buildDisplayWherePills(
            ctxMain.clientsWhereAnnex() ? ctxMain.clientsWhereAnnex() : {})
        )
    })

    onMount(() => {
        window.addEventListener('resize', windowResizeHandler);
        setWindowHeight(window.innerHeight)
        setClientsInnerTableHeight(windowHeight() - 150)
        deBounceGetPageClients(200, page(), limit(), ctxMain.clientsWhere())
    })

    onCleanup(() => {
        window.removeEventListener('resize', windowResizeHandler);
    })

    return (
        <ContextClients.Provider value={
            {
                loadingClients: loadingClients,
                setLoadingClients: setLoadingClients,
                smallLoadingClients: smallLoadingClients,
                setSmallLoadingClients: setSmallLoadingClients,

                clients: clients,
                setClients: setClients,

                totalClients: totalClients,
                setTotalClients: setTotalClients,
                totalPages: totalPages,
                setTotalPages: setTotalPages,
                page: page,
                setPage: setPage,
                limit: limit,
                setLimit: setLimit,

                windowHeight: windowHeight,
                setWindowHeight: setWindowHeight,
                clientsInnerTableHeight: clientsInnerTableHeight,
                setClientsInnerTableHeight: setClientsInnerTableHeight,

                checkTempWhereIn: checkTempWhereIn,
                setTempWhereIn: setTempWhereIn,
                unsetTempWhereIn: unsetTempWhereIn,
                changeLimit: changeLimit,

                dialogFilterClientsRef: dialogFilterClientsRef,
            }
        }><Outlet/>
        </ContextClients.Provider>
    )
}
