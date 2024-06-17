import {createSignal, For, Show, useContext} from "solid-js";
import {ContextClientAdd} from "../../../contextManagers/ContextClientAdd";
import ClientAddHeader from "./ClientAddHeader";
import {ContextMain} from "../../../contextManagers/ContextMain";
import {createStore} from "solid-js/store";
import GetAddress from "../../services/GetAddress";


export default function ClientAdd() {

    const ctxMain = useContext(ContextMain)
    const ctxClientAdd = useContext(ContextClientAdd)

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

    return (
        <div className={'main-content-slim'}>
            <div className={'px-2'}>
                <ClientAddHeader/>
                <form onsubmit={
                    (e) => {
                        e.preventDefault()
                    }
                }>
                    <div className={'form-section'}>
                        <h2>Details</h2>
                        <div className={'field-group'}>
                            <div className={'py-2'}>
                                <label>Business Name</label>
                                <input type={'text'}/>
                            </div>
                            <div className={'py-2'}>
                                <label>First Name</label>
                                <input type={'text'}/>
                            </div>
                            <div className={'py-2'}>
                                <label>Last Name</label>
                                <input type={'text'}/>
                            </div>
                        </div>
                    </div>
                    <div className={'form-section'}>
                        <h2>Contact</h2>
                        <div className={'field-group'}>
                            <div className={'py-2'}>
                                <label>Email Address</label>
                                <input type={'text'}/>
                            </div>
                            <div className={'py-2'}>
                                <label>Landline</label>
                                <input type={'text'}/>
                            </div>
                            <div className={'py-2'}>
                                <label>Mobile</label>
                                <input type={'text'}/>
                            </div>
                        </div>
                    </div>
                    <div className={'form-section'}>
                        <h2>Address</h2>
                        <Show when={ctxMain.enabledServices().includes('get_address')}>
                            <GetAddress cachePostcode={true} setAddress={setClientAddress}/>
                        </Show>
                        <div className={'field-group'}>
                            <div className={'py-2'}>
                                <label>Building Number</label>
                                <input type={'text'} value={clientAddress().building_number}/>
                            </div>
                            <div className={'py-2'}>
                                <label>Sub Building Number</label>
                                <input type={'text'} value={clientAddress().sub_building_number}/>
                            </div>
                            <div className={'py-2'}>
                                <label>Building Name</label>
                                <input type={'text'} value={clientAddress().building_name}/>
                            </div>
                            <div className={'py-2'}>
                                <label>Sub Building Name</label>
                                <input type={'text'} value={clientAddress().sub_building_name}/>
                            </div>
                        </div>
                        <div className={'field-group'}>
                            <div className={'py-2'}>
                                <label>Address Line 1</label>
                                <input type={'text'} value={clientAddress().address_line_1}/>
                            </div>
                            <div className={'py-2'}>
                                <label>Address Line 2</label>
                                <input type={'text'} value={clientAddress().address_line_2}/>
                            </div>
                            <div className={'py-2'}>
                                <label>Address Line 3</label>
                                <input type={'text'} value={clientAddress().address_line_3}/>
                            </div>
                            <div className={'py-2'}>
                                <label>Locality</label>
                                <input type={'text'} value={clientAddress().locality}/>
                            </div>
                        </div>
                        <div className={'field-group'}>
                            <div className={'py-2'}>
                                <label>Town / City</label>
                                <input type={'text'} value={clientAddress().town_or_city}/>
                            </div>
                            <div className={'py-2'}>
                                <label>County</label>
                                <input type={'text'} value={clientAddress().county}/>
                            </div>
                            <div className={'py-2'}>
                                <label>District</label>
                                <input type={'text'} value={clientAddress().district}/>
                            </div>
                        </div>
                        <div className={'field-group'}>
                            <div className={'py-2'}>
                                <label>Postcode</label>
                                <input type={'text'} value={clientAddress().postcode}/>
                            </div>
                            <div className={'py-2'}>
                                <label>Country</label>
                                <input type={'text'} value={clientAddress().country}/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}