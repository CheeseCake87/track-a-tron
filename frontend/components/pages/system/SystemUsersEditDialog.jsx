import {For, Show, useContext} from "solid-js";
import {ContextSystem} from "../../../contextManagers/ContextSystem";
import {ContextMain} from "../../../contextManagers/ContextMain";


export default function SystemUsersEditDialog() {

    const ctxMain = useContext(ContextMain)
    const ctxSystem = useContext(ContextSystem)

    function updateSystemUser() {
        if (ctxSystem.tempEditSystemUser().username === '') {
            ctxSystem.setSystemUsersDialogError('Username cannot be blank')
            return
        }
        if (ctxSystem.tempEditSystemUser().display_name === '') {
            ctxSystem.setSystemUsersDialogError('Display name cannot be blank')
            return
        }

        ctxMain.api.post(
            '/system/search/user',
            {where: {username: ctxSystem.tempEditSystemUser().username}}
        ).then((res) => {
            if (res.ok) {

                if (res.data.user_id === ctxSystem.tempEditSystemUser().user_id) {
                    // This is the same user, so it's OK
                } else {
                    ctxSystem.setSystemUsersDialogError('Username already exists, please choose another')
                    return
                }

                ctxMain.api.post(
                    `/system/update/user/${ctxSystem.tempEditSystemUser().user_id}`,
                    {
                        username: ctxSystem.tempEditSystemUser().username,
                        display_name: ctxSystem.tempEditSystemUser().display_name,
                        email: ctxSystem.tempEditSystemUser().email,
                        sms: ctxSystem.tempEditSystemUser().sms,
                        user_type: ctxSystem.tempEditSystemUser().user_type,
                    }
                ).then((ires) => {
                    if (ires.ok) {
                        ctxSystem.setSystemUsersDialogError('')
                        ctxSystem.setTempEditSystemUser(ctxSystem.blankSystemUser)
                        ctxSystem.refSystemUserEditDialog.close()
                        ctxSystem.getAllSystemUsers()
                        ctxMain.showSuccessToast('User updated')
                    } else {
                        ctxSystem.setSystemUsersDialogError(`Error updating user ${ires.message}`)
                    }
                })

            }
        })
    }

    return (
        <dialog ref={ctxSystem.refSystemUserEditDialog}>
            <div className={'py-2'}>
                <label>User Type</label>
                <select className={'w-full'}
                        onChange={
                            (e) => {
                                ctxSystem.setTempEditSystemUser({
                                    ...ctxSystem.tempEditSystemUser(),
                                    user_type: e.target.value
                                })
                            }
                        } disabled={ctxSystem.tempEditSystemUser().user_id === 1}>
                    <For each={ctxSystem.systemUserTypes}>{(type) =>
                        <option value={type}
                                selected={ctxSystem.tempEditSystemUser().user_type === type}
                        >{type}</option>
                    }</For>
                </select>
            </div>
            <div className={'py-2'}>
                <label>Username</label>
                <input type={'text'} className={'w-full'} onKeyUp={
                    (e) => {
                        ctxSystem.setTempEditSystemUser({
                            ...ctxSystem.tempEditSystemUser(),
                            username: e.target.value
                        })
                    }
                } value={ctxSystem.tempEditSystemUser().username}/>
            </div>
            <div className={'py-2'}>
                <label>Display Name</label>
                <input type={'text'} className={'w-full'} onKeyUp={
                    (e) => {
                        ctxSystem.setTempEditSystemUser({
                            ...ctxSystem.tempEditSystemUser(),
                            display_name: e.target.value
                        })
                    }
                } value={ctxSystem.tempEditSystemUser().display_name}/>
            </div>
            <div className={'pt-2'}>
                <strong>Notifications</strong>
            </div>
            <div className={'py-2'}>
                <label>Email Address</label>
                <input type={'email'} className={'w-full'} onKeyUp={
                    (e) => {
                        ctxSystem.setTempEditSystemUser({
                            ...ctxSystem.tempEditSystemUser(),
                            email: e.target.value
                        })
                    }
                } value={ctxSystem.tempEditSystemUser().email}/>
            </div>
            <div className={'py-2'}>
                <label>SMS</label>
                <input type={'text'} className={'w-full'} onKeyUp={
                    (e) => {
                        ctxSystem.setTempEditSystemUser({
                            ...ctxSystem.tempEditSystemUser(),
                            sms: e.target.value
                        })
                    }
                } value={ctxSystem.tempEditSystemUser().sms}/>
            </div>
            <div className={'flex flex-col gap-2 sticky bottom-0 mt-4'}>
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
                    <button className={'btn'} onClick={() => {
                        ctxSystem.setSystemUsersDialogError('')
                        ctxSystem.setTempEditSystemUser(ctxSystem.blankSystemUser)
                        ctxSystem.refSystemUserEditDialog.close()
                    }}>𝗑 Cancel
                    </button>
                    <button className={'btn-good'} onClick={() => {
                        updateSystemUser()
                    }}>Update User
                    </button>
                </div>
            </div>
        </dialog>
    )
}