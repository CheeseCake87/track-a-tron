import {useContext} from "solid-js";
import {ClientIcon, LogoutIcon, SettingsIcon, UserIcon} from "../globals/Icons";
import {ContextMain} from "../../contextManagers/ContextMain";


export function MainMenu() {

    const ctxMain = useContext(ContextMain)

    return (
        <div className={'main-menu'}>
            <div>
                <div className={
                    ctxMain.mainMenuLocation() === 'clients'
                        ? 'main-menu-icon-active'
                        : 'main-menu-icon'}
                     onClick={() => {
                         ctxMain.setMainMenuLocation('clients')
                         ctxMain.navigator('/')
                     }}>
                    <div><ClientIcon size={ctxMain.iconSize()}/></div>
                    <div>Clients</div>
                </div>

            </div>
            <div>
                <div className={
                    ctxMain.mainMenuLocation() === 'account'
                        ? 'main-menu-icon-active'
                        : 'main-menu-icon'}
                     onClick={() => {
                         ctxMain.setMainMenuLocation('account')
                         ctxMain.navigator('/account')
                     }}>
                    <div><UserIcon size={ctxMain.iconSize()}/></div>
                    <div>Account</div>
                </div>
                <div className={
                    ctxMain.mainMenuLocation() === 'system'
                        ? 'main-menu-icon-active'
                        : 'main-menu-icon'}
                     onClick={() => {
                         ctxMain.setMainMenuLocation('system')
                         ctxMain.navigator('/system')
                     }}>
                    <div><SettingsIcon size={ctxMain.iconSize()}/></div>
                    <div>System</div>
                </div>
                <div className={'main-menu-icon'}
                     onClick={() => ctxMain.logout()}>
                    <div><LogoutIcon size={ctxMain.iconSize()}/></div>
                    <div>Logout</div>
                </div>
            </div>
        </div>
    )
}