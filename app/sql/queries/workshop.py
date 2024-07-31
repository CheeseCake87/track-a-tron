from datetime import datetime

from sqlalchemy import update, insert, select, func, delete, Select

from app.sql.tables import (
    WorkshopTicket,
    WorkshopTicketDevice,
    WorkshopTicketItem, WorkshopTicketNote,
)
from app.utilities import DatetimeDeltaMC, DatetimeDeltaMCTZU


def query_create_workshop_ticket(
        user_id: int,
        assigned_user_id: str,
        client_id: int,
        workshop_tag: str,
        category_code: int,
        status_code: int,
        request: str,
        no_due_datetime: bool,
        due_datetime: datetime = None,
):
    in_ = (
        insert(WorkshopTicket)
        .values(
            fk_user_id=user_id,
            fk_assigned_user_id=assigned_user_id,
            fk_client_id=client_id,
            workshop_tag=workshop_tag,
            category_code=category_code,
            status_code=status_code,
            request=request,
            no_due_datetime=no_due_datetime,
            due_datetime=due_datetime if not no_due_datetime else None,
            created=DatetimeDeltaMC().datetime,
        )
        .returning(WorkshopTicket)
    )
    return in_


def query_create_workshop_ticket_device(
        workshop_ticket_id: int,
        user_id: int,
        type_: str = None,
        make: str = None,
        model: str = None,
        serial_number: str = None,
        power_adapter_included: bool = False,
        additional_info: str = None,
):
    in_ = (
        insert(WorkshopTicketDevice)
        .values(
            fk_workshop_ticket_id=workshop_ticket_id,
            fk_user_id=user_id,
            type=type_,
            make=make,
            model=model,
            serial_number=serial_number,
            power_adapter_included=power_adapter_included,
            additional_info=additional_info,
            created=DatetimeDeltaMC().datetime,
        )
        .returning(WorkshopTicketDevice)
    )
    return in_


def query_create_workshop_ticket_item(
        workshop_ticket_id: int,
        user_id: int,
        description: str,
):
    in_ = (
        insert(WorkshopTicketItem)
        .values(
            fk_workshop_ticket_id=workshop_ticket_id,
            fk_user_id=user_id,
            description=description,
            created=DatetimeDeltaMC().datetime,
        )
        .returning(WorkshopTicketItem)
    )
    return in_


def query_create_workshop_ticket_note(
        workshop_ticket_id: int,
        user_id: int,
        text_note: str,
):
    in_ = (
        insert(WorkshopTicketNote)
        .values(
            fk_workshop_ticket_id=workshop_ticket_id,
            fk_user_id=user_id,
            text_note=text_note,
            created=DatetimeDeltaMC().datetime,
        )
        .returning(WorkshopTicketNote)
    )
    return in_


def query_count_workshop_tickets():
    se_ = select(func.count(WorkshopTicket.workshop_ticket_id))
    return se_


def query_read_workshop_ticket(where: dict) -> Select | None:
    wh_ = []
    for k, v in where.items():
        wh_.append(getattr(WorkshopTicket, k) == v)
    if not wh_:
        return None
    se_ = select(WorkshopTicket).where(*wh_).order_by(WorkshopTicket.created.desc())
    return se_


def query_read_workshop_ticket_notes(workshop_ticket_id):
    wh_ = (WorkshopTicketNote.fk_workshop_ticket_id == workshop_ticket_id,)
    se_ = select(WorkshopTicketNote).where(*wh_).order_by(WorkshopTicketNote.created.desc())
    return se_


def query_page_workshop_tickets(
        where: dict,
        limit: int = 10,
        page: int = 1,
) -> tuple[select, select]:
    if page == 0:
        page = 1

    wh_arg = []
    for k, v in where.items():
        if k == "_in" and isinstance(v, dict):
            for in_key, in_val in v.items():
                if isinstance(in_val, list):
                    if hasattr(WorkshopTicket, in_key):
                        wh_arg.append(getattr(WorkshopTicket, in_key).in_(in_val))
                        continue

        if k == "date_on":
            minus_day = (
                DatetimeDeltaMCTZU().set_datetime(v, "%Y-%m-%d").days(-1).datetime
            )
            plus_day = DatetimeDeltaMCTZU().set_datetime(v, "%Y-%m-%d").days(1).datetime
            wh_arg.append(WorkshopTicket.created > minus_day)
            wh_arg.append(WorkshopTicket.created < plus_day)
            continue

        if k == "date_from":
            date_from = (
                DatetimeDeltaMCTZU().set_datetime(v, "%Y-%m-%d").days(-1).datetime
            )
            wh_arg.append(WorkshopTicket.created > date_from)
            continue

        if k == "date_to":
            date_to = DatetimeDeltaMCTZU().set_datetime(v, "%Y-%m-%d").days(1).datetime
            wh_arg.append(WorkshopTicket.created < date_to)
            continue

        if hasattr(WorkshopTicket, k):
            wh_arg.append(getattr(WorkshopTicket, k) == v)

    se_ = (
        select(WorkshopTicket)
        .limit(limit)
        .offset((page - 1) * limit)
        .where(*wh_arg)
        .order_by(WorkshopTicket.created.desc())
    )

    count = select(func.count()).select_from(WorkshopTicket).where(*wh_arg).order_by(WorkshopTicket.created)

    return se_, count


def query_update_workshop_ticket(
        workshop_ticket_id: int, values: dict, ignore_fields: list[str] = None
):
    wh_ = (WorkshopTicket.workshop_ticket_id == workshop_ticket_id,)
    up_ = (
        update(WorkshopTicket)
        .where(*wh_)
        .values(
            {
                k: v
                for k, v in values.items()
                if hasattr(WorkshopTicket, k) and k not in ignore_fields
            }
        )
        .returning(WorkshopTicket)
    )
    return up_


def query_delete_workshop_ticket_note(
        workshop_ticket_note_id: int,
):
    wh_ = (WorkshopTicketNote.workshop_ticket_note_id == workshop_ticket_note_id,)
    de_ = delete(WorkshopTicketNote).where(*wh_)
    return de_
