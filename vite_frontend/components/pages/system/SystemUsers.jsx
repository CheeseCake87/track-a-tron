import {createSignal, For, onMount, useContext} from "solid-js";
import {ContextSystem} from "../../../contextManagers/ContextSystem";
import {ContextMain} from "../../../contextManagers/ContextMain";
import rpc_get_all_users from "../../../rpc/system/rpc_get_all_users";


export default function SystemUsers() {

    const ctxMain = useContext(ContextMain)
    const ctxSystem = useContext(ContextSystem)

    const [systemUsers, setSystemUsers] = createSignal([])

    onMount(() => {
        rpc_get_all_users().then((rpc) => {
            if (rpc.ok) {
                console.log(rpc)
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
                <button className={'btn-good'}>+ Add User</button>
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
        </>
    )

}