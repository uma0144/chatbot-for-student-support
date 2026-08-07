from .retriever import Retriever
from ..llm.llm_model import LLMModel


class RAGChain:
    """
    Retrieval-Augmented Generation (RAG) Pipeline
    """

    def __init__(self):
        self.retriever = Retriever()
        self.llm = LLMModel()

    def ask(self, question: str) -> str:
        """
        Retrieve relevant documents and generate an answer.
        """

        # Retrieve top documents
        docs = self.retriever.search(question, k=5)

        print("\n" + "=" * 80)
        print("RETRIEVED DOCUMENTS")
        print("=" * 80)

        context = ""

        if not docs:
            print("No relevant documents found.")
        else:
            for i, doc in enumerate(docs, start=1):
                print(f"\nDocument {i}")
                print("-" * 80)
                print(doc.page_content)
                print("-" * 80)

                context += doc.page_content + "\n\n"

        print("\n" + "=" * 80)
        print("CONTEXT")
        print("=" * 80)
        print(context)

        prompt = f"""
You are an AI Student Support Assistant for ITM University.

You must answer ONLY from the CONTEXT below.

Rules:
- Use ONLY the information in the context.
- Do not use outside knowledge.
- If the answer is not available in the context, reply:
  "I couldn't find that information in the knowledge base."
- Give complete and well-formatted answers whenever possible.

==========================
CONTEXT
==========================

{context}

==========================
QUESTION
==========================

{question}

==========================
ANSWER
==========================
"""

        print("\n" + "=" * 80)
        print("PROMPT")
        print("=" * 80)
        print(prompt)

        answer = self.llm.generate(prompt)

        print("\n" + "=" * 80)
        print("GROQ RESPONSE")
        print("=" * 80)
        print(answer)

        return answer


if __name__ == "__main__":

    rag = RAGChain()

    print("=" * 80)
    print("AI Student Support Chatbot (Groq + RAG)")
    print("=" * 80)

    while True:

        question = input("\nYou: ").strip()

        if question.lower() == "exit":
            break

        answer = rag.ask(question)

        print("\n" + "=" * 80)
        print("ASSISTANT")
        print("=" * 80)
        print(answer)