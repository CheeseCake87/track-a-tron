import {createSignal, For, Show, useContext} from "solid-js";
import {createStore} from "solid-js/store";
import {ContextMain} from "../../contextManagers/ContextMain";

export default function GetAddress(props) {

    const ctxMain = useContext(ContextMain)

    const [getAddressResult, setGetAddressResult] = createStore([])
    const [getAddressPostcode, setGetAddressPostcode] = createSignal('')
    const [lookupDone, setLookupDone] = createSignal(false)

    function do_lookup(refresh_cache = false) {
        if (getAddressPostcode().length < 5) {
            ctxMain.showErrorToast('Postcode is too short')
            return
        }

        ctxMain.api.post(`/system/postcode/lookup`, {
            postcode: getAddressPostcode(),
            refresh_cache: refresh_cache
        }).then((res) => {
            if (res.ok) {
                setGetAddressResult(res.data.addresses)
            }
        })
    }

    function setAddressFromIndex(index, postcode) {
        if (index === 'clear') {
            props.setAddress({
                building_number: "",
                sub_building_number: "",
                building_name: "",
                sub_building_name: "",
                address_line_1: "",
                address_line_2: "",
                address_line_3: "",
                locality: "",
                town_or_city: "",
                county: "",
                district: "",
                postcode: "",
                country: ""
            })
            return
        }
        const this_address = getAddressResult[index]
        props.setAddress({
            building_number: this_address.building_number,
            sub_building_number: this_address.sub_building_number,
            building_name: this_address.building_name,
            sub_building_name: this_address.sub_building_name,
            address_line_1: this_address.thoroughfare,
            address_line_2: this_address.line_2,
            address_line_3: this_address.line_3,
            locality: this_address.locality,
            town_or_city: this_address.town_or_city,
            county: this_address.county,
            district: this_address.district,
            postcode: postcode,
            country: this_address.country
        })
    }

    return (
        <>
            <div>
                <div className={'field-group'}>
                    <div className={'py-2'}>
                        <label for={'postcode_lookup'}>Postcode Lookup</label>
                        <div className={'inline-button'}>
                            <input type={'text'}
                                   name={'postcode_lookup'}
                                   id={'postcode_lookup'}
                                   value={getAddressPostcode()}
                                   onKeyUp={
                                       (e) => {
                                           if (e.key === 'Enter') {
                                               do_lookup()
                                           }
                                           setGetAddressPostcode(e.target.value)
                                       }
                                   }/>
                            <button className={'btn-confirm'} onClick={() => do_lookup()}>Find Address
                            </button>
                        </div>
                    </div>
                </div>

                <div className={'field-group'}>
                    <div className={'py-2 w-full'}>
                        <label>Addresses</label>
                        <select className={'w-full'} style={{"max-width": '350px'}} onChange={
                            (e) => {
                                setAddressFromIndex(e.target.value, getAddressPostcode())
                            }
                        }>
                            <option value={"clear"}>{
                                getAddressResult.length > 0
                                    ? `${getAddressResult.length} Addresses Found`
                                    : lookupDone()
                                        ? "No Addresses Found"
                                        : "..."
                            }</option>
                            <Show when={getAddressResult.length > 0}>
                                <For each={getAddressResult}>
                                    {(address, index) =>
                                        <option
                                            value={index()}>{address.formatted_address.filter(Boolean).join(", ")}</option>
                                    }
                                </For>
                            </Show>
                        </select>
                    </div>
                </div>
                <Show when={getAddressResult.length > 0}>
                    <div className={'field-group'}>
                        <div className={'py-2'}>
                            <button className={'btn-confirm'} onClick={() => do_lookup(true)}>Refresh Cache</button>
                        </div>
                    </div>
                </Show>
            </div>
        </>
    )
}
