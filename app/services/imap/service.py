from imaplib import IMAP4_SSL

import mailparser as mp

from .settings import IMAPSettings


class IMAPEmailService:
    dev_mode: bool
    username: str
    password: str
    server: str
    port: int

    inbox: list[bytes]

    def __init__(self, settings: IMAPSettings):
        self.dev_mode = settings.dev_mode
        self.username = settings.username
        self.password = settings.password
        self.server = settings.server
        self.port = settings.port
        self.emails = []

    def get_emails(self):
        with IMAP4_SSL(self.server, self.port, timeout=10) as do:
            do.login(self.username, self.password)
            do.select("INBOX")
            _, data = do.search(None, "ALL")
            listed = data[0].split()

            for num in listed:
                _, resp = do.fetch(num, "(RFC822)")
                if resp:
                    raw = resp[0]
                    if isinstance(raw, tuple):
                        email = mp.parse_from_bytes(raw[1])
                        print("FROM ::", email.from_)
                        print("TO :: ", email.to, email.delivered_to)
                        print("Subject :: ", email.subject)
                        print("Date :: ", email.date)
                        print("---- HTML ----")
                        print(email.text_html)
                        print("---- TEXT ----")
                        print(email.text_plain)
                        print("----")

    def __repr__(self) -> str:
        return f"<Class: EmailService>" f"\n{self.emails}\n"
