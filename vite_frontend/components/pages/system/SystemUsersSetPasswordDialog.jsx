import {Show, useContext} from "solid-js";
import {ContextSystem} from "../../../contextManagers/ContextSystem";
import rpc_update_system_user_password from "../../../rpc/system/rpc_update_system_user_password";
import {ContextMain} from "../../../contextManagers/ContextMain";


export default function SystemUsersSetPasswordDialog() {

    const ctxMain = useContext(ContextMain)
    const ctxSystem = useContext(ContextSystem)

    function updateSystemUserPassword() {
        rpc_update_system_user_password(
            ctxSystem.systemUserSelected(),
            ctxSystem.resetSystemUserPassword()
        ).then((rpc) => {
            if (rpc.ok) {
                ctxSystem.refSystemUserResetPasswordDialog.close()
                ctxSystem.setSystemUsersDialogError('')
                ctxSystem.setResetSystemUserPassword('')
            } else {
                ctxSystem.setSystemUsersDialogError(`Error updating password (${rpc.message})`)
            }
        })
    }

    return (
        <dialog ref={ctxSystem.refSystemUserResetPasswordDialog}>
            <div className={'flex flex-col gap-2 sticky top-0 pb-2'}>
                <div className={'flex flex-row gap-2'}>
                    <button className={'btn'} onClick={() => {
                        ctxSystem.setSystemUsersDialogError('')
                        ctxSystem.setResetSystemUserPassword('')
                        ctxSystem.refSystemUserResetPasswordDialog.close()
                    }}>𝗑 Cancel
                    </button>
                    <button className={'btn-good'} onClick={() => {
                        updateSystemUserPassword()
                        ctxMain.showSuccessToast('User\'s password set')
                    }}>Set Password
                    </button>
                </div>
                <Show when={ctxSystem.systemUsersDialogError() !== ''}>
                    <div className={'attention-danger -clickable'} onClick={
                        () => {
                            ctxSystem.setSystemUsersDialogError('')
                        }
                    }>
                        {ctxSystem.systemUsersDialogError()}
                    </div>
                </Show>
            </div>

            <div className={'py-2'}>
                <label>New Password</label>
                <input type={'password'} className={'w-full'} onKeyUp={
                    (e) => {
                        ctxSystem.setResetSystemUserPassword(
                            e.target.value
                        )
                    }
                } value={ctxSystem.resetSystemUserPassword()}/>
            </div>
        </dialog>
    )
}