import {onMount, useContext} from "solid-js";
import {ContextSystem} from "../../../contextManagers/ContextSystem";
import {ContextMain} from "../../../contextManagers/ContextMain";

export default function SystemInformation() {

    const ctxMain = useContext(ContextMain)
    const ctxSystem = useContext(ContextSystem)

    onMount(() => {
        ctxMain.setMainMenuLocation('system')
        ctxSystem.setSystemSection('information')
    })

    return (
        <div className={'px-4'}>
            <h1 className={'m-0 pb-2'}>🤖Track-a-tron</h1>
            <p className={'font-bold'}>Track-a-tron is a simple CRM system for tracking things.</p>
            <small>Version: 1000</small>
            <p className={'pt-2'}>View the project on <a
                href="https://github.com/CheeseCake87/track-a-tron">GitHub</a></p>
        </div>
    )
}