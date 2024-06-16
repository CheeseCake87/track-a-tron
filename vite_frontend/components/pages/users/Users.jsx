import {createEffect, useContext} from "solid-js";
import {ContextMain} from "../../../contextManagers/ContextMain";


export default function Users() {

    const ctxMain = useContext(ContextMain)

    createEffect(() => {
        if (!ctxMain.loggedIn()) {
            ctxMain.navigator('/login')
        }
    })

    return (
        <p>Users</p>
    )

}