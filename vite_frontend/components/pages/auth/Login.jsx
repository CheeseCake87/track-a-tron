import {EyeClosedIcon, EyeOpenIcon} from "../../globals/Icons";
import {createSignal, useContext} from "solid-js";
import {ContextMain} from "../../../contextManagers/ContextMain";

export default function Login() {

    const ctxMain = useContext(ContextMain)

    const [username, setUsername] = createSignal('')
    const [password, setPassword] = createSignal('')
    const [showPassword, setShowPassword] = createSignal(false)

    function LoginForm() {
        return (
            <form className={'flex flex-col gap-4'}
                  onsubmit={(e) => {
                      e.preventDefault()
                  }}>

                <div className={'login-form-group'}>

                    <label htmlFor={'username'}
                           className={'select-none'}>
                        Username:
                    </label>
                    <input className={'mb-2'}
                           id={'username'}
                           type="text"
                           name="username"
                           onChange={(e) => setUsername(e.target.value)}/>

                    <label htmlFor={'password'}
                           className={'select-none'}>
                        Password:
                    </label>
                    <div className={'inline-action-right'}>
                        <input id={'password'}
                               type={showPassword() ? 'text' : 'password'}
                               value={password()}
                               name="password"
                               onChange={(e) => setPassword(e.target.value)}/>
                        <div onMouseDown={() => setShowPassword(true)}
                             onMouseUp={() => setShowPassword(false)}>
                            {showPassword()
                                ? <EyeOpenIcon size={14}/>
                                : <EyeClosedIcon size={14}/>}
                        </div>
                    </div>

                </div>

                <div className={'flex flex-col gap-1'}>
                    <input type="submit"
                           className={'btn-confirm'}
                           value="Login"
                           onClick={() => {
                               ctxMain.login(username(), password())
                           }}/>
                    <p className={'text-sm text-center'}>
                        <a href="/forgot-password">Forgot Password</a>
                    </p>
                </div>

            </form>
        )
    }

    return (
        <div className={'login-background'}>
            <div className={'login-outer'}>
                <div className={'login-inner'}>
                    <LoginForm/>
                </div>
                <div className={'text-sm text-center text-gray-500 p-2'}>
                    <p>Track-a-tron 1000</p>
                </div>
            </div>
        </div>
    )
}
;


