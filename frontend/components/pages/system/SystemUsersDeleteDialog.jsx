import {Show, useContext} from "solid-js";
import {ContextSystem} from "../../../contextManagers/ContextSystem";
import {ContextMain} from "../../../contextManagers/ContextMain";


export default function SystemUsersDeleteDialog() {

    const ctxMain = useContext(ContextMain)
    const ctxSystem = useContext(ContextSystem)

    function deleteSystemUser() {

        ctxMain.api.get(
            `/system/delete/user
            /${ctxSystem.tempDeleteSystemUser().username}
            /${ctxSystem.tempDeleteSystemUser().user_id}`
        ).then((res) => {
            if (res.ok) {
                ctxSystem.setSystemUsersDialogError('')
                ctxSystem.setTempDeleteSystemUser(ctxSystem.blankSystemUser)
                ctxSystem.refSystemUserDeleteDialog.close()
                ctxSystem.getAllSystemUsers()
                ctxMain.showSuccessToast('User deleted')
            } else {
                ctxSystem.setSystemUsersDialogError(`Error deleting user (${rpc.message})`)
            }
        })

    }

    return (
        <dialog ref={ctxSystem.refSystemUserDeleteDialog}>
            <div className={'flex flex-col gap-2 sticky top-0 pb-2'}>
                <div>
                    <p>Are you sure you want to delete the following account?</p>
                    <p className={'p-4 font-bold text-lg'}>
                        {ctxSystem.tempDeleteSystemUser().display_name} ({ctxSystem.tempDeleteSystemUser().username})
                    </p>
                </div>
                <Show when={ctxSystem.systemUsersDialogError() !== ''}>
                    <div className={'attention-danger -clickable'} onClick={
                        () => {
                            ctxSystem.setSystemUsersDialogError('')
                        }
                    }>
                        <p>{ctxSystem.systemUsersDialogError()}</p>
                        <p className={'text-xs'}>Click to close</p>
                    </div>
                </Show>
                <div className={'flex flex-row justify-between gap-2'}>
                    <button className={'btn-danger w-full'} onClick={() => {
                        deleteSystemUser()
                    }}>YES, DELETE
                    </button>
                    <button className={'btn w-full'} onClick={() => {
                        ctxSystem.setSystemUsersDialogError('')
                        ctxSystem.setTempEditSystemUser(ctxSystem.blankSystemUser)
                        ctxSystem.refSystemUserDeleteDialog.close()
                    }}>NO
                    </button>
                </div>
            </div>
        </dialog>
    )
}