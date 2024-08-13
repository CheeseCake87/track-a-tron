import typing as t
from datetime import datetime

import sqlalchemy as s
from app.api.workshop.models import (
    WorkshopTicket,
    WorkshopTicketDevice,
    WorkshopTicketItem,
    WorkshopTicketNote,
)
from app.extensions import db
from app.utilities import DatetimeDeltaMC, DatetimeDeltaMCTZU


def _workshop_ticket_where_clause(where: dict) -> set:
    wh_ = set()
    for k, v in where.items():
        if k == "_in" and isinstance(v, dict):
            for in_key, in_val in v.items():
                if isinstance(in_val, list):
                    if hasattr(WorkshopTicket, in_key):
                        wh_.add(getattr(WorkshopTicket, in_key).in_(in_val))
                        continue

        if k == "date_on":
            minus_day = (
                DatetimeDeltaMCTZU().set_datetime(v, "%Y-%m-%d").days(-1).datetime
            )
            plus_day = DatetimeDeltaMCTZU().set_datetime(v, "%Y-%m-%d").days(1).datetime
            wh_.add(WorkshopTicket.created > minus_day)
            wh_.add(WorkshopTicket.created < plus_day)
            continue

        if k == "date_from":
            date_from = (
                DatetimeDeltaMCTZU().set_datetime(v, "%Y-%m-%d").days(-1).datetime
            )
            wh_.add(WorkshopTicket.created > date_from)
            continue

        if k == "date_to":
            date_to = DatetimeDeltaMCTZU().set_datetime(v, "%Y-%m-%d").days(1).datetime
            wh_.add(WorkshopTicket.created < date_to)
            continue

        if hasattr(WorkshopTicket, k):
            wh_.add(getattr(WorkshopTicket, k) == v)

    return wh_


def query_all_paged(
        limit: int, page: int, where: dict
) -> tuple[list[WorkshopTicket], int, int]:
    """
    Query all clients with pagination.

    return: tuple [ list[clients], client_count, pages ]
    """

    wh_ = _workshop_ticket_where_clause(where)

    ticket_count = db.session.execute(
        s.select(s.func.count(WorkshopTicket.workshop_ticket_id)).where(*wh_)
    ).scalar()

    pages = ticket_count // limit + 1

    tickets = (
        s.execute(
            s.select(WorkshopTicket).where(*wh_).limit(limit).offset((page - 1) * limit)
        )
        .scalars()
        .all()
    )

    return tickets, ticket_count, pages


def query_create_workshop_ticket(
        user_id: int,
        assigned_user_id: int,
        client_id: int,
        category_code: int,
        status_code: int,
        request: str,
        no_due_datetime: bool,
        due_datetime: datetime = None,
        created: datetime = None,
        _auto_commit: bool = True,
        _flush: bool = True,
) -> WorkshopTicket:
    re_ = db.session.execute(
        s.insert(WorkshopTicket)
        .values(
            fk_user_id=user_id,
            fk_assigned_user_id=assigned_user_id,
            fk_client_id=client_id,
            category_code=category_code,
            status_code=status_code,
            request=request,
            no_due_datetime=no_due_datetime,
            due_datetime=due_datetime if not no_due_datetime else None,
            created=created if created else DatetimeDeltaMC().datetime,
        )
        .returning(WorkshopTicket)
    ).scalar()

    db.session.flush()

    new_id = re_.workshop_ticket_id
    re_.workshop_tag = f"{new_id}-{client_id}"

    if _auto_commit:
        db.session.commit()
    else:
        if _flush:
            db.session.flush()

    return re_


def query_create_workshop_ticket_device(
        workshop_ticket_id: int,
        user_id: int,
        type_: str = None,
        make: str = None,
        model: str = None,
        serial_number: str = None,
        password: str = None,
        power_adapter_included: bool = False,
        additional_info: str = None,
        _created: datetime = None,
        _auto_commit: bool = True,
        _flush: bool = True,
):
    re_ = db.session.execute(
        s.insert(WorkshopTicketDevice)
        .values(
            fk_workshop_ticket_id=workshop_ticket_id,
            fk_user_id=user_id,
            type=type_,
            make=make,
            model=model,
            serial_number=serial_number,
            password=password,
            power_adapter_included=power_adapter_included,
            additional_info=additional_info,
            created=_created if _created else DatetimeDeltaMC().datetime,
        )
        .returning(WorkshopTicketDevice)
    ).scalar()

    if _auto_commit:
        db.session.commit()
    else:
        if _flush:
            db.session.flush()

    return re_


def query_create_workshop_ticket_item(
        workshop_ticket_id: int,
        user_id: int,
        description: str,
        _created: datetime = None,
        _auto_commit: bool = True,
        _flush: bool = True,
):
    re_ = db.session.execute(
        s.insert(WorkshopTicketItem)
        .values(
            fk_workshop_ticket_id=workshop_ticket_id,
            fk_user_id=user_id,
            description=description,
            created=_created if _created else DatetimeDeltaMC().datetime,
        )
        .returning(WorkshopTicketItem)
    ).scalar()

    if _auto_commit:
        db.session.commit()
    else:
        if _flush:
            db.session.flush()

    return re_


def query_create_workshop_ticket_note(
        workshop_ticket_id: int,
        user_id: int,
        text_note: str,
        _auto_commit: bool = True,
        _flush: bool = True,
) -> WorkshopTicketNote:
    in_ = (
        s.insert(WorkshopTicketNote)
        .values(
            fk_workshop_ticket_id=workshop_ticket_id,
            fk_user_id=user_id,
            text_note=text_note,
            created=DatetimeDeltaMC().datetime,
        )
        .returning(WorkshopTicketNote)
    )
    re_ = db.session.execute(in_).scalar()

    if _auto_commit:
        db.session.commit()
    else:
        if _flush:
            db.session.flush()

    return re_


def query_count_workshop_tickets():
    se_ = s.select(s.func.count(WorkshopTicket.workshop_ticket_id))
    return se_


def query_read_workshop_ticket_using_pk(
        workshop_ticket_id: int,
) -> WorkshopTicket | None:
    wh_ = (WorkshopTicket.workshop_ticket_id == workshop_ticket_id,)
    se_ = s.select(WorkshopTicket).where(*wh_)
    re_ = db.session.execute(se_).scalar()
    return re_


def query_read_workshop_ticket_using_tag(
        workshop_tag: str,
) -> WorkshopTicket | None:
    wh_ = (WorkshopTicket.workshop_tag == workshop_tag,)
    se_ = s.select(WorkshopTicket).where(*wh_)
    re_ = db.session.execute(se_).scalar()
    return re_


def query_read_workshop_ticket_using_client_id(
        client_id: int,
) -> t.List[WorkshopTicket]:
    wh_ = (WorkshopTicket.fk_client_id == client_id,)
    se_ = s.select(WorkshopTicket).where(*wh_).order_by(WorkshopTicket.created.desc())
    re_ = db.session.execute(se_).scalars().all()
    return re_


def query_read_workshop_ticket(where: dict) -> s.Select | None:
    wh_ = []
    for k, v in where.items():
        wh_.append(getattr(WorkshopTicket, k) == v)
    if not wh_:
        return None
    se_ = s.select(WorkshopTicket).where(*wh_).order_by(WorkshopTicket.created.desc())
    return se_


def query_read_workshop_ticket_notes(workshop_ticket_id) -> t.List[WorkshopTicketNote]:
    wh_ = (WorkshopTicketNote.fk_workshop_ticket_id == workshop_ticket_id,)
    se_ = (
        s.select(WorkshopTicketNote)
        .where(*wh_)
        .order_by(WorkshopTicketNote.created.desc())
    )
    re_ = db.session.execute(se_).scalars().all()
    return re_


def query_update_workshop_ticket(
        workshop_ticket_id: int, values: dict, _auto_commit: bool = True, _flush: bool = True
) -> WorkshopTicket | None:
    ignore_fields = {"workshop_ticket_id", "created"}

    wh_ = (WorkshopTicket.workshop_ticket_id == workshop_ticket_id,)
    up_ = (
        s.update(WorkshopTicket)
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
    re_ = db.session.execute(up_).scalar()

    if _auto_commit:
        db.session.commit()
    else:
        if _flush:
            db.session.flush()

    return re_


def query_delete_workshop_ticket_note(
        workshop_ticket_note_id: int,
        _auto_commit: bool = True,
        _flush: bool = True,
):
    wh_ = (WorkshopTicketNote.workshop_ticket_note_id == workshop_ticket_note_id,)
    de_ = s.delete(WorkshopTicketNote).where(*wh_)
    db.session.execute(de_)

    if _auto_commit:
        db.session.commit()
    else:
        if _flush:
            db.session.flush()

    return de_
