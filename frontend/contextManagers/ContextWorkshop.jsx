import {createContext, createEffect, createSignal, onCleanup, onMount, useContext} from "solid-js";
import {Outlet, useParams} from "@solidjs/router";
import {ContextMain} from "./ContextMain";
import {createStore} from "solid-js/store";
import rpc_page_workshop_tickets from "../rpc/workshop/rpc_page_workshop_tickets";

export const ContextWorkshop = createContext()

export function WorkshopContextProvider() {

    const ctxMain = useContext(ContextMain)

    const [workshopLayout, setWorkshopLayout] = createSignal('cards')

    const [loadingTickets, setLoadingTickets] = createSignal(true)
    const [smallLoadingTickets, setSmallLoadingTickets] = createSignal(false)

    const [tickets, setTickets] = createStore([])

    const [totalTickets, setTotalTickets] = createSignal(0)
    const [totalPages, setTotalPages] = createSignal(0)
    const [page, setPage] = createSignal(1)
    const [limit, setLimit] = createSignal(25)

    const [windowHeight, setWindowHeight] = createSignal()
    const [ticketsInnerTableHeight, setTicketsInnerTableHeight] = createSignal(200)

    const [ticketsWhere, setTicketsWhere] = createSignal({})
    const [ticketsWhereAnnex, setTicketsWhereAnnex] = createSignal({})
    const [ticketsTempWhere, setTicketsTempWhere] = createSignal({})
    const [ticketsWherePills, setTicketsWherePills] = createSignal({})


    const windowResizeHandler = (_) => {
        setWindowHeight(window.innerHeight)
    };

    let dialogFilterTicketsRef;
    let deBounceGetPageTicketsTimer;

    function displayName(business_name, first_name, last_name) {
        let name = ''
        if (first_name) {
            name = first_name
        }
        if (last_name) {
            if (first_name) {
                name += ' ' + last_name
            } else {
                name = last_name
            }
        }

        if (business_name) {
            if (name !== '') {
                return name + ' (' + business_name + ')'
            } else {
                return business_name
            }
        }

        return name
    }

    function displayContact(phone, email, alt_phone, alt_email) {
        let contact = []
        if (phone) {
            contact.push(phone)
        }
        if (email) {
            contact.push(email)
        }
        if (alt_phone) {
            contact.push(alt_phone)
        }
        if (alt_email) {
            contact.push(alt_email)
        }
        return contact.join(', ')
    }

    function displayDevice(make, model) {
        let device = ''
        if (make) {
            device = make
        }
        if (model) {
            if (make) {
                device += ' ' + model
            } else {
                device = model
            }
        }
        return device
    }


    function ticketsTempWhereValue(key, value) {
        if (value === '') {
            if (ticketsTempWhere().hasOwnProperty(key)) {
                delete ticketsTempWhere()[key]
                setTicketsTempWhere({
                    ...ticketsTempWhere()
                })
            }
        } else {
            setTicketsTempWhere({
                ...ticketsTempWhere(),
                [key]: value
            })
        }
    }

    function checkTempWhereIn(key, value) {
        if (ticketsTempWhere().hasOwnProperty('_in')) {
            if (ticketsTempWhere()._in.hasOwnProperty(key)) {
                if (ticketsTempWhere()._in[key].includes(value)) {
                    return true
                }
            }
        }
    }

    function setTempWhereIn(key, value) {
        if (ticketsTempWhere().hasOwnProperty('_in')) {
            if (ticketsTempWhere()._in.hasOwnProperty(key)) {
                if (!ticketsTempWhere()._in[key].includes(value)) {
                    setTicketsTempWhere({
                        ...ticketsTempWhere(),
                        _in: {
                            ...ticketsTempWhere()._in,
                            [key]: [...ticketsTempWhere()._in[key], value]
                        }
                    })
                }
            } else {
                setTicketsTempWhere({
                    ...ticketsTempWhere(),
                    _in: {
                        ...ticketsTempWhere()._in,
                        [key]: [value]
                    }
                })
            }
        } else {
            setTicketsTempWhere({
                ...ticketsTempWhere(),
                _in: {
                    [key]: [value]
                }
            })
        }
    }

    function unsetTempWhereIn(key, value) {
        if (ticketsTempWhere().hasOwnProperty('_in')) {
            if (ticketsTempWhere()._in.hasOwnProperty(key)) {
                if (ticketsTempWhere()._in[key].includes(value)) {

                    const cast = ticketsTempWhere()._in[key].filter((v) => v !== value)

                    setTicketsTempWhere({
                        ...ticketsTempWhere(),
                        _in: {
                            ...ticketsTempWhere()._in,
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
            'business_name': 'Business Name',
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

    function scrollToTop() {
        const el = document.getElementById('ticketsTableOverflow')
        if (el) {
            el.scrollTop = 0
        }
    }

    function deBounceGetPageTickets(delay, page, limit, where) {
        setSmallLoadingTickets(true)

        clearTimeout(deBounceGetPageTicketsTimer)
        deBounceGetPageTicketsTimer = setTimeout(() => {
            rpc_page_workshop_tickets(
                ctxMain.userId(), page, limit, where
            ).then((rpc) => {
                if (rpc.ok) {
                    setTotalTickets(rpc.data.total_tickets)
                    setTotalPages(rpc.data.total_pages)
                    setTickets(rpc.data.tickets)
                    setSmallLoadingTickets(false)
                    scrollToTop()
                    if (loadingTickets()) {
                        setLoadingTickets(false)
                    }
                } else {
                    setTotalTickets(0)
                    setTotalPages(0)
                    setTickets([])
                    setSmallLoadingTickets(false)
                    if (loadingTickets()) {
                        setLoadingTickets(false)
                    }
                }
            })

            setTicketsWhereAnnex(where)
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
        setTicketsInnerTableHeight(
            windowHeight() - 150 - (Object.keys(ticketsWherePills()).length > 0 ? 45 : 0))
    })

    createEffect(() => {
        deBounceGetPageTickets(200, page(), limit(), ticketsWhere())
    })

    createEffect(() => {
        setTicketsWherePills(buildDisplayWherePills(
            ticketsWhereAnnex() ? ticketsWhereAnnex() : {})
        )
    })

    onMount(() => {
        if (ctxMain.loggedIn()) {
            window.addEventListener('resize', windowResizeHandler);
            setWindowHeight(window.innerHeight)
            setTicketsInnerTableHeight(windowHeight() - 150)
            deBounceGetPageTickets(200, page(), limit(), ticketsWhere())
        } else {
            ctxMain.navigator('/login')
        }
    })

    onCleanup(() => {
        window.removeEventListener('resize', windowResizeHandler);
    })

    return (
        <ContextWorkshop.Provider value={
            {
                workshopLayout: workshopLayout,
                setWorkshopLayout: setWorkshopLayout,

                loadingTickets: loadingTickets,
                setLoadingTickets: setLoadingTickets,
                smallLoadingTickets: smallLoadingTickets,
                setSmallLoadingTickets: setSmallLoadingTickets,

                tickets: tickets,
                setTickets: setTickets,

                totalTickets: totalTickets,
                setTotalTickets: setTotalTickets,
                totalPages: totalPages,
                setTotalPages: setTotalPages,
                page: page,
                setPage: setPage,
                limit: limit,
                setLimit: setLimit,

                // Client Filtering
                ticketsWhere: ticketsWhere,
                setTicketsWhere: setTicketsWhere,
                ticketsWhereAnnex: ticketsWhereAnnex,
                setTicketsWhereAnnex: setTicketsWhereAnnex,
                ticketsTempWhere: ticketsTempWhere,
                setTicketsTempWhere: setTicketsTempWhere,
                ticketsWherePills: ticketsWherePills,
                setTicketsWherePills: setTicketsWherePills,
                ticketsTempWhereValue: ticketsTempWhereValue,

                windowHeight: windowHeight,
                setWindowHeight: setWindowHeight,
                ticketsInnerTableHeight: ticketsInnerTableHeight,
                setTicketsInnerTableHeight: setTicketsInnerTableHeight,

                deBounceGetPageTickets: deBounceGetPageTickets,
                checkTempWhereIn: checkTempWhereIn,
                setTempWhereIn: setTempWhereIn,
                unsetTempWhereIn: unsetTempWhereIn,
                changeLimit: changeLimit,
                displayName: displayName,
                displayContact: displayContact,
                displayDevice: displayDevice,

                dialogFilterTicketsRef: dialogFilterTicketsRef,
            }
        }><Outlet/>
        </ContextWorkshop.Provider>
    )
}
