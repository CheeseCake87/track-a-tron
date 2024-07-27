import {For, Show, useContext} from "solid-js";
import {ContextMain} from "../../../contextManagers/ContextMain";
import GetAddress from "../../services/GetAddress";
import {ContextWorkshopTicketAdd} from "../../../contextManagers/ContextWorkshopTicketAdd";
import {CATEGORY_CODES_ARRAY, DEVICE_TYPES} from "../../../globals";
import {LetterXIcon} from "../../globals/Icons";

export default function WorkshopTicketAdd() {

    const ctxMain = useContext(ContextMain)
    const ctxWorkshopTicketAdd = useContext(ContextWorkshopTicketAdd)

    return (
        <div className={'main-content-slim gap-2'}>
            <div className={'field-group'}>
                <button className={'btn'} onClick={() => ctxMain.navigator('/workshop')}>← Cancel</button>
            </div>

            <ClientSection/>

            <form onsubmit={
                (e) => {
                    e.preventDefault()
                }
            }>
                <div className={'sectioned-content w-full'}>
                    <div className={'form-section'}>
                        <label>Category</label>
                        <div className={'flex flex-row gap-2'}>
                            <For each={CATEGORY_CODES_ARRAY}>
                                {(category, i) => (
                                    <button
                                        onClick={() => ctxWorkshopTicketAdd.setCategoryCode(category.code)}
                                        className={ctxWorkshopTicketAdd.categoryCode() === category.code
                                            ? 'btn-confirm'
                                            : 'btn'}>
                                        {category.label}
                                    </button>
                                )}
                            </For>
                        </div>
                    </div>
                    <div className={'form-section pt-2'}>
                        <label>Request</label>
                        <textarea rows="3" tabIndex={1} onKeyUp={
                            (e) => {
                                ctxWorkshopTicketAdd.setRequest(e.target.value)
                            }
                        } value={ctxWorkshopTicketAdd.request()
                        }></textarea>
                    </div>
                </div>
            </form>

            <DeviceSection/>

            <ItemSection/>

            <div className={'field-group'}>
                <button className={'btn'} onClick={() => ctxMain.navigator('/workshop')}>← Cancel</button>
                <button className={'btn-good'}
                        onClick={ctxWorkshopTicketAdd.createWorkshopTicket}>
                    Create Ticket
                </button>
            </div>

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
                            <label>Type</label>
                            <select
                                tabIndex={2}
                                id={'add-device-focus-field'}
                                onChange={(e) => {
                                    ctxWorkshopTicketAdd.updateDevice(
                                        'type', e.target.options[e.target.selectedIndex].text
                                    )
                                }}
                            >
                                <option value={'Select...'}
                                        selected={ctxWorkshopTicketAdd.deviceFields().type === 'Select...'}>
                                    Select...
                                </option>
                                <For each={DEVICE_TYPES}>
                                    {(deviceType, i) => (
                                        <option value={deviceType}
                                                selected={ctxWorkshopTicketAdd.deviceFields().type === deviceType}>
                                            {deviceType}
                                        </option>
                                    )}
                                </For>
                            </select>
                        </div>
                        <div className={'inline-label'}>
                            <label>Make</label>
                            <input type={'text'}
                                   tabIndex={3}
                                   onKeyUp={
                                       (e) => {
                                           ctxWorkshopTicketAdd.updateDevice('make', e.target.value)
                                       }
                                   } value={ctxWorkshopTicketAdd.deviceFields().make}/>
                        </div>
                        <div className={'inline-label'}>
                            <label>Model</label>
                            <input type={'text'}
                                   tabIndex={4}
                                   onKeyUp={
                                       (e) => {
                                           ctxWorkshopTicketAdd.updateDevice('model', e.target.value)
                                       }
                                   } value={ctxWorkshopTicketAdd.deviceFields().model}/>
                        </div>
                        <div className={'inline-label'}>
                            <label>Password</label>
                            <input type={'text'}
                                   tabIndex={5}
                                   onKeyUp={
                                       (e) => {
                                           ctxWorkshopTicketAdd.updateDevice('password', e.target.value)
                                       }
                                   } value={ctxWorkshopTicketAdd.deviceFields().password}/>
                        </div>


                        <button className={'btn-confirm'}
                                tabIndex={6}
                                disabled={
                                    ctxWorkshopTicketAdd.deviceFields().type === 'Select...'
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
                    <div className={'workshop-ticket-pill-group flex-wrap'}>
                        <For each={ctxWorkshopTicketAdd.devices()} fallback={
                            <div className={'workshop-ticket-pill'}>
                                No devices added
                            </div>
                        }>
                            {(device, i) => (
                                <div className={'workshop-ticket-pill'}>
                                    <div className={'workshop-ticket-inner-pill'}>
                                        {device.type}
                                    </div>

                                    <Show when={device.make !== ''}>
                                        {device.make}
                                    </Show>
                                    <Show when={device.model !== ''}>
                                        {device.make !== '' ? ' ' : ''}
                                        {device.model}
                                    </Show>
                                    <Show when={device.password !== ''}>
                                        {' | Password: '}{device.password}
                                    </Show>

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
                                   tabIndex={7}
                                   id={'add-item-focus-field'}
                                   onKeyUp={
                                       (e) => {
                                           ctxWorkshopTicketAdd.updateItem('description', e.target.value)
                                       }
                                   } value={ctxWorkshopTicketAdd.itemFields().description}/>
                        </div>

                        <button className={'btn-confirm'}
                                tabIndex={8}
                                disabled={
                                    ctxWorkshopTicketAdd.itemFields().description === ''
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
                            {(item, i) => (
                                <div className={'workshop-ticket-pill'}>
                                    {item.description}
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

function FindClientSection() {

    const ctxWorkshopTicketAdd = useContext(ContextWorkshopTicketAdd)

    return (
        <form onSubmit={
            (e) => {
                e.preventDefault()
            }
        }>
            <div className={'form-section'}>

                <label>Search</label>

                <div className={'field-group'}>
                    <div className={'inline-label'}>
                        <label>Name</label>
                        <input type={'text'}
                               className={'w-36'}
                               onKeyUp={
                                   (e) => {
                                       ctxWorkshopTicketAdd.updateFindClient('any_name', e.target.value)
                                   }
                               } value={ctxWorkshopTicketAdd.findClientFields().any_name}/>
                    </div>
                    <div className={'inline-label'}>
                        <label>Phone</label>
                        <input type={'text'}
                               className={'w-36'}
                               onKeyUp={
                                   (e) => {
                                       ctxWorkshopTicketAdd.updateFindClient('any_phone', e.target.value)
                                   }
                               } value={ctxWorkshopTicketAdd.findClientFields().any_phone}/>
                    </div>
                    <div className={'inline-label'}>
                        <label>Email Address</label>
                        <input type={'text'}
                               onKeyUp={
                                   (e) => {
                                       ctxWorkshopTicketAdd.updateFindClient('any_email', e.target.value)
                                   }
                               } value={ctxWorkshopTicketAdd.findClientFields().any_email}/>
                    </div>
                    <div className={'inline-label'}>
                        <label>Postcode</label>
                        <input type={'text'}
                               className={'w-28'}
                               onKeyUp={
                                   (e) => {
                                       ctxWorkshopTicketAdd.updateFindClient('postcode', e.target.value)
                                   }
                               } value={ctxWorkshopTicketAdd.findClientFields().postcode}/>
                    </div>
                    <button className={'btn-confirm'}
                            tabIndex={8}
                            disabled={
                                ctxWorkshopTicketAdd.findClientFields().any_name === '' &&
                                ctxWorkshopTicketAdd.findClientFields().any_phone === '' &&
                                ctxWorkshopTicketAdd.findClientFields().any_email === '' &&
                                ctxWorkshopTicketAdd.findClientFields().postcode === ''
                            }
                            onClick={
                                () => {
                                    ctxWorkshopTicketAdd.findClient()
                                }
                            }>Search Client
                    </button>
                </div>
            </div>
            <Show when={ctxWorkshopTicketAdd.clientSelected() === ''}>
                <div className={'form-section pt-2'}>
                    <label>
                        Clients Found
                    </label>
                    <div className={'workshop-ticket-pill-group'}>
                        <For each={ctxWorkshopTicketAdd.foundClients()} fallback={
                            <div className={'flex'}>
                                <div className={'workshop-ticket-pill'}>
                                    <Show when={ctxWorkshopTicketAdd.clientSearchDone()}
                                          children={'No clients found'}
                                          fallback={'Search for a client'}/>
                                </div>
                            </div>
                        }>
                            {(foundClient, i) => (
                                <div className={'workshop-ticket-pill'}>
                                    {ctxWorkshopTicketAdd.buildSelectedClient(foundClient)}
                                    <button className={'btn-confirm btn-pill'}
                                            onClick={() => {
                                                ctxWorkshopTicketAdd.setSelectedClient(foundClient)
                                            }}>
                                        Select
                                    </button>
                                </div>
                            )}
                        </For>
                    </div>
                </div>
            </Show>
            <Show when={ctxWorkshopTicketAdd.clientSelected() !== ''}>
                <div className={'form-section pt-2'}>
                    <label>Client Selected</label>
                    <div className={'workshop-ticket-pill-group'}>
                        <div className={'workshop-ticket-pill'}>
                            {ctxWorkshopTicketAdd.clientSelected()}
                            <button className={'btn-danger btn-pill'}
                                    onClick={() => {
                                        ctxWorkshopTicketAdd.setClientIDSelected(0)
                                        ctxWorkshopTicketAdd.setClientSelected('')
                                    }}>
                                <LetterXIcon size={18} strokeWidth={2}/>
                            </button>
                        </div>
                    </div>
                </div>
            </Show>
        </form>
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
        </form>
    )
}

function ClientSection() {
    const ctxWorkshopTicketAdd = useContext(ContextWorkshopTicketAdd)

    return (
        <div className={'sectioned-content w-full'}>
            <div className={'flex flex-row gap-2 mb-4'}>
                <button
                    onClick={() => {
                        ctxWorkshopTicketAdd.setAddNewClient(false)
                    }}
                    className={ctxWorkshopTicketAdd.addNewClient() ? 'btn' : 'btn-confirm'}>
                    Search For Client
                </button>
                <button
                    onClick={() => {
                        ctxWorkshopTicketAdd.clearClientSearch()
                    }}
                    className={!ctxWorkshopTicketAdd.addNewClient() ? 'btn' : 'btn-confirm'}>
                    Add New Client
                </button>
            </div>

            <Show when={!ctxWorkshopTicketAdd.addNewClient()}>
                <FindClientSection/>
            </Show>
            <Show when={ctxWorkshopTicketAdd.addNewClient()}>
                <AddClientSection/>
            </Show>

        </div>
    )
}
