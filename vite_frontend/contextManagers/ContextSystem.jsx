import {createContext, createSignal} from "solid-js";
import {Outlet} from "@solidjs/router";
import SystemSubMenu from "../components/menus/SystemSubMenu";

export const ContextSystem = createContext()

export function SystemContextProvider() {

    const [systemSection, setSystemSection] = createSignal('information')

    return (
        <ContextSystem.Provider value={{
            systemSection,
            setSystemSection
        }}>
            <div className={'main-content-slim-row'}>
                <SystemSubMenu/>
                <div className={'sub-content'}>
                    <Outlet/>
                </div>
            </div>
        </ContextSystem.Provider>
    )
}