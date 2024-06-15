import {useContext} from "solid-js";
import {ClientIcon, LogoutIcon, SettingsIcon, UserIcon, UsersIcon} from "../globals/Icons";
import {ContextMain} from "../../contextManagers/ContextMain";


export function MainMenu() {

    const mainCtx = useContext(ContextMain)

    return (
        <div className={'main-menu'}>
            <div>
                <div className={
                    mainCtx.mainMenuLocation() === 'clients'
                        ? 'main-menu-icon-active'
                        : 'main-menu-icon'}
                     onClick={() => {
                         mainCtx.setMainMenuLocation('clients')
                         mainCtx.navigator('/')
                     }}>
                    <div><ClientIcon size={mainCtx.iconSize()}/></div>
                    <div>Clients</div>
                </div>

                <div className={
                    mainCtx.mainMenuLocation() === 'users'
                        ? 'main-menu-icon-active'
                        : 'main-menu-icon'}
                     onClick={() => {
                         mainCtx.setMainMenuLocation('users')
                         mainCtx.navigator('/users')
                     }}>
                    <div><UsersIcon size={mainCtx.iconSize()}/></div>
                    <div>Users</div>
                </div>

            </div>
            <div>
                <div className={
                    mainCtx.mainMenuLocation() === 'your-account'
                        ? 'main-menu-icon-active'
                        : 'main-menu-icon'}
                     onClick={() => {
                         mainCtx.setMainMenuLocation('your-account')
                         mainCtx.navigator('/your-account')
                     }}>
                    <div><UserIcon size={mainCtx.iconSize()}/></div>
                    <div>Account</div>
                </div>
                <div className={
                    mainCtx.mainMenuLocation() === 'system'
                        ? 'main-menu-icon-active'
                        : 'main-menu-icon'}
                     onClick={() => {
                         mainCtx.setMainMenuLocation('system')
                         mainCtx.navigator('/system')
                     }}>
                    <div><SettingsIcon size={mainCtx.iconSize()}/></div>
                    <div>System</div>
                </div>
                <div className={'main-menu-icon'}
                     onClick={() => mainCtx.logout()}>
                    <div><LogoutIcon size={mainCtx.iconSize()}/></div>
                    <div>Logout</div>
                </div>
            </div>
        </div>
    )
}