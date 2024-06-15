import {createEffect, useContext} from "solid-js";
import {ContextMain} from "../../../contextManagers/ContextMain";


export default function System() {

    const mainCtx = useContext(ContextMain)

    createEffect(() => {
        if (!mainCtx.loggedIn()) {
            mainCtx.navigator('/login')
        }
    })

    return (
        <p>System</p>
    )

}