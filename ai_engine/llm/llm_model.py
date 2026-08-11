import os
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

    def generate(self, prompt: str) -> str:
        """
        Generate a response from the LLM.
        """
        response = self._get_llm().invoke(prompt)
        return response.content
