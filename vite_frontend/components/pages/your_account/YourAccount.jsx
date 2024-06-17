import {createEffect, useContext} from "solid-js";
import {ContextMain} from "../../../contextManagers/ContextMain";


export default function YourAccount() {

    const ctxMain = useContext(ContextMain)

    return (
        <div className={'main-content-slim'}>
            <p>Your Account</p>
        </div>
    )

}