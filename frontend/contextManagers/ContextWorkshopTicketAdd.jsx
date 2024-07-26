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
    const [addNewClient, setAddNewClient] = createSignal(false)
    const [clientIDSelected, setClientIDSelected] = createSignal(0)
    const [clientSelected, setClientSelected] = createSignal('')
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
    const [foundClients, setFoundClients] = createSignal([])
    const [clientSearchDone, setClientSearchDone] = createSignal(false)

    const [deviceFields, setDeviceFields] = createSignal({
        type: 'Select...',
        make: '',
        model: '',
        password: ''
    })
    const [itemFields, setItemFields] = createSignal({
        description: '',
    })
    const [findClientFields, setFindClientFields] = createSignal({
        any_name: '',
        any_phone: '',
        any_email: '',
        postcode: ''
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

    function findClient() {
        const where = {
            __limit__: 10
        }
        if (findClientFields().any_name !== '') {
            where.any_name = findClientFields().any_name
        }
        if (findClientFields().any_phone !== '') {
            where.any_phone = findClientFields().any_phone
        }
        if (findClientFields().any_email !== '') {
            where.any_email = findClientFields().any_email
        }
        if (findClientFields().postcode !== '') {
            where.postcode = findClientFields().postcode
        }
        rpc_find_client(where).then(
            (rpc) => {
                if (rpc.ok) {
                    setFoundClients(rpc.data)
                    setClientSearchDone(true)
                } else {
                    setFoundClients([])
                    setClientSearchDone(true)
                }
            }
        )

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
        if (deviceFields().type === '' || deviceFields().type === 'Select...') {
            ctxMain.showErrorToast('Device type is required')
            return
        }
        const focus_el = document.getElementById('add-device-focus-field')
        setDevices([...devices(), deviceFields()])
        setDeviceFields({
            type: 'Select...',
            make: '',
            model: '',
            password: '',
        })
        focus_el.focus()
    }

    function addItem() {
        if (itemFields().description === '') {
            ctxMain.showErrorToast('Item description is required')
            return
        }
        const focus_el = document.getElementById('add-item-focus-field')
        setItems([...items(), itemFields()])
        setItemFields({
            description: '',
        })
        focus_el.focus()
    }

    function updateDevice(name, value) {
        setDeviceFields({...deviceFields(), [name]: value})
    }

    function updateItem(name, value) {
        setItemFields({...itemFields(), [name]: value})
    }

    function updateFindClient(name, value) {
        setFindClientFields({...findClientFields(), [name]: value})
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

            addNewClient: addNewClient,
            setAddNewClient: setAddNewClient,

            deviceFields: deviceFields,
            setDeviceFields: setDeviceFields,
            itemFields: itemFields,
            setItemFields: setItemFields,
            findClientFields: findClientFields,
            setFindClientFields: setFindClientFields,

            devices: devices,
            setDevices: setDevices,
            items: items,
            setItems: setItems,
            foundClients: foundClients,
            setFoundClients: setFoundClients,

            clientSearchDone: clientSearchDone,
            setClientSearchDone: setClientSearchDone,

            clientIDSelected: clientIDSelected,
            setClientIDSelected: setClientIDSelected,
            clientSelected: clientSelected,
            setClientSelected: setClientSelected,

            createClient: createClient,
            findClient: findClient,
            createWorkshopTicket: createWorkshopTicket,
            addDevice: addDevice,
            addItem: addItem,
            updateDevice: updateDevice,
            updateItem: updateItem,
            updateFindClient: updateFindClient
        }}>
            <Outlet/>
        </ContextWorkshopTicketAdd.Provider>
    )
}