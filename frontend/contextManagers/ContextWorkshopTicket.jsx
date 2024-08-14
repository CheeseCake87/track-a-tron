import {createContext, createSignal, onMount, useContext} from "solid-js";
import {Outlet, useParams} from "@solidjs/router";
import {ContextMain} from "./ContextMain";
import {ContextWorkshop} from "./ContextWorkshop";

export const ContextWorkshopTicket = createContext()

export function WorkshopTicketContextProvider() {

    const ctxMain = useContext(ContextMain)
    const ctxWorkshop = useContext(ContextWorkshop)

    const params = useParams()

    const [savingWorkshopTicket, setSavingWorkshopTicket] = createSignal(false)
    const [workshopTicket, setWorkshopTicket] = createSignal({})

    const [client, setClient] = createSignal({})
    const [devices, setDevices] = createSignal([])
    const [items, setItems] = createSignal([])

    const [status, setStatus] = createSignal({})
    const [notes, setNotes] = createSignal([])

    const [note, setNote] = createSignal('')

    let updateDebounceTimer;

    function updateWorkshopTicket(values) {
        setSavingWorkshopTicket(true)
        if (updateDebounceTimer) {
            clearTimeout(updateDebounceTimer)
        }
        updateDebounceTimer = setTimeout(() => {
            ctxMain.api.post(
                '/workshop/update/ticket' + workshopTicket().workshop_ticket_id,
                values
            ).then((res) => {
                if (res.ok) {
                    setSavingWorkshopTicket(false)
                    setWorkshopTicket({
                        workshop_ticket_id: res.data.workshop_ticket_id,
                        status_code: res.data.status_code,
                        workshop_tag: res.data.workshop_tag,
                        category_code: res.data.category_code,
                        request: res.data.request,
                        __assigned_to: res.data.__assigned_to,
                        __assigned_to_id: res.data.__assigned_to_id,
                        __created: res.data.__created,
                    })
                } else {
                    ctxMain.showErrorToast('Error updating ticket. ' + res.message)
                }
            })
        }, 500)
    }

    function getWorkshopTicket() {
        ctxMain.api.get('/workshop/ticket/tag/' + params.workshop_tag).then((res) => {
            if (res.ok) {
                setWorkshopTicket({
                    workshop_ticket_id: res.data.workshop_ticket_id,
                    status_code: res.data.status_code,
                    workshop_tag: res.data.workshop_tag,
                    category_code: res.data.category_code,
                    request: res.data.request,
                    __assigned_to: res.data.__assigned_to,
                    __assigned_to_id: res.data.__assigned_to_id,
                    __created: res.data.__created,
                })
                setClient({...res.data.__client})
                setDevices([...res.data.__devices])
                setItems([...res.data.__items])
                setNotes([...res.data.__notes])
            } else {
                ctxMain.showErrorToast('Ticket not found.')
                ctxMain.navigate('/workshop')
            }
        })
    }

    function deleteWorkshopTicket() {
        ctxMain.api.get('/workshop/ticket/delete/' + workshopTicket().workshop_ticket_id).then((res) => {
            if (res.ok) {
                ctxWorkshop.deBounceGetPageTickets(
                    200, ctxWorkshop.page(), ctxWorkshop.limit(), ctxWorkshop.ticketsWhere()
                )
                ctxMain.showSuccessToast('Ticket deleted.')
                ctxMain.navigate('/workshop')
            } else {
                ctxMain.showErrorToast('Error deleting ticket. ' + res.message)
            }
        })
    }

    // NOTES
    function getWorkshopTicketNotes() {
        ctxMain.api.get(`/workshop/get/ticket/${workshopTicket().workshop_ticket_id}/notes/`).then((res) => {
            if (res.ok) {
                setNotes([...res.data])
            } else {
                ctxMain.showErrorToast('Error fetching notes. ' + res.message)
            }
        })
    }

    function addWorkshopTicketNote() {

        const note_element = document.getElementById('workshop-ticket-note')

        if (note().length > 0) {

            ctxMain.api.post(`/workshop/ticket/${workshopTicket().workshop_ticket_id}/add/note`, {
                user_id: ctxMain.userId(),
                note: note(),
            }).then((res) => {
                if (res.ok) {
                    note_element.value = ''
                    note_element.focus()
                    getWorkshopTicketNotes()
                } else {
                    ctxMain.showErrorToast('Error adding note. ' + res.message)
                }
            })

        } else {
            ctxMain.showErrorToast('Note cannot be empty.')
        }

    }

    function deleteWorkshopTicketNote(workshop_ticket_note_id) {

        ctxMain.api.get(`/ticket/delete/note/${workshop_ticket_note_id}`).then((res) => {
            if (res.ok) {
                setNotes([...notes().filter(note => note.workshop_ticket_note_id !== workshop_ticket_note_id)])
            } else {
                ctxMain.showErrorToast('Error deleting note. ' + res.message)
            }
        })

    }

    onMount(() => {
        getWorkshopTicket()
    })

    return (
        <ContextWorkshopTicket.Provider value={{
            savingWorkshopTicket: savingWorkshopTicket,
            setSavingWorkshopTicket: setSavingWorkshopTicket,

            workshopTicket: workshopTicket,
            setWorkshopTicket: setWorkshopTicket,

            status: status,
            setStatus: setStatus,

            client: client,
            setClient: setClient,

            devices: devices,
            setDevices: setDevices,
            items: items,
            setItems: setItems,

            notes: notes,
            setNotes: setNotes,
            note: note,
            setNote: setNote,

            updateWorkshopTicket: updateWorkshopTicket,
            addWorkshopTicketNote: addWorkshopTicketNote,
            deleteWorkshopTicketNote: deleteWorkshopTicketNote,

            deleteWorkshopTicket: deleteWorkshopTicket,
        }}>
            <Outlet/>
        </ContextWorkshopTicket.Provider>
    )
}
