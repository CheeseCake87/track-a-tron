import {createContext, createSignal, onMount, useContext} from "solid-js";
import {Outlet, useParams} from "@solidjs/router";
import {ContextMain} from "./ContextMain";
import rpc_get_workshop_ticket from "../rpc/workshop/rpc_get_workshop_ticket";
import rpc_get_all_active_users from "../rpc/system/rpc_get_all_active_users";
import rpc_get_workshop_ticket_notes from "../rpc/workshop/rpc_get_workshop_ticket_notes";
import rpc_create_workshop_ticket_note from "../rpc/workshop/rpc_create_workshop_ticket_note";
import rpc_delete_workshop_ticket_note from "../rpc/workshop/rpc_delete_workshop_ticket_note";
import rpc_update_workshop_ticket from "../rpc/workshop/rpc_update_workshop_ticket_note";
import {STATUS_CODES} from "../globals";

export const ContextWorkshopTicket = createContext()

export function WorkshopTicketContextProvider() {

    const ctxMain = useContext(ContextMain)

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
        rpc_update_workshop_ticket(
            workshopTicket().workshop_ticket_id,
            values
        ).then((rpc) => {
            if (rpc.ok) {
                setSavingWorkshopTicket(false)
                getWorkshopTicket()
                ctxMain.showSuccessToast('Ticket updated.')
            } else {
                ctxMain.showErrorToast('Error updating ticket. ' + rpc.message)
            }
        })
    }

    // NOTES
    function getWorkshopTicketNotes(workshop_ticket_id) {

        rpc_get_workshop_ticket_notes(
            workshop_ticket_id ? workshop_ticket_id : workshopTicket().workshop_ticket_id
        ).then((rpc) => {
            if (rpc.ok) {
                if (rpc.data.notes.length > 0) {
                    setNotes([...rpc.data.notes])
                } else {
                    setNotes([])
                }
            } else {
                ctxMain.showErrorToast('Error fetching notes. ' + rpc.message)
            }
        })

    }

    function addWorkshopTicketNote() {
        const note_element = document.getElementById('workshop-ticket-note')
        if (note().length > 0) {
            rpc_create_workshop_ticket_note(
                workshopTicket().workshop_ticket_id,
                ctxMain.userId(),
                note()
            ).then((rpc) => {
                if (rpc.ok) {
                    note_element.value = ''
                    note_element.focus()
                    getWorkshopTicketNotes()
                } else {
                    ctxMain.showErrorToast('Error adding note. ' + rpc.message)
                }
            })
        } else {
            ctxMain.showErrorToast('Note cannot be empty.')
        }
    }

    function deleteWorkshopTicketNote(workshop_ticket_note_id) {
        rpc_delete_workshop_ticket_note(
            workshop_ticket_note_id
        ).then((rpc) => {
            if (rpc.ok) {
                getWorkshopTicketNotes()
            } else {
                ctxMain.showErrorToast('Error deleting note. ' + rpc.message)
            }
        })
    }

    function getWorkshopTicket() {
        rpc_get_workshop_ticket(params.workshop_tag).then(
            (rpc) => {
                if (rpc.ok) {
                    setWorkshopTicket({
                        workshop_ticket_id: rpc.data.workshop_ticket_id,
                        status_code: rpc.data.status_code,
                        workshop_tag: rpc.data.workshop_tag,
                        category_code: rpc.data.category_code,
                        request: rpc.data.request,
                        __assigned_to: rpc.data.__assigned_to,
                        __assigned_to_id: rpc.data.__assigned_to_id,
                        __created: rpc.data.__created,
                    })
                    setClient({...rpc.data.__client})
                    setDevices([...rpc.data.__devices])
                    setItems([...rpc.data.__items])
                    getWorkshopTicketNotes(rpc.data.workshop_ticket_id)
                } else {
                    ctxMain.showErrorToast('Ticket not found.')
                }
            }
        )
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
        }}>
            <Outlet/>
        </ContextWorkshopTicket.Provider>
    )
}
