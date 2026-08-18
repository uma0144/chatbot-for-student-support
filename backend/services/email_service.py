import os
import smtplib
from email.message import EmailMessage


def send_email(to: str, subject: str, body: str) -> bool:
    """
    Send email when SMTP is configured in .env.
    Returns True if sent, False if SMTP not configured or send failed.
    """
    host = os.getenv("SMTP_HOST", "").strip()
    port = int(os.getenv("SMTP_PORT", "587"))
    user = os.getenv("SMTP_USER", "").strip()
    password = os.getenv("SMTP_PASSWORD", "").strip()
    from_addr = os.getenv("SMTP_FROM", user).strip()

    if not host or not user or not password or not to:
        return False

    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = from_addr
    msg["To"] = to
    msg.set_content(body)

    try:
        with smtplib.SMTP(host, port, timeout=15) as server:
            server.starttls()
            server.login(user, password)
            server.send_message(msg)
        return True
    except Exception as exc:
        print(f"Email send failed: {exc}")
        return False


def notify_ticket_created(user_email: str, subject: str, ticket_id: int) -> bool:
    support = os.getenv("SUPPORT_EMAIL", "admission@itmuniversity.ac.in").strip()
    body = (
        f"A new support ticket (#{ticket_id}) was submitted.\n\n"
        f"From: {user_email}\n"
        f"Subject: {subject}\n\n"
        "Please review in the admin dashboard."
    )
    sent_support = send_email(support, f"[ITM Support] New ticket #{ticket_id}", body)
    sent_user = send_email(
        user_email,
        "ITM Support — ticket received",
        f"We received your ticket (#{ticket_id}): {subject}\n\n"
        "Our team will respond soon.",
    )
    return sent_support or sent_user
