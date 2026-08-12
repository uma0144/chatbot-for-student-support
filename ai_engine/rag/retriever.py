from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

from .query_preprocessor import search_queries


class Retriever:
    """
    Retrieve the most relevant documents from the FAISS vector database.
    """

    def __init__(
        self,
        db_path="storage/vector_db",
        model_name="sentence-transformers/all-MiniLM-L6-v2",
    ):

        self.embedding_model = HuggingFaceEmbeddings(
            model_name=model_name
        )

        print("Loading FAISS Vector Database...")

        self.vector_db = FAISS.load_local(
            db_path,
            self.embedding_model,
            allow_dangerous_deserialization=True,
        )

        print("✅ Vector Database Loaded Successfully")

    def search(self, query: str, k: int = 5):
        """
        Search the FAISS database using Max Marginal Relevance (MMR).
        Runs original and typo-normalized queries, then merges unique hits.
        """

        queries = search_queries(query)
        print("\nSearching for:", queries)

        seen_content: set[str] = set()
        merged = []

        per_query_k = max(k, 4)
        for q in queries:
            batch = self.vector_db.max_marginal_relevance_search(
                query=q,
                k=per_query_k,
                fetch_k=25,
            )
            for doc in batch:
                key = doc.page_content[:200]
                if key not in seen_content:
                    seen_content.add(key)
                    merged.append(doc)
                if len(merged) >= k:
                    break
            if len(merged) >= k:
                break

        return merged[:k]


if __name__ == "__main__":

    retriever = Retriever()

    while True:

        query = input("\nAsk a Question (type 'exit' to quit): ")

        if query.lower() == "exit":
            break

        docs = retriever.search(query)

        print("\n" + "=" * 80)
        print("RETRIEVED DOCUMENTS")
        print("=" * 80)

        if not docs:
            print("No documents found.")
            continue

        for i, doc in enumerate(docs, start=1):

            print(f"\nDocument {i}")
            print("-" * 80)
            print(doc.page_content)
            print("\nMetadata:")
            print(doc.metadata)
            print("=" * 80)