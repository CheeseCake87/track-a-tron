import {For, onMount, useContext} from "solid-js";
import {ContextSystem} from "../../../contextManagers/ContextSystem";
import {ContextMain} from "../../../contextManagers/ContextMain";
import SystemUsersAddDialog from "./SystemUsersAddDialog";
import SystemUsersEditDialog from "./SystemUsersEditDialog";
import SystemUsersSetPasswordDialog from "./SystemUsersSetPasswordDialog";
import SystemUsersDeleteDialog from "./SystemUsersDeleteDialog";


export default function SystemUsers() {

    const ctxMain = useContext(ContextMain)
    const ctxSystem = useContext(ContextSystem)

    onMount(() => {
        ctxMain.setMainMenuLocation('system')
        ctxSystem.setSystemSection('users')
        ctxSystem.getAllSystemUsers()
    })

    return (
        <>
            <div className={'system-users-header'}>
                <button className={'btn-good'} onClick={() => {
                    ctxSystem.setSystemUsersDialogError('')
                    ctxSystem.setTempAddSystemUser(ctxSystem.blankSystemUser)
                    ctxSystem.refSystemUserAddDialog.showModal()
                }}>+ Add User
                </button>
            </div>
            <div className={'system-users'}>
                <For each={ctxSystem.systemUsers()}>{(user) =>
                    <div className={'system-user'}>
                        <div className={'system-user-info'}>
                            <div className={'system-user-info-group'}>
                                <div>
                                    <small>ID</small>
                                    <p className={'text-lg'}>{user.user_id}</p>
                                </div>
                                <div>
                                    <small>User Type</small>
                                    <p className={'text-lg'}>{user.user_type}</p>
                                </div>
                                <div>
                                    <small>Username</small>
                                    <p className={'text-lg'}>{user.username}</p>
                                </div>
                                <div>
                                    <small>Display Name</small>
                                    <p className={'text-lg'}>{user.display_name}</p>
                                </div>
                            </div>
                            <div className={'system-user-info-group'}>
                                <div>
                                    <small>Email Address</small>
                                    <p className={'text-lg'}>{user.email ? user.email : '-'}</p>
                                </div>
                                <div>
                                    <small>SMS</small>
                                    <p className={'text-lg'}>{user.sms ? user.sms : '-'}</p>
                                </div>
                            </div>
                        </div>
                        <div className={'system-user-buttons'}>
                            <button className={'btn'}
                                    onClick={() => {
                                        ctxSystem.setSystemUserSelected(user.user_id)
                                        ctxSystem.setTempEditSystemUser({
                                            ...user
                                        })
                                        ctxSystem.refSystemUserEditDialog.showModal()
                                    }}
                            >Edit
                            </button>
                            <button className={'btn'}
                                    onClick={() => {
                                        ctxSystem.setSystemUserSelected(user.user_id)
                                        ctxSystem.setResetSystemUserPassword('')
                                        ctxSystem.refSystemUserResetPasswordDialog.showModal()
                                    }}
                            >Reset Password
                            </button>
                            <button className={'btn-danger'}
                                    disabled={user.user_id === 1}
                                    onClick={() => {
                                        ctxSystem.setSystemUserSelected(user.user_id)
                                        ctxSystem.setTempDeleteSystemUser({
                                            ...user
                                        })
                                        ctxSystem.refSystemUserDeleteDialog.showModal()
                                    }}
                            >Delete
                            </button>
                        </div>
                    </div>
                }</For>
            </div>
            <SystemUsersAddDialog/>
            <SystemUsersEditDialog/>
            <SystemUsersSetPasswordDialog/>
            <SystemUsersDeleteDialog/>
        </>
    )

}