import {Show, useContext} from "solid-js";
import {ContextClient} from "../../../../contextManagers/ContextClient";

export default function ClientData() {
    const ctxClient = useContext(ContextClient)

    return (
        <form onSubmit={
            (e) => {
                e.preventDefault()
            }
        }>
            <div className={'form-section'}>
                <div className={'field-group'}>
                    <div className={'py-2'}>
                        <label>First Name</label>
                        <input type={'text'} onKeyUp={
                            (e) => {
                                ctxClient.setClient({
                                    ...ctxClient.client(),
                                    first_name: e.target.value
                                })
                                ctxClient.saveClient()
                            }
                        } value={ctxClient.client().first_name}/>
                    </div>
                    <div className={'py-2'}>
                        <label>Last Name</label>
                        <input type={'text'} onKeyUp={
                            (e) => {
                                ctxClient.setClient({
                                    ...ctxClient.client(),
                                    last_name: e.target.value
                                })
                                ctxClient.saveClient()
                            }
                        } value={ctxClient.client().last_name}/>
                    </div>
                    <div className={'py-2'}>
                        <label>Business Name</label>
                        <input type={'text'} onKeyUp={
                            (e) => {
                                ctxClient.setClient({
                                    ...ctxClient.client(),
                                    business_name: e.target.value
                                })
                                ctxClient.saveClient()
                            }
                        } value={ctxClient.client().business_name}/>
                    </div>
                </div>
            </div>
            <div className={'form-section pb-0'}>
                <div className={'field-group mb-2'}>
                    <div className={'py-2'}>
                        <label>Phone</label>
                        <input type={'text'} onKeyUp={
                            (e) => {
                                ctxClient.setClient({
                                    ...ctxClient.client(),
                                    phone: e.target.value
                                })
                                ctxClient.saveClient()
                            }
                        } value={ctxClient.client().phone}/>
                    </div>
                    <div className={'py-2'}>
                        <label>Email Address</label>
                        <input type={'text'} onKeyUp={
                            (e) => {
                                ctxClient.setClient({
                                    ...ctxClient.client(),
                                    email_address: e.target.value
                                })
                            }
                        } value={ctxClient.client().email_address}/>
                    </div>
                    <div className={'py-2'}>
                        <label>Alternative Phone</label>
                        <input type={'text'} onKeyUp={
                            (e) => {
                                ctxClient.setClient({
                                    ...ctxClient.client(),
                                    alt_phone: e.target.value
                                })
                                ctxClient.saveClient()
                            }
                        } value={ctxClient.client().alt_phone}/>
                    </div>
                    <div className={'py-2'}>
                        <label>Alternative Email Address</label>
                        <input type={'text'} onKeyUp={
                            (e) => {
                                ctxClient.setClient({
                                    ...ctxClient.client(),
                                    alt_email_address: e.target.value
                                })
                                ctxClient.saveClient()
                            }
                        } value={ctxClient.client().alt_email_address}/>
                    </div>
                </div>
                <div className={'form-section'}>
                    <div className={'field-group'}>
                        <div className={'checkbox'}>
                            <input type={'checkbox'}
                                   id={'add_client_phone_dnc'}
                                   name={'add_client_phone_dnc'}
                                   checked={ctxClient.client().phone_dnc}
                                   onChange={(e) => {
                                       ctxClient.setClient(
                                           {
                                               ...ctxClient.client(),
                                               phone_dnc: e.target.checked
                                           }
                                       )
                                       ctxClient.saveClient()
                                   }}
                            />
                            <label htmlFor={'add_client_phone_dnc'}>
                                Do not send SMS updates or messages
                            </label>
                        </div>

                        <div className={'checkbox'}>
                            <input type={'checkbox'}
                                   id={'add_client_email_address_dnc'}
                                   name={'add_client_email_address_dnc'}
                                   checked={ctxClient.client().email_address_dnc}
                                   onChange={(e) => {
                                       ctxClient.setClient(
                                           {
                                               ...ctxClient.client(),
                                               email_address_dnc: e.target.checked
                                           }
                                       )
                                       ctxClient.saveClient()
                                   }}
                            />
                            <label htmlFor={'add_client_email_address_dnc'}>
                                Do not send email updates or messages
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'form-section'}>

                <div className={'field-group'}>
                    <div className={'pb-4 w-full'}>
                        <label>Address</label>
                        <input type={'text'} className={'w-full'} style={{'max-width': '600px'}}
                               value={ctxClient.client().__address} readOnly={true}/>
                    </div>
                </div>

                <div className={'field-group'}>
                    <a className={'no-underline'} onClick={(e) => {
                        ctxClient.setShowAddress(!ctxClient.showAddress())
                        e.preventDefault()
                    }}>Show Address Fields {ctxClient.showAddress() ? '▾' : '▸'}</a>
                </div>

                <Show when={ctxClient.showAddress()}>
                    <div className={'field-group'}>
                        <div className={'py-2'}>
                            <label>Building Number</label>
                            <input type={'text'} value={ctxClient.client().building_number}
                                   onKeyUp={
                                       (e) => {
                                           ctxClient.setClient({
                                               ...ctxClient.client(),
                                               building_number: e.target.value
                                           })
                                           ctxClient.saveClient()
                                       }
                                   }/>
                        </div>
                        <div className={'py-2'}>
                            <label>Sub Building Number</label>
                            <input type={'text'} value={ctxClient.client().sub_building_number}
                                   onKeyUp={
                                       (e) => {
                                           ctxClient.setClient({
                                               ...ctxClient.client(),
                                               sub_building_number: e.target.value
                                           })
                                       }
                                   }/>
                        </div>
                        <div className={'py-2'}>
                            <label>Building Name</label>
                            <input type={'text'} value={ctxClient.client().building_name}
                                   onKeyUp={
                                       (e) => {
                                           ctxClient.setClient({
                                               ...ctxClient.client(),
                                               building_name: e.target.value
                                           })
                                           ctxClient.saveClient()
                                       }
                                   }/>
                        </div>
                        <div className={'py-2'}>
                            <label>Sub Building Name</label>
                            <input type={'text'} value={ctxClient.client().sub_building_name}
                                   onKeyUp={
                                       (e) => {
                                           ctxClient.setClient({
                                               ...ctxClient.client(),
                                               sub_building_name: e.target.value
                                           })
                                           ctxClient.saveClient()
                                       }
                                   }/>
                        </div>
                    </div>
                    <div className={'field-group'}>
                        <div className={'py-2'}>
                            <label>Address Line 1</label>
                            <input type={'text'} value={ctxClient.client().address_line_1}
                                   onKeyUp={
                                       (e) => {
                                           ctxClient.setClient({
                                               ...ctxClient.client(),
                                               address_line_1: e.target.value
                                           })
                                           ctxClient.saveClient()
                                       }
                                   }/>
                        </div>
                        <div className={'py-2'}>
                            <label>Address Line 2</label>
                            <input type={'text'} value={ctxClient.client().address_line_2}
                                   onKeyUp={
                                       (e) => {
                                           ctxClient.setClient({
                                               ...ctxClient.client(),
                                               address_line_2: e.target.value
                                           })
                                       }
                                   }/>
                        </div>
                        <div className={'py-2'}>
                            <label>Address Line 3</label>
                            <input type={'text'} value={ctxClient.client().address_line_3}
                                   onKeyUp={
                                       (e) => {
                                           ctxClient.setClient({
                                               ...ctxClient.client(),
                                               address_line_3: e.target.value
                                           })
                                           ctxClient.saveClient()
                                       }
                                   }/>
                        </div>
                        <div className={'py-2'}>
                            <label>Locality</label>
                            <input type={'text'} value={ctxClient.client().locality}
                                   onKeyUp={
                                       (e) => {
                                           ctxClient.setClient({
                                               ...ctxClient.client(),
                                               locality: e.target.value
                                           })
                                       }
                                   }/>
                        </div>
                    </div>
                    <div className={'field-group'}>
                        <div className={'py-2'}>
                            <label>Town / City</label>
                            <input type={'text'} value={ctxClient.client().town_or_city}
                                   onKeyUp={
                                       (e) => {
                                           ctxClient.setClient({
                                               ...ctxClient.client(),
                                               town_or_city: e.target.value
                                           })
                                           ctxClient.saveClient()
                                       }
                                   }/>
                        </div>
                        <div className={'py-2'}>
                            <label>County</label>
                            <input type={'text'} value={ctxClient.client().county}
                                   onKeyUp={
                                       (e) => {
                                           ctxClient.setClient({
                                               ...ctxClient.client(),
                                               county: e.target.value
                                           })
                                       }
                                   }/>
                        </div>
                        <div className={'py-2'}>
                            <label>District</label>
                            <input type={'text'} value={ctxClient.client().district}
                                   onKeyUp={
                                       (e) => {
                                           ctxClient.setClient({
                                               ...ctxClient.client(),
                                               district: e.target.value
                                           })
                                           ctxClient.saveClient()
                                       }
                                   }/>
                        </div>
                    </div>
                    <div className={'field-group'}>
                        <div className={'py-2'}>
                            <label>Postcode</label>
                            <input type={'text'} value={ctxClient.client().postcode}
                                   onKeyUp={
                                       (e) => {
                                           ctxClient.setClient({
                                               ...ctxClient.client(),
                                               postcode: e.target.value
                                           })
                                           ctxClient.saveClient()
                                       }
                                   }/>
                        </div>
                        <div className={'py-2'}>
                            <label>Country</label>
                            <input type={'text'} value={ctxClient.client().country}
                                   onKeyUp={
                                       (e) => {
                                           ctxClient.setClient({
                                               ...ctxClient.client(),
                                               country: e.target.value
                                           })
                                           ctxClient.saveClient()
                                       }
                                   }/>
                        </div>
                    </div>
                </Show>
            </div>

        </form>
    )
}