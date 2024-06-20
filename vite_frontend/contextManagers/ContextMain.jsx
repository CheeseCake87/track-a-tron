import {createContext, createEffect, createSignal, onMount} from 'solid-js'
import {Outlet, useLocation, useNavigate} from '@solidjs/router'
import AuthLoading from "../components/pages/auth/AuthLoading";

import rpc_auth_get_session from "../rpc/auth/rpc_auth_get_session";
import rpc_auth_logout from "../rpc/auth/rpc_auth_logout";
import rpc_auth_login from "../rpc/auth/rpc_auth_login";
import {MainMenu} from "../components/menus/MainMenu";
import rpc_check_if_setup from "../rpc/system/rpc_check_if_setup";
import ToastBar from "../components/globals/ToastBar";
import rpc_get_enabled_services from "../rpc/system/rpc_get_enabled_services";


export const ContextMain = createContext()

export function MainContextProvider(props) {

    const protectedRoutes = [
        '/clients',
        '/users',
        '/account',
        '/system'
    ]

    const noLoginRoutes = [
        '/forgot-password',
        '/verification-code',
        '/change-password',
        '/login'
    ]

    const session = rpc_auth_get_session()
    const navigator = useNavigate()
    const location = useLocation()

    const [enabledServices, setEnabledServices] = createSignal([])

    // Toast Bar // Toast Bar

    const [toastBarType, setToastBarType] = createSignal('success')
    const [toastBarMessage, setToastBarMessage] = createSignal('')

    // -------------------------------------

    const [iconSize, setIconSize] = createSignal(24)

    const [loggedIn, setLoggedIn] = createSignal(false)
    const [userId, setUserId] = createSignal(null)
    const [userType, setUserType] = createSignal(null)
    const [loaded, setLoaded] = createSignal(false)

    const [mainMenuLocation, setMainMenuLocation] = createSignal('clients')

    // Client Filtering // Client Filtering


    // -------------------------------------

    function showSuccessToast(message) {
        setToastBarType('success')
        setToastBarMessage(message)
    }

    function showErrorToast(message) {
        setToastBarType('error')
        setToastBarMessage(message)
    }

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
            } else {
                showErrorToast(rpc.message)
            }
        })
    }

    createEffect(() => {
        if (!session.store.loading) {
            setLoaded(true)
            setLoggedIn(session.data('logged_in', false))
            setUserId(session.data('user_id', 0))
            setUserType(session.data('user_type', null))
        }
    })

    createEffect(() => {
        if (!session.store.loading) {
            if (!loggedIn()) {
                if (protectedRoutes.includes(location.pathname)) {
                    navigator('/login')
                }
            } else {
                if (noLoginRoutes.includes(location.pathname)) {
                    navigator('/')
                }
            }
        }
    })

    onMount(() => {
        rpc_check_if_setup().then((rpc) => {
            if (!rpc.ok) {
                navigator('/install')
            }
        })
        rpc_get_enabled_services().then((rpc) => {
            if (rpc.ok) {
                setEnabledServices(rpc.data.enabled_services)
            }
        })
    })

    return (
        <ContextMain.Provider value={
            {
                session: session,
                navigator: navigator,
                location: location,
                enabledServices: enabledServices,
                setEnabledServices: setEnabledServices,
                iconSize: iconSize,
                setIconSize: setIconSize,
                loggedIn: loggedIn,
                userId: userId,
                userType: userType,

                // Toast Bar
                toastBarType: toastBarType,
                setToastBarType: setToastBarType,
                toastBarMessage: toastBarMessage,
                setToastBarMessage: setToastBarMessage,

                mainMenuLocation: mainMenuLocation,
                setMainMenuLocation: setMainMenuLocation,

                login: login,
                logout: logout,

                showSuccessToast: showSuccessToast,
                showErrorToast: showErrorToast
            }
        }>
            {
                loaded() ?
                    loggedIn() ?
                        <div className={'main-container'}>
                            <ToastBar/>
                            <MainMenu/>
                            <Outlet/>
                        </div>
                        : <>
                            <ToastBar/>
                            <Outlet/>
                        </>
                    : <AuthLoading/>
            }
        </ContextMain.Provider>
    )
}
