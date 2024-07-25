import {For, Show, useContext} from "solid-js";
import {ContextMain} from "../../../contextManagers/ContextMain";
import GetAddress from "../../services/GetAddress";
import {ContextWorkshopTicketAdd} from "../../../contextManagers/ContextWorkshopTicketAdd";
import {DEVICE_TYPES} from "../../../globals";
import {LetterXIcon} from "../../globals/Icons";

export default function WorkshopTicketAdd() {

    const ctxMain = useContext(ContextMain)
    const ctxWorkshopTicketAdd = useContext(ContextWorkshopTicketAdd)

    return (
        <div className={'main-content-slim gap-2'}>
            <div className={'field-group sticky top-0 pb-5'}>
                <button className={'btn'} onClick={() => ctxMain.navigator('/workshop')}>← Cancel</button>
                <button className={'btn-good'}
                        disabled={!ctxWorkshopTicketAdd.addTicketEnabled()}
                        onClick={ctxWorkshopTicketAdd.createWorkshopTicket}>
                    Create Ticket
                </button>
            </div>

            <form onsubmit={
                (e) => {
                    e.preventDefault()
                }
            }>
                <div className={'sectioned-content w-full'}>
                    <div className={'form-section'}>
                        <label>Request</label>
                        <textarea rows="3" tabIndex={1}></textarea>
                    </div>
                </div>
            </form>

            <DeviceSection/>

            <ItemSection/>

            <ClientSection/>

        </div>
    )
}

function DeviceSection() {
    const ctxWorkshopTicketAdd = useContext(ContextWorkshopTicketAdd)

    return (
        <form
            onsubmit={
                (e) => {
                    e.preventDefault()
                }
            }
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault()
                    ctxWorkshopTicketAdd.addDevice()
                }
            }}>
            <div className={'sectioned-content w-full'}>
                <div className={'form-section'}>
                    <label>Add Device</label>
                    <div className={'field-group'}>

                        <div className={'inline-label'}>
                            <label>Make</label>
                            <input type={'text'}
                                   id={'add-device-focus-field'}
                                   tabIndex={2}
                                   onKeyUp={
                                       (e) => {
                                           ctxWorkshopTicketAdd.updateDevice('make', e.target.value)
                                       }
                                   } value={ctxWorkshopTicketAdd.device().make}/>
                        </div>
                        <div className={'inline-label'}>
                            <label>Model</label>
                            <input type={'text'}
                                   tabIndex={3}
                                   onKeyUp={
                                       (e) => {
                                           ctxWorkshopTicketAdd.updateDevice('model', e.target.value)
                                       }
                                   } value={ctxWorkshopTicketAdd.device().model}/>
                        </div>
                        <div className={'inline-label'}>
                            <label>Type</label>
                            <select
                                tabIndex={4}
                                onChange={(e) => {
                                    ctxWorkshopTicketAdd.updateDevice(
                                        'type', e.target.options[e.target.selectedIndex].text
                                    )
                                }}
                            >
                                <option value={'Select...'}
                                        selected={ctxWorkshopTicketAdd.device().type === 'Select...'}>
                                    Select...
                                </option>
                                <For each={DEVICE_TYPES}>
                                    {(deviceType, i) => (
                                        <option value={deviceType}
                                                selected={ctxWorkshopTicketAdd.device().type === deviceType}>
                                            {deviceType}
                                        </option>
                                    )}
                                </For>
                            </select>
                        </div>

                        <button className={'btn-confirm'}
                                tabIndex={5}
                                disabled={
                                    ctxWorkshopTicketAdd.device().type === 'Select...'
                                    || ctxWorkshopTicketAdd.device().make === ''
                                }
                                onClick={
                                    () => {
                                        ctxWorkshopTicketAdd.addDevice()
                                    }
                                }>Add Device
                        </button>
                    </div>
                </div>
                <div className={'form-section pt-2'}>
                    <label>Devices</label>
                    <div className={'workshop-ticket-pill-group'}>
                        <For each={ctxWorkshopTicketAdd.devices()} fallback={
                            <div className={'workshop-ticket-pill'}>
                                No devices added
                            </div>
                        }>
                            {(device, i) => (
                                <div className={'workshop-ticket-pill'}>
                                    {device.make} {device.model}
                                    <div className={'workshop-ticket-inner-pill'}>
                                        {device.type}
                                    </div>
                                    <button className={'btn-danger btn-pill'}
                                            onClick={() => {
                                                const copy = [...ctxWorkshopTicketAdd.devices()]
                                                copy.splice(i, 1)
                                                ctxWorkshopTicketAdd.setDevices(copy)
                                            }}>
                                        <LetterXIcon size={18} strokeWidth={2}/>
                                    </button>
                                </div>
                            )}
                        </For>
                    </div>
                </div>
            </div>
        </form>
    )

}


function ItemSection() {
    const ctxWorkshopTicketAdd = useContext(ContextWorkshopTicketAdd)

    return (
        <form
            onsubmit={(e) => {
                console.log(e)
                e.preventDefault()
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault()
                    ctxWorkshopTicketAdd.addItem()
                }
            }}>
            <div className={'sectioned-content w-full'}>
                <div className={'form-section'}>
                    <label>Add Additional Item</label>
                    <div className={'field-group'}>

                        <div className={'inline-label'}>
                            <label>Description</label>
                            <input type={'text'}
                                   tabIndex={6}
                                   id={'add-item-focus-field'}
                                   onKeyUp={
                                       (e) => {
                                           ctxWorkshopTicketAdd.updateItem('description', e.target.value)
                                       }
                                   } value={ctxWorkshopTicketAdd.item().description}/>
                        </div>

                        <button className={'btn-confirm'}
                                tabIndex={7}
                                disabled={
                                    ctxWorkshopTicketAdd.item().description === ''
                                }
                                onClick={
                                    () => {
                                        ctxWorkshopTicketAdd.addItem()
                                    }
                                }>Add Item
                        </button>
                    </div>
                </div>
                <div className={'form-section pt-2'}>
                    <label>Items</label>
                    <div className={'workshop-ticket-pill-group'}>
                        <For each={ctxWorkshopTicketAdd.items()} fallback={
                            <div className={'workshop-ticket-pill'}>
                                No items added
                            </div>
                        }>
                            {(device, i) => (
                                <div className={'workshop-ticket-pill'}>
                                    {device.description}
                                    <button className={'btn-danger btn-pill'}
                                            onClick={() => {
                                                const copy = [...ctxWorkshopTicketAdd.items()]
                                                copy.splice(i, 1)
                                                ctxWorkshopTicketAdd.setItems(copy)
                                            }}>
                                        <LetterXIcon size={18} strokeWidth={2}/>
                                    </button>
                                </div>
                            )}
                        </For>
                    </div>
                </div>
            </div>
        </form>
    )

}

function ClientSection() {
    return (
        <>
            <AddClientSection/>
        </>
    )
}

function AddClientSection() {
    const ctxMain = useContext(ContextMain)
    const ctxWorkshopTicketAdd = useContext(ContextWorkshopTicketAdd)

    return (
        <form onSubmit={
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
            </div>
        </form>
    )
}