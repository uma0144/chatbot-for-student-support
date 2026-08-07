from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS


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
        Returns diverse and relevant documents.
        """

        print("\nSearching for:", query)

        results = self.vector_db.max_marginal_relevance_search(
            query=query,
            k=k,
            fetch_k=20,
        )

        return results


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