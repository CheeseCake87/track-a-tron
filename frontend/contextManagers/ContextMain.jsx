import {createContext, createSignal, onMount} from 'solid-js'
import {Outlet, useLocation, useNavigate} from '@solidjs/router'
import AuthLoading from "../components/pages/auth/AuthLoading";
import {MainMenu} from "../components/menus/MainMenu";
import ToastBar from "../components/globals/ToastBar";
import {CATEGORY_CODES, STATUS_CODES} from "../globals";
import API from "../utilities/API";


export const ContextMain = createContext()

export function MainContextProvider(props) {

    const api = new API()

    const navigator = useNavigate()
    const location = useLocation()

    const [session, setSession] = createSignal({
        logged_in: false,
        user_id: 0,
        user_type: null,
    })
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

    const [showMainMenu, setShowMainMenu] = createSignal(true)
    const [mainMenuLocation, setMainMenuLocation] = createSignal('workshop')

    function statusCodeLookup(statusCode) {
        return STATUS_CODES[statusCode]
    }

    function categoryCodeLookup(categoryCode) {
        return CATEGORY_CODES[categoryCode]
    }

    function showSuccessToast(message) {
        setToastBarType('success')
        setToastBarMessage(message)
    }

    function showErrorToast(message) {
        setToastBarType('error')
        setToastBarMessage(message)
    }

    function logout() {
        api.get('/system/auth/logout').then((re) => {
            if (re.ok) {
                setUserId(null)
                setUserType(null)
                setLoggedIn(false)
                setMainMenuLocation('clients')
            }
        })
    }

    function login(username, password) {
        api.post('system/auth/login', {
            username: username,
            password: password
        }).then((re) => {
            if (re.ok) {
                setSession(re.data)
                setLoggedIn(re.data.logged_in)
                setUserId(re.data.user_id)
                setUserType(re.data.user_type)
            } else {
                showErrorToast(re.message)
            }
        })
    }

    function fetch_session() {
        api.get('/system/auth/session').then((re) => {
            if (re.ok) {
                setSession(re.data)
                setLoggedIn(re.data.logged_in)
                setUserId(re.data.user_id)
                setUserType(re.data.user_type)
            }
        })
    }

    onMount(() => {
        setLoaded(false)
        api.get(
            '/system/checks'
        ).then((re) => {
            if (re.ok) {
                if (!re.data.system_setup) {
                    navigator('/install')
                } else {
                    setEnabledServices(re.data.enabled_services)
                    fetch_session()
                    setLoaded(true)
                }
            }
        })
    })

    return (
        <ContextMain.Provider value={
            {
                showMainMenu: showMainMenu,
                setShowMainMenu: setShowMainMenu,

                navigator: navigator,
                location: location,
                enabledServices: enabledServices,
                setEnabledServices: setEnabledServices,
                iconSize: iconSize,
                setIconSize: setIconSize,
                loggedIn: loggedIn,
                setLoggedIn: setLoggedIn,
                userId: userId,
                setUserId: setUserId,
                userType: userType,
                setUserType: setUserType,

                // Toast Bar
                toastBarType: toastBarType,
                setToastBarType: setToastBarType,
                toastBarMessage: toastBarMessage,
                setToastBarMessage: setToastBarMessage,

                mainMenuLocation: mainMenuLocation,
                setMainMenuLocation: setMainMenuLocation,

                fetch_session: fetch_session,
                login: login,
                logout: logout,

                showSuccessToast: showSuccessToast,
                showErrorToast: showErrorToast,

                statusCodeLookup: statusCodeLookup,
                categoryCodeLookup: categoryCodeLookup,
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
