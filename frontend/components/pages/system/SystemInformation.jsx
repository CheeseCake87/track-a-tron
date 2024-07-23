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
        <div>
            <h1 className={'m-0 pb-2'}>🤖 Track-a-tron</h1>
            <p className={'font-bold'}>Track-a-tron is a simple system for tracking things.</p>

            <p className={'pt-2'}>View the project on <a
                target={'_blank'}
                href="https://github.com/CheeseCake87/track-a-tron"
            >GitHub</a></p>
            <p className={'pt-2'}><small>Version: 1000</small></p>
            <p><small>© 2024 David Carmichael, licensed under GNU AFFERO
                GENERAL PUBLIC LICENSE Version 3 (19 November 2007)</small></p>
            <p><small>A copy of this license can be <a
                target={'_blank'}
                href="https://github.com/CheeseCake87/track-a-tron/blob/main/LICENSE"
            >found here</a></small></p>
        </div>
    )
}