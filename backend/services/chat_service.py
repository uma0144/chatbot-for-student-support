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
        answer = _get_rag_chain().ask(request.question)
        return ChatResponse(answer=answer)


chat_service = ChatService()
