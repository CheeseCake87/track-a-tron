import pathlib as p
import typing as t
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from smtplib import SMTP
from ssl import create_default_context

from app.sql import DBSession
from app.sql.queries.service import query_read_service
from app.sql.queries.system_log import query_create_system_log
from .settings import SMTPSettings


class SMTPService:
    settings: SMTPSettings
    username: str
    password: str
    server: str
    port: int

    _subject: str
    _msg: t.Optional[MIMEMultipart]
    _msg_body: t.Optional[MIMEText]
    _original_sender: str
    _reply_to: str
    _from: str
    _recipients: set[str]
    _cc_recipients: set[str]
    _bcc_recipients: set[str]
    _attachments: set[tuple[p.Path, str]]

    def __init__(self, settings: SMTPSettings = None):
        if settings is None:
            self.settings = self._load_service_settings()
        else:
            self.settings = settings

        # LOAD DEFAULTS
        self._subject = ""
        self._msg_body = MIMEText("")
        self._original_sender = settings.username
        self._reply_to = settings.username
        self._from = settings.username
        self._recipients = set()
        self._cc_recipients = set()
        self._bcc_recipients = set()
        self._attachments = set()

        self._msg = MIMEMultipart()
        self._msg.set_type("multipart/alternative")

    def _reset_values(self):
        self._subject = ""
        self._msg_body = MIMEText("")
        self._recipients = set()
        self._cc_recipients = set()
        self._bcc_recipients = set()
        self._attachments = set()

        self._msg = MIMEMultipart()
        self._msg.set_type("multipart/alternative")

    def __repr__(self) -> str:
        attachments = "\n".join(
            [f"{file} - {status}" for file, status in self._attachments]
        )
        return (
            f"<Class: EmailService>"
            f"\n{self._msg}\n"
            "Files set for attachment:\n"
            f"{attachments}"
        )

    def subject(
        self,
        subject: str,
    ) -> "SMTPService":
        self._subject = subject
        return self

    def body(
        self,
        body: str,
    ) -> "SMTPService":
        self._msg_body = MIMEText(body)
        self._msg_body.set_type("text/html")
        self._msg_body.set_param("charset", "UTF-8")
        self._msg.attach(self._msg_body)
        return self

    def reply_to(self, reply_to: str) -> "SMTPService":
        self._msg.replace_header("Reply-To", reply_to)
        return self

    def from_(self, from_: str) -> "SMTPService":
        self._from = from_
        return self

    def recipients(self, recipients: list[str]) -> "SMTPService":
        self._recipients.update(set(recipients))
        if "To" in self._msg:
            self._msg.replace_header("To", ", ".join(self._recipients))
            return self

        self._msg.add_header("To", ", ".join(self._recipients))
        return self

    def cc_recipients(self, cc_recipients: list[str]) -> "SMTPService":
        self._cc_recipients.update(set(cc_recipients))
        if "CC" in self._msg:
            self._msg.replace_header("CC", ", ".join(self._cc_recipients))
            return self

        self._msg.add_header("CC", ", ".join(self._cc_recipients))
        return self

    def bcc_recipients(self, bcc_recipients: list[str]) -> "SMTPService":
        self._bcc_recipients.update(set(bcc_recipients))
        if "BCC" in self._msg:
            self._msg.replace_header("BCC", ", ".join(self._bcc_recipients))
            return self

        self._msg.add_header("BCC", ", ".join(self._bcc_recipients))
        return self

    def attach_files(self, files: list[str | p.Path]) -> "SMTPService":
        for file in files:
            if isinstance(file, p.Path):
                filepath: p.Path = file
            else:
                filepath: p.Path = p.Path(file)

            self._attachments.update(
                [(filepath, "Exists" if filepath.exists() else "Missing")]
            )

            if filepath.exists():
                contents = MIMEApplication(
                    filepath.read_bytes(), _subtype=filepath.suffix
                )
                contents.add_header(
                    "Content-Disposition", "attachment", filename=filepath.name
                )
                self._msg.attach(contents)

        return self

    def attach_file(self, file: str | p.Path) -> "SMTPService":
        self.attach_files([file])
        return self

    def send(self) -> dict:
        self._msg.add_header("Original-Sender", self._original_sender)
        self._msg.add_header("Reply-To", self._reply_to)
        self._msg.add_header("From", self._from)
        self._msg.add_header("Subject", self._subject)

        try:
            with SMTP(self.settings.server, self.settings.port) as connection:
                connection.starttls(context=create_default_context())
                connection.login(self.settings.username, self.settings.password)
                connection.sendmail(
                    self.settings.username,
                    [
                        *self._recipients,
                        *self._cc_recipients,
                        *self._bcc_recipients,
                    ],
                    self._msg.as_string(),
                )
        except Exception as error:
            with DBSession as s:
                s.execute(
                    query_create_system_log(
                        "SMTP service error",
                        str(error),
                    )
                )
                s.commit()
            return {"ok": False, "message": "Error sending email"}

        self._reset_values()
        return {"ok": True, "message": "Email sent"}

    def _load_service_settings(self) -> SMTPSettings:
        with DBSession as s:
            result = s.execute(query_read_service("smtp")).scalar_one_or_none()

            if not result:
                s.execute(
                    query_create_system_log(
                        "SMTP service not found", "SMTP service not found"
                    )
                )
                s.commit()

                return self._disabled_service

        try:
            return SMTPSettings(
                username=result.data["username"],
                password=result.data["password"],
                server=result.data["server"],
                port=result.data["port"],
                disabled=False,
            )
        except KeyError:
            with DBSession as s:
                s.execute(
                    query_create_system_log(
                        "SMTP service key error",
                        "SMTP service settings is missing keys needed for operation",
                    )
                )
                s.commit()

            return self._disabled_service

    @property
    def _disabled_service(self) -> SMTPSettings:
        return SMTPSettings(
            username="",
            password="",
            server="",
            port=0,
            disabled=True,
        )
