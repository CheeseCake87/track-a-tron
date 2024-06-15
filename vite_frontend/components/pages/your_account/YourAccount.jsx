import {createEffect, useContext} from "solid-js";
import {ContextMain} from "../../../contextManagers/ContextMain";


export default function YourAccount() {

    const mainCtx = useContext(ContextMain)

    createEffect(() => {
        if (!mainCtx.loggedIn()) {
            mainCtx.navigator('/login')
        }
    })

    return (
        <p>Your Account</p>
    )

}