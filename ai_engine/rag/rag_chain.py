from collections.abc import Iterator

from .query_preprocessor import normalize_query
from .retriever import Retriever
from .keyword_fallback import keyword_search, topic_snippets, merge_documents
from .prompts import (
    OFFICIAL_FOOTER,
    build_answer_prompt,
    build_retry_prompt,
    is_refusal,
)
from ..llm.llm_model import LLMModel


class RAGChain:
    """
    Retrieval-Augmented Generation (RAG) Pipeline
    """

    def __init__(self):
        self.retriever = Retriever()
        self.llm = LLMModel()

    def _gather_context(self, question: str) -> tuple[str, list]:
        vector_docs = self.retriever.search(question, k=10)
        topic_docs = topic_snippets(question)
        keyword_docs = keyword_search(question, k=6)

        docs = merge_documents(topic_docs, vector_docs, keyword_docs, limit=12)

        parts = []
        for doc in docs:
            parts.append(doc.page_content)

        return "\n\n---\n\n".join(parts), docs

    def ask(self, question: str) -> str:
        """
        Retrieve relevant documents and generate an answer.
        """
        context, docs = self._gather_context(question)

        print("\n" + "=" * 80)
        print(f"RETRIEVED {len(docs)} DOCUMENT(S)")
        print("=" * 80)
        for i, doc in enumerate(docs, start=1):
            print(f"\n[{i}] {doc.metadata.get('source', '?')} ({doc.metadata.get('type', '?')})")
            print(doc.page_content[:400] + ("..." if len(doc.page_content) > 400 else ""))

        normalized = normalize_query(question)
        question_note = ""
        if normalized.lower() != question.strip().lower():
            question_note = f"\n(Intended meaning: {normalized})"

        prompt = build_answer_prompt(context, question, question_note)
        answer = self.llm.generate(prompt)

        if is_refusal(answer):
            print("\n[Retry] First answer looked like a refusal — retrying with stricter prompt")
            retry_prompt = build_retry_prompt(context, question, question_note)
            answer = self.llm.generate(retry_prompt)

        if is_refusal(answer) or len(answer.strip()) < 20:
            answer = self._minimal_helpful_answer(question, context)

        return answer.strip()

    def _build_question_prompt(self, question: str, context: str) -> str:
        normalized = normalize_query(question)
        question_note = ""
        if normalized.lower() != question.strip().lower():
            question_note = f"\n(Intended meaning: {normalized})"
        return build_answer_prompt(context, question, question_note)

    def stream_ask(self, question: str) -> Iterator[tuple[str, str]]:
        """
        Retrieve context, then stream the LLM answer token-by-token.
        Yields (event_type, payload) where event_type is "token" or "replace".
        """
        context, docs = self._gather_context(question)

        print("\n" + "=" * 80)
        print(f"STREAM — RETRIEVED {len(docs)} DOCUMENT(S)")
        print("=" * 80)

        prompt = self._build_question_prompt(question, context)
        parts: list[str] = []

        for token in self.llm.stream(prompt):
            parts.append(token)
            yield ("token", token)

        answer = "".join(parts).strip()

        if is_refusal(answer):
            print("\n[Stream retry] First answer looked like a refusal — replacing")
            normalized = normalize_query(question)
            question_note = ""
            if normalized.lower() != question.strip().lower():
                question_note = f"\n(Intended meaning: {normalized})"
            retry_prompt = build_retry_prompt(context, question, question_note)
            answer = self.llm.generate(retry_prompt)

        if is_refusal(answer) or len(answer) < 20:
            answer = self._minimal_helpful_answer(question, context)
            yield ("replace", answer)

    def _minimal_helpful_answer(self, question: str, context: str) -> str:
        """Last resort: surface context snippets + contacts instead of a refusal."""
        q = normalize_query(question).lower()
        snippet = context[:1200].strip() if context.strip() else ""

        lines = ["Here is what I have from ITM University's official information:"]
        if snippet:
            lines.append("")
            lines.append(snippet)
        else:
            if any(w in q for w in ("fee", "structure", "cost", "tuition")):
                lines.append(
                    "B.Tech fees are typically in the ₹4.04 Lakh – ₹14 Lakh range for the full "
                    "4-year programme (varies by branch). See the official fee PDF at "
                    "https://www.itmuniversity.ac.in/admission/fee-structure"
                )
            elif "hostel" in q:
                lines.append(
                    "ITM offers boys and girls hostels with AC/non-AC options, mess, and security. "
                    "Hostel fees are roughly ₹85,000 – ₹3,08,000 depending on type."
                )
            else:
                lines.append(
                    "Visit www.itmuniversity.ac.in for programme details, or apply at "
                    "https://www.itmuniversity.ac.in/admission/onlineapply"
                )

        lines.append(OFFICIAL_FOOTER.strip())
        return "\n".join(lines)


if __name__ == "__main__":
    rag = RAGChain()
    print("=" * 80)
    print("AI Student Support Chatbot (Groq + RAG)")
    print("=" * 80)

    while True:
        question = input("\nYou: ").strip()
        if question.lower() == "exit":
            break
        print("\nAssistant:", rag.ask(question))
