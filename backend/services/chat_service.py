<<<<<<< HEAD
=======
from collections.abc import Iterator

from ai_engine.rag.rag_chain import RAGChain

>>>>>>> cursor/chatgpt-streaming-0ee7
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
<<<<<<< HEAD
        answer = _get_rag_chain().ask(request.question)
        return ChatResponse(answer=answer)
=======
        """
        Get answer from RAG system
        """

        answer = self.rag.ask(request.question, language=request.language)

        return ChatResponse(
            answer=answer
        )
>>>>>>> cursor/chatgpt-streaming-0ee7

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


chat_service = ChatService()
