import {createContext, createSignal, useContext} from "solid-js";
import {Outlet} from "@solidjs/router";
import SystemSubMenu from "../components/menus/SystemSubMenu";
import rpc_get_all_users from "../rpc/system/rpc_get_all_users";
import rpc_get_logs from "../rpc/system/rpc_get_logs";
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
        rpc_get_all_users().then((rpc) => {
            if (rpc.ok) {
                setSystemUsers(rpc.data)
            } else {
                ctxMain.showErrorToast("Error getting users")
            }
        })
    }

    function getAllSystemLogs() {
        rpc_get_logs().then((rpc) => {
            if (rpc.ok) {
                setSystemLogs(rpc.data)
            } else {
                ctxMain.showErrorToast("Error getting logs")
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