import {createContext, createEffect, createSignal, onCleanup, onMount, useContext} from "solid-js";
import {Outlet} from "@solidjs/router";
import {ContextMain} from "./ContextMain";
import {createStore} from "solid-js/store";
import {CATEGORY_CODES, STATUS_CODES} from "../globals";
import API from "../utilities/API";

export const ContextWorkshop = createContext()

export function WorkshopContextProvider() {

    const ctxMain = useContext(ContextMain)
    const api = new API()

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

    const [users, setUsers] = createSignal([])


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
        if (value === '' || value === 0 || value === '0') {
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

    function getAllActiveUsers() {
        api.get('/system/get/active/users').then((res) => {
            if (res.ok) {
                setUsers(res.data)
            } else {
                ctxMain.showErrorToast('Error fetching users. ' + res.message)
            }
        })
    }

    function changeLimit(value) {
        setPage(1)
        setLimit(value)
    }

    function fieldFilterKeyLookup(key) {
        let filterKey = {
            'workshop_tag': 'Tag',
            'status_code': 'Status',
            'category_code': 'Category',
            'fk_assigned_user_id': 'Assigned To',
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

            api.post('/workshop/paged', {
                page: page,
                limit: limit,
                where: where
            }).then((res) => {
                if (res.ok) {
                    setTotalTickets(res.data.total_tickets)
                    setTotalPages(res.data.total_pages)
                    setTickets(res.data.tickets)
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

            switch (key) {
                case 'status_code':
                    if (STATUS_CODES.hasOwnProperty(value)) {
                        tempFieldNames[fieldFilterKeyLookup(key)] = STATUS_CODES[value].name
                    } else {
                        tempFieldNames[fieldFilterKeyLookup(key)] = 'Error'
                    }
                    break
                case 'category_code':
                    if (CATEGORY_CODES.hasOwnProperty(value)) {
                        tempFieldNames[fieldFilterKeyLookup(key)] = CATEGORY_CODES[value]
                    } else {
                        tempFieldNames[fieldFilterKeyLookup(key)] = 'Error'
                    }
                    break
                case 'fk_assigned_user_id':
                    const user = users().find((u) => u.user_id === parseInt(value))
                    tempFieldNames[fieldFilterKeyLookup(key)] = user ? user.display_name : 'Error'
                    break
                default:
                    tempFieldNames[fieldFilterKeyLookup(key)] = value
            }

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
            getAllActiveUsers()
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

                users: users,
                setUsers: setUsers,

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
                getAllActiveUsers: getAllActiveUsers,

                dialogFilterTicketsRef: dialogFilterTicketsRef,
            }
        }><Outlet/>
        </ContextWorkshop.Provider>
    )
}
