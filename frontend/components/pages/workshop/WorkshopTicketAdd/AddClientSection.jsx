import {Show, useContext} from "solid-js";
import {ContextMain} from "../../../../contextManagers/ContextMain";
import {ContextWorkshopTicketAdd} from "../../../../contextManagers/ContextWorkshopTicketAdd";
import GetAddress from "../../../services/GetAddress";

export default function AddClientSection() {
    const ctxMain = useContext(ContextMain)
    const ctxWorkshopTicketAdd = useContext(ContextWorkshopTicketAdd)

    return (
        <>
            <div className={'form-section'}>
                <div className={'field-group'}>
                    <div className={'py-2'}>
                        <label>First Name</label>
                        <input type={'text'} onKeyUp={
                            (e) => {
                                ctxWorkshopTicketAdd.setClientAdd({
                                    ...ctxWorkshopTicketAdd.clientAdd(),
                                    first_name: e.target.value
                                })
                            }
                        } value={ctxWorkshopTicketAdd.clientAdd().first_name}/>
                    </div>
                    <div className={'py-2'}>
                        <label>Last Name</label>
                        <input type={'text'} onKeyUp={
                            (e) => {
                                ctxWorkshopTicketAdd.setClientAdd({
                                    ...ctxWorkshopTicketAdd.clientAdd(),
                                    last_name: e.target.value
                                })
                            }
                        } value={ctxWorkshopTicketAdd.clientAdd().last_name}/>
                    </div>
                    <div className={'py-2'}>
                        <label>Business Name</label>
                        <input type={'text'} onKeyUp={
                            (e) => {
                                ctxWorkshopTicketAdd.setClientAdd({
                                    ...ctxWorkshopTicketAdd.clientAdd(),
                                    business_name: e.target.value
                                })
                            }
                        } value={ctxWorkshopTicketAdd.clientAdd().business_name}/>
                    </div>
                </div>
            </div>
            <div className={'form-section'}>
                <div className={'field-group'}>
                    <div className={'py-2'}>
                        <label>Phone</label>
                        <input type={'text'} onKeyUp={
                            (e) => {
                                ctxWorkshopTicketAdd.setClientAdd({
                                    ...ctxWorkshopTicketAdd.clientAdd(),
                                    phone: e.target.value
                                })
                            }
                        } value={ctxWorkshopTicketAdd.clientAdd().phone}/>
                    </div>
                    <div className={'py-2'}>
                        <label>Email Address</label>
                        <input type={'text'} onKeyUp={
                            (e) => {
                                ctxWorkshopTicketAdd.setClientAdd({
                                    ...ctxWorkshopTicketAdd.clientAdd(),
                                    email_address: e.target.value
                                })
                            }
                        } value={ctxWorkshopTicketAdd.clientAdd().email_address}/>
                    </div>
                    <div className={'py-2'}>
                        <label>Alternative Phone</label>
                        <input type={'text'} onKeyUp={
                            (e) => {
                                ctxWorkshopTicketAdd.setClientAdd({
                                    ...ctxWorkshopTicketAdd.clientAdd(),
                                    alt_phone: e.target.value
                                })
                            }
                        } value={ctxWorkshopTicketAdd.clientAdd().alt_phone}/>
                    </div>
                    <div className={'py-2'}>
                        <label>Alternative Email Address</label>
                        <input type={'text'} onKeyUp={
                            (e) => {
                                ctxWorkshopTicketAdd.setClientAdd({
                                    ...ctxWorkshopTicketAdd.clientAdd(),
                                    alt_email_address: e.target.value
                                })
                            }
                        } value={ctxWorkshopTicketAdd.clientAdd().alt_email_address}/>
                    </div>
                </div>
                <div className={'form-section'}>
                    <div className={'field-group'}>
                        <div className={'checkbox'}>
                            <input type={'checkbox'}
                                   id={'add_client_phone_dnc'}
                                   name={'add_client_phone_dnc'}
                                   checked={ctxWorkshopTicketAdd.clientAdd().phone_dnc}
                                   onChange={(e) => ctxWorkshopTicketAdd.setClientAdd(
                                       {
                                           ...ctxWorkshopTicketAdd.clientAdd(),
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
                                   checked={ctxWorkshopTicketAdd.clientAdd().email_address_dnc}
                                   onChange={(e) => ctxWorkshopTicketAdd.setClientAdd(
                                       {
                                           ...ctxWorkshopTicketAdd.clientAdd(),
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
                    <GetAddress cachePostcode={true} setAddress={ctxWorkshopTicketAdd.setClientAddAddress}/>
                    <div className={'field-group'}>
                        <a className={'no-underline'} onClick={(e) => {
                            e.preventDefault()
                            ctxWorkshopTicketAdd.setAddAddressManually(!ctxWorkshopTicketAdd.addAddressManually())
                        }}>Add Address Manually {ctxWorkshopTicketAdd.addAddressManually() ? '▾' : '▸'}</a>
                    </div>
                </Show>
                <div className={
                    ctxMain.enabledServices().includes('get_address') && !ctxWorkshopTicketAdd.addAddressManually()
                        ? 'hidden'
                        : 'block'
                }>
                    <div className={'field-group'}>
                        <div className={'py-2'}>
                            <label>Building Number</label>
                            <input type={'text'} value={ctxWorkshopTicketAdd.clientAddAddress().building_number}
                                   onKeyUp={
                                       (e) => {
                                           ctxWorkshopTicketAdd.setClientAddAddress({
                                               ...ctxWorkshopTicketAdd.clientAddAddress(),
                                               building_number: e.target.value
                                           })
                                       }
                                   }/>
                        </div>
                        <div className={'py-2'}>
                            <label>Sub Building Number</label>
                            <input type={'text'} value={ctxWorkshopTicketAdd.clientAddAddress().sub_building_number}
                                   onKeyUp={
                                       (e) => {
                                           ctxWorkshopTicketAdd.setClientAddAddress({
                                               ...ctxWorkshopTicketAdd.clientAddAddress(),
                                               sub_building_number: e.target.value
                                           })
                                       }
                                   }/>
                        </div>
                        <div className={'py-2'}>
                            <label>Building Name</label>
                            <input type={'text'} value={ctxWorkshopTicketAdd.clientAddAddress().building_name}
                                   onKeyUp={
                                       (e) => {
                                           ctxWorkshopTicketAdd.setClientAddAddress({
                                               ...ctxWorkshopTicketAdd.clientAddAddress(),
                                               building_name: e.target.value
                                           })
                                       }
                                   }/>
                        </div>
                        <div className={'py-2'}>
                            <label>Sub Building Name</label>
                            <input type={'text'} value={ctxWorkshopTicketAdd.clientAddAddress().sub_building_name}
                                   onKeyUp={
                                       (e) => {
                                           ctxWorkshopTicketAdd.setClientAddAddress({
                                               ...ctxWorkshopTicketAdd.clientAddAddress(),
                                               sub_building_name: e.target.value
                                           })
                                       }
                                   }/>
                        </div>
                    </div>
                    <div className={'field-group'}>
                        <div className={'py-2'}>
                            <label>Address Line 1</label>
                            <input type={'text'} value={ctxWorkshopTicketAdd.clientAddAddress().address_line_1}
                                   onKeyUp={
                                       (e) => {
                                           ctxWorkshopTicketAdd.setClientAddAddress({
                                               ...ctxWorkshopTicketAdd.clientAddAddress(),
                                               address_line_1: e.target.value
                                           })
                                       }
                                   }/>
                        </div>
                        <div className={'py-2'}>
                            <label>Address Line 2</label>
                            <input type={'text'} value={ctxWorkshopTicketAdd.clientAddAddress().address_line_2}
                                   onKeyUp={
                                       (e) => {
                                           ctxWorkshopTicketAdd.setClientAddAddress({
                                               ...ctxWorkshopTicketAdd.clientAddAddress(),
                                               address_line_2: e.target.value
                                           })
                                       }
                                   }/>
                        </div>
                        <div className={'py-2'}>
                            <label>Address Line 3</label>
                            <input type={'text'} value={ctxWorkshopTicketAdd.clientAddAddress().address_line_3}
                                   onKeyUp={
                                       (e) => {
                                           ctxWorkshopTicketAdd.setClientAddAddress({
                                               ...ctxWorkshopTicketAdd.clientAddAddress(),
                                               address_line_3: e.target.value
                                           })
                                       }
                                   }/>
                        </div>
                        <div className={'py-2'}>
                            <label>Locality</label>
                            <input type={'text'} value={ctxWorkshopTicketAdd.clientAddAddress().locality}
                                   onKeyUp={
                                       (e) => {
                                           ctxWorkshopTicketAdd.setClientAddAddress({
                                               ...ctxWorkshopTicketAdd.clientAddAddress(),
                                               locality: e.target.value
                                           })
                                       }
                                   }/>
                        </div>
                    </div>
                    <div className={'field-group'}>
                        <div className={'py-2'}>
                            <label>Town / City</label>
                            <input type={'text'} value={ctxWorkshopTicketAdd.clientAddAddress().town_or_city}
                                   onKeyUp={
                                       (e) => {
                                           ctxWorkshopTicketAdd.setClientAddAddress({
                                               ...ctxWorkshopTicketAdd.clientAddAddress(),
                                               town_or_city: e.target.value
                                           })
                                       }
                                   }/>
                        </div>
                        <div className={'py-2'}>
                            <label>County</label>
                            <input type={'text'} value={ctxWorkshopTicketAdd.clientAddAddress().county}
                                   onKeyUp={
                                       (e) => {
                                           ctxWorkshopTicketAdd.setClientAddAddress({
                                               ...ctxWorkshopTicketAdd.clientAddAddress(),
                                               county: e.target.value
                                           })
                                       }
                                   }/>
                        </div>
                        <div className={'py-2'}>
                            <label>District</label>
                            <input type={'text'} value={ctxWorkshopTicketAdd.clientAddAddress().district}
                                   onKeyUp={
                                       (e) => {
                                           ctxWorkshopTicketAdd.setClientAddAddress({
                                               ...ctxWorkshopTicketAdd.clientAddAddress(),
                                               district: e.target.value
                                           })
                                       }
                                   }/>
                        </div>
                    </div>
                    <div className={'field-group'}>
                        <div className={'py-2'}>
                            <label>Postcode</label>
                            <input type={'text'} value={ctxWorkshopTicketAdd.clientAddAddress().postcode}
                                   onKeyUp={
                                       (e) => {
                                           ctxWorkshopTicketAdd.setClientAddAddress({
                                               ...ctxWorkshopTicketAdd.clientAddAddress(),
                                               postcode: e.target.value
                                           })
                                       }
                                   }/>
                        </div>
                        <div className={'py-2'}>
                            <label>Country</label>
                            <input type={'text'} value={ctxWorkshopTicketAdd.clientAddAddress().country}
                                   onKeyUp={
                                       (e) => {
                                           ctxWorkshopTicketAdd.setClientAddAddress({
                                               ...ctxWorkshopTicketAdd.clientAddAddress(),
                                               country: e.target.value
                                           })
                                       }
                                   }/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'form-section'}>
                <div>
                    <button
                        onClick={() => {
                            ctxWorkshopTicketAdd.createClient()
                        }}
                        className={'btn-good'}>
                        Create &amp; Select Client
                    </button>
                </div>
            </div>
        </>
    )
}