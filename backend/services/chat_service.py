from collections.abc import Iterator

from ai_engine.rag.rag_chain import RAGChain

from backend.models.request import ChatRequest
from backend.models.response import ChatResponse


class ChatService:
    def __init__(self):
        # Load RAG only once
        self.rag = RAGChain()

    def get_response(self, request: ChatRequest) -> ChatResponse:
        """
        Get answer from RAG system
        """

        answer = self.rag.ask(request.question, language=request.language)

        return ChatResponse(
            answer=answer
        )

    def stream_answer_text(
        self, question: str, language: str = "en"
    ) -> tuple[Iterator[tuple[str, str]], list[str]]:
        """
        Returns the RAG stream iterator and a mutable list that will hold the final answer.
        """
        final_answer: list[str] = [""]

        def tracked_stream() -> Iterator[tuple[str, str]]:
            parts: list[str] = []
            for event_type, payload in self.rag.stream_ask(question, language=language):
                if event_type == "token":
                    parts.append(payload)
                elif event_type == "replace":
                    parts.clear()
                    parts.append(payload)
                yield event_type, payload
            final_answer[0] = "".join(parts).strip()

        return tracked_stream(), final_answer


# Singleton instance
chat_service = ChatService()