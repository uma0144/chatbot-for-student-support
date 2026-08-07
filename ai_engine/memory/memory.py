from collections import deque


class ConversationMemory:
    """
    Stores recent conversation history.
    """

    def __init__(self, max_messages: int = 10):
        self.history = deque(maxlen=max_messages)

    def add_user_message(self, message: str):
        self.history.append(("User", message))

    def add_assistant_message(self, message: str):
        self.history.append(("Assistant", message))

    def get_history(self) -> str:
        return "\n".join(
            f"{role}: {message}"
            for role, message in self.history
        )

    def clear(self):
        self.history.clear()