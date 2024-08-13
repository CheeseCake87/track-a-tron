export default function ForgotPassword() {

    return (
        <div className={'login-background'}>
            <div className={'login-outer'}>

                <div className={'login-inner'}>
                    <form className={'flex flex-col gap-2'}
                          onSubmit={(e) => {
                              e.preventDefault()
                          }}>
                        <div className={'login-form-group'}>
                            <label htmlFor={'email_address'}>
                                Email Address:
                            </label>
                            <input className={'mb-2'}
                                   id={'email_address'}
                                   type="text"
                                   name="email_address"/>
                        </div>
                        <div className={'flex flex-col gap-1'}>
                            <input type="submit"
                                   className={'btn-confirm'}
                                   value="Send Password Reset"
                                   onClick={() => {
                                   }}/>
                            <a className={'btn'} href="/login">
                                Back to Login
                            </a>
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
