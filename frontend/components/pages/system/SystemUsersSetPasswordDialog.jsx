import {Show, useContext} from "solid-js";
import {ContextSystem} from "../../../contextManagers/ContextSystem";
import {ContextMain} from "../../../contextManagers/ContextMain";


export default function SystemUsersSetPasswordDialog() {

    const ctxMain = useContext(ContextMain)
    const ctxSystem = useContext(ContextSystem)

    function updateSystemUserPassword() {

        ctxMain.api.post(`/system/update/user/${ctxSystem.systemUserSelected()}/password`, {
            new_password: ctxSystem.resetSystemUserPassword(),
            forced: true
        }).then((res) => {
            if (res.ok) {
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
            <div className={'flex flex-col gap-2 sticky bottom-0 pb-2'}>
                <Show when={ctxSystem.systemUsersDialogError() !== ''}>
                    <div className={'attention-danger -clickable'} onClick={
                        () => {
                            ctxSystem.setSystemUsersDialogError('')
                        }
                    }>
                        {ctxSystem.systemUsersDialogError()}
                    </div>
                </Show>
                <div className={'flex flex-row justify-between mt-4'}>
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
            </div>
        </dialog>
    )
}