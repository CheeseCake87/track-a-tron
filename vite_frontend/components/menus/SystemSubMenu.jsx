import {BoxIcon, InfoIcon, LogsIcon, UsersIcon} from "../globals/Icons";
import {ContextMain} from "../../contextManagers/ContextMain";
import {ContextSystem} from "../../contextManagers/ContextSystem";
import {useContext} from "solid-js";

export default function SystemSubMenu() {

    const ctxMain = useContext(ContextMain)
    const ctxSystem = useContext(ContextSystem)

    return (
        <div className={'sub-menu'}>
            <div className={ctxSystem.systemSection() === 'information' ? 'sub-menu-icon-active' : 'sub-menu-icon'}
                 onClick={
                     () => ctxMain.navigator('/system/information')
                 }>
                <div><InfoIcon size={20}/></div>
                <div>Information</div>
            </div>
            <div className={ctxSystem.systemSection() === 'users' ? 'sub-menu-icon-active' : 'sub-menu-icon'}
                 onClick={
                     () => ctxMain.navigator('/system/users')
                 }>
                <div><UsersIcon size={20}/></div>
                <div>Users</div>
            </div>
            <div className={ctxSystem.systemSection() === 'services' ? 'sub-menu-icon-active' : 'sub-menu-icon'}
                 onClick={
                     () => ctxMain.navigator('/system/services')
                 }>
                <div><BoxIcon size={20}/></div>
                <div>Services</div>
            </div>
            <div className={ctxSystem.systemSection() === 'logs' ? 'sub-menu-icon-active' : 'sub-menu-icon'}
                 onClick={
                     () => ctxMain.navigator('/system/logs')
                 }>
                <div><LogsIcon size={20}/></div>
                <div>Logs</div>
            </div>
        </div>
    )
}