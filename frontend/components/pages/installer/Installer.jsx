import {createSignal, onMount, Show, useContext} from "solid-js";
import {ContextMain} from "../../../contextManagers/ContextMain";
import check_if_setup from "../../../api/system/check_if_setup";
import {EyeClosedIcon, EyeOpenIcon} from "../../globals/Icons";
import system_install from "../../../api/system/system_install";


export default function Installer() {

    const ctxMain = useContext(ContextMain)

    const [error, setError] = createSignal('')

    const [username, setUsername] = createSignal('')
    const [password, setPassword] = createSignal('')
    const [showPassword, setShowPassword] = createSignal(false)

    // GetAddress
    const [getAddressService, setAddressService] = createSignal({
            api_key: '',
            administration_key: '',
        }
    )
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

    function install(admin_username, admin_password, services) {
        system_install(admin_username, admin_password, services).then((rpc) => {
            if (rpc.ok) {
                ctxMain.navigator('/login')
            }
        })
    }

    function checkValuesBeforeInstall() {
        if (username().length < 1) {
            setError('Admin username is required')
            return
        }
        if (password().length < 1) {
            setError('Admin password is required')
            return
        }
        if (enableGetAddressService()) {
            if (getAddressService().api_key.length < 1) {
                setError('GetAddress API Key is required')
                return
            }
        }
        if (enableZeptoService()) {
            if (zeptoService().sender.length < 1) {
                setError('Zepto sender is required')
                return
            }
            if (zeptoService().api_url.length < 1) {
                setError('Zepto API URL is required')
                return
            }
            if (zeptoService().token.length < 1) {
                setError('Zepto token is required')
                return
            }
        }
        if (enableSmtpService()) {
            if (smtpService().username.length < 1) {
                setError('SMTP username is required')
                return
            }
            if (smtpService().password.length < 1) {
                setError('SMTP password is required')
                return
            }
            if (smtpService().server.length < 1) {
                setError('SMTP server is required')
                return
            }
            if (smtpService().port < 1) {
                setError('SMTP port is required')
                return
            }
        }
        install(username(), password(), {
            get_address: {
                enabled: enableGetAddressService(),
                name: 'get_address',
                category: 'Postcode Lookup',
                data: getAddressService()
            },
            zepto: {
                enabled: enableZeptoService(),
                name: 'zepto',
                category: 'Transactional Email',
                data: zeptoService()
            },
            smtp: {
                enabled: enableSmtpService(),
                name: 'smtp',
                category: 'SMTP Email',
                data: smtpService()
            }
        })
    }

    onMount(() => {
        api.get(
            '/system/checks'
        ).then((re) => {
            if (re.ok) {
                if (re.data.system_setup) {
                    ctxMain.navigator('/login')
                } else {
                    ctxMain.logout()
                }
            }
        })
    })

    function UsernamePassword() {
        return <div className={'flex flex-col pb-4 gap-1'}>
            <div>
                <label htmlFor={'username'}
                       className={'select-none'}>
                    Admin Username:
                </label>
                <input className={'mb-2'}
                       id={'username'}
                       type="text"
                       name="admin_username"
                       onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
                <label htmlFor={'password'}
                       className={'select-none'}>
                    Admin Password:
                </label>
                <div className={'inline-action-right'}>
                    <input id={'password'}
                           type={showPassword() ? 'text' : 'password'}
                           value={password()}
                           name="admin_password"
                           onChange={(e) => setPassword(e.target.value)}/>
                    <div onMouseDown={() => setShowPassword(true)}
                         onMouseUp={() => setShowPassword(false)}>
                        {showPassword()
                            ? <EyeOpenIcon size={14}/>
                            : <EyeClosedIcon size={14}/>}
                    </div>
                </div>
            </div>
        </div>
    }

    function GetAddressService() {
        return <div className={'attention'}>
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
        </div>
    }

    function ZeptoService() {
        return <div className={'attention'}>
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

    return (
        <div className={'install-background'}>
            <div className={'install-outer'}>
                <div className={'install-inner'}>
                    <form className={'flex flex-col gap-4'}
                          onsubmit={(e) => {
                              e.preventDefault()
                          }}>

                        <div className={'install-form-group'}>


                            <p className={'text-2xl pb-4'}>🤖 Track-a-tron Installer</p>

                            <Show when={error().length > 0}>
                                <div className={'attention-danger'}>
                                    {error()}
                                </div>
                            </Show>

                            <div className={'pb-4'}>

                                <UsernamePassword/>

                                <div className={'flex flex-col gap-1'}>
                                    <p className={'text-lg pb-2'}>Services:</p>
                                    <GetAddressService/>
                                    <ZeptoService/>
                                    <SmtpService/>
                                </div>

                            </div>

                        </div>

                        <div className={'flex flex-col gap-1'}>
                            <input type="submit"
                                   className={'btn-confirm'}
                                   value="Install"
                                   onClick={() => checkValuesBeforeInstall()}/>
                        </div>

                    </form>
                </div>
                <div className={'text-sm text-center text-gray-500 p-2'}>
                    <p>Track-a-tron 1000</p>
                </div>
            </div>
        </div>
    )

}