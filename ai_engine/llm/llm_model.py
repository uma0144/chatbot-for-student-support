import os
from collections.abc import Iterator

from dotenv import load_dotenv
from langchain_groq import ChatGroq

from backend.core.env import PROJECT_ROOT  # loads repo-root .env
from backend.core.groq_config import require_groq_api_key

load_dotenv(PROJECT_ROOT / ".env")


class LLMModel:
    """
    Wrapper class for the Groq LLM.
    """

    def __init__(self):
        self._llm = None

    def _get_llm(self) -> ChatGroq:
        if self._llm is None:
            api_key = require_groq_api_key()
            self._llm = ChatGroq(
                model=os.getenv("LLM_MODEL", "llama-3.3-70b-versatile"),
                temperature=float(os.getenv("TEMPERATURE", 0.2)),
                api_key=api_key,
            )
        return self._llm

    def _handle_llm_error(self, exc: Exception) -> None:
        err = str(exc)
        if "AuthenticationError" in type(exc).__name__ or "invalid_api_key" in err:
            raise RuntimeError(
                "Invalid GROQ_API_KEY. Your key may be revoked or wrong. "
                "Create a new key at https://console.groq.com/, set it in "
                f"{PROJECT_ROOT / '.env'}, then restart the backend."
            ) from exc
        raise exc

    def generate(self, prompt: str) -> str:
        """
        Generate a response from the LLM.
        """
        try:
            response = self._get_llm().invoke(prompt)
            return response.content
        except Exception as exc:
            self._handle_llm_error(exc)
            return ""

    def stream(self, prompt: str) -> Iterator[str]:
        """
        Stream response tokens from the LLM (ChatGPT-style output).
        """
        try:
            for chunk in self._get_llm().stream(prompt):
                content = getattr(chunk, "content", None)
                if content:
                    yield content
        except Exception as exc:
            self._handle_llm_error(exc)
