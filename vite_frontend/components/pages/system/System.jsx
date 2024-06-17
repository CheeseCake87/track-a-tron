import {createEffect, createSignal, onMount, Show, useContext} from "solid-js";
import {ContextMain} from "../../../contextManagers/ContextMain";
import {EyeClosedIcon, EyeOpenIcon} from "../../globals/Icons";


export default function System() {

    const ctxMain = useContext(ContextMain)

    const [error, setError] = createSignal('')

    // GetAddress
    const [getAddressService, setAddressService] = createSignal({
        api_key: '',
        administration_key: '',
    })
    const [enableGetAddressService, setEnableGetAddressService] = createSignal(false)
    const [showGetAddressApiKey, setShowGetAddressApiKey] = createSignal(false)
    // const [showGetAddressAdminKey, setShowGetAddressAdminKey] = createSignal(false)

    // Zepto
    const [zeptoService, setZeptoService] = createSignal({
        sender: '',
        api_url: '',
        token: '',
    })
    const [enableZeptoService, setEnableZeptoService] = createSignal(false)
    const [showZeptoToken, setShowZeptoToken] = createSignal(false)

    // SMTP
    const [smtpService, setSmtpService] = createSignal({
        username: '',
        password: '',
        server: '',
        port: 0,
    })
    const [enableSmtpService, setEnableSmtpService] = createSignal(false)
    const [showSmtpPassword, setShowSmtpPassword] = createSignal(false)

    function GetAddressService() {
        return <div className={'attention'}>
            <div className={'field-group'}>
                <div className={'checkbox'}>
                    <input type={'checkbox'}
                           id={'get_address_service'}
                           name={'get_address_service'}
                           checked={enableGetAddressService()}
                           onChange={(e) => setEnableGetAddressService(e.target.checked)}
                    />
                    <label for={'get_address_service'}>
                        Enable GetAddress API Service
                    </label>
                </div>
            </div>
            <Show when={enableGetAddressService()}>
                <div className={'field-group p-2'}>
                    <div className={'py-2 w-full'}>
                        <label htmlFor={'get_address_api_key'}
                               className={'select-none'}>
                            GetAddress API Key:
                        </label>
                        <div className={'inline-action-right'}>
                            <input id={'get_address_api_key'}
                                   type={showGetAddressApiKey() ? 'text' : 'password'}
                                   value={getAddressService().api_key}
                                   onChange={(e) => setAddressService({
                                       ...getAddressService(),
                                       api_key: e.target.value
                                   })}/>
                            <div onMouseDown={() => setShowGetAddressApiKey(true)}
                                 onMouseUp={() => setShowGetAddressApiKey(false)}>
                                {showGetAddressApiKey()
                                    ? <EyeOpenIcon size={14}/>
                                    : <EyeClosedIcon size={14}/>}
                            </div>
                        </div>
                    </div>
                    {/*
                    <div className={'py-2'}>
                        <label htmlFor={'get_address_admin_key'}
                               className={'select-none'}>
                            Administration Key:
                        </label>
                        <div className={'inline-action-right'}>
                            <input id={'get_address_admin_key'}
                                   type={showGetAddressAdminKey() ? 'text' : 'password'}
                                   value={getAddressService().administration_key}
                                   onChange={(e) => setAddressService({
                                       ...getAddressService(),
                                       administration_key: e.target.value
                                   })}/>
                            <div onMouseDown={() => setShowGetAddressAdminKey(true)}
                                 onMouseUp={() => setShowGetAddressAdminKey(false)}>
                                {showGetAddressAdminKey()
                                    ? <EyeOpenIcon size={14}/>
                                    : <EyeClosedIcon size={14}/>}
                            </div>
                        </div>
                    </div>
                    */}
                </div>
            </Show>
        </div>
    }

    function ZeptoService() {
        return <div className={'attention'}>
            <div className={'field-group'}>
                <div className={'checkbox'}>
                    <input type={'checkbox'}
                           id={'zepto_service'}
                           name={'zepto_service'}
                           checked={enableZeptoService()}
                           onChange={(e) => setEnableZeptoService(e.target.checked)}
                    />
                    <label for={'zepto_service'}>
                        Enable Zepto Service
                    </label>
                </div>
            </div>
            <Show when={enableZeptoService()}>

                <div className={'flex flex-col p-2'}>
                    <div className={'py-2'}>
                        <label htmlFor={'zepto_sender'}
                               className={'select-none'}>
                            Sender:
                        </label>
                        <input id={'zepto_sender'}
                               type="text"
                               value={zeptoService().sender}
                               onChange={(e) => setZeptoService({
                                   ...zeptoService(),
                                   sender: e.target.value
                               })}/>
                    </div>
                    <div className={'py-2'}>
                        <label htmlFor={'zepto_api_url'}
                               className={'select-none'}>
                            API URL:
                        </label>
                        <input id={'zepto_api_url'}
                               type="text"
                               value={zeptoService().api_url}
                               onChange={(e) => setZeptoService({
                                   ...zeptoService(),
                                   api_url: e.target.value
                               })}/>
                    </div>
                    <div className={'py-2'}>
                        <label htmlFor={'zepto_token'}
                               className={'select-none'}>
                            Token:
                        </label>
                        <div className={'inline-action-right'}>
                            <input id={'zepto_token'}
                                   type={showZeptoToken() ? 'text' : 'password'}
                                   value={zeptoService().token}
                                   onChange={(e) => setZeptoService({
                                       ...zeptoService(),
                                       token: e.target.value
                                   })}/>
                            <div onMouseDown={() => setShowZeptoToken(true)}
                                 onMouseUp={() => setShowZeptoToken(false)}>
                                {showZeptoToken()
                                    ? <EyeOpenIcon size={14}/>
                                    : <EyeClosedIcon size={14}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </Show>
        </div>
    }

    function SmtpService() {
        return <div className={'attention'}>
            <div className={'field-group'}>
                <div className={'checkbox'}>
                    <input type={'checkbox'}
                           id={'smtp_service'}
                           name={'smtp_service'}
                           checked={enableSmtpService()}
                           onChange={(e) => setEnableSmtpService(e.target.checked)}
                    />
                    <label for={'smtp_service'}>
                        Enable SMTP Service
                    </label>
                </div>
            </div>
            <Show when={enableSmtpService()}>

                <div className={'flex flex-col p-2'}>
                    <div className={'py-2'}>
                        <label htmlFor={'smtp_server'}
                               className={'select-none'}>
                            Server:
                        </label>
                        <input id={'smtp_server'}
                               type="text"
                               value={smtpService().server}
                               onChange={(e) => setSmtpService({
                                   ...smtpService(),
                                   server: e.target.value
                               })}/>
                    </div>
                    <div className={'py-2'}>
                        <label htmlFor={'smtp_port'}
                               className={'select-none'}>
                            Port:
                        </label>
                        <input id={'smtp_port'}
                               type="number"
                               value={smtpService}
                               onChange={(e) => setSmtpService({
                                   ...smtpService(),
                                   port: e.target.value
                               })}/>
                    </div>
                    <div className={'py-2'}>
                        <label htmlFor={'smtp_username'}
                               className={'select-none'}>
                            Username:
                        </label>
                        <input id={'smtp_username'}
                               type="text"
                               value={smtpService().username}
                               onChange={(e) => setSmtpService({
                                   ...smtpService(),
                                   username: e.target.value
                               })}/>
                    </div>
                    <div className={'py-2'}>
                        <label htmlFor={'smtp_password'}
                               className={'select-none'}>
                            Password:
                        </label>
                        <div className={'inline-action-right'}>
                            <input id={'smtp_password'}
                                   type={showSmtpPassword() ? 'text' : 'password'}
                                   value={smtpService().password}
                                   onChange={(e) => setSmtpService({
                                       ...smtpService(),
                                       password: e.target.value
                                   })}/>
                            <div onMouseDown={() => setShowSmtpPassword(true)}
                                 onMouseUp={() => setShowSmtpPassword(false)}>
                                {showSmtpPassword()
                                    ? <EyeOpenIcon size={14}/>
                                    : <EyeClosedIcon size={14}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </Show>
        </div>
    }

    onMount(() => {

    })

    return (
        <div className={'main-content-slim'}>
            <div className={'system-services'}>
                <p className={'text-lg pb-2'}>Services:</p>
                <GetAddressService/>
                <ZeptoService/>
                <SmtpService/>
            </div>
        </div>
    )

}