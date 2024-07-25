import {createContext, createSignal, useContext} from "solid-js";
import {Outlet} from "@solidjs/router";
import {ContextMain} from "./ContextMain";
import rpc_create_client from "../rpc/client/rpc_create_client";
import rpc_find_client from "../rpc/client/rpc_find_client";
import {createStore} from "solid-js/store";

export const ContextWorkshopTicketAdd = createContext()

export function WorkshopTicketAddContextProvider() {

    const ctxMain = useContext(ContextMain)

    const [addTicketEnabled, setAddTicketEnabled] = createSignal(false)
    const [addAddressManually, setAddAddressManually] = createSignal(false)
    const [clientAdd, setClientAdd] = createSignal({
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
    const [clientAddAddress, setClientAddAddress] = createSignal({
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
    const [findClientWhere, setFindClientWhere] = createSignal({})
    const [devices, setDevices] = createSignal([])
    const [items, setItems] = createSignal([])
    const [device, setDevice] = createSignal({
        type: 'Select...',
        make: '',
        model: '',
    })
    const [item, setItem] = createSignal({
        description: '',
    })

    function createClient() {
        rpc_create_client(
            ctxMain.userId(),
            {
                ...clientAdd(),
                ...clientAddAddress()
            })
            .then((rpc) => {
                if (rpc.ok) {
                    ctxMain.showSuccessToast('Client created')
                    ctxMain.navigator(`/client/${rpc.data[0].client_id}`)
                } else {
                    ctxMain.showErrorToast(rpc.message)
                }
            })
    }

    function findClient(where) {
        rpc_find_client(
            where
        )
            .then((rpc) => {
                if (rpc.ok) {
                    setClientAdd(rpc.data[0])
                } else {
                    ctxMain.showErrorToast(rpc.message)
                }
            })

    }

    function createWorkshopTicket() {
        rpc_create_client(
            ctxMain.userId(),
            {
                ...clientAdd(),
                ...clientAddAddress()
            })
            .then((rpc) => {
                if (rpc.ok) {
                    ctxMain.showSuccessToast('Client created')
                    ctxMain.navigator(`/client/${rpc.data[0].client_id}`)
                } else {
                    ctxMain.showErrorToast(rpc.message)
                }
            })
    }

    function addDevice() {
        if (device().type === '' || device().type === 'Select...' || device().make === '') {
            ctxMain.showErrorToast('Device make and type are required')
            return
        }
        const focus_el = document.getElementById('add-device-focus-field')
        setDevices([...devices(), device()])
        setDevice({
            type: 'Select...',
            make: '',
            model: '',
        })
        focus_el.focus()
    }

    function addItem() {
        if (item().description === '') {
            ctxMain.showErrorToast('Item description is required')
            return
        }
        const focus_el = document.getElementById('add-item-focus-field')
        setItems([...items(), item()])
        setItem({
            description: '',
        })
        focus_el.focus()
    }

    function updateDevice(name, value) {
        setDevice({...device(), [name]: value})
    }

    function updateItem(name, value) {
        setItem({...item(), [name]: value})
    }

    return (
        <ContextWorkshopTicketAdd.Provider value={{
            addTicketEnabled: addTicketEnabled,
            addAddressManually: addAddressManually,
            setAddAddressManually: setAddAddressManually,
            clientAdd: clientAdd,
            setClientAdd: setClientAdd,
            clientAddAddress: clientAddAddress,
            setClientAddAddress: setClientAddAddress,
            findClientWhere: findClientWhere,
            device: device,
            setDevice: setDevice,
            item: item,
            setItem: setItem,

            devices: devices,
            setDevices: setDevices,
            items: items,
            setItems: setItems,

            createClient: createClient,
            findClient: findClient,
            createWorkshopTicket: createWorkshopTicket,
            addDevice: addDevice,
            addItem: addItem,
            updateDevice: updateDevice,
            updateItem: updateItem
        }}>
            <Outlet/>
        </ContextWorkshopTicketAdd.Provider>
    )
}