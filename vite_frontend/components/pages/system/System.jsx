import {createSignal, onMount, Show} from "solid-js";
import SystemServices from "./SystemServices";
import SystemInformation from "./SystemInformation";
import SystemSubMenu from "./SystemSubMenu";
import SystemUsers from "./SystemUsers";


export default function System() {
    const [systemSection, setSystemSection] = createSignal('information')

    onMount(() => {
        setSystemSection('information')
    })

    return (
        <div className={'main-content-slim-row'}>
            <SystemSubMenu systemSection={systemSection} setSystemSection={setSystemSection}/>
            <div className={'sub-content'}>
                <Show when={systemSection() === 'information'}>
                    <SystemInformation/>
                </Show>
                <Show when={systemSection() === 'users'}>
                    <SystemUsers/>
                </Show>
                <Show when={systemSection() === 'services'}>
                    <SystemServices systemSection={systemSection}/>
                </Show>
            </div>
        </div>
    )
}