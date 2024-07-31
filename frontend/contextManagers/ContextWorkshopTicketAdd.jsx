import {createContext, createSignal, useContext} from "solid-js";
import {Outlet} from "@solidjs/router";
import {ContextMain} from "./ContextMain";
import rpc_create_client from "../rpc/client/rpc_create_client";
import rpc_find_client from "../rpc/client/rpc_find_client";
import {ContextWorkshop} from "./ContextWorkshop";
import rpc_create_workshop_ticket from "../rpc/workshop/rpc_create_workshop_ticket";

export const ContextWorkshopTicketAdd = createContext()

export function WorkshopTicketAddContextProvider() {

    const ctxMain = useContext(ContextMain)
    const ctxWorkshop = useContext(ContextWorkshop)

    const blankClientAdd = {
        business_name: '',
        first_name: '',
        last_name: '',
        phone: '',
        alt_phone: '',
        email_address: '',
        alt_email_address: '',
        phone_dnc: false,
        email_address_dnc: false
    }
    const blankClientAddAddress = {
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
    }
    const blankDeviceFields = {
        type: 'Select...',
        make: '',
        model: '',
        password: ''
    }
    const blankItemFields = {description: '',}
    const blankFindClientFields = {
        any_name: '',
        any_phone: '',
        any_email: '',
        postcode: ''
    }

    const [findClientWhere, setFindClientWhere] = createSignal({})
    const [findClientFields, setFindClientFields] = createSignal(blankFindClientFields)
    const [clientIDSelected, setClientIDSelected] = createSignal(0)
    const [clientSelected, setClientSelected] = createSignal('')
    const [clientSearchDone, setClientSearchDone] = createSignal(false)
    const [foundClients, setFoundClients] = createSignal([])

    const [addNewClient, setAddNewClient] = createSignal(false)
    const [addAddressManually, setAddAddressManually] = createSignal(false)
    const [clientAdd, setClientAdd] = createSignal(blankClientAdd)
    const [clientAddAddress, setClientAddAddress] = createSignal(blankClientAddAddress)

    const [deviceFields, setDeviceFields] = createSignal(blankDeviceFields)
    const [itemFields, setItemFields] = createSignal(blankItemFields)

    const [request, setRequest] = createSignal('')
    const [statusCode, setStatusCode] = createSignal(1)
    const [categoryCode, setCategoryCode] = createSignal(1)

    const [devices, setDevices] = createSignal([])
    const [items, setItems] = createSignal([])


    function clearClientSearch() {
        setClientIDSelected(0)
        setClientSelected('')
        setAddNewClient(true)
        setClientSearchDone(false)
        setFoundClients([])
        setFindClientFields(blankFindClientFields)
    }

    function buildSelectedClient(row) {
        const displayName = ctxWorkshop.displayName(
            row.business_name,
            row.first_name,
            row.last_name
        )
        const contact = ctxWorkshop.displayContact(
            row.phone,
            row.email_address,
            row.alt_phone,
            row.alt_email_address
        )
        const address = row.__address
        return `${displayName ? displayName : '-'} | ${contact ? contact : '-'} | ${address}`
    }

    function setSelectedClient(row) {
        setClientIDSelected(row.client_id)
        setClientSelected(buildSelectedClient(row))
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

    function addDevice() {
        if (devices().length === 0) {
            setDevices([
                {...blankDeviceFields}
            ])
        } else {
            setDevices([...devices(), {...blankDeviceFields}])
        }
    }

    function updateDevice(name, value) {
        setDeviceFields({...deviceFields(), [name]: value})
    }

    function updateDeviceArray(index, name, value) {
        const newDevices = [...devices()]
        newDevices[index][name] = value
        setDevices(newDevices)
    }

    function removeDeviceArray(index) {
        const newDevices = [...devices()]
        newDevices.splice(index, 1)
        setDevices(newDevices)
    }

    function addItem() {
        if (items().length === 0) {
            setItems([
                {...blankItemFields}
            ])
        } else {
            setItems([...items(), {...blankItemFields}])
        }
    }

    function updateItem(name, value) {
        setItemFields({...itemFields(), [name]: value})
    }

    function updateItemArray(index, name, value) {
        const newItems = [...items()]
        newItems[index][name] = value
        setItems(newItems)
    }

    function removeItemArray(index) {
        const newItems = [...items()]
        newItems.splice(index, 1)
        setItems(newItems)
    }

    function updateFindClient(name, value) {
        setFindClientFields({...findClientFields(), [name]: value})
    }

    function createClient() {
        rpc_create_client(
            ctxMain.userId(),
            {
                ...clientAdd(),
                ...clientAddAddress()
            })
            .then((rpc) => {
                if (rpc.ok) {
                    return [true, rpc.message, rpc.data[0].client_id]
                } else {
                    return [false, rpc.message, 0]
                }
            })
        return [false, '', 0]
    }

    function checkNewTicket() {
        const name = ctxWorkshop.displayName(
            clientAdd().business_name,
            clientAdd().first_name,
            clientAdd().last_name
        )
        if (addNewClient()) {
            if (name === '') {
                return [false, "Client name or business name is required"]
            }
            if (
                clientAdd().phone === '' && clientAdd().email_address === ''
            ) {
                return [false, "Client phone or email is required"]
            }
        } else {
            if (!clientSearchDone()) {
                return [false, "You must search for a client"]
            }
            if (clientIDSelected() === 0) {
                return [false, "You must select a client from the client search results"]
            }
        }
        if (request() === '') {
            return [false, "You must enter a request"]
        }
        return [true, '']
    }

    function createWorkshopTicket() {
        const [checkResult, checkMessage] = checkNewTicket()

        if (!checkResult) {
            ctxMain.showErrorToast(checkMessage)
            return
        }

        if (addNewClient()) {
            const [createClientResult, createClientResultMessage, clientId] = createClient()
            if (!createClientResult) {
                ctxMain.showErrorToast(createClientResultMessage)
                return
            } else {
                setClientIDSelected(clientId)
            }
        }

        rpc_create_workshop_ticket(
            ctxMain.userId(),
            clientIDSelected(),
            categoryCode(),
            statusCode(),
            request(),
            devices(),
            items()
        ).then((rpc) => {
            if (rpc.ok) {
                ctxMain.showSuccessToast(rpc.message)
                ctxMain.navigator('/workshop/ticket/' + rpc.data.workshop_tag)
            } else {
                ctxMain.showErrorToast(rpc.message)
            }
        })
    }

    return (
        <ContextWorkshopTicketAdd.Provider value={{
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

            request: request,
            setRequest: setRequest,
            statusCode: statusCode,
            setStatusCode: setStatusCode,
            categoryCode: categoryCode,
            setCategoryCode: setCategoryCode,

            findClient: findClient,
            createWorkshopTicket: createWorkshopTicket,

            addDevice: addDevice,
            updateDeviceArray: updateDeviceArray,
            removeDeviceArray: removeDeviceArray,

            addItem: addItem,
            updateItemArray: updateItemArray,
            removeItemArray: removeItemArray,

            updateFindClient: updateFindClient,
            clearClientSearch: clearClientSearch,
            setSelectedClient: setSelectedClient,
            buildSelectedClient: buildSelectedClient
        }}>
            <Outlet/>
        </ContextWorkshopTicketAdd.Provider>
    )
}