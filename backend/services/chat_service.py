from collections.abc import Iterator

from backend.models.request import ChatRequest
from backend.models.response import ChatResponse

_rag_chain = None


def _get_rag_chain():
    """Load RAG on first chat request so the server binds to PORT quickly on deploy."""
    global _rag_chain
    if _rag_chain is None:
        from ai_engine.rag.rag_chain import RAGChain

        print("Loading RAG pipeline (embeddings + FAISS)...")
        _rag_chain = RAGChain()
        print("RAG pipeline ready.")
    return _rag_chain


class ChatService:
    def get_response(self, request: ChatRequest) -> ChatResponse:
        language = getattr(request, "language", "en") or "en"
        answer = _get_rag_chain().ask(request.question, language=language)
        return ChatResponse(answer=answer)

    def stream_answer_text(
        self, question: str, language: str = "en"
    ) -> tuple[Iterator[tuple[str, str]], list[str]]:
        """RAG stream iterator plus a mutable list that receives the final answer."""
        rag = _get_rag_chain()
        final_answer: list[str] = [""]

        def tracked_stream() -> Iterator[tuple[str, str]]:
            parts: list[str] = []
            for event_type, payload in rag.stream_ask(question, language=language):
                if event_type == "token":
                    parts.append(payload)
                elif event_type == "replace":
                    parts.clear()
                    parts.append(payload)
                yield event_type, payload
            final_answer[0] = "".join(parts).strip()

        return tracked_stream(), final_answer


chat_service = ChatService()
