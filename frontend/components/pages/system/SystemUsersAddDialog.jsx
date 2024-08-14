import {For, Show, useContext} from "solid-js";
import {ContextSystem} from "../../../contextManagers/ContextSystem";
import {ContextMain} from "../../../contextManagers/ContextMain";


export default function SystemUsersAddDialog() {

    const ctxMain = useContext(ContextMain)
    const ctxSystem = useContext(ContextSystem)

    function addSystemUser() {

        ctxMain.api.post('/system/search/user',
            {
                where: {
                    username: ctxSystem.tempAddSystemUser().username
                }
            }).then((res) => {
            if (res.ok) {
                ctxSystem.setSystemUsersDialogError('Username already exists, please choose another')
                return
            }
            if (ctxSystem.tempAddSystemUser().username === '') {
                ctxSystem.setSystemUsersDialogError('Username cannot be blank')
                return
            }
            if (ctxSystem.tempAddSystemUser().password === '') {
                ctxSystem.setSystemUsersDialogError('Password cannot be blank')
                return
            }
            if (ctxSystem.tempAddSystemUser().password.length < 8) {
                ctxSystem.setSystemUsersDialogError('Password must be at least 8 characters')
                return
            }
            if (ctxSystem.tempAddSystemUser().display_name === '') {
                ctxSystem.setSystemUsersDialogError('Display name cannot be blank')
                return
            }

            ctxMain.api.post('/system/create/user', ctxSystem.tempAddSystemUser()).then((res) => {
                if (res.ok) {
                    ctxSystem.setSystemUsersDialogError('')
                    ctxSystem.setTempAddSystemUser(ctxSystem.blankSystemUser)
                    ctxSystem.refSystemUserAddDialog.close()
                    ctxSystem.getAllSystemUsers()
                    ctxMain.showSuccessToast('User created')
                } else {
                    ctxSystem.setSystemUsersDialogError('')
                    ctxSystem.setTempAddSystemUser(ctxSystem.blankSystemUser)
                    ctxSystem.refSystemUserAddDialog.close()
                    ctxSystem.setSystemUsersDialogError(`Error creating user ${res.message}`)
                }
            })

        })

    }

    return (
        <dialog ref={ctxSystem.refSystemUserAddDialog}>
            <div className={'py-2'}>
                <label>User Type</label>
                <select className={'w-full'}
                        onChange={
                            (e) => {
                                ctxSystem.setTempAddSystemUser({
                                    ...ctxSystem.tempAddSystemUser(),
                                    user_type: e.target.value
                                })
                            }
                        }>
                    <For each={ctxSystem.systemUserTypes}>{(type) =>
                        <option value={type}>{type}</option>
                    }</For>
                </select>
            </div>
            <div className={'py-2'}>
                <label>Username</label>
                <input type={'text'} className={'w-full'} onKeyUp={
                    (e) => {
                        ctxSystem.setTempAddSystemUser({
                            ...ctxSystem.tempAddSystemUser(),
                            username: e.target.value
                        })
                    }
                } value={ctxSystem.tempAddSystemUser().username}/>
            </div>
            <div className={'py-2'}>
                <label>Password</label>
                <input type={'password'} className={'w-full'} onKeyUp={
                    (e) => {
                        ctxSystem.setTempAddSystemUser({
                            ...ctxSystem.tempAddSystemUser(),
                            password: e.target.value
                        })
                    }
                } value={ctxSystem.tempAddSystemUser().password}/>
            </div>
            <div className={'py-2'}>
                <label>Display Name</label>
                <input type={'text'} className={'w-full'} onKeyUp={
                    (e) => {
                        ctxSystem.setTempAddSystemUser({
                            ...ctxSystem.tempAddSystemUser(),
                            display_name: e.target.value
                        })
                    }
                } value={ctxSystem.tempAddSystemUser().display_name}/>
            </div>
            <div className={'pt-2'}>
                <strong>Notifications</strong>
            </div>
            <div className={'py-2'}>
                <label>Email Address</label>
                <input type={'email'} className={'w-full'} onKeyUp={
                    (e) => {
                        ctxSystem.setTempAddSystemUser({
                            ...ctxSystem.tempAddSystemUser(),
                            email: e.target.value
                        })
                    }
                } value={ctxSystem.tempAddSystemUser().email}/>
            </div>
            <div className={'py-2'}>
                <label>SMS</label>
                <input type={'text'} className={'w-full'} onKeyUp={
                    (e) => {
                        ctxSystem.setTempAddSystemUser({
                            ...ctxSystem.tempAddSystemUser(),
                            sms: e.target.value
                        })
                    }
                } value={ctxSystem.tempAddSystemUser().sms}/>
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
                        ctxSystem.setTempAddSystemUser(ctxSystem.blankSystemUser)
                        ctxSystem.refSystemUserAddDialog.close()
                    }}>𝗑 Cancel
                    </button>
                    <button className={'btn-good'} onClick={() => {
                        addSystemUser()
                    }}>Create User
                    </button>
                </div>
            </div>
        </dialog>
    )
}