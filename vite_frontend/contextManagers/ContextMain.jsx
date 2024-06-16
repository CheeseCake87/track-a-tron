import {createContext, createEffect, createSignal, onMount} from 'solid-js'
import {Outlet, useLocation, useNavigate} from '@solidjs/router'
import AuthLoading from "../components/pages/auth/AuthLoading";

import rpc_auth_get_session from "../rpc/auth/rpc_auth_get_session";
import rpc_auth_logout from "../rpc/auth/rpc_auth_logout";
import rpc_auth_login from "../rpc/auth/rpc_auth_login";
import {MainMenu} from "../components/menus/MainMenu";
import rpc_auth_force_login from "../rpc/auth/rpc_auth_force_login";


export const ContextMain = createContext()

export function MainContextProvider(props) {

    const session = rpc_auth_get_session()
    const navigator = useNavigate()
    const location = useLocation()

    const [iconSize, setIconSize] = createSignal(24)

    const [loggedIn, setLoggedIn] = createSignal(false)
    const [userId, setUserId] = createSignal(null)
    const [userType, setUserType] = createSignal(null)
    const [loaded, setLoaded] = createSignal(false)

    const [mainMenuLocation, setMainMenuLocation] = createSignal('clients')

    // Client Filtering
    const [clientsWhere, setClientsWhere] = createSignal({})
    const [clientsWhereAnnex, setClientsWhereAnnex] = createSignal({})
    const [clientsTempWhere, setClientsTempWhere] = createSignal({})
    const [clientsWherePills, setClientsWherePills] = createSignal({})

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

    function mainMenuTabLookup() {
        const tabs = {
            '/': 'clients', // Default to 'clients'
            '/clients': 'clients',
            '/users': 'users',
            '/account': 'account',
            '/settings': 'settings'
        }
        for (let [key, value] of Object.entries(tabs)) {
            if (location.pathname.includes(key)) {
                return value
            }
        }
    }

    const protectedRoutes = [
        '/clients'
    ]

    const noLoginRoutes = [
        '/forgot-password',
        '/verification-code',
        '/change-password',
        '/login'
    ]

    function logout() {
        rpc_auth_logout().then((rpc) => {
            if (rpc.ok) {
                setUserId(null)
                setUserType(null)
                setLoggedIn(false)
                setMainMenuLocation('clients')
            }
        })
    }

    function login(username, password) {
        rpc_auth_login(username, password).then((rpc) => {
            if (rpc.ok) {
                setUserId(rpc.data.user_id)
                setUserType(rpc.data.user_type)
                setLoggedIn(rpc.data.logged_in)
            }
        })
    }

    function force_login() {
        rpc_auth_force_login().then((rpc) => {
            if (rpc.ok) {
                setUserId(rpc.data.user_id)
                setUserType(rpc.data.user_type)
                setLoggedIn(rpc.data.logged_in)
            }
        })
    }

    createEffect(() => {
        if (!loggedIn()) {
            if (protectedRoutes.includes(location.pathname)) {
                navigator('/login')
            }
        } else {
            if (noLoginRoutes.includes(location.pathname)) {
                navigator('/')
            }
        }
    })

    createEffect(() => {
        if (!session.store.loading) {
            setLoaded(true)
            setLoggedIn(session.data('logged_in', false))
            setUserId(session.data('user_id', 0))
            setUserType(session.data('user_type', null))
        }
    })

    onMount(() => {
        setMainMenuLocation(mainMenuTabLookup())
    })

    return (
        <ContextMain.Provider value={
            {
                session: session,
                navigator: navigator,
                location: location,
                iconSize: iconSize,
                setIconSize: setIconSize,
                loggedIn: loggedIn,
                userId: userId,
                userType: userType,

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

                mainMenuLocation: mainMenuLocation,
                setMainMenuLocation: setMainMenuLocation,

                force_login: force_login,
                login: login,
                logout: logout,
            }
        }>
            {
                loaded() ?
                    loggedIn() ?
                        <div className={'main-container'}>
                            <MainMenu/>
                            <div className={'main-content'}>
                                <Outlet/>
                            </div>
                        </div>
                        : <Outlet/>
                    : <AuthLoading/>
            }
        </ContextMain.Provider>
    )
}
