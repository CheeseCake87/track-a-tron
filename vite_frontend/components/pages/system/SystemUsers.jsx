import {createSignal, For, onMount, Show, useContext} from "solid-js";
import {ContextSystem} from "../../../contextManagers/ContextSystem";
import {ContextMain} from "../../../contextManagers/ContextMain";
import rpc_get_all_users from "../../../rpc/system/rpc_get_all_users";


export default function SystemUsers() {

    const ctxMain = useContext(ContextMain)
    const ctxSystem = useContext(ContextSystem)

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

    const userTypes = ["user", "manager", "admin"]

    const [dialogError, setDialogError] = createSignal('')
    const [systemUsers, setSystemUsers] = createSignal([])
    const [addUser, setAddUser] = createSignal(blankSystemUser)
    const [editUser, setEditUser] = createSignal(blankSystemUser)

    let refSystemUserAddDialog;
    let refSystemUserEditDialog;

    onMount(() => {
        rpc_get_all_users().then((rpc) => {
            if (rpc.ok) {
                setSystemUsers(rpc.data)
            } else {
                ctxMain.showErrorToast("Error getting users")
            }
        })
        ctxMain.setMainMenuLocation('system')
        ctxSystem.setSystemSection('users')
    })

    return (
        <>
            <div className={'system-users-header'}>
                <button className={'btn-good'} onClick={() => {
                    setAddUser(blankSystemUser)
                    refSystemUserAddDialog.showModal()
                }}>+ Add User</button>
            </div>
            <div className={'system-users'}>
                <For each={systemUsers()}>{(user) =>
                    <div className={'system-user'}>
                        <div className={'system-user-info'}>
                            <div>
                                <small>Username</small>
                                <p className={'text-lg'}>{user.username}</p>
                            </div>
                            <div>
                                <small>Display Name</small>
                                <p className={'text-lg'}>{user.display_name}</p>
                            </div>
                            <div>
                                <small>User Type</small>
                                <p className={'text-lg'}>{user.user_type}</p>
                            </div>
                            <div>
                                <small>Email Address</small>
                                <p className={'text-lg'}>{user.email ? user.email : '-'}</p>
                            </div>
                            <div>
                                <small>SMS</small>
                                <p className={'text-lg'}>{user.sms ? user.sms : '-'}</p>
                            </div>
                            <div>
                                <small>Account Disabled?</small>
                                <p className={'text-lg'}>{user.disabled ? 'Yes' : 'No'}</p>
                            </div>
                        </div>
                        <div className={'system-user-buttons'}>
                            <button className={'btn'}>Edit</button>
                            <button className={'btn-danger'}>Delete</button>
                        </div>
                    </div>
                }</For>
            </div>
            <dialog ref={refSystemUserAddDialog}>
                <div className={'flex flex-row gap-2 sticky top-0 pb-2'}>
                <button className={'btn'} onClick={() => {
                    refSystemUserAddDialog.close()
                }}>𝗑 Cancel
                </button>
                    <button className={'btn-good'} onClick={() => {
                    setDialogError('username cannot be blank')
                }}>Create User
                </button>
                </div>
                <Show when={dialogError() !== ''}>
                    <div className={'attention-danger'}>
                        {dialogError()}
                    </div>
                </Show>
                <div className={'py-2'}>
                    <label>Username</label>
                    <input type={'text'} className={'w-full'} onKeyUp={
                        (e) => {
                            setAddUser({
                                ...addUser(),
                                username: e.target.value
                            })
                        }
                    } value={addUser().username}/>
                </div>
                <div className={'py-2'}>
                    <label>Password</label>
                    <input type={'password'} className={'w-full'} onKeyUp={
                        (e) => {
                            setAddUser({
                                ...addUser(),
                                password: e.target.value
                            })
                        }
                    } value={addUser().password}/>
                </div>
                <div className={'py-2'}>
                    <label>Display Name</label>
                    <input type={'text'} className={'w-full'} onKeyUp={
                        (e) => {
                            setAddUser({
                                ...addUser(),
                                display_name: e.target.value
                            })
                        }
                    } value={addUser().display_name}/>
                </div>
                <div className={'py-2'}>
                    <label>User Type</label>
                    <select className={'w-full'} className={'w-full'} onChange={
                        (e) => {
                            setAddUser({
                                ...addUser(),
                                user_type: e.target.value
                            })
                        }
                    }>
                        <For each={userTypes}>{(type) =>
                            <option value={type}>{type}</option>
                        }</For>
                    </select>
                </div>
            </dialog>
        </>
    )

}