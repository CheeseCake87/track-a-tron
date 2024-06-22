import {createSignal, Show, useContext} from "solid-js";
import {ContextMain} from "../../../contextManagers/ContextMain";
import GetAddress from "../../services/GetAddress";
import rpc_create_client from "../../../rpc/client/rpc_create_client";


export default function ClientAdd() {

    const ctxMain = useContext(ContextMain)

    const [addAddressManually, setAddAddressManually] = createSignal(false)

    const [client, setClient] = createSignal({
        business_name: '',
        first_name: '',
        last_name: '',
        phone: '',
        alt_phone: '',
        email_address: '',
        alt_email_address: '',
        phone_dnc: false,
        email_address_dnc: false
    })

    const [clientAddress, setClientAddress] = createSignal({
        building_number: '',
        sub_building_number: '',
        building_name: '',
        sub_building_name: '',
        address_line_1: '',
        address_line_2: '',
        address_line_3: '',
        locality: '',
        town_or_city: '',
        county: '',
        district: '',
        postcode: '',
        country: ''
    })

    function createClient() {
        rpc_create_client({
            ...client(),
            ...clientAddress()
        }).then((rpc) => {
            console.log(rpc)
            if (rpc.ok) {
                ctxMain.showSuccessToast('Client created')
                ctxMain.navigator(`/client/${rpc.data[0].client_id}`)
            } else {
                ctxMain.showErrorToast(rpc.message)
            }
        })
    }

    return (
        <div className={'main-content-slim'}>
            <div className={'field-group sticky top-0 pb-5'}>
                <button className={'btn'} onClick={() => ctxMain.navigator('/clients')}>← Cancel</button>
                <button className={'btn-good'} onClick={createClient}>Create Client</button>
            </div>
            <form onsubmit={
                (e) => {
                    e.preventDefault()
                }
            }>
                <div className={'sectioned-content w-full'}>
                    <div className={'form-section'}>
                        <div className={'field-group'}>
                            <div className={'py-2'}>
                                <label>First Name</label>
                                <input type={'text'} onKeyUp={
                                    (e) => {
                                        setClient({
                                            ...client(),
                                            first_name: e.target.value
                                        })
                                    }
                                } value={client().first_name}/>
                            </div>
                            <div className={'py-2'}>
                                <label>Last Name</label>
                                <input type={'text'} onKeyUp={
                                    (e) => {
                                        setClient({
                                            ...client(),
                                            last_name: e.target.value
                                        })
                                    }
                                } value={client().last_name}/>
                            </div>
                            <div className={'py-2'}>
                                <label>Business Name</label>
                                <input type={'text'} onKeyUp={
                                    (e) => {
                                        setClient({
                                            ...client(),
                                            business_name: e.target.value
                                        })
                                    }
                                } value={client().business_name}/>
                            </div>
                        </div>
                    </div>
                    <div className={'form-section'}>
                        <div className={'field-group'}>
                            <div className={'py-2'}>
                                <label>Phone</label>
                                <input type={'text'} onKeyUp={
                                    (e) => {
                                        setClient({
                                            ...client(),
                                            phone: e.target.value
                                        })
                                    }
                                } value={client().phone}/>
                            </div>
                            <div className={'py-2'}>
                                <label>Email Address</label>
                                <input type={'text'} onKeyUp={
                                    (e) => {
                                        setClient({
                                            ...client(),
                                            email_address: e.target.value
                                        })
                                    }
                                } value={client().email_address}/>
                            </div>
                            <div className={'py-2'}>
                                <label>Alternative Phone</label>
                                <input type={'text'} onKeyUp={
                                    (e) => {
                                        setClient({
                                            ...client(),
                                            alt_phone: e.target.value
                                        })
                                    }
                                } value={client().alt_phone}/>
                            </div>
                            <div className={'py-2'}>
                                <label>Alternative Email Address</label>
                                <input type={'text'} onKeyUp={
                                    (e) => {
                                        setClient({
                                            ...client(),
                                            alt_email_address: e.target.value
                                        })
                                    }
                                } value={client().alt_email_address}/>
                            </div>
                        </div>
                        <div className={'form-section'}>
                            <div className={'field-group'}>
                                <div className={'checkbox'}>
                                    <input type={'checkbox'}
                                           id={'add_client_phone_dnc'}
                                           name={'add_client_phone_dnc'}
                                           checked={client().phone_dnc}
                                           onChange={(e) => setClient(
                                               {
                                                   ...client(),
                                                   phone_dnc: e.target.checked
                                               }
                                           )}
                                    />
                                    <label htmlFor={'add_client_phone_dnc'}>
                                        Do not send SMS updates or messages
                                    </label>
                                </div>

                                <div className={'checkbox'}>
                                    <input type={'checkbox'}
                                           id={'add_client_email_address_dnc'}
                                           name={'add_client_email_address_dnc'}
                                           checked={client().email_address_dnc}
                                           onChange={(e) => setClient(
                                               {
                                                   ...client(),
                                                   email_address_dnc: e.target.checked
                                               }
                                           )}
                                    />
                                    <label htmlFor={'add_client_email_address_dnc'}>
                                        Do not send email updates or messages
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'form-section'}>
                        <Show when={ctxMain.enabledServices().includes('get_address')}>
                            <GetAddress cachePostcode={true} setAddress={setClientAddress}/>
                            <div className={'field-group'}>
                                <button className={addAddressManually() ? 'btn-confirm' : 'btn'} onClick={
                                    () => {
                                        setAddAddressManually(!addAddressManually())
                                    }
                                }>
                                    Add Address Manually
                                </button>
                            </div>
                        </Show>
                        <div className={
                            ctxMain.enabledServices().includes('get_address') && !addAddressManually()
                                ? 'hidden'
                                : 'block'
                        }>
                            <div className={'field-group'}>
                                <div className={'py-2'}>
                                    <label>Building Number</label>
                                    <input type={'text'} value={clientAddress().building_number}
                                           onKeyUp={
                                               (e) => {
                                                   setClientAddress({
                                                       ...clientAddress(),
                                                       building_number: e.target.value
                                                   })
                                               }
                                           }/>
                                </div>
                                <div className={'py-2'}>
                                    <label>Sub Building Number</label>
                                    <input type={'text'} value={clientAddress().sub_building_number}
                                           onKeyUp={
                                               (e) => {
                                                   setClientAddress({
                                                       ...clientAddress(),
                                                       sub_building_number: e.target.value
                                                   })
                                               }
                                           }/>
                                </div>
                                <div className={'py-2'}>
                                    <label>Building Name</label>
                                    <input type={'text'} value={clientAddress().building_name}
                                           onKeyUp={
                                               (e) => {
                                                   setClientAddress({
                                                       ...clientAddress(),
                                                       building_name: e.target.value
                                                   })
                                               }
                                           }/>
                                </div>
                                <div className={'py-2'}>
                                    <label>Sub Building Name</label>
                                    <input type={'text'} value={clientAddress().sub_building_name}
                                           onKeyUp={
                                               (e) => {
                                                   setClientAddress({
                                                       ...clientAddress(),
                                                       sub_building_name: e.target.value
                                                   })
                                               }
                                           }/>
                                </div>
                            </div>
                            <div className={'field-group'}>
                                <div className={'py-2'}>
                                    <label>Address Line 1</label>
                                    <input type={'text'} value={clientAddress().address_line_1}
                                           onKeyUp={
                                               (e) => {
                                                   setClientAddress({
                                                       ...clientAddress(),
                                                       address_line_1: e.target.value
                                                   })
                                               }
                                           }/>
                                </div>
                                <div className={'py-2'}>
                                    <label>Address Line 2</label>
                                    <input type={'text'} value={clientAddress().address_line_2}
                                           onKeyUp={
                                               (e) => {
                                                   setClientAddress({
                                                       ...clientAddress(),
                                                       address_line_2: e.target.value
                                                   })
                                               }
                                           }/>
                                </div>
                                <div className={'py-2'}>
                                    <label>Address Line 3</label>
                                    <input type={'text'} value={clientAddress().address_line_3}
                                           onKeyUp={
                                               (e) => {
                                                   setClientAddress({
                                                       ...clientAddress(),
                                                       address_line_3: e.target.value
                                                   })
                                               }
                                           }/>
                                </div>
                                <div className={'py-2'}>
                                    <label>Locality</label>
                                    <input type={'text'} value={clientAddress().locality}
                                           onKeyUp={
                                               (e) => {
                                                   setClientAddress({
                                                       ...clientAddress(),
                                                       locality: e.target.value
                                                   })
                                               }
                                           }/>
                                </div>
                            </div>
                            <div className={'field-group'}>
                                <div className={'py-2'}>
                                    <label>Town / City</label>
                                    <input type={'text'} value={clientAddress().town_or_city}
                                           onKeyUp={
                                               (e) => {
                                                   setClientAddress({
                                                       ...clientAddress(),
                                                       town_or_city: e.target.value
                                                   })
                                               }
                                           }/>
                                </div>
                                <div className={'py-2'}>
                                    <label>County</label>
                                    <input type={'text'} value={clientAddress().county}
                                           onKeyUp={
                                               (e) => {
                                                   setClientAddress({
                                                       ...clientAddress(),
                                                       county: e.target.value
                                                   })
                                               }
                                           }/>
                                </div>
                                <div className={'py-2'}>
                                    <label>District</label>
                                    <input type={'text'} value={clientAddress().district}
                                           onKeyUp={
                                               (e) => {
                                                   setClientAddress({
                                                       ...clientAddress(),
                                                       district: e.target.value
                                                   })
                                               }
                                           }/>
                                </div>
                            </div>
                            <div className={'field-group'}>
                                <div className={'py-2'}>
                                    <label>Postcode</label>
                                    <input type={'text'} value={clientAddress().postcode}
                                           onKeyUp={
                                               (e) => {
                                                   setClientAddress({
                                                       ...clientAddress(),
                                                       postcode: e.target.value
                                                   })
                                               }
                                           }/>
                                </div>
                                <div className={'py-2'}>
                                    <label>Country</label>
                                    <input type={'text'} value={clientAddress().country}
                                           onKeyUp={
                                               (e) => {
                                                   setClientAddress({
                                                       ...clientAddress(),
                                                       country: e.target.value
                                                   })
                                               }
                                           }/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
)
}