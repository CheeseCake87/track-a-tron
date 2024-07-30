import {For, useContext} from "solid-js";
import {ContextWorkshopTicket} from "../../../../contextManagers/ContextWorkshopTicket";

export default function Notes(props) {
    const ctxWorkshopTicket = useContext(ContextWorkshopTicket)

    return (
        <>
            <label>Notes</label>
            <div className={'workshop-ticket-notes-bg-wrapper'}>
                <div className={'workshop-ticket-notes'}>
                    <For each={ctxWorkshopTicket.notes()} fallback={
                        <div className={'workshop-ticket-note'}>
                            No Notes
                        </div>
                    }>{(note) => (
                        <div className={'workshop-ticket-note'}>
                            {note.text_note}
                            <div className={'workshop-ticket-note-stats'}>
                                {note.__added_by} @ {note.__created}
                                {' - '}
                                <a
                                    className={'text-red-400'}
                                    onClick={() => {
                                        ctxWorkshopTicket.deleteWorkshopTicketNote(
                                            note.workshop_ticket_note_id
                                        )
                                    }}
                                >Delete</a>
                            </div>
                        </div>
                    )}
                    </For>
                </div>
            </div>
            <div className={'form-section pt-2'}>
            <textarea rows="3" tabIndex={4} id={'workshop-ticket-note'} onKeyUp={
                (e) => {
                    ctxWorkshopTicket.setNote(e.target.value)
                }
            }></textarea>
            </div>
            <div className={'form-section'}>
                <button className={'btn-confirm'} tabIndex={5} onClick={
                    () => {
                        ctxWorkshopTicket.addWorkshopTicketNote()
                    }
                }>Add Note
                </button>
            </div>
        </>
    )
}
