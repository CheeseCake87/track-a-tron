import {createContext, createEffect, createSignal, onCleanup, onMount, useContext} from 'solid-js'
import {Outlet} from '@solidjs/router'
import {createStore} from "solid-js/store";
import rpc_page_clients from "../rpc/client/rpc_page_clients";
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

    const [clientsWhere, setClientsWhere] = createSignal({})
    const [clientsWhereAnnex, setClientsWhereAnnex] = createSignal({})
    const [clientsTempWhere, setClientsTempWhere] = createSignal({})
    const [clientsWherePills, setClientsWherePills] = createSignal({})


    const windowResizeHandler = (_) => {
        setWindowHeight(window.innerHeight)
    };

    let dialogFilterClientsRef;

    let deBounceGetPageClientsTimer;


    function clientsTempWhereValue(key, value) {
        if (value === '') {
            if (clientsTempWhere().hasOwnProperty(key)) {
                delete clientsTempWhere()[key]
                setClientsTempWhere({
                    ...clientsTempWhere()
                })
            }
        } else {
            setClientsTempWhere({
                ...clientsTempWhere(),
                [key]: value
            })
        }
    }

    function checkTempWhereIn(key, value) {
        if (clientsTempWhere().hasOwnProperty('_in')) {
            if (clientsTempWhere()._in.hasOwnProperty(key)) {
                if (clientsTempWhere()._in[key].includes(value)) {
                    return true
                }
            }
        }
    }

    function setTempWhereIn(key, value) {
        if (clientsTempWhere().hasOwnProperty('_in')) {
            if (clientsTempWhere()._in.hasOwnProperty(key)) {
                if (!clientsTempWhere()._in[key].includes(value)) {
                    setClientsTempWhere({
                        ...clientsTempWhere(),
                        _in: {
                            ...clientsTempWhere()._in,
                            [key]: [...clientsTempWhere()._in[key], value]
                        }
                    })
                }
            } else {
                setClientsTempWhere({
                    ...clientsTempWhere(),
                    _in: {
                        ...clientsTempWhere()._in,
                        [key]: [value]
                    }
                })
            }
        } else {
            setClientsTempWhere({
                ...clientsTempWhere(),
                _in: {
                    [key]: [value]
                }
            })
        }
    }

    function unsetTempWhereIn(key, value) {
        if (clientsTempWhere().hasOwnProperty('_in')) {
            if (clientsTempWhere()._in.hasOwnProperty(key)) {
                if (clientsTempWhere()._in[key].includes(value)) {

                    const cast = clientsTempWhere()._in[key].filter((v) => v !== value)

                    setClientsTempWhere({
                        ...clientsTempWhere(),
                        _in: {
                            ...clientsTempWhere()._in,
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
            rpc_page_clients(
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

            setClientsWhereAnnex(where)
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
            windowHeight() - 150 - (Object.keys(clientsWherePills()).length > 0 ? 45 : 0))
    })

    createEffect(() => {
        deBounceGetPageClients(200, page(), limit(), clientsWhere())
    })

    createEffect(() => {
        setClientsWherePills(buildDisplayWherePills(
            clientsWhereAnnex() ? clientsWhereAnnex() : {})
        )
    })

    onMount(() => {
        if (ctxMain.loggedIn()) {
            window.addEventListener('resize', windowResizeHandler);
            setWindowHeight(window.innerHeight)
            setClientsInnerTableHeight(windowHeight() - 150)
            deBounceGetPageClients(200, page(), limit(), clientsWhere())
        } else {
            ctxMain.navigator('/login')
        }
    })

    onCleanup(() => {
        // window.removeEventListener('resize', windowResizeHandler);
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

                // Client Filtering
                clientsWhere: clientsWhere,
                setClientsWhere: setClientsWhere,
                clientsWhereAnnex: clientsWhereAnnex,
                setClientsWhereAnnex: setClientsWhereAnnex,
                clientsTempWhere: clientsTempWhere,
                setClientsTempWhere: setClientsTempWhere,
                clientsWherePills: clientsWherePills,
                setClientsWherePills: setClientsWherePills,
                clientsTempWhereValue: clientsTempWhereValue,

                windowHeight: windowHeight,
                setWindowHeight: setWindowHeight,
                clientsInnerTableHeight: clientsInnerTableHeight,
                setClientsInnerTableHeight: setClientsInnerTableHeight,

                deBounceGetPageClients: deBounceGetPageClients,
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
