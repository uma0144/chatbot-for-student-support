from langchain_text_splitters import RecursiveCharacterTextSplitter


class DocumentSplitter:
    """
    Splits documents into smaller chunks.
    """

    def __init__(
        self,
        chunk_size=500,
        chunk_overlap=100,
    ):
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separators=[
                "\n\n",
                "\n",
                ". ",
                " ",
                ""
            ],
        )

    def split_documents(self, documents):

        chunks = self.splitter.split_documents(documents)

        print(f"\nTotal Chunks Created : {len(chunks)}")

        return chunks


if __name__ == "__main__":

    from loader import DocumentLoader

    loader = DocumentLoader()

    docs = loader.load_documents()

    splitter = DocumentSplitter()

    chunks = splitter.split_documents(docs)

    print("\nFirst Chunk:\n")

    print(chunks[0].page_content)

    print("\nMetadata:\n")

    print(chunks[0].metadata)