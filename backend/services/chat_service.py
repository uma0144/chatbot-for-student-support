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

        answer = self.rag.ask(request.question)

        return ChatResponse(
            answer=answer
        )


# Singleton instance
chat_service = ChatService()