import {createEffect, useContext} from "solid-js";
import {ContextMain} from "../../../contextManagers/ContextMain";


export default function YourAccount() {

    const ctxMain = useContext(ContextMain)

    createEffect(() => {
        if (!ctxMain.loggedIn()) {
            ctxMain.navigator('/login')
        }
    })

    return (
        <p>Your Account</p>
    )

}