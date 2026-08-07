import os

from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

from loader import DocumentLoader
from splitter import DocumentSplitter


class VectorStoreBuilder:
    """
    Creates and saves the FAISS vector database.
    """

    def __init__(
        self,
        model_name="sentence-transformers/all-MiniLM-L6-v2",
        save_path="storage/vector_db",
    ):

        self.save_path = save_path

        self.embedding_model = HuggingFaceEmbeddings(
            model_name=model_name
        )

    def create_vectorstore(self, documents):

        print("\nCreating embeddings...")

        vector_db = FAISS.from_documents(
            documents,
            self.embedding_model,
        )

        os.makedirs(self.save_path, exist_ok=True)

        vector_db.save_local(self.save_path)

        print(f"\n✅ Vector database saved to: {self.save_path}")

        return vector_db


if __name__ == "__main__":

    # Load documents
    loader = DocumentLoader()
    docs = loader.load_documents()

    # Split documents
    splitter = DocumentSplitter()
    chunks = splitter.split_documents(docs)

    # Build vector store
    builder = VectorStoreBuilder()
    vector_db = builder.create_vectorstore(chunks)

    print("\n===================================")
    print("FAISS Vector Store Created Successfully")
    print("===================================")