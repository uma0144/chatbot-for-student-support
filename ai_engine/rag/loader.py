import os
import json
import pandas as pd

from langchain_core.documents import Document


class DocumentLoader:
    """
    Loads CSV, JSON, and Markdown files from the knowledge-base folder
    and converts them into LangChain Documents.
    """

    def __init__(self, data_path="knowledge-base"):
        self.data_path = data_path
        self.csv_path = os.path.join(data_path, "csv")
        self.json_path = os.path.join(data_path, "json")
        self.md_path = os.path.join(data_path, "md")
        self.pdf_path = os.path.join(data_path, "pdf")

    def _load_pdf_files(self, documents):
        if not os.path.exists(self.pdf_path):
            return

        try:
            from pypdf import PdfReader
        except ImportError:
            print("pypdf not installed — skip PDF knowledge base.")
            return

        pdf_files = sorted(f for f in os.listdir(self.pdf_path) if f.lower().endswith(".pdf"))
        print(f"\nFound {len(pdf_files)} PDF file(s)")

        for file in pdf_files:
            file_path = os.path.join(self.pdf_path, file)
            try:
                reader = PdfReader(file_path)
                pages = []
                for page in reader.pages:
                    text = page.extract_text() or ""
                    if text.strip():
                        pages.append(text.strip())
                if not pages:
                    continue
                content = "\n\n".join(pages)
                documents.append(
                    Document(
                        page_content=content,
                        metadata={"source": file, "type": "pdf"},
                    )
                )
                print(f"Loaded PDF -> {file}")
            except Exception as e:
                print(f"Error loading PDF {file}: {e}")

    def _load_markdown_files(self, documents):
        if not os.path.exists(self.md_path):
            print("Markdown folder not found.")
            return

        md_files = sorted(
            f for f in os.listdir(self.md_path)
            if f.endswith(".md")
            and not f.startswith(".")
            and f.upper() != "README.MD"
        )

        print(f"\nFound {len(md_files)} Markdown file(s)")

        for file in md_files:
            file_path = os.path.join(self.md_path, file)
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read().strip()

                if not content:
                    continue

                documents.append(
                    Document(
                        page_content=content,
                        metadata={"source": file, "type": "markdown"},
                    )
                )
                print(f"Loaded Markdown -> {file}")

            except Exception as e:
                print(f"Error loading {file}: {e}")

    def load_documents(self):
        documents = []

        # -------------------------
        # Load CSV Files
        # -------------------------
        if os.path.exists(self.csv_path):

            csv_files = [
                f for f in os.listdir(self.csv_path)
                if f.endswith(".csv")
            ]

            print(f"\nFound {len(csv_files)} CSV file(s)")

            for file in csv_files:

                file_path = os.path.join(self.csv_path, file)

                try:
                    df = pd.read_csv(file_path)

                    for index, row in df.iterrows():

                        text = "\n".join(
                            [
                                f"{column}: {row[column]}"
                                for column in df.columns
                            ]
                        )

                        documents.append(
                            Document(
                                page_content=text,
                                metadata={
                                    "source": file,
                                    "type": "csv",
                                    "row": index,
                                },
                            )
                        )

                    print(f"Loaded CSV -> {file}")

                except Exception as e:
                    print(f"Error loading {file}: {e}")

        else:
            print("CSV folder not found.")

        # -------------------------
        # Load JSON Files
        # -------------------------
        if os.path.exists(self.json_path):

            json_files = [
                f for f in os.listdir(self.json_path)
                if f.endswith(".json")
            ]

            print(f"\nFound {len(json_files)} JSON file(s)")

            for file in json_files:

                file_path = os.path.join(self.json_path, file)

                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        data = json.load(f)

                    # JSON List
                    if isinstance(data, list):

                        for index, item in enumerate(data):

                            documents.append(
                                Document(
                                    page_content=json.dumps(
                                        item,
                                        indent=2,
                                        ensure_ascii=False,
                                    ),
                                    metadata={
                                        "source": file,
                                        "type": "json",
                                        "row": index,
                                    },
                                )
                            )

                    # JSON Dictionary
                    elif isinstance(data, dict):

                        documents.append(
                            Document(
                                page_content=json.dumps(
                                    data,
                                    indent=2,
                                    ensure_ascii=False,
                                ),
                                metadata={
                                    "source": file,
                                    "type": "json",
                                },
                            )
                        )

                    print(f"Loaded JSON -> {file}")

                except Exception as e:
                    print(f"Error loading {file}: {e}")

        else:
            print("JSON folder not found.")

        self._load_markdown_files(documents)
        self._load_pdf_files(documents)

        print("\n==============================")
        print(f"Total Documents : {len(documents)}")
        print("==============================\n")

        return documents


if __name__ == "__main__":

    loader = DocumentLoader()

    docs = loader.load_documents()

    if len(docs) > 0:

        print("First Document:\n")

        print(docs[0].page_content)

        print("\nMetadata:\n")

        print(docs[0].metadata)

    else:

        print("No documents loaded.")