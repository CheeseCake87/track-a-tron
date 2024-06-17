import {onMount, useContext} from "solid-js";
import {ContextMain} from "../../../contextManagers/ContextMain";


export default function Account() {

    const ctxMain = useContext(ContextMain)

    onMount(() => {
        ctxMain.setMainMenuLocation('account')

    })

    return (
        <div className={'main-content-slim'}>
            <p>Your Account</p>
        </div>
    )

}