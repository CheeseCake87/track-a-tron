import {createContext, createSignal, useContext} from "solid-js";
import {Outlet} from "@solidjs/router";
import SystemSubMenu from "../components/menus/SystemSubMenu";
import {ContextMain} from "./ContextMain";

export const ContextSystem = createContext()

export function SystemContextProvider() {

    const ctxMain = useContext(ContextMain)

    const [systemSection, setSystemSection] = createSignal('information')

    const blankSystemUser = {
        username: "",
        password: "",
        display_name: "",
        email: "",
        sms: "",
        user_type: "user",
        disabled: false,
        deleted: false
    }

    const systemUserTypes = ["user", "manager", "admin"]

    const [systemUserSelected, setSystemUserSelected] = createSignal(0)

    const [systemUsersDialogError, setSystemUsersDialogError] = createSignal('')
    const [systemUsers, setSystemUsers] = createSignal([])
    const [tempAddSystemUser, setTempAddSystemUser] = createSignal(blankSystemUser)
    const [tempEditSystemUser, setTempEditSystemUser] = createSignal(blankSystemUser)
    const [tempDeleteSystemUser, setTempDeleteSystemUser] = createSignal(blankSystemUser)
    const [resetSystemUserPassword, setResetSystemUserPassword] = createSignal('')

    const [systemLogs, setSystemLogs] = createSignal([])

    let refSystemUserAddDialog;
    let refSystemUserEditDialog;
    let refSystemUserResetPasswordDialog;
    let refSystemUserDeleteDialog;

    function getAllSystemUsers() {
        ctxMain.api.get('/system/get/users').then((res) => {
            if (res.ok) {
                setSystemUsers(res.data)
            }
        })
    }

    function getAllSystemLogs() {

        ctxMain.api.get('/system/get/logs').then((res) => {
            if (res.ok) {
                setSystemLogs(res.data)
            }
        })
    }

    return (
        <ContextSystem.Provider value={{
            systemSection: systemSection,
            setSystemSection: setSystemSection,

            blankSystemUser: blankSystemUser,
            refSystemUserAddDialog: refSystemUserAddDialog,
            refSystemUserEditDialog: refSystemUserEditDialog,
            refSystemUserResetPasswordDialog: refSystemUserResetPasswordDialog,
            refSystemUserDeleteDialog: refSystemUserDeleteDialog,

            systemUsers: systemUsers,
            setSystemUsers: setSystemUsers,
            systemUserTypes: systemUserTypes,
            systemUsersDialogError: systemUsersDialogError,
            setSystemUsersDialogError: setSystemUsersDialogError,

            systemLogs: systemLogs,

            systemUserSelected: systemUserSelected,
            setSystemUserSelected: setSystemUserSelected,

            tempAddSystemUser: tempAddSystemUser,
            setTempAddSystemUser: setTempAddSystemUser,
            tempEditSystemUser: tempEditSystemUser,
            setTempEditSystemUser: setTempEditSystemUser,
            tempDeleteSystemUser: tempDeleteSystemUser,
            setTempDeleteSystemUser: setTempDeleteSystemUser,
            resetSystemUserPassword: resetSystemUserPassword,
            setResetSystemUserPassword: setResetSystemUserPassword,

            getAllSystemUsers: getAllSystemUsers,
            getAllSystemLogs: getAllSystemLogs,

        }}>
            <div className={'main-content-slim-row'}>
                <SystemSubMenu/>
                <div className={'sub-content'}>
                    <Outlet/>
                </div>
            </div>
        </ContextSystem.Provider>
    )
}