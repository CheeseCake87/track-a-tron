import {For, onMount, Show, useContext} from "solid-js";
import {ContextSystem} from "../../../contextManagers/ContextSystem";
import {ContextMain} from "../../../contextManagers/ContextMain";


export default function SystemLogs() {

    const ctxMain = useContext(ContextMain)
    const ctxSystem = useContext(ContextSystem)

    onMount(() => {
        ctxMain.setMainMenuLocation('system')
        ctxSystem.setSystemSection('logs')
        ctxSystem.getAllSystemLogs()
    })

    return (
        <>
            <div className={'system-users'}>
                <Show when={ctxSystem.systemLogs()} fallback={
                    <div className={'system-user'}>
                        No logs found
                    </div>
                }>
                    <For each={ctxSystem.systemLogs()}>{(log) =>
                        <div className={'system-user'}>
                            {log}
                        </div>
                    }</For>
                </Show>
            </div>
        </>
    )

}