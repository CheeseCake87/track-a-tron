import {createEffect, createSignal, onMount, Show, useContext} from "solid-js";
import {EyeClosedIcon, EyeOpenIcon} from "../../globals/Icons";
import rpc_get_services from "../../../rpc/system/rpc_get_services";
import {ContextMain} from "../../../contextManagers/ContextMain";
import rpc_update_service from "../../../rpc/system/rpc_update_service";
import {ContextSystem} from "../../../contextManagers/ContextSystem";
import rpc_get_enabled_services from "../../../rpc/system/rpc_get_enabled_services";

export default function SystemServices() {

    const ctxMain = useContext(ContextMain)
    const ctxSystem = useContext(ContextSystem)

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

    function refreshEnabledServices() {
        rpc_get_enabled_services().then((rpc) => {
            ctxMain.setEnabledServices(rpc.data.enabled_services)
        })
    }

    function updateGetAddressService() {
        if (enableGetAddressService()) {
            if (getAddressService().api_key === '') {
                ctxMain.showErrorToast('GetAddress API Key is required.')
                return
            }
        }
        rpc_update_service({
            name: 'get_address',
            data: getAddressService(),
            enabled: enableGetAddressService()
        }).then((rpc) => {
            if (rpc.ok) {
                ctxMain.showSuccessToast('GetAddress service updated.')
                refreshEnabledServices()
            } else {
                ctxMain.showErrorToast('There was an error updating GetAddress service.')
            }
        })
    }

    function updateZeptoService() {
        if (enableZeptoService()) {
            if (zeptoService().api_url === '') {
                ctxMain.showErrorToast('Zepto API URL is required.')
                return
            }
            if (zeptoService().sender === '') {
                ctxMain.showErrorToast('Zepto Sender is required.')
                return
            }
            if (zeptoService().token === '') {
                ctxMain.showErrorToast('Zepto Token is required.')
                return
            }
        }
        rpc_update_service({
            name: 'zepto',
            data: zeptoService(),
            enabled: enableZeptoService()
        }).then((rpc) => {
            if (rpc.ok) {
                ctxMain.showSuccessToast('Zepto service updated.')
                refreshEnabledServices()
            } else {
                ctxMain.showErrorToast('There was an error updating Zepto service.')
            }
        })
    }

    function updateSmtpService() {
        if (enableSmtpService()) {
            if (smtpService().server === '') {
                ctxMain.showErrorToast('SMTP Server is required.')
                return
            }
            if (smtpService().port === 0) {
                ctxMain.showErrorToast('SMTP Port is required.')
                return
            }
            if (smtpService().username === '') {
                ctxMain.showErrorToast('SMTP Username is required.')
                return
            }
            if (smtpService().password === '') {
                ctxMain.showErrorToast('SMTP Password is required.')
                return
            }
        }
        rpc_update_service({
            name: 'smtp',
            data: smtpService(),
            enabled: enableSmtpService()
        }).then((rpc) => {
            if (rpc.ok) {
                ctxMain.showSuccessToast('SMTP service updated.')
                refreshEnabledServices()
            } else {
                ctxMain.showErrorToast('There was an error updating SMTP service.')
            }
        })
    }

    function GetAddressService() {
        return <div className={'system-service'}>
            <div className={'pb-2'}>
                <p><strong>GetAddress:</strong> UK Postcode lookup.</p>
            </div>
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
            <button className={'btn-confirm mt-2'}
                    onClick={() => updateGetAddressService()}
            >Update
            </button>
        </div>
    }

    function ZeptoService() {
        return <div className={'system-service'}>
            <div className={'pb-2'}>
                <p><strong>Zepto:</strong> Transactional email.</p>
            </div>
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
                               className={'w-full'}
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
                               className={'w-full'}
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
            <button className={'btn-confirm mt-2'}
                    onClick={() => updateZeptoService()}
            >Update
            </button>
        </div>
    }

    function SmtpService() {
        return <div className={'system-service'}>
            <div className={'pb-2'}>
                <p><strong>SMTP:</strong> Send email via smtp.</p>
            </div>
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
                               className={'w-full'}
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
                               className={'w-full'}
                               value={smtpService().port}
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
                               className={'w-full'}
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
            <button className={'btn-confirm mt-2'}
                    onClick={() => updateSmtpService()}
            >Update
            </button>
        </div>
    }

    createEffect(() => {
        if (ctxSystem.systemSection() === 'services') {
            rpc_get_services().then((rpc) => {
                if (rpc.ok) {
                    for (let service of rpc.data.services) {
                        if (service.name === 'get_address') {
                            setAddressService(service.data)
                            setEnableGetAddressService(service.enabled)
                        }
                        if (service.name === 'zepto') {
                            setZeptoService(service.data)
                            setEnableZeptoService(service.enabled)
                        }
                        if (service.name === 'smtp') {
                            setSmtpService(service.data)
                            setEnableSmtpService(service.enabled)
                        }
                    }
                }
            })
        }
    })

    onMount(() => {
        ctxMain.setMainMenuLocation('system')
        ctxSystem.setSystemSection('services')
    })

    return (
        <div className={'flex flex-col gap-2 w-100'}>
            <GetAddressService/>
            <ZeptoService/>
            <SmtpService/>
        </div>
    )
}