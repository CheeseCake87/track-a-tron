import {createEffect, useContext} from "solid-js";
import {ContextMain} from "../../../contextManagers/ContextMain";


export default function SystemUsers() {

    const ctxMain = useContext(ContextMain)

    return (
        <div className={'main-content-slim'}>
            <p>Users</p>
        </div>
    )

}