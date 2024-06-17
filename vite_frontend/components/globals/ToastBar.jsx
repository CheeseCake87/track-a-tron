import {createEffect, createSignal, Show, useContext} from "solid-js";
import {ContextMain} from "../../contextManagers/ContextMain";
import {ConfirmedIcon, ErrorIcon, InfoIcon} from "./Icons";

export default function ToastBar(props) {
    const ctxMain = useContext(ContextMain)

    const [showToastBar, setShowToastBar] = createSignal(false)
    const [toastBarFadeIn, setToastBarFadeIn] = createSignal(false)
    const [cacheToastBarMessage, setCacheToastBarMessage] = createSignal('')

    let toastBarTimeout = null
    let toastBarTimeoutFadeOut = null

    createEffect(() => {
        if (ctxMain.toastBarMessage() !== '') {
            setShowToastBar(true)
            setToastBarFadeIn(true)
            setCacheToastBarMessage(ctxMain.toastBarMessage())

            clearTimeout(toastBarTimeoutFadeOut)
            toastBarTimeoutFadeOut = setTimeout(() => {
                setToastBarFadeIn(false)

                clearTimeout(toastBarTimeout)
                toastBarTimeout = setTimeout(() => {
                    ctxMain.setToastBarMessage('')
                }, 200)

            }, 4000)
        } else {
            setShowToastBar(false)
        }
    })

    return (
        <Show when={showToastBar()}>
            <div className={toastBarFadeIn() ? 'toast-bar-fade-in' : 'toast-bar-fade-out'}
                 onMouseOver={() => {
                     clearTimeout(toastBarTimeoutFadeOut)
                     clearTimeout(toastBarTimeout)
                 }}>
                <div className={'flex gap-2'}>
                    {ctxMain.toastBarType() === 'error' ? <ErrorIcon color={'#ff8484'}/> : null}
                    {ctxMain.toastBarType() === 'success' ? <ConfirmedIcon color={'#4f9d4f'}/> : null}
                    {ctxMain.toastBarType() === 'info' ? <InfoIcon color={'#ffbf2d'}/> : null}
                    {cacheToastBarMessage()}
                </div>
            </div>
        </Show>
    )
}