import pathlib as p
import typing as t
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from smtplib import SMTP, SMTPException
from ssl import create_default_context

from .settings import SMTPSettings


class SMTPService:
    dev_mode: bool
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

    def __init__(self, settings: SMTPSettings):
        self.dev_mode = settings.dev_mode
        self.username = settings.username
        self.password = settings.password
        self.server = settings.server
        self.port = settings.port

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

    def send(self, debug: bool = False) -> bool:
        """
        Sends the email. If debug is True, it will print the email.
        :param debug:
        :return:
        """

        self._msg.add_header("Original-Sender", self._original_sender)
        self._msg.add_header("Reply-To", self._reply_to)
        self._msg.add_header("From", self._from)
        self._msg.add_header("Subject", self._subject)

        if self.dev_mode:
            print(self)
            self._reset_values()
            return True

        try:
            with SMTP(self.server, self.port) as connection:
                connection.starttls(context=create_default_context())
                connection.login(self.username, self.password)
                connection.sendmail(
                    self.username,
                    [
                        *self._recipients,
                        *self._cc_recipients,
                        *self._bcc_recipients,
                    ],
                    self._msg.as_string(),
                )
        except SMTPException as error:
            if debug:
                print(error)
                self._reset_values()

            return False

        if debug:
            print(self)

        self._reset_values()
        return True