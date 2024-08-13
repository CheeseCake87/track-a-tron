import {EyeClosedIcon, EyeOpenIcon} from "../../globals/Icons";
import {createSignal} from "solid-js";

export default function ChangePassword() {

    const [show_password, set_show_password] = createSignal(false)
    const [show_confirm_password, set_show_confirm_password] = createSignal(false)

    return (
        <div className={'login-background'}>
            <div className={'login-outer'}>
                <div className={'login-inner'}>

                    <form className={'flex flex-col gap-2'}
                          onSubmit={(e) => {
                              e.preventDefault()
                          }}>
                        <div className={'login-form-group'}>

                            <label htmlFor={'new_password'} className={'select-none'}>
                                New Password:
                            </label>
                            <div className={'inline-action-right mb-2'}>
                                <input id={'new_password'}
                                       type={show_password() ? 'text' : 'password'}
                                       name="new_password"/>
                                <div onMouseDown={() => set_show_password(true)}
                                     onMouseUp={() => set_show_password(false)}>
                                    {show_password()
                                        ? <EyeOpenIcon width={14} height={14}/>
                                        : <EyeClosedIcon width={14} height={14}/>}
                                </div>
                            </div>

                            <label htmlFor={'confirm_new_password'} className={'select-none'}>
                                Confirm New Password:
                            </label>
                            <div className={'inline-action-right mb-2'}>
                                <input id={'confirm_new_password'}
                                       type={show_confirm_password() ? 'text' : 'password'}
                                       name="confirm_new_password"/>
                                <div onMouseDown={() => set_show_confirm_password(true)}
                                     onMouseUp={() => set_show_confirm_password(false)}>
                                    {show_confirm_password()
                                        ? <EyeOpenIcon width={14} height={14}/>
                                        : <EyeClosedIcon width={14} height={14}/>}
                                </div>
                            </div>

                        </div>

                        <div className={'flex flex-col gap-1'}>
                            <input type="submit"
                                   className={'btn-confirm'}
                                   value="Update Password"
                                   onClick={() => {
                                   }}/>
                        </div>
                    </form>

                </div>
                <div className={'text-sm text-center text-gray-500 p-2'}>
                    <p>Track-a-tron 1000</p>
                </div>
            </div>
        </div>
    )
};
