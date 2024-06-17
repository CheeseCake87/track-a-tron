import {createSignal, For, onMount, Show, useContext} from "solid-js";
import {createStore} from "solid-js/store";
import {rpc_get_address_cache_find, rpc_get_address_find} from "../../rpc/services/get_address";
import {ContextMain} from "../../contextManagers/ContextMain";

export default function GetAddress(props) {

    const ctxMain = useContext(ContextMain)

    const [getAddressResult, setGetAddressResult] = createStore([])
    const [getAddressPostcode, setGetAddressPostcode] = createSignal('')

    function do_lookup() {
        if (getAddressPostcode().length < 5) {
            ctxMain.showErrorToast('Postcode is too short')
            return
        }
        if (props.cachePostcode) {
            rpc_get_address_cache_find(getAddressPostcode()).then(
                (rpc) => {
                    console.log(rpc)
                    if (rpc.ok) {
                        setGetAddressResult(rpc.data.addresses)
                    } else {
                        ctxMain.showErrorToast(rpc.message)
                    }
                }
            )
        } else {
            rpc_get_address_find(getAddressPostcode()).then(
                (rpc) => {
                    console.log(rpc)
                    if (rpc.ok) {
                        setGetAddressResult(rpc.data.addresses)
                    } else {
                        ctxMain.showErrorToast(rpc.message)
                    }
                }
            )
        }
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
            <div className={'field-group'}>
                <div className={'py-2'}>
                    <label>Postcode Lookup</label>
                    <input type={'text'} value={getAddressPostcode()} onKeyUp={
                        (e) => {
                            setGetAddressPostcode(e.target.value)
                        }
                    }/>
                </div>
                <div className={'flex flex-col justify-end pb-1.5'}>
                    <button className={'btn-confirm'} onClick={() => do_lookup()}>Find Address
                    </button>
                </div>
            </div>
            <Show when={getAddressResult.length > 0}>
                <div className={'field-group'}>
                    <div className={'py-2'}>
                        <label>Addresses Found</label>
                        <select onChange={
                            (e) => {
                                setAddressFromIndex(e.target.value, getAddressPostcode())
                            }
                        }>
                            <option value={"clear"}>Choose Address</option>
                            <For each={getAddressResult}>
                                {(address, index) =>
                                    <option
                                        value={index()}>{address.formatted_address.filter(Boolean).join(", ")}</option>
                                }
                            </For>
                        </select>
                    </div>
                </div>
            </Show>
        </>
    )
}

/*
{
building_number: address.building_number,
sub_building_number: address.sub_building_number,
building_name: address.building_name,
sub_building_name: address.sub_building_name,
address_line_1: address.thoroughfare,
address_line_2: address.line_2,
address_line_3: address.line_3,
locality: address.locality,
town_or_city: address.town_or_city,
county: address.county,
district: address.district,
postcode: address.postcode,
country: address.country
}
*/