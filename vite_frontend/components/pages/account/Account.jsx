import {createSignal, onMount, useContext} from "solid-js";
import {ContextMain} from "../../../contextManagers/ContextMain";
import rpc_get_system_user from "../../../rpc/system/rpc_get_system_user";
import rpc_update_system_user from "../../../rpc/system/rpc_update_system_user";
import rpc_change_system_user_password from "../../../rpc/system/rpc_change_system_user_password";


export default function Account() {

    const ctxMain = useContext(ContextMain)

    const blankSystemUser = {
        username: '',
        display_name: '',
        email: '',
        sms: '',
    }

    const [systemUser, setSystemUser] = createSignal(blankSystemUser)

    const [currentPassword, setCurrentPassword] = createSignal('')
    const [newPassword, setNewPassword] = createSignal('')
    const [confirmNewPassword, setConfirmNewPassword] = createSignal('')

    function updateSystemUser() {
        // API call to update system user
        if (systemUser().display_name === '') {
            ctxMain.showErrorToast('Display Name cannot be empty.')
            return
        }
        rpc_update_system_user(ctxMain.userId(), {
            display_name: systemUser().display_name,
            email: systemUser().email,
            sms: systemUser().sms
        }).then((rpc) => {
            if (rpc.ok) {
                ctxMain.showSuccessToast('Account updated.')
            } else {
                ctxMain.showErrorToast(rpc.message)
            }
        })
    }

    function changePassword() {
        // API call to change password
        if (currentPassword() === '') {
            ctxMain.showErrorToast('Current Password cannot be empty.')
            return
        }
        if (newPassword() === '') {
            ctxMain.showErrorToast('New Password cannot be empty.')
            return
        }
        if (newPassword().length < 8) {
            ctxMain.showErrorToast('Password must be at least 8 characters.')
            return
        }
        if (newPassword() !== confirmNewPassword()) {
            ctxMain.showErrorToast('Passwords do not match.')
            return
        }
        rpc_change_system_user_password(
            ctxMain.userId(),
            currentPassword(),
            newPassword()
        ).then((rpc) => {
            if (rpc.ok) {
                ctxMain.showSuccessToast('Password updated.')
            } else {
                ctxMain.showErrorToast(rpc.message)
            }
        })
    }

    onMount(() => {
        ctxMain.setMainMenuLocation('account')
        rpc_get_system_user({where: {user_id: ctxMain.userId()}}).then((rpc) => {
            if (rpc.ok) {
                setSystemUser({
                    username: rpc.data.username,
                    display_name: rpc.data.display_name,
                    email: rpc.data.email,
                    sms: rpc.data.sms
                })
                setNewPassword('')
                setCurrentPassword('')
                setConfirmNewPassword('')
            } else {
                ctxMain.showErrorToast(rpc.message)
            }
        })
    })

    return (
        <div className={'main-content-slim gap-2'}>
            <div className={'sectioned-content w-full'}>
                <form onSubmit={
                    (e) => {
                        e.preventDefault()
                    }
                }>
                    <div className={'form-section mb-2'}>
                        <div className={'field-group'}>
                            <div className={'py-2'}>
                                <label>Username</label>
                                <input type={'text'} value={systemUser().username} disabled/>
                            </div>
                        </div>
                        <div className={'attention-warning'}>
                            Username can only be changed by an administrator.
                        </div>
                        <div className={'field-group'}>
                            <div className={'py-2'}>
                                <label>Display Name</label>
                                <input type={'text'} onKeyUp={
                                    (e) => {
                                        setSystemUser({
                                            ...systemUser(),
                                            display_name: e.target.value
                                        })
                                    }
                                } value={systemUser().display_name}/>
                            </div>
                        </div>
                        <strong className={'mt-2'}>Notifications</strong>
                        <div className={'field-group'}>
                            <div className={'py-2'}>
                                <label>Email</label>
                                <input type={'text'} onKeyUp={
                                    (e) => {
                                        setSystemUser({
                                            ...systemUser(),
                                            email: e.target.value
                                        })
                                    }
                                } value={systemUser().email}/>
                            </div>
                            <div className={'py-2'}>
                                <label>SMS</label>
                                <input type={'text'} onKeyUp={
                                    (e) => {
                                        setSystemUser({
                                            ...systemUser(),
                                            sms: e.target.value
                                        })
                                    }
                                } value={systemUser().sms}/>
                            </div>
                        </div>
                    </div>
                    <button className={'btn-confirm'} onClick={() =>{
                        updateSystemUser()
                    }}>Update</button>
                </form>
            </div>
            <div className={'sectioned-content w-full'}>
                <form onSubmit={
                    (e) => {
                        e.preventDefault()
                    }
                }>
                    <div className={'form-section mb-2'}>
                        <div className={'field-group'}>
                            <div className={'py-2'}>
                                <label>Current Password</label>
                                <input type={'password'} onKeyUp={
                                    (e) => {
                                        setCurrentPassword(e.target.value)
                                    }
                                } value={currentPassword()
                                }/>
                            </div>
                        </div>
                        <div className={'field-group'}>
                            <div className={'py-2'}>
                                <label>New Password</label>
                                <input type={'password'} onKeyUp={
                                    (e) => {
                                        setNewPassword(e.target.value)
                                    }
                                } value={newPassword()
                                }/>
                            </div>
                        </div>
                        <div className={'field-group'}>
                            <div className={'py-2'}>
                                <label>Confirm New Password</label>
                                <input type={'password'} onKeyUp={
                                    (e) => {
                                        setConfirmNewPassword(e.target.value)
                                    }
                                } value={confirmNewPassword()
                                }/>
                            </div>
                        </div>
                    </div>
                    <button className={'btn-confirm'} onClick={() =>{
                        changePassword()
                    }}>Change Password</button>
                </form>
            </div>
        </div>
    )

}